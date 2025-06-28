import mongoose from "mongoose";
const url =
  "mongodb+srv://birsathi:cosmos@cluster0.0hmphlx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const connectDB = async () => {
  try {
    const host = await mongoose.connect(url, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected:`, host.connections[0].host);
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
  }
};
