/**
 * AJAX函数封装
 * @param {string} url     请求地址（必须）
 * @param {object} options 发送请求的选项参数
 *   @config {string} [options.type] 请求发送的类型。默认为GET。
 *   @config {Object} [options.data] 需要发送的数据。
 *   @config {Function} [options.onsuccess] 请求成功时触发，function(oAjax.responseText, oAjax)。（必须）
 *   @config {Function} [options.onfail] 请求失败时触发，function(oAjax)。(oAJax为XMLHttpRequest对象)
 *
 *@returns {XMLHttpRequest} 发送请求的XMLHttpRequest对象
 */
function Vap(url, options) {
    //1.创建ajax对象
    var oAjax = new XMLHttpRequest();

    //2.连接服务器
    //open(方法,url,是否异步)
    var param = ""; //请求参数。
    //只有data存在，且为对象使才执行
    var data = options.data ? options.data : -1; //缓存data
    if (typeof (data) === "object") {
        for (var key in data) { //请求参数拼接
            if (data.hasOwnProperty(key)) {
                param += key + "=" + data[key] + "&";
            }
        }
        param.replace(/&$/, "");
    } else {
        param = "timestamp=" + new Date().getTime();
    }

    //3.OnRedayStateChange事件
    oAjax.onreadystatechange = function () {
        if (oAjax.readyState === 4) {
            if (oAjax.status === 200) {
                //请求成功。形参为获取到的字符串形式的响应数据
                options.onsuccess(oAjax.responseText, oAjax);
            } else {
                //先判断是否存在请求失败函数
                //存在时，形参为XMLHttpRequest对象，便于进行错误进行处理
                if (options.onfail) {
                    options.onfail(oAjax);
                }
            }
        }
    };

    //4.发送请求
    var type = options.type ? options.type.toUpperCase() : "GET";
    if (type === "GET") {
        oAjax.open("GET", url + "?" + param, true);
        oAjax.send();
    } else {
        oAjax.open("POST", url, true);
        oAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        oAjax.send(param);
    }

    return oAjax;//发送请求的XMLHttpRequest对象
}


function jsonToParam(data){
    var result = [];
    Object.keys(data).forEach(function(key){
        result.push(key+'='+data[key]);
    });
    return result.join('&');
}

Vap.jsonp = function(url,options){
    var param = ""; //请求参数。
    if(options.data){
        param = jsonToParam(options.data);
    }

    var callbackstring = 'jsonp'+(parseInt(Math.random()*10000000000)+ new Date().getTime());
    window[callbackstring] = function (res) {
        if(!res.success) {
            badJsReport(url+'_'+JSON.stringify(res));
        }
        options.onsuccess && options.onsuccess(res);
    };
    if (param) {
        param += ('&callback=' + callbackstring);
    } else {
        param += ('callback=' + callbackstring);
    }

    var el = document.createElement('script');
    el.type = 'text/javascript';
    el.src = url+'?'+param;
    document.getElementsByTagName('head')[0].appendChild(el);
};

module.exports=Vap;