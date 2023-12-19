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

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set(expressLayouts);

app.use(cors()); // cross origin resource sharing set up!
app.use(express.json()); // JSON format responses
app.use(express.urlencoded({ extended: true })); // allows us to access the form stuff

const PORT = 8000;

// a placeholder for
let productsData;

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/get-products", async (req, res) => {
    try {
        rawProductData = await readFile(
            path.join(__dirname, "products.json"),
            "utf8"
        );
        productsData = JSON.parse(rawProductData);

        res.json(productsData);
    } catch (err) {
        console.log(err);
    }
});

app.use("/products", productRouter);

app.listen(process.env.PORT || PORT);
