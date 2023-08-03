import React, { useState } from "react";
import { useEffect } from "react";

const ErrorMessage = ({ children, styles }) => {
  const [show, setShow] = useState(true);
  const close = (e) => {
    e.target.parentElement.style.opacity = "0";
    setTimeout(() => {
      e.target.parentElement.style.display = "none";
    }, 900);
  };
  return (
    <div>
      {show ? (
        <div className="alert" style={styles}>
          <span className="closebtn" onClick={close}>
            &times;
          </span>
          <strong>Danger!</strong> {children}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ErrorMessage;
