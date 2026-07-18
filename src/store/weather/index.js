import { ref, computed } from 'vue'
import axios from 'axios'

const apiKey = import.meta.env.VITE_WEATHER_API_KEY
const apiUrl = import.meta.env.VITE_API_URL

const city = ref('')
const weatherData = ref(null)
const isLoading = ref(false)
const error = ref('')
const hasSearched = ref(false)

const temperature = computed(() =>
  weatherData.value ? Math.round(weatherData.value.main.temp) : ''
)

const feelsLike = computed(() =>
  weatherData.value ? Math.round(weatherData.value.main.feels_like) : ''
)

const humidity = computed(() =>
  weatherData.value ? weatherData.value.main.humidity : ''
)

const windSpeed = computed(() =>
  weatherData.value ? Math.round(weatherData.value.wind.speed * 3.6) : ''
)

const visibility = computed(() =>
  weatherData.value ? Math.round(weatherData.value.visibility / 1000) : ''
)

const weatherDescription = computed(() =>
  weatherData.value ? weatherData.value.weather[0].description : ''
)

const weatherIcon = computed(() => {
  if (!weatherData.value) return ''
  return `https://openweathermap.org/img/wn/${weatherData.value.weather[0].icon}@4x.png`
})

const currentDate = computed(() => {
  const now = new Date()
  return now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  })
})

function clearError() {
  error.value = ''
}

async function fetchWeather() {
  if (!city.value.trim()) {
    error.value = 'Please enter a city name'
    return
  }

  hasSearched.value = true
  isLoading.value = true
  error.value = ''

  try {
    const response = await axios.get(
      `${apiUrl}weather?q=${city.value}&appid=${apiKey}&units=metric`
    )
    weatherData.value = response.data
  } catch (err) {
    console.log('Error fetching weather:', err)
    weatherData.value = null
    error.value =
      err.response?.status === 404
        ? `City "${city.value}" not found`
        : 'Unable to fetch weather data'
  } finally {
    isLoading.value = false
  }
}

export function useWeather() {
  return {
    city,
    weatherData,
    isLoading,
    error,
    hasSearched,
    temperature,
    feelsLike,
    humidity,
    windSpeed,
    visibility,
    weatherDescription,
    weatherIcon,
    currentDate,
    fetchWeather,
    clearError
  }
}
