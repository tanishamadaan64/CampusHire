import { useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../auth/isAuthorized";

function Header() {
  // const navigate = useNavigate();
  const handleLogout = (e) => {
    logout();
    // navigate('update/1');
    window.location.href = "/login";
  };
  return (
    <div style={{ backgroundColor: "dark" }}>
      <header className="py-3 bg-dark" style={{ marginBottom: 1 }}>
        <div
          className="container-fluid d-flex justify-content-between gap-3 align-items-center"
          style={{ color: "white" }}
        >
          <div className="fw-bold fs-6">PLACEMENT MANAGEMENT </div>
          {isAuthenticated() && (
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <button onClick={handleLogout}>LOGOUT</button>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
