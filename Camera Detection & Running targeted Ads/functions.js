function homePageAdsSlider() {
    var sliderTimer = 5000
    var mainSlider = $('.gallery .owl-carousel').owlCarousel({

        responsive: {
            0: {
                items: 1
            },
            550: {
                items: 1
            },
            1000: {
                items: 1
            },
            1200: {
                items: 1
            }
        },
        dots: true,
        nav: true,
        mouseDrag: true,
        autoplay: true,
        autoplayTimeout: sliderTimer,
        smartSpeed: 1000,
        navText: ["<i class='fa fa-angle-left' aria-hidden='true'></i>", "<i class='fa fa-angle-right' aria-hidden='true'></i>"],
        loop: true
    });
}



$(document).ready(function () { 

    homePageAdsSlider();  

});