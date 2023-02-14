import { STATUS } from "../constants/status.js";
import Todo from "../../db/models/Todo.js";
import { sendErrorResponse, sendResponse } from "../../utils/handleResponse.js";

class TodoServices {

    constructor(req, res) {
        this.request = req,
        this.response = res
    }

    async addTaskToDB() {
        try {
            const { task } = this.request.body;
            const taskToSave = new Todo({
                task,
                status: STATUS.ACTIVE_TASK,
                created_on: Date()
            });

            await taskToSave.save();
            return sendResponse(this.response, "Task saved successfully!");
        }
        catch(err) {
            console.log(err);
        }
    }
    
    getActiveTaskList() {
        try {
            Todo.find({ status: STATUS.ACTIVE_TASK }, null, { sort: { last_updated: -1 }}, (err, data) => {
                if(err){
                    return sendErrorResponse(this.response, "", err);
                }
                return sendResponse(this.response, "Active Tasks List", data);
            })
        }
        catch(err){
            console.log(err);
        }
    }

    deleteTask() {
        try {
            const { id } = this.request.params;
            Todo.findOne({ _id: id, status: STATUS.ACTIVE_TASK }, async (err, data) => {
                if(err){
                    return sendErrorResponse(this.response, "", err);
                }
                if(data){
                Todo.findByIdAndUpdate(id, { status: STATUS.DELETED_TASK, last_updated: Date(), deleted_on: Date() }, (err, updatedData) => {
                    if(err){
                        return sendErrorResponse(this.response, "", err);
                    }
                    return sendResponse(this.response, "Task deleted successfully!");
                })
            }
            else {
                return sendErrorResponse(this.response, "Task not found");
            }
            });
        }
        catch(err) {
            console.log(err);
        }
    }

    getDeletedTaskList() {
        try {
            Todo.find({ status: STATUS.DELETED_TASK }, null, { sort: { last_updated: -1 }}, (err, data) => {
                if(err){
                    return sendErrorResponse(this.response, "", err);
                }
                return sendResponse(this.response, "Deleted Tasks List", data);
            })
        }
        catch(err){
            console.log(err);
        }
    }

    doneTask() {
        try {
            const { id } = this.request.params;
            Todo.findOne({ _id: id, status: STATUS.ACTIVE_TASK }, async (err, data) => {
                if(err){
                    return sendErrorResponse(this.response, "", err);
                }
                if(data){
                Todo.findByIdAndUpdate(id, { status: STATUS.DONE_TASK, last_updated: Date() }, (err, updatedData) => {
                    if(err){
                        return sendErrorResponse(this.response, "", err);
                    }
                    return sendResponse(this.response, "Task done successfully!");
                })
            }
            else {
                return sendErrorResponse(this.response, "Task not found");
            }
            });
        }
        catch(err) {
            console.log(err);
        }
    }

    getDoneTaskList() {
        try {
            Todo.find({ status: STATUS.DONE_TASK }, null, { sort: { last_updated: -1 }}, (err, data) => {
                if(err){
                    return sendErrorResponse(this.response, "", err);
                }
                return sendResponse(this.response, "Done Tasks List", data);
            })
        }
        catch(err){
            console.log(err);
        }
    }

    async editTask() {
            try {
                const { id } = this.request.params;
                const { task } = this.request.body;
                Todo.findOne({ _id: id }, async (err, data) => {
                    if(err){
                        return sendErrorResponse(this.response, "", err);
                    }
                    if(data){
                    Todo.findByIdAndUpdate(id, { task, last_updated: Date() }, (err, updatedData) => {
                        if(err){
                            return sendErrorResponse(this.response, "", err);
                        }
                        return sendResponse(this.response, "Task updated successfully!");
                    })
                }
                else {
                    return sendErrorResponse(this.response, "Task not found");
                }
                });
            }
            catch(err) {
                console.log(err);
            }
        }
    }

export default TodoServices;