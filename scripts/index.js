var pagination = require('hexo-pagination');

hexo.extend.generator.register('projects', function (locals) {
	// hexo-pagination makes an index.html for the /projectss route
	// console.log(locals.data);
	return pagination('projects', locals.data.projects, {
		perPage: 10,
		layout: ['projects'],
		data: {}
	});
});