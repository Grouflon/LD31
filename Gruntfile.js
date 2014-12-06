
module.exports = function(grunt) {
	grunt.initConfig({

		clean: {
			// Cleaning public directory
			public: [
				"public/**/*",
				"!.gitignore"
			],

			scripts : [	"public/js/**" ],
			styles : [ "public/css/**" ],
			static : [ "public/**/*", "!public/js/**", "!public/css/**" ]
		},

		copy: {
			main: {
				files: [
					{ expand: true, cwd: 'src/', src: ['**', '!js/**', "!css/**", "!**/**.oep"], dest: 'public/' }
				]
			},

			requirejs: {
				files: [
					{ expand: true, cwd: 'node_modules/grunt-contrib-requirejs/node_modules/requirejs/', src: ['require.js'], dest: 'public/js/' }
				]
			}
		},

		requirejs: {
			compile: {
				options: {
					baseUrl: 'src/js',
					name: 'main',
					out: 'public/js/main.js',
					optimize: 'none'
				}
			}
		},

		less: {
			development: {
				files: {
					"public/css/main.css": "src/css/main.less"
				}
			}
		},

		watch: {
			scripts: {
				files : 'src/js/**',
				tasks: ['requirejs']
			},

			styles: {
				files : 'src/css/**',
				tasks: ['less']
			},

			static : {
				files : ['src/**', '!src/css/**', '!src/js/**'],
				tasks : ['clean:static', 'copy']
			}
		},

		connect: {
			server: {
				options: {
					port: 4004,
					base: 'public'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('dev', ['clean:public', 'copy', 'requirejs', 'less', 'connect', 'watch']);


};