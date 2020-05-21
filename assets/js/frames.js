$('#namebutton').click(function(){
    var currentSlide=$('.nameform');
    currentSlide[0].style.display="block";
    currentSlide.fadeIn(900);
});

function cancel(){
    document.getElementById('formname').style.display="none";
    
    document.getElementById('formemail').style.display="none";
    
    document.getElementById('formphone').style.display="none";

    document.getElementById('profilepic_div_id').style.display="none";

}

$('#emailbutton').click(function(){
    var currentSlide=$('.emailform');
    currentSlide[0].style.display="block";
    currentSlide.fadeIn(900);
});

function update(){
    var currentSlide=$('.profilepic_div');
    currentSlide[0].style.display="block";
    document.getElementById('form_profilepic').style.display="block";
}

$('#numberbutton').click(function(){
    var currentSlide=$('.phoneform');
    currentSlide[0].style.display="block";
    currentSlide.fadeIn(900);
});

$('#forgotpassformbutton').click(function(){
    document.getElementById('forgotPassForm').style.display="block";
})

function cancel2(){
    
    document.getElementById('forgotPassForm').style.display="none";
}