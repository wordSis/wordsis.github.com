'use strict'
$('.dropdown-toggle').click(function(){
	$('.dropdown-menu').fadeToggle();
	$('.dropdown-menu').css("left","2.5rem");
});
//穿墙
function getDir(obj,ev){
	var x=obj.getBoundingClientRect().left+obj.offsetWidth/2-ev.clientX;
	var y=obj.getBoundingClientRect().top+obj.offsetHeight/2-ev.clientY;
	
	return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
}
function through(obj){
	obj.onmouseenter=function (ev){
		var oLi=obj.children[0];
		var oEvent=ev||event;
		var dir=getDir(obj,oEvent);
		switch(dir){
			case 0:
				oLi.style.left='10rem';
				oLi.style.top=0;
				break;
			case 1:
				oLi.style.left=0;
				oLi.style.top='10rem';
				break;
			case 2:
				oLi.style.left='-10rem';
				oLi.style.top=0;
				break;
			case 3:
				oLi.style.left=0;
				oLi.style.top='-10rem';
				break;
		}
		move(oLi,{left:0,top:0})
	};
	obj.onmouseleave=function (ev){
		var oLi=obj.children[0];
		var oEvent=ev||event;
		var dir=getDir(obj,oEvent);
		switch(dir){
			case 0:
				move(oLi,{top:0,left:.625});
				break;
			case 1:
				move(oLi,{top:.625,left:0});
				break;
			case 2:
				move(oLi,{top:0,left:-.625});
				break;
			case 3:
				move(oLi,{top:-0.625,left:0});
				break;
		}
	};
}
window.onload=function (){
	var oWall = document.getElementById('wall');
	var aUl = oWall.getElementsByTagName('ul')
	var oBtn = document.getElementById('totop');
    var timer = null;
    var bSin = false;
	//穿墙
	for(var i=0; i<aUl.length; i++){
		through(aUl[i]);
	}
	//回到顶部    
    window.onscroll = function() {
        if (bSin == true) {
            clearInterval(timer);
        }
        bSin = true;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop) {
            oBtn.style.display = 'block';
        } else {
            oBtn.style.display = 'none';
        }
    };
    oBtn.onclick = function() {
        clearInterval(timer);
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 起点
        var start = scrollTop;
        // 总距离
        var dis = 0 - start;
        // 总次数
        var count = Math.floor(2000/30);
        var n = 0; // 当前走了几次
        timer = setInterval(function() {
            bSin = false;
            n++;
            var a = 1 - n/count;
            // 每一次能走多少
            var cur = start + dis*(1-a*a*a);

            document.documentElement.scrollTop = document.body.scrollTop = cur;
            if (n == count) {
                clearInterval(timer);
            }
        },30);
    };

};

















