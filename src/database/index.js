import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionURL =
    "mongodb+srv://intekhabulhaque26:owABNhpDD2AdHhpm@blogapp.v0hmmqh.mongodb.net/";

  mongoose
    .connect(connectionURL)
    .then(() => console.log("Blog database connection is succesfull"))
    .catch((err) => console.log(err));
};

export default connectToDB;
