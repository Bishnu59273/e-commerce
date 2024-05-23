<script setup>
import axios from "axios";
useHead({
  title: "products",
});
const cards = ref(null);
const isLoading = ref(false);
async function getProducts() {
  try {
    isLoading.value = true;
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/products"
    );
    cards.value = response.data;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

getProducts();
</script>
<template>
  <div>
    <NuxtLayout name="footer">
      <div class="container text-center">
        <h1>Products</h1>

        <div class="row">
          <div
            v-for="(card, index) in cards"
            :key="index"
            class="col-md-4 mb-4"
          >
            <div class="card h-100">
              <img
                :src="card.images"
                style="width: auto; height: 380px; object-fit: contain"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">
                  {{ card.title }}
                </h5>
                <p class="card-text description">
                  {{ card.description }}
                </p>
                <NuxtLink
                  :to="`/products/${card.id}`"
                  class="btn btn-success mt-3"
                >
                  Buy now
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<style scoped>
.description {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
