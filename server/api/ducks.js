const router = require('express').Router()
const { Duck } = require('../db/models')
module.exports = router

// '/api/ducks' routes

router.get('/', async (req, res, next) => {
  try {
    const ducks = await Duck.findAll({})
    res.json(ducks)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    await Duck.create(req.body)
  } catch (err) {
    next(err)
  }
})


router.get('/:userId', async (req, res, next) => {
  try {
    let userId = req.params.userId
    const ducks = await Duck.findAll({
      where: {
        userId: userId
      }
    })
    res.json(ducks)
  } catch (err) {
    next(err)
  }
})


router.get('/oneDuck/:duckId', async (req, res, next) => {
  try {
    let duckId = req.params.duckId
    const duck = await Duck.findAll({
      where: {
        id: duckId
      }
    })
    res.json(duck)
  } catch (err) {
    next(err)
  }
})

router.patch('/oneDuck/:duckId', async (req, res, next) => {
  try {
    const { duckId } = req.params
    let duck = await Duck.findByPk(duckId)
    await duck.update({
      name: req.body.duckName,
      color: req.body.duckColor
    })
    res.json(duck)
  } catch (err) {
    next(err)
  }
})

router.delete('/oneDuck/:duckId', async (req, res, next) => {
  try {
    const { duckId } = req.params
    const duck = await Duck.findByPk(duckId)
    await duck.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})


