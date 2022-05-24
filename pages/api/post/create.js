import multer from 'multer';
import { getSession } from "next-auth/react"
import nc from 'next-connect';
import slugify from 'slugify';
import { dbConnect } from '../../../lib/db-connect'
import Post from '../../../models/post';
import { errorHandler, responseHandler, validateAllOnces } from '../../../utils/common';

// export const config = {
//     api: {
//         bodyParser: false
//     }
// }

const handler = nc({
    onError: (err, req, res, next) => {
        res.status(500).send(err);
    },
    onNoMatch: (err, req, res, next) => {
        res.status(404).send('No match found')
    },
})
    .post(async (req, res) => {
        // res.status(201).json({ body: req.body })
        try {
            const session = await getSession({ req });
            if (!session) {
                errorHandler('Access denied', res)
            } else {
                const { full_name, phone, email, address, date_of_birth, profession } = req.body;
                validateAllOnces({ full_name, phone, email, address, date_of_birth, profession });
                await dbConnect();
                const userId = session.user.id;
                const slug = slugify(req.body.email, { remove: /[*+~.()'"!:@]/g });
                const post = new Post({
                    ...req.body,
                    slug,
                    user: userId,
                });
                const savePost = await post.save();
                if (savePost) {
                    responseHandler(savePost, res);
                } else {
                    errorHandler(savePost, res);
                }
                // res.status(201).json({ body: req.body })
            }
        } catch (error) {
            errorHandler(error, res)
        }

    })

export default handler;