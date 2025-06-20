$(function () {
  // Remove initial animation and only use scroll detection
  // Scroll monitoring
  $(window).on('scroll', function () {
    $('[data-anim="elem"], [data-anim="image"], [data-anim="text"]').each(function () {
      var $this = $(this);
      var position = $this.offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();

      if (scroll + windowHeight > position) {
        $this.addClass('is-anim');
      }
    });
  });
});
(function ($) {
  /*==========================================================================
  /  グローバル変数
  /==========================================================================*/
  window.click = 'click';
  window.active = 'is-active';
  window.toTop = '*[data-handle="toTop"]';
  window.btnBuy = '*[data-handle="btnBuy"]';
  window.slideMove = true;
  window.playerState = false;
  window.sessionStorageTopAccess = sessionStorage.getItem('topAccess');
  window.ageGatePass = '';
  window.ageGatePassCookie = Cookies.get(ageGatePass);
  window.cookieExp = 365;
  window.mql = matchMedia('(min-width: 1024px)');

  /*==========================================================================
  /  変数
  /==========================================================================*/
  // DOM
  var $doc = $(document),
    $win = $(window),
    $body = $('body');
  // 言語選択
  var elem = '*[data-elem="langSelect"]',
    select = '' + elem + ' select';

  /*==========================================================================
  /  処理
  /==========================================================================*/
  $(function () {
    init();
  });

  $win.on('load', function () {
    // スムーススクロール
    var smoothScroll = ! function () {
      $.easing.quart = function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
      };
      $doc.on(click, 'a.smooth-scroll[href^="#"]', function () {
        var href = $(this).attr('href'),
          target = $(href == "#" || href == "" ? 'html' : href),
          position = target.offset().top - 165;
        $('html, body').animate({
          scrollTop: position
        }, 250);
        return false;
      });
      $doc.on(click, 'a.product-scroll[href^="#"]', function () {
        var href = $(this).attr('href'),
          target = $(href == "#" || href == "" ? 'html' : href),
          navH = $('.product-nav').outerHeight(),
          position = target.offset().top;
        $('html, body').animate({
          scrollTop: position
        }, 250);
        return false;
      });
      $doc.on(click, 'a.dlc-scroll[href^="#"]', function () {
        var href = $(this).attr('href'),
          target = $(href == "#" || href == "" ? 'html' : href),
          position = target.offset().top - 90;
        $('html, body').animate({
          scrollTop: position
        }, 250);
        return false;
      });
      $doc.on(click, toTop, function () {
        $('html, body').animate({
          scrollTop: 0
        }, 250);
        return false;
      });
    }();
  });

  /*PageTop*/
  $win.on('load scroll', function () {
    var pos = $win.scrollTop();
    var offset = {
      pageHeader: 300,
      pagefirstView: 100,
      firstView: 600
    };
    // ページトップ
    var pageTtl = ! function () {
      if (offset['pageHeader'] < pos) {
        $(toTop).addClass('active');
      } else {
        $(toTop).removeClass('active');
      }
    }();

    // 購入ボタン
    var pageBuy = ! function () {
      if ($('body').hasClass('index')) {
        if (offset['firstView'] < pos) {
          $(btnBuy).addClass('active');
        } else {
          $(btnBuy).removeClass('active');
        }
      } else {
        if (offset['pagefirstView'] < pos) {
          $(btnBuy).addClass('active');
        } else {
          $(btnBuy).removeClass('active');
        }
      }
    }();

    sh = $doc.height();
    sp = $win.height() + $win.scrollTop();
    fh = $("footer").innerHeight();
    if (sh - sp <= fh) {
      $(toTop).css({
        "bottom": fh + 10
      });
    } else {
      $(toTop).css({
        "bottom": "20px"
      });
    }
    scrollfunc();
  });


  function init() {
    // カスタムセレクト
    $(select).SumoSelect();
    var lang = $('html').attr('lang');
    var label = $('' + select + ' option.' + lang + '').html(),
      target = $('' + elem + ' .opt:contains("' + label + '")');
    $('' + elem + ' .CaptionCont span').html(label);
    $('' + select + ' option').attr('selected', false);
    $('' + select + ' option.' + lang + '').attr('selected', true);
    $('' + elem + ' .opt').removeClass('selected');
    $(target).addClass('selected');
    // 言語間リンク
    $doc.on('change', select, function () {
      var lang = $(this).val(),
        url = location.href;
      if (lang != 'blank') {
        Cookies.set(selectLang, lang, {
          expires: cookieExp,
          samesite: 'lax',
          path: '/'
        })
        window.location.href = '../' + lang + '/';
      }
    });

    var amiiboInline = ! function () {
      $('.modal-product-btn').magnificPopup({
        type: 'ajax',
        mainClass: 'product-modal',
        fixedContentPos: true
      });
    }();

    // Steam
    var steamSpec = ! function () {
      var handle = '*[data-handle="modalSpec"]';
      $doc.find(handle).magnificPopup({
        alignTop: false,
        type: 'ajax',
        mainClass: 'mfp-fade',
        fixedContentPos: true
      });
    }();

    // youtube magnificPopup
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    $('.modal_system').magnificPopup({
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 200,
      preloader: false,
      iframe: {
        markup: '<div class="mfp-iframe-scaler">' +
          '<div class="mfp-close"></div>' +
          '<iframe class="mfp-iframe" id="mfpIframe" frameborder="0" allowfullscreen></iframe>' +
          '</div>',
        patterns: {
          youtube: {
            index: 'youtube.com',
            id: 'v=',
            src: 'https://www.youtube.com/embed/%id%&enablejsapi=1'
          }
        }
      },
      callbacks: {
        open: function () {
          new YT.Player('mfpIframe', {
            events: {
              'onStateChange': onPlayerStateChange
            },
            playerVars: {
              start: 10
            }
          });
        }
      }
    });
    $('.modal').magnificPopup({
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 200,
      preloader: false,
      fixedContentPos: true,
      iframe: {
        markup: '<div class="mfp-iframe-scaler">' +
          '<div class="mfp-close"></div>' +
          '<iframe class="mfp-iframe" id="mfpIframe" frameborder="0" allowfullscreen></iframe>' +
          '</div>',
        patterns: {
          youtube: {
            index: 'youtube.com',
            id: 'v=',
            src: 'https://www.youtube.com/embed/%id%?enablejsapi=1'
          }
        }
      },
      callbacks: {
        open: function () {
          new YT.Player('mfpIframe', {
            events: {
              'onStateChange': onPlayerStateChange
            }
          });
        }
      }
    });
    $('.modal.direct').magnificPopup({
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 200,
      preloader: false,
      iframe: {
        markup: '<div class="mfp-iframe-scaler">' +
          '<div class="mfp-close"></div>' +
          '<iframe class="mfp-iframe" id="mfpIframe" frameborder="0" allowfullscreen></iframe>' +
          '</div>',
        patterns: {
          youtube: {
            index: 'youtube.com',
            id: 'v=',
            src: 'https://www.youtube.com/embed/%id%&enablejsapi=1'
          }
        }
      },
      callbacks: {
        open: function () {
          new YT.Player('mfpIframe', {
            events: {
              'onStateChange': onPlayerStateChange
            }
          });
        }
      }
    });

    function onPlayerStateChange(e) {
      if (e.data == YT.PlayerState.ENDED) {
        e.target.seekTo(0);
        e.target.stopVideo(0);
      }
    }

    // matchHeight
    $('.mhstLink ul li .txtBox').matchHeight();
    $('.bnrLink ul li .linkBox').matchHeight();

    var sp_menu = '.sp_menu a';
    var buy_btn = 'header nav .btn_buy';
    $doc.on('click', sp_menu, function () {
      if ($('.sp_menu').hasClass("open")) {
        $("html").removeClass("is-fixed");
        $doc.find("header").removeClass('open');
        $('.sp_menu').removeClass('open');
      } else {
        $("html").addClass("is-fixed");
        $doc.find("header").addClass('open');
        $('.sp_menu').addClass('open');
      }
    });

    $doc.on('click', buy_btn, function () {
      if ($('body').hasClass('index')) {
        if ($('.sp_menu').hasClass("open")) {
          $("html").removeClass("is-fixed");
          $doc.find("header").removeClass('open');
          $('.sp_menu').removeClass('open');
        }
      }
    });
  }

  $win.resize(function () {
    if (mql.matches) {
      $doc.find("header").removeClass('open');
      $('.sp_menu').removeClass('open');
    }
  });

  function scrollfunc() {
    var scrollAnime = ! function () {
      var animText = '*[data-anim="text"]',
        animImage = '*[data-anim="image"]',
        animElem = '*[data-anim="elem"]';
      $(animText).each(function () {
        var position = $win.scrollTop(),
          winH = $win.height(),
          thisOffset = $(this).offset().top,
          animPos = position + (winH / 1.05) > thisOffset;
        if (animPos) {
          $(this).addClass('is-anim');
        }
      });
      $(animImage).each(function () {
        var position = $win.scrollTop(),
          winH = $win.height(),
          thisOffset = $(this).offset().top,
          animPos = position + (winH / 1.05) > thisOffset;
        if (animPos) {
          $(this).addClass('is-anim');
        }
      });
      $(animElem).each(function () {
        var position = $win.scrollTop(),
          winH = $win.height(),
          thisOffset = $(this).offset().top,
          animPos = position + (winH / 1.05) > thisOffset;
        if (animPos) {
          $(this).addClass('is-anim');
        }
      });
    }();
  }
})(jQuery);
