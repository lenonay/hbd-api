import { NotificationsMySQL } from "../../../models/notificationsMySQL.js";

export class WpNotificationsController {
  static async getLast(req, res) {
    const notifications = await NotificationsMySQL.last();

    res.json(notifications);
  }
}
