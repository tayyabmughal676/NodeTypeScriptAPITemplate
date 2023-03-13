import { Request, Response, NextFunction, Router } from 'express';
import User from '../model/User';
import log from '../logger';
import HttpStatusCodes from "http-status-codes";


const userRouter: Router = Router();

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        
       const user = await User.find();
        console.log(user);
        log.info(`${user}`);
        res.json({ "user": user });
    } catch (error) {
        log.info(`onGetUsersError: ${error}`);
    }

});

userRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    try {

        let userCheck = await User.findOne({ email });

        if (userCheck) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                errors: [
                    {
                        msg: "User already exists",
                    },
                ],
            });
        }
        const user = new User({
            email: email,
            password: password,
            avatar: 'https://i.imgur.com/dM7Thhn.png'
        });
        await user.save();
        console.log(user.email);
        log.info(`${user.email}`);

        res.json({ "user": user });


    } catch (error) {
        log.info(`onUserCreationError: ${error}`);
    }
});



export default userRouter;