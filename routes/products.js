const express = require("express");
const router = express.Router();

router.get("/:product", (req, res) => {
    let product = req.params.product;
    product = product.toLowerCase().replaceAll("-", "_");

    if (product in global.productsData) {
        res.render("product", {
            title: `${global.productsData[product]["display_name"]} - SenaVerse Shop`,
            ...global.productsData[product],
        });
    } else {
        res.render("errors/404");
    }
});

module.exports = router;
