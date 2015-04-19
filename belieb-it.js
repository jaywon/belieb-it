HitCollection = new Meteor.Collection('hits');

function BeiberHazClass() {
  //Private Properties
  var self = this;
  var MAX_WIDTH = 400;
  var MAX_HEIGHT = 400;

  //Public Properties
  this.LEFT_POSITION = new ReactiveVar();
  this.TOP_POSITION = new ReactiveVar();


  //Public Methods
  this.drawBeiber = function(){
    generateLeftPosition();  
    generateTopPosition();
  };

  this.destroyBeiber = function(){

  };

  //Private Methods
  function generateLeftPosition(){
    self.LEFT_POSITION.set(Math.floor(Math.random() * MAX_WIDTH) + "px");
  };

   function generateTopPosition(){
    self.TOP_POSITION.set(Math.floor(Math.random() * MAX_HEIGHT) + "px");
  };
};

if (Meteor.isClient) {

  Template.gameboard.created = function(){
    this.DaBeebz = new BeiberHazClass();
  };

  Template.gameboard.rendered = function(){
    this.DaBeebz.drawBeiber();
  };

  Template.gameboard.destroyed = function(){

  };

  Template.gameboard.helpers({
    hits: function(){
      return HitCollection.find().fetch().length;
    },

    topPosition: function(){
      return Template.instance().DaBeebz.LEFT_POSITION.get();
    },

    leftPosition: function(){
      return Template.instance().DaBeebz.TOP_POSITION.get();
    }
  });

  Template.gameboard.events({
   'click .the-beib' : function(){
      HitCollection.insert({hit: 1});
      Template.instance().DaBeebz.drawBeiber();
   }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
