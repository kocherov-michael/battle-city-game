;(function () {
    'use strict'

	// отслеживаем нажатые клавиши
    class Keyboard {
        constructor () {
			// задаём контекст для keyboard для функции обработчика событий
            const keyboard = this

            this.arrowUp = false
            this.arrowDown = false
            this.arrowLeft = false
            this.arrowRight = false
						this.space = false
						this.anyCode = false

            document.body.addEventListener('keydown', function (event) {
						keyboard.anyCode = true
							switch (event.code) {
								case "ArrowUp":
									keyboard.arrowUp = true
									break
								
								case "ArrowDown":
									keyboard.arrowDown = true
									break
								
								case "ArrowRight":
									keyboard.arrowRight = true
									break
								
								case "ArrowLeft":
									keyboard.arrowLeft = true
									break

								case "Space":
									keyboard.space = true
									break
								
								case "Enter":
									keyboard.enter = true
									break
                }
            })

            document.body.addEventListener('keyup', function (event) {
						keyboard.anyCode = false
                switch (event.code) {
									case "ArrowUp":
										keyboard.arrowUp = false
										break
								
									case "ArrowDown":
										keyboard.arrowDown = false
										break
									
									case "ArrowRight":
										keyboard.arrowRight = false
										break
									
									case "ArrowLeft":
										keyboard.arrowLeft = false
										break

									case "Space":
										keyboard.space = false
										break
									case "Enter":
										keyboard.enter = false
										break
                }
            })
        }
    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Keyboard = Keyboard
})();