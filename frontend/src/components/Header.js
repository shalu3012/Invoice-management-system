import React from "react";
import { useState } from "react";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useHistory } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import { Link } from "react-router-dom";

export default function Header() {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const companyInfo = JSON.parse(window.localStorage.getItem("companyInfo"));
  const [modal, setModal] = useState(false);
  const coInfo = window.localStorage.getItem("coInfo");
  const history = useHistory();
  const logout = () => {
    window.localStorage.removeItem("IsloggedIn");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("companyInfo");
    window.localStorage.removeItem("clients");
    window.localStorage.removeItem("currentProduct");
    history.push("/");
    window.location.reload(true);
    alert("loggedOut");
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  // function toggleActive(index) {
  //   changeState({ ...appState, activeObj: index });
  // }
  // function toggleActiveStyles(index) {
  //   if (index === appState.activeObj) {
  //     ToggleSidebar();
  //     return "dashOpt active";
  //   } else {
  //     return "dashOpt";
  //   }
  // }
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  const [isOpen, setIsopen] = useState(false);

  function ToggleSidebar() {
    if (isOpen === true) {
      setIsopen(false);
    } else {
      setIsopen(true);
    }
  }
  console.log(isOpen);
  return (
    <>
      <nav>
        <div className="header">
          <div className="head">
            <div id="hamburger" onClick={ToggleSidebar}>
              <MenuIcon fontSize="large" />
            </div>
            <i id="logo" className="fa-solid fa-book"></i>
            <h1 className="coloured">Your</h1>
            <h1>BillBook</h1>
          </div>
          <div className="profile" onClick={toggleModal}>
            <div className="user"> {user.firstname[0].toUpperCase()}</div>
          </div>
          {modal && (
            <div className="dropdownBox">
              <div onClick={toggleModal} className="dropdownOverlay"></div>
              <div className="dropdown">
                <div className="dropdown-menu">
                  {companyInfo && companyInfo._id ? (
                    <div
                      className="dropdown-item"
                      onClick={() => {
                        history.push("/profile");
                      }}
                    >
                      <PermIdentityOutlinedIcon className="dropdownIcons" />
                      Profile
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="dropdown-item" onClick={logout}>
                    <LogoutOutlinedIcon className="dropdownIcons" />
                    Logout
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      {!isOpen ? (
        <div className="justicons">
          <Link to="/">
            <DashboardOutlinedIcon fontSize="medium" />
          </Link>
          <Link to="/clients">
            <PeopleAltOutlinedIcon fontSize="medium" />
          </Link>
          <Link to="/invoices">
            <ReceiptOutlinedIcon fontSize="medium" />
          </Link>
        </div>
      ) : (
        <div className={`sideBar ${isOpen === true ? "active" : ""}`}>
          {/* <div className="" onClick={ToggleSidebar}><CloseIcon/></div> */}
          <Link to="/" onClick={ToggleSidebar} className="dash">
            <div className="dashOpt">
              <DashboardOutlinedIcon fontSize="medium" />
              <p>Dashboard</p>
            </div>
          </Link>
          <Link to="/clients" onClick={ToggleSidebar} className="dash">
            <div className="dashOpt">
              <PeopleAltOutlinedIcon fontSize="medium" />
              <p>Clients</p>
            </div>
          </Link>
          <Link to="/invoices" onClick={ToggleSidebar} className="dash">
            <div className="dashOpt">
              <ReceiptOutlinedIcon fontSize="medium" />
              <p>Invoices</p>
            </div>
          </Link>
        </div>
      )}
      <div
        className={`sidebar-overlay ${isOpen === true ? "active" : ""}`}
        onClick={ToggleSidebar}
      ></div>
    </>
  );
}
