


import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardTechnicalSupport from "./components/BoardTechnicalSupport";
import BoardManager from "./components/BoardManager";
import BoardAdmin from "./components/BoardAdmin";

import EventBus from "./common/EventBus";
import DeviceManagementPage from "./components/DeviceManagementPage";
import SoftwareManagementPage from "./components/SoftwareManagementPage";
import LifecycleEventManagementPage from "./components/LifecycleEventManagementPage";
import UpdateSoftware from "./components/UpdateSoftware";
import UpdateLifecycleEvent from "./components/UpdateLifecycleEvent";
import UserViewDevices from "./components/UserViewDevices";
import UserViewSoftware from "./components/UserViewSoftware";
import ViewEndOfSupportDates from "./components/ViewEndOfSupportDates";
import UpdateUserRole from "./components/UpdateUserRole";
import Home from "./components/Home"; // Import Home component
import UpdateDeviceForm from "./components/UpdateDeviceForm";
import DeleteForm from "./components/DeleteForm";
import ViewRequestLogs from "./components/ViewRequestLogs";
import RenewForm from "./components/RenewForm";
import ReplaceForm from "./components/ReplaceForm";

const App = () => {
  const navigate = useNavigate();
  const [showTechnicalSupportBoard, setShowTechnicalSupportBoard] = useState(false);
  const [showManagerBoard, setShowManagerBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showUserBoard, setShowUserBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setShowTechnicalSupportBoard(user.roles.includes("ROLE_TECHNICALSUPPORT"))
      setShowUserBoard(user.roles.includes("ROLE_USER"));
      setCurrentUser(user);
      setShowManagerBoard(user.roles.includes("ROLE_MANAGEMENT"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowTechnicalSupportBoard(false);
    setShowManagerBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          License Lifecycle Tracker
        </Link>
        <div className="navbar-nav mr-auto">
          {/* Home link only shown when user is logged out */}
          {!currentUser && (
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
          )}

          {showTechnicalSupportBoard && (
            <li className="nav-item">
              <Link to={"/techsupport"} className="nav-link">
                Technical Support Board
              </Link>
            </li>
          )}

          {showManagerBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Manager Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {showUserBoard && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/user/view-devices" element={<UserViewDevices />} />
          <Route path="/user/view-software" element={<UserViewSoftware />} />
          <Route path="/techsupport" element={<BoardTechnicalSupport />} />
          <Route path="/mod" element={<BoardManager />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/admin/device-management" element={<DeviceManagementPage />} />
          <Route path="/admin/software-management" element={<SoftwareManagementPage />} />
          <Route path="/admin/lifecycleEvent-management" element={<LifecycleEventManagementPage />} />
          <Route path="/admin/updateuserrole-management" element={<UpdateUserRole />} />
          <Route path="/admin/updatedeviceform" element={<UpdateDeviceForm />} />
          <Route path="/admin/deletedeviceform" element={<DeleteForm/>} />
          <Route path="/update-software/:softwareId" element={<UpdateSoftware />} />
          <Route path="/update-lifecycleEvent/:eventId" element={<UpdateLifecycleEvent />} />
          <Route path="/technicalsupport/view-end-of-support-dates" element={<ViewEndOfSupportDates />} />
          <Route path="/technicalsupport/viewallrequestlogs" element={<ViewRequestLogs />} />
          <Route path="/renew/:assetid" element={<RenewForm />} />
          <Route path="/replace/:assetid" element={<ReplaceForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
