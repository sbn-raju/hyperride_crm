"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
//Jai Sree Ram...!!
var _require = require("../database/db.connect.js"),
  pool = _require.pool;

//This API will add the vehicle into the database.
var addVehicleControllers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$file;
    var _req$body, vehicle_name, vehicle_number, vehicle_color, engine_type, vehicle_category, admin_id, vehicle_image, addVehicleQuery, addVehicleValue, addVehicleResult;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          //Getting the information from the request.
          _req$body = req.body, vehicle_name = _req$body.vehicle_name, vehicle_number = _req$body.vehicle_number, vehicle_color = _req$body.vehicle_color, engine_type = _req$body.engine_type, vehicle_category = _req$body.vehicle_category; //Getting the Admin id from the middleware.
          admin_id = req.user.id; // const admin_id = 1;
          console.log("Vehicle Data", req.body);

          //Adding the vehicle images path to the database.
          vehicle_image = ((_req$file = req.file) === null || _req$file === void 0 ? void 0 : _req$file.path) || null;
          console.log("Vehicle image", vehicle_image);

          //Validation check recieved from the frontend.
          if (!(!vehicle_name || !vehicle_number || !vehicle_color || !engine_type || !vehicle_image || !vehicle_category)) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "Re-check the entered data."
          }));
        case 7:
          //Query to hit the database
          addVehicleQuery = "INSERT INTO vehicle_master (vehicle_name, vehicle_number, vehicle_color, engine_type, vehicle_image, vehicle_category, created_by, updated_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
          addVehicleValue = [vehicle_name, vehicle_number, vehicle_color, engine_type, vehicle_image, vehicle_category, admin_id, admin_id]; //Add the information.
          _context.prev = 9;
          _context.next = 12;
          return pool.query(addVehicleQuery, addVehicleValue);
        case 12:
          addVehicleResult = _context.sent;
          if (!(addVehicleResult.rowCount != 0)) {
            _context.next = 15;
            break;
          }
          return _context.abrupt("return", res.status(201).json({
            success: true,
            message: "Vehicle added successfully"
          }));
        case 15:
          _context.next = 21;
          break;
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](9);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context.t0)
          }));
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[9, 17]]);
  }));
  return function addVehicleControllers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

