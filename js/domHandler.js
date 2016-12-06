/* global */

var domHandler = (function () {
	function clearContainer(gallerySelector) {
		document.querySelector(gallerySelector).innerHTML = "";
	}
	function thumbnailClickHandler(e) {
		openImagePopup(domHandler.buildPopup(e.target.originalFile));
	}
	function buildPopup (content) {
		return "<img src='" + content + "'/>";
	}
	function openImagePopup(content) {
		var newWindow = window.open("", "","scrollbars=0, toolbar=0");
		newWindow.document.write(content);
	}
	function appendThumbnail(image, destination) {
		var galleryElement = document.querySelector(destination);
		var thumbElement = wrapThumbnail(image);
		thumbElement.addEventListener("click", thumbnailClickHandler ,false);
		galleryElement.appendChild(thumbElement);
	}
	function createThumbnail(image) {
		var thumbnailElement = document.createElement("a");
		thumbnailElement.classList.add("thumbnail");
		thumbnailElement.setAttribute("title", "click to enlarge");
		thumbnailElement.appendChild(image);
		thumbnailElement.addEventListener("click", thumbnailClickHandler ,false);

		return thumbnailElement;
	}
	function getImageElement (source, outputCallback) {
		var img = new Image();
		img.onload = function (e) {
			outputCallback(img);
		};
		img.src = source;
	}
	return {
		clearContainer: clearContainer,
		thumbnailClickHandler: thumbnailClickHandler,
		getImageElement: getImageElement,
		buildPopup: buildPopup,
		openImagePopup: openImagePopup,
		appendThumbnail: appendThumbnail,
		createThumbnail: createThumbnail
	};
}());

domHandler.buildPopup = function (content) {
	return "<div style='text-align: center'><img src='" + content + "'/></div>";
};