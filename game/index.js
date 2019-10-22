const DEBUG_MODE = true

const { Body, Game, Scene, ArcadePhysics, Util, Point } = GameEngine

const mainScene = new Scene({
    name: 'mainScene',
    autoStart: true,

    loading (loader) {
        loader.addImage('spriteSheet', 'static/Battle City Sprites.png')
        loader.addImage('road', 'static/road.png')
        loader.addImage('carOrange', 'static/carOrange.png')
        loader.addImage('carBlue', 'static/carBlue.png')
        loader.addJson('atlas', 'static/atlas.json')
        loader.addJson('carAtlas', 'static/carAtlas.json')
    },

    init () {
		const roadTexture = this.parent.loader.getImage('road')
		const carBlueTexture = this.parent.loader.getImage('carBlue')

		Car.texture = this.parent.loader.getImage('carOrange')
		Car.atlas = this.parent.loader.getJson('carAtlas')

        // Tank.texture = this.parent.loader.getImage('spriteSheet')
        // Tank.atlas = this.parent.loader.getJson('atlas')

        // Bullet.texture = this.parent.loader.getImage('spriteSheet')
        // Bullet.atlas = this.parent.loader.getJson('atlas')

		this.arcadePhysics = new ArcadePhysics

		this.road = new Body(roadTexture,{
            x: 0,
            y: 0,
		})
		
		this.road2 = new Body(roadTexture,{
            x: 0,
            y: 0 - this.parent.renderer.canvas.height,
        })
		
		this.carOrange = new Car({
            x: this.parent.renderer.canvas.width / 2,
            y: this.parent.renderer.canvas.height - 100,
		})

		
		// this.tank1 = new Tank({
			//     debug: DEBUG_MODE,
			//     x: this.parent.renderer.canvas.width / 2,
			//     y: this.parent.renderer.canvas.height / 2 + 100,
		// })
			
		// this.tank2 = new Tank({
			//     debug: DEBUG_MODE,
			//     x: this.parent.renderer.canvas.width / 2,
			//     y: this.parent.renderer.canvas.height / 2,
		// })
		
		this.add(this.road, this.road2, this.carOrange)
		this.arcadePhysics.add(this.carOrange)
		this.competitorElements = []
		
		const positionsX = [135, 210, 290, 365]
		const positionsY = [150, 200, 250, 300, 350, 400, 450, 500]

		for (let i = 0, yPos = 200; i < 200; i++) {
			this.competitor = new Body(carBlueTexture,{
				anchorX: 0.5,
				anchorY: 0.5,
				x: positionsX[getRandom(0, 3)],
				y: yPos
			})
			yPos -= positionsY[getRandom(0, 7)]
			this.add(this.competitor)
			this.arcadePhysics.add(this.competitor)
			this.competitorElements.push(this.competitor)
		}

		// this.add(this.tank1, this.tank2, this.carOrange)
		// this.arcadePhysics.add(this.tank1, this.tank2)

		// this.arcadePhysics.add(new Body(null, {
		//     static: true,
		//     x: -10,
		//     y: -10,
		//     width: this.parent.renderer.canvas.width + 20,
		//     height: 10
		// }))

		this.arcadePhysics.add(new Body(null, {
				static: true,
				x: 80,
				y: -10,
				width: 10,
				height: this.parent.renderer.canvas.height + 20
		}))
				
		this.arcadePhysics.add(new Body(null, {
			static: true,
			x: this.parent.renderer.canvas.width - 80,
			y: -10,
			width: 10,
			height: this.parent.renderer.canvas.height + 20
		}))

		// this.arcadePhysics.add(new Body(null, {
		// 	static: true,
		// 	x: -10,
		// 	y: this.parent.renderer.canvas.height,
		// 	width: this.parent.renderer.canvas.width + 20,
		// 	height: 10
		// }))

		function getRandom(min, max) {
			return Math.floor(Math.random() * (max + 1 - min)) + min;
		}

    },

    update (timestamp) {
		const { keyboard } = this.parent

		for ( let i = 0; i < this.competitorElements.length; i++) {
			this.competitorElements[i].y -= 10
		}

		this.carOrange.movementUpdate(keyboard)	
		this.road.speed = this.road.speed || 0
		this.carOrange.roadSpeed = this.carOrange.roadSpeed || 0

		if (keyboard.arrowUp && this.carOrange.roadSpeed < 40) {
			this.carOrange.roadSpeed += 1 
			
		} else if (keyboard.arrowDown && this.carOrange.roadSpeed > 0) {
			this.carOrange.roadSpeed -= 3
		}
		else if (this.carOrange.roadSpeed > 0) {
			this.carOrange.roadSpeed -= 1
		} else if ( this.carOrange.roadSpeed < 0) {
			this.carOrange.roadSpeed = 0
		}

		this.road.y += this.carOrange.roadSpeed / 3
		this.road2.y += this.carOrange.roadSpeed / 3

		for ( let i = 0; i < this.competitorElements.length; i++) {
			this.competitorElements[i].y += this.carOrange.roadSpeed / 3
		}

		if (this.road.y > this.parent.renderer.canvas.width ) {
			this.road.y = 0
			this.road2.y = 0 - this.parent.renderer.canvas.width
		}

        // this.tank1.movementUpdate(keyboard)

        // if (keyboard.space && Util.delay('tank' + this.tank1.uid, Tank.BULLET_TIMEOUT)) {
        //     const bullet = new Bullet({
        //         debug: DEBUG_MODE,
        //         x: this.tank1.x,
        //         y: this.tank1.y
        //     })

        //     this.tank1.bullets.push(bullet)
        //     bullet.tank = this.tank1

        //     if (this.tank1.animation === 'moveUp') {
        //         bullet.velocity.y -= Bullet.NORMAL_SPEED
        //         bullet.setFrameByKeys('bullet', 'up')
        //     }
            
        //     this.add(bullet)
        //     this.arcadePhysics.add(bullet)
        // }

        this.arcadePhysics.processing()

        // for (const tank of [this.tank1, this.tank2]) {
        //     for (const bullet of tank.bullets) {
        //         if (bullet.toDestroy) {
        //             bullet.destroy()
        //         }
        //     }
        // }
    }

    // init () {
    //     Man.texture = this.parent.loader.getImage('man')
    //     Man.atlas = this.parent.loader.getJson('manAtlas')

    //     this.arcadePhysics = new ArcadePhysics

    //     this.man1 = new Man({
    //         x: this.parent.renderer.canvas.width / 2 - 100,
    //         y: this.parent.renderer.canvas.height / 2,
    //     })

    //     this.man2 = new Man({
    //         x: this.parent.renderer.canvas.width / 2 + 100,
    //         y: this.parent.renderer.canvas.height / 2,
    //     })

    //     this.add(this.man1, this.man2)
    //     this.arcadePhysics.add(this.man1, this.man2)
    // },

    // update (timestamp) {
    //     const { keyboard } = this.parent

    //     this.man1.velocity.x = 0        
    //     this.man1.velocity.y = 0

    //     this.man2.velocity.x = 0        
    //     this.man2.velocity.y = 0

    //     if (keyboard.arrowLeft) {
    //         this.man1.velocity.x = -2

    //         if (this.man1.animation !== 'moveLeft') {
    //             this.man1.startAnimation('moveLeft')
    //         }
    //     }
        
    //     else if (keyboard.arrowDown) {
    //         this.man1.velocity.y = +2

    //         if (this.man1.animation !== 'moveDown') {
    //             this.man1.startAnimation('moveDown')
    //         }
    //     }

    //     else if (keyboard.arrowRight) {
    //         this.man1.velocity.x = 2
    //     }

    //     else if (keyboard.arrowUp) {
    //         this.man1.velocity.y = -2
    //     }

    //     else if (this.man1.animation === 'moveDown') {
    //         this.man1.startAnimation('stayDown')
    //     }

    //     this.arcadePhysics.processing()
    // }
})

const game = new Game({
    el: document.body,
    width: 500,
    height: 500,
    background: 'gray',
    scenes: [mainScene]
})