import axios from "axios";
import { sendErrorResponse, sendServerError } from "./handleResponse.js";

export const authenticateUser = async (req, res, next) => {

    try {

        const token = req.header("token");

        await axios({
            url: process.env.USER_AUTH_API_URL,
            method: "GET",
            headers: {
                token
            }
        });

        next();

    } catch (error) {

        const { success, message } = error.response.data;
        
        if(!success){
            return sendErrorResponse(res, message);
        }

        return sendServerError(res, 'Internal Server Error');
    }

}