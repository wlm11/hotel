var express = require('express');
var app = express();

var mongoose = require('mongoose');

var control=require("./controller/control.js");//后台
var datas=require("./controller/data.js");//数据
var client=require("./controller/client.js");//客户
var admin=require("./model/admin.js");


var session = require('express-session');

var url=require("url");

mongoose.connect('mongodb://localhost/hotelmanage');


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.set('view engine', 'ejs');
app.use(express.static("static"));


//首页
app.get("/",control.showIndex);

//注册
app.get("/reg",control.showreg);
app.post("/doreg",control.reg);

//登录
app.get("/login",control.showlogin);//显示登录
app.post("/login",control.login);//点击登录

//客户预订页
app.get("/order",client.showorder);
app.post("/order/:cont",client.residnum);
app.post("/doorder",client.doorder);

//订单查询页
app.get("/search",client.showsearch);
app.post("/searchorder/:cont",client.searchorder);
app.post("/amendorder",client.amendorder);//确认订单
app.post("/delorder/:cont",client.delorder);//取消订单


//入住管理
app.get("/check",control.check);
app.post("/roomtype/:cont",control.roomtype);//当类点击切换时对应的房间
app.post("/ruzhu",control.ruzhu);//办理入住
app.get("/checkorder",control.checkorder);//订单入住
app.post("/orderruzhu",control.orderruzhu);//订单办理入住

//退房管理
app.get("/exitroom",control.showexit);//显示退房管理
app.post("/searchroom/:cont",control.searchroom);//查询房间
app.post("/editorder/:id",control.editorder);

//记录查询
app.get("/jilu",control.jilu);
app.post("/search/:cont",control.searchorder);

//房间管理
app.get("/showRoom",control.showRoom);
app.post("/saveroom",control.saveroom);//房间保存
app.post("/delroom/:id",control.delroom);//删除房间
app.post("/amendroom/:id",control.amendroom);
app.post("/updateroom/:id",control.updateroom);//更改
app.get("/Allroom",control.getAllroom);//分页

//房类管理
app.get("/showClass",control.showclass);
app.post("/saveClass",control.saveClass);//新增类
app.post("/delClass/:id",control.delClass);//删除类
app.post("/amendclass/:id",control.amendclass);
app.post("/updateclass/:id",control.updateclass);
app.get("/Allclass",control.getAllclass);//分页

// 修改密码
app.get("/pw",control.showpw);
app.post("/changepw", control.changepw);

//房间
app.get("/room",control.showroom);



//退出
app.get("/quit",control.quit);



//获取所有的房间信息
app.get("/getrooms",datas.getrooms);

app.get("/getclasses",datas.getclass);

app.listen(7000);