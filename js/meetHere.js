// Modal
$(".modal").each( function(){
	$(this).wrap('<div class="overlay"></div>')
});

$('#open-modal, #open-modal-1').on('touchend || click', function(e){
	e.preventDefault();
	e.stopImmediatePropagation();

	var $this = $(this),
			modal = $($this).data('modal');

	$(modal).parents('.overlay').addClass('open');
	setTimeout( function(){
		$(modal).addClass('open');
	}, 350);

	$(document).on('touchend || click', function(e){
		var target = $(e.target);

		if ($(target).hasClass('overlay')){
			$(target).find('.modal').each( function(){
				$(this).removeClass('open');
			});
			setTimeout( function(){
				$(target).removeClass('open');
			}, 350);
		}

	});

});

var loginStatus;

$('.close-modal').on('touchend || click', function(e){
	e.preventDefault();
	e.stopImmediatePropagation();

	var $this = $(this),
			modal = $($this).data('modal');

	// login
	$.post('https://guarded-peak-98230.herokuapp.com/signin', {
		username: $('#login-username').val(),
		password: $('#login-password').val()
	}, function(data) {
		loginStatus = data.error;
		if (loginStatus == 0) {
			$(modal).removeClass('open');
			setTimeout( function(){
				$(modal).parents('.overlay').removeClass('open');
			}, 350);
			window.location.href = './map';
		} else {
			if (loginStatus == 1) {
				$('#login-status').text('Wrong password').addClass('fade-out-opacity');
				setTimeout(function() {
					$('#login-status').removeClass('fade-out-opacity');
				}, 2000);
			} else if (loginStatus == 2) {
				$('#login-status').text('User not found').addClass('fade-out-opacity');
				setTimeout(function() {
					$('#login-status').removeClass('fade-out-opacity');
				}, 2000);
			} else {
				$('#login-status').text('Incorrect Parameters').addClass('fade-out-opacity');
				setTimeout(function() {
					$('#login-status').removeClass('fade-out-opacity');
				}, 2000);
			}
			$('#login-username').val('').val('');
			$('#login-password').val('').val('');
			$('#login-note-button').addClass('disabled').css('cursor', 'default');
		}
	}, "json"
	);
});

$(document).keyup(function(e) {
	if (e.which == 13 && $('#modal1').hasClass('open'))
		$('.close-modal').click();
	if ($('#login-username').val() != "" && $('#login-password').val() != "")
		$('#login-note-button').removeClass('disabled').css('cursor', 'pointer');
	else
		$('#login-note-button').addClass('disabled').css('cursor', 'default');
});

// Validation
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
