;(function () {
    'use strict'

		// бизнес класс
    class Game {
        constructor (args = {}) {
            this.renderer = new GameEngine.Renderer(args)
            this.loader = new GameEngine.Loader()
            this.scenesCollection = new GameEngine.Container()
            this.keyboard = new GameEngine.Keyboard()

						// если есть сцена, то добавляем в коллекцию
            if (args.scenes) {
                this.addScene(...args.scenes)
            }

						// Добавляем точку монтирования, если она есть
            if (args.el && args.el.appendChild) {
                args.el.appendChild(this.renderer.canvas)
            }

						// создаём массив со сценами с автостартом
            const autoStartedScenes = this.scenes.filter(x => x.autoStart)

            for (const scene of autoStartedScenes) {
                scene.status = 'loading'
                scene.loading(this.loader)
            }

						// запускаем у всех сцен с автостартом init и update
            this.loader.load(() => {
                for (const scene of autoStartedScenes) {
                    scene.status = 'init'
                    scene.init()
                }

                for (const scene of autoStartedScenes) {
                    scene.status = 'started'
                }
            })

            requestAnimationFrame(timestamp => this.tick(timestamp))
        }

		// создаём контекст
        addScene (...scenes) {
            this.scenesCollection.add(...scenes)

            for (const scene of scenes) {
                scene.parent = this
            }
        }

        get scenes () {
            return this.scenesCollection.displayObjects
        }

        tick (timestamp) {
						// выбираем сцены, которые успели стартовать
            const startedScenes = this.scenes.filter(x => x.status === 'started')

						// задаём сценам время с начала работы
            for (const scene of startedScenes) {
                scene.update(timestamp)
            }
            
            this.renderer.clear()

            for (const scene of startedScenes) {
                scene.draw(this.renderer.canvas, this.renderer.context)
            }

						// перерегистрируем вызов тика
            requestAnimationFrame(timestamp => this.tick(timestamp))
        }

        getScene (name) {
			// проверяем присутствует ли GameEngine.Scene в цепочке прототипов name
			// если name - объект, возвращаем его
            if (name instanceof GameEngine.Scene) {
                if (this.scenes.includes(name)) {
                    return name
                }
            }

			// если name - строка, возвращаем объект с именем name
            if (typeof name === 'string') {
                for (const scene of this.scenes) {
                    if (scene.name === name) {
                        return scene
                    }
                }
            }
        }

        startScene (name) {
            const scene = this.getScene(name)

            if (!scene) {
                return false
            }
            
            scene.status = 'loading'
            scene.loading(this.loader)

            this.loader.load(() => {
                scene.status = 'init'
                scene.init()

                scene.status = 'started'
            })

            return true
        }

        finishScene (name) {
            const scene = this.getScene(name)

            if (!scene) {
                return false
            }

            scene.status = 'finished'
            this.scenesCollection.remove(scene)
            scene.beforeDestroy()

        }
    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Game = Game
})();