;(function () {
	'use strict'

	// класс контейнер хранит список изображений, 
	//которые нужно отрисовать
	class Container {
		constructor () {
			this.displayObjects = []
		}
		

		// добавляем объект в массив, если его там ещё нет
		add (displayObject) {
			if (!this.displayObjects.includes(displayObject)) {
				this.displayObjects.push(displayObject)
			}
		}
		remove () {

		}

		// вызывает метод draw у дочерних элементов
		draw (canvas, context) {
			for (const displayObject of this.displayObjects) {
				displayObject.draw(canvas, context)
			}
		}
	}

	// передаём класс в глобальный доступ
	window.GameEngine = window.GameEngine || {}
	window.GameEngine.Container = Container
})();