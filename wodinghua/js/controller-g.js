//登录控制器
app.controller("loginController",function($scope,$state,$timeout){
	$scope.toRegist=function(){
		//console.log(111);
		$state.go("regist");
	}
	
	$scope.username=localStorage.getItem("username");
	$scope.password=localStorage.getItem("psw");
	//console.log($scope.username);
	//console.log($scope.password);
	$scope.user=$scope.username;
	
		
	$scope.login=function(){
		//console.log("登录");
		if($scope.user&&$scope.psw){
				if($scope.password==$scope.psw){
					console.log("登录成功");
					$scope.showFlag=true;
						$scope.txt="登录成功";	
						$timeout(function(){				
							$scope.showFlag=false;	
							$state.go("footer.home.article1");
						},1500)
					
				}else{
					$scope.showFlag=true;
						$scope.txt="账号或密码错误";	
						$timeout(function(){				
							$scope.showFlag=false;	
						},1500)
				}
		}else if(!$scope.user&&!$scope.psw){
			//console.log("error")
			$scope.showFlag=true;
			$scope.txt="请先注册";	
			$timeout(function(){				
				$scope.showFlag=false;
				$state.go("regist");
			},1500)
		}else if($scope.user!=$scope.username){
				$scope.showFlag=true;
				$scope.txt="用户名错误";	
				$timeout(function(){				
					$scope.showFlag=false;	
				},1500)
		}else if(!$scope.psw){
			$scope.showFlag=true;
				$scope.txt="请输入密码";	
				$timeout(function(){				
					$scope.showFlag=false;	
				},1500)
		}
		
		
	}
	
	
	
})

//注册控制器
app.controller("registController",function($scope,$state,$timeout){
	//点击登录按钮
	$scope.toLogin=function(){
		console.log(222);
		$state.go("login");
	}
	var num;
	var Flag1;
	var Flag2;
	var Flag3;	
	//点击注册按钮
	//$scope.showFlag="true";
	$scope.login=function(){
		//console.log(33);	
		//console.log($scope.username+","+$scope.code+","+$scope.psw);
		var pattern1=/^1[34578]\d{9}$/;
		 Flag1=pattern1.test($scope.username);
		//console.log("Flag1:"+Flag1);
		var pattern2=/\.{6,12}/;
		Flag3=pattern2.test($scope.psw);
		if($scope.psw)
		{
			var pattern2=/^[0-9a-zA-Z]{6,12}$/;
			Flag3=pattern2.test($scope.psw);
		}else{
			Flag3=false;
		}
		//console.log("Flag3："+Flag3)
		if($scope.code)
		{
			if(num==$scope.code)
			{
				Flag2=true;
				//console.log("验证码正确");
			}
		}
		
	
		if(Flag1){
			if(Flag2){
				if(Flag3){
					$scope.showFlag=true;
					$scope.txt="注册成功";	
					
					localStorage.setItem("username",$scope.username);
					localStorage.setItem("psw",$scope.psw);
					$timeout(function(){				
						$scope.showFlag=false;	
						$state.go("login");
					},2000)			
				}else{
					$scope.showFlag=true;
					$scope.txt="密码6-12位";	
					$timeout(function(){				
						$scope.showFlag=false;			
					},1500)
				}
			}else{
				$scope.showFlag=true;
				$scope.txt="验证码错误";			
				$timeout(function(){				
					$scope.showFlag=false;			
				},1500)
			}
			
			
		}
	
		else{
			$scope.showFlag=true;
			$scope.txt="手机号格式错误";			
			$timeout(function(){				
				$scope.showFlag=false;			
			},1500)
		}
		
	}	
			//点击获取验证码
		$scope.getCode=function(){
			var pattern1=/^1[34578]\d{9}$/;
			Flag1=pattern1.test($scope.username);
			if(Flag1){
				console.log("发送验证码");
				$scope.showFlag=true;
					var a=Math.floor(Math.random()*10);
					var b=Math.floor(Math.random()*10);
					var c=Math.floor(Math.random()*10);
					var d=Math.floor(Math.random()*10);
					num=a+""+b+""+c+""+d;		
					console.log(num);
					$scope.txt=num;		
					$timeout(function(){				
						$scope.showFlag=false;			
					},2000)
			}else{
				$scope.showFlag=true;
				$scope.txt="手机号格式错误";			
				$timeout(function(){				
					$scope.showFlag=false;			
				},1500)
			}

	}

	
	
})

//文章详情控制器
app.controller("article_detailController",function($scope,$state,$stateParams,$http){
	var articleId=$stateParams.id;
	//console.log(articleId);
	var article;	
	
	$http.get("http://wdinghua.applinzi.com/json/g_detail.json").then(function(res){
		//console.log(res.data);
		var mydata=res.data;
//		mydata.map(function(value){
//			console.log(value);
//		})
		angular.forEach(mydata,function(value,index,list){
			
			if(value.articleId==articleId)
			{
				article=value;
			}
		})
		//console.log(article.articleTitle);
		//console.log(article.addTime);
		$scope.title=article.articleTitle;
		$scope.time=article.addTime;

	})
	$scope.toHome=function(){
		$state.go("footer.home")
	}
	
})