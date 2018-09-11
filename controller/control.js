var formidable=require("formidable");

var admin=require("../model/admin.js");
var Class=require("../model/class.js");
var room=require("../model/room.js");
var order=require("../model/order.js");

var path = require("path");

var url=require("url");

var crypto = require("crypto");


exports.showIndex=function(req,res){
    res.render("index",{"login":req.session.login,"user":req.session.yonghuming});
    return;
}

//显示注册页
exports.showreg=function(req,res){
    res.render("reg");
    return;
}

exports.reg=function (req, res) {

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        // console.log(fields.mima);
        admin.getname(fields.user,function(err,data){
            // console.log(data);

            if(data){
                res.json({"result":-1});//用户名存在
                return;
            }else{

                var sha256 = crypto.createHash("sha256");
                sha256.update(fields.password)
                var str=sha256.digest("hex");


                admin.adduser({"user":fields.user,"password":str},function(err,data){
                    req.session.login=1;
                    req.session.user=fields.user;

                    res.json({"result":1});
                    return;
                })
            }

        })
    });
}


//显示登录
exports.showlogin=function (req, res) {
    res.render("login");
    return;
}

exports.login=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var user = fields.user;

        admin.getname(user,function(err,doc){
            // console.log(doc);
            // console.log(doc.mima);
            if(!doc){
                res.json({"result":-1});//已存在
                return;
            }
            // console.log(doc[0]);
            var sha256 = crypto.createHash("sha256");

            if( sha256.update(fields.password).digest("hex")==doc[0].password ){
                req.session.login = 1;
                req.session.yonghuming = user;
                res.json({"result":1});
                return;
            }else{
                res.json({"result":-2});
                return;
            }
        });
    });

}

// 登录系统页
exports.showstystem=function(req,res){
    res.render("stystem",{"login":req.session.login,"user":req.session.yonghuming});
    return;
}
//入住管理
exports.check=function(req,res){
    if (req.session.login!=1) {
        res.send('你没有<a href="/login">登录</a>');
        return;
    }
    Class.findcont({},function(data){
        room.findcont({"roomtype":"时光单人间","roomstate":"0"},function(roomid){
            // console.log(roomid);
            Class.findcont({"roomtype":"时光单人间"},function(roomnum){
                res.render("check",{"login":req.session.login,"user":req.session.yonghuming,"result":data,"roomid":roomid,"roomnum":roomnum});
                return;
            })

        })

    })

}

exports.roomtype=function(req,res){
    var cont=req.params.cont;
    // console.log(cont);
    room.findcont({"roomtype":cont,"roomstate":"0"},function(data){
        Class.findcont({"roomtype":cont},function(roomtype){
            res.json({"result":data,"roomtype":roomtype})
        })

    })

}

exports.ruzhu=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        room.updatecont({"roomid":fields.roomid},{$set:{"roomstate":"1"}},function(data){
            order.addroom(fields,function(err,data){
                if(err){
                    res.json({"result":-1});
                    return;
                }
                res.json({"result":1})
                return;
            })
        })


    });
}

exports.checkorder=function(req,res){
    if (req.session.login!=1) {
        res.send('你没有<a href="/login">登录</a>');
        return;
    }
    Class.findcont({},function(data){
        room.findcont({"roomtype":"时光单人间"},function(roomid){
            Class.findcont({"roomtype":"时光单人间"},function(roomnum){
                res.render("checkorder",{"login":req.session.login,"user":req.session.yonghuming,"result":data,"roomid":roomid,"roomnum":roomnum});
                return;
            })

        })

    })
}

exports.orderruzhu=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        // console.log(fields.people);
        // console.log(fields.name);
        order.updatecont({"name":fields.name},{$set:fields},function(data){
            res.json({"result":1})
            return;
        })
        room.updatecont({"roomid":fields.roomid},{$set:{"roomstate":"1"}},function(data){

        })
    });
}

