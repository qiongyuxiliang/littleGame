$(document).ready(function(){
	
	var t,s
	index=1,
	// flag=0;//0表示没有通过关，1表示通过
	n = 1;
	var rank=[32.0,23];//存储排名
	// 百度的随机洗牌算法
	Array.prototype.shuffle = function() {
		var input = this;
		for (var i = input.length-1; i >=0; i--) {
			var randomIndex = Math.floor(Math.random()*(i+1)); 
			var itemAtIndex = input[randomIndex]; 
			input[randomIndex] = input[i]; 
			input[i] = itemAtIndex;
		}
		return input;
	}
	// 改动的二分排序法
	function binaryInsertSort(arr){
		for (var i = 1; i < arr.length; i++) {
			var key = arr[arr.length-1], left = 0, right = i - 1;
			while (left <= right) {
				var middle = parseInt((left + right) / 2);
				if (key < arr[middle]) {
					right = middle - 1;
				} else {
					left = middle + 1;
				}
			}
			for (var j = i - 1; j >= left; j--) {
				arr[j + 1] = arr[j];
			}
			arr[left] = key;
		}
				// 改变数组，返回位置
				return {arr,left};
			}
		// 建立新的数组
		function newAr(k,t,n){
			var arr1=[];
			for (var i = k ; i<t ;i++ )
			{
				arr1[i]=i+n;
			}
			return arr1;
		}
	// 生成数组
	function init(arr){
		// 随机分配算法		
		var i=0 ;
		$('#fom').find('tr').each(function () {    
			$(this).find('td').each(function () {        
				$(this).text(arr[i]);
				i=i+1;
			})       
		})  
	}
	// 获取点击的数在数组的位置
	function num(nu){
		for (var i =0 ;i<25;i++){
			if(nu==d[i])
				return i;
		}	
		return i;	
	}
	// 计时器
	
	function calcTime(){
		s=setTimeout(function(){
			
			$('.time').text((n*0.005).toFixed(3));
			n=n+1;
		}, 5)
		t=setTimeout(calcTime,5);
	}
	// 1.初始化init
	// 把前1-25随机装进表格里
	// 开始点击1时开始计时，并在点击后的表格里出现26-50一个随机出现的数字
	// 计算走的步数是数字的大小+1；
	// 重新开始是重新初始化
	// 
	
// $('.hunman_rank').on('click',function(){
// 	clearTimeout(t);
// })
	// 点击事件	
	
	// click回调函数
	function calb(ar){
		var ar=d;
		if($(this).text()==1){
			calcTime();	
			ar[num(1)]=d1[index-1];
			init(ar);
			index++;
			$('.steps').text(index);
		}
		else if(($(this).text()!=1)&&($(this).text()==index)&&(index<26)){
			ar[num(index)]=d1[index-1];
			init(ar);
			index++;
			$('.steps').text(index);

		}
		else if(($(this).text()!=1)&&($(this).text()==index)&&(index>=26)&&(index<=50)){
			ar[num(index)]='';
			init(ar);
			index++;
			$('.steps').text(index);
			if(index==51){
				ar[num(index)]='';
				clearTimeout(t);
				// flag=1;//更改标志表示通关
				rank.push(parseInt($('.time').text()));
				alert('完成挑战');
			}
		}
	}
	$('.row').on('click','td',calb)
	// 重新分配数组

	c=newAr(0,25,1);
	c1=newAr(0,25,26);
	d=c.shuffle();
	// 获取26-50的随机数
	d1=c1.shuffle();
	console.log(c.shuffle())	
	// 初始化
	init(d);
	$('.retry').on('click',x);
	function x(){
		// 必须全局变量
		index=1,n=0		
		clearTimeout(t);
		// clearTimeout(s);//作用清除数字		
		$('.steps').text(1);
		c=newAr(0,25,1);
		c1=newAr(0,25,26);
		d=c.shuffle();
	// 获取26-50的随机数
	    d1=c1.shuffle();
	    $('.time').text('0.000');
	    init(d);

}

$('.hunman_rank').on('click',function(){
	if(!rank){
		rank[0]=parseInt($('.time').text());
		alert('第一名')
	}
	else{

			// 排序，
			alert('第'+(binaryInsertSort(rank).left+1)+'名'+'用时'+rank[binaryInsertSort(rank).left]+'秒');
			console.log(d);
			

		}

	})



})