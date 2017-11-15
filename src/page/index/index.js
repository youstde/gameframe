//如果配置了gameJson，覆盖模拟数据
window.gamejson = require('./gamejson');
if (window.gameJson) {
    window.gamejson = window.gameJson;
}
require('./index.less');
require('../../components/layout/common');

//业务js开始
document.title = gamejson.lottery.title || '摇骰赚流量';

if(/android/i.test(window.navigator.userAgent)){
    document.querySelector('.statement').innerText='本活动由：来推互动adbaitai.com提供';
}

var gameRule = new Baitai.ruleModule({
    body: ".game-rule"
});
gameRule.sendMessage(window.gamejson);

window.onMessage('changeRemain', function (data) {
    document.querySelector('#remainCount').innerText = data;
});


var Data = require('../../components/data.js');
var NoPrize = require('../../modules/noprize/index.js');
require('./modules/items/index.js');


var flop = {
    state: 'init',
    timer: '',
    buoyUrl: '',
    activeCard: '',
    back: getQueryString('back'),
    cards: document.querySelectorAll('.card'),
    init: function () {
        this.initCard();
        this.getLottery();
        this.initMiddle();
        this.setActiveCard();
    },
    /**
     * 初始化弹窗组件
     */
    initMiddle: function () {
        var _this = this,
            id = window.gameJson ? window.gameJson.lottery.popupType : window.gamejson.lottery.popupType,
            remainObj = document.querySelector('#remainCount');
        window.middle({
            id: id,
            closeCallback: function (type) {
                if (type === 'jump') {
                    Data.rewardClick({
                        back: _this.back
                    });
                } else {
                    if (remainObj.innerText === '0') {
                        _this.getMoreGame();
                    }else if(_this.buoyUrl) {
                        console.log(_this.buoyUrl)
                        var BuoyId = Math.floor(Math.random() * 4 + 1);
                        window.BuoyMiddle({
                            id: BuoyId,
                            ready: function(Buoy) {
                                Buoy.sendMessage(_this.buoyUrl);
                                Buoy.showBuoy();
                                _this.buoyUrl = '';
                            },
                            clickCallback: function() {
                                MtaH5.clickStat("buoy",{'buoyid': BuoyId});
                            }
                        });
                    }
                }
                _this.initCard();
                document.getElementById('cardCover').style.display = 'none';
            },
            ready: function (prop) {
                _this.prop = prop;
                _this.initEvent();
                //弹窗图片预加载
                prop.preImgLoad();
                if (checkDevice() === 'isiOS') {
                    document.querySelector('.statement').style.display = 'block';
                }
            }
        });
    },
    /**
     * 卡牌绑定点击事件
     * 当状态为ready才会触发点击事件
     */
    initEvent: function () {
        document.querySelector('.card-wrapper').addEventListener('click', function (e) {
            var cardIndex = e.target.className,
                remainObj = document.querySelector('#remainCount');
            this.activeCard = e.target;
            if (cardIndex.indexOf('card-wrapper') === -1) {
                if (this.state === 'ready') {
                    clearInterval(this.timer);
                    if (remainObj.innerText === '0') {
                        this.initCard();
                        this.getMoreGame();
                        return;
                    }
                    this.gain();
                    this.activeState(e.target);
                }
            }
        }.bind(this));
    },
    /**
     * 初始化卡牌
     */
    initCard: function () {
        var cards = this.cards;
        for (var i = 0; i < cards.length; i++) {
            (function (i) {
                setTimeout(function () {
                    cards[i].setAttribute('class', 'card J_schema');
                }, 320 * (i + 1));
            })(i);
        }
        setTimeout(function () {
            this.flashCard();
            this.state = 'ready';
        }.bind(this), 320 * cards.length);
    },
    /**
     * 点击后的卡牌状态
     * @param target
     */
    activeState: function (target) {
        this.state = 'active';
        target.setAttribute('class', 'card active shake J_schema');
        document.querySelector('.card-cover').style.display = 'block';
    },
    /**
     * 弹窗出现之前卡牌状态
     * @param callback
     */
    turnState: function (callback) {
        this.state = 'turn';
        this.activeCard.setAttribute('class', 'card active turn J_schema');
        setTimeout(function () {
            callback && callback();
        }, 1000);
    },
    /**
     * 重置卡牌状态
     */
    reset: function () {
        var cards = this.cards;
        cards.forEach(function (card) {
            card.setAttribute('class', 'card init J_schema');
        });
        document.querySelector('.card-cover').style.display = 'none';
    },
    /**
     * 卡牌闪动
     */
    flashCard: function () {
        var index = 0,
            beforeIndex = 0,
            cards = this.cards;
        this.timer = setInterval(function () {
            cards[beforeIndex].setAttribute('class', 'card J_schema');
            cards[index].setAttribute('class', 'card light J_schema');
            beforeIndex = index;
            if (index === (cards.length - 1)) {
                index = 0;
            } else {
                index++;
            }
        }, 700);

    },
    setActiveCard: function () {
        var el = document.createElement('style');
        el.setAttribute('type', 'text/css');
        el.innerHTML = '.card.light{ background-image: url(' + gamejson.lottery.sceneConfig.cardLight.style["background-image"][0] + ') !important; }';
        document.head.appendChild(el);
    },
    getLottery: function () {
        var _this = this;
        Data.getLottery({
            back: this.back
        }, function (data) {
            window.sendMessage('changeRemain', data.data.remain);
            if (data.data.remain === 0) {
                _this.getMoreGame();
            }
        });
    },
    gain: function () {
        var _this = this;
        Data.gain({
            back: this.back,
            tongdunTokenId: $tokenId
        }, function (data) {
            if (data.success) {
                if(data.data.buoyUrl) {
                    _this.buoyUrl = data.data.buoyUrl;
                }
                window.sendMessage('changeRemain', data.data.remainCount);
                _this.prop.sendMessage(data);
                setTimeout(function () {
                    _this.turnState(function () {
                        //显示弹窗同时初始化卡牌
                        _this.prop.toggleState('show');
                        _this.reset();
                    });
                }, 700);
            } else {
                alert(data.msg);
                _this.initCard();
            }
        });
    },
    getMoreGame: function () {
        var _this = this;
        Data.getSupplyLottery({
            back: _this.back
        }, function (data) {
            NoPrize.show(data.data);
        });
    }
};

flop.init();
