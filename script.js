let addedMeals = [];
let meals = [
  {
    name: "Pizza Margarita",
    description: "Mit Tomate und Mozzarella-Käse",
    price: 7.5,
  },
  {
    name: "Pizza Funghi",
    description: "Mit frischen Champignons",
    price: 8.9,
  },
  {
    name: "Pizza Salami",
    description: "Mit Rindersalami",
    price: 9.9,
  },
  {
    name: "Pizza Prosciutto",
    description: "Mit Vorderschinken",
    price: 9.9,
  },
  {
    name: "Pizza Sucuk",
    description: "Mit Knoblauchwurst, Peperoni und Zwiebeln",
    price: 9.5,
  },
];

function render() {
  let mealContent = document.getElementById("mealContent");
  mealContent.innerHTML = "";
  for (let i = 0; i < meals.length; i++) {
    const meal = meals[i];
    mealContent.innerHTML += createMealTemplate(meal, i);
  }
}

function createMealTemplate(meal, i) {
  return `
             <div class="meal-content" id="mealContent">
                <div class="meal-and-plusIcon">
                    <h4>${meal["name"]}</h4>
                    <img src="./img/plus-icon.png" onclick="addMenu(${i})" alt="Add-Icon">
                </div>               
                <p>${meal["description"]}</p>
                 <div class="meal-price"><b><span>${meal.price.toFixed(2).replace('.', ',')}</span>€</b></div>
            </div>     
    `;
}

function addMenu(mealIndex) {
  const selectedMeal = meals[mealIndex];
  const existingCartItem = addedMeals.find(
    (item) => item.name === selectedMeal.name);

  if (existingCartItem) {
    existingCartItem.quantity = (existingCartItem.quantity || 1) + 1;
  } else {
    selectedMeal.quantity = 1;
    addedMeals.push(selectedMeal);
  }

  const cartPlaceholder = document.getElementById("cartPlaceholder");
  if (cartPlaceholder) {
    cartPlaceholder.style.display = "none";
  }
  updateCart();
  saveCart();
}

function updateCart() {
  let cartContent = document.getElementById("cartContent");
  let totalPrice = 0;

  if (addedMeals.length === 0) {
    clearCartDisplay();
    return;
  }
  cartContent.innerHTML = "";
  for (let i = 0; i < addedMeals.length; i++) {
    const meal = addedMeals[i];
    const itemSubtotal = meal.price * (meal.quantity || 1);

    cartContent.innerHTML += createCartItemHTML(meal, i, itemSubtotal);
    totalPrice += itemSubtotal;
  }

  cartContent.innerHTML += createTotalsumUpdateCartTeamplate(totalPrice);
  toggleOrderButton(true);
  displayTotalPrice(totalPrice);
}

function createCartItemHTML(meal, i, itemSubtotal) {
  return `
    <table class="table-shopping-card">
      <tbody>
        <tr class="table-row">
          <td><p class="karte">${meal.name}</p></td>
          <td class="icons-shopping-card">
            <img src="./img/minus-icon.png" class="karte" onclick="decrementItem(${i})">
            <span class="karte">${meal.quantity || 1}</span>
            <img src="./img/plus-icon-circle.png" class="karte" onclick="incrementItem(${i})">
          </td>
          <td class="price-shopping-card">            
            <p class="karte">${itemSubtotal.toFixed(2).replace('.', ',')}€</p>
            <img src="./img/trashbox_II.png" class="karte" onclick="removeItem(${i})">
          </td>
        </tr>
      </tbody>
    </table>
  `;
}

function displayTotalPrice(totalPrice) {
  const responsiveTotalPrice = document.getElementById("responsiveTotalPrice");
  if (responsiveTotalPrice) {
    responsiveTotalPrice.innerHTML = "( " + totalPrice.toFixed(2).replace('.', ',') + "€" + " )";
  }
}

function clearCartDisplay() {
  const cartContent = document.getElementById("cartContent");
  cartContent.innerHTML = "";
  const cartPlaceholder = document.getElementById("cartPlaceholder");
  if (cartPlaceholder) {
    cartPlaceholder.style.display = "block";
  }
  toggleOrderButton(false);
}

function toggleOrderButton(show) {
  const orderButton = document.getElementById("orderButton");
  if (orderButton) {
    orderButton.style.display = show ? "block" : "none";
  }
}

function createTotalsumUpdateCartTeamplate(totalPrice) {
  return `
      <div class="total-sum">
        <b><span>Gesamt:</span>
          <p id="totalPrice">${totalPrice.toFixed(2).replace('.', ',')}€</p>
        </b>
      </div>
  `;
}

function incrementItem(itemIndex) {
  const cartItem = addedMeals[itemIndex];
  cartItem.quantity = (cartItem.quantity || 0) + 1;
  updateCart();
}

function decrementItem(itemIndex) {
  const cartItem = addedMeals[itemIndex];
  if (cartItem.quantity > 1) {
    cartItem.quantity -= 1;
  } else {
    addedMeals.splice(itemIndex, 1);
  }
  updateCart();
  saveCart();
}

function removeItem(itemIndex) {
  addedMeals.splice(itemIndex, 1);
  updateCart();
  saveCart();
}

function showResposiveShoppingCart() {
  const contentLeft = document.querySelector(".content-left");
  const contentRight = document.querySelector(".content-right");
  const closeButton = document.getElementById("closeButton");

  document.querySelector("header").style.display = "none";
  document.querySelector("footer").style.display = "none";

  contentLeft.style.display = "none";
  contentRight.style.width = "100%";
  contentRight.style.display = "block";
  closeButton.style.display = "block";
}

function closeResponsiveShoppingCart() {
  const contentLeft = document.querySelector(".content-left");
  const contentRight = document.querySelector(".content-right");
  const closeButton = document.getElementById("closeButton");

  document.querySelector("header").style.display = "block";
  document.querySelector("footer").style.display = "block";

  contentRight.style.display = "none";
  contentLeft.style.display = "block";
  closeButton.style.display = "none";
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(addedMeals));
}

function loadCart() {
  const cartData = localStorage.getItem("cart");
  if (cartData) {
    addedMeals = JSON.parse(cartData);
    updateCart();

    const cartPlaceholder = document.getElementById("cartPlaceholder");
    if (cartPlaceholder) {
      cartPlaceholder.style.display =
        addedMeals.length === 0 ? "block" : "none";
    }
  }
}


