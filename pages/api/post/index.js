import { dbConnect } from "../../../lib/db-connect";
import { errorHandler, responseHandler, validateAllOnces } from "../../../utils/common";
import User from "../../../models/user";
import Post from "../../../models/post";

export default async function handler(req, res) {
    try {
        await dbConnect()
        const posts = await Post.find({}).select('full_name email phone address date_of_birth profession').exec();
        if (posts) {
            responseHandler(posts, res)
        } else {
            errorHandler("Something went wrong", res)
        }
    } catch (error) {
        errorHandler(error, res)
    }
}