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
	$('.unit-fill-screen').each(function(i) // Loop all fill Screens
	{
		var parentFillDiv = $(this);
		window.fillBodyHeight = 0;
		$(this).find('.container').each(function(i) // Loop all fill Screens
		{
			fillPadding = parseInt($(this).css('padding-top'), 10)*2
			
			if(parentFillDiv.hasClass('unit-group')) // unit Groups
			{
				fillBodyHeight = fillPadding + $(this).outerHeight()+50; // Set unit body height
			}
			else
			{
				fillBodyHeight = fillBodyHeight + fillPadding + $(this).outerHeight()+50; // Set unit body height
			}
		});
		$(this).css('height', (getFillHeight()) + 'px'); // Set Fill height
	});
}

// Get Fill Height
function getFillHeight()
{
	var H = $(window).height(); // Window height
	
	if(H < fillBodyHeight) // If window height is less than content height
	{
		H = fillBodyHeight+100;
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

// Initial tooltips
$(function()
{
  $('[data-toggle="tooltip"]').tooltip()
})


// Animate when visible
function animateWhenVisible()
{
	hideAll(); // Hide all animation elements
	inViewCheck(); // Initail check on page load
	
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

// Hide all animation elements
function stickyNavToggle()
{
	var V = 0; // offset Value
	var C = "sticky"; // Classes
	
	if($('.sticky-nav').hasClass('fill-unit-top-edge')) // If nav is in unit animate in
	{
		V = $('.sticky-nav').height();
		C = "sticky animated fadeInDown";
	}
	
	if($(window).scrollTop() > V)
	{  
		$('.sticky-nav').addClass(C);
	}
	else
	{
		$('.sticky-nav').removeClass(C);
		$('.page-container').removeAttr('style');
	}	
}

// Hide all animation elements
function hideAll()
{
	$('.animated').each(function(i)
	{	
		if(!$(this).closest('.unit').length) // Dont hide unit object
		{
			$(this).removeClass('animated').addClass('hideMe');
		}
	});
}

// Check if object is inView
function inViewCheck()
{	
	$($(".hideMe").get().reverse()).each(function(i)
	{	
		var target = jQuery(this);
		var a = target.offset().top + target.height();
		var b = $(window).scrollTop() + $(window).height();
		
		if(target.height() > $(window).height()) // If object height is greater than window height
		{
			a = target.offset().top;
		}
		
		if (a < b) 
		{	
			var objectClass = target.attr('class').replace('hideMe' , 'animated');
			target.css('visibility','hidden').removeAttr('class');
			setTimeout(function(){target.attr('class',objectClass).css('visibility','visible');},0.01);				
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

// Light box support
function setUpLightBox()
{
	window.targetLightbox();
	
	$(document).on('click', '[data-lightbox]', function(e) // Create Lightbox Modal
	{
		e.preventDefault();
		targetLightbox = $(this);
		var captionData ='<p class="lightbox-caption">'+$(this).attr('data-caption')+'</p>';
		if(!$(this).attr('data-caption')) // No caption caption data
		{
			captionData = '';
		}
		
		var customModal = $('<div id="lightbox-modal" class="modal fade"><div class="modal-dialog"><div class="modal-content '+$(this).attr('data-frame')+'"><button type="button" class="close close-lightbox" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><div class="modal-body"><a href="#" class="prev-lightbox" aria-label="prev"></a><a href="#" class="next-lightbox" aria-label="next"></a><img id="lightbox-image" class="img-responsive" src="'+$(this).attr('data-lightbox')+'">'+captionData+'</div></div></div></div>');
		$('body').append(customModal);
		$('#lightbox-modal').modal('show');
		
		// Handle navigation buttons (next - prev)
		if($('a[data-lightbox]').index(targetLightbox) === 0)
		{
			$('.prev-lightbox').hide();
		}
		if($('a[data-lightbox]').index(targetLightbox) === $('a[data-lightbox]').length-1)
		{
			$('.next-lightbox').hide();
		}
	}
	).on('hidden.bs.modal', '#lightbox-modal', function () // Handle destroy modal 
	{
		$('#lightbox-modal').remove();
	})
	
	$(document).on('click', '.next-lightbox, .prev-lightbox', function(e) 
	{
		e.preventDefault();
		var idx = $('a[data-lightbox]').index(targetLightbox);
		var next = $('a[data-lightbox]').eq(idx+1) // Next
		
		if($(this).hasClass('prev-lightbox'))
		{
			next = $('a[data-lightbox]').eq(idx-1) // Prev
		}
		$('#lightbox-image').attr('src',next.attr('data-lightbox'));
		$('.lightbox-caption').html(next.attr('data-caption'));
		targetLightbox = next;	
		
		// Handle navigation buttons (next - prev)
		$('.next-lightbox, .prev-lightbox').hide();
		if($('a[data-lightbox]').index(next) > 0)
		{
			$('.prev-lightbox').show();
		}
	});
}
