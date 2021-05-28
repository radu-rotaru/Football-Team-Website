window.onload = function() {
  let menu = document.createElement("div");
  menu.id = "menu";
  let title = document.createElement("p");
  title.id = "menu_title";
  title.innerHTML = "Liverpool Quiz";
  menu.appendChild(title);

  let play_btn = document.createElement("button");
  play_btn.className = "quiz_btn";
  play_btn.innerHTML = "PLAY";

  let div_btn = document.createElement("div");
  div_btn.id = "div_btn";
  let lead_btn = document.createElement("button");
  lead_btn.className = "quiz_btn";
  lead_btn.innerHTML = "LEADERBOARD";

  div_btn.appendChild(play_btn);
  div_btn.appendChild(lead_btn);

  play_btn.addEventListener('mouseover', function(event) {
    event.target.style.backgroundColor = 'white';
    event.target.style.color =  '#00a398';
  });

  play_btn.addEventListener('mouseout', function(event) {
    event.target.style.backgroundColor = '#00a398';
    event.target.style.color =  'white';
  });

  lead_btn.addEventListener('mouseover', function(event) {
    event.target.style.backgroundColor = 'white';
    event.target.style.color =  '#00a398';
  });

  lead_btn.addEventListener('mouseout', function(event) {
    event.target.style.backgroundColor = '#00a398';
    event.target.style.color =  'white';
  });


  createPlay();
  createLeaderboard();
  createEndGame();

  play_btn.onclick = function() {
    menu.style.display = 'none';
    play()};

  lead_btn.onclick = function() {
    menu.style.display = 'none';
    showLeaderboard()};

  menu.appendChild(div_btn);
  document.getElementById('quiz_questions').appendChild(menu);
}

function createPlay() {
  let x = document.createElement("div");
  x.id = "play";
  x.style.display = "none";

  let qs_div = document.createElement("div");
  qs_div.id = "qs_div";
  x.appendChild(qs_div);

  let ans_div = document.createElement("div");
  ans_div.id = "ans_div";
  x.appendChild(ans_div);

  let ans_1 = document.createElement("input");
  ans_1.type = "radio";
  ans_1.name = "answer";
  ans_1.id = "1";
  ans_div.appendChild(ans_1);

  let label_1 = document.createElement("label");
  label_1.htmlFor = "1";
  ans_div.appendChild(label_1);

  let ans_2 = document.createElement("input");
  ans_2.type = "radio";
  ans_2.name = "answer";
  ans_2.id = "2";
  ans_div.appendChild(ans_2);

  let label_2 = document.createElement("label");
  label_2.htmlFor = "2";
  ans_div.appendChild(label_2);

  let ans_3 = document.createElement("input");
  ans_3.type = "radio";
  ans_3.name = "answer";
  ans_3.id = "3";
  ans_div.appendChild(ans_3);

  let label_3 = document.createElement("label");
  label_3.htmlFor = "3";
  ans_div.appendChild(label_3);

  let ok = document.createElement("button");
  ok.innerHTML = "OK";
  ok.id = "ok";
  x.appendChild(ok);

  document.getElementById('quiz_questions').appendChild(x);
}

function createLeaderboard() {
  let lead = document.createElement("div");
  lead.id = "ld_div";
  document.getElementById("quiz_questions").appendChild(lead);

  let title = document.createElement("h3");
  title.innerHTML =  "LEADERBOARD";
  title.id = "ld_title";
  lead.appendChild(title);

  lead.style.display = 'none';
}

function createEndGame() {
  let x = document.getElementById('quiz_questions');

  let final = document.createElement("div");
  final.id = "final";

  let msg = document.createElement("p");
  msg.id = "final_msg";
  final.appendChild(msg);

  let form = document.createElement("form");

  let label_1 = document.createElement("label");
  label_1.htmlFor = "user";
  label_1.innerHTML = "Enter username: ";

  let user = document.createElement("input");
  user.type = "text";
  user.id = "user";
  user.value = "";
  form.appendChild(label_1);
  form.appendChild(user);

  let sub = document.createElement("button");
  sub.id = "sub";
  sub.innerHTML = "Submit";
  final.appendChild(form);
  final.appendChild(sub);

  final.style.display = 'none';
  x.appendChild(final);
}

