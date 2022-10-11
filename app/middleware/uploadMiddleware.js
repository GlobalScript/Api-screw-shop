import multer from 'multer';
import moment from 'moment';

const storage = multer.diskStorage({
        destination: function (req, file, cb) {
              cb(null, './uploads')
        },
        filename: function (req, file, cb) {
              const uniqueSuffix = moment().format("YYYY-MM-DD-hh-mm-ss") + "_" + file.originalname ;
              cb(null, uniqueSuffix)
              req.body.image0 = process.env.IMAGE_URL + uniqueSuffix;
              req.body.image1 = process.env.IMAGE_URL + "2022-10-03-11-03-53_20.jpg";
              req.body.image2 = process.env.IMAGE_URL + "2022-10-03-11-04-24_7.jpg";
              req.body.image3 = process.env.IMAGE_URL + "2022-10-03-11-04-54_6.jpg";
              req.body.image4 = process.env.IMAGE_URL + "2022-10-03-11-05-14_2.jpg";
        }
      })
      const fileFilter = (req, file, cb) => {
            if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' ){
              cb(null, true)
            }
            else cb(null, false)
  }

export default multer({
      storage,
      fileFilter
    });