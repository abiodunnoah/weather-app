<script setup>
import axios from "axios";
import { ref, watch, defineProps, defineEmits, computed } from "vue";

const props = defineProps(["city", "shouldFetch"]);
const emit = defineEmits(["weatherLoaded", "loadingComplete"]);

const weather = ref(null);
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const errorMessage = ref("");
const hasSearched = ref(false);

// Computed properties for weather data
const temperature = computed(() => {
  return weather.value ? Math.round(weather.value.main.temp) : "";
});

const feelsLike = computed(() => {
  return weather.value ? Math.round(weather.value.main.feels_like) : "";
});

const humidity = computed(() => {
  return weather.value ? weather.value.main.humidity : "";
});

const windSpeed = computed(() => {
  return weather.value ? Math.round(weather.value.wind.speed * 3.6) : ""; // Convert m/s to km/h
});

const visibility = computed(() => {
  return weather.value ? Math.round(weather.value.visibility / 1000) : ""; // Convert m to km
});

const weatherDescription = computed(() => {
  return weather.value ? weather.value.weather[0].description : "";
});

const weatherIcon = computed(() => {
  if (!weather.value) return "";
  const iconCode = weather.value.weather[0].icon;
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
});

// Format current date/time
const currentDate = computed(() => {
  const now = new Date();
  return now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
});

const getWeather = async () => {
  if (!props.city.trim()) {
    weather.value = null;
    errorMessage.value = "Please enter a city name";
    emit("loadingComplete");
    return;
  }

  hasSearched.value = true;

  try {
    const response = await axios.get(
      `${apiUrl}weather?q=${props.city}&appid=${apiKey}&units=metric`
    );
    weather.value = response.data;
    errorMessage.value = "";
    emit("weatherLoaded", response.data);
  } catch (error) {
    console.log("Error fetching weather:", error);
    weather.value = null;
    errorMessage.value =
      error.response?.status === 404
        ? `City "${props.city}" not found`
        : "Unable to fetch weather data";
    emit("weatherLoaded", null);
  } finally {
    emit("loadingComplete");
  }
};

watch(
  () => props.shouldFetch,
  (newVal) => {
    if (newVal) {
      getWeather();
    }
  }
);

watch(
  () => props.city,
  () => {
    // Don't clear weather on city change, only on new search
  }
);
</script>

<template>
  <!-- Weather display when data is available -->
  <div v-if="weather" class="weather-display fade-in">
    <!-- Location and date -->
    <div class="location-section">
      <h2 class="city-name">{{ weather.name }}, {{ weather.sys.country }}</h2>
      <p class="date-display">{{ currentDate }}</p>
    </div>

    <!-- Main weather info -->
    <div class="weather-main">
      <div class="weather-icon-container">
        <img
          :src="weatherIcon"
          :alt="weatherDescription"
          class="weather-icon float"
        />
      </div>
      <div class="temperature-section">
        <span class="temperature">{{ temperature }}°</span>
        <span class="temp-unit">C</span>
      </div>
    </div>

    <!-- Weather description -->
    <p class="weather-description">{{ weatherDescription }}</p>
    <p class="feels-like">Feels like {{ feelsLike }}°C</p>

    <!-- Weather stats -->
    <div class="weather-stats">
      <div class="stat-card">
        <span class="stat-icon">💧</span>
        <div class="stat-info">
          <span class="stat-value">{{ humidity }}%</span>
          <span class="stat-label">Humidity</span>
        </div>
      </div>

      <div class="stat-card">
        <span class="stat-icon">💨</span>
        <div class="stat-info">
          <span class="stat-value">{{ windSpeed }} km/h</span>
          <span class="stat-label">Wind</span>
        </div>
      </div>

      <div class="stat-card">
        <span class="stat-icon">👁️</span>
        <div class="stat-info">
          <span class="stat-value">{{ visibility }} km</span>
          <span class="stat-label">Visibility</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Error state -->
  <div v-else-if="errorMessage" class="error-display fade-in">
    <span class="error-icon">⚠️</span>
    <p class="error-message">{{ errorMessage }}</p>
    <p class="error-hint">Try searching for another city</p>
  </div>

  <!-- Initial state -->
  <div v-else-if="!hasSearched" class="empty-state fade-in">
    <span class="empty-icon">🌍</span>
    <p class="empty-message">Search for a city to see the weather</p>
  </div>
</template>

<style scoped>
/* Weather display container */
.weather-display {
  text-align: center;
  padding: var(--space-md) 0;
}

/* Location section */
.location-section {
  margin-bottom: var(--space-md);
}

.city-name {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: var(--space-xs);
}

.date-display {
  color: var(--text-muted);
  font-size: 0.9rem;
}

/* Main weather section */
.weather-main {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  margin-bottom: var(--space-sm);
}

.weather-icon-container {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.weather-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.temperature-section {
  display: flex;
  align-items: flex-start;
}

.temperature {
  font-family: var(--font-display);
  font-size: 4.5rem;
  font-weight: 700;
  color: var(--text-light);
  line-height: 1;
}

.temp-unit {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text-muted);
  margin-top: 0.5rem;
}

/* Weather description */
.weather-description {
  font-size: 1.1rem;
  color: var(--text-light);
  text-transform: capitalize;
  margin-bottom: var(--space-xs);
}

.feels-like {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: var(--space-lg);
}

/* Weather stats */
.weather-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-sm);
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-md);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.stat-icon {
  font-size: 1.5rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-light);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* Error state */
.error-display {
  text-align: center;
  padding: var(--space-xl);
}

.error-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: var(--space-md);
}

.error-message {
  font-size: 1.1rem;
  color: var(--text-light);
  margin-bottom: var(--space-xs);
}

.error-hint {
  color: var(--text-muted);
  font-size: 0.9rem;
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: var(--space-xl);
}

.empty-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: var(--space-md);
  animation: float 3s ease-in-out infinite;
}

.empty-message {
  color: var(--text-muted);
  font-size: 1rem;
}

/* Animation utility */
.fade-in {
  animation: fadeIn var(--transition-normal) ease forwards;
}

.float {
  animation: float 3s ease-in-out infinite;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .weather-main {
    flex-direction: column;
    gap: var(--space-sm);
  }

  .weather-icon-container {
    width: 100px;
    height: 100px;
  }

  .temperature {
    font-size: 3.5rem;
  }

  .weather-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-xs);
  }

  .stat-card {
    padding: var(--space-sm);
  }

  .stat-value {
    font-size: 0.85rem;
  }
}
</style>
