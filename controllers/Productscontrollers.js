const productmodel = require('../models/productmodel');
const ProductStat = require('../models/Productstat');
const cloudinary = require('../cloudinary');

const getAllProductsforAdmin = async (req, res, next) => {
  try {
    const products = await productmodel.find();

    const ProductWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );
    res.status(200).json(ProductWithStats);
  } catch (error) {
    next(error);
  }
};
const getProductsForTheClient = async (req, res, next) => {
  try {
    const products = await productmodel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: 'Something went Wrong ' });
  }
};
const getFilteredProducts = async (req, res, next) => {
  const search = req.query.search || '';
  const rating = req.query.rating || '';
  const sort = req.query.sort || 'price';

  try {
    let sortBy = sort.split(',')[1] || 'asc';
    const products = await productmodel
      .find({
        name: { $regex: search, $options: 'i' },
        rating: rating,
      })
      .sort(sortBy);

    const total = await products.countDocuments({
      name: { $regex: search, $options: 'i' },
    });
    res.status(200).json({ total, limit, page: page + 1, products });
  } catch (error) {
    res.status(404).json({ message: 'Something went Wrong ' });
  }
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productmodel.findById(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
const postProduct = async (req, res) => {
  const {
    images,
    slug,
    category,
    price,
    rating,
    color,
    numReview,
    discountprice,
    countInStock,
    description,
    name,
  } = req.body;
  let ImageLinks = [];

  /*   const getimageurl=()=>{
    let ImageLinks = [];
    images.map(async (image) => {
        await cloudinary.uploader.upload(
          image,
          {
            upload_present: 'unsigned_upload',
            allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'webp'],
          },
          function (error, result) {
            if (error) {
              console.log(error);
            }
            ImageLinks.push(result.secure_url);
          }
          );
        });
        return ImageLinks
  } */
  for (const image of images) {
    const result = await cloudinary.uploader.upload(image);
    ImageLinks.push(result.secure_url);
  }

  const savedProducts = await productmodel.create({
    name: name,
    slug: slug,
    category: category,
    images: ImageLinks,
    color: color,
    price: price,
    rating: rating,
    discountprice: discountprice,
    numReviews: numReview,
    countInStock: countInStock,
    description: description,
  });

  console.log(savedProducts);
};

module.exports = {
  getAllProductsforAdmin,
  getSingleProduct,
  getProductsForTheClient,
  getFilteredProducts,
  postProduct,
};
