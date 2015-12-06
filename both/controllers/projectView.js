ProjectController = AppController.extend({
  waitOn: function() {
      this.subscribe("customers");
      this.subscribe("conversations", this.params.id); //id from url
      this.subscribe("todos", this.params.id);
      this.subscribe("calevents", this.params.id);
      this.subscribe("uploads", this.params.id);
      this.subscribe("directory");
      return this.subscribe('projects');
  },
  data: function(){
    Session.set('active_project',this.params.id);
    return Projects.findOne({_id:this.params.id});
  },
  onAfterAction: function () {
    Meta.setTitle('Project View ');
    // console.log(Meta);
  }
});
// ProjectController = AppController.extend({
//   waitOn: function() {
//     return this.subscribe('items');
//   },
//   data: {
//     items: Items.find({})
//   },
//   onAfterAction: function () {
//     Meta.setTitle('Project');
//   }
// });
