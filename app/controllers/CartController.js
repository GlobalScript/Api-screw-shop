import { CartModel } from "../models/CartModel.js";

const handleError = (res, error) => {
    res.status(500).send(error.message);
  };

  export const addFirstCart = (req, res) => {
      new CartModel( req.body )
          .save()
          .then((cart) =>{
        if(!req.cookies.cart_id){
            res.cookie('cart_id', cart.id, {maxAge: 5*24*60*60*1000, path: "/"}); 
          }
            res.status(200).json(cart.cart);
          }) 
            .catch((error) => handleError(res, error));
    };

    export const addNextCart = (req, res) => {
            if(req.body.cart_id){
          CartModel
            .findByIdAndUpdate(req.body.cart_id, req.body, { new: true })
            .then((cart) => res.json(cart))
            .catch((error) => handleError(res, error));
            }
            else return res.status(200).json({});
    };

  export const allCart = (req, res) => {
         CartModel
            .find({"user_buy": "custom"})
            .then((cart) => res.status(200).json(cart))
            .catch((error) => handleError(res, error));  
    };

    export const getCart = (req, res) => {
         CartModel
            .findById(req.params.id)
            .then((cart) => res.status(200).json(cart))
            .catch((error) => handleError(res, error));  
    };

  export const statusCart = (req, res) => {
         if(req.body.cart_id){
          CartModel
            .findByIdAndUpdate(req.body.cart_id, req.body, { new: true })
            .then((cart) => res.json(cart))
            .catch((error) => handleError(res, error));
            }
            else return res.status(200).json({});
    };
    
   export const cookieAgree = (req, res) => {
      if(!req.cookies.agree){
            res.cookie('agree', 'ok', {path: "/"}); 
            res.status(200).json('seccessfull agree message cookie');
          }
          else res.status(200).json('agree message cookie already exists');
            
   }

  