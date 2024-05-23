<script setup>
// import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
// import { useAuthStore } from "~/store/auth"; // import the auth store we just created

// const router = useRouter();

// const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
// const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

// const logout = () => {
//   logUserOut();
//   router.push("/login");
// };
</script>
<template>
  <div>
    <header class="">
      <nav class="navbar navbar-expand-lg">
        <div class="container">
          <NuxtLink class="navbar-brand" to="/">MyBlog</NuxtLink>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <NuxtLink class="nav-link active" aria-current="page" to="/">
                  <i class="bi bi-house"></i> Home</NuxtLink
                >
              </li>
              <li class="nav-item">
                <NuxtLink class="nav-link" to="/events">
                  <i class="bi bi-clipboard-data"></i> Events
                </NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink class="nav-link" to="/tech"
                  ><i class="bi bi-display"></i> Tech</NuxtLink
                >
              </li>
              <li class="nav-item">
                <NuxtLink class="nav-link" to="/products">
                  <i class="bi bi-diagram-3-fill"></i> Products</NuxtLink
                >
              </li>
              <li class="nav-item">
                <NuxtLink class="nav-link" to="/account/login"> LogIn</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink class="nav-link" to="/account/register">
                  Register</NuxtLink
                >
              </li>
              <!-- <li class="nav-item">
                <nuxt-link class="btn btn-success">Logout</nuxt-link>
              </li> -->
              <li class="nav-item">
                <NuxtLink class="btn btn-info" to="/wishlist"
                  >Your whistlist</NuxtLink
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <slot />
  </div>
</template>
