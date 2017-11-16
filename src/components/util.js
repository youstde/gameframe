window.onMessage = function(name,callback){
    var msgs = window.onMessage[name] = window.onMessage[name] || [];
    msgs.push(callback);
};

window.sendMessage = function(name,param){
    var msgs = window.onMessage[name] || [];
    msgs.forEach(function(msg){
        msg(param);
    })
};


window.getQueryString = function(name){
    var queryJson = {};
    var search = window.location.search;
    search = search.replace(/^\?/,'');
    var fields = search.split('&');
    fields && fields.forEach(function(field){
        var arr = field.split('=');
        queryJson[arr[0]] = arr[1];
    });

    return queryJson[name];
};


window.checkDevice = function() {
    var u = navigator.userAgent, app = navigator.appVersion;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isiOS? 'isiOS':'isAndroid';
};

/**
 * 图片预加载
 * @param url
 */
window.preLoadImg = function(urlList) {
    urlList.forEach(function(url){
        var img = new Image();
        img.src = url;
    });
};

window.check_webp_feature=function(feature, callback) {
    var kTestImages = {
        lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
        lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
        alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA=="
    };
    var img = new Image();
    img.onload = function () {
        var result = (img.width > 0) && (img.height > 0);
        callback(feature, result);
    };
    img.onerror = function () {
        callback(feature, false);
    };
    img.src = "data:image/webp;base64," + kTestImages[feature];
};

window.findNormalImg=function() {
    var gameConfig = window.gameJson? window.gameJson.lottery.sceneConfig: window.gamejson.lottery.sceneConfig;
    Object.keys(gameConfig).forEach(function(key){
        if(gameConfig[key]['style']) {
            if(gameConfig[key]['style']['background-image']) {
                if(gameConfig[key]['style']['background-image'][0].indexOf('?') === -1) {
                    gameConfig[key]['style']['background-image'][0] = switchWebp(gameConfig[key]['style']['background-image'][0]);
                }
            }
        }
        if(gameConfig[key]['attr']) {
            if(gameConfig[key]['attr']['src']) {
                if(gameConfig[key]['attr']['src'][0].indexOf('?') === -1) {
                    gameConfig[key]['attr']['src'][0] = switchWebp(gameConfig[key]['attr']['src'][0]);
                }
            }
        }
    });
    window.gamejson.lottery.sceneConfig = gameConfig;
};

window.goodsNormalImg = function() {
    var goodsConfig = window.gameJson? window.gameJson.lottery.lotteryRewardVOs: window.gamejson.lottery.lotteryRewardVOs;
    goodsConfig.forEach(function(item) {
        item.iconUrl = switchWebp(item.iconUrl);
    });
    window.gamejson.lottery.lotteryRewardVOs = goodsConfig;
};

window.switchWebp=function(normalUrl) {
    return normalUrl + '?x-oss-process=image/format,webp';
};

window.getCookie = function(name) {
    var cookieStr = document.cookie.replace(/[ ]/g,""),
        si = '',
        cookieArr = [],
        cookJson = {},
        tokenStr = '';
    if(cookieStr.indexOf(';')> -1) {
        cookieArr = cookieStr.split(';');
        cookieArr.forEach(function(field){
            var arr = field.split('=');
            var key = arr[0];
            var val = arr[1] || '';
            cookJson[key] = val;
        });
    }
    return cookJson[name];
};

window.getMd5Str = function(){
    var si_ = getCookie('si_');
    var md5Str = hex_md5(si_+'adbaitai');
    return md5Str;
};