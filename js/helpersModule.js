
var helpersModule = (function () {
	function calculateRatio (img, thumbSize) {
		var ratio = 1;
		if(img.width > thumbSize) ratio = thumbSize / img.width;
		else if(img.height > thumbSize) ratio = thumbSize / img.height;
		// higher value will determine ratio.

		return ratio;
	}
	return {
		calculateRatio: calculateRatio
	};
}());