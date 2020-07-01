import { portfolios } from "./constants";
import { PortfolioModel } from "../server/models/portfolio";

export class FakeDb {
  async clean() {
    PortfolioModel.deleteMany({});
  }

  async addData() {
    const models = portfolios.map(
      p =>
        new PortfolioModel({
          ...p,
          startDate: new Date(p.startDate),
          endDate: new Date(p.endDate)
        })
    );
    await PortfolioModel.create(models);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}
