;(function (win) {
    win.BuoyMiddle = function (options) {
        var baseUrl = '//oss.ltcdn.cc/game/Theme/Buoy/Buoy',
            finallUlr = '';
        finallUlr = baseUrl + '_' + options.id + '.js?v=20171016111';
        var scriptObj = document.createElement('script');
        scriptObj.src = finallUlr;
        document.getElementsByTagName("body")[0].appendChild(scriptObj);
        scriptObj.onload = function () {
            var Buoy = new Baitai.Buoy({
                clickCallback: function () {
                    options.clickCallback && options.clickCallback();
                }
            });
            options.ready && options.ready(Buoy);
        };

    };
})(window);