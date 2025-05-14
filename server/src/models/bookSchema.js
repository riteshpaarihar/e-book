import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Book title is required"],
        trim: true,
    },
    author: {
        type: String,
        required: [true, "Author name is required"],
        trim: true,
    },
    genre: {
        type: String,
        required: [true, "Genre is required"],
        trim: true,
    },
    edition: {
        type: String,
        default: "First Edition",
        trim: true,
    },
    publisher: {
        type: String,
        trim: true,
    },
    isbn: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
    },
    condition: {
        type: String,
        enum: ["new", "like-new", "very-good", "good", "fair", "poor"],
        required: [true, "Condition is required"],
    },
    pages: {
        type: Number,
        min: [1, "Pages must be at least 1"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"],
    },
    summary: {
        type: String,
        trim: true,
    },
    imageUrl: {
        type: String,
        required: [true, "Book image is required"],
    },
    stock: {
        type: Number,
        required: [true, "Stock quantity is required"],
        min: [0, "Stock cannot be negative"],
        default: 1,
    },
    outOfStock: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {
    timestamps: true,
});

const Book = mongoose.model("Book", bookSchema);

export default Book;