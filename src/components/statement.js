!(function(){
    window.addEventListener('load',function(){
        var h1= document.body.scrollHeight;
        var h2 = window.innerHeight;
        var h = h1;
        if(h2>h1){
            h=h2
        }
        var text = '活动由来推互动主办，与Apple lnc.无关';
        if(/android/i.test(window.navigator.userAgent)){
            text = '本活动由：来推互动adbaitai.com提供';
        }
        var el = document.createElement('div');
        el.style['text-align']='center';
        el.style['padding']='3px 0';
        el.style.position='absolute';
        el.style.width='100%';
        el.style.left=0;
        el.style.top=(h-23+'px');
        el.className='com-statement';
        el.innerHTML='<a href="http://adbaitai.com" class="J_schema" onclick="_hmt.push([\'_trackEvent\', \'link\', \'click\', \'http://adbaitai.com\'])" data-id="statement" style="color: rgb(150, 200, 245); display: block;text-decoration: none;">'+text+'</a>';
        document.body.appendChild(el);
    })
}());