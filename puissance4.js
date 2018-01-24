function transpose(a)
{
  return a[0].map(function (_, c) { return a.map(function (r) { return r[c]; }); });
  // or in more modern dialect
  // return a[0].map((_, c) => a.map(r => r[c]));
}

// to check the diagonale (top right to bottom left)
function tranpose_vertically(grid)
{
  var new_grid=[];
  for (var i=0;i<grid.length;i++)
  {
    new_grid[i]=[];
    for (var j=0;j<grid[i].length;j++)
    {
      new_grid[i][j]=grid[i][grid[i].length-j-1];
    }
  }
  return new_grid;
}

// display the grid
function display_grid()
{
  for (var i=0;i<grid_coord.length;i++)
  {
    for (var j=0;j<grid_coord[i].length;j++)
    {
      if (grid_player[i][j]==0)
      {
        fill('white');
        ellipse(grid_coord[i][j][0],grid_coord[i][j][1],cell_width,cell_height)
      }
      else if  (grid_player[i][j]==1)
      {
        fill('red');
        ellipse(grid_coord[i][j][0],grid_coord[i][j][1],cell_width,cell_height)
      }
      else if  (grid_player[i][j]==2)
      {
        fill('yellow');
        ellipse(grid_coord[i][j][0],grid_coord[i][j][1],cell_width,cell_height)
      }
    }
  }
}

// show in red the column selected
function selected_column(num,color='green'){
  len=grid_coord.length-1
  x1=grid_coord[num][0][0]-0.5*cell_width
  x2=x1+cell_width
  y1=grid_coord[num][0][1]-0.5*cell_height
  y2=grid_coord[num][len][1]+cell_height
  fill(color);
  noStroke();
  print(x1,y1,x2,y1);
  quad(x1,y1,x2,y1,x2,y2,x1,y2);
}

// return the first empty cell of a column
function first_empty_cell(column)
{
  for (var i=nb_lines;i>=0;i--)
  {
    if (grid_player[column][i]==0)
    {
      return i;
    }
  }
  return -1;
}

// return true if four piece are aligned
function four_piece_aligned(list){
  first_elem=list[0];
  if (first_elem==0){return false;}
  for (var i=0;i<list.length;i++)
  {
    if (list[i]!=first_elem){return false;}
  }
  return true;
}

// check if a diagonale (from top left to bottom right) has four pieces aligned
function check_diagonale(grid){
  for (var i=0;i<nb_column-3;i++)
  {
    for (var j=0;j<nb_lines-3;j++)
    {
      first_elem=grid[i][j];
      if (first_elem!=0)
      {
        different=false;
        for(var k=0;k<4;k++)
        {
          if(grid[i+k][j+k]!=first_elem){different=true;}
        }
        if(!different){return true;}
      }
    }
  }
  return false;
}

// display whose player won
function won(draw=false){
  if (!draw){
    var winner;
    if (player==2)
    {
      winner="Winner is Player 1 <br>";
    }
    else {
      winner="Winner is Player 2 <br>";
    }
    winner+="Press n to start again";
    var elt = document.getElementById("winner").innerHTML=winner;
  }
  else {
    print(grid_player);
    var draw="No one won <br> Press n to start again";
    var elt = document.getElementById("winner").innerHTML=draw;
  }
}

// check if the game is over (i.e one of the two player won)
function is_ended(){
  transpose_grid=transpose(grid_player);
  for (var i=0;i<nb_column;i++)
  {
    for (var j=0;j<nb_lines-3;j++)
    {
      if(four_piece_aligned(grid_player[i].slice(j,j+4)) ||
      four_piece_aligned(transpose_grid[i].slice(j,j+4)))
      {
        won();
      }
    }
  }
  if (check_diagonale(grid_player) || check_diagonale(tranpose_vertically(grid_player)))
  {
    won();
  }
  is_full=true;
  for (var i=0;i<grid_player.length;i++)
  {
    for (var j=0;j<grid_player[i].length;j++)
    {
      if (grid_player[i][j]==0){is_full=false;}
    }
  }
  if (is_full){won(true);}
}

// remove html text
function clean_html(){
  var elt = document.getElementById("winner").innerHTML="";
  var elt = document.getElementById("rules").innerHTML="";
  var elt = document.getElementById("turn").innerHTML="";
}


function keyPressed() {
  if (keyCode === LEFT_ARROW)
  {
    if (column>0)
    {
      selected_column(column,'blue');
      column--;
      selected_column(column);
    }
  }
  else if (keyCode === RIGHT_ARROW)
  {
    if (column<nb_column-1)
    {
      selected_column(column,'blue');
      column++;
      selected_column(column);
    }
  }
  // if press n as new game
  else if (keyCode === 78)
  {
    column=5;
    player=1;
    clean_html();
    setup();
    draw();
  }
  else if (keyCode === ENTER)
  {
    empty_cell=first_empty_cell(column);
    if (empty_cell!=-1)
    {
      if (player==1){
        turn++;
        grid_player[column][empty_cell]=1;
        var elt = document.getElementById("turn").innerHTML="Turn : Player 2";
        player=2;
      }
      else if (player==2){
        turn++;
        grid_player[column][empty_cell]=2;
        var elt = document.getElementById("turn").innerHTML="Turn : Player 1";
        player=1;
      }
    }
  }
  display_grid();
  is_ended();
}
