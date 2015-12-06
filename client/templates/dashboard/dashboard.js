Template.dashboard.events({
    'click .deleteConfirmation':function(evt,tmpl){
      evt.preventDefault();
      evt.stopPropagation();
      Session.set('projectToDelete',this._id);
    },
    'click .cancelDelete':function(){
      return Session.set('projectToDelete',null);
    }
});
Template.dashboard.helpers({
    projectToDelete: function(){
        return Session.get('projectToDelete');
    }
});
Template.projectView.helpers({
    editing_calevent: function(){
        return Session.get('editing_calevent');
    }
});
Template.delconfirm.events({
    "click .deleteConfirmed": function(event, template){
         Meteor.call('removeProject', Session.get('projectToDelete'));
        Session.set('projectToDelete',null);
    }
});
