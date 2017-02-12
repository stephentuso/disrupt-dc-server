Parse.Cloud.define('getEvents', function(req, res) {

// jacob code start:
    let userQuery = new Parse.Query(Parse.User)
    userQuery.limit(1000)
    userQuery.include('groups')
    userQuery.find().then(function (users) {

        let allGroups = {}
        req.user.get('groups').forEach(function (group) {
            users.forEach(function (user) {
                var isInside = false
                user.get('groups').forEach(function (inner_group) {
                    // is the currentUser's group equal to this person's group?
                    isInside = (inner_group.id == group.id)
                    // console.log(inner_group.id, group.id)
                })
                if (isInside) {
                    if (isNaN(allGroups[group.id])) {
                        allGroups[group.id] = 0
                    }
                    allGroups[group.id]++
                }
            })
        })

        let eventQuery = new Parse.Query('Event')
        eventQuery.limit(1000)
        eventQuery.include('group')
        eventQuery.find().then(function (events) {
            res.success(events);
        })
    });
// jacob code end

});