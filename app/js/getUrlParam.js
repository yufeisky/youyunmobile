// JavaScript Document
(function($){
	$.getUrlParam = function(name)
	{
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		// console.log(reg);
		// 调试的时候可以先打印window.location，具体看哪个才是需要的内容
		// console.log(window.location)
		// hash:"#/tab/user?openid=ozom3tzdcYzDJTAPDEoeSSc2GmEw&nickname=%E5%92%96%E5%95%A1%E7%8C%AB&headImg=http:%2F%2Fwx.qlogo.cn%2Fmmopen%2FBTwPkXHCrhtkNy8Wa56Aq9S05z2YUvdd3PCUhoJ2y96Kb6qEUgjARGl7YwuFozH0Vltibia48TqmLLcScTMSkNeFnJ5OiaywUicT%2F0&sharerUserId="
		// search:""
		// 链接不带#号的时候是需要获取window.location.search，然后window.location.hash.substr(1)把？截取掉
		// 本项目中需要用到的是有#的 需要获取window.location.hash，然后在substr(11)把#/tab/user?截取掉再去正则匹配
		var r = window.location.hash.substr(11).match(reg);
		// console.log(window.location.hash.substr(11))
		if (r!=null) return decodeURI(r[2]); return null;
	}
})(jQuery);