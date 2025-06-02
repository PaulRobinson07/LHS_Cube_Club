//gets the canvas element to draw and preps it for drawing
canvas = document.getElementById("tiles");
ctx = canvas.getContext("2d");

//sets the dimensions of the canvas so there's no warping
canvas.width = window.innerWidth;
canvas.height = 300;

//makes variables for checking window resizing
inital_width = canvas.width;
inital_height = 300;
class tile {
	constructor(x,y) {
		//the position the tile will be rendered on screen
		this.x = x;
		this.y = y;
		//variables for the currently displayed rgb values
		this.current_color = [0,0,0];
		//variables for the next color value
		this.target_color = [0,0,0];
		//variable decides if the tile will fade into the target color
		this.active = false;
		//variable is used to tell if the tile is done fading into the next color
		this.values_reached = 0;
	}
	pick_new_color() {
		new_color_int = Math.floor(Math.random()*6);
		for(i=0;i<3;i++) {
			this.target_color[i] = color_switches[new_color_int*3+i];
		}
	}
	draw() {
		ctx.fillStyle = "rgb("+this.current_color[0]+","+this.current_color[1]+","+this.current_color[2]+")";
		ctx.beginPath();
		ctx.roundRect(x,y,45,45,10);
		ctx.fill();
	}
	update() {
		f
	}
}
//sets the tiles
tiles = [];
const colors = ["rgb(93,87,107)","rgb(54,75,149)","rgb(65,157,76)","rgb(219,219,82)","rgb(220,38,47)","rgb(228,117,53)"];
//draws the inital render of tiles
//draw_tile();
const color_switches = [93,87,107,54,75,149,65,157,76,219,219,82,220,38,47,228,117,53];
tile_switches = []
current_color = [];
next_color = [];
//inital blocks
for(i=0;i<(Math.floor(canvas.width/50)+1)*6;i++) {
	tile = Math.floor(Math.random()*6);
	tiles.push(tile);
}
for(i=0;i<30;i++){
	random_tile=Math.floor(Math.random()*(Math.floor(canvas.width/50)+1)*6);
	current_color.push(tiles[random_tile]);
	next_color.push(Math.floor(Math.random()*6)); 
	tiles[random_tile]=i+5;
	for (j=0;j<3;j++) {
		tile_switches.push(color_switches[current_color[i]*3+j]);
		console.log(tile_switches[i*3+j]);
	}
}
//makes sure any resizes updates the tile effect
window.onresize = update_tiles;
window.requestAnimationFrame(balls);
function balls () {
	for (i=0;i<6;i++) {
		for (j=0;j<(Math.floor(canvas.width/50)+1);j++){
			inta = tiles[i*Math.floor(canvas.width/50+1)+j];
			if (tiles[i*Math.floor(canvas.width/50+1)+j]<6) {
				ctx.fillStyle = colors[tiles[i*(Math.floor(canvas.width/50)+1)+j]];
			}
			else {
				for (a=0;a<3;a++){
					if (tile_switches[tiles[inta-5]*3+a]<color_switches[next_color[inta-5]*3+a]) {
						tile_switches[tiles[inta-5]*3+a]+=5;
					}
					else {
						tile_switches[tiles[inta-5]*3+a]-=5;
					}
				}
				ctx.fillStyle = "rgb("+tile_switches[tiles[inta-5]*3]+","+tile_switches[tiles[inta-5]*3+1]+","+tile_switches[tiles[inta-5]*3+2]+")";
			}
			ctx.beginPath();
			ctx.roundRect(j*50+5,i*50+5,45,45,10);
			ctx.fill();
		}
	}
	window.requestAnimationFrame(balls);
}
//fills in a block at a desired area and dimension 
function block(x,y,w,h) {
	pick_color();
	//ctx.fillRect(x,y,w,h);  *alternate square version to do the tiles
	ctx.beginPath();
	ctx.roundRect(x,y,w,h,10);
	ctx.fill();
}
//randomly picks one of six colors that are on a standard rubix's cube
function pick_color() {
	current_color = "#5d576b";
	c_int = Math.floor(Math.random()*6);
	switch(c_int) {
		case 0:
			current_color = ("rgb(93,87,107)");//Grey Hex: #5D576B
			break;
		case 1:
			current_color = ("rgb(54,75,149)");//Blue Hex: #364a95
			break;
		case 2:
			current_color = ("rgb(65,157,76)");//Green Hex: #419d4c
			break;
		case 3:
			current_color = ("rgb(219,219,82)");//Yellow Hex: #DBDB52
			break;
		case 4:
			current_color = ("rgb(220,38,47)");//Red Hex: #DC262E
			break;
		case 5:
			current_color = ("rgb(228,117,53)");//orange Hex: #E47635
	}
	ctx.fillStyle = current_color;
}
//updates the tiles
function update_tiles() {
	canvas.width = window.innerWidth;
	draw_tile();
}
//draws the tiles from one end of the screen to the other
function draw_tile() {
	for (i=0;i<6;i++) {
		for (j=0;j<(Math.floor(window.innerWidth/50)+1);j++) {
			block(j*50+5,i*50+5,45,45);
		}
	}
}
