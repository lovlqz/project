angular.module("app.controllers", [])
.factory("settings", ["$rootScope", function($rootScope){
	var settings = {
		languages: [
			{
				language: "Chinese, Simplified",
				translation: "简体中文",
				langCode: "zh_cn",
				flagCode: "cn"
			},
			{
				language: "Chinese, Traditional",
				translation: "繁體中文",
				langCode: "zh_tw",
				flagCode: "tw"
			},
			{
				language: "English",
				translation: "English",
				langCode: "en",
				flagCode: "us"
			}
		]
	};
	return settings;
	
}])
.controller("PageViewController", ["$scope", "$route", "$animate", function($scope, $route, $animate) {
	// controler of the dynamically loaded views, for DEMO purposes only.
	/*$scope.$on("$viewContentLoaded", function() {
		
	});*/
}])
.controller("SmartAppController", ["$scope", function($scope) {
	// your main controller
}])
.controller("LangController", ["$scope", "settings", "localize", function($scope, settings, localize) {
	$scope.languages = settings.languages;
	$scope.currentLang = settings.currentLang;
	$scope.setLang = function(lang) {
		settings.currentLang = lang;
		$scope.currentLang = lang;
		localize.setLang(lang);
	}
	// set the default language
	$scope.setLang($scope.currentLang);

}]);

angular.module("app.desktopController", [])
.controller("vdiDesktopTeachListController", ["$scope", "$element", "$sec", function($scope, $element, $sec){
var desktop_teach_data = JSON.stringify({
	"name" : Math.random().toString(36).substr(2),
	"alias" : "别名",
	"usb" : false,
	"status" : "正常",
	"jieru" : "终端",
	"ip_mac" : "12:03:FE:3B:75:34",
	"template" : "Windows7-32",
	"hardware" : { cpu : "2", mem : "2 GB", disk : "10 GB" },
	"host" : "...",
	"login_name" : "peng",
	"jiaoxuechangjing" : ""
});

function vdiDesktopTeachListController($scope){
	$scope.rows = [0,0,0,0,0,0,0,0,0].map(function(){
		var d = JSON.parse(desktop_teach_data);
		d.name = Math.random().toString(36).substr(2);
		d.alias = "别名" + Math.random().toString(36).substr(2);
		d.template = ["WinXP", "Win7", "Win8", "OSX", "Linux32"][Math.floor((Math.random() * 5))];
		d.jiaoxuechangjing = ["物理", "化学", "中文", "哲学", "计算机"][Math.floor((Math.random() * 5))];
		d.login_name = ["张三", "李四", "王五", "Andy", "Jacky"][Math.floor((Math.random() * 5))];
		d.status = "已运行 " + Math.ceil(Math.random() * 10) + "小时" + (Math.floor(Math.random() * 60)) + "分";
		return d;
	});
}
}]);


angular.module("app.demoControllers", [])
.controller("WidgetDemoCtrl", ["$scope", "$sce", function($scope, $sce) {
	$scope.title = "SmartUI Widget";
	$scope.icon = "fa fa-user";
	$scope.toolbars = [
		$sce.trustAsHtml('<div class="label label-success">\
			<i class="fa fa-arrow-up"></i> 2.35%\
		</div>'),
		$sce.trustAsHtml('<div class="btn-group" data-toggle="buttons">\
	        <label class="btn btn-default btn-xs active">\
	          <input type="radio" name="style-a1" id="style-a1"> <i class="fa fa-play"></i>\
	        </label>\
	        <label class="btn btn-default btn-xs">\
	          <input type="radio" name="style-a2" id="style-a2"> <i class="fa fa-pause"></i>\
	        </label>\
	        <label class="btn btn-default btn-xs">\
	          <input type="radio" name="style-a2" id="style-a3"> <i class="fa fa-stop"></i>\
	        </label>\
	    </div>')
	];

	$scope.content = $sce.trustAsHtml("\
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\
					tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\
					consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\
					proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
}])

.controller("ActivityDemoCtrl", ["$scope", function($scope) {
	var ctrl = this;
	ctrl.getDate = function() {
		return new Date().toUTCString();
	};

	$scope.refreshCallback = function(contentScope, done) {

		// use contentScope to get access with activityContent directive"s Control Scope
		console.log(contentScope);

		// for example getting your very long data ...........
		setTimeout(function() {
			done();
		}, 3000);

		$scope.footerContent = ctrl.getDate();
	};

	$scope.items = [
		{
			title: "Msgs",
			count: 14, 
			src: "ajax/notify/mail.html",
			onload: function(item) {
				console.log(item);
				alert("[Callback] Loading Messages ...");
			}
		},
		{
			title: "Notify",
			count: 3,
			src: "ajax/notify/notifications.html"
		},
		{
			title: "Tasks",
			count: 4,
			src: "ajax/notify/tasks.html",
			//active: true
		}
	];

	$scope.total = 0;
	angular.forEach($scope.items, function(item) {
		$scope.total += item.count;
	})

	$scope.footerContent = ctrl.getDate();
	
}]);
