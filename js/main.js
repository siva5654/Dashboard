$(document).ready(function() {
    $('.sc-list-items >li > p').click(function() {
        $(this).siblings().slideToggle('slow');
        $(this).parent().addClass('scs-act');
        $(this).parent().siblings().removeClass('scs-act');
        $(this).siblings().parent().siblings().find('.sc-disnone').hide();;
        $(this).addClass('sc-active')
        $(this).addClass('sc-active1')
        $(this).parent().siblings().find('p').removeClass("sc-active")
        $(this).parent().siblings().find('p').removeClass("sc-active1")
    })
    $('.sc-list-items >li >ul >li').click(function() {
        $(this).addClass('sc-c_active');
        $(this).siblings().removeClass('sc-c_active')
        $(this).children().addClass('sc-active');
        $(this).siblings().children().removeClass('sc-active');
    })

    $('.sc-menu').click(function() {
        $('.sc-list-items > li > p > span').toggleClass('sc-dis')
        $('.sc-list-items >li >p').toggleClass('sc-af-ico');
        $('.sc-leftnav').toggleClass('sc-left-icoview');
        $('body').toggleClass('sc-navico-view')
        $('.sc-logo-ful').toggleClass('sc-dis');
        $('body').removeClass('sc-topnavmenu');
        $('.sc-ico-top-nav').removeClass('sc-top-rotate')
        $('.sc-rightnav').toggleClass('sc-right-icoview');
    });
    $('.sc-ico-top-nav').click(function() {
        $('.sc-logo-ful').removeClass('sc-dis');
        $('.sc-list-items > li > p > span').removeClass('sc-dis')
        $('.sc-leftnav').removeClass('sc-left-icoview');
        $('.sc-list-items >li >p').removeClass('sc-af-ico');
        $('.sc-rightnav').removeClass('sc-right-icoview');
        $('body').removeClass('sc-navico-view');
        $('body').toggleClass('sc-topnavmenu');
        $(this).toggleClass('sc-top-rotate')
    });
    $('.sc-db-dys >li').click(function() {
        $(this).addClass('sc-db-active');
        $(this).siblings().removeClass('sc-db-active');
    });
    $('.sc-datechange').click(function() {
        $('body').addClass('sc-overly')
        $('.overlay').addClass('overlay-open');
        $('.applyBtn , .cancelBtn ,.overlay').click(function() {
            $('.overlay').removeClass('overlay-open');
        });
    });
    $('.sc-ico-notification').click(function() {
        $('.sc-notify-pop').addClass('sc-pop-open');
        $('.sc-close').click(function() {
            $('.sc-notify-pop').removeClass('sc-pop-open');
        });
    });
    $('.sc-date-picker').daterangepicker({
        opens: 'left'
    }, function(start, end, label) {
        console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
    $('#order-carousal').owlCarousel({
        loop: true,
        slideSpeed: 500,
        autoPlay: 500,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })
    $('#product-carousal').owlCarousel({
        loop: true,
        slideSpeed: 500,
        autoPlay: 500,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })
    $(".sc-lt:first-child").addClass("active").parent().siblings().find(".sc-tc:first-child").show();
    $(".sc-lt").click(function() {
        $(this).siblings(".sc-lt").removeClass("active").parent().siblings().find(".sc-tc").hide();
        $(this).addClass("active").parent().siblings().find(".sc-tc").eq($(this).index()).show();
    });

        
})