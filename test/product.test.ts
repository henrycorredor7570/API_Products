import { expect } from "chai";
import request from "supertest";
import app from "../src/app";
import { connectTestDB, disconnecTestDB } from "./config";
import Product from "../src/model_product";

describe("Product API", () => {
    before(async()=>{
        await connectTestDB();
    })

    after(async()=>{
        await Product.deleteMany({});
        await disconnecTestDB();
    });

    it("Deberia crear un nuevo producto", async () =>{
        const res = await request(app)
            .post("/productos")
            .send({
                nombre:"Producto test",
                precio: 100,
                cantidad: 50
            })
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("_id");
        expect(res.body.nombre).to.equal("Producto test");
        expect(res.body.precio).to.equal(100);
        expect(res.body.cantidad).to.equal(50);
    });

    it("Deberia obtener todos los productos", async () => {
        await request(app).post("/productos").send({
            nombre: "Producto test 2",
            precio: 200,
            cantidad: 30
        })
        const res = await request(app).get("/productos");
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.greaterThan(0);
    });

    it("deberia obtener un producto por ID", async () => {
        const product = await request(app).post("/productos").send({
            nombre: "Producto test 3",
            precio: 300,
            cantidad: 20
        });
        const res = await request(app).get(`/productos/${product.body._id}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("_id").that.equals(product.body._id);
            expect(res.body.nombre).to.equal("Producto test 3");
        
    })

    it("deberia actualizar un prodcuto por ID", async () => {
        const product = await request(app).post("/productos").send({
            nombre: "Producto test 4",
            precio: 400,
            cantidad: 10
        })
        const res = await request(app).put(`/productos/${product.body._id}`).send({
            nombre: "Producto test updated",
            precio:500,
            cantidad:5
        })
        expect(res.status).to.equal(200);
        expect(res.body.nombre).to.equal("Producto test updated");
    });

    it("Deberia eliminar un producto por ID", async () => {
        const product = await request(app).post("/productos").send({
            nombre: "Producto test 5",
            precio: 600,
            cantidad: 15
        })

        const res = await request(app).delete(`/productos/${product.body._id}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("message", "Product deleted");
    });


})