;(function () {
	'use strict'

	// отрисовывает конкретный элемент
	class Sprite {
		constructor (texture, args = {}) {
			this.texture = texture

			const frame = args.frame || {}

			// задаём размеры части изображения
			this.frame = {
				x: frame.x || 0,
				y: frame.y || 0,
				width: frame.width || texture.width,
				height: frame.height || texture.height
			}

			this.x = args.x || 0
			this.y = args.y || 0
			// задаём координаты якоря изображения
			this.anchorX = args.anchorX || 0
			this.anchorY = args.anchorY || 0
			this.width = args.width || this. frame.width
			this.height =  args.height || this.frame.height

			if (args.scale !== undefined) {
				this.setScale(args.scale)
			}
		}

		// устанавливаем масштаб для обоих осей
		setScale (value) {
			this.scaleX = value
			this.scaleY = value
		}

		// получаем абсолютные значения положения изображения
		// для позиционирования по якорю
		get absoluteX () {
			return this.x - this.anchorX * this.width
		}

		set absoluteX (value) {
			this.x = value + this.anchorX * this.width
			return value
		}
		
		get absoluteY () {
			return this.y - this.anchorY * this.height
		}
		
		set absoluteY (value) {
			this.y = value + this.anchorY * this.height
			return value
		}

		// задаём геттеры и сеттеры (функции, могут вычисляться на лету)
		get scaleX () {
			return this.width / this.frame.width
		}

		set scaleX (value) {
			this.width = this.frame.width * value
			return value
		}

		get scaleY () {
			return this.height / this.frame.height
		}

		set scaleY (value) {
			this.height = this.frame.height * value
			return value
		}

		
		draw ( canvas, context) {
			context.drawImage(
				this.texture,
				this.frame.x,
				this.frame.y,
				this.frame.width,
				this.frame.height,
				this.absoluteX,
				this.absoluteY,
				this.width,
				this.height
			)
		}
	}

	// передаём класс в глобальный доступ
	window.GameEngine = window.GameEngine || {}
	window.GameEngine.Sprite = Sprite
})();