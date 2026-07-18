<script setup>
import { useBackground } from '@/store/background'
import AppHeader from './components/AppHeader.vue'
import SearchBar from './components/SearchBar.vue'
import WeatherPanel from './components/WeatherPanel.vue'
import BgDecorations from './components/BgDecorations.vue'

const { backgroundStyle } = useBackground()
</script>

<template>
  <div class="app-container" :style="backgroundStyle">
    <BgDecorations />

    <main class="main-content">
      <div class="weather-card glass">
        <AppHeader />
        <SearchBar />
        <WeatherPanel />
      </div>

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

.main-content {
  width: 100%;
  max-width: 480px;
  z-index: 1;
}

.weather-card {
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  animation: fadeInUp var(--transition-slow) ease;
}

.app-footer {
  text-align: center;
  padding: var(--space-lg);
  color: var(--text-muted);
  font-size: 0.8rem;
}

@media (max-width: 480px) {
  .app-container {
    padding: var(--space-md);
  }

  .weather-card {
    padding: var(--space-lg);
  }
}
</style>
