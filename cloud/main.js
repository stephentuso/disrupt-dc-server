Parse.Cloud.define('getEvents', function(req, res) {
    let currentUser = req.user;

    // 1. get entire users table <<<<
    let userQuery = new Parse.Query(Parse.User);
    userQuery.find().then(function (users) {

    });

    req.user.get("groups")
    // 3. get every user in each of currentUser's group
    // 4. intersect groups
    // 5. choose group with largest intersection with user's groups

    // 6. get list events for each group <<<<

    // 7. compare events to interests and cap to N events /week

    // 8. return list of events (int time order) <<<<
    res.success('Hi');
});