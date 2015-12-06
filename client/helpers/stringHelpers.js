Template.registerHelper('truncate', function(string, length) {
    var cleanString = s(string).stripTags();
    return s(cleanString).truncate(length);
});


Template.registerHelper('formatdate', function(datetime) {
    if(moment && datetime){
        return moment(datetime).format('MM/DD/YYYY');
    }else{
        return datetime;
    }
});
