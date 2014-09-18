;(function ( $, window, document, undefined ) {
		// Defaults
		var pluginName = "loadingMask",
				defaults = {
					useImage: false,
					loadingImage: "../images/loader-dots.gif",
					loadingClass: "loading-bar-spinner"
			};
			var loadingBarTimeout,
		        loadingBarStatus = 0,
		        loadingBarStartSize = 0.0;
		
		    

		// Constructor
		function Plugin ( element, options ) {
				target = '#'+element.data('mask-target'),
				this.element = element;
				this.$mask = null;
				this.options = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		// Prototype
		Plugin.prototype = {
				init: function () {
					//this.addLoader();
					//if (this.options.showOnInit) {
					//	this.show();
					//} else {
					//	this.hide();
					//}
				},
				addLoader: function () {
					var $mask = this.createLoader();
					this.$mask = $mask;
					$(target).append($mask);
					startLoadingBar();                    
				},
				createLoader: function() {
					var id = Math.floor(Math.random() * 10000), // random ID, we use this to asscocoiate the parent with its loading div
						$mask = '<div class="mask-parent" id="loading_' + id + '"></div>';
						$bar = '<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>';
						$spinner = this.options.useImage ? $('<img src="' + this.options.loadingImage + '" />') : $('<div id="' + this.options.loadingClass + '"><div class="spinner-icon"></div></div>');
					
					this.target.attr('data-loading-id', id); // add ID to the target element - used in CSS to apply position:relative for proper placement of mask below
					$mask.prepend($bar); // make the bar the first child of the mask
					$mask.append($spinner); // make the spinner the last child. Spinner HTML changes based on useImage option value!
					return $mask;                    
				},
				loadingBarWidth: function(){
					var loadingBarPct = (n) + '%';
			        $('#loading-bar .bar').css('width', loadingBarPct);
			        loadingBarStatus = n;
			        clearTimeout(loadingBarTimeout);
			        loadingBarTimeout = setTimeout(function() {
			            _incLoadingBar();
			        }, 250);
				},
				loadingBarIncrement: function(){
					if (_loadingBarStatus() >= 100) {
			            loadingCompleted();
			            return;
			        }
			        var rnd = 0,
			            stat = _loadingBarStatus();
			        if (stat >= 0 && stat < 30) {
			            // Start out between 10% increments
			            rnd = 10;
			        } else if (stat >= 30 && stat < 50) {
			            // increment 5%
			            rnd = 5;
			        } else if (stat >= 5 && stat < 75) {
			            // increment 2.5%
			            rnd = 2.5;
			        } else if (stat >= 75 && stat < 90) {
			            // increment 1.5%
			            rnd = 1.5;
			        } else if (stat >= 90 && stat < 100) {
			            // finally, increment by .5 %
			            rnd = 0.5;
			        } else {
			            // after 100%, don't increment:
			            rnd = 0;
			        }
			        var loadingBarPct = _loadingBarStatus() + rnd;
			        loadingBarWidth(loadingBarPct);
			
			        $('#f').html('Percent: ' + loadingBarPct + '%');
				},
				loadingBarStatus: function(){
					return loadingBarStatus;			        
				},
				
				show: function() {
					return this.each(function() {
	                    // The div that make the item above appear to be loading
	                    var $mask = $('#loading_' + this.target.data('loading-id'));
		                // locate the active Cloak
		                this.mask = $(document).find('.mask').get();
		                // if it exists.. hide it!
		                if (this.mask) {
		                    $('body').find('.mask').hide();
		                }
		                // The loading div exists & is visible
		                // Hide it
		                if ($mask.length && $mask.is(':visible')) {
		                    // remove class from parent
		                    $parent.removeClass('mask-parent');
		                    // Hide the mask
		                    $mask.hide();
		                    // The loading div's not been created yet	
		                    // Create the markup, insert into dom, position, then show	
		                }
		                else if (!($mask.length)) {
		                    // A random ID
		                    // We use this to asscocoiate the parent with its loading div
							this.addLoader();		                    
							// Add a data attribute to the parent & fade the content that is loading out
		                    // this matches this parent to the id of the loading div
		                }
		                else {
		                    // Fade the content that is loading out
		                    $parent.addClass('mask-parent');
		                    // Add the loading div, give it an id & position it over the parent.
		                    $mask.show();
		                    startLoadingBar();
		                }
		                if (options.func) {
		                    options.func();
		                }
		            });

				},
				hide: function() {
					this.mask = $('body').find('.mask').get();
		            // if it exists.. hide it!
		            if (this.mask) {
		                loadingCompleted();
		                completeTimeout = setTimeout(function() {
		                    $('body').find('.mask').hide();
		                }, 300);
		            }
		            
				}
		};

		// A really lightweight plugin mask around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, pluginName ) ) {
								$.data( this, pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );