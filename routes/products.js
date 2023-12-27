const express = require("express");
const router = express.Router();

router.get("/:product", (req, res) => {
    let product = req.params.product;
    product = product.toLowerCase().replace("_", "-");

    if (product in global.productsData) {
        res.render("product", {
            name: product.replace("-", " "),
            ...productsData[product],
        });
    } else {
        res.render("errors/404");
    }
});

module.exports = router;
