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

var host = "http://211.149.248.241:16006/";

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
        
        //任务列表
        list_task: function(stage,cb) {
            if (!stage) {
                stage = "";
            }
            var url = host + "outside_task/list_task?stage="+stage;
            
            uu_request.do_get_method(url,function(err,content) {
                cb(err,content)
            });
        },
        
        //查询单个任务
        get_by_id: function(id,cb) {
            var url = host + "outside_task/get_by_id?id="+id;
            
            uu_request.do_get_method(url,function(err,content) {
                cb(err,content)
            });
        },
        
        //删除单个任务
        delete_by_id: function(id,cb) {
            var url = host + "outside_task/delete_by_id";
            var data = {"id":id};
            
            uu_request.do_post_method(url,data,function(err,content) {
                cb(err,content)
            });
        },
        
        //按个人查询任务
        get_by_worker: function(worker_id,stage,cb) {
            if (!stage) {
                stage = "";
            }
            
            var url = host + "outside_task/get_by_worker?worker_id="+worker_id+"&stage="+stage;
            
            uu_request.do_get_method(url,function(err,content) {
                cb(err,content)
            });
        },
        
        //指派任务
        assign_worker: function(id,workers,cb) {
            var url = host + "outside_task/assign_worker";
            var data = {"id":id,"workers":workers};
            
            uu_request.do_post_method(url,data,function(err,content) {
                cb(err,content)
            });
        },
        
        //工人当前任务量
        worker_task_count: function(cb) {
            var url = host + "outside_task/worker_task_count";
            
            uu_request.do_get_method(url,function(err,content) {
                cb(err,content)
            });
        },
    };
};

module.exports = nav;