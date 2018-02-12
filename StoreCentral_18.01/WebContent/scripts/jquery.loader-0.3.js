function fullScreenLoader() {
	
	 startLoading();/*
	//$('.footerWrapper').css('left',($(document).width()-980)/2).css('position','absolute').css('margin-bottom','0px');
	$('body').css('overflow-y','hidden');
	$.loader();
	$("#jquery-loader-background").addClass("ui-widget-overlay");
	
*/}
/*
 * @version: 0.3 (12/09/2010) @requires jQuery v1.2.2 or later @author : Rémi
 * Goyard
 * 
 * @see http://demos.mimiz.fr/jquery/loader Small loader usage : $.loader();
 *      $.loader(options) -> options = {
 *  }
 * 
 * To close loader : $.loader("close");
 * 
 */
var jQueryLoaderOptions = null;
;
(function($) {
	$.loader = function(option) {
		switch (option) {
		case 'close':
			stopLoading();
//			if (jQueryLoaderOptions) {
//				if ($("#" + jQueryLoaderOptions.id)) {
//					$(
//							"#" + jQueryLoaderOptions.id + ", #"
//									+ jQueryLoaderOptions.background.id)
//							.remove();
//					//$('.footerWrapper').removeAttr('style');
//					$('body').css('overflow-y','scroll');
//
//				}
//			}
			return;
			break;
		case 'setContent':
			if (jQueryLoaderOptions) {
				if ($("#" + jQueryLoaderOptions.id)) {
					if ($.loader.arguments.length == 2) {
						$("#" + jQueryLoaderOptions.id).html(
								$.loader.arguments[1]);
					} else {
						if (console) {
							console
									.error("setContent method must have 2 arguments $.loader('setContent', 'new content');");
						} else {
							alert("setContent method must have 2 arguments $.loader('setContent', 'new content');");
						}
					}
				}
			}
			return;
			break;
		default:
			var options = $
					.extend({
								content : "<div>Please wait, your request is being processed ...</div>",
								className : 'loaderImage',
								id : 'jquery-loader',
								height : 60,
								width : 200,
								zIndex : 30000,
								background : {
									opacity : 0.3,
									id : 'jquery-loader-background'
								}
							}, option);
		}
		jQueryLoaderOptions = options;
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
		var bgDiv = $('<div id="' + options.background.id + '"/>');
		bgDiv.css({
			zIndex : options.zIndex,
			position : 'absolute',
			top : '0px',
			left : '0px',
			width : maskWidth,
			height : maskHeight,
			opacity : options.background.opacity
		});
		bgDiv.appendTo("body");
		if (jQuery.bgiframe) {
			bgDiv.bgiframe();
		}
		var div = $('<div id="' + options.id + '" class="' + options.className
				+ '"></div>');
		div.css({
			zIndex : options.zIndex + 1
		});
		div.appendTo('body');
		div.center();
		$(options.content).appendTo(div);
	};
	$.fn.center = function() {
		this.css("position", "absolute");
		this.css("top", ($(window).height() - this.outerHeight()) / 2
				+ $(window).scrollTop() + "px");
		this.css("left", ($(window).width() - this.outerWidth()) / 2.5
				+ $(window).scrollLeft() + "px");
		return this;
	}
})(jQuery);