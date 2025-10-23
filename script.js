console.log("My Grocery List");
let groceries = [
  { name: "Rice", price: 16000 },
  { name: "Beans", price: 12500 },
  { name: "Vegetable Oil", price: 6000 },
  { name: "Cereal", price: 3250 },
];

const itemInput = document.getElementById("inputItem");
const priceInput = document.getElementById("inputPrice");
const addBtn = document.getElementById("addBtn");
const groceryList = document.getElementById("defaultGroceryList");
const totalBtn = document.getElementById("totalBtn");
const clearBtn = document.getElementById("clearBtn");
const totalDisplay = document.getElementById("totalDisplay");

function createList() {
  groceryList.innerHTML = "";
  groceries.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} : NGN${item.price.toLocaleString()}
      <button class="deleteBtn" data-index="${index}">Delete</button>
    `;
    groceryList.appendChild(li);
  });

  document.querySelectorAll(".deleteBtn").forEach((button) => {
    button.addEventListener("click", deleteItem);
  });
}

function addItem() {
  const name = itemInput.value.trim();
  console.log(name);
  const price = parseFloat(priceInput.value);
  console.log(`${name} : NGN${price}`);
  if (name === "" || isNaN(price) || price <= 0) {
    alert("Please enter a valid item name and price.");
    return;
  }

  groceries.push({ name, price });
  createList();

  itemInput.value = "";
  priceInput.value = "";
}

function deleteItem(event) {
  const index = event.target.getAttribute("data-index");
  groceries.splice(index, 1);
  createList();
}

function calculateTotal() {
  const total = groceries.reduce((sum, item) => sum + item.price, 0);
  totalDisplay.textContent = `Total: NGN${total.toLocaleString()}`;
}
function clearAll() {
  if (groceries.length === 0) {
    alert("Your list is already empty!");
    return;
  }

  if (confirm("Are you sure you want to clear all items?")) {
    groceries.length = 0;
    groceryList.innerHTML = "";
    totalDisplay.textContent = "Total: NGN0";
  }
}

addBtn.addEventListener("click", addItem);
totalBtn.addEventListener("click", calculateTotal);
clearBtn.addEventListener("click", clearAll);

createList();
