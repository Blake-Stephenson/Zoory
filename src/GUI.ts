/*
 * File: GUI.ts
 * Author: Blake Stephenson
 * Created: 2023-07-25
 * Description: GUI for main game page
 */

import {
    Sprite,
    Texture,
    Graphics,
    Container,
    Rectangle
} from 'pixi.js'



// Define hex colors
type HEX = `0x${string}`;
const myC = {
    white: '0xFFFFFF' as HEX,
    red: '0xFF0000' as HEX,
    blue: '0x011EFE' as HEX,
    yellow: '0xFDFE02' as HEX,
    pink: '0xFE00F6' as HEX,
    pPink: '0xFF71CE' as HEX,
    pBlue: '0x01CDFE' as HEX,
    green: '0x21D326' as HEX,
    grey: '0x9B9B9B' as HEX,
    lGrey: '0xCDCDCD' as HEX,
  }




//making mouse wheel zoom 


/*
// Set up zoom variables
const minScale = 0.5;
const maxScale = 2;
const zoomSpeed = 0.1; // Adjust this value to control zoom speed

// Add mouse wheel event listener

board.addEventListener("wheel", (event: WheelEvent) => {
    const wheelDelta = event.deltaY;
    console.log(wheelDelta)

    // Calculate the new scale based on the wheel delta
    let newScale = board.scale.x + wheelDelta * zoomSpeed * -0.001;

    // Limit the scale to the minScale and maxScale values
    newScale = Math.max(minScale, Math.min(maxScale, newScale));

    // Update the scale of the 'board' container
    board.scale.set(newScale);
});

*/

/*outerRect.onmouseover = () => {
	//some function here that happens on mouseover
	console.log("innn")
   }*/


// Define the pixel
class Pixel {
    private row: number
    private col: number
    color: HEX
    private graphics: Graphics
    private size: number = 100
    private bar: Bar
    private parentGrid: HexGrid

    constructor(R: number, C: number, color: HEX, bar: Bar, hexGrid: HexGrid) {
        this.parentGrid = hexGrid
        this.size = this.parentGrid.getAppScreen().width / 20
        this.row = R
        this.col = C
        this.color = color
        this.graphics = new Graphics()
        this.graphics.tint = color
        this.bar = bar
        this.graphics.x = this.size * 1.5 * (C + (R % 2) / 2)
        this.graphics.y = this.size * 1.3 * R
        this.graphics.interactive = true
        this.drawHex()
        this.graphics.onclick = () => {
            //function here that happens on click
            this.pixelClicked(this)
        }
        this.graphics.on('wheel', this.handleMouseWheel.bind(this))
        this.graphics.on('mousedown', (event) => {
            this.parentGrid.setIsDragging(true, event.data.global.x, event.data.global.y)
        })
        this.graphics.on('mouseup', () => {
            this.parentGrid.setIsDragging(false, 0, 0)
        })
        /*
        this.graphics.on('mouseout', () => {
            this.parentGrid.setIsDragging(false, 0, 0)
        })*/
        this.graphics.on('mousemove', (event) => {
            if (this.parentGrid.getIsDragging()) {
                this.bar.setSelection(0)
                this.parentGrid.moveGrid(event.data.global.x - this.parentGrid.getDragPos().x, event.data.global.y - this.parentGrid.getDragPos().y)
                this.parentGrid.setIsDragging(true, event.data.global.x, event.data.global.y)
            }
        });
    }

