jQuery.fn.scrollMenu = function (options){			
	var options = jQuery.extend({
	container: window,
	min: 0,
	max: 0,
	onEnter: options.onEnter ? options.onEnter : [],
	onLeave: options.onLeave ? options.onLeave : [],
	},options);

	return this.each(function () {
		var element = this;
		var o = options;
		var container = jQuery(o.container);
		var inside = false;
		container.bind('scroll', function(e){
			var position = {top: jQuery(this).scrollTop(), left: jQuery(this).scrollLeft()};
			var xy = position.top;
			var max = o.max == 0 ? container.height() : o.max;
			var min = o.min;

			if(xy >= o.min && xy <= max){
				if(!inside){
					inside = true;                       
					jQuery(element).trigger('scrollEnter', {position: position})
					if(jQuery.isFunction(o.onEnter)){
						o.onEnter(element, position);
					}
				}
			}else{
				if(inside){
					inside = false;
					jQuery(element).trigger('scrollLeave', {position: position})
					if(jQuery.isFunction(o.onLeave)){
						o.onLeave(element, position);
					}
				}
			}
		}); 
	});
};