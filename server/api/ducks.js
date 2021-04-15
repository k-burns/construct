const router = require('express').Router()
const {Duck} = require('../db/models')
module.exports = router

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
    console.log(req)
    // let duckColor = req.body.duckColor
    // let duckName = req.body.duckName
    // let userId = req.body.userId
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

router.delete('/:duckId', async (req, res, next) => {
  try {
    const {duckId} = req.params
    const duck = await Duck.findByPk(duckId)
    await duck.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.patch('/:duckId', async (req, res, next) => {
  try {
    const {duckId} = req.params
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
