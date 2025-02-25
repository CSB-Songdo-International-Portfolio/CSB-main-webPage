if(/iPhone|iPod|Android|iPad/.test(window.navigator.platform)){
    $(document)
    .on('focus', 'textarea,input,select', function(e) {
        $('#header').css('position', 'absolute');
    })
    .on('blur', 'textarea,input,select', function(e) {
        $('#header').css('position', '');
    });
}
 
$(document).ready(function() {
    stageResize();
 
    // 타이틀 변환
    var homeTile = document.title;  
    arrTitle = $('#sub h1').text();
                         
    if($("#sub").length>0){
        document.title=arrTitle + " | " + homeTile;
    };

	$("html").addClass("loaded");

	// header
	$(window).scroll(function(){
		if($(window).scrollTop()>0){
			$("#header").addClass("header-fixed");
		}else{
			$("#header").removeClass("header-fixed");
		}
	});
 
    // 모바일 메뉴펼침
    $(".nav-menu").html($("#gnb").html());
 
    $(".btn-m-menu").click(function(e){     
        e.preventDefault();     
        if($("html").hasClass("menu-opened")){
            $("html").removeClass("menu-opened");
        }else{
            $("html").addClass("menu-opened"); 
        }
    });
    $(".mobile-overlay, .mobile-navigation .close").click(function(e){      
        e.preventDefault();     
        $("html").removeClass("menu-opened");
    });
 
    // 모바일 메뉴
    $(".mobile-navigation nav ul li a").click(function(){
        t = $(this).parent('li');
        if (t.hasClass('active')) {
            t.removeClass('active');
            t.find('.submenu').slideUp('fast');
        }else {
            $(".mobile-navigation nav li").removeClass('active');
            t.addClass('active');
            if(t.find('div').hasClass('submenu')){
                $(".mobile-navigation nav .submenu").slideUp('fast');           
                t.find('.submenu').slideDown('fast');
                return false;
            }   
        }
    });
 
    // 텝
    $(".tab-content").hide();
    $("ul.tabs>li:first").addClass("active");    
    $(".tab-content:first").show();
 
    $("ul.tabs>li").click(function(e) {
        e.preventDefault();
        $("ul.tabs>li").removeClass("active");
        $(this).addClass("active");
        $(".tab-content").hide();       
 
        var activeTab = $(this).find("a").attr("href");
        $(activeTab).fadeIn();
        return false;
    }); 


	// slider
	var m_timer = 4000;
	var main_slider = $('.main-visual .items').on('init', function(event, slick) {
		setTimeout(function(){ $('.main-visual').find('.slick-current').addClass('active'); },100);
		$(".main-visual .pager").html('<span class="current">1</span>' + ' <span> / </span> ' + slick.slideCount);
		$(".main-visual .progress-bar").addClass("animated").css("animation-duration", m_timer+"ms");
	}).slick({
		touchThreshold : 30,
		speed: 600,
		fade: true,
		arrows: true,
		pauseOnHover: false,
		autoplay: true,
		autoplaySpeed: m_timer,
	}).on('beforeChange', function(event, slick, currentSlide, nextSlide){
		var current  = nextSlide+1;
		$(this).find('.slick-slide').eq(currentSlide).removeClass('active');
		$(this).find('.slick-slide').eq(nextSlide).addClass('active');		
		$(".main-visual .pager").html('<span class="current">' + current +'</span>' + ' <span> / </span> ' + slick.slideCount);
		$(".main-visual .progress-bar").removeClass("animated");
	}).on('afterChange', function(event, slick, currentSlide){
		$(".main-visual .progress-bar").addClass("animated").css("animation-duration", m_timer+"ms");
	});

	$(".main-visual .slide-stop").click(function(){
		main_slider.slick("slickPause");
		$(".main-visual .slide-stop").hide();
		$(".main-visual .slide-play").show();
		$(".main-visual .progress-bar").removeClass("play").addClass("paused");
	});
	$(".main-visual .slide-play").click(function(){
		main_slider.slick("slickPlay");
		$(".main-visual .slide-stop").show();
		$(".main-visual .slide-play").hide();
		$(".main-visual .progress-bar").removeClass("paused").addClass("play");
	});


	// 년도 슬라이드
	$('.year-slider').slick({
	  infinite: false,
	  slidesToShow: 3,
	  slidesToScroll: 1,
		responsive: [
		{
		  breakpoint: 751,
		  settings: {
			slidesToShow: 2,
			slidesToScroll: 1
		  }
		},
		{
		  breakpoint: 451,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1
		  }
		}
		// You can unslick at a given breakpoint now by adding:
		// settings: "unslick"
		// instead of a settings object
		]
	});

	// main quick
	$(".main-quick .toggle").click(function(){
		$(".main-quick").toggleClass("active");
	});

	// lnb
	var lnbIndex = $(".lnb").find("li.active").index();
	var lnbSwiper = new Swiper('.lnb .swiper', {
		slidesPerView: 'auto',
		preventClicks: false,
		initialSlide: lnbIndex
	});

	// sub-tab
	var SubTabIndex = $(".sub-tab").find("li.active").index();
	var SubTabSwiper = new Swiper('.sub-tab.swiper', {
		slidesPerView: 'auto',
		preventClicks: false,
		initialSlide: SubTabIndex
	});
	
    // fancybox
    $(".pop_email").fancybox({
        padding     : 0,
        margin      : 16,
        fitToView   : false,
        openEffect  : 'none',
        closeEffect : 'none',
        type        : 'ajax'
    });
 
    $(".pop_privacy").click(function(){
		var $this = $(this);
		$.fancybox({
			padding     : 0,
			margin      : 10,
			fitToView   : false,
			openEffect  : 'none',
			closeEffect : 'none',
			href        : $this.attr("href"),
			type        : 'ajax',
			afterShow   : function(){
				$(".fancybox-wrap").focus();
				$(".fancybox-wrap").attr("tabindex","0");
			},
			afterClose  : function(){
				$(".fancybox-wrap").attr("tabindex","-1");
				$(".fancybox-wrap").focusout();
				$this.focus();
			}
		});
		return false;
	});

    // datepicker
    $(".datepicker").datepicker({
        dateFormat: 'yy-mm-dd' //Input Display Format 변경
        ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
        ,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시    
        ,changeMonth: true //월 선택 표시
        ,changeYear: true //년도 선택 표시
        ,minDate: '-100y' // 현재날짜로부터 100년이전까지 년을 표시
        ,yearRange: 'c-100:c+10' // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.
        //,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
        ,prevText: "이전달"
        ,nextText: "다음달"
        ,buttonText: "날짜선택" //버튼에 마우스 갖다 댔을 때 표시되는 텍스트                
        ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
        ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
        ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
        ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
    }); 
 
    $(".datepicker2").datepicker({
        dateFormat: 'yy-mm-dd' //Input Display Format 변경
        ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
        ,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시    
        ,changeMonth: true //월 선택 표시
        ,changeYear: true //년도 선택 표시
        ,minDate: '-100y' // 현재날짜로부터 100년이전까지 년을 표시
        ,yearRange: 'c-100:c+10' // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.
        ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
        ,prevText: "이전달"
        ,nextText: "다음달"
        ,buttonText: "날짜선택" //버튼에 마우스 갖다 댔을 때 표시되는 텍스트                
        ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
        ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
        ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
        ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
    });  
	
	// AOS
	AOS.init({
		easing: 'ease',
		duration: 1000,
		once: true
	});
 
    // input
    $("input[type=tel], input[numberOnly]").on("keyup", function() {
        $(this).val($(this).val().replace(/[^0-9\- \+]/g,""));
    });
 
    // usemap
    jQuery('img[usemap]').rwdImageMaps();
});
 
$(window).bind("load resize", function(){
    stageResize();
});
function stageResize(){
    var winH = $(window).height(),
        headH = $("#header").outerHeight(),
        subH = $(".sub-visual").outerHeight(),
        lnbH = $(".lnb").outerHeight(),
        footH = $("#footer").outerHeight();
 
    $("#container").css("min-height",winH-headH-footH-subH-lnbH);
}