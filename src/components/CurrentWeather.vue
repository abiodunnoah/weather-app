<script setup>
import { useWeather } from "@/store/weather";

const {
  weatherData,
  temperature,
  feelsLike,
  weatherDescription,
  weatherIcon,
  currentDate,
} = useWeather();
</script>

<template>
  <div class="location-section">
    <h2 class="city-name">
      {{ weatherData.name ?? "Unknown" }}, {{ weatherData.sys?.country ?? "" }}
    </h2>
    <p class="date-display">{{ currentDate }}</p>
  </div>

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

  <p class="weather-description">{{ weatherDescription }}</p>
  <p class="feels-like">Feels like {{ feelsLike }}°C</p>
</template>

<style scoped>
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

.float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

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
}
</style>
