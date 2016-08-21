$(document).ready(function(){
	theme = localStorage.getItem('theme');
	$('body').removeClass().addClass(theme);
});

function changeTheme() {
	$("body").toggleClass('night');
	if ( $("body").hasClass('night') ) {
		localStorage.setItem('theme', 'night');
	} else {
		localStorage.setItem('theme', 'day');
	}
};

function showPopup(id) {
	$('#'+id).removeClass('hidden');
	$('#fade').removeClass('hidden');
};

function closePopup(id) {
	$('#'+id).addClass('hidden');
	$('#fade').addClass('hidden');
}

/* Close popups on ESC press */
$(document).keyup(function(e){
	if(e.keyCode === 27) {
		console.log("ESC pressed!")
		$(".white_content").not(".hidden").addClass("hidden");
		$("#fade").addClass("hidden");
	}
});