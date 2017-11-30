(function () {
    var finallUlr = '//oss.ltcdn.cc/game/Theme/redpackage/prod/redpackage.js?btm=113001';
    if(window.location.href.indexOf('pre')>-1){
        finallUlr = finallUlr.replace('prod','pre');
    }
    var scriptObj = document.createElement('script');
    scriptObj.src = finallUlr;
    document.getElementsByTagName("body")[0].appendChild(scriptObj);
})();