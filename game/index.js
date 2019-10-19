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
			debug: true,
			// задаём какая часть теля будет реагировать на столкновение
            body: {
                x: 0,
                y: 0.5,
                width: 1,
                height: 0.5
            }
		})
		// console.log(this.bunny.body)
		
		// задаём не через this, поэтому манипулировать с элементом нельзя
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
		// console.log(this)
		// console.log(this.point.speedMove)
		this.point.timeMemoryBack = this.point.timeMemoryBack || {left: 0, right: 0, up: 0, down: 0}
		this.point.timeMemoryForward = this.point.timeMemoryForward || {left: 0, right: 0, up: 0, down: 0}
		this.point.speedMoveForward = this.point.speedMoveForward || {left: 0, right: 0, up: 0, down: 0}
		this.point.speedMoveBack = this.point.speedMoveBack || {left: 0, right: 0, up: 0, down: 0}
		this.point.speedMove = this.point.speedMove || {left: 0, right: 0, up: 0, down: 0}
		this.point.speedMoveForwardBack = this.point.speedMoveForwardBack || {left: 0, right: 0, up: 0, down: 0}
		this.point.startSpeed = this.point.startSpeed || {left: 0, right: 0, up: 0, down: 0}

		
		let speedRotation = keyboard.space ? Math.PI / 100 : Math.PI / 200
		// let pointSpeedDown = keyboard.arrowDown ? 
		// this.point.timeMemory = this.point.timestamp || timestamp
		// this.point.speedMoveDown = timestamp - this.point.timeMemory
		
		if (this.point.y < 50) {
			// this.point.y = 50
			// this.point.speedMove.up *= -1
			// console.log(this.point.speedMove.up)
		}
		
		if (keyboard.arrowUp) {
			this.point.y -= movePointForvard('up', this)
		} else if (this.point.speedMoveForward.up && this.point.speedMove.up > 0) {
			this.point.y -= movePointBack('up', this)
		} 
		
		if (keyboard.arrowDown) {
			this.point.y += movePointForvard('down', this)
		} else if (this.point.speedMoveForward.down && this.point.speedMove.down > 0) {
			this.point.y += movePointBack('down', this)
		} 

		if (keyboard.arrowRight) {
			this.point.x += movePointForvard('right', this)
		} else if (this.point.speedMoveForward.right && this.point.speedMove.right > 0) {
			this.point.x += movePointBack('right', this)
		} 

		if (keyboard.arrowLeft) {
			this.point.x -= movePointForvard('left', this)
		} else if (this.point.speedMoveForward.left && this.point.speedMove.left > 0) {
			this.point.x -= movePointBack('left', this)
		} 

		function movePointForvard (direction, scene) {
			scene.point.timeMemoryBack[direction] = null
			scene.point.timeMemoryForward[direction] = scene.point.timeMemoryForward[direction] || timestamp
			scene.point.speedMoveForward[direction] = timestamp - scene.point.timeMemoryForward[direction] + scene.point.startSpeed[direction] * 500
			scene.point.speedMove[direction] = scene.point.speedMoveForward[direction] / 500
			return scene.point.speedMove[direction]
		}

		function movePointBack (direction, scene) {
			scene.point.timeMemoryForward[direction] = null
			scene.point.timeMemoryBack[direction] = scene.point.timeMemoryBack[direction] || timestamp
			scene.point.speedMoveBack[direction] = scene.point.speedMove[direction] > 0 ? timestamp - scene.point.timeMemoryBack[direction] : 0
			scene.point.speedMove[direction] = (scene.point.speedMoveForward[direction] - scene.point.speedMoveBack[direction]) / 500
			scene.point.startSpeed[direction] = scene.point.speedMove[direction]
			return scene.point.speedMove[direction]
		}

    }
})

const beginScene = new Scene({
	name: 'beginScene',
	autoStart: false,

	loading (loader) {
        loader.addImage('start', 'static/start.jpg')
	},

	init () {
		const startButtonTexture = this.parent.loader.getImage('start')

		this.start = new Body(startButtonTexture, {
            // scale: 1.5,
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
		if (keyboard.anyCode) {
			game.addScene(mainScene)
			game.finishScene(beginScene)
			game.startScene(mainScene)
		}
    }

})



// экземпляр класса Game
const game = new Game({
    el: document.body,
    width: 500,
    height: 500,
		background: 'green',
		// массив сцен
    scenes: [mainScene, beginScene]
})