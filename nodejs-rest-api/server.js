const http = require("http");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./controllers/productController");

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  // res.statusCode = 200;
  // res.setHeader("Content-Type", "text/html");
  // res.write("<h1>Hello World!</h1>");
  // res.end();

  if (req.url === "/api/products" && req.method === "GET") {
    // Get All Products
    getProducts(req, res);
  } else if (
    req.url.match(/\/api\/products\/([a-b0-9\-]*)/) &&
    req.method === "GET"
  ) {
    // Get Single Product
    const id = req.url.split("/")[3];
    getProduct(req, res, id);
  } else if (req.url === "/api/products" && req.method === "POST") {
    // Create New Product
    createProduct(req, res);
  } else if (
    // Match UUID
    req.url.match(/\/api\/products\/([a-b0-9\-]*)/) &&
    req.method === "PUT"
  ) {
    // Edit Product
    const id = req.url.split("/")[3];
    updateProduct(req, res, id);
  } else if (
    // Match UUID
    req.url.match(/\/api\/products\/([a-b0-9\-]*)/) &&
    req.method === "DELETE"
  ) {
    // Delete Product
    const id = req.url.split("/")[3];
    deleteProduct(req, res, id);
  } else {
    // Product Not Found
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found!" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
