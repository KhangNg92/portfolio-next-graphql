import mongoose from "mongoose";
import { DB } from "../server/config/dev";
import { FakeDb } from "./fakeDb";

mongoose.connect(
  DB,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  async () => {
    console.log("Populating DB .....");
    await FakeDb.prototype.populate();
    await mongoose.connection.close();
    console.log("DB has been populated...");
  }
);
