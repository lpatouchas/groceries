module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'groceries/bower_components/angular/angular.js',
      'groceries/bower_components/angular-route/angular-route.js',
      'groceries/bower_components/angular-mocks/angular-mocks.js',
      'groceries/components/**/*.js',
      'groceries/view*/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
