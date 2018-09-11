var Class=require("../model/class.js");
var order=require("../model/order.js");
var url=require("url");

var formidable=require("formidable");



exports.showorder=function(req,res){
    Class.getall(function(data){
        res.render("order",{"Aclass":data});
    })
}//显示订单页
exports.residnum=function(req,res){
    var cont=req.params.cont;
    // console.log(cont);
    Class.findcont({"roomtype":cont},function(data){
        res.json({"result":data})
    })
}//每种类所对应的价格以及订单数
exports.doorder=function(req,res){
    //新建房间
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        // console.log(fields)
        order.addroom(fields,function(err,data){
            if(err){
                res.json({"result":-1});
                return;
            }
            res.json({"result":1})
            return;
        })
    });
}//订单提交时

exports.showsearch=function (req, res) {
    Class.getall(function(data){
        res.render("ordersearch",{"Aclass":data});
    })

}//进入搜索页

exports.amendorder=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        // console.log(fields.people);
        order.updatecont({$or:[{"people":fields.people},{"tel":fields.tel}]},{$set:fields},function(data){
            res.json({"result":1})
            return;
        })
    });
}//确认订单

exports.searchorder=function(req,res){
    var cont=req.params.cont;
    // console.log(Number.isInteger(Number(cont)));

        if(Number.isInteger(Number(cont))){
            order.findcont({"tel":cont,"orderstate":"0"},function(data){
                // console.log(data);
                if(data.length==0){
                    res.json({"result":1})
                }else{
                    res.json({"result":data});
                }

            })
        }else if(!Number.isInteger(Number(cont))){
            order.findcont({"name":cont,"orderstate":"0"},function(data){
                console.log(data);
                if(data.length==0){
                    res.json({"result":2})
                }else if(data.length>1){
                    res.json({"result":0})

                }else{
                    res.json({"result":data});
                }
            })
        }


}//查询

exports.delorder=function (req, res) {
    var cont=req.params.cont;

    order.deletecont({"tel":cont},function(data){
        res.json({"result":1})
        return;
    })
}