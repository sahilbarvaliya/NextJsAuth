import mongoose from "mongoose";


export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Connected to the database");
        });

        connection.on("error", (error) => {
            console.log("Error connecting to the database, make sure db is up and running");
            console.log(error);
            process.exit();
        });

    } catch (error) {
        console.log('Error connecting to the database');
        console.log(error);
    }
}