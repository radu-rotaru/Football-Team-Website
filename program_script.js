window.onload = function() {
    let menu = document.createElement("DIV");
    menu.className = "dropdown";
    menu.innerHTML = "Choose competition";

    let menu_content = document.createElement("DIV");
    menu_content.className = "dropdown-content";

    let btnUCL = document.createElement("BUTTON");
    let btnPL = document.createElement("BUTTON");
    let btnFA = document.createElement("BUTTON");
    let btnCC = document.createElement("BUTTON");

    btnUCL.className = "but";
    btnPL.className = "but";
    btnFA.className = "but";
    btnCC.className = "but";

    btnUCL.innerHTML = "Uefa Champions League";
    btnPL.innerHTML = "Premier League";
    btnFA.innerHTML = "FA Cup";
    btnCC.innerHTML = "Carabao Cup";

    btnUCL.onclick = function() {changeDisplayOnBtn("program", "competition", "UCL")};
    btnPL.onclick = function() {changeDisplayOnBtn("program", "competition", "PL")};
    btnFA.onclick = function() {changeDisplayOnBtn("program", "competition", "FA")};
    btnCC.onclick = function() {changeDisplayOnBtn("program", "competition", "CC")};

    menu_content.appendChild(btnPL);
    menu_content.appendChild(btnUCL);
    menu_content.appendChild(btnFA);
    menu_content.appendChild(btnCC);

    menu.appendChild(menu_content);
    document.getElementById('program').appendChild(menu);

    createUCL();
    createFA();
    createPL();
    createCC();
}

function createFA() {
  let progr = document.getElementById('program');

  let comp_title = document.createElement("H3");
  comp_title.id = "comp_title";
  comp_title.innerHTML = "FA Cup";

  let fa_div = document.createElement("DIV");
  fa_div.id = "FA";
  fa_div.className = "competition";

  fa_div.appendChild(comp_title);

  getMatchData("fa", fa_div);
  progr.appendChild(fa_div);
}

function createCC() {
  let progr = document.getElementById('program');

  let comp_title = document.createElement("H3");
  comp_title.id = "comp_title";
  comp_title.innerHTML = "Carabao Cup";

  let cc_div = document.createElement("DIV");
  cc_div.id = "CC";
  cc_div.className = "competition";

  cc_div.appendChild(comp_title);

  getMatchData("cc", cc_div);
  progr.appendChild(cc_div);
}

function createUCL() {
  let progr = document.getElementById('program');

  let comp_title = document.createElement("H3");
  comp_title.id = "comp_title";
  comp_title.innerHTML = "UCL";

  let ucl_div = document.createElement("DIV");
  ucl_div.id = "UCL";
  ucl_div.className = "competition";

  ucl_div.appendChild(comp_title);

  getMatchData("groupstage", ucl_div);
  getMatchData("ro16", ucl_div);
  getMatchData("quarter-finals", ucl_div);

  let div_butoane = document.createElement("DIV");
  div_butoane.className = "butoane";

  let but_grupe = document.createElement("BUTTON");
  but_grupe.className = "btn";
  but_grupe.innerHTML = "Group Stage";;
  but_grupe.onclick = function() {changeDisplayOnBtn("UCL", "results", "groupstage")};

  let but_optimi = document.createElement("BUTTON");
  but_optimi.className = "btn";
  but_optimi.innerHTML = "Round of 16";
  but_optimi.onclick = function() {changeDisplayOnBtn("UCL", "results", "ro16")};

  let but_sferturi = document.createElement("BUTTON");
  but_sferturi.className = "btn";
  but_sferturi.innerHTML = "Quarterfinals";
  but_sferturi.onclick = function() {changeDisplayOnBtn("UCL", "results", "quarter-finals")};

  div_butoane.appendChild(but_grupe);
  div_butoane.appendChild(but_optimi);
  div_butoane.appendChild(but_sferturi);

  let x = div_butoane.children;
  for(let i = 0; i < x.length; i++) {
    x[i].onfocus = function () {
      x[i].style.color = "white";
      x[i].style.backgroundColor = "#c80f2e";
    };

    x[i].onblur = function () {
      x[i].style.color = "#c80f2e";
      x[i].style.backgroundColor = "white";
    };
  }

  ucl_div.appendChild(div_butoane);

  progr.appendChild(ucl_div);
}

function createPL() {
  let progr = document.getElementById('program');

  let comp_title = document.createElement("H3");
  comp_title.id = "comp_title";
  comp_title.innerHTML = "Premier League";

  let pl_div = document.createElement("DIV");
  pl_div.id = "PL";
  pl_div.className = "competition";

  pl_div.appendChild(comp_title);

  for(let i = 1; i <=7; i++) {
      getMatchData("prem_" + i, pl_div);
  }

  let div_butoane = document.createElement("DIV");
  div_butoane.className = "butoane";

  for(let i = 1; i <= 7; i++) {
    let but =document.createElement("BUTTON");
    but.className = "btn";
    but.innerHTML = i;
    but.onclick = function() {changeDisplayOnBtn("PL", "results", "prem_" + i)};
    but.onfocus = function () {
      but.style.color = "white";
      but.style.backgroundColor = "#c80f2e";
    };

    but.onblur = function () {
      but.style.color = "#c80f2e";
      but.style.backgroundColor = "white";
    };

    div_butoane.appendChild(but);
  }

  pl_div.appendChild(div_butoane);

  progr.appendChild(pl_div);
}

function getMatchData(phase, competition) {
  let xml = new XMLHttpRequest();
  xml.open("GET", "Matches.json", true);
  xml.send();
  xml.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      let matches = JSON.parse(xml.responseText)[phase];
      createMatches(phase, matches, competition);
    }
  }
}

function createMatches(phase, matches, competition) {
  let res = document.createElement("DIV");
  res.className = "results";
  res.id = phase;

  for (let i = 0; i < matches.length; i++) {

    let match = document.createElement("DIV");
    match.className = "match";

    let logo_h = document.createElement("DIV");
    logo_h.className = "team_img";
    logo_h.style.backgroundImage = matches[i].logo_h;

    let home_team = document.createElement("DIV");
    home_team.className = "team_name";
    home_team.innerHTML = matches[i].home_team;

    let score = document.createElement("DIV");
    score.className = "score";
    score.innerHTML = matches[i].result;

    let away_team = document.createElement("DIV");
    away_team.className = "team_name";
    away_team.innerHTML = matches[i].away_team;

    let logo_a = document.createElement("DIV");
    logo_a.className = "team_img";
    logo_a.style.backgroundImage = matches[i].logo_a;

    match.appendChild(logo_h);
    match.appendChild(home_team);
    match.appendChild(score);
    match.appendChild(away_team);
    match.appendChild(logo_a);
    res.appendChild(match);
  }
  competition.appendChild(res);
}

function changeDisplayOnBtn(idName, classN, phase) {
  let x = document.getElementById(idName);
  let y = ":scope ." + classN;
  x = x.querySelectorAll(y);
  for (let i = 0; i < x.length; i++) {
    if(x[i].id != phase) {
      x[i].style.display = 'none';
    }
    else {
      x[i].style.display = 'grid';
    }
  }
}
