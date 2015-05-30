#Meteor Cheatsheett

##Mongo DB

>Functions

```javascript
//BASICS

//Create a new collection
new Mongo.Collection("collectionName");

//UTILITIES

//without any arguments return all collections
CollectionName.find();

//return all collection objects as JSON
CollectionName.find().fetch();

//return objects with parameter == value as JSON
CollectionName.find({name:"name"}).fetch();

CollectionName.find({}) == CollectionName.find();

//sort items by property (1 == lower to better, -1 == better to lower, exept alphabetical)  
CollectionName.find({}, {sort: {score: -1, name: 1} }).fetch();

//return numbers of objects in CollectionName
CollectionName.find().count();

//add object to collectionName
CollectionName.insert({property:value...});

//remove object from collection
CollectionName.remove({property: value});

//delete collection a write a new with update object
CollectionName.update();

//update specified object property to value
CollectionName.update(objectToUpdate, {$set: {propertyName : value}});

//update specified object and perform a numerical operation (+, -) on the property value
CollectionName.update(objectToUpdate, {$inc: {score : 5}});

//update specified object and multiply the property value by the giver value
CollectionName.update(objectToUpdate, {$mul: {score : 5}});

//return an object with specified id
CollectionName.findOne(object._id);
```

##Meteor
>CLI

in the console :

```javascript
//create new project name : projectName
meteor create projectName

//in project directory -> run the server + DB
meteor run

```

>Packages

In console :
```javascript
//add a package
meteor add packageName

//list of useful package

//create a Meteor.users database and crypt passwords etc.
meteor add accounts-password

//create a template a form for user registration
meteor add accounts-ui
//then add {{> loginButtons}} to a template


```

##Security
Always remove autopublish and insecure to prevent data flaws from console

```javascript
//remove a package from current app
meteor remove packageName

```

>Utils

Function to use in your code

```javascript
//run code only in client
if(Meteor.isClient){
  //code
}

//run code only in server
if(Meteor.isServer){
  //code
}

```

###Server Specific
all code put inside a server folder will execute only on server

```javascript
//publish the giver varible to the client
Meteor.publish("variableName", function(){
  //code
})

//add methods to fire on client and execute on Server like Socket.io
Meteor.methods({
  "methodName": function(arguments){
    //code
  }
})

```

###Client Specific
all code inside a client folder will execute only on client side

>Helper

```javascript
//create a new helper for a specific template
//run only in Client ex: if(Meteor.isClient)
Template.templateName.helpers({
  functionName: function(){
    //code
  }
})
//in client access data with {{functionName}}

//call a given method on Server
Meteor.call("methodName", arguments)

Template.templateName.events({
  "eventName (+ selector)": function(){
    //code
  }
})

Session.set("variableName", value); //store a temporary variable
Session.get("variableName"); //return variableName value if stored

```
