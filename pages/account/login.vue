<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const loginUser = async () => {
  try {
    const response = await axios.post(
      "https://api.escuelajs.co/api/v1/auth/login",
      {
        email: email.value,
        password: password.value,
      }
    );

    // Assuming the API returns some data upon successful login
    const userData = response.data;

    // Store email and password in localStorage
    localStorage.setItem("email", email.value);
    localStorage.setItem("password", password.value);

    // Handle successful login, e.g., store user data in Vuex store or localStorage
    console.log("User logged in:", userData);
    // Extract the token from the response
    const token = response.data.access_token;
    const Refreshtoken = response.data.refresh_token;

    // Store the token in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("token", Refreshtoken);

    // Handle successful login, e.g., store user data in Vuex store or localStorage
    console.log("Token stored:", token);
    console.log("Refresh_Token stored:", Refreshtoken);

    alert("Login successful!");

    // Optionally, redirect the user to another page
    router.push("/user/dashboard");
  } catch (error) {
    console.error("Error logging in:", error);
    alert("Login failed. Please check your credentials and try again.");
  }
};
</script>
<template>
  <div>
    <NuxtLayout name="footer">
      <div class="container">
        <div class="row">
          <h2 class="text-center p-2">LogIn</h2>
          <div class="col d-flex justify-content-center">
            <form @submit.prevent="loginUser">
              <div class="mb-3">
                <label class="form-label" for="emailInput">Email:</label>
                <input
                  v-model="email"
                  class="form-control"
                  type="email"
                  required
                  id="emailInput"
                />
              </div>
              <div class="mb-3">
                <label class="form-label" for="passwordInput">Password:</label>
                <input
                  v-model="password"
                  class="form-control"
                  type="password"
                  required
                  id="passwordInput"
                />
              </div>

              <button type="submit" class="btn btn-success">Login</button>
            </form>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
