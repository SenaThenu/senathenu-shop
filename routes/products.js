const express = require("express");
const router = express.Router();
const fsPromise = require("fs").promises;
const path = require("path");

function isImageFile() {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"]; // Add more if needed
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
}

async function readProductImages(imagesPath) {
    try {
        let images = await fsPromise.readdir(imagesPath);
        return images;
    } catch (err) {
        console.error("Error reading folder:", err);
    }
}

router.get("/:product", (req, res) => {
    let product = req.params.product;
    product = product.toLowerCase().replaceAll("-", "_");

    if (product in global.productsData) {
        readProductImages(
            path.join(__dirname, global.productsData[product].images_location)
        )
            .then((images) => {
                res.render("product", {
                    title: `${global.productsData[product]["display_name"]} - SenaThenu Shop`,
                    uri: product,
                    images: images,
                    ...global.productsData[product],
                });
            })
            .catch((err) => {
                res.render(500);
            });
    } else {
        res.render("errors/404");
    }
});

module.exports = router;
