module.exports = function(grunt){

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	var autoprefixer = require('autoprefixer-core');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

		sass: {
		    build: {
		    	options: {
		    		style: 'expanded'
		    	},
		        files: {
		            'assets/css/index.css': 'assets/sass/index.scss'
		        }
		    }
		},

	    postcss: {
	        options: {
	            processors: [
	              autoprefixer({ browsers: ['> 1%'] }).postcss
	            ]
	        },
	        dist: { src: 'assets/css/*.css' }
	    },

		jshint: {
			files: {
				src : 'assets/js/*.js'
			},
		},

		concat: {
			buildIndex: {
				src: [	
						'assets/concat/polopoly-header.html',
						'assets/concat/style-open.txt',
						'assets/css/index.css',
						'assets/concat/style-close.txt',
						'assets/widget.html',
						'assets/concat/script-open.txt',
						'assets/js/buildWidget.js',
						'assets/js/params.js',
						'assets/js/buildmap.js',
						'assets/js/buildbrush.js',
						'assets/js/buildData.js',
						'assets/js/buildKey.js',
						'assets/js/buildScales.js',
						'assets/js/buildTooltip.js',
						'assets/js/updateMap.js',
						'assets/js/index.js',
						'assets/concat/script-close.txt',
						'assets/concat/polopoly-footer.html'
						],
				dest: 'build/index.html'
			},
			distIndex: {
				src: [	
						'assets/concat/style-open.txt',
						'assets/css/index.css',
						'assets/concat/style-close.txt',
						'assets/widget.html',
						'assets/concat/script-open.txt',
						'assets/js/buildWidget.js',
						'assets/js/params.js',
						'assets/js/buildmap.js',
						'assets/js/buildbrush.js',
						'assets/js/buildData.js',
						'assets/js/buildKey.js',
						'assets/js/buildScales.js',
						'assets/js/buildTooltip.js',
						'assets/js/updateMap.js',
						'assets/js/index.js',
						'assets/concat/script-close.txt',
						],
				dest: 'dist/index.html'
			}
		},

		watch: {
		    css: {
		        files: ['assets/sass/**/*.scss'],
		        tasks: ['buildcss','concat']
		    },
			concat: {
				files: ['assets/*','assets/js/*.js'],
				tasks: ['jshint','concat']
			}
		}

    });

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('buildcss',  ['sass','postcss']);

};