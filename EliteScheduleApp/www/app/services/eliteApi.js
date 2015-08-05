/**
 * Created by soda on 05/08/15.
 */
angular.module('eliteApp')
    .factory('eliteApi', ['$http', '$q', '$ionicLoading', 'CacheFactory', function($http, $q, $ionicLoading, CacheFactory){
        var leaguesCache = CacheFactory.createCache('leaguesCache', {
            storageMode: "localStorage",
            maxAge: 5*60*1000,
            deleteOnExpire: "aggressive",
            onExpire: function(key, value){
                getLeagues().then(function(){
                    console.log('Leagues cache was automatically refreshed');
                }, function(){
                    console.log('Error getting data. Putting expired item back into the cache');
                    leaguesCache.put(key, value);
                })
            }
        });
        var leagueDataCache = CacheFactory.createCache('leagueDataCache', {
            storageMode: "localStorage",
            maxAge: 5*60*1000,
            deleteOnExpire: "aggressive"
        });
        var staticCache = CacheFactory.createCache('staticCache', {
            storageMode: "localStorage"
        });

        function getLeagues(){
            var deferred = $q.defer(),
                cacheKey = "leagues",
                leaguesData = leaguesCache.get(cacheKey);

            if(leaguesData){
                console.log('Found data inside cache', leaguesData);
                deferred.resolve(leaguesData);
            } else {
                $ionicLoading.show({ template: 'Loading...'});
                $http.get("http://elite-schedule.net/api/leaguedata/")
                    .success(function(data){
                        $ionicLoading.hide();
                        leaguesCache.put(cacheKey, data);
                        deferred.resolve(data);
                    })
                    .error(function(){
                        console.error("Error while making leagues HTTP call.");
                        $ionicLoading.hide();
                        deferred.reject();
                    });
            }


            return deferred.promise;
        }

        function getLeagueData(forceRefresh){
            var deferred = $q.defer(),
                cacheKey = "leagueData-" + getLeagueId(),
                leagueData = null;

            if(!forceRefresh){
                leagueData = leagueDataCache.get(cacheKey);
            }

            if(leagueData){
                console.log('League ' + getLeagueId() + ' data found in cache');
                deferred.resolve(leagueData);
            } else {
                $ionicLoading.show({ template: 'Loading...'});
                $http.get("http://elite-schedule.net/api/leaguedata/" + getLeagueId())
                    .success(function(data, status){
                        console.info('Received schedule data via HTTP.', data, status);
                        leagueDataCache.put(cacheKey, data);
                        $ionicLoading.hide();
                        deferred.resolve(data);
                    })
                    .error(function(){
                        console.error("Error while making league data HTTP call for id: " + getLeagueId());
                        $ionicLoading.hide();
                        deferred.reject();
                    });

            }

            return deferred.promise;
        }

        function setLeagueId(newLeagueId){
            staticCache.put('currentLeagueId', newLeagueId);
        }

        function getLeagueId(){
            return staticCache.get('currentLeagueId');
        }

        return {
            getLeagues: getLeagues,
            getLeagueData: getLeagueData,
            setLeagueId: setLeagueId,
            getLeagueId: getLeagueId
        }
    }]);