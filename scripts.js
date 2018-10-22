var data = [
  [zero, ' ', [0, 0], false], [one, ' ', [0, 1], false], [two, ' ', [0, 2], false], [three, ' ', [0, 3], false],
  [four, ' ', [1, 0], false], [five, ' ', [1, 1], false], [six, ' ', [1, 2], false], [seven, ' ', [1, 3], false],
  [eight, ' ', [2, 0], false], [nine, ' ', [2, 1], false], [ten, ' ', [2, 2], false], [eleven, ' ', [2, 3], false],
  [twelve, ' ', [3, 0], false], [thirteen, ' ', [3, 1], false], [fourteen, ' ', [3, 2], false], [fifteen, ' ', [3, 3], false]
];

score = 0;
best = 0;

row0 = [data[0], data[1], data[2], data[3]];
row1 = [data[4], data[5], data[6], data[7]];
row2 = [data[8], data[9], data[10], data[11]];
row3 = [data[12], data[13], data[14], data[15]];
col0 = [data[0], data[4], data[8], data[12]];
col1 = [data[1], data[5], data[9], data[13]];
col2 = [data[2], data[6], data[10], data[14]];
col3 = [data[3], data[7], data[11], data[15]];
rows = [row0, row1, row2, row3];
cols = [col0, col1, col2, col3];

window.onload = function() {
  newGame();
}

newGameButton.onclick = function() {
  newGame();
};

function newGame() {
  best = localStorage.getItem('best');
  if(!best) {
    best = 0;
  };
  bestDisplay.textContent = 'Best: ' + best;
  if(score > best) {
    best = score;
    bestDisplay.textContent = 'BEST: ' + best;
    localStorage.setItem('best', best);
  };
  score = 0;
  scoreDisplay.textContent = 'SCORE: 0';
  for(i=0; i<data.length; i++) {
    data[i][3] = false;
    data[i][1] = ' ';
    data[i][0].textContent = data[i][1];
  };
  generate();
  generate();
  style();
};

function updateScore(points) {
  score += points;
  scoreDisplay.textContent = 'SCORE: ' + score;
}

function onPress(direction) {
  layout1 = getLayout();
  if(direction == 'left') {
    left();
  } else if(direction == 'right') {
    right();
  } else if(direction == 'down') {
    down();
  } else if(direction == 'up') {
    up();
  };
  layout2 = getLayout();
  //if last move was valid generate new 2
  if(layout1 != layout2) {
    generate();
  };
  style();
  resetCombine();
};

function getLayout() {
  layout = []
  for(i=0; i<data.length; i++) {
    layout += (data[i][1]);
  };
  return layout;
};

function resetCombine() {
  for(i=0; i<data.length; i++) {
    data[i][3] = false;
  }
}

//Generates a 2 in a random empty space
function generate() {
  //creates list of html selectors pointing to empty spaces
  emptyList = [];
  for(i=0; i<data.length; i++) {
    if(data[i][1] == ' ') {
      emptyList.push(data[i]);
    };
  };

  //Chooses empty space + updates data list + updates display
  newSpace = emptyList[Math.floor(Math.random() * emptyList.length)];
  newSpace.textContent = 2;

  for(i=0; i<data.length; i++) {
    if(data[i] == newSpace) {
      data[i][1] = 2
      data[i][0].textContent = data[i][1];
    };
  };
};

function style() {
  for(i=0; i<data.length; i++) {
    if(data[i][1] == ' ') {
      data[i][0].style.backgroundColor = '#eff5ff';
    } else if (data[i][1] == 2) {
      data[i][0].style.backgroundColor = '#d8e7ff';
    } else if (data[i][1] == 4) {
      data[i][0].style.backgroundColor = '#b2cfff';
    } else if (data[i][1] == 8) {
      data[i][0].style.backgroundColor = '#8cb7ff';
    } else if (data[i][1] == 16) {
      data[i][0].style.backgroundColor = '#639dff';
    } else if (data[i][1] == 32) {
      data[i][0].style.backgroundColor = '#3a83ff';
    } else if (data[i][1] == 64) {
      data[i][0].style.backgroundColor = '#005eff';
    } else if (data[i][1] == 128) {
      data[i][0].style.backgroundColor = '#e9c9ff';
    } else if (data[i][1] == 256) {
      data[i][0].style.backgroundColor = '#d69ffc';
    } else if (data[i][1] == 512) {
      data[i][0].style.backgroundColor = '#c675ff';
    } else if (data[i][1] == 1024) {
      data[i][0].style.backgroundColor = '#b550fc';
    } else if (data[i][1] == 2048) {
      data[i][0].style.backgroundColor = '#ff0000';
    } else if (data[i][1] == 4096) {
      data[i][0].style.backgroundColor = '#faff00';
    } else if (data[i][1] == 8192) {
      data[i][0].style.backgroundColor = '#43ff00';
    };
  };
};

