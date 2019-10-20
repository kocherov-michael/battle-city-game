const { Body, Game, Scene, Point, Line, Container } = GameEngine

const mainScene = new Scene({
	// имя сцены
    name: 'mainScene',
		autoStart: true,

	// загружаем ресурсы используемые в сцене
    loading (loader) {
        loader.addImage('bunny', 'static/bunny.jpeg')
        loader.addJson('persons', 'static/persons.json')
	},
	


	// создаём спрайт единожды
    init () {
		const bunnyTexture = this.parent.loader.getImage('bunny')
		// создаём контейнер для добавления в него элементов, которые необходимо отрисовать последними
		// const graphicContainer = new Container

        this.bunny = new Body(bunnyTexture, {
            scale: 0.25,
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.parent.renderer.canvas.width / 2,
            y: this.parent.renderer.canvas.height / 2,
			debug: false,
			// задаём какая часть теля будет реагировать на столкновение
            body: {
                x: 0,
                y: 0.5,
                width: 1,
                height: 0.5
            }
		})
		// console.log(this.bunny.body)
		
		// если задаём не через this, поэтому манипулировать с элементом нельзя
		this.point = new Point({
			// x: 10,
			// y: 10
			x: this.parent.renderer.canvas.width / 2,
            y: this.parent.renderer.canvas.height / 2
		})

		// graphicContainer(this.bunny, point)

		this.add(this.point)
		// this.add(this.bunny, point)
		// this.add(this.bunny)
		
		// отрисовываем элементы из graphicContainer в последнюю очередь
		// this.add(graphicContainer)
		


	},
	
	// удаляем отжившие сцены
	// beforeDestroy () {
	// 	delete this.bunny
	// },

	// манипуляция спрайтом
    update (timestamp) {
		const { keyboard } = this.parent

		
		let speedRotation = keyboard.space ? Math.PI / 100 : Math.PI / 200
		// let pointSpeedDown = keyboard.arrowDown ? 
		
    }
})

