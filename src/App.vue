<script setup>
import { ref } from "vue";
import NavView from "./components/NavView.vue";

const city = ref("");
const fetch = ref(false);

const get = () => {
  if (city.value.trim()) {
    fetch.value = !fetch.value;
  }
};
</script>
<template>
  <main>
    <nav>
      <header>
        <h1 class="weather">Weather App</h1>
        <div class="search-bar">
          <input
            v-model.trim="city"
            type="text"
            placeholder="Enter City Name"
            class="input"
          />
        </div>
        <NButton @click="get" strong secondary type="info">Get Weather</NButton>
      </header>
      <Suspense>
        <template #default>
          <NavView :city="city" :fetch="fetch" />
        </template>
        <template #fallback>
          <div class="cards">
            <NSpin size="large" />
          </div>
        </template>
      </Suspense>
    </nav>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
nav {
  background-color: rgba(117, 117, 117, 0.1);
  width: 600px;
  height: 400px;
  border-radius: 10px;
  box-shadow: 1px 1px 5px 1px rgba(15, 14, 14, 0.349);
}

header {
  margin-bottom: 10px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.weather {
  font-weight: 700;
  margin-bottom: 30px;
}
.input {
  border: none;
  background-color: white;
  padding: 12px;
  padding-right: 150px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.cards {
  height: 700px;
  background-color: rgb(27, 26, 26);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
