// Layout.js
import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="App">
      <Sidebar />
      <div className="ContentWrapper">
        <div className="Content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
