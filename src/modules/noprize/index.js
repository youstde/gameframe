require('./index.less');
var tpl = require('./index.html');
var parentEl = document.querySelector('#more-game-module');
var NoPrize = {
    show: function(data){
        this._render(data);
    },
    _bindEvent: function() {
        parentEl.querySelector('.close').addEventListener('click', function(){
            parentEl.querySelector('.recommend-modal').style.display = 'none';
            sendMessage('closeNoPrize');
        });
    },
    _render:function(data){
        var items = data;
        var template = ejs.compile(tpl);
        var html =  template({items:items});
        parentEl.innerHTML = html;
        this._bindEvent();
    }
};
module.exports = NoPrize;