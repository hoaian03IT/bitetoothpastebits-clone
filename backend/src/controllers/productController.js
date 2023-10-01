import { productModel } from "../model/productModel.js";

class ProductClass {
    async getDetailProduct(req, res) {
        try {
            const type = req.params.type;
            const name = req.params.name;
            const product = await productModel.find({ type, name });
            res.status(200).json({ product });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getFeaturedProducts(req, res) {
        try {
            const popular = await productModel
                .find({})
                .sort([["originalPrice", -1]])
                .limit(5);

            const oralCare = await productModel.find({ type: "oral-care" }).limit(4);

            const personalCare = await productModel.find({ type: "personal-care" }).limit(4);

            res.status(200).json({ popular, oralCare, personalCare });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async filterProducts(req, res) {
        try {
            const { type, name } = req.query;
            const queryType = type && type != "all-products" ? { type } : {};
            const queryName = name && name != "all" ? { name } : {};
            const products = await productModel.find({
                ...queryType,
                ...queryName,
            });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async createProducts(req, res) {
        try {
            const {
                type,
                image,
                name,
                description = "",
                collaborator = "",
                originalPrice,
                salePrice = 0,
                quantity,
            } = req.body;
            await productModel.create({
                type,
                image,
                name,
                description,
                collaborator,
                originalPrice: Number(originalPrice),
                salePrice: Number(salePrice),
                quantity: Number(quantity),
            });
            res.status(200).json("Created");
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async destroyAllProducts(req, res) {
        try {
            await productModel.deleteMany({});
            res.status(200).json("Deleted All!");
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export const productController = new ProductClass();
