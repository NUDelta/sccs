chatStream = new Meteor.Stream('chat');
chatCollection = new Meteor.Collection(null);

chatStream.on('chat', function(message) {
    console.log("receiving...");
    chatCollection.insert({
	userId: this.userId,
	subscriptionId: this.subscriptionId,
	message: message
    });

    console.log('user: ' + message);
    var wtf    = $('#messages');
    var height = wtf[0].scrollHeight;
    wtf.scrollTop(height);
});

Template.chatBox.helpers({
  "messages": function() {
    return chatCollection.find();
  }
});


var subscribedUsers = {};

Template.chatMessage.helpers({
  "user": function() {
      return "user";
  }
});

Template.chatBox.events({
    "click #party-line": function(){
	$('#chat-content').toggle();
    },
    "click #send": function() {
	var message = $('#chat-message').val();
	chatCollection.insert({
	    userId: 'me',
	    message: message
	});
	chatStream.emit('chat', message);
	console.log('me: ' + message);

	$('#chat-message').val('');
	var wtf    = $('#messages');
	var height = wtf[0].scrollHeight;
	wtf.scrollTop(height);
	
    },
    "keyup #chat-message": function(e, template) {
	if(e.which == 13){
	    var message = $('#chat-message').val();
	    chatCollection.insert({
		userId: 'me',
		message: message
	    });
	    chatStream.emit('chat', message);
	    $('#chat-message').val('');
	    var wtf    = $('#messages');
	    var height = wtf[0].scrollHeight;
	    wtf.scrollTop(height);
	    
	}
    }
    
});

// function getUsername(id) {
//   Meteor.subscribe('user-info', id);
//   Deps.autorun(function() {
//     var user = Meteor.users.findOne(id);
//     if(user) {
//       Session.set('user-' + id, user.profile.name);
//     }
//   });
// }
