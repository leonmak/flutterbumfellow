DashboardController = AppController.extend({
  waitOn: function() {
    return this.subscribe('projects');
  },
  data: {
    'projects': Projects.find()
  },
  onAfterAction: function () {
    Meta.setTitle('Dashboard');
  }
});
// DashboardController = AppController.extend({
//   waitOn: function() {
//     return this.subscribe('items');
//   },
//   data: {
//     items: Items.find({})
//   },
//   onAfterAction: function () {
//     Meta.setTitle('Dashboard');
//   }
// });
DashboardController.events({
  'click [data-action=doSomething]': function (event, template) {
    event.preventDefault();
  },
  'keyup input[type=text]': function(event,tmpl){
      if(event.which === 27 || event.which === 13){
          event.preventDefault();
          var project = {};
          project.name = tmpl.find('#projectNameEnter').value;
          Meteor.call('saveProject', project);
      }
  }

});
