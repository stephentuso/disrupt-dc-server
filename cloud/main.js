
function addToGroup(skip, limit, groupId) {
  var groupQuery = new Parse.Query('Group');
  var userQuery = new Parse.Query(Parse.User);
  userQuery.limit(limit);
  userQuery.skip(skip);
  userQuery.include('groups');
  userQuery.ascending('objectId');

  var group;
  return groupQuery.get(groupId).then(function(g) {
    group = g;
    return userQuery.find();
  })
  .then(function(u) {
    for (var i = 0; i < users.length; i++) {
      var groups = u[i].get('groups') || [];
      groups.push(group);
      u[i].set('groups', groups);
    }
    return Parse.Object.saveAll(u, { useMasterKey: true });
  })
}

Parse.Cloud.define('addToGroup', function(req, res) {
  Parse.Cloud.useMasterKey();
  addToGroup(req.params.skip, req.params.limit, req.params.groupId)
    .then(function() {
      res.success();
    }, function(error) {
      res.error(error);
    })
})

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});
