const { Body, Game, Scene, Point, Line, Container } = GameEngine

const mainScene = new Scene({
	// имя сцены
    name: 'mainScene',
    autoStart: false,

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
		// const point = new Point({
		// 	x: this.bunny.x,
		// 	y: this.bunny.y
		// })

		// graphicContainer(this.bunny, point)

        // this.add(this.bunny, point)
		this.add(this.bunny)
		
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

        if (keyboard.arrowUp) {
            this.bunny.rotation += speedRotation
        }

        if (keyboard.arrowDown) {
            this.bunny.rotation -= speedRotation
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
            scale: 1,
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.parent.renderer.canvas.width / 2,
            y: this.parent.renderer.canvas.height / 2,
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
		background: 'white',
		// массив сцен
    scenes: [beginScene]
})