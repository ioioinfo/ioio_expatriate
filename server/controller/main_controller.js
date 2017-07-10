/**
 ┌──────────────────────────────────────────────────────────────┐
 │               ___ ___ ___ ___ ___ _  _ ___ ___               │
 │              |_ _/ _ \_ _/ _ \_ _| \| | __/ _ \              │
 │               | | (_) | | (_) | || .` | _| (_) |             │
 │              |___\___/___\___/___|_|\_|_| \___/              │
 │                                                              │
 │                                                              │
 │                       set up in 2015.2                       │
 │                                                              │
 │   committed to the intelligent transformation of the world   │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘
*/

var _ = require('lodash');
var r = require('request');
var moment = require('moment');
var eventproxy = require('eventproxy');

var moduel_prefix = 'ioio_expatriate_main';

exports.register = function(server, options, next) {
    var wx_api = server.plugins.services.wx_api;
    var person = server.plugins.services.person;

    var cookie_options = {ttl:10*365*24*60*60*1000};
    var cookie_key = "ioio_expatriate_cookie";

    server.route([
        //首页
        {
            method: 'GET',
            path: '/index',
            handler: function(request, reply) {
                return reply.view("index");
            },
        },

        //my_job我的工作
        {
            method: 'GET',
            path: '/my_job',
            handler: function(request, reply) {
                return reply.view("my_job");
            },
        },

        //today_task当日完成任务
        {
            method: 'GET',
            path: '/today_task',
            handler: function(request, reply) {
                return reply.view("today_task");
            },
        },

        //task管理员任务
        {
            method: 'GET',
            path: '/task',
            handler: function(request, reply) {
                return reply.view("task");
            },
        },

        //bind管理员绑定
        {
            method: 'GET',
            path: '/bind',
            handler: function(request, reply) {
                return reply.view("bind");
            },
        },

    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};
