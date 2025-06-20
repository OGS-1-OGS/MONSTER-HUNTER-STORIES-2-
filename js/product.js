$(document).ready(function () {
	var weaponList = !function(){
		var handle = '.platform_select .colbox a';
		var selected = 'selected';
		var active = 'active';
		var trialBnr = '.product_area .trial_bnr';

		$(document).on('click', handle, function() {
				$(handle).removeClass(selected);
				$(this).addClass(selected);
				var i = $(this).index();
				$('.product').removeClass(active);
				$('.product').eq(i).addClass(active);

				// Switch、Steamの場合は体験版バナーの表示
				$(trialBnr).removeClass(active);
				$(trialBnr).removeClass('nsw');
				$(trialBnr).removeClass('steam');
				if(i == 0 || i == 2){
					$(trialBnr).addClass(active);
					if(i == 0 ) {
						$(trialBnr).addClass('nsw');
					} else {
						$(trialBnr).addClass('steam');
					}
				}
		});
	}();
});
