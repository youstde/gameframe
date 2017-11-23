!(function(){
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

    var intercetpType = getQueryString('backSkipType'),
        backSkipUrl = getQueryString('backSkipUrl'),
        intercetpUrl = '';
    if(intercetpType) {
        if(intercetpType === '1') {
            intercetpUrl = '//activity'+window.location.host.replace('activity','')+'/pre/laitui-web/middlepage/index.html?back=' + getQueryString('back');
        }else if(intercetpType === '2') {
            intercetpUrl = '//activity'+window.location.host.replace('activity','')+'/pre/laitui-web/navigatepage/index.html?back=' + getQueryString('back');
        }
        if(window.location.href.indexOf('/real/')>-1){
            intercetpUrl = intercetpUrl.replace('/pre/','/prod/');
        }
    }else if(backSkipUrl) {
        intercetpUrl = backSkipUrl;
    }
    var ready = function(){
        if (!history.state) {
            var oldUrl = location.href;
            try {
                history.replaceState({
                    page: "intercept",
                    entered: false
                }, "", intercetpUrl);
            } catch (e) {
            }

            history.pushState({
                page: "current"
            }, "", oldUrl);
        }
    };
    ready();
    if(!history.state){
        setTimeout(function(){
            ready();
        },3000);
    }

    window.onpopstate = function () {
        if (history.state && "intercept" === history.state.page && !history.state.entered) {
            history.replaceState({
                page: "intercept",
                entered: true
            }, "", intercetpUrl);
            location.reload()
        }
    }
}());