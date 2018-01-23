;(function (win) {
    win.BuoyMiddle = function (options) {
        var baseUrl = '//oss.ltcdn.cc/game/Theme/Buoy/Buoy',
            finallUlr = '',
            BuoyId = Math.floor(Math.random() * 9 + 1);
        finallUlr = baseUrl + '_' +BuoyId + '.js?v=2018012301';
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