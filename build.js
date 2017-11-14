var spawn = require('child_process').spawn;
var fs = require('fs');
module.exports = {
    build:function(){
        var cwd = process.cwd();
        this.config = {
            cwd:cwd,
            files:[
                ['./build.js','-f',cwd],
                ['./gulpfile.js','-f',cwd],
                ['./webpack.config.js','-f',cwd],
                ['./package.json',cwd],
                ['./webpack.config.js',cwd],
                ['./README.md',cwd],
                ['./.gitignore',cwd],
                ['./mock','-rf',cwd],
                ['./src/components','-rf',cwd+'/src'],
                ['./src/modules','-rf',cwd+'/src'],
                ['./src/page/index/*.js',cwd+'/src/page/index'],
                ['./src/page/index/*.ejs',cwd+'/src/page/index'],
                ['./src/page/index/*.less',cwd+'/src/page/index']
            ]
        };
        this.mkdir();
        this.focusCopy();
    },

    mkdir:function(){
        var dirs = ['./src','./src/page','./src/page'];
        dirs.forEach(function(dir){
            if(!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
        });
    },

    focusCopy:function(){
        var files = this.config.files;
        files.forEach(function(file){
            spawn('cp',file);
        })
    }
};