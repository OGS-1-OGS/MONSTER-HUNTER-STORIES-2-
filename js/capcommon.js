/*---------------------
	set var
---------------------*/
var lang = document.querySelector('html').lang;

window.selectLang = 'LANG_monsterhunter_stories2';
// Cookie保持期間
window.cookieExp = 365;
/*---------------------
	GTM
---------------------*/
let mh_gtmID = "GTM-N7X8WCK";
let gtmScr_mh = document.createElement('script');
gtmScr_mh.setAttribute('data-cookieconsent', 'ignore');
let gtmAdd_mh = document.getElementsByTagName('script')[0];
gtmAdd_mh.parentNode.appendChild(gtmScr_mh, gtmAdd_mh);
gtmScr_mh.innerHTML = "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','"+mh_gtmID+"');";

/*---------------------
	process
---------------------*/
(function ($) {
	$(function(){
		var copyright = !function(){
			var setElem = document.getElementById('title_footer_capcom_copyright');
			if(setElem != null) {
				setElem.innerHTML = (copyrightText);
			}
		}();
		getScript(''+root+'../js/common/gate.js');
	});
})(jQuery);
/*---------------------
	getScript
---------------------*/
function getScript(e,t){var a=document.createElement('script'),n=document.getElementsByTagName('script')[0];a.async=1,a.onload=a.onreadystatechange=function(e,n){(n||!a.readyState||/loaded|complete/.test(a.readyState))&&(a.onload=a.onreadystatechange=null,a=void 0,n||t&&t())},a.src=e,n.parentNode.appendChild(a,n)}
/*---------------------
	browserLang
---------------------*/
var browserLang=function(){var a=window.navigator.userAgent.toLowerCase();try{return-1!=a.indexOf('chrome')?(navigator.languages[0]||navigator.browserLanguage||navigator.language||navigator.userLanguage).slice(-2).toLowerCase():(navigator.browserLanguage||navigator.language||navigator.userLanguage).slice(-2).toLowerCase()}catch(a){return}};
/*---------------------
	root
---------------------*/
for(var root,dir=document.getElementsByTagName("script"),i=dir.length;i--;){var match=dir[i].src.match(/(^|.*\/)capcommon\.js$/);if(match){root=match[1];break}};
