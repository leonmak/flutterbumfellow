Meteor.startup(function() {

    Meteor.Mailgun.config({
        username: 'postmaster@domain.com',
        password: 'password-goes-here'
    });

    Meteor.methods({
        'sendContactEmail': function(name, email, message) {
            this.unblock();

            Meteor.Mailgun.send({
                to: 'recipient@example.com',
                from: name + ' <' + email + '>',
                subject: 'New Contact Form Message',
                text: message,
                html: Handlebars.templates['contactEmail']({siteURL: Meteor.absoluteUrl(), fromName: name, fromEmail: email, message: message})
            });
        },
        'saveProject':function(project){
            check(project.name,String);
            project.userId = Meteor.userId();
            project.dateentered = new Date();
            project.lastupdate = new Date();
            if(!project.datadue){
                project.datedue = new Date();
            }
            if(!project.customer){
                // project.customer = Customers.findOne({})._id;
            }
            project.invited = [];
            return Projects.insert(project);
        },
        'addCalEvent': function (calevent) {
          if (!calevent.type) {
            calevent.type = 'milestone';
          }
          return Calevents.insert(calevent);
        },
        'updateCalEvent':function(calevent){
          return Calevents.update({_id:calevent._id},{
            $set:{
              title:calevent.title,
              project:calevent.project,
              type:calevent.type
            }
          })
        },
        'updateEventTimes':function(calEvent){
          return Calevents.update({_id:calEvent._id},{
            $set:{
              title:calEvent.title,
              start:calEvent.start,
              end:calEvent.end
            }
          })
        },
        'removeCalEvent':function(id){
          return Calevents.remove({_id:id});
        }
    });
});
