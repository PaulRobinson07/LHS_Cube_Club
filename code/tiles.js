//gets the canvas element to draw and preps it for drawing
canvas = document.getElementById("tiles");
ctx = canvas.getContext("2d");

//sets the dimensions of the canvas so there's no warping
canvas.width = window.innerWidth;
canvas.height = canvas.offsetHeight;

//makes variables for checking window resizing
inital_width = canvas.width;
inital_height = canvas.offsetHeight;
//variable that holds all the tiles
tileset = [];
//variable with all the color rgb values
color_switches = [93,87,107,54,75,149,65,157,76,219,219,82,220,38,47,228,117,53];
//class that holds the functions and variables of each tile
class tile {
	constructor(x,y) {
		//the position the tile will be rendered on screen
		this.x = x;
		this.y = y;
		//variables for the currently displayed rgb values
		this.current_color = [0,0,0];
		//picks the current color
		var random = Math.floor(Math.random()*6);
		for(var a=0;a<3;a++) {
			this.current_color[a] = color_switches[random*3+a];
		}
		//variables for the next color value
		this.target_color = [0,0,0];
		//variables in charge of whether the tile is done changing colors
		this.finished = [false,false,false];
		this.values_reached = 0;
		//variable decides if the tile will fade into the target color
		this.active = false;
	}
	//picks a new color and resets the variables for color switching
	pick_new_color() {
		//resets the variables
		this.finished = [false,false,false];
		this.values_reached = 0;
		this.active = false;
		//picks a new tile
		var new_tile = tileset[0];
		while (new_tile.active == true) {
			new_tile = tileset[Math.floor(Math.random()*tileset.length)];
		}
		new_tile.active = true;
		//picks the current tile's next color
		var random = Math.floor(Math.random()*6);
		for(var a=0;a<3;a++) {
			this.target_color[a] = color_switches[random*3+a];
		}
	}
	//function that updates every frame
	update() {
		//determines whether the tile is currently chaging colors
		if (this.active == true) {
			for (var b=0;b<3;b++) {
				//updates the color to go closer to the target color
				if (this.finished[b] == false) {
					if (this.current_color[b] < this.target_color[b]) {
						this.current_color[b]+=1;
					}
					if (this.current_color[b] > this.target_color[b]) {
						this.current_color[b]-=1;
					}
					if (this.current_color[b] == this.target_color[b]) {
						this.finished[b] = true;
						this.values_reached+=1;
						//if the tile's rgb values equal the target the next color is picked
						if (this.values_reached == 3) {
							this.pick_new_color();
						}
					}
				}
			}
		}
		//renders the tile
		this.draw();
	}
	//draws the tile
	draw() {
		ctx.fillStyle = "rgb("+this.current_color[0]+","+this.current_color[1]+","+this.current_color[2]+")";
		ctx.beginPath();
		ctx.roundRect(this.x,this.y,45,45,10);
		ctx.fill();
	}
}
//makes the tileset fit the canvas size and fill it up with tiles 
function update_tileset() { 
	//sets the dimensions of the canvas so there's no warping
	canvas.width = window.innerWidth;
	canvas.height = canvas.offsetHeight;
	//makes all the tiles and makes them pick a color
	for (i=0;i<Math.floor(canvas.height/50)+1;i++) {
		for (j=0;j<Math.floor(canvas.width/50)+1;j++) {
			t = new tile(j*50+5,i*50+5);
			tileset[i*(Math.floor(canvas.width/50)+1)+j] = t;
			tileset[i*(Math.floor(canvas.width/50)+1)+j].pick_new_color();
		}
	}
	//picks a few random tiles to change their colors
	for (i=0;i<Math.floor(tileset.length/20)+1;i++) {
		tileset[Math.floor(Math.random()*tileset.length)].active = true;
	}
}
//draws the tiles on the screen
function draw() {
	//checks for window resizes and updates the tiles accordingly
	if (window.innerWidth != canvas.width) {
		update_tileset();
	}
	for (i=0;i<Math.floor(canvas.height/50)+1;i++) {
		for (j=0;j<Math.floor(canvas.width/50)+1;j++) {
			tileset[i*(Math.floor(canvas.width/50)+1)+j].update();
		}
	}
	window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);
//makes the tiles at the first frame of the website
update_tileset();
