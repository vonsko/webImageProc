/* global */

function galleryModule () {
	var config = {};
	var $ = document.querySelector.bind(document);
	function init (input) {
		config = input;
		bindEvents();
	}
	function bindEvents() {
		var $dropzone = $(config.dropZoneSelector);
		$(config.imageProcessorFileInput).addEventListener("change", galleryModuleHandler, false);
		$dropzone.addEventListener("drop", galleryModuleHandler, false);
		$dropzone.addEventListener("dragover", fileHandler.dropZoneHandlers.dragover, false);
		$dropzone.addEventListener("dragleave", fileHandler.dropZoneHandlers.dragleave, false);
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
			if (fileHandler.validateFiles(files[i], config)) {
				fileHandler.getFileContent(files[i], function (res) {
					domHandler.getImageElement(res, function (result) {
						$(config.imageGallerySelector).appendChild(domHandler.createThumbnail(createCanvasThumbnail(result)));
					});
				});
			} else {
				domHandler.getImageElement(config.errorFile, function (result) {
					$(config.imageGallerySelector).appendChild(domHandler.createThumbnail(createCanvasThumbnail(result)));
				});
			}
		}
	}

	return {
		init: init,
		createGalleryFromFiles: createGalleryFromFiles,
		createCanvasThumbnail: createCanvasThumbnail
	};
}