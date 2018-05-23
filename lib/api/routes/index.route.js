'use strict';
const express = require( 'express' );
const rentalRoutes = require( './rental.route' );
const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount rental routes at /rental
router.use('/rental', rentalRoutes);

module.exports = router;