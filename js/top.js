$(function () {
  // 动画初始化代码
  $('[data-anim="elem"]').each(function () {
    $(this).addClass('is-anim');
  });
});
/*==========================================================================
/  変数
/==========================================================================*/
var $doc = $(document),
  $win = $(window),
  $body = $('body');

//背景動画
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
  var bg_movieId = $('#yt_player').attr('data-movie');

  this.player = new YT.Player('yt_player', {
    videoId: bg_movieId,
    playerVars: {
      autoplay: 1,
      enablejsapi: 1,
      controls: 0,
      modestbranding: 1,
      loop: 1,
      playsinline: 1,
      wmode: 'transparent',
      origin: location.protocol + '//' + location.hostname + '/'
    },
    events: {
      'onReady': this.onPlayerReady,
      'onStateChange': this.onPlayerStateChange
    }
  });

}

function onPlayerReady(event) {
  event.target.mute();
  event.target.seekTo(0);
  event.target.playVideo();
}
var done = false;

function onPlayerStateChange(event) {
  var ytStatus = event.target.getPlayerState();
  if (ytStatus == YT.PlayerState.ENDED) {
    event.target.mute();
    event.target.playVideo();
  }
}
$(document).ready(function () {
  var nswiper = ".news_list_slider";
  var fswiper = ".field_slider";
  var swipern = new Swiper(nswiper, {
    loop: false,
    centeredSlides: false,
    slidesPerView: 1.5,
    spaceBetween: 15,
    /*scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },*/
    speed: 400,
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
      draggable: true,
      snapOnRelease: false,
      dragSize: 30
    },
    breakpoints: {
      769: {
        loop: false,
        centeredSlides: false,
        slidesPerView: 4.2,
        spaceBetween: 30,
      }
    },
  });

  var swiperf = new Swiper(fswiper, {
    loop: true,
    autoplay: true,
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 0,
    effect: 'fade',
    speed: 1000,
  });

  fvsize();
  $win.on('resize', function () {
    fvsize();
  });

  function fvsize() {
    var wwidth = window.innerWidth;
    var wheight = window.innerHeight;
    var aspect16x9 = wwidth * 0.5625 + 65;
    var fv = $('#firstView');
    fv.removeClass('mv_l mv_m');
    if (wheight < aspect16x9) {
      fv.addClass('mv_l');
    } else {
      fv.addClass('mv_m');
    }
  }

  $win.on('load scroll', function () {
    var pos = $win.scrollTop();
    var offset = {
      pageHeader: 100
    };

    // ページタイトル
    var pageTtl = ! function () {
      if (offset['pageHeader'] < pos) {
        // $('header .logo').addClass('is-hide');
        $body.addClass('is-overlay');
      } else {
        // $('header .logo').removeClass('is-hide');
        $body.removeClass('is-overlay');
      }
    }();
  });

});
