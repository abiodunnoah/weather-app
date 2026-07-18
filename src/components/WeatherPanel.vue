<script setup>
import { useWeather } from '@/store/weather'
import CurrentWeather from './CurrentWeather.vue'
import WeatherStats from './WeatherStats.vue'

const { isLoading, weatherData, error, hasSearched } = useWeather()
</script>

<template>
  <div v-if="isLoading" class="loading-container">
    <div class="loading-spinner"></div>
    <p class="loading-text">Fetching weather data...</p>
  </div>

  <div v-else-if="weatherData" class="weather-display fade-in">
    <CurrentWeather />
    <WeatherStats />
  </div>

  <div v-else-if="error" class="error-display fade-in">
    <span class="error-icon">⚠️</span>
    <p class="error-message">{{ error }}</p>
    <p class="error-hint">Try searching for another city</p>
  </div>

  <div v-else class="empty-state fade-in">
    <span class="empty-icon">🌍</span>
    <p class="empty-message">Search for a city to see the weather</p>
  </div>
</template>

<style scoped>
.weather-display {
  text-align: center;
  padding: var(--space-md) 0;
}

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

.fade-in {
  animation: fadeIn var(--transition-normal) ease forwards;
}
</style>
