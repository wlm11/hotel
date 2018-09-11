var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var classSchema = new Schema({
    roomtype:String,
    roomarea:String,
    bednum:String,
    breakfast:String,
    network:String,
    tv:String,
    price:String,
    roomnum:Number,
    residuenum:Number

});
//查找所有
classSchema.statics.getall=function (callback) {
    classa.find({},function(err,data){
        callback(data);
    })
}
//新建客户
classSchema.statics.addclass=function(tj,callback){
    classa.create(tj,function(err,data){
        callback(err,data);
    })
}
//根据条件查找
classSchema.statics.findcont=function (tj, callback) {
    classa.find(tj,function(err,data){
        callback(data);
    })
}
//更新数据
classSchema.statics.updatecont=function(tj,set,callback){
    classa.update(tj,set,function(err,data){
        callback(data);
    })
}
//删除数据
classSchema.statics.deletecont=function(tj,callback){
    classa.remove(tj,function(data){
        callback(data);
    })
}

classSchema.statics.getattr=function(tj,pro,callback){
    classa.findOne(tj,function(err,data){
        callback(err,data[pro])
    })
}
var classa= mongoose.model('class', classSchema);


module.exports=classa;

// exports.getall=function (callback) {
//     car.find({},function(err,data){
//         callback(data);
//     })
// }

//新建客户
// exports.addcar=function(tj,callback){
//     car.create(tj,function(err,data){
//         callback(err,data);
//     })
// }

//根据条件查找
// exports.findcont=function (tj, callback) {
//     car.find(tj,function(err,data){
//         callback(data);
//     })
// }

//更新数据
// exports.updatecont=function(tj,set,callback){
//     car.update(tj,set,function(err,data){
//         callback(data);
//     })
// }

//删除数据
// exports.deletecont=function(tj,callback){
//     car.remove(tj,function(data){
//         callback(data);
//     })
// }

//获取某一项的属性
// exports.getattr=function(tj,pro,callback){
//     car.findOne(tj,function(err,data){
//         callback(err,data[pro])
//     })
// }
