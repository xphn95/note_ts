"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cookie_session_1 = __importDefault(require("cookie-session"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
// import router from './router'
// 引入LoginController就执行了装饰器
require("./controller/LoginController");
var decorator_1 = require("./controller/decorator");
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(cookie_session_1.default({
    name: 'session',
    keys: ['spider'],
    maxAge: 24 * 60 * 60 * 1000
}));
app.use(decorator_1.router);
app.listen(7001, function () {
    console.log('server is running');
});
