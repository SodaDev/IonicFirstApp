/**
 * Created by soda on 05/08/15.
 */
angular.module('eliteApp').factory('myTeamsService',['CacheFactory', function(CacheFactory){
    var that = this;

    that.myTeamsCache = CacheFactory.createCache('myTeamsCache', {
        storageMode: 'localStorage'
    });

    function followTeam(team){
        that.myTeamsCache.put(team.id, team);
    }

    function unFollowTeam(team){
        that.myTeamsCache.remove(team.id/*.toString()*/);
    }

    function getFollowedTeams(){
        var teams = [],
            keys = that.myTeamsCache.keys();

        for(var i= 0, length = keys.length; i<length; i++){
            var team = that.myTeamsCache.get(keys[i]);
            teams.push(team);
        }
        return teams;
    }

    function isFollowingTeam(teamId){
        return that.myTeamsCache.get(teamId);
    }

    return {
        followTeam : followTeam,
        unFollowTeam : unFollowTeam,
        getFollowedTeams : getFollowedTeams,
        isFollowingTeam : isFollowingTeam
    }
}]);