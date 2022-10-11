import { UserModel } from "../models/UserModel.js";

const handleError = (res, error) => {
        res.status(500).send(error.message);
    };

export const getUsers = (req, res) => {
            UserModel.find()
            .then((users)=> {
                return res.json(users);
            })
            .catch((error) => handleError(res, error));
    };

    export const userRole = (req, res) => {
        console.log(req.body.roles)
         if(req.body.id){
          UserModel
            .findByIdAndUpdate(req.body.id, req.body, { new: true })
            .then((cart) => res.json(cart))
            .catch((error) => handleError(res, error));
            }
            else return res.status(200).json({});
    };

    export const removeUser = (req, res) => {
		  UserModel
        	.findByIdAndDelete(req.params.id)
        	.then(() => res.status(200).json('remove successfully'))
        	.catch((error) => handleError(res, error));
  }