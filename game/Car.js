class Car extends GameEngine.Body {
	constructor (originalArgs = {}) {
			const args = Object.assign({
					anchorX: 0.5,
					anchorY: 0.5
			}, originalArgs)

			super(Car.texture, args)

			this.on('collision', (a, b) => {
					a.velocity.x = 0
					if ( !b.static) {
						a.roadSpeed = 0
					} 
			})
	}

	movementUpdate (keyboard) {
			this.velocity.x = 0
			this.velocity.y = 0

			if (keyboard.arrowLeft) {
					this.velocity.x = -Car.NORMAL_SPEED
			}
			
			else if (keyboard.arrowRight) {
					this.velocity.x = Car.NORMAL_SPEED            
			}
	}
}

Car.texture = null
Car.atlas = null

Car.NORMAL_SPEED = 2
Car.BULLET_TIMEOUT = 1000