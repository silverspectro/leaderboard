Meteor.subscribe("Players");

Template.playerlist.helpers({
  player: function() {

    var currentUserId = Meteor.userId();

    if(currentUserId) {
      //find the players in the database
      return PlayerList.find(
        { createdBy: currentUserId }, //get players associated with currentUserId
        {
          sort: { //sort them
            score: -1,  //by score form better to lower
            name: 1 //by name alphabetically
          }
        }).fetch(); //convert to JSON
    }
    //find the players in the database
    return PlayerList.find(
      {}, //get players associated with currentUserId
      {
        sort: { //sort them
          score: -1,  //by score form better to lower
          name: 1 //by name alphabetically
        }
      }).fetch(); //convert to JSON

  },
  selectedPlayer: function() {
    return Session.get("selectedPlayer"); //get selectedPlayer variable stored in Session
  },
  selectedClass: function() {
    var playerId = this._id; //store player id
    var selectedPlayer = Session.get('selectedPlayer') || false; //check with click event
    if (playerId == selectedPlayer._id) {
      return "selected"; //return selected class if id == clicked object.id
    }
  }
});


//lists event for a specific template
//CSS selectors are provided
Template.playerlist.events({
  "click li.player": function(event) {
    Session.set("selectedPlayer", this); //set selectedPlayer Session variable to this object
  },
  "click button": function(event) {
    var selectedPlayer = Session.get('selectedPlayer')._id;
    var element = event.target;
    switch(element.className) {
      case "increment":
        Meteor.call("addScore", selectedPlayer, 5);
        break;
      case "decrement":
        Meteor.call("addScore", selectedPlayer, -5);
        break;
      case "delete":
        var really = confirm("Are you sure you want to delete " + Session.get('selectedPlayer').name + " ?")
        if(really)Meteor.call("removePlayer",selectedPlayer);
        break;
      default:
        console.log("nothing to do on " + this);
    }
  }
});

//list helpers function (like controllers) for a specific template
//access it in the template with the functionName {{functionName}}
Template.playerform.helpers({
  errorForm: function() {
    if(Session.get("formAlert") !== "")return Session.get("formAlert");
  }
});

Template.playerform.events({
  "submit form": function(event) {
    event.preventDefault();
    var playerName = event.target.playerName.value;

    if (playerName) {
      Meteor.call("addPlayer", playerName);
      event.target.playerName.value = "";
      Session.set("formAlert", "");
    } else {
      Session.set("formAlert", "Please write a name fr the player you wich to add");
    }
  }
});
