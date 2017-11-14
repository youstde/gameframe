require('./common.less');
require('../util');
require('../tongdun');
require('../intercetp');
require('../api.back');
require('../baidu.tongji');
require('../qq.tongji');
require('../buoy');
/**
 * webp处理
 */
check_webp_feature('lossless', function(feature, result){
    if(result) {
        if(window.location.host.indexOf('adbaitai.com') === -1) {
            findNormalImg();
            goodsNormalImg();
        }

    }
});
require('../schema');
window.onload=function(){
    document.body.style.visibility='visible';
};
setTimeout(function(){
    document.body.style.visibility='visible';
},350);