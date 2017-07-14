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
var eventproxy = require('eventproxy');
const util = require('util');
const uu_request = require('../utils/uu_request');

var host = "http://211.149.248.241:16010/";

var nav = function(server) {
    return {
        save_task: function(options,cb) {
            var url = host + "outside_task/save_task";
            var data = options;

            uu_request.request(url, data, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    cb(err,body);
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        
        //工人列表
        list_worker: function(cb) {
            var url = host + "worker/list_worker";
            
            uu_request.do_get_method(url,function(err,content) {
                cb(err,content)
            });
        },
        
        //工作照
        get_photo_by_worker: function(worker_id,cb) {
            var url = host + "worker/get_photo_by_worker?worker_id="+worker_id;
            
            uu_request.do_get_method(url,function(err,content) {
                cb(err,content)
            });
        },
        
        employer_check: function(gonghao,mobile,cb) {
            var url = host + "hr/employer_check";
            var data = {gonghao:gonghao,mobile:mobile};

            uu_request.request(url, data, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    cb(err,body);
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        
    };
};

module.exports = nav;