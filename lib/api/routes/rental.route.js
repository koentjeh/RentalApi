const express = require( 'express' );
const expressJwt = require( 'express-jwt' );
const config = require( '../../utils/config' );
const rentalCtrl = require( '../controllers/rental.controller' );

const router = express.Router();

router.route('/')
  /** GET /api/rental/:rentalId - Get rental */
  .get(expressJwt({ secret: config.jwtSecret }), rentalCtrl.get)

  /** PUT /api/rental/:rentalId - Update rental */
  .put(expressJwt({ secret: config.jwtSecret }), rentalCtrl.update)

  /** POST /api/rental - Create new rental */
  .post(rentalCtrl.create)

  /** DELETE /api/rental/:rentalId - Delete rental */
  .delete(expressJwt({ secret: config.jwtSecret }), rentalCtrl.remove);

module.exports = router;