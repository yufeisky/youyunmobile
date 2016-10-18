// JavaScript Document
(function($){
	$.getUrlParam = function(name)
	{
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		// console.log(reg);
		var r = window.location.hash.substr(11).match(reg);
		// console.log(window.location.hash.substr(11))
		if (r!=null) return decodeURI(r[2]); return null;
	}
})(jQuery);