(function manageAnims() {
	'use strict';

	var anims = document.querySelectorAll('.js-anim');
	var buffer = false;
	var animsRun = 0;

	var checkAnims = (function() {
		var height = window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;

		for (var i = 0; i < anims.length; i++) {
			var node = anims[i];
			var rect = node.getBoundingClientRect();
			var hasRun = anims[i].style.animationPlayState === 'running';
			var isInView = rect.bottom < height && rect.top > 0;
			if (!hasRun && isInView) {
				node.style.animationPlayState = 'running';
				animsRun++;
			}
		}

		if (animsRun === anims.length) window.removeEventListener('scroll', requestBuffer);

		buffer = false;
	});

	var requestBuffer = (function() {
		if (!buffer) requestAnimationFrame(checkAnims);
		buffer = true;
	});

	window.addEventListener('scroll', requestBuffer);

})();
