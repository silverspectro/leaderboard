Meteor.publish("Players", function(){
  return PlayerList.find();
});

Meteor.methods({
  "addPlayer": function(playerName){
    var currentUserId = Meteor.userId();  //return the unique id of currently logged User
    if(currentUserId) {
      PlayerList.insert({
        name: playerName,
        score: 0,
        createdBy: currentUserId
      });
    } else {
      console.log("Acces Denied");
    }
  },
  "removePlayer": function(playerId){
    var currentUserId = Meteor.userId();
    //Be sure that the remove operation is executed by the User who created the player
    PlayerList.remove({_id:playerId, createdBy: currentUserId});
  },
  "addScore": function(playerId, score){
    var currentUserId = Meteor.userId();
    PlayerList.update({_id:playerId, createdBy: currentUserId}, {
      $inc: {
        score: score
      }
    });
  }
})
