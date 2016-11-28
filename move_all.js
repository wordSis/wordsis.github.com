/**
 * Created by ZhuWQ on 2016/8/22.
 */
function getStyle(obj,name) {
    return (obj.currentStyle || getComputedStyle(obj,false))[name];
}

function move(obj,json,options) {
    options = options || {};
    options.duration = options.duration || 500;
    options.easing = options.easing || 'ease-out';

    clearInterval(obj.timer);
    // 总次数
    var count = Math.floor(options.duration/30);
    // 起点
    var start = {};
    // 总距离
    var dis = {};
    for (var name in json) {
        start[name] = parseFloat(getStyle(obj,name));
        dis[name] = json[name] - start[name];
    }

    var n = 0; // 当前走到第几次了
    obj.timer = setInterval(function(){
        n++;

        for (var name in json) {
            switch(options.easing) {
                case 'linear':
                    var a = n/count;
                    var cur = start[name] + dis[name] * a;
                    break;
                case 'ease-in':
                    var a = n/count;
                    var cur = start[name] + dis[name]* Math.pow(a,3);
                    break;
                case 'ease-out':
                    var a = 1 - n/count;
                    var cur = start[name] + dis[name] * (1-Math.pow(a,3));
                    break;
            }
            if (name == 'opacity') {
                obj.style.opacity = cur;
                obj.style.filter = 'alpha(opacity:'+cur*100+')';
            } else {
                obj.style[name] = cur + 'px';
            }
        }
        if (n == count) {
            clearInterval(obj.timer);
            // 链式运动
            options.complete && options.complete();
        }
    },30);

}
