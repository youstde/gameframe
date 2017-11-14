!(function(){
    var getCookie = function(name) {
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

    var getMd5Str = function(){
        var si_ = getCookie('si_');
        var md5Str = hex_md5(si_+'adbaitai');
        return md5Str;
    };

    var getQueryString = function(name){
        var queryJson = {};
        var search = window.location.search;
        search = search.replace(/^\?/,'');
        var fields = search.split('&');
        fields && fields.forEach(function(field){
            var arr = field.split('=');
            queryJson[arr[0]] = arr[1];
        });

        return queryJson[name] || '';
    };

    var el = document.createElement('img');
    var back = getQueryString('back');
    var url ='//'+window.location.host.replace('activity','game')+'/api/back.jpg?back='+back+'&token='+getMd5Str();
    if(window.location.href.indexOf('/pre/')>-1){
        url ='//'+window.location.host.replace('activity','gamepre')+'/api/back.jpg?back='+back+'&token='+getMd5Str();
    }
    el.style.display='none';
    el.setAttribute('src',url);
    document.body.appendChild(el);
}());