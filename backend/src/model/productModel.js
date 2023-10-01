import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        type: { type: String, required: true },
        image: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String, default: "" },
        collaborator: { type: String, default: "" },
        originalPrice: { type: Number, required: true },
        salePrice: { type: Number, default: -1 },
        quantity: { type: Number, required: true },
        reviews: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

export const productModel = new mongoose.model("product", productSchema);
