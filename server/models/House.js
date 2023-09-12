import mongoose from "mongoose";

const HouseSchema = new mongoose.Schema({

    type: {
        type: String,
        required:true,
    },
    city: {
        type: String,
        required:true,
    },
    address: {
        type: String,
        required:true,
    },
    photos: {
        type: [String],
    },
    title: {
        type: String,
        required:true,
    },
    desc: {
        type: String,
        required:true,
    },
    distance: {
        type: Number,
        required:true,
    },
    rooms: {
        type: Number,
        required:true,
    },
    baths: {
        type: Number,
        required:true,
    },
    price: {
        type: Number,
        required:true,
    },
    featured: {
        type: Boolean,
        required: false,
    },
    equipements: {
        type: [String],
        required: true,
    },
    location: {
        type: [mongoose.Schema.Types.Mixed],
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
})

export default mongoose.model("House", HouseSchema)