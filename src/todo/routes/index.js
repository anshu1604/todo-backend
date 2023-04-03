import express from 'express';
import TodoController from '../controllers/TodoController.js';
import Validations from '../../utils/Validations.js';

const todoRouter = express.Router();

// add a task
todoRouter.post('/add', Validations.addTaskValidation(), TodoController.addTask);

// get list of all active tasks
todoRouter.get('/active-task', TodoController.getActiveTaskList);

// delete a task
todoRouter.put('/delete/:id',TodoController.deleteTask);

// get list of all deleted tasks
todoRouter.get('/deleted-task', TodoController.getDeletedTaskList);

// mark task as done
todoRouter.put('/done/:id', TodoController.doneTask);

// get list of all done tasks
todoRouter.get('/done-task', TodoController.getDoneTaskList);

// get task details via id
todoRouter.get('/details/:id', TodoController.getTaskDetails);

// edit task
todoRouter.put('/edit/:id', TodoController.editTask);

export default todoRouter;