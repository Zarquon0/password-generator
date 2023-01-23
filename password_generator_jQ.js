$(document).ready(()=>{
    $('.menu').on('mouseenter',()=>{
        $('nav').show();
        $('header h5').css('width','13vw');
    }).on('mouseleave',()=>{
        $('nav').hide();
        $('header h5').css('width','5ch');
    });

    const $buttons = $('.button');
    $buttons.on('mousedown',(event)=>{
        $(event.currentTarget).css('transform','scale(0.9)');
    }).on('mouseup',(event)=>{
        $(event.currentTarget).css('transform','scale(1)');
    });

    $('#toggle').on('click', ()=>{
        $('span').toggleClass('hidden');
    });
});