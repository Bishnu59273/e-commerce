<template>
  <div>
    <NuxtLayout name="footer">
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <h1>this is dashboard</h1>
            <h3>Welcome,{{ userName }}</h3>
            <h5>email: {{ userEmail }}</h5>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<script setup>
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const userEmail = ref("");
const userName = ref("");

const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Access token not found.");
    }

    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const userProfile = response.data;
    userEmail.value = userProfile.email;
    userName.value = userProfile.name;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    if (error.response && error.response.status === 401) {
      // Unauthorized: Redirect to login page
      router.push("/account/login");
    } else {
      // Other error: Display generic error message
      alert(
        "An error occurred while fetching user profile. Please try again later."
      );
    }
  }
};

onMounted(() => {
  fetchUserProfile();
});
</script>
