jQuery(function(jQuery){
	jQuery.fn.gnb = function(options) {
		var opts = jQuery.extend(options);
		var gnb = jQuery(this);
		var gnbList = gnb.find('>ul>li');
		var submenu = gnb.find('.submenu');
		var submenuList = submenu.find('>ul>li');
		var submenuBg = jQuery('.submenu-bg');

		var heightArray = jQuery("#gnb .submenu ul").map(function(){
			return jQuery(this).outerHeight();
		}).get();
		var maxHeight = Math.max.apply(Math, heightArray);

		function showMenu() {
			t = jQuery(this).parent('li');
			gnbList.removeClass('active');
			t.addClass("active");	
			$("html").addClass("show-all-menu");
			submenuBg.show();
			submenuBg.stop(true, false).animate({height:maxHeight},200, 'swing',function(){
				jQuery("#gnb .submenu").height(maxHeight);	
				submenu.fadeIn(200);
			});
		}

		function showMenu2() {
			t = jQuery(this).parent('li');
			gnbList.removeClass('active');
			t.addClass("active");	
			$("html").addClass("show-all-menu");
			submenuBg.show();
			submenuBg.stop(true, false).animate({height:maxHeight},200, 'swing',function(){
				jQuery("#gnb .submenu").height(maxHeight);	
				submenu.fadeIn(200);
			});
			if( t.find(".submenu").length ){
				return false;
			}			
		}

		function hideMenu() {
			$("html").removeClass("show-all-menu");
			gnbList.removeClass('active');
			submenu.fadeOut(100);
			submenuBg.stop(true, false).delay(100).animate({height:'0'},200, 'swing', function(){
				submenuBg.hide();			
			});
			activeMenu();
		}

		function activeMenu() {
			if(opts.d1) {
				t = gnbList.eq(opts.d1-1); 
				t.addClass('active');
				if(opts.d2) {
					t.find('.submenu>ul>li').eq(opts.d2-1).addClass('active');
				}
			}
		}

		return this.each(function() {
			activeMenu();
			if( $(window).width() > 1600 ){
				gnbList.find('>a').mouseover(showMenu).focus(showMenu);
			}else{
				gnbList.find('>a').click(showMenu2).focus(showMenu2);
			}
			$(".btn-all-menu").click(function(){
				if(!$("html").hasClass("show-all-menu")){
					$("html").addClass("show-all-menu");
					if( $(window).width() > 1600 ){
						showMenu();
					}else{
						showMenu2();
					}
				}else{
					$("html").removeClass("show-all-menu");
					hideMenu();
				}
			})
			jQuery("#header").mouseleave(hideMenu);
			gnb.find("a:last").focusout(hideMenu); // �뱀젒洹쇱꽦
		});
	}
});