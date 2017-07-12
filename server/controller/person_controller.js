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

var moduel_prefix = 'ioio_expatriate_person';

exports.register = function(server, options, next) {
    var task = server.plugins.services.task;
    var person = server.plugins.services.person;
    var wx_api = server.plugins.services.wx_api;
    var hr = server.plugins.services.hr;
    
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

    server.route([
        //员工绑定
        {
            method: 'POST',
            path: '/employer_check',
            handler: function(request, reply) {
                var gonghao = request.payload.gonghao;
                var mobile = request.payload.mobile;
                
                if (!gonghao) {
                    return reply({"success":false,"message":"param gonghao is null"});
                }
                if (!mobile) {
                    return reply({"success":false,"message":"param mobile is null"});
                }
                
                page_get_openid(request,function(openid) {
                    if (!openid) {
                        return reply({"success":false,"message":"openid is null"});
                    }
                    
                    //判断用户
                    hr.employer_check(gonghao,mobile,function(err,content) {
                        if (err) {
                            return reply({"success":false,"message":content.message});
                        }
                        
                        //绑定用户信息
                        var row = content.row;
                        var person_name = row.worker_name;
                        var mobile = row.mobile;
                        var data_source = "公众号绑定";
                        
                        person.save_person(mobile,person_name,mobile,data_source,function(err,result) {
                            if (err) {
                                return reply({"success":false,"message":result.message});
                            }
                            
                            var person_id = result.person_id;
                            var platform_id = "worker";
                            
                            //绑定用户微信信息
                            person.bind_person_wx(person_id,platform_id,openid,function(err,result) {
                                
                            });
                            
                            return reply({"success":true,"message":"ok"});
                        });
                    });
                });
            }
        },
        
        //查看员工信息
        {
            method: 'GET',
            path: '/get_person_wx',
            handler: function(request, reply) {
                page_get_openid(request, function(openid) {
                    if (!openid) {
                        return reply({"success":false,"message":"param openid is null"});
                    }
                    var platform_id = "worker";
                    
                    person.get_person_wx(platform_id,openid,function(err,rows) {
                        return reply({"success":true,"message":"ok","rows":rows});
                    });
                });
            }
        },

    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};
