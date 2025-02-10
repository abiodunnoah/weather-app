<script setup>
import axios from "axios";
import { ref, watch, defineProps, onMounted, computed } from "vue";

// const { city } = defineProps(["city"]);
const props = defineProps(["city", "fetch"]);
const weather = ref(null);
const apiKey = "4da88cc82740cb43b04b7402c1f8d2a9";

const errorMessage = ref("");

const temperature = computed(() => {
  return weather.value ? `${weather.value.main.temp}°C` : "";
});

const getWeather = async () => {
  if (!props.city.trim()) {
    weather.value = null;
    errorMessage.value = "Please enter a city";
    return;
  }
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${apiKey}&units=metric`
    );
    weather.value = response.data;
    errorMessage.value = "";
  } catch (error) {
    console.log("Error fetching weather:", error);
    weather.value = null;
    errorMessage.value = "No weather data available";
  }
};
watch(() => props.fetch, getWeather);

watch(
  () => props.city,
  () => {
    weather.value = null;
    errorMessage.value = "";
  }
);
// onMounted(getWeather);
</script>

<template>
  <div v-if="weather" class="card">
    <h1 class="city-name">{{ weather.name }}</h1>
    <h2 class="temp">{{ temperature }}</h2>
    <p>{{ weather.weather[0].description }}</p>
  </div>
  <div v-else class="error">
    <div>{{ errorMessage }}</div>
  </div>
</template>

<style scoped>
.temp {
  background-color: rgba(128, 128, 128, 0.1);
  width: 100px;
  height: 50px;
  overflow: hidden;
  border-radius: 2px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  cursor: point;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  margin-bottom: 5px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.city-name {
  font-weight: 500;
}
.error {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
