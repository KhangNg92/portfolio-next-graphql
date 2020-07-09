// import { createSchema, typedModel } from "ts-mongoose";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { Schema } from "mongoose";

class Portfolio {
  @prop({ required: true, maxLength: 128 })
  title: string;
  @prop({ required: true, maxLength: 64 })
  company: string;
  @prop({ maxLength: 128 })
  companyWebsite: string;
  @prop({ required: true, maxLength: 128 })
  location: string;
  @prop({ required: true })
  jobTitle: string;
  @prop({ required: true })
  description: string;
  @prop({ required: true })
  startDate: Date;
  @prop()
  endDate?: Date;
  @prop({ default: Date.now })
  createdAt?: Date;
  @prop({ type: Schema.Types.ObjectId, ref: "User" })
  user;
}

export const PortfolioModel = getModelForClass(Portfolio);

// const PortfolioSchema = createSchema({
//   title: { type: String, required: true, maxLength: 128 },
//   company: { type: String, required: true, maxLength: 64 },
//   companyWebsite: { type: String, required: true, maxLength: 128 },
//   location: { type: String, required: true, maxLength: 128 },
//   jobTitle: { type: String, required: true },
//   description: { type: String, required: true },
//   startDate: { type: Date, required: true },
//   endDate: Date,
//   createdAt: { type: Date, default: Date.now }
// });

// export const Portfolio = typedModel("Portfolio", PortfolioSchema);
