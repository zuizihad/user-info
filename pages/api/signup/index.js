import { dbConnect } from "../../../lib/db-connect";
import { errorHandler, responseHandler, validateAllOnces } from "../../../utils/common";
import User from "../../../models/user";
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        //return error
        errorHandler('Invalid Request Type', res);
    } else {
        try {
            const { name, email, password } = req.body;
            // validateAllOnces({ name, email, password });
            validateAllOnces(req.body);
            //create new db connection if no error throw
            await dbConnect();

            const hashPassword = await bcrypt.hash(password, 8);

            const user = new User({ ...req.body, password: hashPassword });
            const saveUser = await user.save();

            if (saveUser) {
                const userDoc = saveUser._doc;
                delete userDoc.password;
                responseHandler(userDoc, res, 201);
            } else {
                errorHandler('Something went wrong!!!', res);
            }
        } catch (error) {

            errorHandler(error, res);
        }
    }
}
