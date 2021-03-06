import { describe, it } from 'mocha'
import { expect } from 'chai'
import { Enemy } from '../../js/Enemy'
import { Game, Speed } from '../../js/constants'
import { Player } from '../../js/Player'

describe('enemy', () => {

   describe('move functionalities', () => {
      it('should be able to move', () => {
         const enemy = new Enemy(Game.col(1), Game.row(2), Speed.NORMAL)
         enemy.update(1)

         expect(enemy.x).to.not.equal(Game.col(1))
      })

      it('should be able to move very fast', () => {
         const enemy = new Enemy(Game.col(1), Game.row(2), Speed.VERY_FAST)
         enemy.update(1)

         expect(enemy.speed).to.equal(Speed.VERY_FAST)
      })

      it('should be able to move very slow', () => {
         const enemy = new Enemy(Game.col(1), Game.row(2), Speed.VERY_SLOW)
         enemy.update(1)

         expect(enemy.speed).to.equal(Speed.VERY_SLOW)
      })

      it('should cross the screen when disappear in the right boundary', () => {
         const enemy = new Enemy(Game.col(5), Game.row(2), Speed.NORMAL)

         enemy.update(1)

         expect(enemy.speed).to.equal(400)
         expect(enemy.x).to.equal(Math.abs(Game.col(6) - Game.col(5) - 400))
      })
   })

   describe('collision detection', () => {
      it('should not collide when player is not in the same row', () => {
         const enemy = new Enemy(Game.col(1), Game.row(2), Speed.FAST)
         const player = new Player(Game.col(1), Game.row(3))

         const collides = enemy.checkCollision(player)
         expect(collides).to.be.false
      })

      it('should not collide when player isn\'t close enough', () => {
         const enemy = new Enemy(Game.col(2), Game.row(2), Speed.FAST)
         const player = new Player(Game.col(1), Game.row(2))

         const collides = enemy.checkCollision(player)
         expect(collides).to.be.false
      })

      it('should collide when player meets enemy in the same position', () => {
         const enemy = new Enemy(Game.col(2), Game.row(2), Speed.FAST)
         const player = new Player(Game.col(2), Game.row(2))

         const collides = enemy.checkCollision(player)
         expect(collides).to.be.true
      })

      it('should collide when player is less than 12px closer to the enemy', () => {
         const enemy = new Enemy(200, Game.row(3), Speed.FAST)
         const player = new Player(212, Game.row(3))

         const collides = enemy.checkCollision(player)
         expect(collides).to.be.true
      })

      it('should collide when player is more than 13px far away from the enemy', () => {
         const enemy = new Enemy(187, Game.row(3), Speed.FAST)
         const player = new Player(200, Game.row(3))

         const collides = enemy.checkCollision(player)
         expect(collides).to.be.false
      })
   })

})