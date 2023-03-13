import { Request, Response, NextFunction, Router } from 'express';
import User from '../model/User';
import log from '../logger';

const userRouter: Router = Router();

const userController = userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = new User({
            name: 'Bill',
            email: 'bill@initech.com',
            avatar: 'https://i.imgur.com/dM7Thhn.png'
        });
        await user.save();
        console.log(user.email);
        log.info(`${user.email}`);
    
        res.json({"user": user});
    } catch (error) {
        log.info(`onUserCreationError: ${error}`);
    }

});

export default userController;