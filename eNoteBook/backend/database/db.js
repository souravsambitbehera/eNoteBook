import { connect } from "mongoose";

const connectToMongo = async () => {
  const url = process.env.MONGODB_URL;
  try {
    await connect(url);
    console.log("---***Database Connected Successfully***---");
  } catch (error) {
    console.log(error);
  }
};

export default connectToMongo;
