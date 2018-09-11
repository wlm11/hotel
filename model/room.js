var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var roomSchema = new Schema({
    roomid:String,
    roomtype:String,
    roomplace:String,
    roomdes:String,
    roomstate:String

});
//查找所有
roomSchema.statics.getall=function (callback) {
    room.find({},function(err, data){
        callback(data);
    })
}
//新建客户
roomSchema.statics.addroom=function(tj,callback){
    room.create(tj,function(err, data){
        callback(err,data);
    })
}
//根据条件查找
roomSchema.statics.findcont=function (tj, callback) {
    room.find(tj,function(err, data){
        callback(data);
    })
}
//更新数据
roomSchema.statics.updatecont=function(tj,set,callback){
    room.update(tj,set,function(err, data){
        callback(data);
    })
}
//删除数据
roomSchema.statics.deletecont=function(tj,callback){
    room.remove(tj,function(data){
        callback(data);
    })
}

roomSchema.statics.getattr=function(tj,pro,callback){
    room.findOne(tj,function(err, data){
        callback(err,data[pro])
    })
}
var room = mongoose.model('room', roomSchema);


module.exports=room;

// exports.getall=function (callback) {
//     room.find({},function(err,data){
//         callback(data);
//     })
// }

//新建客户
// exports.addcar=function(tj,callback){
//     room.create(tj,function(err,data){
//         callback(err,data);
//     })
// }

//根据条件查找
// exports.findcont=function (tj, callback) {
//     room.find(tj,function(err,data){
//         callback(data);
//     })
// }

//更新数据
// exports.updatecont=function(tj,set,callback){
//     room.update(tj,set,function(err,data){
//         callback(data);
//     })
// }

//删除数据
// exports.deletecont=function(tj,callback){
//     room.remove(tj,function(data){
//         callback(data);
//     })
// }

//获取某一项的属性
// exports.getattr=function(tj,pro,callback){
//     room.findOne(tj,function(err,data){
//         callback(err,data[pro])
//     })
// }
