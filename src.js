// When the user scrolls down 50px from the top of the document, resize the header's font size
window.onscroll = function() {scrollFunction()};

$(document).ready(function() {
  $("#header").load("header.html");
});

// useful for doodling
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
var no_canvas = true;

var sidenav_open = false;
var hamburgerbar_names = ["bar1","bar2","bar3"]
var headers = document.getElementsByTagName("h1")

function scrollFunction() {
  if (document.body.scrollTop > 15 || document.documentElement.scrollTop > 15) {

    /* conditional logic for device vs desktop
    if(window.innerWidth > 500){*/
    document.getElementById("deviceheader").style.fontSize = "1.2em";

    /*}*/
  } else {
    /* conditional logic for device vs desktop
    if(window.innerWidth > 500){*/

    document.getElementById("deviceheader").style.fontSize = "1em";
  }
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function togglesidenav() {
  if(sidenav_open) {
    document.getElementById("sidenav").style.width = "0vw";
    document.getElementById("header").style.marginLeft = "0vw";
    document.getElementById("header").style.width = "var(--header-width)";
    document.getElementById("textcontent").style.marginLeft = "8vw";
    document.getElementById("textcontent").style.width = "var(--text-width)";

    for (var i = 0; i < headers.length; i++){
      headers[i].style.color = "0ac00a"
    }

    sidenav_open = false;
  }
  else {
    document.getElementById("sidenav").style.width = "18vw";
    document.getElementById("header").style.marginLeft = "18vw";
    document.getElementById("header").style.width = "var(--shrink-header-width)";
    document.getElementById("textcontent").style.marginLeft = "26vw";
    document.getElementById("textcontent").style.width = "var(--shrink-text-width)";

    for (var i = 0; i < headers.length; i++){
      headers[i].style.color= " 05a005"
    }

    sidenav_open = true;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function doodle(){
  if (no_canvas){
    var canvas = document.createElement('canvas');

    canvas.id = "doodleCanvas";
    canvas.width = width;
    canvas.height = height;
    canvas.style.zIndex = -2;
    canvas.style.position = "fixed";
    //can
    //cursor: not-allowed;    pointer-events: none

    var body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);

    canvas.style.display = "inline";

    no_canvas = false;
  }

  var ctx = canvas.getContext("2d");
  var size = 15;
  var base_angle = Math.PI/3;
  var cur_angle = -2
  var new_angle = 0;
  var base_delay = 250;
  var delay_weight = 500;
  console.log(width)
  var cur_position = [0.85*width, 0.85*height];
  var new_position = [0, 0];
  var choice =0;
  var up_bias = .05;
  var first_draw = 0;
  new_position = [cur_position[0]+size*Math.cos(cur_angle*base_angle), cur_position[1]+size*Math.sin(cur_angle*base_angle)];
  ctx.strokeStyle = "#80fe90";
  ctx.beginPath();
  // first step
  ctx.moveTo(cur_position[0], cur_position[1]);
  ctx.lineTo(new_position[0], new_position[1]);
  cur_position = [new_position[0], new_position[1]];
  ctx.stroke();

  // start choosing randomly
  for (i = 0; i < 200; i++) {
    // take a break
    await sleep(base_delay + delay_weight * Math.sqrt(Math.random()));
    ctx.beginPath();

    // set temp color + make choice for end
    ctx.strokeStyle = "#494949";
    ctx.lineWidth = 1;

    // check if horizontal, heading left
    if (cur_angle == -3 || cur_angle == 3){
      choice = Math.floor((1-up_bias)*Math.random()*2+up_bias)*2-1;
    }
    else if (cur_angle == -1 || cur_angle == 4) { // check if up and to the right
      choice = Math.floor((1-up_bias)*Math.random()*2+up_bias)*2-1;
    }
    else {
      choice = Math.floor(Math.random()*2)*2-1;
    }
    console.log(cur_angle)

    first_draw = Math.floor(Math.random()*2)*2-1;

    // draw first candidate, will overdraw later
    ctx.moveTo(cur_position[0], cur_position[1]);
    new_angle = cur_angle+first_draw;
    new_position = [cur_position[0]+size*Math.cos(new_angle*base_angle), cur_position[1]+size*Math.sin(new_angle*base_angle)];
    ctx.lineTo(new_position[0], new_position[1]);
    ctx.stroke();
    await sleep(base_delay + delay_weight * Math.sqrt(Math.random()));


    // rebase + draw second
    ctx.moveTo(cur_position[0], cur_position[1]);
    new_angle = cur_angle-first_draw;
    new_position = [cur_position[0]+size*Math.cos(new_angle*base_angle), cur_position[1]+size*Math.sin(new_angle*base_angle)];
    ctx.lineTo(new_position[0], new_position[1]);
    ctx.stroke();
    await sleep(base_delay + delay_weight * Math.sqrt(Math.random()));

    // rebase, make selection, and overdraw
    ctx.beginPath();
    ctx.strokeStyle = "#80fe90";
    ctx.lineWidth = 2;
    ctx.moveTo(cur_position[0], cur_position[1]);
    cur_angle = cur_angle+choice;
    cur_position = [cur_position[0]+size*Math.cos(cur_angle*base_angle), cur_position[1]+size*Math.sin(cur_angle*base_angle)];
    ctx.lineTo(cur_position[0], cur_position[1]);
    ctx.stroke();

    // try to keep cur_angle between [-pi, pi]
    if (cur_angle < - 3){
      cur_angle = cur_angle + 6;
    }
    else if (cur_angle > 3){
        cur_angle = cur_angle - 6;

    }
  }
}

function alterhamburger() {
  togglesidenav()
}
