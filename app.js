$(document).ready(function(){
	var myData = {
		title : 'Hello World From Mason.js',
		description : 'This is the first stuff made on MasonJs, as always',
		tags : ['hello','world']
	};

	var myTemplate = Mason({
		target   : '#main' ,
	})
	.fetchTemplate('templates/main.html')
	.setData(myData);

	setTimeout(function(){
		myData.tags.push('New Tag');
		myData.description += '. Second write';
		myTemplate.setData(myData);
	},1000)


	window.myTemplate = myTemplate;
	console.log(myTemplate);
});