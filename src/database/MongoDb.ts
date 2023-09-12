/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";

class MongoDb {
  private password: string;
  private user: string;
  private url: string;

  constructor() {
    this.user = process.env.MONGO_USER || "";
    this.password = process.env.MONGO_PASSWORD || "";
    this.url = process.env.MONGO_URL || "";
  }

  async connect() {
    mongoose.set("strictQuery", false);

    await mongoose.connect(this.url, {
      auth: {
        password: this.password,
        username: this.user,
      },
    });
  }
}

export { MongoDb };
