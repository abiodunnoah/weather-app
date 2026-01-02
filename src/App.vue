<script setup>
import { ref, computed, provide } from "vue";
import NavView from "./components/NavView.vue";

const city = ref("");
const weatherData = ref(null);
const isLoading = ref(false);

// Dynamic background based on weather condition
const getWeatherBackground = (weather) => {
  if (!weather) return "var(--bg-default)";

  const condition = weather.weather[0].main.toLowerCase();
  const icon = weather.weather[0].icon;
  const isNight = icon.includes("n");

  if (isNight) return "var(--bg-night)";

  switch (condition) {
    case "clear":
      return "var(--bg-sunny)";
    case "clouds":
      return "var(--bg-cloudy)";
    case "rain":
    case "drizzle":
      return "var(--bg-rain)";
    case "snow":
      return "var(--bg-snow)";
    case "thunderstorm":
      return "var(--bg-thunderstorm)";
    case "mist":
    case "fog":
    case "haze":
      return "var(--bg-mist)";
    default:
      return "var(--bg-clear)";
  }
};

const backgroundStyle = computed(() => ({
  backgroundColor: getWeatherBackground(weatherData.value),
}));

const handleWeatherUpdate = (data) => {
  weatherData.value = data;
};

const handleSearch = () => {
  if (city.value.trim()) {
    isLoading.value = true;
  }
};

const handleKeyPress = (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
};

// Provide weather data to child components
provide("weatherData", weatherData);
</script>

<template>
  <div class="app-container" :style="backgroundStyle">
    <!-- Decorative background elements -->
    <div class="bg-decoration bg-circle-1"></div>
    <div class="bg-decoration bg-circle-2"></div>

    <main class="main-content">
      <!-- Glass card container -->
      <div class="weather-card glass">
        <!-- Header -->
        <header class="card-header">
          <div class="logo-section">
            <span class="logo-icon">🌤️</span>
            <h1 class="app-title">Weather</h1>
          </div>
          <p class="app-subtitle">Real-time weather at your fingertips</p>
        </header>

        <!-- Search section -->
        <div class="search-section">
          <div class="search-container">
            <span class="search-icon">🔍</span>
            <input
              v-model.trim="city"
              type="text"
              placeholder="Search for a city..."
              class="search-input"
              @keypress="handleKeyPress"
            />
          </div>
          <button
            @click="handleSearch"
            class="search-button"
            :disabled="!city.trim()"
          >
            <span>Get Weather</span>
          </button>
        </div>

        <!-- Weather display -->
        <Suspense>
          <template #default>
            <NavView
              :city="city"
              :should-fetch="isLoading"
              @weather-loaded="handleWeatherUpdate"
              @loading-complete="isLoading = false"
            />
          </template>
          <template #fallback>
            <div class="loading-container">
              <div class="loading-spinner"></div>
              <p class="loading-text">Fetching weather data...</p>
            </div>
          </template>
        </Suspense>
      </div>

      <!-- Footer -->
      <footer class="app-footer">
        <p>Powered by OpenWeatherMap API</p>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-lg);
  position: relative;
  overflow: hidden;
  transition: background var(--transition-slow);
}

/* Decorative background circles */
.bg-decoration {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  pointer-events: none;
}

.bg-circle-1 {
  width: 400px;
  height: 400px;
  top: -100px;
  right: -100px;
  animation: float 8s ease-in-out infinite;
}

.bg-circle-2 {
  width: 300px;
  height: 300px;
  bottom: -50px;
  left: -50px;
  animation: float 6s ease-in-out infinite reverse;
}

.main-content {
  width: 100%;
  max-width: 480px;
  z-index: 1;
}

/* Glass card */
.weather-card {
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  animation: fadeInUp var(--transition-slow) ease;
}

/* Header */
.card-header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.logo-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-xs);
}

.logo-icon {
  font-size: 2rem;
  animation: float 3s ease-in-out infinite;
}

.app-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-light);
  letter-spacing: -0.02em;
}

.app-subtitle {
  color: var(--text-muted);
  font-size: 0.9rem;
}

/* Search section */
.search-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: var(--space-md);
  font-size: 1rem;
  opacity: 0.7;
}

.search-input {
  width: 100%;
  padding: var(--space-md) var(--space-md) var(--space-md) 3rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-light);
  font-family: var(--font-body);
  font-size: 1rem;
  transition: all var(--transition-fast);
}

.search-input::placeholder {
  color: var(--text-muted);
}

.search-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.15);
}

.search-button {
  padding: var(--space-md) var(--space-lg);
  border: none;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.2);
  color: var(--text-light);
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.search-button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.search-button:active:not(:disabled) {
  transform: translateY(0);
}

.search-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Loading state */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-2xl);
  gap: var(--space-md);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top-color: var(--text-light);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  color: var(--text-muted);
  font-size: 0.9rem;
}

/* Footer */
.app-footer {
  text-align: center;
  padding: var(--space-lg);
  color: var(--text-muted);
  font-size: 0.8rem;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .app-container {
    padding: var(--space-md);
  }

  .weather-card {
    padding: var(--space-lg);
  }

  .app-title {
    font-size: 1.5rem;
  }
}
</style>
