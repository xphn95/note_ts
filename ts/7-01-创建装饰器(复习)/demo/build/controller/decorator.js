"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Use = exports.Controller = exports.Post = exports.Get = exports.getRequestDecorator = exports.router = void 0;
var express_1 = require("express");
require("reflect-metadata");
/* enum Method {
  get = 'get',
  post = 'post'
} */
exports.router = express_1.Router();
/* export function Get(path: string) {
  return function (target: typeof LoginController.prototype, key: string) {
    Reflect.defineMetadata('path', path, target, key)
    Reflect.defineMetadata('method', 'get', target, key)
  }
}

export function Post(path: string) {
  return function (target: typeof LoginController.prototype, key: string) {
    Reflect.defineMetadata('path', path, target, key)
    Reflect.defineMetadata('method', 'post', target, key)
  }
} */
// 高度相似, 冗余, 用工厂方式生成
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
}
exports.getRequestDecorator = getRequestDecorator;
exports.Get = getRequestDecorator('get');
exports.Post = getRequestDecorator('post');
function Controller(target) {
    for (var key in target.prototype) {
        var path = Reflect.getMetadata('path', target.prototype, key);
        var method = Reflect.getMetadata('method', target.prototype, key);
        var middleware = Reflect.getMetadata('middleware', target.prototype, key);
        var handler = target.prototype[key];
        // Reflect.getMetadata 的返回值是 any 类型, 即 method 是 any 类型
        // router[method] 的 method 是字符串类型, 但更加严格地说是特定的字符串, 表示请求方式的字符串(例如: 'get', 'post')
        // 所以解决报错的方式有类型断言和借助枚举类型
        if (path && method && handler) {
            if (middleware) {
                exports.router[method](path, middleware, handler);
            }
            else {
                exports.router[method](path, handler);
            }
        }
    }
}
exports.Controller = Controller;
var Use = function (middleware) {
    return function (target, key) {
        Reflect.defineMetadata('middleware', middleware, target, key);
    };
};
exports.Use = Use;
