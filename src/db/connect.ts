import mongoose from "mongoose";
import config from 'config';
import log from "../logger";

function connect(){
    // mongodb+srv://nodeapp:nodeapp@cluster0.v3t4z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    // Only pass link
   return mongoose.connect("mongodb://127.0.0.1:27017/test")
   .then(()=>{
        log.info("Database connected")
    }).catch((error) => {
        log.info("db error", error)
        process.exit(1);
    });
}

mongoose.connection.on('connected', () => {
    log.info("Mongoose connected to db...");
});

mongoose.connection.on('error', (err) => {
    log.info(err.message);
});

mongoose.connection.on('disconnected', () => {
    log.info('Mongoose connection is disconnected');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});

export default connect;