//房间管理
exports.showRoom=function(req,res){
    //显示所有的汽车
    if (req.session.login!=1) {
        res.send('你没有<a href="/login">登录</a>');
        return;
    }


    Class.findcont({},function(Aclass){
        // console.log(Aclass);
        room.getall(function(data){
            res.render("room",{"login":req.session.login,"user":req.session.yonghuming,"result":data,"Aclass":Aclass});
            return;
        })
    })


}

exports.saveroom=function(req,res){
        //新建房间
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            // console.log(fields)
            room.addroom(fields,function(err,data){
                if(err){
                    res.json({"result":-1});
                    return;
                }
                res.json({"result":1})
                return;
            })
        });
    }

exports.delroom=function(req,res){
    var id=req.params.id;

    room.deletecont({"_id":id},function(data){
        res.json({"result":1})
        return;
    })
}

exports.amendroom=function(req,res){
    //修改汽车
    var id=req.params.id;
    // console.log(id);
    room.findcont({"_id":id},function(data){
        res.json({"result":data})
        return;
    })

}

exports.updateroom=function(req,res){
    //修改完点击提交
    var id=req.params.id;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        room.updatecont({"_id":id},{$set:fields},function(data){
            res.json({"result":1});
            return;
        })
    });
}

exports.getAllroom=function(req,res){
    var page = url.parse(req.url,true).query.page - 1 || 0;
    var pagesize = 2;

    room.count({},function(err,count){
        room.find({}).limit(pagesize).skip(pagesize * page).exec(function(err,results){
            // console.log(results);
            res.json({
                "pageAmount" : Math.ceil(count / pagesize),
                "results" : results
            });
            return;
        });
    });
}

//退房管理
exports.showexit=function(req,res){
    if (req.session.login!=1) {
        res.send('你没有<a href="/login">登录</a>');
        return;
    }
    Class.findcont({},function(Aclass){
        // console.log(Aclass);
        room.getall(function(data){
            res.render("exitroom",{"login":req.session.login,"user":req.session.yonghuming,"result":data,"Aclass":Aclass});
            return;
        })
    })


}


exports.searchroom=function(req,res){
    var cont=req.params.cont;
    // console.log(cont);

    order.findcont({"roomid":cont,"orderstate":"1"},function(data){
        // console.log(data);
        res.json({"result":data})
    })
}

exports.editorder=function(req,res){
    var id=req.params.id;
    // console.log(id);

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        console.log(fields.orderstate);
        order.updatecont({"roomid":id,"name":fields.name},{$set:{"orderstate":fields.orderstate,"endtime":fields.endtime,"starttime":fields.starttime}},function(data){
            room.updatecont({"roomid":id},{$set:{"roomstate":"0"}},function(data){
                res.json({"result":1});
                return;
            })
        })
    });
}

//订单管理
exports.jilu=function(req,res){

    if (req.session.login!=1) {
        res.send('你没有<a href="/login">登录</a>');
        return;
    }

    res.render("jilu",{"login":req.session.login,"user":req.session.yonghuming});





}
exports.searchorder=function(req,res){
    var cont=req.params.cont;
    // console.log(Number.isInteger(Number(cont)));
    // console.log(cont);
    if(Number.isInteger(Number(cont))){
        order.findcont({$or:[{"orderstate":"1"},{"orderstate":"2"}],"certificate":cont},function(data){
            console.log(data);
            for(let i=0;i<data.length;i++){

                Class.findcont({"roomtype":data[i].roomtype},function(price){
                    console.log(price);
                    if(data.length==0){
                        res.json({"result":1})
                    }else{
                        res.json({"result":data});
                    }
                })
            }



        })
    }else if(!Number.isInteger(Number(cont))){
        order.findcont({$or:[{"orderstate":"1"},{"orderstate":"2"}],"name":cont},function(data){
            // console.log(data);
            var num=[];
            for(var i=0;i<data.length;i++) {
                // console.log(data[i].roomtype);
                num.push(data[i].roomtype);
                // let roomtype=data[i].roomtype;
            }
            // console.log(num);
            var price=[];
            for(let i=0;i<num.length;i++){
                // console.log(num[i])
                Class.findcont({"roomtype":num[0]}, function (price) {

                    if (data.length == 0) {
                        res.json({"result": 2});
                        return;
                    } else {
                        res.json({"result": data});
                        return;
                    }
                })
                return;
            }



        })
    }

}


