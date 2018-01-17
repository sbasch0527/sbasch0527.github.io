(function() { // protect the lemmings!

	// the goal of this pset is to familiarize yourself with basic
	// jquery methods (so stuff that you will use very often/is useful)

	// we will explore the properties of
	//		.css()
	//		.hasClass(), .addClass(), .removeClass()
	// 		.find() vs the $( selector, jQuery object )
	//		.offset() vs .position()
	// 		.width() and .height()
	// 		.html() vs .text()

	// ------------------------------------------------------------
	// please select all the .card HTML elements in the document
	// and save as cards
	const cards = $('.card');
	console.log("cards: ", cards);

	// now, using the .css() method, please add a
	// border: 1px solid red to each item found in var cards
	// note how this applies to ALL the items in var cards

	// we will now explore another way to easily add css to jQuery elements
	// choose three CSS rules (it can be anything you like)
	// add ALL three rules to the var cards in ONE .css() call
	// feel free to google around for this

	// we can also use the .css() method to GET a css property of an element
	// select all the items in the document with class: profile
	const profile = $('.profile');
	const profiles2 = $('.profiles');
	console.log("profiles2: ",profiles2);

	// now, create a var called padding and store the padding CSS rule for the profile
	// var. what kind of variable is this? a number? string? boolean? array? object?

	//used .profiles rather than .profile as CSS only exists for the former. Using 'padding' in css rule didn't seem to work
	//and output an empty string. Got more specific and used 'padding-left'
	const profilePaddingRule = profiles2.css('padding-left');
	console.log("profilePaddingRule: ", profilePaddingRule, ", typeof profilePaddingRule: ", typeof(profilePaddingRule));


	// ------------------------------------------------------------
	// the .css() class is awesome and all - but from a performance perspective
	// it's not all the efficient. (The reason behind this is that adding inline styles
	// forces the browser to 'repaint' the browser viewport, which is very performance 
	// intensive). Instead, it is recommended that we write our styles in classes and 
	// simple add or remove them as necessary. This keeps code clean *and* efficient
	// using the var cards from earlier, add a class to each item called 'card-class-2'
	// with the .addClass() method

	// now, create a var called cardClass2 and select all the items with class: card-class-2
	// using the removeCLass method, remove the class: card-class-2 - SB
	const cardClass2 = $('.card-class-2');
	cardClass2.removeClass('card-class-2');
	console.log("cardClass2: ", cardClass2, ", number of cardClass2 elements: ", cardClass2.length);

	// console.log the var cardClass2 now that you've removed the class: card-class-2
	// see anything interesting/worth noting?

	//It removed itself and hence returned 0 objects - SB

	// please select all LIs that are the children of id: page-header
	const pageHeaderLIs = $('#page-header li');

	// using a for loop, loop through the items here and use the .hasClass method to find
	// the LI item that has the class: active
	// NOTE: what does the .hasClass() method return? BOOLEAN - SB
	console.log("pageHeaderLIs: ", pageHeaderLIs, ", number of pageHeaderLIs: ", pageHeaderLIs.length);

	/* ************* For some reason, getting error message: SCRIPT 438: Object doesn't support property or method 'hasClass' 
		.hasClass() works on pageHeaderLIs but not on pageHeaderLIs[i]... not sure how else to go through the object list
		with a for loop - used li.active instead

		for (i=0;i<pageHeaderLIs.length;i++) {
			if (pageHeaderLIs[i].hasClass('active')) {
				console.log('active: ', pageHeaderLIs[i]);
			}
		}
	*/

	const pageHeaderLIsActive = $('#page-header li.active');
	console.log('active: ', pageHeaderLIsActive);

	// ------------------------------------------------------------
	// using the .find() method on var cards, please find elements with class: profile
	const profiles = $('.profile');
	console.log("profiles: ", profiles);
	// using the .find() method on var cards, please find elements with class: tags
	const tags = $('.tags');
	console.log("tags: ", tags);
	// using the .find() method on var tags, please find all anchor tags
	const anchors = $('a');
	console.log("anchors: ", anchors);
	// using the .find() method on var anchors, find all span tags
	const spans = $('span');
	console.log("spans: ", spans);
	// console.log out var spans - what do you see? can you think of a test we can do,
	// with an if statement, that could reliably tell us if any items with your selector was found?
	// (this is food for though - don't have to write an actual answer)

	// ------------------------------------------------------------
	// .offset() and .position() are ways to get the position of a jquery element 
	// here's a good article about this: http://stackoverflow.com/questions/3202008/jquery-difference-between-position-and-offset
	// basically, .position() is relative to the parent whereas .offset() is relative to the viewport

	// let's put this to the test - using jquery, grab the last item from var cards
	const lastItem = $('.cards:last');
	console.log ("lastItem: ", lastItem);
	// call the .offset() and the .position() methods on var lastitem
	const lastItemPos = lastItem.position();
	const lastItemOffs = lastItem.offset();
	console.log("lastItemPos: ", lastItemPos, "lastItemOffs: ", lastItemOffs);
	// console.log both vars: lastItemPos and lastItemOffs
	// you will see that they are objects - create 4 vars that will each contain
	// one of the properties of each object
	const lastItemPosLeft = lastItemPos.left, lastItemPosTop = lastItemPos.top, lastItemOffsLeft = lastItemOffs.left, lastItemOffsTop = lastItemOffs.top;
	console.log("lastItemPosLeft: ", lastItemPosLeft, ", lastItemPosTop: ", lastItemPosTop);
	console.log("lastItemOffsLeft: ", lastItemOffsLeft, ", lastItemOffsTop: ", lastItemOffsTop);

	// are the property top of the .offset() and .position() the same? 
	// how about the property lefts? can you explain why or why not?
	// (again, food for though: no need to actually jot down any particular answer here)

	// Both offset and position are the same because object's parent is the document itself

	// ------------------------------------------------------------
	// for the var profiles, please use the .width() and .height() methods to
	// store width and height

	// nothing stored for profiles - using class=card instead - SB
	var profileWid, profileHeight;
	const cardWidth = $('.card').width(), cardHeight = $('.card').height();
	console.log("cardWidth: ", cardWidth, "cardHeight: ", cardHeight);
	// does this value reflect what you get if you try to find dimensions using Chrome Dev Tools?
	// if not, can you explain why not? (food for thought)

	// --- Chrome Dev tools uses computed widths & heights so numbers are different. 

	// what kind of variable type is profileWid and profileHeight?  --- number
	// use the .css() method to grab the height and width now
	var cssProfileWid, cssProfileHeight;
	const cardWidth2 = $('.card').css('width'), cardHeight2 = $('.card').css('height');
	console.log("cardWidth: ", cardWidth2, "cardHeight: ", cardHeight2);
	// what type of variable is cssProfileWid and cssProfileHeight? --- string

	// ------------------------------------------------------------
	// select the first LI item in var cards
	// using the .html() method, update the html code to
	// <strong>Hello Wrold</strong>

	// select the second LI item in var cards
	// do the same as above, but with the .text() method
	// whats the difference here?
})();

