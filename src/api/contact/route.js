"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
// src/app/api/contact/route.ts
var server_1 = require("next/server");
var nodemailer_1 = require("nodemailer");
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var body, name, email, message, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM, TO, text, transporter, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, req.json()];
                case 1:
                    body = _a.sent();
                    name = body.name, email = body.email, message = body.message;
                    SMTP_HOST = process.env.SMTP_HOST;
                    SMTP_PORT = Number(process.env.SMTP_PORT || 587);
                    SMTP_USER = process.env.SMTP_USER;
                    SMTP_PASS = process.env.SMTP_PASS;
                    FROM = process.env.FROM_EMAIL || "no-reply@example.com";
                    TO = process.env.TO_EMAIL || process.env.SMTP_USER || "yourname@example.com";
                    text = "Message from portfolio contact form\n\nName: ".concat(name, "\nEmail: ").concat(email, "\n\n").concat(message);
                    if (!(SMTP_HOST && SMTP_USER && SMTP_PASS)) return [3 /*break*/, 3];
                    transporter = nodemailer_1.default.createTransport({
                        host: SMTP_HOST,
                        port: SMTP_PORT,
                        secure: SMTP_PORT === 465,
                        auth: { user: SMTP_USER, pass: SMTP_PASS }
                    });
                    return [4 /*yield*/, transporter.sendMail({
                            from: FROM,
                            to: TO,
                            subject: "Portfolio contact from ".concat(name),
                            text: text,
                            replyTo: email
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ ok: true }, { status: 200 })];
                case 3:
                    console.log("Contact form (no SMTP configured) - message:", { name: name, email: email, message: message });
                    return [2 /*return*/, server_1.NextResponse.json({ ok: true, info: "no-smtp" }, { status: 200 })];
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    console.error("contact error", err_1);
                    return [2 /*return*/, server_1.NextResponse.json({ ok: false }, { status: 500 })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
