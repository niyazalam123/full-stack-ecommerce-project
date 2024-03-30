import mongoose from "mongoose"

const productsSchema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    discountPercentage:Number,
    rating:Number,
    stock:Number,
    brand:String,
    category:String,
    thumbnail:String,
},{ timestamps: true });

const Products = mongoose.models.products || mongoose.model("products",productsSchema);
export default Products;