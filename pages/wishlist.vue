<script setup>
import axios from "axios";
useHead({
  title: "products details",
});

const wishlist = ref([]);

// Fetch wishlist from localStorage
const fetchWishlist = () => {
  if (typeof localStorage !== "undefined") {
    const storedWishlist =
      JSON.parse(localStorage.getItem("whistListItems")) || [];
    wishlist.value = storedWishlist;
  } else {
    console.error("localStorage is not available.");
  }
};
// Remove the product
const removeFromWishlist = (index) => {
  wishlist.value.splice(index, 1);
  localStorage.setItem("whistListItems", JSON.stringify(wishlist.value));
};

fetchWishlist();
</script>
<template>
  <div>
    <NuxtLayout name="footer">
      <div class="container text-center">
        <div class="row">
          <div v-if="wishlist.length > 0" class="col">
            <h1 class="heading_w p-2 mb-2">Wishlist</h1>
            <ul>
              <li v-for="(product, index) in wishlist" :key="index">
                <img
                  :src="product.image"
                  alt=""
                  style="height: 400px; width: 400px; object-fit: contain"
                />
                <p>{{ product.description }}</p>
                {{ product.title }} - ${{ product.price }} <br />
                <button
                  type="button"
                  class="btn btn-danger mb-5 mt-5"
                  @click="removeFromWishlist(index)"
                >
                  Remove
                </button>
              </li>
            </ul>
          </div>
          <div class="p-5" v-else>
            <h4>add products to wishlist</h4>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<style scoped>
.heading_w {
  border: 1px solid black;
  border-radius: 20px;
  background: linear-gradient(to right, #fda5fa, #94ecfc);
  box-shadow: 0 4.377px 54.709px 0 hsla(0, 1%, 59%, 0.25);
}
</style>
