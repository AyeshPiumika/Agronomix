import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const containerStyle1 = {
    backgroundColor: "#293D0E",
  };
  const containerStyle2 = {
    backgroundColor: "#rgba(0, 0, 0, 0.2);",
  };
  return (
    <section class="">
      <footer class="text-center text-white" style={containerStyle1}>
        <div class="container p-4 pb-0">
          <section class="">
            <p class="d-flex justify-content-center align-items-center">
              <span class="me-3">Administration login</span>
              <Link to="/adminlogin">
                <button type="button" class="btn btn-outline-light btn-rounded">
                  Sign in!
                </button>
              </Link>
            </p>
          </section>
        </div>

        <div class="text-center p-3" style={containerStyle2}>
          © 2023 Copyright:
          <a class="text-white" href="https://mdbootstrap.com/">
            Agronomix.com
          </a>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
