/*---------------------
// var
---------------------*/
const footer = document.getElementById('title_footer'),
      gl = footer.classList.contains('ft-gl'),
      us = footer.classList.contains('ft-pp-us'),
      asia = footer.classList.contains('ft-pp-asia');
const copyText = '&copy;CAPCOM';

/*---------------------
// flag
---------------------*/
//*----- Logo -----*//
let cpUrl,
    cplogoImage;
if(gl) {
  if(asia) {
    cpUrl = 'https://www.capcom-games.com/en-asia/';
  } else if(us) {
    cpUrl = 'https://www.capcomusa.com/';
  } else {
    cpUrl = 'https://www.capcom.com/';
  }
} else {
  cpUrl = 'https://www.capcom-games.com/';
}
if(logoColorBk) {
  cplogoImage = 'capcom_b.png';
} else {
  cplogoImage = 'capcom_c_f.png';
}
//*----- Menu -----*//
// Privacy Policy
let ppUrl,
    ppText;
if(gl) {
  if(us) {
    ppUrl = 'https://www.capcom.com/capcom/legal_privacy/privacy.html';
    ppText = 'Privacy Policy';
  } else if(asia) {
    ppUrl = 'https://www.capcom-games.com/en/legal/privacy-policy/';
    ppText = 'Privacy Policy';
  } else {
    ppUrl = 'https://www.capcom-games.com/en/legal/privacy-policy/';
    ppText = 'Privacy Policy';
  }
} else {
  ppUrl = 'https://www.capcom-games.com/ja-jp/legal/privacy-policy/';
  ppText = 'プライバシーポリシー';
}
// Support
let sprtUrl;
if(supportUrl != '') {
  sprtUrl = supportUrl;
} else {
  sprtUrl = 'https://www.capcom.co.jp/support/';
}
//*----- Trademark -----*//
// Text/Url
let tmUrl,
    tmTag;
if(gl) {
  tmUrl = 'https://www.capcom-games.com/en/legal/tm/';
  tmTag = 'All <a href="'+tmUrl+'" target="_blank" rel="noopener">trademarks</a> referenced herein are the properties of their respective owners.';
} else {
  tmUrl = 'https://www.capcom-games.com/ja-jp/legal/tm/';
  tmTag = '当サイトの<a href="'+tmUrl+'" target="_blank" rel="noopener">商標</a>は、それぞれの権利者が所有しています。';
}
/*---------------------
// HTML
---------------------*/
let tfhtml = '<div class="title-footer">';
    tfhtml += '<p class="title-footer-logo">';
    tfhtml += '<a href="'+cpUrl+'" target="_blank" rel="noopener">';
    tfhtml += '<img src="https://www.capcom-games.com/common/img/logo/'+cplogoImage+'" width="313" height="59" alt="CAPCOM">';
    tfhtml += '</a>';
    tfhtml += '</P>';
    tfhtml += '<div class="title-footer-menu">';
    tfhtml += '<ul data-js-elem="addCookiePolicy">';
    if(!gl){
      tfhtml += '<li><a href="'+sprtUrl+'" target="_blank" rel="noopener"><span>サポート</span></a></li>';
      tfhtml += '<li><a href="https://www.capcom-games.com/ja-jp/site/" target="_blank" rel="noopener"><span>サイトのご利用について</span></a></li>';
    } else {
      tfhtml += '<li><a href="https://www.capcom-games.com/en/terms/" target="_blank" rel="noopener"><span>Terms</span></a></li>';
    }
    tfhtml += '<li><a href="'+ppUrl+'" target="_blank" rel="noopener"><span>'+ppText+'</span></a></li>';
    tfhtml += '</ul>';
    tfhtml += '</div>';
    tfhtml += '<div class="title-footer-text">';
    tfhtml += '<p class="title-footer-legal">'+tmTag+'</p>';
    tfhtml += '<p class="title-footer-copyright">'+copyText+'</p>';
    tfhtml += '</div>';
    tfhtml += '</div>';
// OutPut
document.getElementById('title_footer').innerHTML = (tfhtml);
/*---------------------
// CookiePolicy Link
---------------------*/
window.addEventListener('CookiebotOnDialogDisplay', addCookiePolicyLink);
window.addEventListener('CookiebotOnAccept', addCookiePolicyLink);
window.addEventListener('CookiebotOnDecline', addCookiePolicyLink);
function addCookiePolicyLink() {
  let addCookiePolicy = document.querySelector('[data-js-elem="addCookiePolicy"]');
  let listelem = document.querySelector('[data-js-elem="addCookiePolicy"] .link-cp');
  if (listelem === null && cookiepolicyUrl != '') {
    let copyrightlink = document.createElement('li');
    copyrightlink.classList.add('link-cp');
    copyrightlink.innerHTML = '<a href="' + cookiepolicyUrl + '" target="_blank"><span>Cookie Policy</span></a>';
    addCookiePolicy.appendChild(copyrightlink);
  }
}