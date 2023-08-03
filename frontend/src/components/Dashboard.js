import React, { useState } from "react";
import Header from "./Header";
import MainDashboard from "./MainDashboard";
import SideBar from "./SideBar";

export default function Dashboard({ signUpuser, loginUser }) {
  return (
    <div>
      <MainDashboard signUpuser={signUpuser} loginUser={loginUser} />
    </div>
  );
}
