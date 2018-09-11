var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var orderSchema = new Schema({
    idtype:String,
    certificate:String,
    sex:String,
    roomid:String,
    starttime:String,
    endtime:String,
    roomtype:String,
    roomnum:String,
    name:String,
    people:String,
    tel:String,
    remark:String,
    orderstate:String,
    price:String

});
//查找所有
orderSchema.statics.getall=function (callback) {
    order.find({},function(err, data){
        callback(data);
    })
}
//新建客户
orderSchema.statics.addroom=function(tj,callback){
    order.create(tj,function(err, data){
        callback(err,data);
    })
}
//根据条件查找
orderSchema.statics.findcont=function (tj, callback) {
    order.find(tj,function(err, data){
        callback(data);
    })
}
//更新数据
orderSchema.statics.updatecont=function(tj,set,callback){
    order.update(tj,set,function(err, data){
        callback(data);
    })
}
//删除数据
orderSchema.statics.deletecont=function(tj,callback){
    order.remove(tj,function(data){
        callback(data);
    })
}

orderSchema.statics.getattr=function(tj,pro,callback){
    order.findOne(tj,function(err, data){
        callback(err,data[pro])
    })
}
var order = mongoose.model('order', orderSchema);


module.exports=order;

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
