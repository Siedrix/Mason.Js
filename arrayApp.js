$(document).ready(function(){
	var myData = [{
		id 	  :	'3',
		title : 'Hello World From Mason.js',
		slug  : 'This is the first stuff made on MasonJs, as always',
		tags  : ['hello','world']
	},
	{
		id 	  :	'4',
		title : 'Mason.js now has supor for arrays',
		slug  : 'Im suporting data as arrays, it duplicates templates',
		tags  : ['hello','world']
	}];

	var myTemplate = Mason({
		target   : '#main' 
	})
	.fetchTemplate('templates/main.html')
	.setData(myData)
	.mapData({
		slug : '#description',
		link : '#more a[href=/link/{:id}]'
	});
/*
	setTimeout(function(){
		myData.tags.push('New Tag');
		myData.slug += '. Second write';
		myTemplate.setData(myData);
	},1000);

	setTimeout(function(){
		myData.tags.push('Other Tags');
		myData.slug += '. Write Again';
		myTemplate.setData(myData);
	},5000);
*/
	window.myTemplate = myTemplate;
});