import TodoServices from "../services/TodoServices.js";
import { validationResult } from "express-validator";
import { sendErrorResponse } from "../../utils/handleResponse.js";

class TodoController {

    static addTask(req, res) {
        try{
            const errors = validationResult(req);
			if (!errors.isEmpty()) {
				const errArr = errors.array();
				errArr.map(item => item.msg = item.msg);
				return sendErrorResponse(res, "Task is not added", errArr);
			}
            new TodoServices(req,res).addTaskToDB();
        }
        catch(err) {
            console.log(err);
        }
    }

    static getActiveTaskList(req, res) {
        try{
            new TodoServices(req, res).getActiveTaskList();
        }
        catch(err){
            console.log(err);
        }
    }

    static deleteTask(req, res) {
        try {
            new TodoServices(req, res).deleteTask();
        }
        catch(err){
            console.log(err);
        }
    }

    static getDeletedTaskList(req,res) {
        try{
            new TodoServices(req, res).getDeletedTaskList();
        }
        catch(err){
            console.log(err);
        }
    }

    static doneTask(req, res) {
        try {
            new TodoServices(req, res).doneTask();
        }
        catch(err){
            console.log(err);
        }
    }

    static getDoneTaskList(req,res) {
        try{
            new TodoServices(req, res).getDoneTaskList();
        }
        catch(err){
            console.log(err);
        }
    }

    static getTaskDetails(req, res) {
        try {
            new TodoServices(req, res).taskDetails();
        }
        catch(err){
            console.log(err);
        }
    }

    static editTask(req, res) {
        try {
            new TodoServices(req, res).editTask();
        }
        catch(err){
            console.log(err);
        }
    }
}

export default TodoController;