if(document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready);
}else{
	ready();
}

function ready() {
	var removeCartItemButtons = document.getElementsByClassName('btn-danger');
	console.log(removeCartItemButtons);
	for (var i = 0; i < removeCartItemButtons.length; i++) {
		var button = removeCartItemButtons[i];
		button.addEventListener('click', removeCartItem);
	}

	var quantityInputs = document.getElementsByClassName('cart-quantity-input');
	for (var i = 0; i < quantityInputs.length; i++) {
		var input = quantityInputs[i];
		input.addEventListener('change', quantityChanged);
	}	

	var addToCartButtons = document.getElementsByClassName('shop-item-button');
	for (var i = 0; i < addToCartButtons.length; i++) {
		var button = addToCartButtons[i];
		button.addEventListener('click', addToCartClicked);
	}

	document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
}

function displayCart() {
	document.getElementById("id2").classList.toggle("cart1");
}

function purchaseClicked() {
	alert('Please fill the form to complete the order successfully');
	var cartItems = document.getElementsByClassName('cart-items')[0];
	while (cartItems.hasChildNodes()) {
		cartItems.removeChild(cartItems.firstChild);
	}
	updateCartTotal();
	window.location = 'storeForm.html';
}

function removeCartItem(event) {
	var buttonClicked = event.target;
	buttonClicked.parentElement.parentElement.remove();
	updateCartTotal();
}

function quantityChanged(event) {
	var input = event.target;
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updateCartTotal();
}

function addToCartClicked(event) {
	var button = event.target;
	var shopItem = button.parentElement.parentElement;
	var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
	var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
	var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
	addItemToCart(title, price, imageSrc);	
	updateCartTotal();	
}

function addItemToCart(title, price, imageSrc){
	var cartRow = document.createElement('div');
	cartRow.classList.add('cart-row');
	var cartItems = document.getElementsByClassName('cart-items')[0];
	var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
	for (var i = 0; i < cartItemNames.length; i++) {
		if(cartItemNames[i].innerText == title) {
			alert('The item is already in the cart');
			return;
		}
	}
	
	var cartRowContents = 
	   `<div class="cart-item cart-column">
			<img class="cart-item-image" src="${imageSrc}" width="100" height="100">
			<h4 class="cart-item-title">${title}</h4>
		</div>
		<h4 class="cart-price cart-column">${price}</h4>
		<div class="cart-quantity cart-column">
			<h4> Qty <input class="cart-quantity-input" type="number" value="1"></h4><br>
			<button class="btn btn-danger" type="button">REMOVE</button>
		</div>`;
	cartRow.innerHTML = cartRowContents;
	cartItems.append(cartRow);
	cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
	cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

function updateCartTotal(){
	var cartItemContainer = document.getElementsByClassName('cart-items')[0];
	var cartRows = cartItemContainer.getElementsByClassName('cart-row');
	var total = 0;
	for (var i = 0; i < cartRows.length; i++) {
		var cartRow = cartRows[i];
		var priceElement = cartRow.getElementsByClassName('cart-price')[0];
		var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
		var price = parseFloat(priceElement.innerText.replace('$', ''));
		var quantity = quantityElement.value;
		total = total + (price * quantity);
	}
	total = Math.round(total * 100) / 100;
	document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}


// Font Size Increase and Decrease
		var min=8;
		var max=38;
		function increaseFontSize() {
		   var p = document.getElementsByTagName('p');
		   for(i=0;i<p.length;i++) {
		      if(p[i].style.fontSize) {
		         var s = parseInt(p[i].style.fontSize.replace("px",""));
		      } else {
		         var s = 12;
		      }
		      if(s!=max) {
		         s += 1;
		      }
		      p[i].style.fontSize = s+"px"
		   }
		}
		function decreaseFontSize() {
		   var p = document.getElementsByTagName('p');
		   for(i=0;i<p.length;i++) {
		      if(p[i].style.fontSize) {
		         var s = parseInt(p[i].style.fontSize.replace("px",""));
		      } else {
		         var s = 12;
		      }
		      if(s!=min) {
		         s -= 1;
		      }
		      p[i].style.fontSize = s+"px"
		   }   

		}