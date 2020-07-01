import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import AppLink from "./AppLink";

const NavbarComponent = () => {
  return (
    <div className="navbar-wrapper">
      <Navbar className="navbar-dark fj-mw9">
        <AppLink
          titlesAndHref={[
            { title: "Khang Nguyen", href: "/", className: "navbar-brand" }
          ]}
        />
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav className="mr-3">
              <AppLink
                titlesAndHref={[
                  { title: "Portfolios", href: "/portfolios" },
                  { title: "Forum", href: "/forum/categories" },
                  { title: "Resume", href: "/resume" }
                ]}
              />
            </Nav>
          </Nav>
          <Nav>
            <AppLink
              titlesAndHref={[
                { title: "Sign Up", href: "/register" },
                {
                  title: "Sign In",
                  href: "/login",
                  className: "btn btn-success bg-green-2 bright",
                  button: true
                }
              ]}
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
