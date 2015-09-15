if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);
    
    Template.search.events({
	'keyup #textsearch': function(){

	    $("body").unhighlight();
	    var searchfor = $("#textsearch").val();
	    console.log(searchfor);
	    if(searchfor != ""){
		$("body").highlight(searchfor);
	    }
	}});
    
  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
