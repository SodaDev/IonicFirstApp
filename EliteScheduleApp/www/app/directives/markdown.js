/**
 * Created by soda on 05/08/15.
 */
angular.module('eliteApp')
    .directive('markdown', function(){
    var converter = new Showdown.converter();

    return {
      restrict: 'A',
      link: function(scope, element, attrs){
          attrs.$observe('markdown', function(value){
              var markup = converter.makeHtml(value);
                console.log(markup);
              element.html(markup);
          })
      }
    };
});