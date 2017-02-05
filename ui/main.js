console.log('Loaded!');
var ele =document.getElementById('main-ele');
ele.innerHTML="He he";

var img = document.getElementById('madi');
var marginLeft = 0;

function moveRight(){
  marginLeft = marginLeft + 10;
  img.style.marginLeft = marginLeft + 'px';
  
}
img.onclick = function (){
	var interval = setInterval(moveRight,100);
}