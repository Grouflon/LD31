if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}
/* ===================================
 * Data Helpers
 * ===================================*/
define([

]
	, function () {

		/**
		 * Convert a xml structure into a json object
		 * found here : http://stackoverflow.com/questions/1898640/ignoring-empty-xml-nodes-in-javascript
		 * @param xml
		 * @returns {Object}
		 * @private
		 */
		function _xmlToObject(xml, strip) {

			var traverse = function(node) {
				var i, l, n, a, j;
				if (node.nodeType) {
					var o = {};
					switch (node.nodeType) {
						case 1:
							//element node;
							o = {
								nodeName: node.nodeName
							}; //record nodename
							for (i = 0, l = node.attributes.length, n = node.attributes; i < l; i++) { //append attributes
								a = traverse(n.item(i));
								for (j in a) {
									if (a.hasOwnProperty(j)) {
										o[j] = a[j];
									}
								}
							}
							if (node.childNodes.length) {
								o.childNodes = [];
								for (i = 0, l = node.childNodes.length, n = node.childNodes; i < l; i++) {
									a = traverse(n.item(i));
									if (a !== null) {
										o.childNodes.push(a);
									}
								}
								if (o.childNodes.length === 0) {
									delete o.childNodes;
								}
							}
							break;
						case 2:
							//attribute node
							o[node.nodeName] = node.nodeValue; //return an attribute object
							break;
						case 3:
							//text node
							//strip empty nodes
							if (node.nodeValue.match(/[^\s]/) && (strip === true)) {
								o = node.nodeValue;
							} else {
								o = null;
							}
							if (strip !== true) {
								o = node.nodeValue;
							}
							break;
						case 4:
							//cdata section node
							o = node.nodeValue;
							break;
						case 9:
							//document node;
							o = traverse(node.firstChild);
							break;
						case 10:
							o = traverse(node.nextSibling);
							break;
					}
				}
				return o;
			};
			return traverse(xml);
		}

		return {

			/**
			 * Load an object from a XML file
			 * @param src
			 * @param callback(data)
			 */
			loadXML: function(src, callback) {
				var XHR;
				if (window.XMLHttpRequest) {
					XHR = new XMLHttpRequest();
				} else {
					XHR = new ActiveXObject("Microsoft.XMLHTTP");
				}

				XHR.onreadystatechange = function(event) {
					if (event.target.readyState === 4) {
						var xml;
						if (event.target.responseXML) {
							xml = event.target.responseXML;
						} else {
							var parser = new DOMParser();
							xml = parser.parseFromString(event.target.responseText, "text/xml");
						}
						callback(_xmlToObject(xml, true));
					}
				}.bind(this);
				XHR.open("GET", src, true);
				XHR.send(null);
			},

			/**
			 * Load an object from a JSON file
			 * @param src
			 * @param callback
			 */
			loadJSON: function(src, callback) {
				var XHR;
				if (window.XMLHttpRequest) {
					XHR = new XMLHttpRequest();
				} else {
					XHR = new ActiveXObject("Microsoft.XMLHTTP");
				}

				XHR.onreadystatechange = function(event) {
					if (event.target.readyState === 4) {
						callback(JSON.parse(event.target.responseText));
					}
				}.bind(this);
				XHR.open("GET", src, true);
				XHR.send(null);
			}
		};
	});