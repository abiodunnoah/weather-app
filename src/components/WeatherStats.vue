<script setup>
import { useWeather } from "@/store/weather";

const { humidity, windSpeed, visibility } = useWeather();
</script>

<template>
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
</template>

<style scoped>
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

@media (max-width: 480px) {
  .weather-stats {
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
