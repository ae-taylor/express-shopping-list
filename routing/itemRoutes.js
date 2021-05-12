const express = require("express");
const db = require("./fakeDb");

const router = new express.Router();

/** GET /items/ get list of shopping items */
router.get("/", function (req, res, next){
    return res.json({items : db.items})
})

router.post("/", function (req, res, next){
    let name = req.body.name;
    let price = req.body.price;
    db.items.push({name, price})
    return res.json({items : db.items})
})

module.exports = router;
