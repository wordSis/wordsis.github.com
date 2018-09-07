'use strict'
window.onload=function (){
	var oBox=document.getElementById('box');
	var aImg=oBox.getElementsByTagName('img');
	var aA=oBox.getElementsByTagName('a');
	var aSpan=oBox.getElementsByTagName('span');

	var oTop = document.getElementById('totop');
    var timer = null;
    var bOk = false;
    
	var bSin = false;
    var oPrev=document.getElementById('prev');
	var oNext=document.getElementById('next');
	var oBook=document.getElementById('book');
	var aLi=oBook.getElementsByTagName('li');
   	
   	var oTopnav=document.getElementById('top_nav');
   	var aBook=oTopnav.getElementsByClassName('book');
   	
    //回到顶部  
     window.onscroll = function() {
        if (bOk == true) {
            clearInterval(timer);
        }
        bOk = true;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop) {
            oTop.style.display = 'block';
        } else {
            oTop.style.display = 'none';
        }
    };
     oTop.onclick = function() {
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
            bOk = false;
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
    //book
    var aClass=[];
	for(var i=0; i<aLi.length; i++){
		aClass.push(aLi[i].className);
	}
	
	oPrev.onclick=function (){
		if(bSin)return;
		bSin=true;
		aClass.push(aClass.shift());
		changeClass();
	};
	
	oNext.onclick=function (){
		if(bSin)return;
		bSin=true;
		aClass.unshift(aClass.pop());
		changeClass();
	};
	
	function changeClass(){
		for(var i=0; i<aClass.length; i++){
			aLi[i].className=aClass[i];
		}
		//执行完
		var oCur=document.querySelector('.cur');
		
		function tranEnd(){
			oCur.removeEventListener('transitionend',tranEnd,false);
			bSin=false;
		}
		
		oCur.addEventListener('transitionend',tranEnd,false);
	}
	 //底部导航
	document.onmousemove=function (ev){
		var oEvent=ev||event;
		for(var i=0; i<aImg.length; i++){
			var a=aImg[i].getBoundingClientRect().left+aImg[i].offsetWidth/2-oEvent.clientX;
			var b=aImg[i].getBoundingClientRect().top+aImg[i].offsetHeight/2-oEvent.clientY;
			
			var dis=Math.sqrt(a*a+b*b); //勾股定理
			var scale=1-dis/500;
			if(scale<0.5)scale=0.5;
			aImg[i].style.width=scale*8+'rem';
			aA[i].style.margin=1+'rem';
			
		}
	};
	for (var i = 0; i < aImg.length; i++) {
        aImg[i].index = i;
        aImg[i].onmousemove = function() {
            for (var i = 0; i< aImg.length; i++) { 
                aSpan[i].style.display = 'none';
                aBook[i].style.display = 'none';
            }
            aSpan[this.index].style.display = 'block';
            aBook[this.index].style.display = 'block';
        };
    }
    //我的技能饼图
    var myChart = echarts.init(document.getElementById('main'));
    var option = {
		    title : {
		        text: 'my skill',
		        subtext: '纯属虚构',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        x : 'center',
		        y : 'bottom',
		        data:['html','css','js','jquery','H5','CSS3','vue','react','git']
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType : {
		                show: true,
		                type: ['pie', 'funnel']
		            },
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    series : [
		        {
		            name:'半径模式',
		            type:'pie',
		            radius : [20, 110],
		            center : ['25%', '50%'],
		            roseType : 'radius',
		            label: {
		                normal: {
		                    show: false
		                },
		                emphasis: {
		                    show: true
		                }
		            },
		            lableLine: {
		                normal: {
		                    show: false
		                },
		                emphasis: {
		                    show: true
		                }
		            },
		            data:[
		                {value:10, name:'html'},
		                {value:5, name:'css'},
		                {value:15, name:'js'},
		                {value:25, name:'jquery'},
		                {value:20, name:'H5'},
		                {value:35, name:'CSS3'},
		                {value:30, name:'vue'},
		                {value:40, name:'react'},
		                {value:40, name:'git'}
		            ]
		        },
		        {
		            name:'面积模式',
		            type:'pie',
		            radius : [30, 110],
		            center : ['75%', '50%'],
		            roseType : 'area',
		            data:[
		                {value:10, name:'html'},
		                {value:5, name:'css'},
		                {value:15, name:'js'},
		                {value:25, name:'jquery'},
		                {value:20, name:'H5'},
		                {value:35, name:'CSS3'},
		                {value:30, name:'vue'},
		                {value:40, name:'react'},
		                {value:40, name:'git'}
		            ]
		        }
		    ]
		};
	myChart.setOption(option);

};





























