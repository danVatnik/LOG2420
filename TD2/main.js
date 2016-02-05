$(function() {

// Code à implémenter

});







var i=0;

function timedCount() {
    i=i+1;
    document.getElementById("result").innerHTML = i;
    setTimeout("timedCount()", 500);
     document.getElementById("myProgress").style.width =  i + "%";
}

function startWorking() {
    var input = document.getElementById("numberInput").value;
    console.log(document.getElementById("myProgress").aria-valuemax);
    document.getElementById("myProgress").max = input;
    timedCount();
    
    
   
    
}

function stopWorking() { 
    i=0;   
    document.getElementById("result").innerHTML = 0;
}




