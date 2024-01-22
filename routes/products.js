const express = require("express");
const router = express.Router();
const fsPromise = require("fs").promises;
const path = require("path");

function isImageFile(filename) {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
    const ext = filename.slice(filename.indexOf("."));
    return imageExtensions.includes(ext);
}

async function readProductImages(imagesPath) {
    try {
        let files = await fsPromise.readdir(imagesPath);
        let images = files.filter((file) => isImageFile(file));
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
                console.log(images);
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
