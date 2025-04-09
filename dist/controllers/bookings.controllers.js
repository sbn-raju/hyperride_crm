"use strict";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = require("../database/db.connect.js"),
  pool = _require.pool;
var moment = require('moment-timezone');
var ExcelJS = require('exceljs');
var fs = require('fs');
var path = require('path');
var nodemailer = require("nodemailer");
var decryptData = require("../helpers/decrypter.js");
require("dotenv").config();
var addBookings = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body$values, actual_return_datetime, km_readings, pickup_datetime, customer_id, isExtended, isExtend, _req$body$values2, booking_type, plan_selected, vehicle_category, engine_type, vehicle_selected, addons, amount_paid, deposit, total_amount_paid, comments, payment_mode, advance_amount, admin_id, addPickupDetailsQuery, addPickupDetailsValues, advancedsubval, addPickupDetailsResult, pickup_details_id, addonsString, amount_pending, currentTimestamp, addBookingDetailsQuery, addBookingDetailsValues, addBookingDetailsResult, booking_details_id, monthAbbr, booking_id, updateVehicleStatusQuery, updateVehicleStatusValue, updateVehicleStatusResult, updateBookingIdQuery, updateBookingIdValues, updateBookingIdResult;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return pool.query('BEGIN');
        case 2:
          //Getting all the information from the request.
          //destructuring the pickup details,
          _req$body$values = req.body.values, actual_return_datetime = _req$body$values.actual_return_datetime, km_readings = _req$body$values.km_readings, pickup_datetime = _req$body$values.pickup_datetime, customer_id = _req$body$values.customer_id;
          console.log(actual_return_datetime, km_readings, pickup_datetime);

          //Getting isExtended from the query.
          isExtended = req.query.isExtended;
          isExtend = null;
          if (isExtended === 'extended') {
            isExtend = true;
          } else {
            isExtend = false;
          }

          //Validation check
          if (!(!actual_return_datetime || !km_readings || !pickup_datetime)) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "Pickup details required"
          }));
        case 9:
          //Destructuring the vehcile details , plan details and the payment details.
          _req$body$values2 = req.body.values, booking_type = _req$body$values2.booking_type, plan_selected = _req$body$values2.plan_selected, vehicle_category = _req$body$values2.vehicle_category, engine_type = _req$body$values2.engine_type, vehicle_selected = _req$body$values2.vehicle_selected, addons = _req$body$values2.addons, amount_paid = _req$body$values2.amount_paid, deposit = _req$body$values2.deposit, total_amount_paid = _req$body$values2.total_amount_paid, comments = _req$body$values2.comments, payment_mode = _req$body$values2.payment_mode, advance_amount = _req$body$values2.advance_amount; //Getting the admin id from the middleware.
          admin_id = req.user.id; //Query to save the pickup details.
          addPickupDetailsQuery = "INSERT INTO pickup_details (actual_return_datetime, km_readings, pickup_datetime, updated_by, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING id";
          addPickupDetailsValues = [actual_return_datetime, km_readings, pickup_datetime, admin_id, admin_id];
          advancedsubval = total_amount_paid - advance_amount;
          _context.prev = 14;
          _context.next = 17;
          return pool.query(addPickupDetailsQuery, addPickupDetailsValues);
        case 17:
          addPickupDetailsResult = _context.sent;
          if (!(addPickupDetailsResult.rowCount != 0)) {
            _context.next = 46;
            break;
          }
          pickup_details_id = addPickupDetailsResult.rows[0].id; //Query to add the booking details like vehicle, plan and paymnet details.
          //firstly converting the addons id array into the string to save it in the database.
          addonsString = addons.join(", ");
          amount_pending = 0; //Getting the Current timestamp.
          currentTimestamp = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'); // const customer_id = 1;
          // let addBookingDetailsQuery = "";
          // let addBookingDetailsValues = [];
          // if(isExtend){
          //     addBookingDetailsQuery = "INSERT INTO bookings (customer_id, bike_id, plan_selected, booked_by, pickup_details, amount_paid, amount_deposit, amount_pending, booking_time, extra_addons, created_by, updated_by, booking_status, comments, payment_mode, is_extended, extended_details) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING id"
          //     addBookingDetailsValues = [customer_id, vehicle_selected, plan_selected, admin_id, pickup_details_id, amount_paid, deposit, amount_pending, currentTimestamp, addonsString, admin_id, admin_id, booking_type, comments, payment_mode, isExtend, booking_id] 
          // }else{
          //     addBookingDetailsQuery = "INSERT INTO bookings (customer_id, bike_id, plan_selected, booked_by, pickup_details, amount_paid, amount_deposit, amount_pending, booking_time, extra_addons, created_by, updated_by, booking_status, comments, payment_mode, is_extended) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING id"
          //     addBookingDetailsValues = [customer_id, vehicle_selected, plan_selected, admin_id, pickup_details_id, amount_paid, deposit, amount_pending, currentTimestamp, addonsString, admin_id, admin_id, booking_type, comments, payment_mode, isExtend] 
          // }
          addBookingDetailsQuery = "INSERT INTO bookings (customer_id, bike_id, plan_selected, booked_by, pickup_details, amount_paid, amount_deposit, amount_pending, booking_time, extra_addons, created_by, updated_by, booking_status, comments, payment_mode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id";
          addBookingDetailsValues = [customer_id, vehicle_selected, plan_selected, admin_id, pickup_details_id, advancedsubval, deposit, amount_pending, currentTimestamp, addonsString, admin_id, admin_id, booking_type, comments, payment_mode];
          _context.next = 27;
          return pool.query(addBookingDetailsQuery, addBookingDetailsValues);
        case 27:
          addBookingDetailsResult = _context.sent;
          if (!(addBookingDetailsResult.rowCount != 0)) {
            _context.next = 46;
            break;
          }
          booking_details_id = addBookingDetailsResult.rows[0].id; //Generating the booking number.
          monthAbbr = new Date().toLocaleString('en-US', {
            month: 'short'
          }).toUpperCase();
          booking_id = "HYPR-".concat(monthAbbr).concat(booking_details_id); //Updateing the status of the bikes to the people.
          updateVehicleStatusQuery = "UPDATE vehicle_master SET vehicle_isavailable = $1 WHERE id = $2";
          updateVehicleStatusValue = [false, vehicle_selected];
          _context.next = 36;
          return pool.query(updateVehicleStatusQuery, updateVehicleStatusValue);
        case 36:
          updateVehicleStatusResult = _context.sent;
          //Updating the booking of the booking.
          updateBookingIdQuery = "UPDATE bookings SET booking_id = $1 WHERE id = $2";
          updateBookingIdValues = [booking_id, booking_details_id];
          _context.next = 41;
          return pool.query(updateBookingIdQuery, updateBookingIdValues);
        case 41:
          updateBookingIdResult = _context.sent;
          if (!(updateBookingIdResult.rowCount != 0 && updateVehicleStatusResult.rowCount != 0)) {
            _context.next = 46;
            break;
          }
          _context.next = 45;
          return pool.query('COMMIT');
        case 45:
          return _context.abrupt("return", res.status(201).json({
            success: true,
            message: "Booking created successfully"
          }));
        case 46:
          _context.next = 54;
          break;
        case 48:
          _context.prev = 48;
          _context.t0 = _context["catch"](14);
          _context.next = 52;
          return pool.query('ROLLBACK');
        case 52:
          console.log(_context.t0);
          return _context.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context.t0)
          }));
        case 54:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[14, 48]]);
  }));
  return function addBookings(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getLiveBookingsControllers = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var page, limit, offset, pickupDate, dropDate, rentalOption, vehicle, whereClause, queryValues, countQuery, getLiveBookingsQuery, countResult, totalCount, getLiveBookingsResult;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          page = parseInt(req.query.page, 10) || 1;
          limit = parseInt(req.query.limit, 10) || 10;
          offset = (page - 1) * limit;
          pickupDate = req.query.pickupDate; // Expected format: YYYY-MM-DD
          dropDate = req.query.dropDate;
          rentalOption = req.query.rentalOption;
          vehicle = req.query.vehicle; // This is an encoded JSON string
          if (!vehicle) {
            _context2.next = 15;
            break;
          }
          _context2.prev = 8;
          vehicle = JSON.parse(decodeURIComponent(vehicle)); // Decode and parse
          _context2.next = 15;
          break;
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](8);
          return _context2.abrupt("return", res.status(400).json({
            message: "Invalid vehicle format"
          }));
        case 15:
          console.log(vehicle);
          whereClause = "WHERE b.booking_status = $1";
          queryValues = ['Live Booking'];
          if (pickupDate) {
            whereClause += " AND DATE(t.pickup_datetime) = $2";
            queryValues.push(pickupDate);
          }
          if (dropDate) {
            whereClause += " AND DATE(t.actual_return_datetime) = $2";
            queryValues.push(dropDate);
          }
          if (rentalOption) {
            whereClause += " AND p.rental_category = $2";
            queryValues.push(rentalOption);
          }
          if (vehicle) {
            whereClause += " AND v.vehicle_name = $2 AND v.vehicle_number = $3";
            queryValues.push(vehicle.name);
            queryValues.push(vehicle.number);
          }
          countQuery = "\n        SELECT COUNT(*) FROM bookings b \n        JOIN customer_registration c ON b.customer_id = c.id \n        JOIN vehicle_master v ON b.bike_id = v.id \n        JOIN rentals_plan p ON b.plan_selected = p.id \n        JOIN admin_registration e ON b.booked_by = e.id \n        JOIN pickup_details t ON b.pickup_details = t.id \n        ".concat(whereClause, "\n    ");
          getLiveBookingsQuery = "\n        SELECT b.id, b.booking_id, b.booking_status, b.booking_time, \n               c.user_name, c.user_mobile, v.vehicle_name, v.vehicle_number, \n               p.rental_name, e.admin_name, t.pickup_datetime, t.actual_return_datetime, p.rental_category \n        FROM bookings b \n        JOIN customer_registration c ON b.customer_id = c.id \n        JOIN vehicle_master v ON b.bike_id = v.id \n        JOIN rentals_plan p ON b.plan_selected = p.id \n        JOIN admin_registration e ON b.booked_by = e.id \n        JOIN pickup_details t ON b.pickup_details = t.id \n        ".concat(whereClause, "\n        ORDER BY b.id DESC\n        LIMIT $").concat(queryValues.length + 1, " OFFSET $").concat(queryValues.length + 2, "\n\n    ");
          _context2.prev = 24;
          _context2.next = 27;
          return pool.query(countQuery, queryValues);
        case 27:
          countResult = _context2.sent;
          console.log(queryValues);
          console.log(countResult.rows);
          totalCount = parseInt(countResult.rows[0].count, 10);
          _context2.next = 33;
          return pool.query(getLiveBookingsQuery, [].concat(queryValues, [limit, offset]));
        case 33:
          getLiveBookingsResult = _context2.sent;
          if (!(getLiveBookingsResult.rowCount > 0)) {
            _context2.next = 38;
            break;
          }
          return _context2.abrupt("return", res.status(200).json({
            success: true,
            data: getLiveBookingsResult.rows,
            totalCount: totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit)
          }));
        case 38:
          return _context2.abrupt("return", res.status(404).json({
            success: false,
            message: "No live bookings found for the given filters."
          }));
        case 39:
          _context2.next = 45;
          break;
        case 41:
          _context2.prev = 41;
          _context2.t1 = _context2["catch"](24);
          console.error(_context2.t1);
          return _context2.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context2.t1.message)
          }));
        case 45:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[8, 12], [24, 41]]);
  }));
  return function getLiveBookingsControllers(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getAdvancedBookingsControllers = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var page, limit, offset, pickupDate, dropDate, rentalOption, vehicle, whereClause, queryValues, countQuery, getAdvancedBookingsQuery, countResult, totalCount, getAdvancedBookingsResult;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          page = parseInt(req.query.page, 10) || 1;
          limit = parseInt(req.query.limit, 10) || 10;
          offset = (page - 1) * limit;
          pickupDate = req.query.pickupDate; // Expected format: YYYY-MM-DD
          dropDate = req.query.dropDate;
          rentalOption = req.query.rentalOption;
          vehicle = req.query.vehicle; // Decode and parse vehicle JSON string if present
          if (!vehicle) {
            _context3.next = 15;
            break;
          }
          _context3.prev = 8;
          vehicle = JSON.parse(decodeURIComponent(vehicle));
          _context3.next = 15;
          break;
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](8);
          return _context3.abrupt("return", res.status(400).json({
            message: "Invalid vehicle format"
          }));
        case 15:
          console.log(vehicle);
          whereClause = "WHERE b.booking_status = $1";
          queryValues = ['Advanced Booking']; // Change to Advanced Booking
          if (pickupDate) {
            whereClause += " AND DATE(t.pickup_datetime) = $".concat(queryValues.length + 1);
            queryValues.push(pickupDate);
          }
          if (dropDate) {
            whereClause += " AND DATE(t.actual_return_datetime) = $".concat(queryValues.length + 1);
            queryValues.push(dropDate);
          }
          if (rentalOption) {
            whereClause += " AND p.rental_category = $".concat(queryValues.length + 1);
            queryValues.push(rentalOption);
          }
          if (vehicle) {
            whereClause += " AND v.vehicle_name = $".concat(queryValues.length + 1, " AND v.vehicle_number = $").concat(queryValues.length + 2);
            queryValues.push(vehicle.name);
            queryValues.push(vehicle.number);
          }

          // Query to get total count of filtered advanced bookings
          countQuery = "\n        SELECT COUNT(*) FROM bookings b \n        JOIN customer_registration c ON b.customer_id = c.id \n        JOIN vehicle_master v ON b.bike_id = v.id \n        JOIN rentals_plan p ON b.plan_selected = p.id \n        JOIN admin_registration e ON b.booked_by = e.id \n        JOIN pickup_details t ON b.pickup_details = t.id \n        ".concat(whereClause, "\n    "); // Query to fetch paginated advanced bookings
          getAdvancedBookingsQuery = "\n        SELECT b.id, b.booking_id, b.booking_status, b.booking_time, \n               c.user_name, c.user_mobile, v.vehicle_name, v.vehicle_number, \n               p.rental_name, e.admin_name, t.pickup_datetime, t.actual_return_datetime, p.rental_category \n        FROM bookings b \n        JOIN customer_registration c ON b.customer_id = c.id \n        JOIN vehicle_master v ON b.bike_id = v.id \n        JOIN rentals_plan p ON b.plan_selected = p.id \n        JOIN admin_registration e ON b.booked_by = e.id \n        JOIN pickup_details t ON b.pickup_details = t.id \n        ".concat(whereClause, "\n        ORDER BY b.id DESC\n        LIMIT $").concat(queryValues.length + 1, " OFFSET $").concat(queryValues.length + 2, "\n    ");
          _context3.prev = 24;
          _context3.next = 27;
          return pool.query(countQuery, queryValues);
        case 27:
          countResult = _context3.sent;
          totalCount = parseInt(countResult.rows[0].count, 10);
          _context3.next = 31;
          return pool.query(getAdvancedBookingsQuery, [].concat(queryValues, [limit, offset]));
        case 31:
          getAdvancedBookingsResult = _context3.sent;
          if (!(getAdvancedBookingsResult.rowCount > 0)) {
            _context3.next = 36;
            break;
          }
          return _context3.abrupt("return", res.status(200).json({
            success: true,
            data: getAdvancedBookingsResult.rows,
            totalCount: totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit)
          }));
        case 36:
          return _context3.abrupt("return", res.status(404).json({
            success: false,
            message: "No advanced bookings found for the given filters."
          }));
        case 37:
          _context3.next = 43;
          break;
        case 39:
          _context3.prev = 39;
          _context3.t1 = _context3["catch"](24);
          console.error(_context3.t1);
          return _context3.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context3.t1.message)
          }));
        case 43:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[8, 12], [24, 39]]);
  }));
  return function getAdvancedBookingsControllers(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getCancelledBookingsControllers = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var page, limit, offset, pickupDate, dropDate, rentalOption, vehicle, whereClause, queryValues, countQuery, getCancelledBookingsQuery, countResult, totalCount, getCancelledBookingsResult;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          page = parseInt(req.query.page, 10) || 1;
          limit = parseInt(req.query.limit, 10) || 10;
          offset = (page - 1) * limit;
          pickupDate = req.query.pickupDate;
          dropDate = req.query.dropDate;
          rentalOption = req.query.rentalOption;
          vehicle = req.query.vehicle;
          if (!vehicle) {
            _context4.next = 15;
            break;
          }
          _context4.prev = 8;
          vehicle = JSON.parse(decodeURIComponent(vehicle));
          _context4.next = 15;
          break;
        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](8);
          return _context4.abrupt("return", res.status(400).json({
            message: "Invalid vehicle format"
          }));
        case 15:
          console.log(vehicle);
          whereClause = "WHERE b.booking_status = $1";
          queryValues = ['Cancelled Booking'];
          if (pickupDate) {
            whereClause += " AND DATE(t.pickup_datetime) = $".concat(queryValues.length + 1);
            queryValues.push(pickupDate);
          }
          if (dropDate) {
            whereClause += " AND DATE(t.actual_return_datetime) = $".concat(queryValues.length + 1);
            queryValues.push(dropDate);
          }
          if (rentalOption) {
            whereClause += " AND p.rental_category = $".concat(queryValues.length + 1);
            queryValues.push(rentalOption);
          }
          if (vehicle) {
            whereClause += " AND v.vehicle_name = $".concat(queryValues.length + 1, " AND v.vehicle_number = $").concat(queryValues.length + 2);
            queryValues.push(vehicle.name);
            queryValues.push(vehicle.number);
          }
          countQuery = "\n        SELECT COUNT(*) FROM bookings b \n        JOIN customer_registration c ON b.customer_id = c.id \n        JOIN vehicle_master v ON b.bike_id = v.id \n        JOIN rentals_plan p ON b.plan_selected = p.id \n        JOIN admin_registration e ON b.booked_by = e.id \n        JOIN pickup_details t ON b.pickup_details = t.id \n        ".concat(whereClause, "\n    ");
          getCancelledBookingsQuery = "\n        SELECT b.id, b.booking_id, b.booking_status, b.booking_time, \n               c.user_name, c.user_mobile, v.vehicle_name, v.vehicle_number, \n               p.rental_name, e.admin_name, t.pickup_datetime, t.actual_return_datetime, p.rental_category \n        FROM bookings b \n        JOIN customer_registration c ON b.customer_id = c.id \n        JOIN vehicle_master v ON b.bike_id = v.id \n        JOIN rentals_plan p ON b.plan_selected = p.id \n        JOIN admin_registration e ON b.booked_by = e.id \n        JOIN pickup_details t ON b.pickup_details = t.id \n        ".concat(whereClause, "\n        ORDER BY b.id DESC\n        LIMIT $").concat(queryValues.length + 1, " OFFSET $").concat(queryValues.length + 2, "\n    ");
          _context4.prev = 24;
          _context4.next = 27;
          return pool.query(countQuery, queryValues);
        case 27:
          countResult = _context4.sent;
          totalCount = parseInt(countResult.rows[0].count, 10);
          _context4.next = 31;
          return pool.query(getCancelledBookingsQuery, [].concat(queryValues, [limit, offset]));
        case 31:
          getCancelledBookingsResult = _context4.sent;
          if (!(getCancelledBookingsResult.rowCount > 0)) {
            _context4.next = 36;
            break;
          }
          return _context4.abrupt("return", res.status(200).json({
            success: true,
            data: getCancelledBookingsResult.rows,
            totalCount: totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit)
          }));
        case 36:
          return _context4.abrupt("return", res.status(404).json({
            success: false,
            message: "No cancelled bookings found for the given filters."
          }));
        case 37:
          _context4.next = 43;
          break;
        case 39:
          _context4.prev = 39;
          _context4.t1 = _context4["catch"](24);
          console.error(_context4.t1);
          return _context4.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context4.t1.message)
          }));
        case 43:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[8, 12], [24, 39]]);
  }));
  return function getCancelledBookingsControllers(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getSingleBookingController = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var booking_id, getSingleQuery, getSingleValue, getSingleResult, bookingData, addonsString, addonsArray, getAddonsDetails, bookingDetails, addonKey;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          //Getting the id from the query.
          booking_id = req.query.booking_id; //Validation check.
          if (booking_id) {
            _context5.next = 3;
            break;
          }
          return _context5.abrupt("return", res.status(200).json({
            success: false,
            message: "All Fields are required"
          }));
        case 3:
          //Query to get all the details of the booking from the database.
          getSingleQuery = "SELECT b.id, b.booking_id, b.amount_paid, b.amount_deposit, b.booking_time, b.booking_status, b.extra_addons,b.comments,c.id AS customer_id, c.user_name, c.user_mobile,c.user_address,c.mobile_isverified,c.aadhar_isverified,c.user_adhaar_number, c.user_alt_no, v.id AS vehicle_id, v.vehicle_name, v.vehicle_number, p.rental_name, p.rental_category, p.rental_rate, pick.km_readings, pick.pickup_datetime, pick.actual_return_datetime FROM bookings b JOIN customer_registration c ON c.id = b.customer_id JOIN vehicle_master v ON v.id = b.bike_id JOIN rentals_plan p ON p.id = b.plan_selected JOIN pickup_details pick ON pick.id = b.pickup_details WHERE b.id = $1";
          getSingleValue = [booking_id];
          _context5.prev = 5;
          _context5.next = 8;
          return pool.query(getSingleQuery, getSingleValue);
        case 8:
          getSingleResult = _context5.sent;
          if (!(getSingleResult.rows.length > 0)) {
            _context5.next = 16;
            break;
          }
          bookingData = getSingleResult.rows[0]; // Decrypt the aadhar number before sending response
          _context5.next = 13;
          return decryptData(bookingData.user_adhaar_number);
        case 13:
          bookingData.user_adhaar_number = _context5.sent;
          bookingData.actual_return_datetime = moment(bookingData.actual_return_datetime).tz("Asia/Kolkata") // or your preferred timezone
          .format("YYYY-MM-DD HH:mm:ss"); // You can change the format if needed
          console.log(bookingData.actual_return_datetime);
        case 16:
          //Getting Addons Details Also.
          addonsString = getSingleResult.rows[0].extra_addons;
          addonsArray = addonsString ? addonsString.split(", ") : [];
          console.log("Addons Array", addonsArray);
          _context5.next = 21;
          return pool.query("SELECT addons_name, addons_amount FROM addons WHERE id = ANY($1)", [addonsArray]);
        case 21:
          getAddonsDetails = _context5.sent;
          bookingDetails = getSingleResult.rows[0];
          addonKey = "extra_addons_details";
          bookingDetails[addonKey] = getAddonsDetails.rows;
          if (!(getSingleResult.rowCount != 0)) {
            _context5.next = 27;
            break;
          }
          return _context5.abrupt("return", res.status(200).json({
            success: true,
            data: bookingDetails
          }));
        case 27:
          _context5.next = 33;
          break;
        case 29:
          _context5.prev = 29;
          _context5.t0 = _context5["catch"](5);
          console.error(_context5.t0);
          return _context5.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context5.t0.message)
          }));
        case 33:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[5, 29]]);
  }));
  return function getSingleBookingController(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

//Updating the exisiting bookings.
//This API will handle the exchanges the booking vehicle by making the other available.
var exchangeBookingVehicleController = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body, booking_id, vehicle_number, vehicle_selected, exchangeVehicleQuery, exchangeVehicleValue, exchangeVehicleResult, updateVehicleStatusQuery, updateVehicleStatusValue, updateVehicleStatusResult, updateVehicleAvailableQuery, updateVehicleAvailableValue, updateVehicleAvailableResult;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          //Getting the details from the the request.
          _req$body = req.body, booking_id = _req$body.booking_id, vehicle_number = _req$body.vehicle_number, vehicle_selected = _req$body.vehicle_selected; //vehicle_id is the old bike which is to be exchanged.
          //vehicle_selected is new selected vehicle.
          console.log(_typeof(vehicle_selected));

          //Validation Check
          if (!(!booking_id || !vehicle_number || !vehicle_selected)) {
            _context6.next = 4;
            break;
          }
          return _context6.abrupt("return", res.status(200).json({
            success: false,
            message: "All Id are required"
          }));
        case 4:
          //Query to update the booking status.
          exchangeVehicleQuery = "UPDATE bookings SET bike_id = $1 WHERE booking_id = $2";
          exchangeVehicleValue = [vehicle_selected, booking_id];
          _context6.prev = 6;
          _context6.next = 9;
          return pool.query(exchangeVehicleQuery, exchangeVehicleValue);
        case 9:
          exchangeVehicleResult = _context6.sent;
          if (!(exchangeVehicleResult.rowCount != 0)) {
            _context6.next = 23;
            break;
          }
          //This is to update the avilable of the vehicle which is previously selected to false.
          updateVehicleStatusQuery = "UPDATE vehicle_master SET vehicle_isavailable = $1 WHERE id = $2";
          updateVehicleStatusValue = [false, vehicle_selected];
          _context6.next = 15;
          return pool.query(updateVehicleStatusQuery, updateVehicleStatusValue);
        case 15:
          updateVehicleStatusResult = _context6.sent;
          //This is to update the status of the vehicle which is selected now. 
          updateVehicleAvailableQuery = "UPDATE vehicle_master SET vehicle_isavailable = $1 WHERE vehicle_number = $2";
          updateVehicleAvailableValue = [true, vehicle_number];
          _context6.next = 20;
          return pool.query(updateVehicleAvailableQuery, updateVehicleAvailableValue);
        case 20:
          updateVehicleAvailableResult = _context6.sent;
          if (!(updateVehicleStatusResult.rowCount != 0 && updateVehicleAvailableResult.rowCount != 0)) {
            _context6.next = 23;
            break;
          }
          return _context6.abrupt("return", res.status(200).json({
            success: false,
            message: "Vehicle updated successfully"
          }));
        case 23:
          _context6.next = 29;
          break;
        case 25:
          _context6.prev = 25;
          _context6.t0 = _context6["catch"](6);
          console.error(_context6.t0);
          return _context6.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context6.t0.message)
          }));
        case 29:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[6, 25]]);
  }));
  return function exchangeBookingVehicleController(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

//This APIs Will get the booking details of the given order.
var getOrderDetailsController = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var order_id, getOrderDetailsQuery, getOrderDetailsValues, getOrderDetailsResult;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          //Getting the Order Id from the query.
          order_id = req.query.order_id; //Validation Check
          if (order_id) {
            _context7.next = 3;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            success: false,
            message: "Order id is not present"
          }));
        case 3:
          //Query to get the order details.
          getOrderDetailsQuery = "SELECT b.booking_status, b.comments, b.return_detail, b.booking_id, b.created_at, b.booking_time, b.amount_paid, b.amount_deposit, b.amount_pending, c.user_name, c.user_mobile, c.user_adhaar_number, c.user_address, c.user_gender, c.user_status, c.user_dob, c.user_care_of, v.vehicle_name, v.vehicle_number, v.engine_type, v.vehicle_category, v.vehicle_image, e.admin_name, e.admin_username, e.admin_email FROM bookings b JOIN customer_registration c ON c.id = b.customer_id JOIN vehicle_master v ON v.id = b.bike_id JOIN admin_registration e ON e.id = b.booked_by WHERE b.booking_id = $1";
          getOrderDetailsValues = [order_id];
          _context7.prev = 5;
          _context7.next = 8;
          return pool.query(getOrderDetailsQuery, getOrderDetailsValues);
        case 8:
          getOrderDetailsResult = _context7.sent;
          if (!(getOrderDetailsResult.rowCount != 0)) {
            _context7.next = 14;
            break;
          }
          console.log(getOrderDetailsResult.rows);
          return _context7.abrupt("return", res.status(200).json({
            success: true,
            data: getOrderDetailsResult.rows
          }));
        case 14:
          return _context7.abrupt("return", res.status(400).json({
            success: true,
            message: "No order details found for this order id"
          }));
        case 15:
          _context7.next = 21;
          break;
        case 17:
          _context7.prev = 17;
          _context7.t0 = _context7["catch"](5);
          console.error(_context7.t0);
          return _context7.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context7.t0.message)
          }));
        case 21:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[5, 17]]);
  }));
  return function getOrderDetailsController(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var getCompletedBookingsControllers = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var page, limit, offset, pickupDate, dropDate, rentalOption, vehicle, whereClause, queryValues, countQuery, getCompletedBookingsQuery, countResult, totalCount, getCompletedBookingsResult;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          page = parseInt(req.query.page, 10) || 1;
          limit = parseInt(req.query.limit, 10) || 10;
          offset = (page - 1) * limit;
          pickupDate = req.query.pickupDate;
          dropDate = req.query.dropDate;
          rentalOption = req.query.rentalOption;
          vehicle = req.query.vehicle;
          if (!vehicle) {
            _context8.next = 15;
            break;
          }
          _context8.prev = 8;
          vehicle = JSON.parse(decodeURIComponent(vehicle));
          _context8.next = 15;
          break;
        case 12:
          _context8.prev = 12;
          _context8.t0 = _context8["catch"](8);
          return _context8.abrupt("return", res.status(400).json({
            message: "Invalid vehicle format"
          }));
        case 15:
          whereClause = "WHERE b.booking_status = $1";
          queryValues = ['Completed Booking'];
          if (pickupDate) {
            whereClause += " AND DATE(t.pickup_datetime) = $".concat(queryValues.length + 1);
            queryValues.push(pickupDate);
          }
          if (dropDate) {
            whereClause += " AND DATE(t.actual_return_datetime) = $".concat(queryValues.length + 1);
            queryValues.push(dropDate);
          }
          if (rentalOption) {
            whereClause += " AND p.rental_category = $".concat(queryValues.length + 1);
            queryValues.push(rentalOption);
          }
          if (vehicle) {
            whereClause += " AND v.vehicle_name = $".concat(queryValues.length + 1, " AND v.vehicle_number = $").concat(queryValues.length + 2);
            queryValues.push(vehicle.name);
            queryValues.push(vehicle.number);
          }
          countQuery = "\n        SELECT COUNT(*) FROM bookings b \n        JOIN customer_registration c ON b.customer_id = c.id \n        JOIN vehicle_master v ON b.bike_id = v.id \n        JOIN rentals_plan p ON b.plan_selected = p.id \n        JOIN admin_registration e ON b.booked_by = e.id \n        JOIN pickup_details t ON b.pickup_details = t.id \n        ".concat(whereClause, "\n    ");
          getCompletedBookingsQuery = "\n        SELECT b.id, b.booking_id, b.booking_status, b.booking_time, \n               c.user_name, c.user_mobile, v.vehicle_name, v.vehicle_number, \n               p.rental_name, e.admin_name, t.pickup_datetime, t.actual_return_datetime, p.rental_category \n        FROM bookings b \n        JOIN customer_registration c ON b.customer_id = c.id \n        JOIN vehicle_master v ON b.bike_id = v.id \n        JOIN rentals_plan p ON b.plan_selected = p.id \n        JOIN admin_registration e ON b.booked_by = e.id \n        JOIN pickup_details t ON b.pickup_details = t.id \n        ".concat(whereClause, "\n        ORDER BY b.id DESC\n        LIMIT $").concat(queryValues.length + 1, " OFFSET $").concat(queryValues.length + 2, "\n    ");
          _context8.prev = 23;
          _context8.next = 26;
          return pool.query(countQuery, queryValues);
        case 26:
          countResult = _context8.sent;
          totalCount = parseInt(countResult.rows[0].count, 10);
          _context8.next = 30;
          return pool.query(getCompletedBookingsQuery, [].concat(queryValues, [limit, offset]));
        case 30:
          getCompletedBookingsResult = _context8.sent;
          if (!(getCompletedBookingsResult.rowCount > 0)) {
            _context8.next = 35;
            break;
          }
          return _context8.abrupt("return", res.status(200).json({
            success: true,
            data: getCompletedBookingsResult.rows,
            totalCount: totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit)
          }));
        case 35:
          return _context8.abrupt("return", res.status(404).json({
            success: false,
            message: "No completed bookings found for the given filters."
          }));
        case 36:
          _context8.next = 42;
          break;
        case 38:
          _context8.prev = 38;
          _context8.t1 = _context8["catch"](23);
          console.error(_context8.t1);
          return _context8.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context8.t1.message)
          }));
        case 42:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[8, 12], [23, 38]]);
  }));
  return function getCompletedBookingsControllers(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var getFilteredBookingsController = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var _req$query, startDate, endDate, query, _result$rows, _result$rows2, result, workbook, worksheet, reportsDir, startDateFormatted, filePath;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _req$query = req.query, startDate = _req$query.startDate, endDate = _req$query.endDate;
          console.log(startDate, endDate);
          if (!(!startDate || !endDate)) {
            _context9.next = 4;
            break;
          }
          return _context9.abrupt("return", res.status(400).json({
            success: false,
            message: "Start date and end date are required."
          }));
        case 4:
          query = "\n        SELECT \n            t.pickup_datetime::DATE AS booking_date,\n            TO_CHAR(t.pickup_datetime, 'HH24:MI:SS') AS start_time,\n            EXTRACT(EPOCH FROM (t.actual_return_datetime - t.pickup_datetime)) / 3600 AS duration,\n            b.amount_paid AS total_price\n        FROM bookings b \n        JOIN pickup_details t ON b.pickup_details = t.id \n        WHERE t.pickup_datetime::DATE BETWEEN $1 AND $2\n        ORDER BY t.pickup_datetime ASC;\n    ";
          _context9.prev = 5;
          _context9.next = 8;
          return pool.query(query, [startDate, endDate]);
        case 8:
          result = _context9.sent;
          if (!((result === null || result === void 0 || (_result$rows = result.rows) === null || _result$rows === void 0 ? void 0 : _result$rows.length) === 0)) {
            _context9.next = 11;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            success: false,
            message: "No data found for the given date range."
          }));
        case 11:
          // Create Excel workbook
          workbook = new ExcelJS.Workbook();
          worksheet = workbook.addWorksheet("Sales Report"); // Define column headers
          worksheet.columns = [{
            header: "Booking Date",
            key: "booking_date",
            width: 15
          }, {
            header: "Start Time (hrs)",
            key: "start_time",
            width: 15
          }, {
            header: "Duration (hrs)",
            key: "duration",
            width: 15
          }, {
            header: "Total Price",
            key: "total_price",
            width: 15
          }];

          // Add data to the worksheet
          result === null || result === void 0 || (_result$rows2 = result.rows) === null || _result$rows2 === void 0 || _result$rows2.forEach(function (row) {
            worksheet.addRow({
              booking_date: row.booking_date,
              start_time: row.start_time,
              duration: row.duration ? Number(row.duration).toFixed(2) : "0.00",
              total_price: row.total_price
            });
          });

          // Ensure reports directory exists
          reportsDir = path.join(__dirname, "../reports");
          if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, {
              recursive: true
            });
          }

          // Generate filename with formatted date
          startDateFormatted = moment(startDate).format("DD-MM-YYYY");
          filePath = path.join(reportsDir, "sales_report_".concat(startDateFormatted, ".xlsx")); // Save Excel file
          _context9.next = 21;
          return workbook.xlsx.writeFile(filePath);
        case 21:
          _context9.next = 23;
          return sendEmailWithAttachment(filePath);
        case 23:
          return _context9.abrupt("return", res.status(200).json({
            success: true,
            message: "Excel file generated and sent via email successfully",
            downloadLink: "http://localhost:5000/reports/sales_report_".concat(startDateFormatted, ".xlsx")
          }));
        case 26:
          _context9.prev = 26;
          _context9.t0 = _context9["catch"](5);
          console.error(_context9.t0);
          return _context9.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context9.t0.message)
          }));
        case 30:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[5, 26]]);
  }));
  return function getFilteredBookingsController(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

// 📌 Function to send email with attachment
var sendEmailWithAttachment = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(filePath) {
    var transporter, mailOptions;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          // Configure Nodemailer transport
          transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.VERIFICATION_USER_EMAIL,
              // Now sender
              pass: process.env.VERIFICATION_USER_PASSWORD
            }
          }); // Email options
          mailOptions = {
            from: process.env.VERIFICATION_USER_EMAIL,
            // Sender email
            to: process.env.MASTER_EMAIL,
            // Receiver email
            subject: "Sales Report - HyperRide",
            text: "Please find the attached sales report.",
            attachments: [{
              filename: path.basename(filePath),
              // Extract file name
              path: filePath
            }]
          }; // Send email
          _context10.next = 5;
          return transporter.sendMail(mailOptions);
        case 5:
          _context10.next = 10;
          break;
        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);
          console.error("❌ Error sending email:", _context10.t0);
        case 10:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 7]]);
  }));
  return function sendEmailWithAttachment(_x19) {
    return _ref10.apply(this, arguments);
  };
}();

