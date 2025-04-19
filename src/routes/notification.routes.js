const express = require("express");
const { userAuthentication } = require("../middleware/auth.middleware");
const { getPaginatedNotifications, updateNotificationStatusController } = require("../controllers/notification.controllers");

const notificationRouter = express();

//This route is used fetch the notification from the database.
notificationRouter.route("/get-messages").get(userAuthentication, getPaginatedNotifications);

//This route is used to update the notification status as Zero.
notificationRouter.route("/update-status").put(userAuthentication, updateNotificationStatusController);

module.exports = notificationRouter
