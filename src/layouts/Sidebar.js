import { isStudent } from "../auth/isAuthorized";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faBuilding , faHouse} from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <a
          href="/"
          className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-5 d-none d-sm-inline text-center">
            {isStudent() ? "STUDENT" : "ADMIN"}
          </span>
        </a>
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li>
            <a
              href="/home"
              data-bs-toggle="collapse"
              className="nav-link px-0 align-middle"
              style={{ color: "white" }}
            >
              <FontAwesomeIcon icon={faHouse} className="fs-5 me-1" />
              <span className="ms-1 d-none d-sm-inline" style={{ color: "white" }}>
                Home
              </span>{" "}
            </a>
          </li>

          <li>
            <a
              href="/"
              data-bs-toggle="collapse"
              className="nav-link px-0 align-middle"
              style={{ color: "white" }}
            >
              <FontAwesomeIcon icon={faBuilding} className="fs-5 me-1" />
              <span className="ms-1 d-none d-sm-inline" style={{ color: "white" }}>
                Companies
              </span>{" "}
            </a>
          </li>
          {!isStudent() && (
            <li>
              <a
                href="/students"
                data-bs-toggle="collapse"
                className="nav-link px-0 align-middle"
                style={{ color: "white" }}
              >
                <FontAwesomeIcon icon={faUsers} className="fs-5 me-1" />
                <span className="ms-1 d-none d-sm-inline" style={{ color: "white" }}>
                  Students
                </span>{" "}
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
