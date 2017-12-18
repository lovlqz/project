app.controller("homeController",function($scope,$http,$timeout,$state){
	$http({
		url:"json/home.json",
		method:"get",
	}).success(function(data){
		$scope.apiUrl=data.apiUrl;
		$scope.dataList=data.dataList.ad13;
		$scope.flowerList=data.dataList.ad14;
		$scope.banner=data.dataList.ad15;
		$scope.article=data.dataList.article;
//		console.log($scope.apiUrl);
//		console.log($scope.dataList)
		getSwiper();
	})
	function getSwiper(){
		$timeout(function(){
			$scope.mySwiper = new Swiper('.swiper-container', {
				autoplay: 2000,
				autoplayDisableOnInteraction : false,
				loop:true,
				pagination : '.swiper-pagination'
			})
		},0)
	}	
	$(".article li").click(function(){
		$(this).addClass("articleActive").siblings().removeClass("articleActive");
	})
	$scope.getClassId=function(value){
		$state.go("article_detail",{
			id:value
		});
	};
	$scope.arr=["精品花束","伴手礼盒","永生花","商务用花"];
	$scope.intoSearch=function(val){
		$state.go("footer.list",{
			name:val
		});
	}	
	$scope.getId=function(val){
		val=val.split("=")[1];
//		console.log(val);
		$state.go("goodsDetails.tuwendetail",{
			id:val
		})
	}
	$scope.$on("$viewContentLoaded",function(){
		$("#homemain").addClass("ani")	
	})
})

