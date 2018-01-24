// two grids :
// one for coord of the centers of ellipses
var grid_coord=[];
// one to know where are the pieces
var grid_player=[];

var nb_column=10;
var nb_lines=10;
var cell_width;
var cell_height;
var column=5;
var turn=0;

var canvas;
var player=1;

// prepare grid_coord
// 0 is for empty space
// 1 for piece for player 1
// 2 fir piece for player 2
function prepare(){
  for (var x = 0; x < nb_column; x++) {
    grid_coord[x] = []; // create nested array
    for (var y = 0; y < nb_lines; y++) {
      grid_coord[x][y] = [(x+0.5)*cell_width,(y+0.5)*cell_height] ;
    }
  }
  for (var i = 0; i < nb_column; i++) {
    grid_player[i] = []; // create nested array
    for (var j = 0; j < nb_lines; j++) {
      grid_player[i][j] = 0 ;
    }
  }
}

function setup() {
  var elt = document.getElementById("rules").innerHTML="First player has red pieces and second player has yellow ones";
  canvas=createCanvas(800, 800);
  cell_width=width/nb_column;
  cell_height=height/nb_lines;
  colorMode(HSB);
  background('blue');
  prepare();
  noLoop();
}

function draw() {
  display_grid();
}
