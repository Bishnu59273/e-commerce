<script setup>
import { ref } from "vue";
import axios from "axios";

const email = ref("");
const password = ref("");
const name = ref("");
const role = ref("");
const avatar = ref("");

const submitUser = async () => {
  try {
    await axios.post("https://api.escuelajs.co/api/v1/users/", {
      email: email.value,
      password: password.value,
      name: name.value,
      role: role.value,
      avatar: avatar.value,
    });
    alert("User created successfully!");
    // Clear form fields
    email.value = "";
    password.value = "";
    name.value = "";
    role.value = "";
    avatar.value = "";
  } catch (error) {
    console.error("Error creating user:", error);
    alert("Failed to create user. Please try again.");
  }
};
</script>
<template>
  <div>
    <NuxtLayout name="footer">
      <div class="container">
        <div class="row">
          <h2 class="text-center p-2">Registration</h2>
          <div class="col d-flex justify-content-center">
            <form @submit.prevent="submitUser">
              <div class="row mb-3">
                <label for="emailInput">Email:</label>
                <input
                  id="emailInput"
                  class="form-control"
                  v-model="email"
                  type="email"
                  required
                />
              </div>
              <div class="row mb-3">
                <label for="passwordInput">Password:</label>
                <input
                  id="passwordInput"
                  class="form-control"
                  v-model="password"
                  type="password"
                  required
                />
              </div>
              <div class="row mb-3">
                <label for="nameInput">Name:</label>
                <input
                  id="nameInput"
                  class="form-control"
                  v-model="name"
                  type="text"
                  required
                />
              </div>
              <div class="row mb-3">
                <label for="roleInput">Role:</label>
                <input
                  id="roleInput"
                  class="form-control"
                  v-model="role"
                  type="text"
                  required
                />
              </div>
              <div class="row mb-3">
                <label for="avatarInput">Avatar URL:</label>
                <input
                  id="avatarInput"
                  class="form-control"
                  v-model="avatar"
                  type="text"
                />
              </div>

              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
