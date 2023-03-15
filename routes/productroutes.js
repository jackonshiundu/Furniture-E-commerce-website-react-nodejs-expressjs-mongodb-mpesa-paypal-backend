const express = require('express');
const {
  getAllProductsforAdmin,
  getProductsForTheClient,
  getSingleProduct,
  postProduct,
} = require('../controllers/Productscontrollers');
const router = express.Router();

router.get('/getallproducts', getAllProductsforAdmin);
router.post('/addproduct', postProduct);
router.get('/getallproductsforclients', getProductsForTheClient);
router.get('/getsingleproduct/:id', getSingleProduct);

module.exports = router;
