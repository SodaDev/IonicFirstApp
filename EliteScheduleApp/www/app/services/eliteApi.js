/**
 * Created by soda on 05/08/15.
 */
angular.module('eliteApp')
    .factory('eliteApi', ['$http', '$q', '$ionicLoading', function($http, $q, $ionicLoading){
        var currentLeagueId;
        return {
            getLeagues: function(callback){
                var deferred = $q.defer();
                $ionicLoading.show({ template: 'Loading...'});
                $http.get("http://elite-schedule.net/api/leaguedata/")
                    .success(function(data){
                        $ionicLoading.hide();
                        deferred.resolve(data);
                    })
                    .error(function(){
                        console.error("Error while making leagues HTTP call.");
                        $ionicLoading.hide();
                        deferred.reject();
                    });
                return deferred.promise;
            },
            getLeagueData: function(callback){
                var deferred = $q.defer();
                $ionicLoading.show({ template: 'Loading...'});
                $http.get("http://elite-schedule.net/api/leaguedata/" + currentLeagueId)
                    .success(function(data, status){
                        console.error('Received schedule data via HTTP.', data, status);
                        $ionicLoading.hide();
                        deferred.resolve(data);
                    })
                    .error(function(){
                        console.error("Error while making league data HTTP call for id: " + currentLeagueId);
                        $ionicLoading.hide();
                        deferred.reject();
                    });
                return deferred.promise;
            },
            setLeagueId: function(newLeagueId){
                currentLeagueId = newLeagueId;
            }
        }
    }]);