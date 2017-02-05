counter.onclick = function(){
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        if(request.readystate == XMLHttpRequest.Done){
            if(request.status == 200){
                var counter = request.responseText;
                var count=document.getElementById("count");
                count.innerHTML=counter;
            }
        }
    }
    request.open(GET,"localhost:8080/counter","true");
    reuest.send(null);
}

var nameInput = document.getElementById("name_box");
var name = nameInout.value;

var submit = document.getElementById("submit_box");
submit.onclick =  function(){
     var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        if(request.readystate == XMLHttpRequest.Done){
            if(request.status == 200){
                var names = request.responseText;
                names = JSON.parse(names);
                var list= [];
                for (var i=0;i < names.lenghth;i++){
                    list += '<li>' + names[i] + '</li>';
                }
                var ul = document.getElementById("listnames");
                ul.innerHTML = list;
            }
        }
    }
    request.open(GET,"localhost:8080/counter","true");
    reuest.send(null);
}