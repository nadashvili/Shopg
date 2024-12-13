// Firebase კონფიგურაცია
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGvBTYzzNve7OhzJtLLZBszCYbAT5KLak",
  authDomain: "shop-e3c3f.firebaseapp.com",
  projectId: "shop-e3c3f",
  storageBucket: "shop-e3c3f.firebasestorage.app",
  messagingSenderId: "90283245856",
  appId: "1:90283245856:web:1c938ef6458aaf6afe5745",
  measurementId: "G-FW38R42PWB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const adminPassword = "dw1069"; // პაროლი

// პროდუქტების ჩვენება
function renderProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Price: $${product.price}</p>
            <p>Seller: ${product.phone}</p>
        `;
        productList.appendChild(productDiv);
    });
}

// პროდუქტების წაკითხვა Firebase-დან
function fetchProducts() {
    firebase.database().ref("products").on("value", (snapshot) => {
        const products = [];
        snapshot.forEach((childSnapshot) => {
            products.push(childSnapshot.val());
        });
        renderProducts(products);
    });
}

// პროდუქტის დამატება Firebase-ში
function addProduct(event) {
    event.preventDefault();

    const password = document.getElementById("admin-password").value;
    if (password !== adminPassword) {
        alert("Incorrect password!");
        return;
    }

    const name = document.getElementById("product-name").value;
    const price = parseFloat(document.getElementById("product-price").value);
    const image = document.getElementById("product-image").value;
    const phone = document.getElementById("seller-phone").value;

    if (!name || !price || !image || !phone) {
        alert("All fields are required!");
        return;
    }

    const newProduct = { name, price, image, phone };
    const productRef = firebase.database().ref("products").push();

    productRef.set(newProduct)
        .then(() => {
            document.getElementById("add-product-form").reset();
            alert("Product added successfully!");
        })
        .catch((error) => {
            console.error("Error adding product:", error);
        });
}

// საწყისი კონფიგურაცია
document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
    document.getElementById("add-product-form").addEventListener("submit", addProduct);
});