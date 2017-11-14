require('./index.less');
var tpl = require('./index.html');
var parentEl = document.querySelector('#prize-list');
window.onMessage('setpanData', function(data){
    Items.render(data);
});
var Items = {
    init:function(){
        this.render();
        this.iscroll();
    },
    render:function(data){
        var items = data || gamejson.lottery.lotteryRewardVOs;
        var template = ejs.compile(tpl);
        var html =  template({items:items});
        parentEl.querySelector('div').innerHTML = html;
    },
    iscroll:function(){
        var leftScroll = new IScroll("#goodlist-container", {
            scrollX: true,
            scrollY: false,
            hScrollbar:false,
            vScrollbar : false,
            scrollbars: true,
            interactiveScrollbars: true,
            resizeScrollbars: true,
            vScroll:false,
            invertWheelDirection: true
        });
    }
};

Items.init();
