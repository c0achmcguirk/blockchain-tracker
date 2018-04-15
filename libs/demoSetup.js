"use strict";

const PropertyLogic = require('./propertyLogic');

class DemoSetup {
  constructor(){
    this._propertyLogic = new PropertyLogic;
  }

  initialize() {
    // create initiail property
    let promise = new Promise((resolve, reject) => {
      this._propertyLogic.saveProperty('Alexander Smith',{latitude: 40.747656, longitude: -96.681224}, {latitude: 40.747280, longitude: -96.680902}, '6401 S. 28th, Lincoln, NE 68516')
      .then((result) => {
        // initialize transfer of ownership from Alex to Jennifer
        this._propertyLogic.makeOffer(0, 'Jennifer Dier', 159500)
        .then((result) => {
          // execute transfer of ownership from Alex to Jennifer
          this._propertyLogic.acceptOffer(0)
          .then((result) => {
            //initialize transfer of ownership from Jennifer to Robert
            this._propertyLogic.makeOffer(0, 'Robert Stanton', 190000)
            .then((result) => {
              // execute transfer of ownership from Jennifer to Robert
              this._propertyLogic.acceptOffer(1)
              .then((result) => {
                this._propertyLogic.makeOffer(0, 'Kyle Laughlin', 210000)
                .then((result) => {
                  console.log('######')
                  console.log('Demo successfully initialized!')
                  console.log('######')
                  resolve(result);
                })
              })
            })
          })
        });
      });
    })
  }
}

module.exports = DemoSetup;
