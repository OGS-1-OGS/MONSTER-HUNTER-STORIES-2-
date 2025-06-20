/*==========================================================================
/ ヘッダー
/==========================================================================*/
function headerInc(dir) {
  var lang = $('body').data('lang');
  var headerHtml = 'assets/inc/header/header_' + lang + '.html';

  $.ajax({
    type: 'get',
    url: dir + headerHtml,
    dataType: 'html',
    success: function(data) {
      data = data.replace(/\{\$root\}/g, dir);
      $('.header_area').append(data);
      updateIcon();
    }
  });
}

/*==========================================================================
/ モンスターリスト
/==========================================================================*/
function monsterListInc() {
  var lang = $('body').data('lang');
  var monsterListHtml = 'assets/inc/monster/monster_list_' + lang + '.html';

  var dir = '../../'
  $.ajax({
    type: 'get',
    url: dir + monsterListHtml,
    dataType: 'html',
    success: function(data) {
      $('.monster_list').append(data);
      updateIcon();
    }
  });
}

/*==========================================================================
/ キャラクターリスト
/==========================================================================*/
function characterListInc() {
  var lang = $('body').data('lang');
  var characterListHtml = 'assets/inc/character/character_list_' + lang + '.html';
  var dir = '../../'
  $.ajax({
    type: 'get',
    url: dir + characterListHtml,
    dataType: 'html',
    success: function(data) {
      $('.chara_list').append(data);
      updateIcon();
    }
  });
}

/*NEWマーク*/
function updateIcon() {
  var upElem = '*[data-up="241220"]';
  $(upElem).addClass('ic ic_up');
}

/*==========================================================================
/ プロダクト　TOPと商品情報ページに表示
/==========================================================================*/
var productHtml = '../assets/inc/product/';
function productInc(incFile){
    $.ajax({
        type: 'get',
        url: productHtml + incFile,
        dataType: 'html',
        success: function(data) {
            data = data.replace(/\{\$root\}/g, dir);
            $('.product_area').append(data);
            updateIcon();
        }
    });
}
