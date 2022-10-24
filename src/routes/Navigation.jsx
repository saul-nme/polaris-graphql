import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { BooksPage, AuthorsPage, NotFoundPage } from "../pages";

export default function Navigation() {
  return (
    <Router>
      <Routes>
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/" element={<Navigate to="/authors" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
