;(function () {
	'use strict'

	// класс контейнер хранит список изображений, 
	//которые нужно отрисовать
	class Container extends GameEngine.DisplayObject {
		constructor (args = {}) {
			//Наследуем поля от родителя
			super(args)

			this.displayObjects = []

			// удаляем width и heigth из Container
			delete this.width
			delete this.height
		}
		

		// добавляем объект в массив, если его там ещё нет
		add (displayObject) {
			if (!this.displayObjects.includes(displayObject)) {
				this.displayObjects.push(displayObject)
				displayObject.setParent(this)
			}
		}
		remove (displayObject) {
			if (this.displayObjects.includes(displayObject)) {
				const index = this.displayObjects.indexOf(displayObject)
				this.displayObjects.splice(index, 1)
				displayObject.setParent(null)
			}
		}

		// вызывает метод draw у дочерних элементов
		draw (canvas, context) {
			// сохраняем контекст
			context.save()
			context.translate(this.x, this.y)
			context.rotate(-this.rotation)
			context.scale(this.scaleX, this.scaleY)

			for (const displayObject of this.displayObjects) {
				displayObject.draw(canvas, context)
			}

			// восстанавливаем контекст
			context.restore()
		}
	}

	// передаём класс в глобальный доступ
	window.GameEngine = window.GameEngine || {}
	window.GameEngine.Container = Container
})();