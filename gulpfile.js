var gulp = require('gulp');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackdevserver = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');
var path = require('path');
var globs = require('globs');
var spawn = require('child_process').spawn;
const del = require('del');


/**
 * 获取入口文件
 * @param callback
 */
var getEntry = function(callback){
    globs('./src/page/*/index.js',function(err,files){
        var entry = {};
        files.forEach(function(file){
            var name = file.replace('./src/page/','').replace('/index.js','');
            entry[name] = file;
        });
        callback(entry);
    })
};

/**
 * 删除dist文件
 */
var delDist = function(){
    del.sync(webpackConfig.output.path);
};

/**
 * 编译并返回compiler
 * @param entry
 * @returns {*}
 */
var compile = function(entry){
    webpackConfig.entry = entry;
    Object.keys(entry).forEach(function(key){
        var plugin = new HtmlWebpackPlugin({
            template:'src/page/'+key+'/html.js',
            filename:key+'.html',
            inject:true,
            chunks:['commonjs',key]
        });
        webpackConfig.plugins.push(plugin);
    });


    return webpack(webpackConfig,function(err,stats){
        if(err){
            throw err;
        }
    });
};

/**
 * gulp dev
 */
gulp.task('dev',function(){
    webpackConfig.plugins = [];
    webpackConfig.devtool = 'source-map';
    delDist();
    getEntry(function(entry){
        var compiler = compile(entry);
        const server = new webpackdevserver(compiler,{
            inline:true,
            contentBase: webpackConfig.output.path,
            hot: false,
            historyApiFallback: true,
            stats:{
                colors:true
            }
        });
        server.listen(8080, '127.0.0.1', function() {});
        setTimeout(function(){
            spawn('open',['http://127.0.0.1:8080/index.html'])
        },1500);
    })
});

/**
 * gulp pre
 */
gulp.task('pre',function(){
    var cwd = process.cwd();
    var pathObj = path.parse(cwd);
    delDist();
    getEntry(function(entry){
        webpackConfig.output.publicPath="//oss.ltcdn.cc/pre/baitai-game/"+pathObj.name+"/";
        var compiler = compile(entry);
    })
});

/**
 * gulp prod
 */
gulp.task('prod',function(){
    var cwd = process.cwd();
    var pathObj = path.parse(cwd);
    delDist();
    getEntry(function(entry){
        webpackConfig.output.publicPath="//oss.ltcdn.cc/prod/baitai-game/"+pathObj.name+"/";
        var compiler = compile(entry);
    })
});


gulp.task('mock', function () {
    var kitty = require('vkitty');
    var serve = require('kitty-serve');
    kitty.watch(['./mock/api/*/h5/lottery/*'])
        .pipe(serve.src(
            {
                port: 7001,
                prePath: "/api/",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                }
            }
        ))
});