$(document).ready(function() {
	flexibility(document.documentElement);
	// $("body").on("click", ".test", function(e){
	// 	e.preventDefault();
	// })


    //PAGE-SEARCH
    $('.page-header__input').keyup(function(){
      var $this = $(this),
      val = $this.val();
      if(val.length >= 3){
        $('.page-header__result').fadeIn(20);
        $('body').addClass('hidden');
        $('.page-header__search').addClass('active');
      }else {
        $('.page-header__result').fadeOut(20);
        $('.page-header__search').removeClass('active');
      }
    });


    $("body").on("click", ".page-header__bg", function(){
        $('.page-header__result').fadeOut(20);
        $('body').removeClass('hidden');
        $('.page-header__search__input').val("");
        $('.page-header__search').removeClass('active');
    });

    $("body").on("click", ".active .page-header__reset", function(){
        $('.page-header__result').fadeOut(20);
        $('body').removeClass('hidden');
        $('.page-header__input').val("");
        $('.page-header__search').removeClass('active');
    })





	// $("body").on("click", ".page-footer-lang__view", function(e){
	//     e.preventDefault();
	//     $('.page-footer-lang__list').fadeToggle(100);
	// });
	// $(document).click(function (e){
	//     var div = $(".page-footer-lang");
	//     if (!div.is(e.target)
	//         && div.has(e.target).length === 0) {
	//       $(".page-footer-lang__list").fadeOut(100);
	//     }
	// });

	//LANGUAGE
	$("body").on("click", ".page-header-lang", function(e){
        if (!$(e.target).hasClass('page-header-lang__item')) {
          e.preventDefault();
        }
        $('.page-header-lang__list').fadeToggle(100);
	});
    $(document).click(function (e){
        var div = $(".page-header-lang");
        if (!div.is(e.target)
            && div.has(e.target).length === 0) {
          $(".page-header-lang__list").fadeOut(100);
        }
    });




    if ( $('.material-slider-wrap').length>0 ) {
        $('.royalSlider').each(function() {

            var sliderJQ = $(this).royalSlider({
                fullscreen: {
                  enabled: false,
                },
                transitionType:'fade',
                transitionSpeed:80,
                controlNavigation: 'thumbnails',
                autoScaleSlider: true,
                loop: true,
                imageScaleMode: 'fit-if-smaller',
                navigateByClick: false,
                numImagesToPreload:2,
                arrowsNav:true,
                arrowsNavAutoHide: false,
                arrowsNavHideOnTouch: true,
                keyboardNavEnabled: true,
                fadeinLoadedSlide: true,
                globalCaption: true,
                globalCaptionInside: false,
                sliderTouch:true,
                sliderDrag:true,
                thumbs: {
                    arrows:false,
                  //appendSpan: true,
                  //firstMargin: true,
                  //paddingBottom: 4
                }
            });
            var sliderInstance = sliderJQ.data('royalSlider');
            var slideCountEl = sliderJQ.closest('.material-slider-wrap').find('.pagingInfo');


            function updCount() {
                var str = [
                    (sliderInstance.currSlideId+1),
                    sliderInstance.numSlides
                ].join(' из ')
                //.join(LANG === 'ru' ? ' из ' : ' of ')
                slideCountEl.text(str);
            }
            sliderInstance.ev.on('rsAfterSlideChange', updCount);
            updCount();

        });
    }


    $("body").on("click", ".video__play", function(e){
        $(this).hide();

        $(this).prev('.video__poster').hide();

        //$('#video')[0].src += "&autoplay=1";

        var videoURL = $('#video').prop('src');
        videoURL += "&autoplay=1";
        $('#video').prop('src',videoURL);

        e.preventDefault();
    });



    // BTN-RIPPLE
    $(".js-ripple").click(function (e) {
      e.preventDefault();
      // Remove any old one
      $(".ripple").remove();

      // Setup
      var posX = $(this).offset().left,
          posY = $(this).offset().top,
          buttonWidth = $(this).width(),
          buttonHeight =  $(this).height();

      // Add the element
      $(this).prepend("<span class='ripple'></span>");


     // Make it round!
      if(buttonWidth >= buttonHeight) {
        buttonHeight = buttonWidth;
      } else {
        buttonWidth = buttonHeight;
      }

      // Get the center of the element
      var x = e.pageX - posX - buttonWidth / 2;
      var y = e.pageY - posY - buttonHeight / 2;


      // Add the ripples CSS and start the animation
      $(".ripple").css({
        width: buttonWidth,
        height: buttonHeight,
        top: y + 'px',
        left: x + 'px'
      }).addClass("rippleEffect");

      if ($(this).hasClass('socials__item--tw')) {
        var source = $(this).attr('href');
        var win = window.open(source, '_blank');
        win.focus();
      }
    });
});




$(window).resize(function () {

});


//HEADER-SCROLL
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = 87;

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

// functions
function hasScrolled() {
    var st = $(this).scrollTop();

    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    if (st > lastScrollTop && st > navbarHeight){
        $('header:not(.open)').removeClass('nav-down').addClass('nav-up');
    } else {
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }
    lastScrollTop = st;
}



// $(window).load(function(){

// });

// functions


// links pages
$('body').append(
	'<div style="position: fixed; z-index: 1005; bottom: 0; right: 0; background: #fff; border: solid 1px #828286; width: 200px;"> \
		<a href="javascript:void(0);" style="float: right;background:#ccc; color:#000; padding: 5px 10px; text-decoration: none; font-size: 16px; z-index: 4;position: relative;" onclick="$(this).parent().hide()">Close X</a> \
	<style> \
		#pages { padding: 10px 20px 0 20px; font-size: 18px; margin-bottom:0; } \
		#pages a { text-decoration: none; } \
		#pages li { margin: 0; } \
	</style> \
	<ol id="pages"> \
        <li><a href="index.html">Index</a></li> \
		<li><a href="articles.html">Статьи</a></li> \
        <li><a href="article.html">Статья</a></li> \
        <li><a href="about.html">About</a></li> \
        <li><a href="games.html">Игры</a></li> \
	</ol> \
</div>');
