import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  createPackage,
  deletePackage,
  fetchDistros,
  fetchPackages,
  updatePackage,
} from "./api.js";
import { MANAGERS } from "./data/constants.js";
import { readSavedDistro, saveDistro } from "./helpers.js";
import Layout from "./components/Layout.jsx";
import PackagesPage from "./pages/PackagesPage.jsx";
import PackageDetailPage from "./pages/PackageDetailPage.jsx";
import DistrosPage from "./pages/DistrosPage.jsx";
import DistroDetailPage from "./pages/DistroDetailPage.jsx";
import CustomizePage from "./pages/CustomizePage.jsx";
import SetupPage from "./pages/SetupPage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import LearnPage from "./pages/LearnPage.jsx";
import GuidePage from "./pages/GuidePage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  const [packages, setPackages] = useState([]);
  const [distros, setDistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [distroId, setDistroId] = useState(readSavedDistro);
  const navigate = useNavigate();

  // load the data once, on mount
  useEffect(() => {
    let ignore = false; // skip updates after unmount

    async function load() {
      try {
        const packageData = await fetchPackages();
        const distroData = await fetchDistros();
        if (!ignore) {
          setPackages(packageData);
          setDistros(distroData);
        }
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  async function handleAdd(data) {
    const newPackage = {
      ...data,
      selected: false,
      recommended: false,
      managers: MANAGERS,
      description: "A package you added yourself.",
      why: "You added it to your own list.",
    };
    const created = await createPackage(newPackage);
    setPackages((prev) => [...prev, created]);
  }

  async function handleToggle(id) {
    const pkg = packages.find((p) => p.id === id);
    try {
      const updated = await updatePackage(id, { selected: !pkg.selected });
      setPackages((prev) => prev.map((p) => (p.id === id ? updated : p)));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deletePackage(id);
      setPackages((prev) => prev.filter((p) => p.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }

  // used by the Customize page
  async function handleSelectNames(names) {
    const toSelect = packages.filter((p) => names.includes(p.name) && !p.selected);
    try {
      for (const pkg of toSelect) {
        const updated = await updatePackage(pkg.id, { selected: true });
        setPackages((prev) => prev.map((p) => (p.id === pkg.id ? updated : p)));
      }
      navigate("/setup");
    } catch (err) {
      setError(err.message);
    }
  }

  function handleChooseDistro(id) {
    setDistroId(id);
    saveDistro(id);
    navigate("/");
  }

  // on My Setup the page stays the same
  function handleChangeDistro(id) {
    setDistroId(id);
    saveDistro(id);
  }

  // derived values, not state
  const selectedCount = packages.filter((p) => p.selected).length;
  const distro = distros.find((d) => d.id === distroId);

  return (
    <Routes>
      <Route
        element={<Layout total={packages.length} selected={selectedCount} error={error} />}
      >
        <Route
          path="/"
          element={
            <PackagesPage
              packages={packages}
              distros={distros}
              distro={distro}
              loading={loading}
              onChooseDistro={handleChooseDistro}
              onAdd={handleAdd}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          }
        />
        <Route
          path="/packages/:id"
          element={<PackageDetailPage distros={distros} packages={packages} />}
        />
        <Route
          path="/distros"
          element={
            <DistrosPage distros={distros} distroId={distroId} onChoose={handleChooseDistro} />
          }
        />
        <Route
          path="/distros/:id"
          element={
            <DistroDetailPage
              packages={packages}
              distroId={distroId}
              onChoose={handleChooseDistro}
            />
          }
        />
        <Route
          path="/customize"
          element={
            <CustomizePage packages={packages} distro={distro} onSelectNames={handleSelectNames} />
          }
        />
        <Route
          path="/setup"
          element={
            <SetupPage
              packages={packages}
              distros={distros}
              distro={distro}
              onChangeDistro={handleChangeDistro}
              onToggle={handleToggle}
            />
          }
        />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/learn" element={<LearnPage packages={packages} />} />
        <Route path="/learn/:slug" element={<GuidePage />} />
        <Route
          path="/quiz"
          element={<QuizPage distros={distros} onChoose={handleChooseDistro} />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
