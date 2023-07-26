/*
 * File: index.ts
 * Author: Blake Stephenson
 * Created: 2023-07-25
 */

import {
	Application,
	Container,
} from 'pixi.js'

import {
	//testZone
} from "./testpage"

import {
	HexGrid,
	Mask,
	Bar
} from './GUI'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x420420,
	width: 1280,
	height: 720
})

//make tool bar
const bar = new Bar(app.screen)

//create board, contains grid
const board = new Container()
let grid = new HexGrid(4,8,bar)
board.addChild(grid.getGrid())

//crreate mask
const mask = new Mask(app.screen)

//add to app, board<mask<toolbar
app.stage.addChild(board)
app.stage.addChild(mask.getMask())
app.stage.addChild(bar.getBar())

export {
	app,
	board,
	mask,
	bar
}