function play() {
  document.getElementById('play').style.display = 'grid';
  let xml = new XMLHttpRequest();
  xml.open("GET", "questions.json", true);
  xml.send();
  xml.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      let questions = JSON.parse(xml.responseText);
      questions = questions.questions;
      getquestion(questions, 1, 0);
    }
  }
}

function getquestion(x, nr, correct) {
  if(nr <= 5) {
    let index = Math.floor(Math.random() * x.length);
    document.getElementById('qs_div').innerHTML = x[index].qs;
    let y = document.getElementById('ans_div').children;
    y[0].checked = true;
    for (i = 0; i < y.length; i = i + 2) {
      y[i].value = x[index].ans[i / 2][1];
      y[i + 1].innerHTML = x[index].ans[i / 2][0];
    }
    document.getElementById('ok').onclick = function() {
        for(i = 0; i < y.length; i = i + 2) {
          if(y[i].value == "true") {
            y[i + 1].className += " true_ans";
            if(y[i].checked == true) {
              correct += 1;
            }
          }
          else {
            y[i + 1].className += " false_ans";
          }
        }
        x.splice(index, 1);
        setTimeout(function() {
          for(i = 0; i < y.length; i = i + 2) {
            if(y[i].value == "true") {
              y[i + 1].classList.remove("true_ans");
            }
            else {
              y[i + 1].classList.remove("false_ans");
            }
            y[i].checked = false;
          }
          getquestion(x, nr + 1, correct);
        }, 2000);
      }
    }
    else {
      document.getElementById('play').style.display = 'none';

      let final = document.getElementById('final');
      final.style.display = 'grid';

      let msg = document.getElementById('final_msg');
      msg.innerHTML = "Final!\n You have made ";
      msg.innerHTML += correct;
      msg.innerHTML += " points!"

      let sub = document.getElementById('sub');

      sub.onclick = function() {
        let user = document.getElementById('user');
        if(user.value != "") {
          let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
          leaderboard.push({"username" : user.value, "score" : correct});
          localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
          final.style.display = 'none';
          user.value = "";
          showLeaderboard();
      }
    }
  }
}

function showLeaderboard() {
  let lead = document.getElementById('ld_div');
  lead.style.display = 'grid';

  let table = document.createElement("table");
  table.id = "ld_table";
  lead.appendChild(table);

  let tr = document.createElement("tr");

  let th_1 = document.createElement("th");
  th_1.innerHTML = "POSITION";
  tr.appendChild(th_1);

  let th_2 = document.createElement("th");
  th_2.innerHTML = "USERNAME";
  tr.appendChild(th_2);

  let th_3 = document.createElement("th");
  th_3.innerHTML = "SCORE";
  tr.appendChild(th_3);

  table.appendChild(tr);

  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.sort(function(a, b) {
  if (a.score < b.score)
      return 1;
  if (a.score > b.score)
      return -1;
  return 0;
});
  for (let i = 0; i < leaderboard.length && i < 10; i++) {
    let tr = document.createElement("tr");

    let th_1 = document.createElement("th");
    th_1.innerHTML = i + 1;
    tr.appendChild(th_1);

    let th_2 = document.createElement("th");
    th_2.innerHTML = leaderboard[i].username;
    tr.appendChild(th_2);

    let th_3 = document.createElement("th");
    th_3.innerHTML = leaderboard[i].score;
    tr.appendChild(th_3);

    table.appendChild(tr);
  }

  let back_menu = document.createElement('button');
  back_menu.id = "back_menu";
  back_menu.innerHTML = "BACK TO MENU";
  lead.appendChild(back_menu);

  back_menu.onclick = function() {
    ld_div.style.display = 'none';
    back_menu.remove();
    table.remove();
    document.getElementById('menu').style.display = 'grid';
  }
}
