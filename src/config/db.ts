import mongoose from 'mongoose';

export async function connect() {
    try {
        // mongodb+srv://<username>:<password>@cluster0.nstqk6e.mongodb.net/?retryWrites=true&w=majority
        // process.env.MONGO_URI!
        mongoose.connect('mongodb://0.0.0.0:27017/todo');
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err: any) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
        
    }


}