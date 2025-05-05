import { CouponsMySQL } from "../../../models/couponsMySQL.js";

export class WpCouponsController {
  static async all(req, res) {
    const coupon = await CouponsMySQL.all();

    res.send(coupon);
  }
}
