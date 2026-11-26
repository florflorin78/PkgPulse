import { Link } from "react-router-dom";
import usePageTitle from "../usePageTitle.js";

export default function NotFoundPage() {
  usePageTitle("Page not found");

  return (
    <section className="card" data-testid="not-found">
      <h2>404: page not found</h2>
      <code className="command">
        $ sudo apt install this-page
        <br />
        E: Unable to locate package this-page
      </code>
      <p className="info">This address does not lead anywhere.</p>
      <Link to="/">Back to the feed</Link>
    </section>
  );
}
