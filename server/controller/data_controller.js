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
    
    var person = server.plugins.services.person;
    var task = server.plugins.services.task;
    var hr = server.plugins.services.hr;
    var notify = server.plugins.services.notify;

    var cookie_options = {ttl:10*365*24*60*60*1000};
    var cookie_key = "ioio_expatriate_cookie";
    
    //页面获取微信id
    var page_get_openid = function(request,cb) {
        var state;
        var openid = "";

        if (request.state && request.state.cookie) {
            state = request.state.cookie;
            if (state[cookie_key]) {
                openid = state[cookie_key];
            }
        }
        if (openid) {
            console.log("data api cookie openid:" + openid);
            cb(openid);
        } else {
            cb(null);
        }
    };
    
    //查询手机号
    var get_mobile = function(request,cb) {
        page_get_openid(request,function(openid) {
            if (!openid) {
                cb(null);
            } else {
                var platform_id = "worker";
                person.get_person_wx(platform_id,openid,function(err,rows) {
                    if (rows && rows.length > 0) {
                        var row = rows[0];

                        //查询手机号
                        person.get_mobile(row.person_id,function(err,rows) {
                            if (rows && rows.length > 0) {
                                cb(rows[0].mobile);
                            } else {
                                cb(null);
                            }
                        });
                    } else {
                        cb(null);
                    }
                });
            }
        });
    };
    
    //查询工人
    var get_worker = function(request,cb) {
        get_mobile(request,function(mobile) {
            if (!mobile) {
                cb(null);
            } else {
                hr.list_worker(function(err,content) {
                    var rows = content.rows;
                    var worker_id;
                    
                    _.each(rows,function(row) {
                        if (row.mobile == mobile) {
                            worker_id = row.id;
                            return false;
                        }
                    });
                    
                    cb(worker_id);
                });
            }
        });
    };
    
    var list_worker = function(cb) {
        hr.list_worker(function(err,content) {
            var rows = content.rows;
            var m_worker = {};
            
            _.each(rows,function(row) {
                m_worker[row.id] = row.worker_name;
            });
            
            cb(m_worker);
        });
    };
    
    var list_detail_worker = function(cb) {
        hr.list_worker(function(err,content) {
            var rows = content.rows;
            var m_worker = {};
            
            _.each(rows,function(row) {
                m_worker[row.id.toString()] = row;
            });
            
            cb(m_worker);
        });
    };
    
    //推送微信消息
    var save_notification = function(task_id,workers,cb) {
        workers = JSON.parse(workers);
        
        //查询任务信息
        task.get_by_id(task_id,function(err,content) {
            if (err) {
                cb(true,null);
                return;
            }
            
            var rows = content.rows;
            if (rows.length == 0) {
                cb(true,null);
                return;
            }
            
            var row = rows[0];
            
            var platform_id = "4s";
            var remark = "\\n任务编号："+row.id+"\\n地址："+row.address+"\\n期限："+row.deadline+"\\n联系人："+row.link_name+"\\n联系电话："+row.mobile;
            var message = {"title":"有新的任务","due_name":row.task_desc,"type_name":"新任务","remark":remark};
            var options = {"notify_type":"due_process","mp":{"platform_id":platform_id,"url":"http://worker.ioioinfo.com/my_job"}};
            
            //查询工人
            list_detail_worker(function(m_worker) {
                _.each(workers,function(worker) {
                    if (m_worker[worker]) {
                        var mobile = m_worker[worker].mobile;
                        if (mobile) {
                            person.get_by_mobile(mobile,function(err,row) {
                                if (!err) {
                                    notify.save_notification(platform_id,row.person_id,message,options,function(err,content){});
                                }
                            });
                        }
                    }
                });
            });
        });
    };

    server.route([
        //首页
        {
            method: 'POST',
            path: '/save_task',
            handler: function(request, reply) {
                var id = request.payload.id;
                var task_name = request.payload.task_name;
                var working_hours = request.payload.working_hours;
                var deadline = request.payload.deadline;
                var customer_name = request.payload.customer_name;
                var address = request.payload.address;
                var link_name = request.payload.link_name;
                var mobile = request.payload.mobile;
                var task_desc = request.payload.task_desc;
                
                if (!task_name) {
                    task_name = "工人任务";
                }
                if (!working_hours) {
                    return reply({"success":false,"message":"param working_hours is null","service_info":service_info});
                }
                if (!deadline) {
                    return reply({"success":false,"message":"param deadline is null","service_info":service_info});
                }
                if (!customer_name) {
                    customer_name = "客户";
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
                
                var options = {"id":id,"task_name":task_name,"working_hours":working_hours,"deadline":deadline,"customer_name":customer_name
                ,"address":address,"link_name":link_name,"mobile":mobile,"task_desc":task_desc};
                
                task.save_task(options,function(err,content) {
                    return reply(content);
                });
            },
        },
        
        //所有任务
        {
            method: "GET",
            path: '/list_task',
            handler: function(request, reply) {
                var stage = request.query.stage;
                
                task.list_task(stage,function(err,content) {
                    var rows = content.rows;
                    if (!rows) {
                        return reply({"success":true,"rows":[]});
                    }
                    list_worker(function(m_worker){
                        return reply({"success":true,"rows":rows,"m_worker":m_worker});
                    });
                });
            }
        },
        
        //搜索已完成的任务
        {
            method: "GET",
            path: '/search_complete',
            handler: function(request, reply) {
                var q = request.query.q;
                if (!q) {
                    return reply({"success":true,"rows":[]});
                }
                
                task.search_complete(q,function(err,content) {
                    var rows = content.rows;
                    if (!rows) {
                        return reply({"success":true,"rows":[]});
                    }
                    return reply({"success":true,"rows":rows});
                });
            }
        },
        
        //我的任务
        {
            method: "GET",
            path: '/list_my_task',
            handler: function(request, reply) {
                var worker_id = "3";
                var stage = "inprogress";
                
                task.get_by_worker(worker_id,stage,function(err,content) {
                    var rows = content.rows;
                    if (!rows) {
                        return reply({"success":true,"rows":[]});
                    }
                    list_worker(function(m_worker){
                        return reply({"success":true,"rows":rows,"m_worker":m_worker});
                    });
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
                    var rows = content.rows;
                    if (!rows) {
                        return reply({"success":true,"rows":[]});
                    }
                    list_worker(function(m_worker){
                        return reply({"success":true,"rows":rows,"m_worker":m_worker});
                    });
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
                var stage = request.query.stage;
                
                get_worker(request,function(worker_id) {
                    if (!worker_id) {
                        return reply({"success":false,"message":"worker_id is null","service_info":service_info});
                    }
                    
                    task.get_by_worker(worker_id,stage,function(err,content) {
                        var rows = content.rows;
                        if (!rows) {
                            return reply({"success":true,"rows":[]});
                        }
                        list_worker(function(m_worker){
                            return reply({"success":true,"rows":rows,"m_worker":m_worker});
                        });
                    });
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
                    //推送消息
                    save_notification(id,workers,function(err,content){});
                    
                    return reply(content);
                });
            }
        },
        
        //工人当前任务量
        {
            method: 'GET',
            path: '/worker_task_count',
            handler: function(request,reply) {
                task.worker_task_count(function(err,content) {
                    return reply(content);
                });
            }
        },
        
        //工人列表
        {
            method: "GET",
            path: '/list_worker',
            handler: function(request, reply) {
                hr.list_worker(function(err,content) {
                    return reply(content);
                });
            }
        },
        
        //工人照片
        {
            method: "GET",
            path: '/get_photo_by_worker',
            handler: function(request, reply) {
                var worker_id = "1";
                
                hr.get_photo_by_worker(worker_id,function(err,content) {
                    return reply(content);
                });
            }
        },
        
        //工人列表加任务量
        {
            method: "GET",
            path: '/list_worker_with_count',
            handler: function(request, reply) {
                hr.list_worker(function(err,content) {
                    var rows = content.rows;
                    task.worker_task_count(function(err,content) {
                        var m_worker = content.row;
                        
                        _.each(rows,function(worker) {
                            var count = m_worker[worker.id];
                            if (!count) {
                                count = 0;
                            }
                            worker.count = count;
                        });
                        
                        return reply({"success":true,"message":"ok","rows":rows});
                    });
                });
            }
        },
        
        //查询任务关联图片
        {
            method: "GET",
            path: '/list_picture_by_task',
            handler: function(request, reply) {
                var id = request.query.id;
                if (!id) {
                    return reply({"success":false,"message":"param id is null","service_info":service_info});
                }
                
                task.list_picture_by_task(id,function(err,content) {
                    var rows = content.rows;
                    if (!rows) {
                        return reply({"success":true,"rows":[]});
                    }
                    return reply({"success":true,"rows":rows});
                });
            }
        },
        
    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};
