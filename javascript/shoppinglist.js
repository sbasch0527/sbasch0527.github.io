const getShoppingList = () => {

	const ShoppingList = {
		list: [],
		price: [],
		total: 0.00,
		addToList: (item,price) => {
			ShoppingList.list.push(item);
			ShoppingList.price.push(parseFloat(price).toFixed(2));
			//ShoppingList.total += price;
			console.log('adding: ',ShoppingList.displayList());
			return ShoppingList.list;	
		},
		removeFromList: (listItem,price) => {
			ShoppingList.list = ShoppingList.list.filter((currentItem) => {
				return currentItem !== listItem;
			});
			ShoppingList.price = ShoppingList.price.filter((currentPrice) => {
				return currentPrice !== price;
			});
			console.log('removing: ',ShoppingList.displayList());
			return ShoppingList.list;
		},
		editList: (item,price,idx) => {
			console.log('editList - before editing: ',ShoppingList.displayList());
			ShoppingList.list[idx] = item; 
			ShoppingList.price[idx] = parseFloat(price).toFixed(2);
			console.log('editList - after editing: ',ShoppingList.displayList());
			return ShoppingList.list;
		},
		displayList: () => {
			let str = '';
			for (let i = 0; i < ShoppingList.list.length; i++) {
				str += (i+1) + '. ' + ShoppingList.list[i] + ', ' + ShoppingList.price[i] + '\n';
			}
			return str;
		},
		countItemsInList: () => {
			return ShoppingList.list.length;
		}
	};	

	return ShoppingList;

};


// -----------------------------------------------------
// create empty shopping list
const myShoppingList = getShoppingList();


// we use the render function to ALWAYS draw an
// accurate depiction of the shoppinglist for the user
const render = (container, shoppingList) => {
	let str = '';
	let calculatedTotal = 0.00;

	for (let i = 0; i < shoppingList.countItemsInList(); i++) {
		str += `<li><span class="js-shopping-list-listitem" data-idx="${i}">${shoppingList.list[i]}</span>, <span class="js-shopping-list-listprice" data-idx="${i}">$${shoppingList.price[i]}</span><span class="js-edit-btn btn btn-primary" style="margin: 0 0 10px 10px;"><i class="glyphicon glyphicon-pencil"></i></span><span class="js-delete-btn btn btn-primary" style="margin: 0 0 10px 10px;"><i class="glyphicon glyphicon-remove"></i></span></li>`;
		calculatedTotal = calculatedTotal + parseFloat(shoppingList.price[i]);
	}
	container.innerHTML = `<ol>${str}</ol>`;
	listTotal.innerHTML = `Total: $${calculatedTotal.toFixed(2)}`;
}


const onAddToListClicked = (evt) => {
	// BUTTON equivalent to ENTER when adding items
	const itemInput = document.querySelector('.js-shopping-list-item');
	const priceInput = document.querySelector('.js-shopping-list-item-price');

	if (itemInput.value != '' && inputValue.length >= 3) {
		//read the "Item" input field to add to list
		itemValue = itemInput.value;
		if (priceInput.value != '') {
			//read the "Price" input field to add to list
			priceValue = parseFloat(priceInput.value);
			if (priceValue >= 0.00) {
				myShoppingList.addToList(itemValue,priceValue);
				render(shoppingListCont, myShoppingList);	
				//clear out input & place focus back on item text field
				shoppingListInput.value = '';
				shoppingListPrice.value = '';			
				shoppingListInput.focus();
			} else {
				priceInput.value = "Enter a valid price";
				shoppingListPrice.focus();
				return false;
			}
		} else {
			priceInput.value = "Please enter a price";
			shoppingListPrice.focus();
			return false;
		}
	} else {
		itemInput.value = "Please enter a valid item";
		shoppingListInput.focus();
		return false;
	}	

}

const editItem = (itemContainer,priceContainer,idx) => {
	itemContainer.innerHTML = `<input type="text" class="js-edit-text" value="${itemContainer.innerHTML}" data-idx="${idx}" /> `;
	priceContainer.innerHTML = `<input type="text" class="js-edit-price" value="${priceContainer.innerHTML.substr(1,priceContainer.innerHTML.length)}" data-idx="${idx}" /><br /><i>Hit ENTER when done updating both fields</i>`	
}

