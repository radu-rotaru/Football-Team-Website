function gs() {
  document.getElementById('ro16').style.display = 'none';
  document.getElementById('groupstage').style.display = 'grid';
}

function ro16() {
  document.getElementById('groupstage').style.display = 'none';
  document.getElementById('ro16').style.display = 'grid';
}

function onUCL() {
  x = document.getElementsByClassName('UCL');
  gridDisplay(x);
}
function onFA() {
  let x = document.getElementsByClassName('UCL');
  noneDisplay(x)
  x = document.getElementsByClassName('FA');
 gridDisplay(x);
}

function noneDisplay(x) {
  for(let i = 0; i < x.length; i++) {
    x[i].style.display = 'none';
  }
}

function gridDisplay(x) {
  for(let i = 0; i < x.length; i++) {
    x[i].style.display = 'grid';
  }
}
