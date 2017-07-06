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

var moduel_prefix = 'ioio_expatriate_index';

exports.register = function(server, options, next) {
    server.route([
        {
            method: 'GET',
            path: '/desc',
            handler: function(request, reply) {
                return reply({"success":true,"message":"ok","desc":"ioio expatriate service","server":server.info.uri});
            },
        },
        
    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};