<script setup>
import axios from "axios";
useHead({
  title: "products details",
});

const quantity = 1;
const id = useRoute().params;
const details = ref(null);
const found = ref(null);
const isLoading = ref(false);
async function getProducts() {
  try {
    isLoading.value = true;
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/products"
    );
    details.value = response.data;
    if (Array.isArray(details.value)) {
      found.value = details.value.find((iitem) => iitem.id == id.id);
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

// add and remove item to cart
if (typeof localStorage !== "undefined") {
  var storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
  var storedTotal = JSON.parse(localStorage.getItem("total"));
}
const cartItems = ref(storedCartItems || []);
const total = ref(storedTotal || 0);

const addItemToCart = (title, images, price) => {
  const item = { title, images, price };
  cartItems.value.push(item);
  total.value += price;
  // Update local storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems.value));
  localStorage.setItem("total", JSON.stringify(total.value));
};

// whistlist
let storedWhistlistItems = [];

if (typeof localStorage !== "undefined") {
  storedWhistlistItems =
    JSON.parse(localStorage.getItem("whistListItems")) || [];
}

const whistListItems = ref(storedWhistlistItems);
const router = useRouter();

const addWhistlist = (found) => {
  if (typeof localStorage !== "undefined") {
    whistListItems.value.push(found);
    localStorage.setItem(
      "whistListItems",
      JSON.stringify(whistListItems.value)
    );
    console.log("added item to wishlist:", found);
    router.push("/wishlist");
  } else {
    console.error(
      "localStorage is not available. Unable to add item to wishlist."
    );
  }
};
const removeItem = (index) => {
  // Retrieve cartItems from localStorage
  let storedCartItems = JSON.parse(localStorage.getItem("cartItems"));

  // Check if storedCartItems is not null and index is valid
  if (storedCartItems && index >= 0 && index < storedCartItems.length) {
    // Remove item at the specified index
    const removedItem = storedCartItems.splice(index, 1)[0];

    // Update localStorage with the modified cartItems
    localStorage.setItem("cartItems", JSON.stringify(storedCartItems));

    // Update cartItems reactive variable
    cartItems.value = storedCartItems;

    // Update total price by subtracting the price of the removed item
    total.value -= removedItem.price;

    // Update total price in localStorage
    localStorage.setItem("total", total.value);
  }
};
// zoom img
// document.addEventListener("DOMContentLoaded", function () {
//   const imgZoomerBox = document.getElementById("img-zoomer-box");
//   const zoomedImageContainer = document.getElementById(
//     "zoomed-image-container"
//   );

//   imgZoomerBox.addEventListener("mouseover", function () {
//     const img = this.querySelector("img");
//     const clonedImg = img.cloneNode(true);

//     zoomedImageContainer.innerHTML = ""; // Clear previous content
//     zoomedImageContainer.appendChild(clonedImg);
//     zoomedImageContainer.style.display = "block";
//   });

//   imgZoomerBox.addEventListener("mousemove", function (e) {
//     const rect = this.getBoundingClientRect();
//     const offsetX = e.clientX - rect.left;
//     const offsetY = e.clientY - rect.top;

//     zoomedImageContainer.style.top = `${offsetY}px`;
//     zoomedImageContainer.style.left = `${rect.right}px`;
//   });

//   imgZoomerBox.addEventListener("mouseout", function () {
//     zoomedImageContainer.style.display = "none";
//   });
// });

getProducts();
</script>
<template>
  <div>
    <NuxtLayout name="footer">
      <div v-if="isLoading" class="py-5"><div class="loader"></div></div>
      <div v-if="!isLoading">
        <div v-if="found" class="container py-5">
          <div class="row align-items-center">
            <div class="col-md-12">
              <div class="d-grid d-md-flex justify-content-md-end">
                <button
                  class="btn btn-primary"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                  View cart
                </button>
              </div>
            </div>
            <div class="col-md-4">
              <div id="img-container">
                <div id="img-zoomer-box">
                  <img
                    id="img-1"
                    :src="found.images"
                    alt="Zoom Image on Mouseover"
                    class="img-fluid demo-trigger"
                  />
                  <div id="zoomed-image-container"></div>
                </div>
              </div>
            </div>
            <div class="col-md-7 offset-md-1">
              <h1 class="mb-4">{{ found.title }}</h1>
              <span class="badge text-bg-secondary mb-3 text-uppercase fs-6">{{
                found.category.name
              }}</span>
              <p>
                {{ found.description }}
              </p>
              <br />
              <!-- <h5><i class="bi bi-star"></i> {{ found.rating.rate }}</h5> -->
              <br />
              <h6 class="card-text">{{ found.price }}$</h6>
              <div class="pb-2 pt-2">
                <div class="d-flex quantity col-md-3 col-4">
                  <span class="quantity-text bg-danger text-light"
                    >Quantity</span
                  >
                  <input
                    type="number"
                    class="quantity-number"
                    v-model="quantity"
                  />
                </div>
              </div>
              <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                <button type="button" class="btn btn-success add-to-cart">
                  Buy Now
                </button>
                <button
                  type="button"
                  class="btn btn-success add-to-cart"
                  @click="addItemToCart(found.title, found.images, found.price)"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  class="btn btn-success add-to-cart"
                  @click="addWhistlist(found)"
                >
                  Add to whistlist
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="container text-center py-5">
          <h1>Oops! id {{ id.id }} details is not available</h1>
        </div>

        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div class="offcanvas-header">
            <h5 id="offcanvasRightLabel">Shopping Cart</h5>
            <button
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body footer">
            <div id="cart">
              <ul id="cart-items">
                <li v-for="(item, index) in cartItems" :key="index">
                  <div class="CartHeader">
                    <img
                      :src="item.images"
                      alt="..."
                      class="img-fluid demo-trigger"
                    />
                    {{ item.title }} - ${{ item.price }}
                  </div>
                  <div class="cart-footer">
                    <button
                      type="button"
                      class="btn btn-danger mb-5 mt-5"
                      @click="removeItem(index)"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              </ul>
              <div class="totalPrice">
                <p>Total:${{ total }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<style scoped>
.loader {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7986cb; /* Change color as per your preference */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.quantity-number {
  width: 30%;
}
.quantity-text {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.footer {
  position: relative;
}

.cart-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
/* zoom img */

#img-container {
  position: relative;
}

#zoomed-image-container {
  display: none;
  position: absolute;
  top: 0;
  left: 100%;
  width: 200px; /* Adjust the width and height of the zoomed image container */
  height: auto;
  border: 1px solid #ccc; /* Optional: add styling to the zoomed image container */
}
</style>
