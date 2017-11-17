var Vap = require('./vap.js');
var host = '//127.0.0.1:7001';

if(window.location.host.indexOf('activity')>-1){
    host = window.location.host.replace('activity','//game');
    if(window.location.href.indexOf('/pre/')>-1){
        host = window.location.host.replace('activity','//gamepre');
    }
}

var Data = {
    gain:function(data,callback){
        data.token = getMd5Str();
        var options = {
            data:data,
            onsuccess:function(res){
                callback(res);
            }
        };

        Vap.jsonp(host+'/api/1.2/h5/lottery/gain',options);
    },
    getLottery:function(data,callback){
        data.token = getMd5Str();
        var options = {
            data:data,
            onsuccess:function(res){
                callback(res);
                if(res.data.float) {
                    sendMessage('setRedPackage',{
                        data: res.data.float,
                        type: 1
                    });
                }
            }
        };

        Vap.jsonp(host+'/api/1.2/h5/lottery/getLottery',options)
    },
    rewardClick:function(data){
        data.token = getMd5Str();
        var options = {
            data:data
        };
        Vap.jsonp(host+'/api/1.2/h5/lottery/rewardClick',options)
    },
    getSupplyLottery:function(data,callback){
        var options = {
            data:data,
            onsuccess:function(res){
                callback(res);
            },
            onerror:function(){
            }
        };
        Vap.jsonp(host+'/api/1.1/h5/lottery/getSupplyLottery',options)
    }
};

module.exports=Data;