// src/layouts/MainLayout.tsx
import { Suspense } from "react";
import { Outlet, Link } from "react-router-dom";
import { PATHS } from "../constants/paths";

const LoadingFallback = () => <div>Loading Page...</div>;

const MainLayout = () => {
  return (
    <div
      style={{ border: "1px solid blue", padding: "10px", minHeight: "300px" }}
    >
      <header
        style={{
          borderBottom: "1px solid #ccc",
          marginBottom: "15px",
          paddingBottom: "10px",
        }}
      >
        <h1>My Product App</h1>
        <nav>
          {/* Use path constants for links */}
          <Link to={PATHS.HOME} style={{ marginRight: "10px" }}>
            Employee List
          </Link>
          <Link to={PATHS.ADD_EMPLOYEE_DETAIL}>Add Employee</Link>
        </nav>
      </header>
      <main>
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <footer
        style={{
          borderTop: "1px solid #ccc",
          marginTop: "30px",
          paddingTop: "10px",
        }}
      >
        App Footer
      </footer>
    </div>
  );
};

export default MainLayout;
