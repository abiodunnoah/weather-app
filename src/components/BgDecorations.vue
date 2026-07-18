<template>
  <div class="bg-decoration bg-circle-1"></div>
  <div class="bg-decoration bg-circle-2"></div>
</template>

<style scoped>
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
</style>
