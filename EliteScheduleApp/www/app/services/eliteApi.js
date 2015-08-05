/**
 * Created by soda on 05/08/15.
 */
angular.module('eliteApp')
    .factory('eliteApi', ['$http', '$q', function($http, $q){
        var currentLeagueId;
        return {
            getLeagues: function(callback){
                var deferred = $q.defer();
                $http.get("http://elite-schedule.net/api/leaguedata/")
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(){
                        console.log("Error while making leagues HTTP call.");
                        deferred.reject();
                    });
                return deferred.promise;
            },
            getLeagueData: function(callback){
                var deferred = $q.defer();
                $http.get("http://elite-schedule.net/api/leaguedata/" + currentLeagueId)
                    .success(function(data, status){
                        console.log('Received schedule data via HTTP.', data, status)
                        deferred.resolve(data);
                    })
                    .error(function(){
                        console.log("Error while making league data HTTP call for id: " + currentLeagueId);
                        deferred.reject();
                    });
                return deferred.promise;
            },
            setLeagueId: function(newLeagueId){
                currentLeagueId = newLeagueId;
            }
        }
    }]);