//房类管理
exports.showclass=function(req,res){

    //显示类别档案
    if (req.session.login!=1) {
        res.send('你没有<a href="/login">登录</a>');
        return;
    }
    Class.getall(function(data){
        // room.getall(function(room){
        //     var json={};
        //     for(var i=0;i<room.length;i++){
        //         var key=room[i].roomtype;
        //         if(json[key]){
        //             json[key]++;
        //         }else{
        //             json[key]=1;
        //         }
        //     }
        //     // console.log(json);
        //     var arr3=[];
        //     for(var key in json){
        //         arr3.push({name:key,count:json[key]});
        //     }
        // for(let i=0;i<arr3.length;i++){
            //     Class.updatecont({"roomtype":arr3[i].name},{$set:{"roomnum":arr3[i].count}},function(room){
            //         console.log(room);
            //         res.render("class",{"result":data,"roomnum":arr3,"user":req.session.yonghuming});
            //         return;
            //     })
            // }
        // })

        for(let i=0;i<data.length;i++){
            let name=data[i];
            // console.log(name);
            room.count({"roomtype":name.roomtype},function(err,count){
                room.count({"roomstate":"0","roomtype":name.roomtype},function(err,count_b){
                    // console.log(count_b);
                    name.roomnum=count;
                    name.residuenum=count_b;
                    name.save(function(err){

                    })

                })
            })

        }

        res.render("class",{"result":data,"user":req.session.yonghuming,"Aclass":data});
        return;

    })


}

exports.saveClass=function(req,res){
    //新建类
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        Class.addclass({"roomtype":fields.roomtype,"roomarea":fields.roomarea,"bednum":fields.bednum,"breakfast":"0","network":"0","tv":"0","price":fields.price,"roomnum":"0","residuenum":"0"},function(err,data){
            if(err){
                res.json({"result":-1});
                return;
            }
            res.json({"result":1})
            return;
        })

    });
}
exports.delClass=function(req,res){
    //删除
    var id=req.params.id;

    Class.deletecont({"_id":id},function(data){
        res.json({"result":1});
        return;
    })
}
exports.amendclass=function(req,res){
    var id=req.params.id;
    // console.log(id);
    Class.findcont({"_id":id},function(data){
        res.json({"result":data})
        return;
    })
}
exports.updateclass=function(req,res){
    //修改完点击提交
    var id=req.params.id;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        Class.updatecont({"_id":id},{$set:fields},function(data){
            res.json({"result":1});
            return;
        })
    });
}
exports.getAllclass=function(req,res){
    var page = url.parse(req.url,true).query.page - 1 || 0;
    var pagesize = 2;

    Class.count({},function(err,count){
        Class.find({}).limit(pagesize).skip(pagesize * page).exec(function(err,results){
            // console.log(results);
            res.json({
                "pageAmount" : Math.ceil(count / pagesize),
                "results" : results
            });
            return;
        });
    });
}
//修改密码
exports.showpw=function(req,res){
    if (req.session.login!=1) {
        res.send('你没有<a href="/login">登录</a>');
        return;
    }

    res.render("uodatamima",{"login":req.session.login,"user":req.session.yonghuming});
}


exports.changepw=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        // console.log(fields.mima);
        var sha256 = crypto.createHash("sha256");
        sha256.update(fields.mima)
        var str=sha256.digest("hex");
        admin.updatecont({"user":fields.user},{$set:{"password":str}},function(data){
            res.json({"result":1})
        })
    });
}

//房间图
exports.showroom=function(req,res){
    if (req.session.login!=1) {
        res.send('你没有<a href="/login">登录</a>');
        return;
    }

    res.render("roomtu",{"login":req.session.login,"user":req.session.yonghuming});

}


//退出
exports.quit=function(req,res){
    var login = req.session.login =0;
    var yonghuming=req.session.yonghuming="";

    res.render("index");
}
