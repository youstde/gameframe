var spawn = require('child_process').spawn;
var fs = require('fs');
var apiName = process.argv[2];

var Build = {
    create: function () {
        this._init();
        var cwd = this.config.cwd;
        this.config.files = this.config.files.concat([
            [__dirname + '/src/page/index/index.js', cwd + '/src/page/index'],
            [__dirname + '/src/page/index/html.js', cwd + '/src/page/index'],
            [__dirname + '/src/page/index/gamejson.js', cwd + '/src/page/index'],
            [__dirname + '/src/page/index/content.ejs', cwd + '/src/page/index'],
            [__dirname + '/src/page/index/index.less', cwd + '/src/page/index'],
            [__dirname + '/README.md', cwd]
        ]);
        this.mkdir();
        this.copy();
    },

    update: function () {
        this._init();
        this.mkdir();
        this.copy();
    },

    _init: function () {
        var cwd = process.cwd();
        this.config = {
            cwd: cwd,
            files: [
                ['-rf',__dirname + '/mock', cwd],
                ['-f',__dirname + '/gitignore.txt', cwd+'/.gitignore'],
                ['-f', __dirname + '/gulpfile.js', cwd],
                ['-f', __dirname + '/webpack.config.js', cwd],
                ['-f', __dirname + '/package1.json', cwd+'/package.json'],
                ['-rf', __dirname + '/src/components', cwd + '/src'],
                ['-rf', __dirname + '/src/modules', cwd + '/src']
            ]
        };
    },

    mkdir: function () {
        var dirs = ['/src', '/src/page', '/src/page/index'];
        var cwd = this.config.cwd;
        dirs.forEach(function (dir) {
            dir = cwd + dir;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
        });
    },

    copy: function () {
        var files = this.config.files;
        files.forEach(function (file) {
            spawn('cp', file);
        })
    }
};

if (apiName && Build[apiName]) {
    Build[apiName]();
}

module.exports = Build;