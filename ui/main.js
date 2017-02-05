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

