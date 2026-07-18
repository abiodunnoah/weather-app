<template>
  <header class="card-header">
    <div class="logo-section">
      <span class="logo-icon">🌤️</span>
      <h1 class="app-title">Weather</h1>
    </div>
    <p class="app-subtitle">Real-time weather at your fingertips</p>
  </header>
</template>

<style scoped>
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
</style>
