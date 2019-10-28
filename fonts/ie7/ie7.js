/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'sellercommerce\'">' + entity + '</span>' + html;
	}
	var icons = {
		'sc-ico-extranal-link': '&#xe926;',
		'sc-ico-catalogue': '&#xe912;',
		'sc-ico-group': '&#xe913;',
		'sc-ico-categories': '&#xe914;',
		'sc-ico-assets': '&#xe900;',
		'sc-ico-clock': '&#xe915;',
		'sc-ico-allowence': '&#xe917;',
		'sc-ico-information': '&#xe918;',
		'sc-ico-settings': '&#xe901;',
		'sc-ico-template': '&#xe902;',
		'sc-ico-orders': '&#xe903;',
		'sc-ico-products-copy': '&#xe91b;',
		'sc-ico-reports': '&#xe904;',
		'sc-ico-products': '&#xe905;',
		'sc-ico-branding': '&#xe920;',
		'sc-ico-balnce': '&#xe922;',
		'sc-ico-sales': '&#xe923;',
		'sc-ico-tools': '&#xe90a;',
		'sc-ico-employees': '&#xe90b;',
		'sc-ico-cart': '&#xe925;',
		'sc-ico-dashboard': '&#xe90c;',
		'sc-ico-notification': '&#xe90d;',
		'sc-ico-shop': '&#xe90e;',
		'sc-ico-top-nav': '&#xe90f;',
		'sc-ico-menu-bar': '&#xe910;',
		'sc-ico-calendar': '&#xe911;',
		'sc-ico-search': '&#xe986;',
		'sc-ico-question': '&#xea09;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/sc-ico-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
