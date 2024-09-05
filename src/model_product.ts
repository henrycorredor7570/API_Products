import mongoose, {Document, Schema} from "mongoose";

export interface IProduct extends Document {
    nombre: string,
    precio: number;
    cantidad: number;
}

const ProductSchema: Schema = new Schema({
    nombre: {type:String, required: true},
    precio:{type:Number, required:true},
    cantidad:{type:Number, required:true}
})

export default mongoose.model<IProduct>("Product", ProductSchema);