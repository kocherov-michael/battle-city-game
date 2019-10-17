;(function () {
	'use strict'

	// класс отвечает за функции для рисования
	class Renderer {
		constructor (args = {}) {
			this.canvas = document.createElement('canvas')
			this.context = this.canvas.getContext('2d')

			this.background = args.background || 'black'
			// задаём ширину и высоту (50 по умолчанию)
			this.canvas.width = args.width || 50
			this.canvas.height = args.height || 50
			this.update = args.update || (() => {})

			this.stage = new GameEngine.Container()

			requestAnimationFrame(timestamp => this.tick(timestamp))

		}

		tick (timestamp) {
			this.update(timestamp)
			
			this.clear ()
			this.render()

			requestAnimationFrame(timestamp => this.tick(timestamp))
		}

		// возвращщает все displayObjet всех контейнеров
		get displayObjects () {
			return _getDisplayObjects(this.stage)

			function _getDisplayObjects (container, result = []) {
				for (const displayObject of container.displayObjects)	{
					// если displayObject тоже является контейнером,
					// то ищем и в нём тоже
					if (displayObject instanceof GameEngine.Container) {
						_getDisplayObjects(displayObject, result)
					}
					else {
						result.push(displayObject)
					}
				}
				return result
			}
		}

		// инициируем отрисовку
		render () {
			this.stage.draw(this.canvas, this.context)
		}

		draw (callback) {
			callback(this.canvas, this.context)
		}

		// очищаем канвас
		clear () {
			this.context.fillStyle = this.background
			this.context.beginPath()
			this.context.rect(0,0, this.canvas.width, this.canvas.height)
			this.context.fill()
		}
	}


	// передаём класс в глобальный доступ
	window.GameEngine = window.GameEngine || {}
	window.GameEngine.Renderer = Renderer
})();