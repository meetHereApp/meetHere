// Modal
$(".modal").each( function(){
	$(this).wrap('<div class="overlay"></div>')
});

$("#open-modal, #open-modal-1").on('touchend || click', function(e){
	e.preventDefault();
	e.stopImmediatePropagation();

	var $this = $(this),
			modal = $($this).data("modal");

	$(modal).parents(".overlay").addClass("open");
	setTimeout( function(){
		$(modal).addClass("open");
	}, 350);

	$(document).on('touchend || click', function(e){
		var target = $(e.target);

		if ($(target).hasClass("overlay")){
			$(target).find(".modal").each( function(){
				$(this).removeClass("open");
			});
			setTimeout( function(){
				$(target).removeClass("open");
			}, 350);
		}

	});

});

$(".close-modal").on('touchend || click', function(e){
	e.preventDefault();
	e.stopImmediatePropagation();

	var $this = $(this),
			modal = $($this).data("modal");

	$(modal).removeClass("open");
	setTimeout( function(){
		$(modal).parents(".overlay").removeClass("open");
	}, 350);

});

var validateEmail = function(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

var validateName = function(name) {
	return /^[a-zA-Z]+$/.test(name);
}

var validateUserName = function(name) {
	return /^[a-zA-Z0-9.-]+$/.test(name);
}

var validatePhone = function(phone) {
	return /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test(phone);
}