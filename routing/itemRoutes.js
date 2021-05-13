const express = require("express");
const db = require("./fakeDb");

const router = new express.Router();
const { NotFoundError } = require("./expressError");
/** GET /items/ get list of shopping items */
router.get("/", function (req, res, next) {
    return res.json({ items: db.items })
})

/**POST /items: accept JSON body, add item, and return it */
router.post("/", function (req, res, next) {
    let name = req.body.name;
    let price = req.body.price;
    db.items.push({ name, price })
    return res.json({ items: db.items })
})

/**GET /items/:name: return single item */
router.get("/:name", function (req, res, next) {
    let name = req.params.name;
    for (let item of db.items) {
        if (item.name === name) {
            return res.json(item)
        }
    }
    throw new NotFoundError('Item not found')
});

/**PATCH /items/:name: accept JSON body with name and price, modify item, return it */
router.patch("/:name", function (req, res, next) {
    let name = req.params.name;
    for (let item of db.items) {

        if (item.name === name) {
            item.name = req.body.name
            item.price = req.body.price
            return res.json(item)
        }
    }
    throw new NotFoundError('Item not found')
})
/**PATCH /items/:name: DELETE /items/:name: delete item: */
router.delete("/:name", function (req, res, next) {
    let name = req.params.name;
    for (let i = 0; i < db.items.length; i++) {
        if (db.items[i].name === name) {
            db.items.splice(i,1)
            return res.json({message: "Deleted"})
        }
    }
    throw new NotFoundError('Item not found')
})

module.exports = router;