    private handleMouseWheel(event: WheelEvent) {
        // Print the mouse wheel movement
        //console.log('Mouse wheel movement hex:', event.deltaY, this.row, this.col)
        this.parentGrid.zoomGrid(-event.deltaY, this.row, this.col)
        // You can perform additional actions based on the mouse wheel movement here
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

    pixelClicked(p: Pixel) {
        //console.log("row: ", row, " col: ", col, " clicked")
        switch (this.bar.getSelection()) {
            case 1:

                p.changeColor(myC.pPink)
                break;
            case 2:
                p.changeColor(myC.pBlue)
                break;
            case 3:
                p.changeColor(myC.green)
                break;
            case 4:
                p.changeColor(myC.red)
                break;
            case 5:
                p.changeColor(myC.grey)
                break;
            default:
                console.log("Invalid selectionStatus.");
                break;
        }
    }

    changeColor(color: HEX) {
        this.color = color
        this.graphics.tint = color
    }

    getGraphics() {
        return this.graphics
    }
}

//class for hex grid
class HexGrid {
    private pixels: Pixel[][] = []
    private grid: Container = new Container()
    private bar: Bar
    private appScreen: Rectangle
    private isDragging: boolean = false
    private dragPos: {
        x: number,
        y: number
    } = {
        x: 0,
        y: 0
    }

    minScale = 0.1;
    maxScale = 10;
    zoomSpeed = 0.1; // Adjust this value to control zoom speed

    constructor(rows: number, cols: number, bar: Bar, appScreen: Rectangle) {
        this.bar = bar
        this.appScreen = appScreen
        this.grid.x = 100
        this.grid.y = 100
        for (let row = 0; row < rows; row++) {
            this.pixels[row] = []
            for (let col = 0; col < cols; col++) {
                let newObject = new Pixel(row, col, myC.lGrey, this.bar, this)
                this.grid.addChild(newObject.getGraphics())
                this.pixels[row][col] = newObject
            }
        }
    }

    zoomGrid(wheelDelta: number, row: number, col: number) {
        // Calculate the new scale based on the wheel delta
        let newScale = this.grid.scale.x + wheelDelta * this.zoomSpeed * 0.008

        // Limit the scale to the minScale and maxScale values
        newScale = Math.max(this.minScale, Math.min(this.maxScale, newScale))

        // Update the scale of the 'board' container
        this.grid.scale.set(newScale)
        const adjustmentFactor = wheelDelta / 17000;
        this.grid.x -= col * this.appScreen.width * adjustmentFactor
        this.grid.y -= row * this.appScreen.height * adjustmentFactor


        console.log("scrolled ", row, col, wheelDelta)
    }

    moveGrid(deltaX: number, deltaY: number) {
        this.grid.x += deltaX
        this.grid.y += deltaY
    }

    setIsDragging(isDragging: boolean, x: number, y: number) {
        this.isDragging = isDragging
        this.dragPos.x = x
        this.dragPos.y = y
    }

    getIsDragging() {
        return this.isDragging
    }

    getDragPos() {
        return this.dragPos
    }

    getAppScreen() {
        return this.appScreen
    }

    getGrid() {
        return this.grid
    }
}

//class for mask
class Mask {
    private mask: Container = new Container()
    private appScreen: Rectangle
    private grid: HexGrid

    constructor(appScreen: Rectangle, grid: HexGrid) {
        this.appScreen = appScreen
        this.grid = grid
        const outerRect = new Graphics()
        outerRect.beginFill(myC.grey) // Red color for the outer rectangle
        outerRect.drawRect(0, 0, this.appScreen.width, this.appScreen.height)
        outerRect.endFill()
        outerRect.beginHole()
        outerRect.drawRect(100, 100, this.appScreen.width - 200, this.appScreen.height - 300)
        outerRect.endHole()
        this.mask.addChild(outerRect)
        //when mouse on, stop board movement
        outerRect.interactive = true
        outerRect.on('mouseenter', () => {
            this.grid.setIsDragging(false, 0, 0)
        })
    }

    getMask() {
        return this.mask
    }
}

//class for hitbox
class Hitbox {
    private hitbox: Container = new Container()
    private appScreen: Rectangle
    private grid: HexGrid

