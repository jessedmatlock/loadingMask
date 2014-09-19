Plugin Logic:

// Clicking a link with a specified data('mask-target') will apply an overlay to that target, and provide feedback via a loading bar and 'spinner' image.
// If not spinner image is provided, then we will load a default icon using HTML / CSS
// IF NO data('mask-target') is specified, then apply the mask to the body element
// 
// Would like to be able to call the plugin using a link, with defined data('mask-target') 
// OR
// directly applying the mask to the element via: $(element_id).loadingMask('show'); and  $(element_id).loadingMask('hide');
// Usage examples:
//
// LINK: clicking any link with class="load-mask" will init the click function below, loading the mask for a 5 second timeout.. then hiding it and redirecting to the orig. HREF
//
// <a href="http://google.com" data-mask-target="#element" class="load-mask">Show the Mask</a>
//
// $('.load-mask').on('click',function () {
//	var href = $(this).attr('href'),
//		target = $(this).data('mask-target');
//	
//		$(target).loadingMask('show');
//    		setTimeout(function(){
//      		$(target).loadingMask('hide');
//          	window.location.href = href;
//      	}, 5000);
//		});  
//		return false;
// });

// OR programmatically, calling the loadingMask() on a specified element

// $("#target-id").loadingMask('show');
// $("#target-id").loadingMask('hide');



Name: loadingMask
Options:
	useImage: true // false // if true, use the image src provided next, else show the default spinner below assigned to $spinner
	loadingImage: "../images/loader-dots.gif", // the image src used IF useImage is set to TRUE
	loadingBar: '#loading-bar .bar', // var for loading bar element
	spinnerClass: "loading-bar-spinner", // class for default spinner - used when useImage is FALSE
	
	
	
createMask: // create the DOM structure needed to display the mask

	var id = Math.floor(Math.random() * 10000), // random ID, we use this to asscocoiate the parent with its loading div
		$wrapper = '<div class="mask" data-loading-id="' + id + '" id="loading_' + id + '"></div>';
		$bar = '<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>';
		$spinner = this.options.useImage ? $('<img class="loading-spinner" src="' + this.options.loadingImage + '" />') : $('<div id="' + this.options.spinnerClass + '"><div class="spinner-icon"></div></div>');
	
	this.target.addClass('mask-parent'); // add Class to the target element - used in CSS to apply position:relative for proper placement of mask below
	$wrapper.prepend($bar); // make the bar the first child of the wrapper
	$wrapper.append($spinner); // make the spinner the last child. Spinner HTML changes based on useImage option value!
	return $wrapper;                    
	
loadingBar:
	var loadingBarTimeout,
	    loadingBarStatus = 0,
	    loadingBarStartSize = 0;

	loadingBarWidth: function(){
		var loadingBarPct = (n) + '%';
		
        $(loadingBar).css('width', loadingBarPct);
        loadingBarStatus = n;

        clearTimeout(loadingBarTimeout);
        loadingBarTimeout = setTimeout(function() {
            _incLoadingBar();
        }, 250);
	},
	loadingBarIncrement: function(){
		// if the Bar Status is at 100, then it's done.. stop returning
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
		// change the bars width based on the results above 
        loadingBarWidth(loadingBarPct);
		
		// this is just for debug/testing purposes - load loadingBarPct into div#f
        $('#f').html('Percent: ' + loadingBarPct + '%');
	},
	loadingBarStatus: function(){
		return loadingBarStatus;			        
	}
	
	
Show:
	// IF any masks are :visible, hide them 
	// SHOW mask based on target or element selected
	

Hide:
	// Hiding the mask is a 2 step function:
	// 1) increment the loading bar to 100%, CSS will animate it smoothly, appearing to complete the loading feedbkack
	// 2) Hide the mask (and loading bar/spinner)

	