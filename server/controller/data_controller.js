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

var moduel_prefix = 'ioio_expatriate_data';

exports.register = function(server, options, next) {
    var service_info = "ioio expatriate";
    
    var task = server.plugins.services.task;

    var cookie_options = {ttl:10*365*24*60*60*1000};
    var cookie_key = "ioio_expatriate_cookie";

    server.route([
        //首页
        {
            method: 'POST',
            path: '/save_task',
            handler: function(request, reply) {
                var id = request.payload.id;
                var task_name = request.payload.task_name;
                var plan_date = request.payload.plan_date;
                var deadline = request.payload.deadline;
                var customer_name = request.payload.customer_name;
                var address = request.payload.address;
                var link_name = request.payload.link_name;
                var mobile = request.payload.mobile;
                var task_desc = request.payload.task_desc;
                
                if (!task_name) {
                    return reply({"success":false,"message":"param task_name is null","service_info":service_info});
                }
                if (!plan_date) {
                    return reply({"success":false,"message":"param plan_date is null","service_info":service_info});
                }
                if (!deadline) {
                    return reply({"success":false,"message":"param deadline is null","service_info":service_info});
                }
                if (!customer_name) {
                    return reply({"success":false,"message":"param customer_name is null","service_info":service_info});
                }
                if (!address) {
                    return reply({"success":false,"message":"param address is null","service_info":service_info});
                }
                if (!link_name) {
                    return reply({"success":false,"message":"param link_name is null","service_info":service_info});
                }
                if (!mobile) {
                    return reply({"success":false,"message":"param mobile is null","service_info":service_info});
                }
                if (!task_desc) {
                    return reply({"success":false,"message":"param task_desc is null","service_info":service_info});
                }
                
                var options = {"id":id,"task_name":task_name,"plan_date":plan_date,"deadline":deadline,"customer_name":customer_name
                ,"address":address,"link_name":link_name,"mobile":mobile,"task_desc":task_desc};
                
                task.save_task(options,function(err,content) {
                    return reply(content);
                });
            },
        },
        
        {
            method: "GET",
            path: '/list_task',
            handler: function(request, reply) {
                task.list_task(function(err,content) {
                    return reply(content);
                });
            }
        },
        
        {
            method: "GET",
            path: '/get_by_id',
            handler: function(request, reply) {
                var id = request.query.id;
                if (!id) {
                    return reply({"success":false,"message":"param id is null","service_info":service_info});
                }
                
                task.get_by_id(id,function(err,content) {
                    return reply(content);
                });
            }
        },

        //删除单个任务
        {
            method: 'POST',
            path: '/delete_by_id',
            handler: function(request,reply) {
                var id = request.payload.id;
                
                if (!id) {
                    return reply({"success":false,"message":"param id is null","service_info":service_info});
                }
                
                task.delete_by_id(id,function(err,content) {
                    return reply(content);
                });
            }
        },
        
        //按个人查询任务
        {
            method: 'GET',
            path: '/get_by_person',
            handler: function(request,reply) {
                var person_id = request.query.person_id;
                
                if (!person_id) {
                    return reply({"success":false,"message":"param person_id is null","service_info":service_info});
                }
                
                task.get_by_person(person_id,function(err,content) {
                    return reply(content);
                });
            }
        },
        
        //指派任务
        {
            method: 'POST',
            path: '/assign_worker',
            handler: function(request,reply) {
                var id = request.payload.id;
                
                if (!id) {
                    return reply({"success":false,"message":"param id is null","service_info":service_info});
                }
                
                var workers = request.payload.workers;
                
                if (!workers) {
                    return reply({"success":false,"message":"param workers is null","service_info":service_info});
                }
                
                task.assign_worker(id,workers,function(err,content) {
                    return reply(content);
                });
            }
        },
        
    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};
