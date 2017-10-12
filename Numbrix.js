MAX_ROWS=5;//8;
MAX_COLS=5;//8;

UP=0;
DOWN=1;
RIGHT=3;
LEFT=4;

MAXNUMBER     = 81;
directionArray =[UP,DOWN,RIGHT,LEFT];

// dump out text
function debug(outputText) {
  window.alert(outputText);
}

function areYouSure(outputText) {
  return confirm(outputText);
}

// store the itemValue at row,col
function setItem(row, col, itemValue) {
  id="item_"+row+"_"+col;
  document.getElementById(id).innerHTML=itemValue;
}

// store the item using the set record
function setItemElement(item){
  id="item_"+item.row+"_"+item.col;
  document.getElementById(id).innerHTML=item.value;
}

function setItemAt(loc,value){
  id="item_"+loc.row+"_"+loc.col;
  document.getElementById(id).innerHTML=value;
  //debug("setItemAt"+id+" "+value);
}

// return the item at the row,col
function getItemAt(row, col){
  var id="item_"+row+"_"+col;
  var value = document.getElementById(id).innerText;
  return value;
}

function hint() {
  debug("Hint");
}

// sets all of the elements to " "
function doTheClear() {
  for (row = 1; row <= MAX_ROWS; row++) {
    for (col = 1; col <= MAX_COLS; col++) {
      setItem(row, col, " ");
    }
  }
}

function clearTable(checkWithUser) {

  if (checkWithUser == "true") {
    if (areYouSure("Are you sure you want to clear the table?")) {
      doTheClear();
    }
    else {
      console.log("You didn't want to clear the table")
    }
  }
  else {
    doTheClear();
  }
}
// random routines
// These are for the initial placement and not for directions
function pickRandomRow(){
  row= 1 + parseInt(Math.random() * (MAX_ROWS -1));
  return row;
}

function pickRandomCol(){
  col= 1 + parseInt(Math.random() * (MAX_COLS -1));
  return col;
}

// These are for moving in a direction
// they act on a loc but DO NOT ERROR CHECK BOUNDS
function goUp(loc){
  //debug("go up called with "+loc.row+" "+loc.col);
  var newLoc = {row:loc.row-1,col:loc.col};
  //debug("go up with "+newLoc.row+" "+newLoc.col)
  return newLoc;
}
function goDown(loc){
  var newLoc = {row:loc.row+1,col:loc.col};
  return newLoc;
}
function goLeft(loc){
  var newLoc = {row:loc.row,col:loc.col-1};
  return newLoc;
}
function goRight(loc){
  var newLoc = {row:loc.row,col:loc.col+1};
  return newLoc;
}

// Range checking routines
function colInRange(col){
  return (col > 0) && (col<=MAX_COLS);
}

function rowInRange(row){
  return (row > 0) && (row<=MAX_ROWS);
}

function notOccupied(row,col){
  var item=getItemAt(row,col);
  //debug("testing "+row+","+col+"["+item+"]");
  if (item.length == "") {
    return true;
  } else {
    //debug("occupied");
    return false;
  }

}

function randomizeDirectionArray(){
  //debug("randomizeDirectionArray:todo");
}

function iterate(row, col, number) {

var newLoc={row:row,col:col};

debug("Calling "+number+" at "+row+","+col);
// only process if we are in range
// and we are not occupied
if (rowInRange(row) &&
    colInRange(col)&&
    notOccupied(row,col)){

    if (number === MAXNUMBER){
      debug("success");
      return true;
    }
    // we have a valid position and we didn't have
    // success yet, so we need to keep iterating.
    else {
      // store this number
      setItemAt(newLoc,number);

      // let's look fot the next number now
      number=number + 1;

      // make sure that the direction array is
      // good and random
      randomizeDirectionArray();

//todo how to evaluate loc record versus row,col
      // loop through all directions
      for (direction=0;direction<4;direction++){
        //debug("testing direction "+direction);
        switch (directionArray[direction]){
          case UP:
            newLoc=goUp({row:row,col:col});
       iterate(newLoc.row,newLoc.col,number);
            break;
          case DOWN:
            newLoc=goDown({row:row,col:col});
       iterate(newLoc.row,newLoc.col,number);
            break;
          case LEFT:
            newLoc=goLeft({row:row,col:col});
       iterate(newLoc.row,newLoc.col,number);
            break;
          case RIGHT:
            newLoc=goRight({row:row,col:col});
       iterate(newLoc.row,newLoc.col,number);
            break;
          default:
            newLoc=goRight();
            break;
          } // of switch statement
          debug("end of switch, callling with "+newLoc.row+" "+newLoc.col+" "+number);

        } // of all directions
        debug("end of loop"+number);
    }
  } // in range
//else {
  //debug("not in range");
//}
debug("ending iterate with "+number);
} // end of iterate()

function doTheReset() {

  clearTable("false");
  row = 2;//pickRandomRow();
  col = 4;//pickRandomCol();
  debug("resetTable " + row + " " + col);

  iterate(row, col, 1);

      //setItem(row,col,69);
}

function resetTable(checkWithUser) {

  if (checkWithUser == "true") {
    if (areYouSure("Are you sure you want to reset the table?")) {
      doTheReset();
    }
    else {
      console.log("You didn't want to reset the table")
    }
  }
  else {
    doTheReset();
  }
}

function clickItem(row, col)
{
  console.log("clickItem called with "+ row + " "+ col);
}
//////////// Main /////////////////////////////
  // Clear the table
  clearTable("false");

  // reset the table and wait for input
  //resetTable("false");

debug("waiting for input");