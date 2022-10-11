import { ProductModel } from "../models/ProductModel.js";
import fs from 'fs';

const handleError = (res, error) => {
    res.status(500).send(error.message);
  }

 export const getAllProducts = (req, res) => {
   ProductModel
      .find()
      .sort({ createdAt: -1 })
      .then((products) => res.status(200).json(products))
      .catch((error) => handleError(res, error));
  } 
  export const getLastProduct = (req, res) => {
    ProductModel
      .findOne()
      .sort({ createdAt: -1 })
      .then((product) => res.status(200).json(product))
      .catch((error) => handleError(res, error));
  }

  export const addProduct = (req, res) => {
      new ProductModel( req.body )
      .save()
      .then((product) => res.status(200).json(product))
      .catch((error) => handleError(res, error));
  }

  export const removeImage = (req, res) => {
       const imagePath = `./uploads/${req.params.image}`;
        if(fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
              if (err) return res.status(200).json(err);
              else return res.status(200).json('remove image file successfully')
        });
     }
       else return res.status(200).json('image file not found'); 
  }

  export const deleteProduct = (req, res) => {
      ProductModel
        .findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json('remove successfully'))
        .catch((error) => handleError(res, error));
  }

  export const updateProduct = (req, res) => {
      ProductModel
        .findByIdAndUpdate(req.body.id, req.body, { new: true })
        .then((product) => res.json(product))
        .catch((error) => handleError(res, error));
  }