//This API will make the vehicle freeze.
var freezeVehicleController = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var vehicle_id, admin_id, freezeVehicleQuery, freezeVehicleValue, freezeVehicleResult;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          //Getting the vehicle id from the query.
          vehicle_id = req.query.vehicle_id; //Validation check.
          if (vehicle_id) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: "Re-check the entered data."
          }));
        case 3:
          //Adding the user id from the middleware.
          admin_id = req.user.id; //Query to Freeze the vehicle into the database.
          freezeVehicleQuery = "UPDATE vehicle_master SET vehicle_isfreeze = $1 , vehicle_isavailable = $2, updated_by = $3 WHERE id = $4";
          freezeVehicleValue = [true, false, admin_id, vehicle_id]; //Update the information.
          _context2.prev = 6;
          _context2.next = 9;
          return pool.query(freezeVehicleQuery, freezeVehicleValue);
        case 9:
          freezeVehicleResult = _context2.sent;
          if (!(freezeVehicleResult.rowCount != 0)) {
            _context2.next = 14;
            break;
          }
          return _context2.abrupt("return", res.status(200).json({
            success: true,
            message: "Vehicle is freezed successfully"
          }));
        case 14:
          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: "Vehicle is not found"
          }));
        case 15:
          _context2.next = 21;
          break;
        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](6);
          console.log(_context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context2.t0)
          }));
        case 21:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[6, 17]]);
  }));
  return function freezeVehicleController(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

//This API will make the vehicle unfreeze.
var unfreezeVehicleController = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var vehicle_id, admin_id, freezeVehicleQuery, freezeVehicleValue, freezeVehicleResult;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          //Getting the vehicle id from the query.
          vehicle_id = req.query.vehicle_id; //Validation check.
          if (vehicle_id) {
            _context3.next = 3;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: "Re-check the entered data."
          }));
        case 3:
          admin_id = req.user.id; //Query to Freeze the vehicle into the database.
          freezeVehicleQuery = "UPDATE vehicle_master SET vehicle_isfreeze = $1 , vehicle_isavailable = $2, updated_by = $3 WHERE id = $4";
          freezeVehicleValue = [false, true, admin_id, vehicle_id]; //Update the information.
          _context3.prev = 6;
          _context3.next = 9;
          return pool.query(freezeVehicleQuery, freezeVehicleValue);
        case 9:
          freezeVehicleResult = _context3.sent;
          if (!(freezeVehicleResult.rowCount != 0)) {
            _context3.next = 14;
            break;
          }
          return _context3.abrupt("return", res.status(200).json({
            success: true,
            message: "Vehicle is unfreezed successfully"
          }));
        case 14:
          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: "Vehicle is not found"
          }));
        case 15:
          _context3.next = 21;
          break;
        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](6);
          console.log(_context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context3.t0)
          }));
        case 21:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[6, 17]]);
  }));
  return function unfreezeVehicleController(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getAllVehicleControllers = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var page, limit, offset, countQuery, getQuery, countResult, totalCount, getQueryResult;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          // Extract page and limit from query parameters with defaults
          page = parseInt(req.query.page, 10) || 1; // Default to page 1
          limit = parseInt(req.query.limit, 10) || 10; // Default to 10 records per page
          offset = (page - 1) * limit; // Calculate offset for pagination
          // Query to get the total count of vehicles
          countQuery = "SELECT COUNT(*) FROM vehicle_master"; // Query to fetch the vehicles with limit and offset
          getQuery = "\n        SELECT * FROM vehicle_master WHERE is_delete = $1\n        ORDER BY id ASC\n        LIMIT $2 OFFSET $3\n    ";
          _context4.prev = 5;
          _context4.next = 8;
          return pool.query(countQuery);
        case 8:
          countResult = _context4.sent;
          totalCount = parseInt(countResult.rows[0].count, 10); // Execute the fetch query
          _context4.next = 12;
          return pool.query(getQuery, [0, limit, offset]);
        case 12:
          getQueryResult = _context4.sent;
          if (!(getQueryResult.rowCount > 0)) {
            _context4.next = 17;
            break;
          }
          return _context4.abrupt("return", res.status(200).json({
            success: true,
            data: getQueryResult.rows,
            totalCount: totalCount,
            // Total number of vehicles
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit) // Calculate total pages
          }));
        case 17:
          return _context4.abrupt("return", res.status(404).json({
            success: false,
            message: "No vehicles found"
          }));
        case 18:
          _context4.next = 24;
          break;
        case 20:
          _context4.prev = 20;
          _context4.t0 = _context4["catch"](5);
          console.error(_context4.t0);
          return _context4.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context4.t0.message)
          }));
        case 24:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[5, 20]]);
  }));
  return function getAllVehicleControllers(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

//This API will fetch the all the vehicles listed which are available.
var getAllAvailableVehicleControllers = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var page, limit, offset, engineType, getQuery, getValue, getCountQuery, getCountValue, countResult, totalCount, getQueryResult;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          // Extract page and limit from query parameters with defaults
          page = parseInt(req.query.page, 10) || 1; // Default to page 1
          limit = parseInt(req.query.limit, 10) || 10; // Default to 10 records per page
          offset = (page - 1) * limit; // Calculate offset for pagination
          engineType = req.query.engine_type;
          console.log(engineType);
          getQuery = "";
          getValue = [];
          getCountQuery = "";
          getCountValue = []; // Query to fetch the vehicles with limit and offset
          if (engineType === "all") {
            getQuery = "\n    SELECT id, vehicle_name, vehicle_number, engine_type, vehicle_category FROM vehicle_master WHERE vehicle_isavailable = $1 AND is_delete = $2\n    ORDER BY id ASC\n    LIMIT $3 OFFSET $4\n";
            getValue = [true, 0, limit, offset];

            // Query to get the total count of vehicles
            getCountQuery = "SELECT COUNT(*) FROM vehicle_master WHERE vehicle_isavailable = $1 AND is_delete = $2";
            getCountValue = [true, 0];
          } else {
            getQuery = "\n    SELECT id, vehicle_name, vehicle_number, engine_type, vehicle_category FROM vehicle_master WHERE vehicle_isavailable = $1 AND is_delete = $2 AND engine_type = $3\n    ORDER BY id ASC\n    LIMIT $4 OFFSET $5\n";
            getValue = [true, 0, engineType, limit, offset];

            // Query to get the total count of vehicles
            getCountQuery = "SELECT COUNT(*) FROM vehicle_master WHERE engine_type = $1 AND vehicle_isavailable = $2 AND is_delete = $3";
            getCountValue = [engineType, true, 0];
          }
          _context5.prev = 10;
          _context5.next = 13;
          return pool.query(getCountQuery, getCountValue);
        case 13:
          countResult = _context5.sent;
          totalCount = parseInt(countResult.rows[0].count, 10); // Execute the fetch query
          _context5.next = 17;
          return pool.query(getQuery, getValue);
        case 17:
          getQueryResult = _context5.sent;
          if (!(getQueryResult.rowCount != 0)) {
            _context5.next = 22;
            break;
          }
          return _context5.abrupt("return", res.status(200).json({
            success: true,
            data: getQueryResult.rows,
            totalCount: totalCount,
            // Total number of vehicles
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit) // Calculate total pages
          }));
        case 22:
          return _context5.abrupt("return", res.status(404).json({
            success: false,
            message: "No vehicles found"
          }));
        case 23:
          _context5.next = 29;
          break;
        case 25:
          _context5.prev = 25;
          _context5.t0 = _context5["catch"](10);
          console.error(_context5.t0);
          return _context5.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context5.t0.message)
          }));
        case 29:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[10, 25]]);
  }));
  return function getAllAvailableVehicleControllers(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

//This API will fetch the all the vehicles listed which are available.
var getSingleVehicleControllers = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var vehicle_id, getQuery, getValue, getQueryResult;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          //Get the id from the query.
          vehicle_id = req.query.vehicle_id; //Query to get all the vehicle from the database.
          getQuery = "SELECT * FROM vehicle_master WHERE id = $1 AND is_delete = $2";
          getValue = [vehicle_id, 0]; //Get all the information.
          _context6.prev = 3;
          _context6.next = 6;
          return pool.query(getQuery, getValue);
        case 6:
          getQueryResult = _context6.sent;
          if (!(getQueryResult.rowCount != 0)) {
            _context6.next = 11;
            break;
          }
          return _context6.abrupt("return", res.status(200).json({
            success: true,
            data: getQueryResult.rows
          }));
        case 11:
          return _context6.abrupt("return", res.status(400).json({
            success: false,
            message: "No vehicle available"
          }));
        case 12:
          _context6.next = 18;
          break;
        case 14:
          _context6.prev = 14;
          _context6.t0 = _context6["catch"](3);
          console.log(_context6.t0);
          return _context6.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context6.t0)
          }));
        case 18:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[3, 14]]);
  }));
  return function getSingleVehicleControllers(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

//This API will fetch the all the vehicles listed which are available.
var getAllFrezzedVehicleControllers = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var getQuery, getValue, getQueryResult;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          //Query to get all the vehicle from the database.
          getQuery = "SELECT * FROM vehicle_master WHERE vehicle_isavailable = $1 AND vehicle_isfreeze = $2 AND is_delete = $3";
          getValue = [false, true, 0]; //Get all the information.
          _context7.prev = 2;
          _context7.next = 5;
          return pool.query(getQuery, getValue);
        case 5:
          getQueryResult = _context7.sent;
          if (!(getQueryResult.rowCount != 0)) {
            _context7.next = 10;
            break;
          }
          return _context7.abrupt("return", res.status(200).json({
            success: true,
            data: getQueryResult.rows
          }));
        case 10:
          return _context7.abrupt("return", res.status(400).json({
            success: false,
            message: "No vehicles available"
          }));
        case 11:
          _context7.next = 17;
          break;
        case 13:
          _context7.prev = 13;
          _context7.t0 = _context7["catch"](2);
          console.log(_context7.t0);
          return _context7.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context7.t0)
          }));
        case 17:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[2, 13]]);
  }));
  return function getAllFrezzedVehicleControllers(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

//This API will get the engine types
var getEngineTypeController = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var getEngineTypeQuery, getEngineTypeResult;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          //Query to get the unique Engine type.
          getEngineTypeQuery = "SELECT DISTINCT engine_type FROM vehicle_master";
          _context8.prev = 1;
          _context8.next = 4;
          return pool.query(getEngineTypeQuery);
        case 4:
          getEngineTypeResult = _context8.sent;
          if (!(getEngineTypeResult.rowCount != 0)) {
            _context8.next = 9;
            break;
          }
          return _context8.abrupt("return", res.status(200).json({
            success: true,
            data: getEngineTypeResult.rows
          }));
        case 9:
          return _context8.abrupt("return", res.status(400).json({
            success: false,
            message: "No Distinct Engine Types"
          }));
        case 10:
          _context8.next = 16;
          break;
        case 12:
          _context8.prev = 12;
          _context8.t0 = _context8["catch"](1);
          console.log(_context8.t0);
          return _context8.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context8.t0)
          }));
        case 16:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[1, 12]]);
  }));
  return function getEngineTypeController(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

//This API will get the unique
var getVehicleCategoryController = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var getVehicleCategoryQuery, getVehicleCategoryResult;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          //Query to get the unique Engine type.
          getVehicleCategoryQuery = "SELECT DISTINCT vehicle_category FROM vehicle_master";
          _context9.prev = 1;
          _context9.next = 4;
          return pool.query(getVehicleCategoryQuery);
        case 4:
          getVehicleCategoryResult = _context9.sent;
          if (!(getVehicleCategoryResult.rowCount != 0)) {
            _context9.next = 9;
            break;
          }
          return _context9.abrupt("return", res.status(200).json({
            success: true,
            data: getVehicleCategoryResult.rows
          }));
        case 9:
          return _context9.abrupt("return", res.status(400).json({
            success: false,
            message: "No Distinct Vehicle Category"
          }));
        case 10:
          _context9.next = 16;
          break;
        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9["catch"](1);
          console.log(_context9.t0);
          return _context9.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context9.t0)
          }));
        case 16:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[1, 12]]);
  }));
  return function getVehicleCategoryController(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

//Geeting vehicle based on the Category and engine type.
var getEngineAndCategory = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var _req$body2, vehicle_category, engine_type, fetchVehiclesQuery, ftechVehiclesValue, fetchVehiclesResult;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          //Getting the vehicle category and the engine type.
          _req$body2 = req.body, vehicle_category = _req$body2.vehicle_category, engine_type = _req$body2.engine_type; //Validation Check.
          if (!(!vehicle_category || !engine_type)) {
            _context10.next = 3;
            break;
          }
          return _context10.abrupt("return", res.status(400).json({
            success: false,
            message: "All fields required"
          }));
        case 3:
          //Query to fetch the vehicles based on teh engine type and the vehicle type.
          fetchVehiclesQuery = "SELECT id, vehicle_name, vehicle_number FROM vehicle_master WHERE engine_type = $1 AND vehicle_category = $2 AND vehicle_isavailable = $3 AND is_delete = $4";
          ftechVehiclesValue = [engine_type, vehicle_category, true, 0];
          _context10.prev = 5;
          _context10.next = 8;
          return pool.query(fetchVehiclesQuery, ftechVehiclesValue);
        case 8:
          fetchVehiclesResult = _context10.sent;
          if (!(fetchVehiclesResult.rowCount != 0)) {
            _context10.next = 13;
            break;
          }
          return _context10.abrupt("return", res.status(200).json({
            success: true,
            data: fetchVehiclesResult.rows
          }));
        case 13:
          return _context10.abrupt("return", res.status(400).json({
            success: false,
            message: "No Vehicle Found in this variants"
          }));
        case 14:
          _context10.next = 20;
          break;
        case 16:
          _context10.prev = 16;
          _context10.t0 = _context10["catch"](5);
          console.log(_context10.t0);
          return _context10.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context10.t0)
          }));
        case 20:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[5, 16]]);
  }));
  return function getEngineAndCategory(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

//This below API will soft delete the vehicle details.
var deleteVehicleController = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var id, admin_id, deleteQuery, deleteValues, response;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          //Getting the id of the vehicle from the body.
          id = req.body.id; //Validation check.
          if (id) {
            _context11.next = 3;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            success: false,
            message: "All the fields are required"
          }));
        case 3:
          admin_id = req.user.id; //Query to delete the vehicle from the database.
          deleteQuery = "UPDATE vehicle_master SET is_delete = $1, updated_by = $2 WHERE id = $3 RETURNING *";
          deleteValues = [1, admin_id, id];
          _context11.prev = 6;
          _context11.next = 9;
          return pool.query(deleteQuery, deleteValues);
        case 9:
          response = _context11.sent;
          if (!(response.rowCount != 0)) {
            _context11.next = 14;
            break;
          }
          return _context11.abrupt("return", res.status(200).json({
            success: true,
            message: "Vehicle delete successfully"
          }));
        case 14:
          return _context11.abrupt("return", res.status(400).json({
            success: false,
            message: "Vehicle not found"
          }));
        case 15:
          _context11.next = 21;
          break;
        case 17:
          _context11.prev = 17;
          _context11.t0 = _context11["catch"](6);
          console.log(_context11.t0);
          return _context11.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context11.t0)
          }));
        case 21:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[6, 17]]);
  }));
  return function deleteVehicleController(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

//This Will get all the vehicle where for the service data
var getAllVehicleServiceControllers = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var page, limit, offset, engineType, getQuery, getValue, getCountQuery, getCountValue, countResult, totalCount, getQueryResult;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          // Extract page and limit from query parameters with defaults
          page = parseInt(req.query.page, 10) || 1; // Default to page 1
          limit = parseInt(req.query.limit, 10) || 10; // Default to 10 records per page
          offset = (page - 1) * limit; // Calculate offset for pagination
          engineType = req.query.engine_type;
          console.log(engineType);
          getQuery = "";
          getValue = [];
          getCountQuery = "";
          getCountValue = []; // Query to fetch the vehicles with limit and offset
          if (engineType === "all") {
            getQuery = "\n    SELECT id, vehicle_name, vehicle_number, engine_type, vehicle_category FROM vehicle_master WHERE is_delete = $1\n    ORDER BY id ASC\n    LIMIT $2 OFFSET $3\n";
            getValue = [0, limit, offset];

            // Query to get the total count of vehicles
            getCountQuery = "SELECT COUNT(*) FROM vehicle_master WHERE is_delete = $1";
            getCountValue = [0];
          } else {
            getQuery = "\n    SELECT id, vehicle_name, vehicle_number, engine_type, vehicle_category FROM vehicle_master WHERE is_delete = $1 AND engine_type = $2\n    ORDER BY id ASC\n    LIMIT $3 OFFSET $4\n";
            getValue = [0, engineType, limit, offset];

            // Query to get the total count of vehicles
            getCountQuery = "SELECT COUNT(*) FROM vehicle_master WHERE engine_type = $1 AND is_delete = $2";
            getCountValue = [engineType, 0];
          }
          _context12.prev = 10;
          _context12.next = 13;
          return pool.query(getCountQuery, getCountValue);
        case 13:
          countResult = _context12.sent;
          totalCount = parseInt(countResult.rows[0].count, 10); // Execute the fetch query
          _context12.next = 17;
          return pool.query(getQuery, getValue);
        case 17:
          getQueryResult = _context12.sent;
          if (!(getQueryResult.rowCount != 0)) {
            _context12.next = 22;
            break;
          }
          return _context12.abrupt("return", res.status(200).json({
            success: true,
            data: getQueryResult.rows,
            totalCount: totalCount,
            // Total number of vehicles
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit) // Calculate total pages
          }));
        case 22:
          return _context12.abrupt("return", res.status(404).json({
            success: false,
            message: "No vehicles found"
          }));
        case 23:
          _context12.next = 29;
          break;
        case 25:
          _context12.prev = 25;
          _context12.t0 = _context12["catch"](10);
          console.error(_context12.t0);
          return _context12.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context12.t0.message)
          }));
        case 29:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[10, 25]]);
  }));
  return function getAllVehicleServiceControllers(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();

//This is the controller which will tell which bike in use and all the details of that particular bike.
var getVehicleInUseController = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var booking_id, getVehicleInUseQuery, getVehicleInUseValues, getVehicleInUseResponse;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          //Getting the booking from the query.
          booking_id = req.query.booking_id; //Validation check of the booking Id.,
          if (booking_id) {
            _context13.next = 3;
            break;
          }
          return _context13.abrupt("return", res.status(200).json({
            success: false,
            message: "Vehicle Id not present."
          }));
        case 3:
          //Query to get the details of the bike based.
          getVehicleInUseQuery = "SELECT b.bike_id, v.* FROM bookings b JOIN vehicle_master v ON v.id = b.bike_id WHERE b.id = $1";
          getVehicleInUseValues = [booking_id]; //Getting the data from the backend.
          _context13.prev = 5;
          _context13.next = 8;
          return pool.query(getVehicleInUseQuery, getVehicleInUseValues);
        case 8:
          getVehicleInUseResponse = _context13.sent;
          if (!(getVehicleInUseResponse.rowCount != 0)) {
            _context13.next = 13;
            break;
          }
          return _context13.abrupt("return", res.status(200).json({
            success: true,
            data: getVehicleInUseResponse.rows[0]
          }));
        case 13:
          return _context13.abrupt("return", res.status(404).json({
            success: false,
            message: "No vehicles found"
          }));
        case 14:
          _context13.next = 20;
          break;
        case 16:
          _context13.prev = 16;
          _context13.t0 = _context13["catch"](5);
          console.error(_context13.t0);
          return _context13.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal Server Error: ".concat(_context13.t0.message)
          }));
        case 20:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[5, 16]]);
  }));
  return function getVehicleInUseController(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();
module.exports = {
  addVehicleControllers: addVehicleControllers,
  freezeVehicleController: freezeVehicleController,
  unfreezeVehicleController: unfreezeVehicleController,
  getAllVehicleControllers: getAllVehicleControllers,
  getAllAvailableVehicleControllers: getAllAvailableVehicleControllers,
  getSingleVehicleControllers: getSingleVehicleControllers,
  getAllFrezzedVehicleControllers: getAllFrezzedVehicleControllers,
  getEngineTypeController: getEngineTypeController,
  getVehicleCategoryController: getVehicleCategoryController,
  getEngineAndCategory: getEngineAndCategory,
  deleteVehicleController: deleteVehicleController,
  getAllVehicleServiceControllers: getAllVehicleServiceControllers,
  getVehicleInUseController: getVehicleInUseController
};