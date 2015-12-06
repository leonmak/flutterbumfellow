Template.calendar.rendered = function(){
    $calendar = $("#projectCalendar");
    var calendar = $calendar.fullCalendar({
        dayClick:function(date,jsEvent,view){

            var ce = {};
            ce.start = new Date(date);
            ce.color='red';
            ce.end= ce.start;
            ce.className='todo';
            ce.project = Session.get('active_project');
            ce.title = 'New Milestone';
            ce.owner = Meteor.userId;
            Meteor.call('addCalEvent',ce);
        },
        eventClick:function(calEvent,jsEvent,view){
            Session.set('editing_calevent',calEvent._id);
        },
        eventDrop:function(reqEvent){
            Meteor.call('updateEventTimes', reqEvent);
        },
        events:function(start,end,callback){
            var calEvents = Calevents.find({project:Session.get('active_project')},{reactive:false}).fetch();
            callback(calEvents);
        },
        eventRender:function(evt,ele){
            var bkgrd = 'teal';
            var icon = 'fa-users';
            var addtltext = '';
            if(evt.type === 'hoursworked'){
                bkgrd = 'darkblue';
                icon = 'fa-cog';
                addtltext = ' Hours Worked';
            }
            var html = '<div style="background-color:' + bkgrd;
            html +=';color:white"><i class="fa ' + icon + '"></i>';
            html += evt.title + addtltext + '</div>';
            ele.html(html);
        },
        header:{
            left:'title',
            center:'today',
            right:'prev,next'
        },
        contentHeight:200,
        theme:false,
        defaultView:'basicWeek',
        selectable:true,
        selectHelper:true,
        editable:true,
        weekMode:'liquid'
    }).data().fullCalendar; //send data to fullCalendar
    Deps.autorun(function(){ // when change re-render the cal
        Calevents.find({}).fetch();
        if(calendar){
            calendar.refetchEvents(); //full cal method
        }
    })
}

Template.caltask.events({
    'click .closeTask':function(){
        Session.set('editing_calevent',null);// so that editing_calevent is not true
    },
    'click .removeTask':function(){
        Meteor.call('removeCalEvent',Session.get('editing_calevent'));
        Session.set('editing_calevent',null);
    },
    'click .saveTask':function(calevent,tmpl){
        var type = tmpl.find('.taskTitle').value;
        if(tmpl.find('.name')){
          var name = tmpl.find('.name').value;
          var calevent = {};
          calevent._id = Session.get('editing_calevent');
          calevent.title = name;
          calevent.type = type;
          calevent.project = Session.get('active_project');
          Meteor.call('updateCalEvent',calevent);
      }
        Session.set('editing_calevent',null);
    },
});