//This API will capture the reason for the cancellation of the application.
var postReasonCancellation = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var booking_id, reason, postReasonQuery, postReasonValues, postReasonResult;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          //Getting the booking id from the query (booking_id).
          booking_id = req.query.booking_id; //Get the reason from the body.
          reason = req.body.reason; //Validation Check.
          if (!(!booking_id || !reason)) {
            _context11.next = 4;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            success: false,
            message: "Booking Id is not present"
          }));
        case 4:
          //Reason for the Cancellation.
          postReasonQuery = "WITH updated_bookings AS (UPDATE bookings SET reason_for_cancel = $1, booking_status = $2 WHERE id = $3 RETURNING bike_id) UPDATE vehicle_master SET vehicle_isavailable = $4 WHERE id IN (SELECT bike_id FROM updated_bookings) RETURNING id";
          postReasonValues = [reason, "Cancelled Booking", booking_id, true];
          _context11.prev = 6;
          _context11.next = 9;
          return pool.query(postReasonQuery, postReasonValues);
        case 9:
          postReasonResult = _context11.sent;
          console.log(postReasonResult.rows);
          if (!(postReasonResult.rowCount != 0)) {
            _context11.next = 13;
            break;
          }
          return _context11.abrupt("return", res.status(200).json({
            success: true,
            message: "Reason is added successfully"
          }));
        case 13:
          _context11.next = 19;
          break;
        case 15:
          _context11.prev = 15;
          _context11.t0 = _context11["catch"](6);
          console.error(_context11.t0);
          return _context11.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context11.t0.message)
          }));
        case 19:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[6, 15]]);
  }));
  return function postReasonCancellation(_x20, _x21) {
    return _ref11.apply(this, arguments);
  };
}();

