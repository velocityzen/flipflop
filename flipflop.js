/*jshint strict: false, browser: true, jquery: true*/

(function($, window, document, undefined) {

var $w = $(window),
	scrollBarWidth;

var getScrollbarWidth = function() {
    if ( scrollBarWidth === undefined ) {
		var $inner = $('<p>').css({
				width: '100%',
				height: '100%'
			}),

			$outer = $('<div>').css({
				position: "absolute",
				top: 0,
				left: 0,
				visibility: "hidden",
				width: "100px",
				height: "100px",
				overflow: "hidden"
			}),

			inner = $inner[0],
			outer = $outer[0];

		$outer
			.append($inner)
			.appendTo('body');

		var w1 = inner.offsetWidth,
			h1 = inner.offsetHeight;

		$outer.css('overflow', 'scroll');

		var w2 = inner.offsetWidth,
			h2 = inner.offsetHeight;
		if (w1 == w2) {w2 = outer.clientWidth;}
		if (h1 == h2) {h2 = outer.clientHeight;}

		$outer.remove();

		scrollBarWidth = [(w1 - w2),(h1 - h2)];
    }

    return scrollBarWidth;
};

var FlipFlop = function(options) {
	var self = this;

	self.$p = options.parent ? $(options.parent) : $w;
	self.flip = options.flip;
	self.flop = options.flop;
	self.w = options.width ? options.width - getScrollbarWidth()[0] : undefined;
	self.h = options.height ? options.height - getScrollbarWidth()[1] : undefined;
	self.flipped = false;
	self.cb = options.cb;

	$w.on('resize', function(){
		var ww = $w.width(),
			hh = $w.height();

		if( (ww <= self.w || hh <= self.h) && !self.flipped) {
			self.flipped = true;
			self.ff();
		}

		if( (ww > self.w || hh > self.h) && self.flipped) {
			self.flipped = false;
			self.ff();
		}
	}).resize();
};

FlipFlop.prototype.ff = function() {
	var self = this;
	self.$p.each(function(i, el) {
		var $el = $(el);
		if(self.flipped) {
			$(self.flop, $el).after($(self.flip, $el));
		} else {
			$(self.flip, $el).after($(self.flop, $el));
		}
	});

	self.cb && self.cb(self.flipped);
};

window.FlipFlop = FlipFlop;

})(jQuery, window, document);
