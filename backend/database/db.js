import mongoose from "mongoose";

const connectDb = async () => {
  try {
    //console.log('MongoDB URL:', process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "clics",
    });

    console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
