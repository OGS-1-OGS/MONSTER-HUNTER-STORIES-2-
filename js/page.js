$(document).ready(function() {
  var weaponList = ! function() {
    var flswiper = ".full_slider";
    var handle = '.weapon_type li';
    var system01NavHandle = '.system01_nav li';
    var system02NavHandle = '.system02_nav li';
    var system04NavHandle = '.system04_nav li';
    var system05NavHandle = '.system05_nav li';
    var fieldNavHandle = '.field_nav li';
    var selected = 'selected';
    var active = 'active';

    swiperStart(flswiper);

    $(document).on('click', handle, function() {
      $(handle).children('a').removeClass(selected);
      $(this).children('a').addClass(selected);
      var i = $(this).index();
      $('.colBox').removeClass(active);
      $('.colBox').eq(i).addClass(active);
      swiperStart(flswiper);
    });

    $(document).on('click', system01NavHandle, function() {
      $(system01NavHandle).children('a').removeClass(selected);
      $(this).children('a').addClass(selected);
      var i = $(this).index();
      $('.system01_tab').removeClass(active);
      $('.system01_tab').eq(i).addClass(active);
    });

    $(document).on('click', system02NavHandle, function() {
      $(system02NavHandle).children('a').removeClass(selected);
      $(this).children('a').addClass(selected);
      var i = $(this).index();
      $('.system02_tab').removeClass(active);
      $('.system02_tab').eq(i).addClass(active);
    });

    $(document).on('click', system04NavHandle, function() {
      $(system04NavHandle).children('a').removeClass(selected);
      $(this).children('a').addClass(selected);
      var i = $(this).index();
      $('.system04_tab').removeClass(active);
      $('.system04_tab').eq(i).addClass(active);
    });

    $(document).on('click', system05NavHandle, function() {
      $(system05NavHandle).children('a').removeClass(selected);
      $(this).children('a').addClass(selected);
      var i = $(this).index();
      $('.system05_tab').removeClass(active);
      $('.system05_tab').eq(i).addClass(active);
    });
    $(document).on('click', fieldNavHandle, function() {
				$(fieldNavHandle).children('a').removeClass(selected);
				$(this).children('a').addClass(selected);
				var i = $(this).index();
				$('.field_list').removeClass(active);
				$('.field_list').eq(i).addClass(active);
				swiperStart(flswiper);
		});
  }();

  function swiperStart(sid) {
    var swiperfl = new Swiper(sid, {
      loop: false,
      autoplay: {
        disableOnInteraction: false,
      },
      watchOverflow: true,
      centeredSlides: true,
      slidesPerView: 1,
      spaceBetween: 0,
      effect: 'fade',
      speed: 1000,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

});
