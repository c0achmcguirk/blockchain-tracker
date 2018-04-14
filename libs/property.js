/**
 * Node module that exports the Property class used to define a property's information
 */

"use strict";

class Property {
  constructor(options) {
    this.name      = options.name || undefined;
    this.address   = options.address || "123 Main Street";
    this.latitude  = options.latitude || null;
    this.longitude = options.longitude || null;
  }
}

module.exports = Property;
