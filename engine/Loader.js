;(function () {
	'use strict'

	
	class Loader {
		constructor () {
			this.loadOrder = {
				images: [],
				jsons: []
			}
			this.resources = {
				images: [],
				jsons: []
			}
		}
		// метод добавляет в очередь на загрузку
		// метод принадлежит экзампляру класса
		addImage (name, src) {
			this.loadOrder.images.push({ name, src })
		}

		addJson (name, address) {
			this.loadOrder.jsons.push({ name, address })
		}

		// загрузка изображений
		load (callback) {
			const promises = []

			// проходим все изображения в очереда загрузки
			for (const imageData of this.loadOrder.images) {
				const { name, src } = imageData

				const promise = Loader
					.loadImage(src)
					.then(image => {
						// добавляем изображения в базу
						this.resources.images[name] = image

						// удаляем изображение из очереди загрузки
						if (this.loadOrder.images.includes(imageData)) {
							const index = this.loadOrder.images.indexOf(imageData)
							this.loadOrder.images.splice(index,1)
						}
					})
				promises.push(promise)
			}

			// проходим все json в очереда загрузки
			for (const jsonData of this.loadOrder.jsons) {
				const { name, address } = jsonData

				const promise = Loader
					.loadJson(address)
					.then(json => {
						// добавляем json в базу
						this.resources.jsons[name] = json

						// удаляем json из очереди загрузки
						if (this.loadOrder.jsons.includes(jsonData)) {
							const index = this.loadOrder.jsons.indexOf(jsonData)
							this.loadOrder.jsons.splice(index,1)
						}
					})
				promises.push(promise)
			}
			// ждём выполнения всех промисов
			Promise.all(promises).then(callback)
		}

		// метод загрузки изображения
		// static - метод принадлежит классу
		static loadImage (src) {
			return new Promise((resolve, reject) => {
				try {
					const image = new Image
					image.onload = () => resolve(image)
					image.src = src
				}

				catch (err) {
					reject(err)
				}
			})
		}

		// метод загрузки json
		static loadJson (address) {
			return new Promise((resolve, reject) => {
				fetch(address)
					.then(result => result.json())
					.then(result => resolve(result))
					.catch(err => reject(err))
			})
		}
	}
	
	// передаём класс в глобальный доступ
	window.GameEngine = window.GameEngine || {}
	window.GameEngine.Loader = Loader
})();