function left() {
  doubled = []
  for(row=0; row<rows.length; row++) {
    for(count=0; count<3; count++) {
      for(i=1; i<4; i++) {
        //if space to left is empty move left
        if(rows[row][i-1][1] == ' ') {
          rows[row][i-1][1] = rows[row][i-1][0].textContent = rows[row][i][1];
          rows[row][i][1] = rows[row][i][0].textContent = ' ';
        }
        //if space to left is equal and has not combined already then combine
        else if(rows[row][i-1][1] == rows[row][i][1]) {
          if(rows[row][i-1][3] == false && rows[row][i][3] == false) {
            rows[row][i-1][1] = rows[row][i-1][0].textContent = points = rows[row][i][1] * 2;
            rows[row][i][1] = rows[row][i][0].textContent = ' ';
            rows[row][i-1][3] = true;
            rows[row][i][3] = false;
            updateScore(points);
          };
        };
      };
    };
  };
};

function up() {
  doubled = []
  for(col=0; col<cols.length; col++) {
    for(count=0; count<3; count++) {
      for(i=1; i<4; i++) {

        if(cols[col][i-1][1] == ' ') {
          cols[col][i-1][1] = cols[col][i-1][0].textContent = cols[col][i][1];
          cols[col][i][1] = cols[col][i][0].textContent = ' ';
        }

        else if(cols[col][i-1][1] == cols[col][i][1]) {
          if(cols[col][i-1][3] == false && cols[col][i][3] == false){
            cols[col][i-1][1] = cols[col][i-1][0].textContent = points = cols[col][i][1] * 2;
            cols[col][i][1] = cols[col][i][0].textContent = ' ';
            cols[col][i-1][3] = true;
            cols[col][i][3] = false;
            updateScore(points);
          };
        };
      };
    };
  };
};

function right() {
  doubled = []
  for(row=0; row<rows.length; row++) {
    for(count=0; count<3; count++) {
      for(i=2; i > -1; i--) {

        if(rows[row][i+1][1] == ' ') {
          rows[row][i+1][1] = rows[row][i+1][0].textContent = rows[row][i][1];
          rows[row][i][1] = rows[row][i][0].textContent = ' ';
        }

        else if(rows[row][i+1][1] == rows[row][i][1]) {
          if(rows[row][i+1][3] == false && rows[row][i][3] == false) {
            rows[row][i+1][1] = rows[row][i+1][0].textContent = points = rows[row][i][1] * 2;
            rows[row][i][1] = rows[row][i][0].textContent = ' ';
            rows[row][i+1][3] = true;
            rows[row][i][3] = false;
            updateScore(points);
          };
        };
      };
    };
  };
};

function down() {
  doubled = []
  for(col=0; col<cols.length; col++) {
    for(count=0; count<3; count++) {
      for(i=2; i > -1; i--) {

        if(cols[col][i+1][1] == ' ') {
          cols[col][i+1][1] = cols[col][i+1][0].textContent = cols[col][i][1];
          cols[col][i][1] = cols[col][i][0].textContent = ' ';
        }

        else if(cols[col][i+1][1] == cols[col][i][1]) {
          if(cols[col][i+1][3] == false && cols[col][i][3] == false) {
            cols[col][i+1][1] = cols[col][i+1][0].textContent = points = cols[col][i][1] * 2;
            cols[col][i][1] = cols[col][i][0].textContent = ' ';
            cols[col][i+1][3] = true;
            cols[col][i][3] = false;
            updateScore(points);
          };
        };
      };
    };
  };
};
