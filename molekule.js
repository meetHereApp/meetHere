/** 
 **	/Molekule::this
 **	    |--molekule.js of the Molekule.mlk package for iOS and Android applications.
 **	    |--molekule.js is to be used by your app.js.
 **
 **	(c) A. H. for MeetHere, Hewlett-Packard, Medium, and PW
 **	Licensed OPEN-SOURCE under the MIT License ("the license"). Free for personal and non-profitable distributive use.
 **	Please refer to the license for more details. Lol this is such an old PoS.
 **
 **	Count: 204, finder.
 **/

/********************************************************/
/** NOTE: cut down substantially for meetHere b/c lazy **/
/********************************************************/

// Not all values may be described

// Page ready

$(document).ready(function()
{
	$('body').append('<div id="page-loading-units-notifaction"></div>'); // Add page loading UI
	$('.unit-fill-screen').css('height', $(window).height()*2+'px'); // Set initial unit height
	$('#scroll-atom').click(function(event){
		event.preventDefault();
		$('html,body').animate({scrollTop: $('#scroll-atom').closest('.unit').height()}, 'slow');
	});
    
    $(function () {
        $(window).scroll(function () {
            var top_offset = $(window).scrollTop();
            if (top_offset <= 0) {
                $('#prenav').removeClass('navbar-border');
            } else {
                $('#prenav').addClass('navbar-border');
            }
        })
    });
	
	setUpDropdownSubs(); // Set Up Dropdown Menu Support
	setUpLightBox(); // Add lightbox Support
});

// Loading page complete
$(window).load(function()
{
	setFillScreenunitHeight();
	animateWhenVisible();  // Activate animation when visible	
	$('#page-loading-units-notifaction').remove(); // Remove page loading UI
}
).resize(function() // Window resize 
{		
	setFillScreenunitHeight();	
}); 

// Set Fill Screen unit heights
function setFillScreenunitHeight()
{
	$('.unit-fill-screen').each(function() // Loop all fill Screens
	{
		var parentFillDiv = $(this);
		window.fillBodyHeight = 0;
		$(this).find('.container').each(function() // Loop all fill Screens
		{
			window.fillPadding = parseInt($(this).css('padding-top'), 10)*2
			
			if(parentFillDiv.hasClass('unit-group')) // unit Groups
			{
				window.fillBodyHeight = window.fillPadding + $(this).outerHeight()+50; // Set unit body height
			}
			else
			{
				window.fillBodyHeight = window.fillBodyHeight + window.fillPadding + $(this).outerHeight()+50; // Set unit body height
			}
		});
		$(this).css('height', (getFillHeight()) + 'px'); // Set Fill height
	});
}

// Get Fill Height
function getFillHeight()
{
	var H = $(window).height(); // Window height
	
	if(H < window.fillBodyHeight) // If window height is less than content height
	{
		H = window.fillBodyHeight+100;
	}
	return H
}

// Scroll to target
function scrollToTarget(D)
{
	if(D === 1) // Top of page
	{
		D = 0;
	}
	else if(D === 2) // Bottom of page
	{
		D = $(document).height();
	}
	else // Specific unit
	{
		D = $(D).offset().top;
		if($('.sticky-nav').length) // Sticky Nav in use
		{
			D = D-100;
		}
	}

	$('html,body').animate({scrollTop:D}, 'slow');
}

// Animate when visible
function animateWhenVisible()
{
	hideAll(); // Hide all animation elements
	inViewCheck(); // Initial check on page load
	
	$(window).scroll(function()
	{		
		inViewCheck(); // Check object visability on page scroll
		scrollToTopView(); // ScrollToTop button visability toggle
		stickyNavToggle(); // Sticky nav toggle
	});		
}

// Set Up Dropdown Menu Support
function setUpDropdownSubs()
{
	$('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event)
	{
		event.preventDefault(); 
		event.stopPropagation(); 
		$(this).parent().siblings().removeClass('open');
		$(this).parent().toggleClass('open');
		
		var targetMenu = $(this).parent().children('.dropdown-menu');
		var leftVal = targetMenu.offset().left+targetMenu.width();
		if(leftVal > $(window).width())
		{
			targetMenu.addClass('dropmenu-flow-right');
		}
	});
}

// ScrollToTop button toggle
function scrollToTopView()
{
	if($(window).scrollTop() > $(window).height()/3)
	{	
		if(!$('.scrollToTop').hasClass('showScrollTop'))
		{
			$('.scrollToTop').addClass('showScrollTop');
		}	
	}
	else
	{
		$('.scrollToTop').removeClass('showScrollTop');
	}
}
