<script setup>
import axios from "axios";
useHead({
  title: "MyBlog",
  //   meta: [
  //     {
  //       property: "og:title",
  //       content: "About",
  //     },
  //     {
  //       property: "og:site_name",
  //       content: "Bishnu",
  //     },
  //     {
  //       property: "og:description",
  //       content: "developer.",
  //     },
  //     {
  //       name: "description",
  //       content: "developer.",
  //     },
  //   ],
});

const cards = ref(null);
const isLoading = ref(false);
async function getProducts() {
  try {
    isLoading.value = true;
    const response = await axios.get(
      "https://fakestoreapi.com/products?offset=0&limit=09"
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
      <div class="home_body">
        <div class="home_banner">
          <div class="container-fluid p-0">
            <div class="row">
              <div
                id="carouselExampleDark"
                class="carousel carousel-light slide"
                data-bs-ride="carousel"
              >
                <div class="carousel-inner">
                  <div class="carousel-item active" data-bs-interval="10000">
                    <img
                      src="/images/p1.avif"
                      style="height: 600px; width: 100%"
                      class="d-block w-100"
                      alt="..."
                    />
                    <div class="carousel-caption d-none d-md-block text-light">
                      <h5>MyBlog</h5>
                      <p>
                        Consistency is key to building and maintaining a
                        successful blogging site. Regularly publishing
                        high-quality content not only keeps your audience
                        engaged but also signals to search engines that your
                        site is active and relevant.
                      </p>
                    </div>
                  </div>
                  <div class="carousel-item" data-bs-interval="2000">
                    <img
                      src="/images/p4.jpg"
                      style="height: 600px; width: 100%"
                      class="d-block w-100"
                      alt="..."
                    />
                    <div class="carousel-caption d-none d-md-block text-light">
                      <h5>The Art of Storytelling: Engaging Your Readers</h5>
                      <p>
                        Some representative placeholder content for the second
                        slide.
                      </p>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img
                      src="/images/p5.jpg"
                      style="height: 600px; width: 100%"
                      class="d-block w-100"
                      alt="..."
                    />
                    <div class="carousel-caption d-none d-md-block text-light">
                      <h5>The Importance of Consistency in Blogging</h5>
                      <p>
                        Some representative placeholder content for the third
                        slide.
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button
                  class="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="card_box">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="card_box_title text-center py-3 py-md-5">
                  <h1>The Rise of Artificial Intelligence in Everyday Life</h1>
                  <p>
                    In recent years, artificial intelligence (AI) has
                    transformed from a futuristic concept to an integral part of
                    our everyday lives. From voice assistants on our smartphones
                    to recommendation algorithms on streaming platforms, AI
                    technologies are shaping the way we interact with the world
                    around us. In this article, we'll explore some of the key
                    areas where AI is making a significant impact and discuss
                    its implications for the future.
                  </p>
                </div>
              </div>
              <div
                v-for="(card, index) in cards"
                :key="index"
                class="col-md-4 mb-4"
              >
                <div class="card h-100">
                  <img
                    :src="card.image"
                    style="width: auto; height: 380px"
                    class="card-img-top product_img"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">
                      {{ card.title }}
                    </h5>
                    <p class="card-text description">
                      {{ card.description }}
                    </p>
                    <br />
                    <span class="badge text-bg-danger mb-3 text-uppercase fs-6"
                      >10% off
                    </span>
                    <!-- <h6>Discount 10%</h6> -->
                    <strong
                      ><p class="card-text">
                        $
                        {{
                          card.price - Math.round(card.price - card.price * 0.9)
                        }}
                      </p></strong
                    >

                    <del
                      ><p class="card-text">$ {{ card.price }}</p></del
                    >
                    <div class="d-grid mx-auto">
                      <NuxtLink
                        :to="`/products/${card.id}`"
                        class="btn btn-success mt-3"
                      >
                        Details
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<style scoped>
.product_img {
  object-fit: contain;
}
.description {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
