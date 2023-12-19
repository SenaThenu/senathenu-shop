const express = require("express");
const router = express.Router();

router.get("/:product", (req, res) => {
    let product = req.params.product;
    res.send(`You searched for the product ${product}!`);
});

module.exports = router;
