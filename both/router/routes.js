 Router.route('/', {
    name: 'home'
});

Router.route('/archives', {
    name: 'archives'
});

Router.route('/roles', {
    name: 'roles'
});

Router.route('/customers', {
    name: 'customers'
});

Router.route('/projects/:id', {
    name: 'projectView',
    controller: 'ProjectController'
});


Router.route('/dashboard', {
    name: 'dashboard',
    controller: 'DashboardController'
    // layoutTemplate: 'appLayout',
});

Router.plugin('ensureSignedIn', {
    only: ['dashboard','projects/:id']
});
