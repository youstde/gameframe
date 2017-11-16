var Schema = {
    parse:function(schema){
        var self = this;
        Object.keys(schema).forEach(function(key){
            var fields = schema[key];
            var els = document.querySelectorAll('.J_schema[data-id='+key+']'),
                elsGroup = document.querySelectorAll('.J_schema[data-group='+key+']');
            if(elsGroup.length > 0){
                els = elsGroup;
            }
            Object.keys(fields).forEach(function(key){
                var field = fields[key];
                key = '_'+key;
                self[key] && self[key](field,els);
            })
        })
    },

    _style:function(field,els){
        Object.keys(field).forEach(function(key){
            [].forEach.call(els,function(el){
                var val = field[key];
                if(key==='background-image'){
                    val = 'url('+val[0]+')';
                }else if(key==='box-shadow'){
                    val = '0 0 7px ' + val[0];
                }else{
                    val = val[0];
                }
                el.style[key]=val;
            })
        })
    },

    _attr:function(field,els){
        Object.keys(field).forEach(function(key){
            [].forEach.call(els,function(el){
                var val = field[key];
                el.setAttribute(key,val[0]);
            })
        })
    },

    _other:function(field,els){
        Object.keys(field).forEach(function(key){
            [].forEach.call(els,function(el){
                var val = field[key];
                el[key]=val[0];
            })
        })
    }
};

window.onMessage('schemaJSON',function(data){
    Schema.parse(data);
});
var gamejson = window.gamejson ? window.gamejson: window.gameJson;
parent.window.sendMessage('pages/deploygame.set',gamejson.lottery.sceneConfig);