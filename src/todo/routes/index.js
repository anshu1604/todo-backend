import express from 'express';
import TodoController from '../controllers/TodoController.js';
import Validations from '../../utils/Validations.js';
import { authenticateUser } from '../../utils/authenticateUser.js';

const todoRouter = express.Router();

// add a task
todoRouter.post('/add', [Validations.addTaskValidation(), authenticateUser], TodoController.addTask);

// get list of all active tasks
todoRouter.get('/active-task', authenticateUser, TodoController.getActiveTaskList);

// delete a task
todoRouter.put('/delete/:id', authenticateUser, TodoController.deleteTask);

// get list of all deleted tasks
todoRouter.get('/deleted-task', authenticateUser, TodoController.getDeletedTaskList);

// mark task as done
todoRouter.put('/done/:id', authenticateUser, TodoController.doneTask);

// get list of all done tasks
todoRouter.get('/done-task', authenticateUser, TodoController.getDoneTaskList);

// get task details via id
todoRouter.get('/details/:id', authenticateUser, TodoController.getTaskDetails);

// edit task
todoRouter.put('/edit/:id', authenticateUser, TodoController.editTask);

export default todoRouter;