const onEnterKeyPressed = (evt) => {

	if (evt.keyCode === 13) {
		if (evt.target.matches('.js-edit-text') || evt.target.matches('.js-edit-price')) {
			//EDIT PRICE
			const editedItem = document.querySelector('.js-edit-text');
			const editedPrice = document.querySelector('.js-edit-price');

			if (editedItem.value != '' && editedItem.value.length >= 3 && editedPrice.value != '' && isNaN(editedPrice.value) === false) {
				//make sure both fields are not empty before saving edits
				const idxEdited = evt.target.getAttribute('data-idx');
				//pass in editedPrice without initial dollar sign
				console.log('passing in: ',editedPrice.value);
				myShoppingList.editList(editedItem.value,editedPrice.value,idxEdited);
				render(shoppingListCont,myShoppingList);					
			} else {
				evt.target.value = "Please enter a valid item.";
				return false;
			}
		} else if (evt.target.matches('.js-shopping-list-item-price')) {
			//ADDING
			if (evt.target.value === '') {
				evt.target.value = "Please enter a price";
				return false;
			}
			//read the "Price" input field to add to list
			priceValue = parseFloat(evt.target.value);
			itemValue = shoppingListInput.value;

			if (priceValue >= 0.00) {
				//make sure price is valid
				if (itemValue != '' && itemValue.length >= 3) {
					//make sure item  has already been entered before adding to list
					myShoppingList.addToList(itemValue,priceValue);
					render(shoppingListCont, myShoppingList);
					//clear out input & place focus back on item text field
					shoppingListInput.value = '';
					shoppingListPrice.value = '';
					shoppingListInput.focus();
				} else {
					//need user to enter item
					shoppingListInput.value = 'Please enter a valid item';
					shoppingListInput.focus();
				}
			} else {
				//invalid price format
				shoppingListPrice.value = "Enter a valid price";
				shoppingListPrice.focus();
				return;
			}

		} else {
			//Else text field is item, ADDING
			if (evt.target.value === '' || evt.target.value.length < 3) {
				evt.target.value = "Please enter a valid item";
				return false;
			}
			// read the "Item to add" and "Price" input fields to add to list
			itemValue = evt.target.value;
			priceValue = shoppingListPrice.value;

			// make sure price is entered and a number
			if (priceValue != '' && parseFloat(priceValue) != 'NaN') {
				myShoppingList.addToList(itemValue,priceValue);
				render(shoppingListCont, myShoppingList);
				//clear out input & place focus back on item text field
				shoppingListInput.value = '';
				shoppingListPrice.value = '';
				shoppingListInput.focus();
			} else {
				//need user to enter price
				shoppingListPrice.value = "Please enter a price";
				shoppingListPrice.focus();
			}
		}
	}
} // keypress handler

const onContainerClicked = (evt) => {
	//console.log(evt);
	//console.log('container clicked: ', evt.target.parentNode.firstChild);
	if (evt.target.matches('.js-delete-btn')) {
		const idx = evt.target.parentNode.firstChild.getAttribute('data-idx');
		const itemContainer = document.querySelector('.js-shopping-list-listitem[data-idx="'+idx+'"]');
		const priceContainer = document.querySelector('.js-shopping-list-listprice[data-idx="'+idx+'"]');
		myShoppingList.removeFromList(itemContainer.innerHTML,priceContainer.innerHTML);
		render(shoppingListCont, myShoppingList);
	} else if (evt.target.matches('.glyphicon-remove')) {
		const idx = evt.target.parentNode.parentNode.firstChild.getAttribute('data-idx');
		const itemContainer = document.querySelector('.js-shopping-list-listitem[data-idx="'+idx+'"]');
		const priceContainer = document.querySelector('.js-shopping-list-listprice[data-idx="'+idx+'"]');
		myShoppingList.removeFromList(itemContainer.innerHTML,priceContainer.innerHTML);
		render(shoppingListCont, myShoppingList);
	} else if (evt.target.matches('.js-edit-btn')) {
		const idx = evt.target.parentNode.firstChild.getAttribute('data-idx');
		const itemContainer = document.querySelector('.js-shopping-list-listitem[data-idx="'+idx+'"]');
		const priceContainer = document.querySelector('.js-shopping-list-listprice[data-idx="'+idx+'"]');
		editItem(itemContainer,priceContainer,idx);
		evt.target.style.display = "none";
	} else if (evt.target.matches('.glyphicon-pencil')) {
		const idx = evt.target.parentNode.parentNode.firstChild.getAttribute('data-idx');
		const itemContainer = document.querySelector('.js-shopping-list-listitem[data-idx="'+idx+'"]');
		const priceContainer = document.querySelector('.js-shopping-list-listprice[data-idx="'+idx+'"]');
		editItem(itemContainer,priceContainer,idx);
		evt.target.parentNode.style.display = "none";
	}
}


// INIT VARIABLES
const shoppingListInput = document.querySelector('.js-shopping-list-item');
const shoppingListPrice = document.querySelector('.js-shopping-list-item-price');
const addToList = document.querySelector('.js-add-to-list');
const shoppingListCont = document.querySelector('.js-shopping-list-container');
const listTotal = document.querySelector('.js-total');
let itemValue = '';
let priceValue = 0.00;
	
// EVENT HANDLERS
addToList.addEventListener('click', onAddToListClicked);
document.addEventListener('keypress',onEnterKeyPressed);
shoppingListCont.addEventListener('click', onContainerClicked);