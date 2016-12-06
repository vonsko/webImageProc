/* global */

var fileHandler = (function () {
	// var config = {};
	var dropzonehandlers = {
		// handlers for dropzone
		drop: function (e) {
			e.target.classList.remove("dropzonehover");
			e.preventDefault();
		},
		dragover: function (e) {
			e.target.classList.add("dropzonehover");
			e.preventDefault();
		},
		dragleave: function (e) {
			e.target.classList.remove("dropzonehover");
			e.preventDefault();
		}
	};
	function getFiles (event) {
		return event.dataTransfer ? event.dataTransfer.files : event.target.files;
	}
	function getFileContent(file, outputCallback) {
		var reader = new FileReader();
		reader.onload = function (e) {
			outputCallback(e.target.result);
		};
		reader.readAsDataURL(file);
	}
	function validateFile (file, config) {
		return checkFileType(file, config.fileTypesAllowed) && checkFileSize(file, config.fileSizeAllowed);
	}
	function checkFileType (file, typesAllowed) {
		return new RegExp("\\.("+typesAllowed+")$", "i").test(file.name);
	}
	function checkFileSize (file, sizeAllowed) {
		return file.size < sizeAllowed;
	}
	return {
		getFiles: getFiles,
		getFileContent: getFileContent,
		validateFiles: validateFile,
		checkFileType: checkFileType,
		checkFileSize: checkFileSize,
		dropZoneHandlers: dropzonehandlers
	};
}());