const mongoose = require('mongoose')
const request = require('supertest')

const app = require('../app')

const helper = require('../helpers/product.helper')

require('dotenv').config()

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(
        () => {console.log("Connection to monogoDB established")},
        err => {console.log("Failed to connect to monogoDB", err)}
    )
})

afterEach( async () => {
    await mongoose.connection.close()
})

describe("Request GET /api/products", () => {
    it("Returns all products", async () => {
      const res = await request(app).get('/api/products');
      expect(res.statusCode).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0)
    }, 10000)
  })


  describe("Request GET /api/products/:product", () => {
    it("Returns a product", async () => {
      const result = await helper.findLastInsertedProduct()
      const res = await request(app).get('/api/products/' + result.product );
      expect(res.statusCode).toBe(200);
      expect(res.body.product).toBe(result.product)
    }, 10000)
  })


  describe("Request POST /api/products", () => {
    it("Creates a product", async () => {
      const res = await request(app)
      .post('/api/products')
      .send({
          product: "test",
          cost: "10",
          description: "Test",
          quantity: "10",
      })
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toBeTruthy()
    }, 10000)

    it("Creates a products testing cost's type", async () => {
        const res = await request(app)
        .post('/api/products')
        .send({
            product: "test",
            cost: "test",
            description: "Test",
            quantity: "10",
        })
        expect(res.statusCode).toBe(400);
        expect(res.body.data).toBeTruthy()
      }, 10000)


    it("Creates a product testing quantity's type", async () => {
        const res = await request(app)
        .post('/api/products')
        .send({
            product: "test",
            cost: "10",
            description: "Test",
            quantity: "test",
        })
        expect(res.statusCode).toBe(400);
        expect(res.body.data).toBeTruthy()
      }, 10000)
  })


  describe("DELETE /api/product/:product", () => {
    it("Delete last inserted product", async () => {
        const result = await helper.findLastInsertedProduct()
        const res = await request(app)
            .delete('/api/products/' + result.product)
  
      expect(res.statusCode).toBe(200);
    }, 10000)
})