const tankScene = new Scene({
	name: 'tankScene',
	autoStart: false,

	loading (loader) {
		loader.addImage('tank', 'static/tank.jpg')
		loader.addImage('bonus', 'static/bonus.jpg')
		loader.addImage('wall', 'static/wall.jpg')
	},

	init () {
		const tankTexture = this.parent.loader.getImage('tank')

		this.tank = new Body(tankTexture, {
			scale: 1,
			anchorX: 0.5,
			anchorY: 0.5,
			x: 30,
			y: 30,
			// width: this.parent.renderer.canvas.width,
			// height: this.parent.renderer.canvas.height,
			debug: true,
			body: {
				x: 0,
				y: 0,
				width: 1,
				height: 1
			}
			
		})
		this.add(this.tank)

		const bonusTexture = this.parent.loader.getImage('bonus')

		this.bonus = new Body(bonusTexture, {
			scale: 1,
			anchorX: 0.5,
			anchorY: 0.5,
			x: this.parent.renderer.canvas.width - 30,
			y: this.parent.renderer.canvas.height - 30,
			
		})
		this.add(this.bonus)

		const wallPosition = [
			{x: 50, y: 300},
			{x: 100, y: 100},
			{x: 100, y: 150},
			{x: 100, y: 200},
			{x: 100, y: 300},
			{x: 100, y: 350},
			{x: 100, y: 450},
			{x: 150, y: 100},
			{x: 150, y: 350},
			{x: 150, y: 450},
			{x: 200, y: 200},
			{x: 200, y: 250},
			{x: 200, y: 350},
			{x: 200, y: 450},
			{x: 250, y: 50},
			{x: 250, y: 100},
			{x: 250, y: 150},
			{x: 250, y: 200},
			{x: 250, y: 450},
			{x: 300, y: 200},
			{x: 300, y: 300},
			{x: 300, y: 350},
			{x: 300, y: 400},
			{x: 300, y: 450},
			{x: 350, y: 100},
			{x: 350, y: 300},
			{x: 400, y: 100},
			{x: 400, y: 150},
			{x: 400, y: 200},
			{x: 400, y: 300},
			{x: 400, y: 400},
			{x: 400, y: 450},
			{x: 400, y: 500}
		]

		for (let i = 0; i < wallPosition.length; i++) {
			addWall(wallPosition[i].x-22, wallPosition[i].y -22, this)
			console.log(wallPosition[i])
		}

		function addWall (xPosition, yPosition, scene) {
			const wallTexture = scene.parent.loader.getImage('wall')

			scene.wall = new Body(wallTexture, {
				scale: 1,
				anchorX: 0.5,
				anchorY: 0.5,
				x: xPosition,
				y: yPosition,
				// width: this.parent.renderer.canvas.width,
				// height: this.parent.renderer.canvas.height,
				debug: false,
				body: {
					x: 0,
					y: 0,
					width: 0,
					height: 0
				}
				
			})
			scene.add(scene.wall)
		}
	},
	
	update () {
		const myTank = this.displayObjects[0]
		
		const { keyboard } = this.parent
		let moveRight = true
		let moveLeft = true
		let moveUp = true
		let moveDown = true

		for ( let i = 1; i <this.displayObjects.length; i++) {
			const compareRight = (this.displayObjects[i].x > myTank.x && Math.abs(this.displayObjects[i].x - myTank.x) < 50 && Math.abs(this.displayObjects[i].y - myTank.y) < 49)
			const compareDown = (this.displayObjects[i].y > myTank.y && Math.abs(this.displayObjects[i].y - myTank.y) < 50 && Math.abs(this.displayObjects[i].x - myTank.x) < 49)
			const compareLeft = (this.displayObjects[i].x < myTank.x && Math.abs(myTank.x - this.displayObjects[i].x) < 50 && Math.abs(myTank.y - this.displayObjects[i].y) < 49)
			const compareup = (this.displayObjects[i].y < myTank.y && Math.abs(myTank.y - this.displayObjects[i].y) < 50 && Math.abs(myTank.x - this.displayObjects[i].x) < 49)
			if (compareRight) {
				moveRight = false
			}
			if (compareDown) {
				moveDown = false
			}
			if (compareLeft) {
				moveLeft = false
			}
			if (compareup ) {
				moveUp = false
			}

		}

		if (keyboard.arrowUp) {
			this.tank.rotation = Math.PI / 2
			if (moveUp && this.tank.y - this.tank.height / 2 > 0) {
				this.tank.y -= 1
			}
		}

		else if (keyboard.arrowDown) {
			this.tank.rotation = Math.PI * 3 / 2
			if (moveDown && this.tank.y + this.tank.height / 2 < this.parent.renderer.canvas.height) {
				this.tank.y += 1
			}
		}

		else if (keyboard.arrowRight) {
			this.tank.rotation = 0
			if ( moveRight && this.tank.x + this.tank.width / 2 < this.parent.renderer.canvas.width) {
				this.tank.x += 1
			}
		}

		else if (keyboard.arrowLeft) {
			this.tank.rotation = Math.PI
			if (moveLeft && this.tank.x - this.tank.width / 2 > 0) {
				this.tank.x -= 1
			}
		}

		if (this.tank.x > this.parent.renderer.canvas.width - 80 && this.tank.y > this.parent.renderer.canvas.height -80) {
			game.addScene(finalScene)
			game.finishScene(tankScene)
			game.startScene(finalScene)
		}

	}



})

const beginScene = new Scene({
	name: 'beginScene',
	autoStart: true,

	loading (loader) {
        loader.addImage('start', 'static/start.jpg')
	},

	init () {
		const startButtonTexture = this.parent.loader.getImage('start')

		this.start = new Body(startButtonTexture, {
			anchorX: 0.5,
			anchorY: 0.5,
			x: this.parent.renderer.canvas.width / 2,
			y: this.parent.renderer.canvas.height / 2,
			width: this.parent.renderer.canvas.width,
			height: this.parent.renderer.canvas.height,
			debug: false,
		})
		this.add(this.start)
	},

	update () {
		const { keyboard } = this.parent
		if (keyboard.space) {
			game.addScene(tankScene)
			game.finishScene(beginScene)
			game.startScene(tankScene)
		}
	}

})

const finalScene = new Scene({
	name: 'finalScene',
	autoStart: false,

	loading (loader) {
        loader.addImage('final', 'static/final.jpg')
	},

	init () {
		const finalTexture = this.parent.loader.getImage('final')

		this.final = new Body(finalTexture, {
			anchorX: 0.5,
			anchorY: 0.5,
			x: this.parent.renderer.canvas.width / 2,
			y: this.parent.renderer.canvas.height / 2,
			width: this.parent.renderer.canvas.width,
			height: this.parent.renderer.canvas.height,
			debug: false,
		})
		this.add(this.final)
	}

})



// экземпляр класса Game
const game = new Game({
    el: document.body,
    width: 465,
    height: 500,
		background: 'black',
		// массив сцен
    scenes: [beginScene]
})