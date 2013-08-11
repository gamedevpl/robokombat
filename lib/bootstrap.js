/**
 * Bootstrap loading script
 */

(function(global, basePath) {
	var loadedModules = {};

	function define(moduleName, fn) {
		loadedModules[moduleName] = fn;
	}

	function require(modules, fn) {
		ready(function() {
			var queue = modules.map(function(module) {
				var result = new Deferred();

				var moduleName = module;
				var src = module

				if (module.indexOf(':') > 0) {
					moduleName = module.split(':')[0];
					src = module.split(':')[1];
				}

				if (loadedModules[moduleName])
					result.resolve(loadedModules[moduleName]);
				else
					loadScript(src, function() {
						result.resolve(loadedModules[moduleName]);
					});

				return result;
			});

			var loaded = 0;
			queue.forEach(function(result) {
				result.then(function() {
					if (++loaded >= queue.length && fn)
						fn.apply(null, queue.map(function(result) {
							return result.result[0]
						}));
				});
			});
		})
	}

	if (typeof loadScript == "undefined")
		function loadScript(url, callback) {
			var script = document.createElement('script')
			script.onload = callback;
			script.type = "text/javascript";
			script.src = basePath + url;
			document.body.appendChild(script);
		}

	loadScript("lib/deferred.js", function() {
		ready = function(fn) {
			fn();
		}

		readyListeners.some(function(fn) {
			fn()
		});
	})

	var readyListeners = [];
	function ready(fn) {
		readyListeners.push(fn);
	}

	global["define"] = define;
	global["require"] = require;
	global["ready"] = ready;
})(this, this["basePath"] || '');