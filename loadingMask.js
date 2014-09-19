/* MASK FUNCTION  */
(function($) {
		// Take an element and show thats its loading something
		// and places a div over the top of the content to prevent interaction.
		$.fn.loadingMask = function(options) {
			var defaults = {
				image : 'images/loading-dots.gif',
				//image: '',
				bgcolor : '#F3F3F3',
				opacity : 98,
				func : null,
				text : 'Processing...'
			};
			options = $.extend(defaults, options);
			options.opacity = options.opacity ? '0.'+options.opacity.toString() : 0.85;
			options.bgcolor = options.bgcolor ? options.bgcolor : '#F3F3F3';


			return this.each( function() {
				
				// The element that will be loading
				var $parent = $(this),
				
				// The div that make the item above appear to be loading
				$mask = $('#loading_' + $parent.data('loading-id') );
				
                // locate the active Cloak
		        this.mask = jQuery(document).find('.mask').get();
        
                // if it exists.. hide it!
                if(this.mask) {
                    jQuery('body').find('.mask').hide();
                }

                
				// The loading div exists & is visible
				// Hide it
				if ( $mask.length && $mask.is(':visible') ) {

					// remove class from parent
					$parent.removeClass('mask-parent');
					
					// Hide the mask
					$mask.hide();

				// The loading div's not been created yet	
				// Create the markup, insert into dom, position, then show	
				} else if ( !( $mask.length ) ) {
					
					// A random ID
					// We use this to asscocoiate the parent with its loading div
					var id =  Math.floor( Math.random() * 10000 ),
					
					// The HTML to insert
					mask_template = '<div class="mask" id="loading_' + id + '"><p>'  + 
                        ( options.image ? '<img src="' + options.image+'" />' : '') + 
                        ( options.text ? '<span>' + options.text + '</span>' : '') + 
                        '</p></div>';
					
					// Add a data attribute to the parent & fade the content that is loading out
					// this matches this parent to the id of the loading div
					$parent.addClass('mask-parent').attr('data-loading-id', id );
					
					// Add the loading div, give it an id & position it over the parent.
					$parent.prepend(mask_template);
					
                    $('#loading_' + id).css({
                        'opacity' : options.opacity,
                        'background-color' : options.bgcolor
                    }).show();						
								
				
				// The loading div exists but is hidden.
				// Position it then show	
				} else {
					
					// Fade the content that is loading out
					$parent.addClass('mask-parent');

					// Add the loading div, give it an id & position it over the parent.
					$mask.show();
					
					
				}

                if(options.func) { options.func();}

			});			
		},
    $.fn.hideMask = function () {
        // locate the active Cloak
        this.mask = jQuery('body').find('.mask').get();
           
        // if it exists.. hide it!
        if(this.mask) {
            jQuery('body').find('.mask').hide();
        }

  	}
})(jQuery);