var room=require("../model/room.js");
var Class=require("../model/class.js");

exports.getrooms=function(req,res){
    room.getall(function(data){
        res.jsonp(data)
    })
}


exports.getclass=function(req,res){
    Class.getall(function(data){
        res.jsonp(data);
    })
}