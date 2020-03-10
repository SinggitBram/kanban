const router = require('express').Router()
const TaskController = require('../controllers/taskController')
const authenticationUser = require('../middlewares/authentication')
const authorizationUser = require('../middlewares/authorization')

router.post('/', authenticationUser, TaskController.addTask)
router.get('/', authenticationUser, TaskController.getTask)
router.get('/:id', authenticationUser, authorizationUser, TaskController.getTaskId)
router.put('/:id', authenticationUser, authorizationUser, TaskController.editTask)
router.delete('/:id', authenticationUser, authorizationUser, TaskController.deleteTask)

module.exports = router