import { SESSION_SECRET, DB } from "../config/dev";
import MongoDbStore from "connect-mongodb-session";
import session from "express-session";
import { initStrategy } from "./passport";
import passport from "passport";
import express from "express";
const initSessionStore = () => {
  const initStore = MongoDbStore(session);
  return new initStore({
    uri: DB,
    collection: "portfolioSession"
  });
};

export const init = server => {
  initStrategy(passport);

  const sess = {
    name: "portfolio-session",
    secret: SESSION_SECRET,
    cookie: { maxAge: 2 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: false,
    store: initSessionStore()
  };

  server.use(session(sess));
  server.use(passport.initialize());
  server.use(passport.session());
};
