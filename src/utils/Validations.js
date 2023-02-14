import { body } from "express-validator"

class Validations {

    static addTaskValidation(){
        return [
            body("task", "Please enter a valid task").notEmpty()
        ]
    }
}

export default Validations;