/**
 * Node module that will perform property-related actions like:
 *   - Register a property (real-estate)
 *   - Update a property
 *   - Merge a property
 *   - Look up a property
 */

"use strict";

class PropertyLogic {
  /**
   * Save a property to the blockchain. It will handle the initial save and the case where you
   * are updating an existing property.
   * @param {string} id The ID of the property. If the property doesn't have an id, leave this as
   *   null or undefined.
   * @param {Object[]} coordinates The GPS coordinates of the property. Only support 4 points now.
   * @param {string} name The name of the property for displaying on a UI.
   * @returns {Property} The updated property.
   */
  save(id, coordinates, name) {
    //no-op
  }

  /**
   * Look up a property on the blockchain based on GPS coordinates (one point)
   * @param {Coordinate} coordinate The GPS coordinates of a point on the map.
   * @returns {Property} The property belonging to that coordinate, or undefined if we don't have
   *   a property belonging to that point.
   */
  getPropertyByCoordinate(coordinate) {
    return undefined;
  }

	/**
   * Look up a property by the id (address) on the blockchain, returning it.
   * @param {string} id The property's unique Id, which is the contract address
   * @returns {Property} The property belong to that id, or undefined if we don't have it.
   */
	getPropertyById(id) {
		return undefined;
  }

  /**
   * 
   */
};

module.exports = PropertyLogic;