//This controller will handle the extenstion of the particualar bookings.

// actual_return_datetime : "2025-03-31T02:00"
// addons : []
// advance_amount: 0
// amount_paid: 1299
// booking_id: 29
// comments:  ""
// coupons_id: ""
// customer_id :  28
// pickup_datetime :  "2025-03-30T14:00"
// plan_category :  "Weekend Plans"
// plan_selected :  8
// total_amount_paid :  0

var putExtendBookingController = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var _req$body2, actual_return_datetime, amount_paid, booking_id, customer_id, pickup_datetime, plan_selected, extended_return_datetime, admin_id, addExtendedBookingQuery, addExtendedBookingValue, addExtendedBookingResult, getExistingAddonsQuery, existingAddonsResult, existingAddonsArray, newAddonsArray, updatedAddonsArray, updatedAddonsString, updateOriginalOrderStatus, updateOriginalOrderStatusResult;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          //Getting the details from the body and validated it.
          _req$body2 = req.body, actual_return_datetime = _req$body2.actual_return_datetime, amount_paid = _req$body2.amount_paid, booking_id = _req$body2.booking_id, customer_id = _req$body2.customer_id, pickup_datetime = _req$body2.pickup_datetime, plan_selected = _req$body2.plan_selected, extended_return_datetime = _req$body2.extended_return_datetime; //Get User details from the middleware.
          admin_id = req.user.id; //Validation check
          if (!(!customer_id || !booking_id)) {
            _context12.next = 4;
            break;
          }
          return _context12.abrupt("return", res.status(200).json({
            success: false,
            message: "Booking Id and Customer Id not present"
          }));
        case 4:
          //Queries to add the extended.
          addExtendedBookingQuery = "INSERT INTO bookings_extend (user_id, booking_id, amount_paid, actual_return_timestamp, plan_selected, created_by, updated_by,extended_timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7,$8)";
          addExtendedBookingValue = [customer_id, booking_id, amount_paid, actual_return_datetime, plan_selected, admin_id, admin_id, extended_return_datetime];
          _context12.prev = 6;
          _context12.next = 9;
          return pool.query(addExtendedBookingQuery, addExtendedBookingValue);
        case 9:
          addExtendedBookingResult = _context12.sent;
          if (!(addExtendedBookingResult.rowCount != 0)) {
            _context12.next = 27;
            break;
          }
          getExistingAddonsQuery = "SELECT extra_addons FROM bookings WHERE id = $1";
          _context12.next = 14;
          return pool.query(getExistingAddonsQuery, [booking_id]);
        case 14:
          existingAddonsResult = _context12.sent;
          existingAddonsArray = [];
          if (existingAddonsResult.rows.length > 0 && existingAddonsResult.rows[0].extra_addons) {
            existingAddonsArray = existingAddonsResult.rows[0].extra_addons.split(",").map(Number); // Convert to array of numbers
          }

          // Step 2: Combine existing addons with new ones
          newAddonsArray = req.body.addons || []; // Ensure new addons exist
          updatedAddonsArray = _toConsumableArray(new Set([].concat(_toConsumableArray(existingAddonsArray), _toConsumableArray(newAddonsArray)))); // Merge without duplicates
          updatedAddonsString = updatedAddonsArray.join(", "); // Convert back to a comma-separated string
          console.log(updatedAddonsString);

          // Step 3: Update the database with the new addons list
          updateOriginalOrderStatus = "\n              UPDATE bookings \n              SET is_extended = $1, extended_details = $2, extra_addons = $3 \n              WHERE id = $4 \n              RETURNING id\n            ";
          _context12.next = 24;
          return pool.query(updateOriginalOrderStatus, [true, booking_id, updatedAddonsString,
          // Updated addons list
          booking_id]);
        case 24:
          updateOriginalOrderStatusResult = _context12.sent;
          if (!(updateOriginalOrderStatusResult.rowCount != 0)) {
            _context12.next = 27;
            break;
          }
          return _context12.abrupt("return", res.status(200).json({
            success: true,
            message: "Extenstion added successfully"
          }));
        case 27:
          _context12.next = 33;
          break;
        case 29:
          _context12.prev = 29;
          _context12.t0 = _context12["catch"](6);
          console.error(_context12.t0);
          return _context12.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context12.t0.message)
          }));
        case 33:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[6, 29]]);
  }));
  return function putExtendBookingController(_x22, _x23) {
    return _ref12.apply(this, arguments);
  };
}();

