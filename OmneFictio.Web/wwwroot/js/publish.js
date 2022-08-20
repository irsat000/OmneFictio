

$(document).ready(function(){
    var swapToWrite = document.getElementById('sf-swapToWriting');
    var swapToRequest = document.getElementById('sf-swapToRequest');

    swapToWrite.addEventListener('click', function(){
        swapForm('writing');
    });
    swapToRequest.addEventListener('click', function(){
        swapForm('request');
    });

});
function swapForm(form){
    var showform;
    var hideform;
    var showicon;
    var hideicon;
    if(form === "writing"){
        showform = document.getElementById('writing_form');
        hideform = document.getElementById('request_form');
        showicon = document.getElementById('sf-w_icon');
        hideicon = document.getElementById('sf-r_icon');
    }
    else{
        showform = document.getElementById('request_form');
        hideform = document.getElementById('writing_form');
        showicon = document.getElementById('sf-r_icon');
        hideicon = document.getElementById('sf-w_icon');
    }

    if(!showform.classList.contains('d-flex')){
        showform.classList.add('d-flex');
    }
    if(hideform.classList.contains('d-flex')){
        hideform.classList.remove('d-flex');
    }

    if(!showicon.classList.contains('d-block')){
        showicon.classList.add('d-block');
    }
    if(hideicon.classList.contains('d-block')){
        hideicon.classList.remove('d-block');
    }
}
