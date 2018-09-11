var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var adminSchema = new Schema({
    user: String,
    password: String
});



//根据名字查询
adminSchema.statics.getname=function(name,callback){
    admin.find({"user":name},function(err,data){
        callback(err,data);
    })
}


//添加用户
adminSchema.statics.adduser=function(tj,callback){
    admin.create(tj,function(data){
        callback("ok");
    })
}

//查找所有
adminSchema.statics.getall=function (callback) {
    admin.find({},function(err,data){
        callback(data);
    })
}

adminSchema.statics.updatecont=function(tj,set,callback){
    admin.update(tj,set,function(err,data){
        callback(data);
    })
}

var admin = mongoose.model('admin', adminSchema);
module.exports=admin;