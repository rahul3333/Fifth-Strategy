$('#next_button').click(function(){
    var currentSlide=$('.slide.active');
    var nextSlide=currentSlide.next();
    var e = $('.invest_container');
    e[0].style.display="block";
    currentSlide.fadeOut(200).removeClass('active');
    nextSlide.fadeIn(50).addClass('active');
});

$('#back_button').click(function(){
    var currentSlide=$('.slide.active');
    var prevSlide=currentSlide.prev();

    currentSlide.fadeOut(300).removeClass('active');
    prevSlide.fadeIn(300).addClass('active');
})