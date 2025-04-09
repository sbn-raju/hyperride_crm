"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = require("../database/db.connect.js"),
  pool = _require.pool;
var generateSignature = require("../helpers/generateApiSignature.js");
var generateVerificationId = require("../helpers/generateVerificatioId.js");
var cashfreeUrl = require("../helpers/BaseURL.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var encryptData = require("../helpers/encrypter.js");
var decryptData = require("../helpers/decrypter.js");
var otpGenerator = require("../helpers/otpGenerator.js");
var customerRoute = require("../routes/customers.routes.js");

//This is the to get all the customers.
var getCustomersControllers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var getCustomersQuery, _getCustomersResult$r, getCustomersResult, aadhaar_number, decryptedAdhaarNumber, finalData;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          //Add the pagination.
          //Getting the limit and offset from the query string.
          //   const { limit, offset } = req.query;
          //   //Validation check.
          //   if (!limit || !offset) {
          //     return res.status(400).json({
          //       success: false,
          //       message: "Re-check the data sent",
          //     });
          //   }
          //Query to get all the customers from the database.
          getCustomersQuery = "SELECT * FROM customer_registration";
          _context.prev = 1;
          _context.next = 4;
          return pool.query(getCustomersQuery);
        case 4:
          getCustomersResult = _context.sent;
          aadhaar_number = getCustomersResult === null || getCustomersResult === void 0 || (_getCustomersResult$r = getCustomersResult.rows[0]) === null || _getCustomersResult$r === void 0 ? void 0 : _getCustomersResult$r.user_adhaar_number; //Decrypting the aadhaar number.
          _context.next = 8;
          return decryptData(aadhaar_number);
        case 8:
          decryptedAdhaarNumber = _context.sent;
          if (!(getCustomersResult.rowCount != 0)) {
            _context.next = 11;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            success: true,
            data: getCustomersResult.rows
          }));
        case 11:
          finalData = {
            data: _objectSpread(_objectSpread({}, getCustomersResult.rows[0]), {}, {
              user_aadhar_number: decryptedAdhaarNumber
            }),
            user_profile: getUserProfile
          };
          _context.next = 18;
          break;
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context.t0)
          }));
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 14]]);
  }));
  return function getCustomersControllers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

