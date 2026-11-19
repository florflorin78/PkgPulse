import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="card" data-testid="not-found">
      <h2>Page not found</h2>
      <p className="info">This address does not lead anywhere.</p>
      <Link to="/">Back to packages</Link>
    </section>
  );
}
