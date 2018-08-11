!function(){
    var view = document.querySelector('#myslides')
    var controller = {
        view: null,
        swiper: null,
        swiperOptions: {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        },
        init: function (view) {
            this.view = view
            this.initSwiper()
        },
        initSwiper: function(){
            this.swiper = new Swiper(
                this.view.querySelector('.swiper-container'),
                this.swiperOptions
            )
      }
    }
     // 如果需要前进后退按    // 如果需要滚动条    // scrollbar: {   //   el: '.swiper-scrollbar    // },
         controller.init(view)
}.call()


