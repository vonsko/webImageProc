/* global */

var imageProcessor = (function (galleryModule, domHandler, fileHandler, helpersModule) {
	var defaultConfig = {
		thumbSize: 150,
		imageGallerySelector: "#mainArea",
		fileTypesAllowed: "jpe?g|png",
		fileSizeAllowed: 5242880,
		imageProcessorFileInput: "#imageLoader",
		dropZoneSelector: ".callout",
		errorFile: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAACp9JREFUeAHtXWuoFVUUvmY+KilLI6LydCnNiih6GfQSioKiKBCEojCIoNcPwf4URKU9CILe/QsM6R1oRkUU9PhjlAWVmhRlaiqKPcy0d31f11Vzzz3n3Jkza63Zc85a8LnnzD1nrb2/b82e2XvPjAMDYcFAMBAMBAPBQDAQDAQDwUAwEAwEA8FAMBAMBAN9wcCYHm7lVLTtWOBooAEcBhwMTAEmAfsAYwHan8BuYCewHdgGbAS+Ab4E1gDc33PWKwkwAcqcBpwLnAGcAhwKaNomOFsJrADeAT4AfgPCKmLgEMS9DlgO/Az87Qz2FsuAawH2LGEODLDbvgp4A2C37S16u3isy+vAFcBEIEyZgUH4ewD4HmgnQir7ea1wP9AAwkoycDx+/zSQ0tGeN9H+QL2fAmYCYQUZOBLfXwL8BeQlPNXvMXkXA9OAsFEY4PDsXuAXIFVBu60Xh5mLgP2AsBYMXIZ9G4BuCa7L79ajjZe0aH/f7uKEzfNAXQTUquezaDMnpfraLkTrtwBapNbNDyeXzu/HDOAU7N19LHw2UXmhexcg09LY7G07CM3jRE6WhNgeGHgNnEzubekHBo5CA9eG+G2TfzW44aRXTxoXaLYCcbR35mAzODqp1zLgTDRoR4ifO/l/AFezeiUJKD5XzuLIL8YBDxgubdfa2O3HkV9M+OyBwp7gxLpmAC/44pzfvfiSCLwmqN2FIYd6cbVfXnxJAo4OajNE5IRGjPP1xJckeBW8qk8WqTtEJbniNQ8I02Vg+h53b+u61fXGuX3J2Cj1ueC0cbJrB7wxsp8XdrwSngtIaquIe8GZlj0GR7xTN8yWAd7u/qhtiOLeL8dPvI6AiDPE9aXFZRr5izEjdxXew9u4Pgf45E2YHwMbEIpPPvGZiK5NYxRwJ6Jf1HUNuv8hp5c/A3ir+FRAI5nhJrfxgmwNQCH2B8YDnnYAgrHNb3kGbY41iB2/Ap7d8i7EuwGYAIgdgY0XAK968Fb1bI83EZ9vBrxvZmW8BlCZLUFkL9IZh93dbKCV8WjgxZF1fR5EjHa9zXn4GxPUug5Z/4sRrxLjQxvsBrOVsdzuJL4QYJ0EncSXOngnAZ87mCnBPUt2g5aCZ33nEV/abpUEecSXOngngXsvMIiWMvOyIlltFxFfBGASPKJYvyLiSx08k4CPoU2TwB4lH9S0Ejzrtxvxpf1aSdCN+FIHzyS4T4Jal3xE2+Mp3TLiCwdlk6CM+FIHryTYhoDZkZHEVy+vgsfsUWqxzSvp2Uo1ZxI8DBStp4b40gQmgccQca4EtCw91vo5zte0okmgKb60Yz42iiZh0e+/IsGsSi72WF/8/YQYFl1Z3iSwEJ967AvsBoqKWuT7vBhUWymErxF2HfYUqVA33105IqreDibBQx3aYCW+tOCTDrG74arVb+ZJMItyuUMDVllUPOOzXRJYi88q8JVzrUTT3PdSpq2qm+yWeWWuWdlWvji7eIRqzUc6a04CD/EHHbgjn7wNf9zIJpffcxZctBLMYh8XdiiSpUkSeIjPG2+WAhZctfI5y4K42xwbwEZxYccjCaxjUPwnnLm7BfHUzeP835zNj6AV1gKpE5VxWIX45PDFTB3UNjfBU7NAHp/rmgRViU9N1qmpvscR77jxELtdjLolQZXiC4e8Y0jNzoYncVxVyencOpwOKP7jCfB1OuqgZtfAU1XCZ+OmngSpiE/OrsyjPiucxxp5vuTwHd53x5m8FHsC1okjl+uBFCzXXEreBMjeAFl145gEHmP3Iu2k+I8BqYjPuh/Of7TMcxIj2+V32k6lJ6D4KZzzm7l6Tkt8+nkPaA6QwueqkyBV8anNmxROyz6GoxQEb1WHqk4H0u23qlMK+1ZoiU8/fPQrhUa1q4N3EqQuPnni0rOafQFP7chPZb9XEtRBfGqyOo/6eUcBeXz103dIcF9ZnAKGy81egGP+VHq/VvVQPQXEReDwBOCn1JNA9SIw1WGg13l/pPxDe1JOAtVh4FK0t1U3U+W+qsWXpEg1CXJNBOW9CORTJykZJ4DmA0zAqo114PQ0p4JTsq15KpM3ATbmceb0nZTElyanmASqms1DS6vs7iV2Kt2+CN9cpnQ64H9jq2aedwSL2M1l6uIL2akkwWlSIY1yCpw0C+L5uS7iC9cpJAFfXKVq38Kbp+gSq27iC+lVJsHXUgnN8uUKEqCu4gvvVSUBH6xRt1vhUY5Kj9JDfApEWFoVSbDAokFnwqmH8IzBF1B5CMOxO+f0PWLxYQ0v/lTvCEa9/7Xx+HcnYN0Ivn/A+h5ECk7xpS0eSdDIxJO4FuWPiLM3YGIe1wGrTGr+v9Nm8UUEjyTwuK/C5Pwv9F2LDSHMqlwpwQzKduJLW6yT4FMH/q424O0/lwdji120EGZR8jQz8b+IehsUP8/du1ZJsB/iW78i5nfEOFCPstaeXsduC+GzPrm4oml5xZc6WCTBAjRI/FuVyzRJa+eLc8xWDRC/fKUaX62mYVzwynPkS2wpNZPgAtTB463qczQIG80Hu+ftgBBlVe5CjLJJ0K340iaNJKD41l0/68vlX47UXOx+RBGSLMsySVBWfGlXmSTwEp91vcdF+T1BGij/AIQky7KbJKD4mq9l6SYJPMXnxZ/13AlCDLen8NFS+KzvIkmgLb7Uo0gSeIrP+j05XBqfTzMRxnpIKOSzzJMEVuJLPfIkgbf47Iln+Eg+Mspi7BJyPMpOSWAtvrSvUxJ4i886VXL0SypMw4bHFa6Qz5JDxPkA370rNoiNpUD2e5bbXNhpSHCUnORZAHgM9bLtIve5XgSB75nZInjOVsprm43n0y9fVhSf7eTcPqd3vQ8C4XghYpcyzpCVNWb/GqDyTCzbkJr9/hvU9ziAp8WujefNsvYzHNxU1kn8vjADN+IXpcQvHHGUHzyLv0vXFKUtF0tG0aKSP/PO4U2RBOYHwUZwbL7i120GnY8f/hVJYJYEnHeZDajZWDVPQ46+QkGf5yr7DXdDDNyBgnMvSRsT4DUgrgN0OeDteBoX7S7JMxlRVkcSqB0EnGtQf9LHOhM4O7clkqB0EvCJrIa1WFb+T4LjH4A4HXTHwXfg7gQrcbz8noFAO4BIgmIc/AjOTvUSyToOkyB6gvwJwCO/Z8SX5OLpYDMQPUFnDnjOr323L6I3l7wwjNFB+wTg1X5tL/iaxW73eTL+8CoQPcFwDpaDk9oN9dqJPNp+ThbdBcS08dBtdbeDi9pM8owmbpG/c+2gnxeQuLAzuwhhvfhdriI+A/TbKWEJ2pzsql4ViXYpgq7vg0RYhzZeDIS1YIC3l90D8MbPXusReN/gQiB7Mys+hrVigEMhLnt6PndglXBsw5NA3DMJEooaHz5hIng9hqaZBHxci8LPAMJKMjANv78P2AZoimThayvqyNOY+7N6iNnzNgEtnAu8AqTUK/BoXwbMAcYDYQ4McPg4D3gJqGK1kat1LwBXA7Udzo1B5XvBxqERJwPnALMArqQ1AE1bB2cfAu8D7wIfAeyFam29kgCtRDgAO48BpgO8Aj8c4Euu2HNMAjgc2xugUUg+ZLET4NtPeB7nLN0GgI9/rQXYy4QFA8FAMBAMBAPBQDAQDAQDwUAwEAwEA8FAMBAMBAP1ZOAfYqBD7sgTEkIAAAAASUVORK5CYII=" // data64 string or url
	};
	var config = {};
	function init (inputConfig) {
		config = Object.assign({}, defaultConfig, inputConfig);
		galleryModule.init(config);
	}
	return {
		init: init
	};
}(galleryModule, domHandler, fileHandler, helpersModule));