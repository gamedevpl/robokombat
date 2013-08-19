require(['BaseClass:lib/gamedev-lib/lib/baseclass.js',
		'Deferred:lib/gamedev-lib/lib/deferred.js'], function(BaseClass, Deferred) {
			define('Assets', function() {
				var Assets = BaseClass.extend(function Assets(basePath) {
					this.basePath = basePath;
				}, {
					loadImages : function loadImages(list) {
						var result = new Deferred();
						
						var loaded = 0;
						
						list.map(function(url) {
							return this.loadImage(url);
						}, this).some(function(deferred, idx) {
							deferred.then(function(img) {
								list[idx] = img;
								if(++loaded >= list.length)
									result.resolve(list);
							});
						});
						return result;
					},

					loadImage : function loadImage(url) {
						var result = new Deferred();

						var img = new Image();

						img.onload = function() {
							result.resolve(this);
						}

						img.onerror = function() {
							result.reject();
						}

						img.src = this.basePath + url;

						return result;
					}
				});

				return Assets;
			});
		});