//This Controller will handle the affect of te complete booking
var endBookingController = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var booking_id, admin_id, _req$body3, testRide_by, vehicle_condition, damage, repair_cost, amount_collected, deposit_return, km_readings, getBikeDetailsQuery, getBikeDetailsValue, getBikeDetailsResult, _getBikeDetailsResult, return_datetime, actual_datetime, addReturnFormQuery, addReturnFormValue, addReturnFormResult, vehicle_id, updateBookingStatusQuery, updateBookingStatusValue, updateVehicleStatusQuery, updateVehicelStatusValue, updateBookingStatusResult, updateVehicleStatusResult;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          //Getting the booking id from the request Query.
          booking_id = req.query.booking_id;
          console.log(booking_id);

          //Getting the admin id from the middleware.
          admin_id = req.user.id; //Getting the return detail from the Query.
          _req$body3 = req.body, testRide_by = _req$body3.testRide_by, vehicle_condition = _req$body3.vehicle_condition, damage = _req$body3.damage, repair_cost = _req$body3.repair_cost, amount_collected = _req$body3.amount_collected, deposit_return = _req$body3.deposit_return, km_readings = _req$body3.km_readings; //Validation check of the booking id.
          if (booking_id) {
            _context13.next = 6;
            break;
          }
          return _context13.abrupt("return", res.status(400).json({
            success: false,
            message: "Booking is not present"
          }));
        case 6:
          if (!(!testRide_by || !damage || !amount_collected || !deposit_return || !km_readings)) {
            _context13.next = 8;
            break;
          }
          return _context13.abrupt("return", res.status(400).json({
            success: false,
            message: "Return form is not filled"
          }));
        case 8:
          //Now get all the details of the booking from the datbase and proceed with updating the vehicle and booking status.
          getBikeDetailsQuery = "SELECT bike_id FROM bookings WHERE id = $1";
          getBikeDetailsValue = [booking_id];
          _context13.prev = 10;
          _context13.next = 13;
          return pool.query(getBikeDetailsQuery, getBikeDetailsValue);
        case 13:
          getBikeDetailsResult = _context13.sent;
          if (!(getBikeDetailsResult.rowCount != 0)) {
            _context13.next = 40;
            break;
          }
          //Once the bike details is got now lets insert the return form details into the database.
          //Query to insert the return form details.
          console.log(testRide_by, deposit_return, amount_collected, repair_cost, vehicle_condition, damage, admin_id, admin_id, km_readings);
          return_datetime = new Date().toISOString(); // Current timestamp in ISO format
          actual_datetime = new Date().toISOString(); // Use actual logic if different
          addReturnFormQuery = "\nINSERT INTO return_details \n(testride_by, deposit_return, amount_collected, repair_cost, vehicle_condition, damage, updated_by, created_by, km_readings, return_datetime, actual_datetime) \nVALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) \nRETURNING id\n";
          addReturnFormValue = [testRide_by, deposit_return, amount_collected, repair_cost, vehicle_condition, damage, admin_id, admin_id, km_readings, return_datetime, actual_datetime];
          _context13.next = 22;
          return pool.query(addReturnFormQuery, addReturnFormValue);
        case 22:
          addReturnFormResult = _context13.sent;
          if (!(addReturnFormResult.rowCount == 0)) {
            _context13.next = 25;
            break;
          }
          return _context13.abrupt("return", res.status(400).json({
            success: false,
            message: "Something went wrong!"
          }));
        case 25:
          //Getting the vehicle id which is being booked under this order id.
          vehicle_id = getBikeDetailsResult === null || getBikeDetailsResult === void 0 || (_getBikeDetailsResult = getBikeDetailsResult.rows[0]) === null || _getBikeDetailsResult === void 0 ? void 0 : _getBikeDetailsResult.bike_id; //Returning from here if the vehicle is NULL or UNDEFINE.
          if (vehicle_id) {
            _context13.next = 28;
            break;
          }
          return _context13.abrupt("return", res.status(400).json({
            success: false,
            message: "Vechile Id is not present"
          }));
        case 28:
          //Query to update the status of the vehicle and the booking of the ride.
          updateBookingStatusQuery = "UPDATE bookings SET booking_status = $1 WHERE id = $2";
          updateBookingStatusValue = ["Completed Booking", booking_id];
          updateVehicleStatusQuery = "UPDATE vehicle_master SET vehicle_isavailable = $1 WHERE id = $2";
          updateVehicelStatusValue = [true, vehicle_id]; //Now Calling all the updates.
          _context13.next = 34;
          return pool.query(updateBookingStatusQuery, updateBookingStatusValue);
        case 34:
          updateBookingStatusResult = _context13.sent;
          _context13.next = 37;
          return pool.query(updateVehicleStatusQuery, updateVehicelStatusValue);
        case 37:
          updateVehicleStatusResult = _context13.sent;
          if (!(updateBookingStatusResult.rowCount != 0 && updateVehicleStatusResult.rowCount != 0)) {
            _context13.next = 40;
            break;
          }
          return _context13.abrupt("return", res.status(200).json({
            success: true,
            message: "Ride is finished successfully."
          }));
        case 40:
          _context13.next = 46;
          break;
        case 42:
          _context13.prev = 42;
          _context13.t0 = _context13["catch"](10);
          console.error(_context13.t0);
          return _context13.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context13.t0.message)
          }));
        case 46:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[10, 42]]);
  }));
  return function endBookingController(_x24, _x25) {
    return _ref13.apply(this, arguments);
  };
}();
module.exports = {
  addBookings: addBookings,
  getLiveBookingsControllers: getLiveBookingsControllers,
  getAdvancedBookingsControllers: getAdvancedBookingsControllers,
  getSingleBookingController: getSingleBookingController,
  exchangeBookingVehicleController: exchangeBookingVehicleController,
  getOrderDetailsController: getOrderDetailsController,
  getCancelledBookingsControllers: getCancelledBookingsControllers,
  getCompletedBookingsControllers: getCompletedBookingsControllers,
  getFilteredBookingsController: getFilteredBookingsController,
  postReasonCancellation: postReasonCancellation,
  endBookingController: endBookingController,
  putExtendBookingController: putExtendBookingController
};