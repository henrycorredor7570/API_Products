import {Request, Response} from "express";
import Product from "./model_product";

export const getAllProducts = async (req: Request, res: Response) => {
    try{
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({ message: error.message });
        }else{
            res.status(500).json({message:"Unknown error."});
        }
    }
};

export const getProductById = async(req:Request, res:Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if(product){
            res.json(product);
        }else{
            res.status(404).json({message:"Product not found"});
        }
    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({ message: error.message });
        }else{
            res.status(500).json({message:"Unknown error"});
        }
    }
}

export const createProduct = async (req: Request, res:Response) => {
    const { nombre, precio, cantidad } = req.body;
    const newProduct = new Product({nombre,precio,cantidad});
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({ message: error.message });
        }else{
            res.status(500).json({message:"Unknown error"});
        }
    }
}

export const updateproduct = async (req: Request, res: Response) => {
    const {nombre, precio, cantidad} = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {nombre, precio, cantidad},
            {new:true}
        );
        if (updatedProduct){
            res.json(updatedProduct);
        }else{
            res.status(404).json({message:"Product not found"});
        }
    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({ message: error.message });
        }else{
            res.status(500).json({message:"Unknown error"});
        }
    }
}

export const deleteproduct = async (req:Request, res: Response) => {
    try {
        const deletedproduct = await Product.findByIdAndDelete(req.params.id);
        if(deletedproduct){
            res.json({message: "Product deleted"});
        }else{
            res.status(404).json({message:"Product not found"});
        }
    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({ message: error.message });
        }else{
            res.status(500).json({message:"Unknown error"});
        }
    }
}