$(document).ready(function() {
    $('.post-carousel').owlCarousel({
        loop: true,
        margin: 30,
        responsiveClass: true,
        navText: "",
        smartSpeed: 500,
        items: 3,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            768: {
                items: 2,
                nav: true
            },
            1024: {
                items: 3,
                nav: true,
                loop: false
            }
        }
    });

    $('.panel-carousel').owlCarousel({
        loop: true,
        responsiveClass: true,
        navText: "",
        smartSpeed: 500,
        items: 1,
        nav: true,
        autoHeight:true
    });
});