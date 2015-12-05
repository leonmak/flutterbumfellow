Calevents = new Mongo.Collection("calevents");
Calevents.allow({
    insert: function(){
console.log('okw');
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    }
});
