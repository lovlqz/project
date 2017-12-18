app.controller("l_goodsDetailsController",function($scope,$rootScope,$http,$stateParams,$state){
	$scope.$on("$viewContentLoaded" ,function(){
		$scope.l_goIn=true;
	});
	var goodsID=$stateParams.id;
	console.log(goodsID);
	//页面渲染
	$http.get("json/goodsdetails.json").then(function(res){
//		console.log(res.data.dataList)
		var data=res.data.dataList;
		var apiUrl=res.data.apiUrl;
//		console.log(res.data.apiUrl)
		if(data.length){
			data.map(function(value){
				if(value.goodsId==goodsID){
					$rootScope.goodsId=value.goodsId;
					$rootScope.goodsLogo=apiUrl+value.goodsLogo;          //  上线是换这个apiUrl+value.goodsLogo;
					$rootScope.goodsName=value.goodsName;
					$rootScope.goodsSub=value.goodsSub;
					$rootScope.goodsPrice=value.goodsPrice;
					$rootScope.marketPrice=value.marketPrice;
					$rootScope.saleCount=value.saleCount;
					$rootScope.commentCount=0   //value.commentCount;
				}
			})
			var l_Has=$rootScope.commentCount;
//				console.log(l_Has)
				if(l_Has==0){
					$rootScope.l_showemptypl=true;
					$rootScope.l_showfullpl=false;
				}else{
					$rootScope.l_showemptypl=false;
					$rootScope.l_showfullpl=true;
				}
		}
	})
	//点击回退
	$scope.l_goBack=function(){
		window.history.back(-1);
	};
	//当页面滑到一定距离出现小火箭
	document.querySelectorAll(".ll_section")[0].addEventListener("scroll", function () {
		var overTop=angular.element(document.querySelectorAll(".ll_section")[0])["0"].scrollTop;
		if(overTop>700){
			$rootScope.showH=true;
		}else{
			$rootScope.showH=false;
		}
		$scope.$apply();
	}, false);
	
	$scope.l_goTop=function(){
		angular.element(document.querySelectorAll(".ll_section")[0])["0"].scrollTop=0;
	}

//	localStorage.setItem("username","lili")
	//点击加入购物车
	var goodsnum;
	var goodsCount=localStorage.getItem("goodsCount");
	$rootScope.goodsCount=goodsCount?goodsCount:0;
	$scope.l_addCart=function(){
		//判断是否有用户
		var user=window.localStorage.getItem("username");
	   if(user){
	   	var data=localStorage.getItem("goodsdata_"+user+"_"+$rootScope.goodsId);
	   		data=JSON.parse(data);	   	
	   		goodsnum=data!=null?data.goodsNum:0
	   		goodsnum++;
			var goods={
				goodsId:$rootScope.goodsId,
				goodsLogo:$rootScope.goodsLogo,
				goodsName:$rootScope.goodsName,
				goodsPrice:$rootScope.goodsPrice,
				goodsNum:goodsnum
			}
			var goodsdata="goodsdata_"+user+"_"+goods.goodsId;
			goodsCount++;
			$rootScope.goodsCount=goodsCount
			localStorage.setItem("goodsCount",goodsCount);
			goods=JSON.stringify(goods);
			localStorage.setItem(goodsdata,goods);
		}else{
			//没有登录就跳转到登录页
			$state.go("login")
		}
	}
})
app.controller("pinglunController",function($scope,$rootScope){
	$scope.l_getPl=function(){
		$rootScope.l_showemptypl=false;
		$rootScope.l_showfullpl=true;
	}
})