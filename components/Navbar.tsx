import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import AppLink from "./AppLink";
import { useLazyGetUser } from "../apollo/actions/index";
import withApollo from "../hoc/withApollo";
const NavbarComponent = () => {
  const [user, setUser] = useState(null);
  const [hasFetched, sethasFetched] = useState(false);
  const [getUser, { data, error }] = useLazyGetUser();

  useEffect(() => {
    getUser();
  }, []);

  if (data) {
    if (data.user && !user) setUser(data.user);

    if (!data.user && user) setUser(null);

    if (!hasFetched) sethasFetched(true);
  }

  const isAllowed = user && ["admin", "instructor"].includes(user.role);

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
          {!!hasFetched && (
            <Nav>
              {user && (
                <>
                  <span className="nav-link mr-2">Welcome {user.userName}</span>

                  <NavDropdown
                    className="mr-2"
                    title="Manage"
                    id="basic-nav-dropdown"
                  >
                    {isAllowed && (
                      <AppLink
                        titlesAndHref={[
                          {
                            title: "Create Portfolio",
                            href: "/portfolios/new",
                            className: "dropdown-item"
                          },
                          {
                            title: "Dashboard",
                            href: "/instructor/[id]/dashboard",
                            as: `/instructor/${user._id}/dashboard`,
                            className: "dropdown-item"
                          }
                        ]}
                      />
                    )}
                  </NavDropdown>
                  <AppLink
                    titlesAndHref={[
                      {
                        title: "Sign Out",
                        href: "/logout",
                        className: "btn btn-danger"
                      }
                    ]}
                  />
                </>
              )}
              {(error || !user) && (
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
              )}
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default withApollo(NavbarComponent);
