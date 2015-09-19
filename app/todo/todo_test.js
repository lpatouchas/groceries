'use strict';

describe('myApp.todo module', function() {

  beforeEach(module('myApp.todo'));

  describe('view1 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var todoCtrl = $controller('TodoCtrl');
      expect(todoCtrl).toBeDefined();
    }));

  });
});