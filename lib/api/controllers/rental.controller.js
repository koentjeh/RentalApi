'use strict';
const Rental = require( '../../models' ).Rental;
const httpStatus = require( 'http-status' );
const APIError = require( '../../utils/helpers/APIError' );
const jwt = require( 'jsonwebtoken' );
const config = require( '../../utils/config' );

/**
 * Load rental and append to req.
 */
function load(req) {
  res.contentType('application/json');

  Rental.find({})
    .then(function (rentals) {
      res.status(200).json(rentals);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
}

/**
 * Get rental
 * @returns {Rental}
 */
function get(req, res, next) {
  load(req)
    .then( () => {
      return res.json(req.rentalFound);
    })
    .catch(() => {
      const err = new APIError('Data error: Rental not found', httpStatus.UNAUTHORIZED, true);
      return next(err);
    });
}

/**
 * Create new rental
 * @property {string} req.body.rentalType - The type of rental.
 * @property {string} req.body.size - The size of rental.
 * @property {number} req.body.prize - The prize of rental.
 * @returns {Rental}
 */
function create(req, res, next) {
  Rental.findOne( { _id: req.body.id } )
    .then((rentl) => {
      if (rentl === null) {
        const rental = new Rental({
          rentalType: req.body.rentalType,
          size:       req.body.size,
          prize:      req.body.prize
        });

        rental.save()
          .then((savedRental) => {
            res.status(httpStatus.CREATED).json(savedRental);
          })
          .catch(e => next(e));
      }
      else {
        const err = new APIError('Authentication error: Customer exists', httpStatus.UNAUTHORIZED, true);
        return next(err);
      }
    })
    .catch(e => next(e));
}

/**
 * Update existing rental
 * @property {string} req.body.rentalType - The type of rental.
 * @property {string} req.body.size - The size of rental.
 * @property {number} req.body.prize - The prize of rental.
 * @returns {Rental}
 */
function update(req, res, next) {
  load(req, res, next)
    .then(() => {
      const rental = req.rentalFound;
      rentalType:   req.body.rentalType;
      size:         req.body.size;
      prize:        req.body.prize;

      rental.save()
        .then((savedRental) => {
          res.status(httpStatus.ACCEPTED).json(savedRental);
        })
        .catch(e => next(e));
    })
    .catch(() => {
      const err = new APIError('Data error: Update failed', httpStatus.BAD_REQUEST, true);
      return next(err);
    });
}

/**
 * Delete rental.
 * @returns {Rental}
 */
function remove(req, res, next) {
  // TODO: Add load function.
  const rental = req.Rental;
  rental.remove()
    .then(deletedRental => res.status(httpStatus.ACCEPTED).json(deletedRental))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, remove };