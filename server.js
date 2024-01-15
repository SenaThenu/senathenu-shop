const dotenv = require("dotenv"); // to access environmental variables
const { readFile } = require("fs").promises;
const path = require("path");

// express.js stuff
const express = require("express"); // to set up the RESTful server
const expressLayouts = require("express-ejs-layouts");

// middleware
const cors = require("cors");

// custom routers
const productRouter = require("./routes/products");

dotenv.config(); // reading env variables

const app = express();

// view engine stuff
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

// static files
app.use(express.static(__dirname + "/public"));

app.use(cors()); // cross origin resource sharing set up!
app.use(express.json()); // JSON format responses
app.use(expressLayouts); // EJS Layouts
app.use(express.urlencoded({ extended: true })); // allows us to access the form stuff

const PORT = 8000;

async function fetchProducts() {
    try {
        rawProductData = await readFile(
            path.join(__dirname, "products.json"),
            "utf8"
        );

        // productsData is a global variable
        global.productsData = JSON.parse(rawProductData);
    } catch (error) {
        console.error(error);
    }
}

app.get("/", async (req, res) => {
    res.render("index", { products: productsData });
});

app.use("/product", productRouter);

fetchProducts();
app.listen(process.env.PORT || PORT);
