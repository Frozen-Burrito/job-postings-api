import mongoose, { ConnectOptions } from "mongoose";

/**
 * Attempts to connect to a specific MongoDB Atlas instance, using
 * a given connection string.
 * 
 * @param connectionString The connection string obtained from MongoDB, with the real username and password.
 * @returns A MongoDB Atlas connection instance, through mongoose.
 */
export async function connectMongoDbAtlas(connectionString: string): Promise<typeof mongoose> {

    const options: ConnectOptions = {
        autoIndex: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 4500,
        family: 4,
    };

    const connection = await mongoose.connect(connectionString, options);

    return connection;
}