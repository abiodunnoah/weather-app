<script setup>
import { useWeather } from '@/store/weather'

const { city, fetchWeather } = useWeather()

function handleSearch() {
  if (city.value.trim()) {
    fetchWeather()
  }
}
</script>

<template>
  <div class="search-section">
    <div class="search-container">
      <span class="search-icon">🔍</span>
      <input
        v-model.trim="city"
        type="text"
        placeholder="Search for a city..."
        class="search-input"
        @keydown.enter="handleSearch"
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
</template>

<style scoped>
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
</style>
