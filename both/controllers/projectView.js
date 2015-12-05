ProjectController = AppController.extend({
  waitOn: function() {
    this.subscribe("customers");
    return this.subscribe('projects');
  },
  data: function(){
    return Projects.findOne({_id:this.params.id});

  },
  onAfterAction: function () {
    Meta.setTitle('Project View' + Meta.options.suffix);
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
