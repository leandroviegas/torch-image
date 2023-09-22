import { NextApiRequest, NextApiResponse } from "next";

import User from "@/db/models/User";
import catchAsyncErrors from "@/middlewares/ErrorHandler";
import { FormError } from "@/types/Errors";

// export const config = {
//     api: {
//         bodyParser: true,
//     },
// };

export default catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.body)
    switch (req.method) {
        case 'POST':
            let { username, email, password } = req.body;

            const user = await User.create({ username, email, password })
                .catch(e => {
                    console.error(e)
                });

            res.status(200).json({
                user
            });
            break;
        default:
            res.status(400).json({ message: 'invalid method.' });
    }
})