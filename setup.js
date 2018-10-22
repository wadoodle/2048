zero = document.getElementById('zero');
one = document.getElementById('one');
two = document.getElementById('two');
three = document.getElementById('three');
four = document.getElementById('four');
five = document.getElementById('five');
six = document.getElementById('six');
seven = document.getElementById('seven');
eight = document.getElementById('eight');
nine = document.getElementById('nine');
ten = document.getElementById('ten');
eleven = document.getElementById('eleven');
twelve = document.getElementById('twelve');
thirteen = document.getElementById('thirteen');
fourteen = document.getElementById('fourteen');
fifteen = document.getElementById('fifteen');

scoreDisplay = document.getElementById('scoreDisplay');
bestDisplay = document.getElementById('bestDisplay');
newGameButton = document.getElementById('newGameButton');

document.addEventListener("keydown", handler);

function handler(evt) {
  switch(evt.which) {
    case 37:
      onPress('left');
      break;

    case 38:
      onPress('up');
      break;

    case 39:
      onPress('right');
      break;

    case 40:
      onPress('down');
      break;
  };
};
