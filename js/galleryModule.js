/* global */

var galleryModule = (function () {
	var config = {};
	function init (input) {
		config = input;
		bindEvents();
	}
	function bindEvents() {
		document.querySelector(config.imageProcessorFileInput).addEventListener("change", galleryModuleHandler, false);
		document.querySelector(config.dropZoneSelector).addEventListener("drop", galleryModuleHandler, false);
		document.querySelector(config.dropZoneSelector).addEventListener("dragover", fileHandler.dropZoneHandlers.dragover, false);
		document.querySelector(config.dropZoneSelector).addEventListener("dragleave", fileHandler.dropZoneHandlers.dragleave, false);
	}
	function galleryModuleHandler (event) {
		event.preventDefault();
		event.target.classList.remove("dropzonehover");
		domHandler.clearContainer(config.imageGallerySelector);
		createGalleryFromFiles(fileHandler.getFiles(event));
	}
	function createCanvasThumbnail(img) {
		var ratio = helpersModule.calculateRatio(img, config.thumbSize);
		// creating new canvas element
		var canvasElement = document.createElement("canvas");
		var ctx = canvasElement.getContext("2d");

		// setting basic properties of canvas
		canvasElement.width = config.thumbSize;
		canvasElement.height = config.thumbSize;

		// putting base64 image.src into canvas for later use
		canvasElement.originalFile = img.src;

		// drawing shrink image in canvas
		ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width * ratio, img.height * ratio);

		return canvasElement;
	}
	function createGalleryFromFiles (files) {
		for(var i = 0; i < files.length; i++) {
			// if(fileHandler.valid)
			if (fileHandler.validateFiles(files[i], config)) {
				fileHandler.getBase64Image(files[i]).then(function (res) {
					domHandler.getImageElement(res).then(function (result) {
						domHandler.appendThumbnail(createCanvasThumbnail(result), config.imageGallerySelector);
					});
				});
			} else {
				domHandler.getImageElement(config.errorFile).then(function (result) {
					domHandler.appendThumbnail(createCanvasThumbnail(result), config.imageGallerySelector);
				});
			}
		}
	}

	return {
		init: init,
		createGalleryFromFiles: createGalleryFromFiles,
		createCanvasThumbnail: createCanvasThumbnail
	};
}());