    constructor(appScreen: Rectangle, grid: HexGrid) {
        this.appScreen = appScreen
        this.grid = grid
        const rect = new Graphics()
        rect.beginFill(myC.white, 0.01)
        rect.drawRect(100, 100, this.appScreen.width - 200, this.appScreen.height - 300)
        this.hitbox.addChild(rect)

        this.hitbox.interactive = true
        //when mouse on, stop board movement
        this.hitbox.on('mouseenter', () => {
            this.grid.setIsDragging(false, 0, 0)
        })
    }

    getHitbox() {
        return this.hitbox
    }
}


//class for bar
class Bar {
    private bar: Container = new Container()
    private appScreen: Rectangle
    private select: Sprite
    private team1: Sprite
    private team2: Sprite
    private heart: Sprite
    private fire: Sprite
    private wall: Sprite
    private selectionStatus: number = 0

    constructor(appScreen: Rectangle) {
        this.appScreen = appScreen
        this.bar.x = this.appScreen.width * 0.1
        this.bar.y = this.appScreen.height * 0.8

        this.select = new Sprite(Texture.WHITE)
        this.select.tint = 0xFFFF00 // Yellow color for the select sprite
        this.select.anchor.set(0.05, 0.05)
        this.select.visible = false

        this.team1 = new Sprite(Texture.from("team select.png"))
        this.team1.tint = myC.pPink // Pink color for team1 icon

        this.team2 = new Sprite(Texture.from("team select.png"))
        this.team2.tint = myC.pBlue // Blue color for team2 icon

        this.heart = new Sprite(Texture.from("heart-plus.png"))

        this.fire = new Sprite(Texture.from("fire.png"))

        this.wall = new Sprite(Texture.from("defensive-wall.png"))

        this.select.width = this.appScreen.width * 0.11
        this.select.height = this.appScreen.width * 0.11
        this.team1.width = this.appScreen.width * 0.1
        this.team1.height = this.appScreen.width * 0.1
        this.team2.width = this.appScreen.width * 0.1
        this.team2.height = this.appScreen.width * 0.1
        this.heart.width = this.appScreen.width * 0.1
        this.heart.height = this.appScreen.width * 0.1
        this.fire.width = this.appScreen.width * 0.1
        this.fire.height = this.appScreen.width * 0.1
        this.wall.width = this.appScreen.width * 0.1
        this.wall.height = this.appScreen.width * 0.1

        this.team2.x = this.team1.width * 1.2
        this.heart.x = this.team1.width * 4.6
        this.fire.x = this.team1.width * 5.8
        this.wall.x = this.team1.width * 7

        this.bar.addChild(this.select, this.team1, this.team2, this.heart, this.fire, this.wall)


        this.team1.interactive = true
        this.team2.interactive = true
        this.heart.interactive = true
        this.fire.interactive = true;
        this.wall.interactive = true;

        this.team1.on("click", () => this.changeStatus(1))
        this.team2.on("click", () => this.changeStatus(2))
        this.heart.on("click", () => this.changeStatus(3))
        this.fire.on("click", () => this.changeStatus(4))
        this.wall.on("click", () => this.changeStatus(5))
    }



    private changeStatus(choice: number): void {
        if (choice === this.selectionStatus) {
            this.selectionStatus = 0
            this.select.visible = false
        } else {
            this.selectionStatus = choice
        }
        switch (this.selectionStatus) {
            case 1:
                this.select.x = 0
                this.select.visible = true
                break
            case 2:
                this.select.x = this.team1.width * 1.2
                this.select.visible = true
                break
            case 3:
                this.select.x = this.team1.width * 4.6
                this.select.visible = true
                break
            case 4:
                this.select.x = this.team1.width * 5.8
                this.select.visible = true
                break
            case 5:
                this.select.x = this.team1.width * 7
                this.select.visible = true
                break
            default:
                console.log("Invalid selection.")
                break
        }
    }

    getBar() {
        return this.bar
    }

    setSelection(selection: number) {
        this.selectionStatus = selection
        this.changeStatus(selection)
    }

    getSelection() {
        return (this.selectionStatus)
    }
}



export {
    myC,
    HexGrid,
    Mask,
    Bar,
    Hitbox
}