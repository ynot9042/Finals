const router = require('express').Router();
const orderQueries = require("../db/queries/orders");

router.get("/sold", (req, res) => {
  orderQueries.getAllSoldByUser(req.query.id)
  .then((users) => {
    return res.json(users)
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  })
});

router.get("/purchased", (req, res) => {
  orderQueries.getAllPurchasedByUser(req.query.id)
  .then((users) => {
    return res.json(users)
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  })
});

router.get("/cart", (req, res) => {
  orderQueries.getOrderByUserID(5)
  .then((order) => {
    return res.json(order)
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  })
});

router.put("/add", (req, res) => {
  // check if an in_progress order exists
  orderQueries.getOrderInProgress(req.body.userID)

  .then((order) => {
    // if no, create new order
    if (!order) {
      orderQueries.createNewOrder(req.body.userID)
        .then((newOrder) => {
          orderQueries.addArtworkToOrderByID(newOrder[0].id, req.body.artworkID, req.body.price)
        })
    } else {
      orderQueries.addArtworkToOrderByID(order[0].id, req.body.artworkID, req.body.price)
    }
  })
  .then((result) => {
    return res.json(result)
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  })
});

module.exports = router;