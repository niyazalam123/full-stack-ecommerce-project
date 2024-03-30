import mongoose from "mongoose";

export async function mongoDbConnect(){
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        // check connection
        connection.on("connected",()=>{
            console.log("mongodb connected successfully!");
        });

        connection.on("error",(err)=>{
            console.log(`mongodb connection error ${err}`)
        })

        connection.on("disconnected",()=>{
            console.log("MongoDB disconnected!");
        })
    } catch (error) {
        console.log({error:error})
    }
}