var fs = require('fs');
var marked = require('./js/marked.js');

var templateHtml = '';
fs.readFile('template.html', function (err, data) {
  if (err)
    throw err;
  if (data)
    templateHtml = data.toString('utf8');
});

fs.readdir(__dirname + '/posts/', function(err, files) {
    if (err) return;
    files.forEach(function(f) {
        if (f.indexOf('.md') != -1) {
        	var htmlOutput = __dirname + '/posts/' + f.replace('.md', '.html');
	        var postContent = '';
	        var htmlContent = '';
	        fs.readFile(__dirname + '/posts/' + f, function (err, data) {
			  if (err)
			    throw err;
			  if (data) {
			  	var markdownPost = data.toString('utf8');
			  	var lines = markdownPost.split('\n');
			  	var title = '';
			  	if (lines.length > 0) {
			  		title = lines[0].replace(/#/g, '').replace("\r\n", '').replace("\n", '');
			  	}
			  	postContent = marked(markdownPost);
			  	htmlContent = templateHtml.replace('{%content%}', postContent);
			  	htmlContent = htmlContent.replace('{%title%}', title);
			  	fs.writeFile(htmlOutput, htmlContent, function (err) {
				     if (err)
				       throw err;
				     else
				     	console.log('>>', htmlOutput);
				});
			  }
			});
        }
    });
});