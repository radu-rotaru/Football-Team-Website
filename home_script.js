function prev() {
  const text = document.getElementsByClassName('d_text');
  for(let i = 0; i < text.length - 1; i ++) {
    if(text[i + 1].style.display == 'block') {
      text[i + 1].style.display = 'none';
      text[i].style.display = 'block';
      break;
    }
  }
}

function next() {
  const text = document.getElementsByClassName('d_text');
  for(let i = 0; i < text.length - 1; i ++) {
    if(text[i].style.display == 'block') {
      text[i].style.display = 'none';
      text[i + 1].style.display = 'block';
      break;
    }
  }
}


const images = document.getElementsByClassName('slider');

let i = 1;

setInterval(function(){
   if(i == 0) {
      images[i].style.display = 'block';
     }
    else if(i == images.length ) {
        images[i - 1].style.display = 'none';
        images[0].style.display = 'block';
        i = 0;
      }
    else {
        images[i - 1].style.display = 'none';
        images[i].style.display = 'block';
      }
     i++;

   }, 8000);
