const express = require("express");
const { userAuthentication } = require("../middleware/auth.middleware");
const { getPaginatedNotifications, updateNotificationStatusController } = require("../controllers/notification.controllers");

const notificationRouter = express();

notificationRouter.route("/get-messages").get(userAuthentication, getPaginatedNotifications);

notificationRouter.route("/update-status").put(userAuthentication, updateNotificationStatusController);

module.exports = notificationRouter