//This is to get the single customer details.
var getCustomerControllers = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var customer_id, getCustomersQuery, getCustomersResult, _getCustomersResult$r2, _getCustomersResult$r3, aadhaar_number, decryptedAdhaarNumber, userProfile, _getUserProfile, finalData;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          //Getting the customer id from the query.
          customer_id = req.query.customer_id; //Validation Check.
          if (customer_id) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: "Customer Id is required"
          }));
        case 3:
          //Query to get all the customers from the database.
          getCustomersQuery = "SELECT * FROM customer_registration WHERE id = $1";
          _context2.prev = 4;
          _context2.next = 7;
          return pool.query(getCustomersQuery, [customer_id]);
        case 7:
          getCustomersResult = _context2.sent;
          if (!(getCustomersResult.rowCount != 0)) {
            _context2.next = 20;
            break;
          }
          //Getting the encrypted aadhaar number.
          aadhaar_number = getCustomersResult === null || getCustomersResult === void 0 || (_getCustomersResult$r2 = getCustomersResult.rows[0]) === null || _getCustomersResult$r2 === void 0 ? void 0 : _getCustomersResult$r2.user_adhaar_number; //Decrypting the aadhaar number.
          _context2.next = 12;
          return decryptData(aadhaar_number);
        case 12:
          decryptedAdhaarNumber = _context2.sent;
          //Getting the Profile which is in binary and converting it into the string and then sending it to the frontend.
          userProfile = getCustomersResult === null || getCustomersResult === void 0 || (_getCustomersResult$r3 = getCustomersResult.rows[0]) === null || _getCustomersResult$r3 === void 0 ? void 0 : _getCustomersResult$r3.user_profile;
          console.log(userProfile);
          if (userProfile) {
            _context2.next = 17;
            break;
          }
          throw new Error("Error in finding the user profile picture");
        case 17:
          //Getting the original user profile picture.
          _getUserProfile = Buffer.from(userProfile, "base64").toString("base64"); //construct the final data.
          finalData = {
            data: _objectSpread(_objectSpread({}, getCustomersResult.rows[0]), {}, {
              user_adhaar_number: decryptedAdhaarNumber
            }),
            user_profile: _getUserProfile
          };
          return _context2.abrupt("return", res.status(200).json({
            success: true,
            data: finalData
          }));
        case 20:
          _context2.next = 26;
          break;
        case 22:
          _context2.prev = 22;
          _context2.t0 = _context2["catch"](4);
          console.log(_context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context2.t0)
          }));
        case 26:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[4, 22]]);
  }));
  return function getCustomerControllers(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

//This API will get the user Last booking Date.
var getLastTransactionsDate = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var customer_id, getOneQuery, getOneValue, getOneResult;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          //Getting the user's id from query;
          customer_id = req.query.customer_id; //Validation Check.
          if (customer_id) {
            _context3.next = 3;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: "Customer Id is not present"
          }));
        case 3:
          //Query to fetching the latest date of transcation.
          getOneQuery = "SELECT MAX(created_at) AS last_booking_date FROM bookings WHERE customer_id = $1";
          getOneValue = [customer_id]; //Fetching the lastest date from the database.
          _context3.prev = 5;
          _context3.next = 8;
          return pool.query(getOneQuery, getOneValue);
        case 8:
          getOneResult = _context3.sent;
          if (!(getOneResult.rowCount != 0)) {
            _context3.next = 11;
            break;
          }
          return _context3.abrupt("return", res.status(200).json({
            success: true,
            data: getOneResult.rows[0]
          }));
        case 11:
          _context3.next = 17;
          break;
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](5);
          console.log(_context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context3.t0)
          }));
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[5, 13]]);
  }));
  return function getLastTransactionsDate(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

//This API will verify the driving liences.
var getCustomerDrivingLicencesControllers = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body, customer_id, dl_number, dob, signature, verificationId, admin_id, dateOfBirth, clientId, clientSecret, requestData, headerData, response, data, status, name, doi, photo, address, addDrivingLicenseQuery, addDrivingLicenseValue, addDrivingLicenseResult;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          //Getting the user driving details from the Body.
          _req$body = req.body, customer_id = _req$body.customer_id, dl_number = _req$body.dl_number, dob = _req$body.dob; //Call the function to generate the signature for the request.
          _context4.next = 3;
          return generateSignature();
        case 3:
          signature = _context4.sent;
          _context4.next = 6;
          return generateVerificationId();
        case 6:
          verificationId = _context4.sent;
          //Getting the user_id from the middleware.
          admin_id = req.user.id; //Validation check for this the details.
          if (!(!verificationId || !signature || !dob || !dl_number || !customer_id)) {
            _context4.next = 10;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            success: false,
            message: "Check the data"
          }));
        case 10:
          //Converting the Date of Birth to the YYYY-MM-DD fromate.
          dateOfBirth = moment(dob).format("YYYY-MM-DD"); //Get the client details from the env.
          clientId = process.env.CASHFREE_CLIENT_ID;
          clientSecret = process.env.CASHFREE_CLIENT_SECRET; //Make the date for the request.
          requestData = {
            verification_id: verificationId,
            dl_number: dl_number,
            dob: dateOfBirth
          }; //Headers Data.
          headerData = {
            "Content-Type": "application/json",
            "x-client-id": clientId,
            "x-client-secret": clientSecret,
            "x-cf-signature": signature
          };
          _context4.prev = 15;
          _context4.next = 18;
          return fetch("".concat(cashfreeUrl, "/driving-license"), {
            method: "POST",
            headers: _objectSpread(_objectSpread({}, headerData), {}, {
              "Content-Length": Buffer.byteLength(JSON.stringify(requestData))
            }),
            body: JSON.stringify(requestData)
          });
        case 18:
          response = _context4.sent;
          console.log(JSON.stringify(requestData));
          if (response.ok) {
            _context4.next = 29;
            break;
          }
          _context4.t0 = res.status(400);
          _context4.next = 24;
          return response.json();
        case 24:
          _context4.t1 = _context4.sent;
          _context4.t2 = {
            success: false,
            message: _context4.t1
          };
          return _context4.abrupt("return", _context4.t0.json.call(_context4.t0, _context4.t2));
        case 29:
          _context4.next = 31;
          return response.json();
        case 31:
          data = _context4.sent;
          console.log(data);

          //Fetching the details from the data got from the cashfree.
          status = data.status;
          name = data.details_of_driving_licence.name;
          doi = data.details_of_driving_licence.date_of_issue;
          photo = data.details_of_driving_licence.photo;
          address = data.details_of_driving_licence.address; //Adding details of the driving licences in the database.
          addDrivingLicenseQuery = "INSERT INTO driving_license (customer_id, verification_id, dl_number, status, holder_name, date_of_issue, dob, photo, address_line, created_by, updated_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id";
          addDrivingLicenseValue = [customer_id, verificationId, dl_number, status, name, doi, dob, photo, address, admin_id, admin_id];
          _context4.next = 42;
          return pool.query(addDrivingLicenseQuery, addDrivingLicenseValue);
        case 42:
          addDrivingLicenseResult = _context4.sent;
          if (!(addDrivingLicenseResult.rowCount != 0)) {
            _context4.next = 45;
            break;
          }
          return _context4.abrupt("return", res.status(200).json({
            success: true,
            message: "Driving license added successfully"
          }));
        case 45:
          _context4.next = 51;
          break;
        case 47:
          _context4.prev = 47;
          _context4.t3 = _context4["catch"](15);
          console.log(_context4.t3);
          return _context4.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context4.t3)
          }));
        case 51:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[15, 47]]);
  }));
  return function getCustomerDrivingLicencesControllers(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

//This API will the details of the Driving license.
var getDrivingLicenseControllers = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var customer_id, getDrivingLicenseQuery, getDrivingLicenseValue, getDrivingLicenseResult;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          //Getting the customers id from the query.
          customer_id = req.query.customer_id;
          getDrivingLicenseQuery = "SELECT verification_id, dl_number, status, holder_name, date_of_issue, dob, photo, address_line FROM driving_license WHERE customer_id = $1";
          getDrivingLicenseValue = [customer_id];
          _context5.prev = 3;
          _context5.next = 6;
          return pool.query(getDrivingLicenseQuery, getDrivingLicenseValue);
        case 6:
          getDrivingLicenseResult = _context5.sent;
          if (!(getDrivingLicenseResult.rowCount != 0)) {
            _context5.next = 11;
            break;
          }
          return _context5.abrupt("return", res.status(200).json({
            success: true,
            data: getDrivingLicenseResult.rows[0]
          }));
        case 11:
          return _context5.abrupt("return", res.status(400).json({
            success: false,
            message: "Customer does't have the driving license"
          }));
        case 12:
          _context5.next = 18;
          break;
        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](3);
          console.log(_context5.t0);
          return _context5.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context5.t0)
          }));
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 14]]);
  }));
  return function getDrivingLicenseControllers(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

//This API will trigger the Aadhar Card OTP.
var triggerAadharOtpController = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var aadhaar_number, signature, clientId, clientSecret, data, headerData, response, result;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          // //Get the Aadhar number and the id from the body.
          aadhaar_number = req.body.aadhaar_number; //Getting the Signature from the function to verification.
          _context6.next = 3;
          return generateSignature();
        case 3:
          signature = _context6.sent;
          //Getting the Client details form the env file.
          clientId = process.env.CASHFREE_CLIENT_ID;
          clientSecret = process.env.CASHFREE_CLIENT_SECRET; //Verification check
          if (!(!aadhaar_number || !signature || !clientId || !clientSecret)) {
            _context6.next = 8;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            success: false,
            message: "Re-check the data"
          }));
        case 8:
          //Data for the body;
          data = {
            aadhaar_number: aadhaar_number
          }; //Headers Data.
          headerData = {
            "Content-Type": "application/json",
            "x-client-id": clientId,
            "x-client-secret": clientSecret,
            "x-cf-signature": signature
          };
          _context6.prev = 10;
          _context6.next = 13;
          return fetch("".concat(cashfreeUrl, "/offline-aadhaar/otp"), {
            method: "POST",
            headers: headerData,
            body: JSON.stringify(data)
          });
        case 13:
          response = _context6.sent;
          console.log(aadhaar_number, clientId, clientSecret, signature);
          _context6.next = 17;
          return response.json();
        case 17:
          result = _context6.sent;
          console.log(result);
          if (!response.ok) {
            _context6.next = 23;
            break;
          }
          return _context6.abrupt("return", res.status(200).json({
            success: true,
            date: result
          }));
        case 23:
          return _context6.abrupt("return", res.status(400).json({
            success: false,
            date: result
          }));
        case 24:
          _context6.next = 30;
          break;
        case 26:
          _context6.prev = 26;
          _context6.t0 = _context6["catch"](10);
          console.log(_context6.t0);
          return _context6.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context6.t0)
          }));
        case 30:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[10, 26]]);
  }));
  return function triggerAadharOtpController(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

//This API will Verify the OTP which is sent to the user.
var verifyAadhaarOtpController = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$body2, ref_id, otp, aadhaar_number, signature, clientId, clientSecret, admin_id, encryptedAadhaarNumber, requestData, headerData, response, result, _result$split_address, base64String, holder_name, status, gender, dob, address, care_of, pincode, full_address, splitString, bufferPhotoString, isVerified, addCustomerDataQuery, addCustomerDataValue, addCustomerDataResult;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          //Getting the OTP and reference number to verify.
          _req$body2 = req.body, ref_id = _req$body2.ref_id, otp = _req$body2.otp, aadhaar_number = _req$body2.aadhaar_number;
          console.log(ref_id, otp, aadhaar_number);

          //Getting the signature from the function to verify.
          _context7.next = 4;
          return generateSignature();
        case 4:
          signature = _context7.sent;
          //Getting the client details from the env file.
          clientId = process.env.CASHFREE_CLIENT_ID;
          clientSecret = process.env.CASHFREE_CLIENT_SECRET; //Getting the details from the middleawae.
          admin_id = 5; //Validation check.
          if (!(!signature || !clientId || !clientSecret || !otp || !ref_id || !aadhaar_number || !admin_id)) {
            _context7.next = 10;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            success: false,
            message: "Re-check the Data"
          }));
        case 10:
          _context7.next = 12;
          return encryptData(aadhaar_number);
        case 12:
          encryptedAadhaarNumber = _context7.sent;
          //Make the data for the request.
          requestData = {
            otp: otp,
            ref_id: ref_id
          }; //Headers Data.
          headerData = {
            "Content-Type": "application/json",
            "x-client-id": clientId,
            "x-client-secret": clientSecret,
            "x-cf-signature": signature
          };
          _context7.prev = 15;
          _context7.next = 18;
          return fetch("".concat(cashfreeUrl, "/offline-aadhaar/verify"), {
            method: "POST",
            headers: headerData,
            body: JSON.stringify(requestData)
          });
        case 18:
          response = _context7.sent;
          _context7.next = 21;
          return response.json();
        case 21:
          result = _context7.sent;
          console.log(result);
          if (!response.ok) {
            _context7.next = 49;
            break;
          }
          //Get the Details of the Aadhaar card from the API.
          base64String = result === null || result === void 0 ? void 0 : result.photo_link;
          holder_name = result === null || result === void 0 ? void 0 : result.name;
          status = result === null || result === void 0 ? void 0 : result.status;
          gender = result === null || result === void 0 ? void 0 : result.gender;
          dob = result === null || result === void 0 ? void 0 : result.dob;
          address = result === null || result === void 0 ? void 0 : result.address;
          care_of = result === null || result === void 0 ? void 0 : result.care_of;
          pincode = result === null || result === void 0 || (_result$split_address = result.split_address) === null || _result$split_address === void 0 ? void 0 : _result$split_address.pincode;
          full_address = "".concat(address, ", ").concat(pincode); //Splitting the photolink into two such that we only store the desired link.
          splitString = base64String.split(",")[1]; //Converting the Base 64 String into the Buffer.
          bufferPhotoString = Buffer.from(splitString, "base64");
          console.log(bufferPhotoString);

          //Setting the isverified to true is the status of the aadhar is true.
          isVerified = status === "VALID" ? true : false; //Adding the data into the database.
          addCustomerDataQuery = "INSERT INTO customer_registration (user_name, user_adhaar_number, aadhar_isverified, user_address, user_profile, user_gender, user_dob, user_status, user_care_of, created_by, updated_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id";
          addCustomerDataValue = [holder_name, encryptedAadhaarNumber, isVerified, full_address, bufferPhotoString, gender, dob, status, care_of, admin_id, admin_id]; //Query to hit the datbase to save the data.
          _context7.next = 41;
          return pool.query(addCustomerDataQuery, addCustomerDataValue);
        case 41:
          addCustomerDataResult = _context7.sent;
          if (!(addCustomerDataResult.rowCount != 0)) {
            _context7.next = 46;
            break;
          }
          return _context7.abrupt("return", res.status(200).json({
            success: true,
            message: "Aadhaar details added successfully",
            user_name: holder_name,
            // Send the name to frontend
            user_address: full_address // Send the address to frontend
          }));
        case 46:
          return _context7.abrupt("return", res.status(400).json({
            success: false,
            message: "Touble in adding the new Customer."
          }));
        case 47:
          _context7.next = 50;
          break;
        case 49:
          return _context7.abrupt("return", res.status(400).json({
            success: false,
            date: result
          }));
        case 50:
          _context7.next = 56;
          break;
        case 52:
          _context7.prev = 52;
          _context7.t0 = _context7["catch"](15);
          console.log(_context7.t0);
          return _context7.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context7.t0)
          }));
        case 56:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[15, 52]]);
  }));
  return function verifyAadhaarOtpController(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

//Adding the Customer detail like phone number, Altrnative phone number.
var triggerMobileOtpCustomerController = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$body3, user_mobile, user_alt_no, otp;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          //Getting the Data from the body.
          _req$body3 = req.body, user_mobile = _req$body3.user_mobile, user_alt_no = _req$body3.user_alt_no; //Validation Check
          if (!(!user_mobile || !user_alt_no)) {
            _context8.next = 3;
            break;
          }
          return _context8.abrupt("return", res.status(400).json({
            success: false,
            message: "Re-check the data"
          }));
        case 3:
          _context8.next = 5;
          return otpGenerator();
        case 5:
          otp = _context8.sent;
          if (otp) {
            _context8.next = 8;
            break;
          }
          throw new Error("Error in creating the otp");
        case 8:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function triggerMobileOtpCustomerController(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

//This is to verify the otp from the customer.
var verifyOtpCustomerController = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function verifyOtpCustomerController(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var updateCustomerMobileController = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var _req$body4, aadhaar_number, user_mobile, user_alt_no, admin_id, encryptedAadhaarNumber, updateCustomerQuery, updateValues, updateResult;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          // Extract Aadhaar number, mobile number, and alternate number from request body
          _req$body4 = req.body, aadhaar_number = _req$body4.aadhaar_number, user_mobile = _req$body4.user_mobile, user_alt_no = _req$body4.user_alt_no;
          admin_id = 5; // Validation check
          if (!(!aadhaar_number || !user_mobile || !user_alt_no)) {
            _context10.next = 4;
            break;
          }
          return _context10.abrupt("return", res.status(400).json({
            success: false,
            message: "Please provide aadhaar_number, user_mobile, and user_alt_no"
          }));
        case 4:
          _context10.prev = 4;
          _context10.next = 7;
          return encryptData(aadhaar_number);
        case 7:
          encryptedAadhaarNumber = _context10.sent;
          // Query to update mobile and alternate number based on encrypted Aadhaar number
          updateCustomerQuery = "\n      UPDATE customer_registration \n      SET user_mobile = $1, user_alt_no = $2, updated_by = $3\n      WHERE user_adhaar_number = $4\n      RETURNING *;\n    ";
          updateValues = [user_mobile, user_alt_no, admin_id, encryptedAadhaarNumber];
          _context10.next = 12;
          return pool.query(updateCustomerQuery, updateValues);
        case 12:
          updateResult = _context10.sent;
          if (!(updateResult.rowCount !== 0)) {
            _context10.next = 17;
            break;
          }
          return _context10.abrupt("return", res.status(200).json({
            success: true,
            message: "Mobile number updated successfully",
            user_mobile: user_mobile,
            user_alt_no: user_alt_no
          }));
        case 17:
          return _context10.abrupt("return", res.status(404).json({
            success: false,
            message: "User not found"
          }));
        case 18:
          _context10.next = 24;
          break;
        case 20:
          _context10.prev = 20;
          _context10.t0 = _context10["catch"](4);
          console.error("Error updating mobile number:", _context10.t0);
          return _context10.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error"
          }));
        case 24:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[4, 20]]);
  }));
  return function updateCustomerMobileController(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
module.exports = {
  getCustomersControllers: getCustomersControllers,
  getCustomerControllers: getCustomerControllers,
  getCustomerDrivingLicencesControllers: getCustomerDrivingLicencesControllers,
  getDrivingLicenseControllers: getDrivingLicenseControllers,
  triggerAadharOtpController: triggerAadharOtpController,
  verifyAadhaarOtpController: verifyAadhaarOtpController,
  triggerMobileOtpCustomerController: triggerMobileOtpCustomerController,
  getLastTransactionsDate: getLastTransactionsDate,
  updateCustomerMobileController: updateCustomerMobileController
};