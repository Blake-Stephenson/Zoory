import {
	Application,
	Sprite,
	Container,
	Texture,
	Graphics
} from 'pixi.js'

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
const white: HEX = '0xFFFFFF'
const red: HEX = '0xFF0000'
const blue: HEX = '0x011EFE'
const yellow: HEX = '0xFDFE02'
const pink: HEX = "0xFE00F6"
const pPink: HEX = "0xFF71CE"
const pBlue: HEX = "0x01CDFE"
const green: HEX = "0x21D326"
const grey: HEX = "0x9B9B9B"
const lGrey: HEX = "0xCDCDCD"

console.log(white, red, blue, yellow, pink, pPink, pBlue, green, grey, lGrey)


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
let cols = 4 * 2
let rows = cols / 2
//let width = app.screen.width * 0.8 / cols
board.x = app.screen.width * 0.1
board.y = app.screen.height * 0.05

//crreate mask infont of board
const mask = new Container()
app.stage.addChild(mask)
// Create the outer rectangle
const outerRect = new Graphics()
outerRect.beginFill(grey) // Red color for the outer rectangle
outerRect.drawRect(0, 0, app.screen.width , app.screen.height )
outerRect.endFill()
outerRect.beginHole()
outerRect.drawRect(100, 100, app.screen.width-200, app.screen.height-300)
outerRect.endHole()
mask.addChild(outerRect)


//make tool bar
const bar = new Container()
app.stage.addChild(bar)
bar.x = app.screen.width * 0.1
bar.y = app.screen.height * 0.8

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

select.width = app.screen.width * 0.11
select.height = app.screen.width * 0.11
select.anchor.set(0.05, 0.05)
select.visible = false

team1.width = app.screen.width * 0.1
team1.height = app.screen.width * 0.1
team2.width = app.screen.width * 0.1
team2.height = app.screen.width * 0.1
heart.width = app.screen.width * 0.1
heart.height = app.screen.width * 0.1
fire.width = app.screen.width * 0.1
fire.height = app.screen.width * 0.1
wall.width = app.screen.width * 0.1
wall.height = app.screen.width * 0.1
team2.x = team1.width * 1.2
heart.x = team1.width * 4.6
fire.x = team1.width * 5.8
wall.x = team1.width * 7

//selection logic
//0=>nothing,1=>
let selectionStatus = 0

function changeStatus(choice: number) {
	if (choice == selectionStatus) {
		selectionStatus = 0
		select.visible = false
	} else {
		selectionStatus = choice
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



function pixelClicked(p: pixel, row: Number, col: Number) {
	console.log("row: ", row, " col: ", col, " clicked")
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

//create board, contains pixels
const hexBoard = new Container()
//add to app
app.stage.addChild(hexBoard)

//draw a hexagon
const drawHexagon = (x: number, y: number, size:number) => {
	const graphics = new Graphics()
	graphics.beginFill(0xFFFFFF) // Fill color (red in this example)
	graphics.lineStyle(2, 0x000000) // Line style (black border in this example)

	const centerX = app.renderer.width / 2
	const centerY = app.renderer.height / 2

	const numberOfSides = 6
	const stepAngle = (2 * Math.PI) / numberOfSides
	const radius = size * Math.sqrt(3) / 2 // Circumradius for a regular hexagon

	// Move to the first point
	graphics.moveTo(centerX + radius * Math.cos(-Math.PI / 6), centerY + radius * Math.sin(-Math.PI / 6))

	// Draw the hexagon with rotated angles
	for (let i = 1; i <= numberOfSides; i++) {
		const angle = -Math.PI / 6 + stepAngle * i
		graphics.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle))
	}

	graphics.closePath() // Connect the last point to the first point to close the shape

	graphics.endFill()
	graphics.x = x
	graphics.y = y
	graphics.tint = pBlue
	hexBoard.addChild(graphics)
}



//testing
const sq = Sprite.from(Texture.WHITE)
sq.width = 150
sq.height = 88
sq.x = app.renderer.width / 2
sq.y = app.renderer.height / 2
hexBoard.addChild(sq)

let foo  = 30
drawHexagon(0, 0,foo)
drawHexagon(foo*1.5, 0,foo)
drawHexagon(foo*0.75, foo*1.3, foo)


// Define the pixel
class pixel {
	row: number
	col: number
	color: HEX
	graphics: Graphics
	size: number = 100

	constructor(R: number, C: number, color: HEX) {
		this.row = R
		this.col = C
		this.color = color
		this.graphics = new Graphics()
		this.graphics.tint = color
		this.graphics.x = this.size*1.5 * (C + (R%2)/2)
		this.graphics.y = this.size*1.3 * R
		this.graphics.interactive = true
		this.drawHex()
		this.graphics.onclick = () => {
			//function here that happens on click
			pixelClicked(this, this.row, this.col)
		}
		board.addChild(this.graphics)
	}

	drawHex() {
		this.graphics.beginFill(0xFFFFFF) // Fill color (red in this example)
		this.graphics.lineStyle(2, 0x000000) // Line style (black border in this example)

		const numberOfSides = 6
		const stepAngle = (2 * Math.PI) / numberOfSides
		const radius = this.size * Math.sqrt(3) / 2 // Circumradius for a regular hexagon

		// Move to the first point
		this.graphics.moveTo(radius * Math.cos(-Math.PI / 6), radius * Math.sin(-Math.PI / 6))

		// Draw the hexagon with rotated angles
		for (let i = 1; i <= numberOfSides; i++) {
			const angle = -Math.PI / 6 + stepAngle * i
			this.graphics.lineTo(radius * Math.cos(angle), radius * Math.sin(angle))
		}

		this.graphics.closePath() // Connect the last point to the first point to close the shape

		this.graphics.endFill()
	}

	changeColor(color: HEX) {
		this.color = color
		this.graphics.tint = color
	}
}

let pixels: pixel[][] = [];
//create grid of pixels
for (let row = 0; row < rows; row++) {
	pixels[row] = []
	for (let col = 0; col < cols; col++) {
		let newObject = new pixel(row, col, lGrey)
		pixels[row][col] = newObject
	}
}