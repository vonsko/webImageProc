
var gallery1 = new imageProcessor();
var gallery2 = new imageProcessor();

gallery1.init({
	imageGallerySelector: "#mainArea",
	fileTypesAllowed: "jpe?g|png",
	fileSizeAllowed: 10485760,
	imageProcessorFileInput: "#imageLoader",
	dropZoneSelector: "#fieldArea1",
	thumbSize: 200
});

gallery2.init({
	imageGallerySelector: "#mainArea2",
	fileTypesAllowed: "jpe?g|png",
	fileSizeAllowed: 10485760,
	imageProcessorFileInput: "#imageLoader2",
	dropZoneSelector: "#fieldArea2",
	thumbSize: 120
});