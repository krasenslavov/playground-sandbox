const Products = require("../models/productModel");
const { getPostData } = require("../utils");

// @desc  Get All Products
// @route GET /api/products
async function getProducts(req, res) {
  try {
    const products = await Products.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

// @desc  Get Single Products
// @route GET /api/products/:id
async function getProduct(req, res, id) {
  try {
    const product = await Products.findById(id);

    if (!product) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product Not Found",
        })
      );
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc  Create a  Product
// @route POST /api/products/
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);
    const { title, description, price } = JSON.parse(body);

    const product = {
      price,
      title,
      description,
    };

    const newProduct = await Products.create(product);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

// @desc  Update a  Product
// @route PUT /api/products/:id
async function updateProduct(req, res, id) {
  try {
    const product = await Products.findById(id);

    if (!product) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product Not Found",
        })
      );
    } else {
      const body = await getPostData(req);
      const { title, description, price } = JSON.parse(body);

      const updProductData = {
        // No need to pass all 3 args
        price: price || product.price,
        title: title || product.title,
        description: description || product.description,
      };

      const updProduct = await Products.update(id, updProductData);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updProduct));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc  Delete Product
// @route DELETE /api/products/:id
async function deleteProduct(req, res, id) {
  try {
    const product = await Products.findById(id);

    if (!product) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product Not Found",
        })
      );
    } else {
      await Products.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Product ${id} removed` }));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
