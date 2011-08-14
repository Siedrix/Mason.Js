/**
Mason Spec
this is a templating mivroframwork, yes, yet an other, Influenced by this article about Weld  and the dead of the templating engines from hij1nx
https://github.com/hij1nx/weld
http://blog.nodejitsu.com/micro-templates-are-dead

There ara many good templating engines out there in the javascript microframework world that we live on.

I have use some, all have cool features, but i allways feel that there is something missing.
--Pure http://beebole.com/pure/#
--Chain.js
--Ejs
--Mustachejs
--jQuery Templates

They can be divided in 2 big options, dom based or regex based. I preffer the Dom Based Ones, they feel more js.
Chain Js offer some event handeling been done to the template, in a Dom oriented way.

So the first question to solve is why an other one?
The first reason is that templating engines in javascript should be able to be use just ones, 
They should be use evety time data changes. 
Most template engine give you a dom ombject, append it to the document and run.

They should offer you a simple way to work above the Dom.

So what sould this template engine do:
--Templates should be written in a HTML files and loaded as we need them.
--Templates should be change as we change the data.
--Templates should not redo the whole Dom every time that we change the data.
--Templates should allow subtemplates and drawing structures


**/

//Mason Template
var myOldFashionTemplate = Mason({
	target   : 'Dom Object to append',
	template : 'Html for the template',
	data	 : 'Json for the template'
});

/**
Ok, this isnt anything new from what it is out there.
But it works, and some times, we already have everything.
**/

var myTemplete = Mason({
	target   : 'Dom Object to append'
})
.fetchTemplate('/somewhere/in/my/server')
.setData(myData);

/**
Thats a little thing better
Lets' improbe it a little bit more.
**/

myData.moreStuff = 'Yei More stuff';
 
myTemplate.setData(myData);

/*
But who does it know how to map my data?
Well, fisrt of all uses classes and ids on the html to find the information.

If thats to simple for your demands, you can set up a mapping function.
*/

myTemplate.mapData({
	'Some id, class or any css selector supported by sizzle' : myNew + ' : ' + value
});

/**
Yeah i steal this from the first link on the file.

But this not that much
**/
myTemplate.mapData({
	'Some id or class' : function(){
		return 'you can also use functions'
	},
	'map a class to a underscore function' : _.flatter(data);
});

/**
Now lets get a little bit crazy

lets map a class or an id to an other template
**/

myTemplate.mapData({
	'Some id or class this will be pass as a target' : Mason({
		'template' : 'Some template',
		'data'	   : someDataFromMyTemplate
	});
});

/**
	Now, who do im going to make this work, no idea, but i have a full devhouse to do it.
	SuperHappyDevHouse MexicoCity 
	http://shdhmc.pbworks.com/SHDH-21
**/