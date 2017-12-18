 app.controller("carController",function($scope,$rootScope,$http,$state){
	$scope.title="购物车";
	//判断购物车有没有商品没有显示emptycar  有就渲染
	var user=window.localStorage.getItem("username");
	var req=/^goodsdata_/;
	var goodsArr=[];
	 for(var i=0;i<localStorage.length;i++){
	 	  if(req.test(localStorage.key(i))){
	 	  	var goodsT=localStorage.key(i).split("_")[1];
	 	  		if(user==goodsT){
//	 	  			console.log(localStorage.key(i))
 	  				var goodsdata=localStorage.getItem(localStorage.key(i));
					goodsdata=JSON.parse(goodsdata);
					goodsArr.push(goodsdata);
	 	  		}
		  }
	 }
	$scope.goodsArr=goodsArr;
	if(goodsArr.length!=0){
		$rootScope.l_emptycart=false;
		$rootScope.l_fullcart=true;
		$rootScope.l_totalBox=true;
		$rootScope.l_showBack=true;
	}else{
		$rootScope.l_emptycart=true;
		$rootScope.l_fullcart=false;
		$rootScope.l_totalBox=false;
		$rootScope.l_showBack=false;
	}
	//点击跳转到详情页
	$scope.getId=function(index,val){
		val=angular.element(document.querySelectorAll(".l_carList")[index]).attr("item-id");
		$state.go("goodsDetails.tuwendetail",{
			id:val
		})
	}
	//减少  
	$scope.reduce= function (index) {  
	    if($scope.goodsArr[index].goodsNum>1){  
	        $scope.goodsArr[index].goodsNum--;  
	    }else{  
			localStorage.setItem("goodsCount",0);
	        $scope.remove(index); 
						
	    }  
	    localStorage.setItem("goodsCount",$scope.allNum());
 
	    var goodsid=angular.element(document.querySelectorAll(".l_carList")[index]).attr("item-id");
		var goodskey="goodsdata_"+user+"_"+goodsid;
		var gdsdata=localStorage.getItem(goodskey);
		gdsdata=JSON.parse(gdsdata);
		gdsdata.goodsNum=$scope.goodsArr[index].goodsNum;
//		console.log(gdsdata)
		gdsdata=JSON.stringify(gdsdata);
		localStorage.setItem(goodskey,gdsdata);

	};  
	//增加  
	$scope.add=function(index){  
	    $scope.goodsArr[index].goodsNum++;
	    localStorage.setItem("goodsCount",$scope.allNum());
	  
	    var goodsid=angular.element(document.querySelectorAll(".l_carList")[index]).attr("item-id");
		var goodskey="goodsdata_"+user+"_"+goodsid;
		var gdsdata=localStorage.getItem(goodskey);
		gdsdata=JSON.parse(gdsdata);
		gdsdata.goodsNum=$scope.goodsArr[index].goodsNum;
//		console.log(gdsdata)
		gdsdata=JSON.stringify(gdsdata);
		localStorage.setItem(goodskey,gdsdata);
	};  
	//计算总价  
	$scope.allSum=function(){  
	    var allPrice = 0;  
	    for(var i= 0;i<$scope.goodsArr.length;i++){  
	        allPrice+=$scope.goodsArr[i].goodsPrice*$scope.goodsArr[i].goodsNum;  
	    }  
	    return allPrice.toFixed(2);  
	};  
	//计算总数量  
	$scope.allNum=function(){  
	    var allShu=0;  
	    for(var i=0;i<$scope.goodsArr.length;i++){  
	        allShu+=$scope.goodsArr[i].goodsNum;  
	    }  
	    return allShu;  
	};  
	//移除一项  
	var index=$scope.goodsArr.length-1;
//	console.log(index)
	$scope.remove=function(index){  
		$scope.goodsArr.splice(index,1);  
	    if($scope.goodsArr.length==0){
	    	$rootScope.l_emptycart=true;
			$rootScope.l_fullcart=false;
			$rootScope.l_totalBox=false;
			$rootScope.l_showBack=false;
			localStorage.setItem("goodsCount",0);
			var reg=/^goodsdata_/;
			for (var i=0;i<localStorage.length;i++) {
//				console.log(localStorage.getItem(localStorage.key(i)));
				if(reg.test(localStorage.key(i))){
//					console.log(localStorage.key(i))
					localStorage.removeItem(localStorage.key(i));
				}
			}
			
	    }else{
	    	$rootScope.l_emptycart=false;
			$rootScope.l_fullcart=true;
			$rootScope.l_totalBox=true;
			$rootScope.l_showBack=true;
	    }
	};  
})
