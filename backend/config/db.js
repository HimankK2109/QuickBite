import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://himanksingh1094:zVcsZDtdknGTTzzA@cluster0.vas24.mongodb.net/FoodApp')
    .then(() => console.log("DB Connected"))
}