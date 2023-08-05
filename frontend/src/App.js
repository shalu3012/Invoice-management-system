import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import CompanyInfo from "./components/CompanyInfo";
import Client from "./components/Client";
import Invoices from "./components/Invoices";
import { useState } from "react";
import Profile from "./components/Profile";
import SingleInvoice from "./components/SingleInvoice";
import PrintPage from "./components/utils/printPdf/print";
import Header from "./components/Header";
import MainDashboard from "./components/MainDashboard";
// import AddClient from "./components/AddClient";
function App() {
  const [signUpuser, setSignUpUser] = useState({});
  const [loginUser, setLoginUser] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});
  const user = JSON.parse(window.localStorage.getItem("user"));
  const coInfo = JSON.parse(window.localStorage.getItem("companyInfo"));
  const loggedIn = window.localStorage.getItem("IsloggedIn");

  return (
    <Router>
      <Switch>
        <Route exact path="/printInvoice">
          <PrintPage />
        </Route>
        <Route exact path="/">
          {loggedIn ? (
            <Redirect to="/dashboard" />
          ) : (
            <Login
              setLoginUser={setLoginUser}
              signUpuser={signUpuser}
              setCompanyInfo={setCompanyInfo}
              loginUser={loginUser}
            />
          )}
        </Route>
        <Route path="/signUp">
          <SignUp setSignUpUser={setSignUpUser} />
        </Route>
        <Route path="/coInfo">
          {user && user._id ? (
            Object.keys(companyInfo).length === 0 ? (
              <CompanyInfo
                signUpuser={signUpuser}
                setCompanyInfo={setCompanyInfo}
                loginUser={loginUser}
                setLoginUser={setLoginUser}
              />
            ) : (
              <Redirect
                to="/dashboard"
                signUpuser={signUpuser}
                loginUser={loginUser}
              />
            )
          ) : (
            <Redirect to="signUp" setSignUpUser={setSignUpUser} />
          )}
        </Route>
        <Route path="/dashboard">
          <Header />
          {user && user._id ? (
            coInfo || Object.keys(companyInfo).length !== 0 ? (
              <MainDashboard signUpuser={signUpuser} loginUser={loginUser} />
            ) : (
              <Redirect
                to="/coInfo"
                signUpuser={signUpuser}
                setCompanyInfo={setCompanyInfo}
                loginUser={loginUser}
                setLoginUser={setLoginUser}
              />
            )
          ) : (
            <Redirect to="/" setLoginUser={setLoginUser} />
          )}
        </Route>
        <Route exact path="/clients">
          <Header />
          <Client signUpuser={signUpuser} loginUser={loginUser} />
        </Route>
        <Route exact path="/invoices">
          <Header />

          <Invoices signUpuser={signUpuser} loginUser={loginUser} />
        </Route>
        <Route path="/profile">
          <Profile
            signUpuser={signUpuser}
            companyInfo={companyInfo}
            loginUser={loginUser}
          />
        </Route>
        <Route path="/singleInvoice">
          <SingleInvoice />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
