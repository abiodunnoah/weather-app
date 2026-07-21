import { computed } from "vue";
import { useWeather } from "@/store/weather";

export function getWeatherBackground(weather) {
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
}

export function useBackground() {
  const { weatherData } = useWeather();
  const backgroundStyle = computed(() => ({
    backgroundColor: getWeatherBackground(weatherData.value),
  }));
  return { backgroundStyle };
}
