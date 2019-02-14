var IS_LOCAL_HTML = /.*\.html$/.test(window.location.href);

$(document).ready(function() {
	flexibility(document.documentElement);

    //PAGE-SEARCH
    $('.page-header__input').focus(function () {
        $('.page-header__search').addClass('active');
    });
    $('.page-header__input').keyup(function(){
      var $this = $(this),
      val = $this.val();
      if(val.length >= 3){
        $('.page-header__result').fadeIn(20);
        $('body').addClass('hidden');
        $('.page-header__search').addClass('active');
      }else {
        $('.page-header__result').fadeOut(20);
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
    });

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
                }
            });
            var sliderInstance = sliderJQ.data('royalSlider');
            var slideCountEl = sliderJQ.closest('.material-slider-wrap').find('.pagingInfo');


            function updCount() {
                var str = [
                    (sliderInstance.currSlideId+1),
                    sliderInstance.numSlides
                ].join(' из ')
                slideCountEl.text(str);
            }
            sliderInstance.ev.on('rsAfterSlideChange', updCount);
            updCount();

        });
    }


    $("body").on("click", ".video__play", function(e){
        $(this).hide();

        $(this).prev('.video__poster').hide();

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


    if ($(".instruction").length>0) {
        $(".instruction").stick_in_parent();
    };

    $("body").on("click",".expand-info", function (event) {
        event.preventDefault();
        //if (/.*\.html$/.test(window.location.href)) {
            $('.top-nav-anchors-link__toggle').toggleClass('active');
            $('.expand-info').toggleClass('dnone');
            $('.is_stuck .instruction__list').toggleClass('isVisible');
        // } else {
            //$('.top-nav-anchors-link__toggle').trigger('click');
        // }
    });

    $("body").on("click",".top-nav-anchors-link__toggle", function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('.expand-info').toggleClass('dnone');
        $('.is_stuck .instruction__list').toggleClass('isVisible');
    });


    if ($(".instruction__list").length>0) {
        onScroll();
    };

    $("body").on("click", ".cookies__close", function(e){
         e.preventDefault();
        $(this).parents('.cookies').hide();
    });


    $("body").on("click", ".js-page-cat__top", function(e){
         e.preventDefault();
        $(this).next('.page-cat__item').slideToggle();
    })

});

$(function() {
    if ($('#progress').length>0) {
        $('#progress').tocProgress({
            storyElem: '.page-info-scroll',
            headlineSelector: 'h9' // чтобы при инициализации не добавлялся пункт из селектора, указываю не существующий
        });
    }
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

$(function() {
    //LINK-SCROLL
    $("body").on("click",".js-anchors__link", function (event) {
        event.preventDefault();
        $('.top-nav-anchors-link__toggle').removeClass('active');
        $('.expand-info').removeClass('dnone');
        $('.is_stuck .instruction__list').removeClass('isVisible');

        $(this).parents('.instruction__item').addClass('active');
        var id  = $(this).attr('href'),
            top = $(id).offset().top + 10;
        $('html,body').animate({scrollTop: $(id).offset().top-110},'slow');
    });

});


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



$(document).on("scroll", onScroll);

function onScroll(event){
    if ($(".instruction__list").length>0) {
        var lastId,
        topAnchorHeight = $('.instruction__list').outerHeight(),
        fromTop = $(this).scrollTop()+topAnchorHeight + 240;
        menuItems = $('.js-anchors__link'),

        scrollItems = menuItems.map(function(){
          var item = $($(this).attr("href"));
          if (item.length) { return item; }
        });

        var cur = scrollItems.map(function(){
           if ($(this).offset().top + $('.instruction__list').innerHeight() < fromTop)
           return this;
        });

        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            menuItems
                .parents('.instruction__item').removeClass("active")
                .end().filter("[href='#"+id+"']").parents('.instruction__item').addClass("active");

            $('.instruction__item').each(function(i,elem) {
                if ( $( this ).hasClass( "active" ) ) {
                    var txtxtx = $( this ).find('a').text();
                    var tNum = $( this ).attr("data-item");
                }
                $('.top-nav-anchors__expand').find('span').text(txtxtx);
                $('.top-nav-anchors__expand').find('i').text(tNum);
            });
        }
    }
}


// links pages
if (IS_LOCAL_HTML) {
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
            <li><a href="game.html">Игра</a></li> \
            <li><a href="game-new.html">Игра-new</a></li> \
        </ol> \
    </div>');
}
