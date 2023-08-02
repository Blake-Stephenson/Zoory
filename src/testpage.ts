/*
 * File: GUI.ts
 * Author: Blake Stephenson
 * Created: 2023-07-25
 * Description: This page is useless
 */

import {
    Graphics,
    Container
} from 'pixi.js'

import {
    app,
    
} from './index'

import {
    myC
} from './GUI'

//testing area
const testZone = new Container()

testZone.visible = true


//draw a hexagon
const drawHexagon = (x: number, y: number, size: number) => {
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
	graphics.tint = myC.pBlue
	//testZone.addChild(graphics)
}




let foo = 30
drawHexagon(0, 0, foo)
drawHexagon(foo * 1.5, 0, foo)
drawHexagon(foo * 0.75, foo * 1.3, foo)

export {
    testZone
}