var tpl = require('./html.ejs');
var headTpl = require('./head.ejs');
var baseJs = require('./base.ejs');

var layout = function (content, pageTitle) {
    var config = {
        headTpl:headTpl({pageTitle: pageTitle || '百泰游戏',baseJs: baseJs()}),
        content: content || ''
    };

    return tpl(config)
};
module.exports = layout;
