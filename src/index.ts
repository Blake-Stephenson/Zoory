import { Application, Sprite , Container, Texture} from 'pixi.js'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 1280,
	height: 720
})

//define hex colors
type HEX = `0x${string}`
const white:HEX = '0xFFFFFF'
const red:HEX = '0xFF0000'
const blue:HEX = '0x011EFE'
const yellow:HEX = '0xFDFE02'
const pink:HEX = "0xFE00F6"
const pPink:HEX = "0xFF71CE"
const pBlue:HEX = "0x01CDFE"
const green:HEX = "0x21D326"
const grey:HEX = "0x9B9B9B"
const lGrey:HEX = "0xCDCDCD"

console.log(white,red,blue,yellow,pink,pPink,pBlue,green,grey,lGrey)


const clampy: Sprite = Sprite.from("egg.png")

clampy.anchor.set(0.5)

clampy.x = app.screen.width / 2
clampy.y = app.screen.height / 2

app.stage.addChild(clampy)

//create board, contains pixels
const board = new Container()
//add to app
app.stage.addChild(board)
//creating pixel grid sizing
let cols = 8*2
let rows = cols/2
let width = app.screen.width*0.8/cols
board.x = app.screen.width*0.1
board.y = app.screen.height*0.05

//make tool bar
const bar = new Container()
app.stage.addChild(bar)
bar.x = app.screen.width*0.1
bar.y = app.screen.height*0.8

const select = Sprite.from(Texture.WHITE)
select.tint = yellow;
const team1 = Sprite.from("team select.png")
team1.tint = pPink
team1.interactive = true;
team1.onclick = () => {
	//some function here that happens on click
	changeStatus(1)
	}
const team2 = Sprite.from("team select.png")
team2.tint = pBlue
team2.interactive = true;
team2.onclick = () => {
	//some function here that happens on click
	changeStatus(2)
	}
const heart = Sprite.from("heart-plus.png")
heart.interactive = true;
heart.onclick = () => {
	//some function here that happens on click
	changeStatus(3)
	}
const fire = Sprite.from("fire.png")
fire.interactive = true;
fire.onclick = () => {
	//some function here that happens on click
	changeStatus(4)
	}
const wall = Sprite.from("defensive-wall.png")
wall.interactive = true;
wall.onclick = () => {
	//some function here that happens on click
	changeStatus(5)
	}


bar.addChild(select)
bar.addChild(team1)
bar.addChild(team2)
bar.addChild(heart)
bar.addChild(fire)
bar.addChild(wall)

select.width = app.screen.width*0.11
select.height = app.screen.width*0.11
select.anchor.set(0.05,0.05)
select.visible = false

team1.width = app.screen.width*0.1
team1.height = app.screen.width*0.1
team2.width = app.screen.width*0.1
team2.height = app.screen.width*0.1
heart.width = app.screen.width*0.1
heart.height = app.screen.width*0.1
fire.width = app.screen.width*0.1
fire.height = app.screen.width*0.1
wall.width = app.screen.width*0.1
wall.height = app.screen.width*0.1
team2.x = team1.width*1.2
heart.x = team1.width*4.6
fire.x = team1.width*5.8
wall.x = team1.width*7

//selection logic
//0=>nothing,1=>
let selectionStatus = 0

function changeStatus(choice: number){
	if (choice==selectionStatus){
		selectionStatus = 0
		select.visible = false
	}
	else{
		selectionStatus=choice
	}
	switch (selectionStatus) {
		case 1:
		  	select.x = 0
		  	select.visible = true
		  	break
		case 2:
		  	select.x = team1.width * 1.2
		  	select.visible = true
		 	break
		case 3:
			select.x = team1.width * 4.6
		  	select.visible = true
		  	break
		case 4:
		  	select.x = team1.width * 5.8
		  	select.visible = true
		  	break
		case 5:
		  	select.x = team1.width * 7
		  	select.visible = true
		  	break
		default:
		  	console.log("Invalid selection.")
		  	break
	  }
}



function pixelClicked(p: pixel, row: Number, col: Number){
	console.log("row: ",row," col: ",col," clicked")
	switch (selectionStatus) {
		case 1:

			p.changeColor(pPink)
		  break;
		case 2:
			p.changeColor(pBlue)
		  	break;
		case 3:
			p.changeColor(green)
			break;
		case 4:
			p.changeColor(red)
			break;
		case 5:
			p.changeColor(grey)
			break;
		default:
		  	console.log("Invalid selectionStatus.");
		  	break;
	  }
}

/*
let test = Sprite.from(Texture.WHITE)
test.width = 100
test.height = 100
test.x = 140
board.addChild(test)
test.interactive = true;
test.onclick = (_event) => {
	//some function here that happens on click
	test.tint = pink
	console.log("bruh")
	}
*/


// Define the pixel
class pixel {
	row: number
	col: number
	color: HEX
	rect: Sprite
  
	constructor(R: number, C: number, color: HEX) {
	  	this.row = R
	  	this.col = C
	  	this.color = color
	  	this.rect = Sprite.from(Texture.WHITE)
	  	this.rect.tint = color
	  	this.rect.width = width
	  	this.rect.height = width
	  	this.rect.x = width*C
	  this.rect.y = width*R
	  this.rect.interactive = true
	  this.rect.onclick = () => {
		//some function here that happens on click
		pixelClicked(this, this.row, this.col)
		//console.log("drew")
		}
	  board.addChild(this.rect)
	}

	changeColor(color: HEX) {
		this.color = color
		this.rect.tint = color
	}
  }

let pixels: pixel[][] = [];
//create grid of pixels
for (let row = 0; row < rows; row++) {
	pixels[row] = []
	for (let col = 0; col < cols; col++) {
		let newObject = new pixel(row,col, lGrey)
		pixels[row][col] = newObject
	}
}



  



  
	


