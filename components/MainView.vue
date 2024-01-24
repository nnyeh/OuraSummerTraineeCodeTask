<template>
  <div class="flex flex-col w-[80%]">
    <div class="fixed top-0 left-0 right-0 h-28 bg-gradient-to-b from-slate-700 to-transparent" />
    <div class="fixed top-0 left-0 right-0 text-center m-10 p-6 text-4xl bg-white rounded-lg text-slate-800">
      <h1 class="select-none">
        <b>Interplanetary Travel Agency</b>
      </h1>
    </div>
    <div v-if="planets.length > 0">
      <ul class="min-w-screen flex flex-row flex-wrap justify-center mt-48">
        <li v-for="planet in planets" :key="planet.id" class="p-10 bg-slate-800 rounded-lg m-6 cursor-pointer border-2 border-slate-800 hover:border-white" @click="addToCart(planet)">
          <div class="text-3xl">
            <b>{{ planetName(planet) }}</b>
            <hr class="mt-2">
          </div>
          <div class="mt-2">
            Type: {{ planetType(planet) }}
            <br>
            <div v-if="planet.bodyType === 'Moon'" class="whitespace-nowrap">
              Around planet: {{ parentPlanet(planet) }}
            </div>
            <div v-if="planet.moons !== null">
              Moons: {{ planetMoons(planet) }}
            </div>
            Orbital distance: {{ planetOrbitDistance(planet) }}
            <br>
            Average temperature: {{ planetTemperature(planet) }}
            <div class="mt-6">
              <b class="text-3xl text-blue-300">{{ planetTravelCost(planet) }}€</b> per person
            </div>
          </div>
        </li>
      </ul>
      <div>
        <button class="fixed bottom-10 right-0 mr-9 p-5 bg-blue-500 rounded-lg text-white text-5xl" @click="openCheckoutModal">
          Checkout
        </button>
      </div>
    </div>
    <div v-if="isCheckoutModalOpen" class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white w-[30%] text-slate-800 p-8 rounded-lg">
        <h2 class="text-4xl mb-4">
          <b>Checkout</b>
        </h2>
        <ul>
          <li v-for="planet in cart" :key="planet.id" class="text-2xl flex items-center justify-between">
            <div>
              <b>{{ planetName(planet) }}:</b> {{ planetTravelCost(planet) * (planet.quantity ?? 0) }}€ <b>x</b> {{ planet.quantity ?? 0 }}
            </div>
            <div class="flex space-x-4">
              <button class="p-2 bg-red-500 text-white rounded-full" @click="decreaseQuantity(planet)">
                -
              </button>
              <button class="p-2 bg-blue-500 text-white rounded-full" @click="increaseQuantity(planet)">
                +
              </button>
            </div>
          </li>
        </ul>
        <div class="flex justify-between mt-8">
          <button class="mt-4 p-2 bg-red-600 text-white rounded-lg" @click="closeCheckoutModal">
            Close
          </button>
          <button class="mt-4 p-2 bg-green-600 text-white rounded-lg" @click="tripBought">
            Buy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

interface Planet {
  id: string;
  englishName: string;
  bodyType: string;
  aroundPlanet: {
    planet: string;
  };
  moons: string[];
  avgTemp: number;
  perihelion: number;
  aphelion: number;
  quantity?: number;
}

const planets = ref<Planet[]>([])

const fetchData = async () => {
  try {
    const response = await fetch("https://api.le-systeme-solaire.net/rest/bodies/")
    const data = await response.json()
    planets.value = data.bodies
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}
onMounted(fetchData)

const planetName = (planet: any) => {
  return planet.englishName
}

// API only had french names for the parent planets
const parentPlanet = (planet: any) => {
  return planet.aroundPlanet?.planet.charAt(0).toUpperCase() + planet.aroundPlanet?.planet.slice(1)
}

const planetType = (planet: any) => {
  return planet.bodyType
}

const planetMoons = (planet: any) => {
  if (planet.moons === null) {
    return "N/A"
  } else {
    return planet.moons.length
  }
}

const planetTemperature = (planet: any) => {
  return (planet.avgTemp - 273.15).toFixed(2) + "°C"
}

const planetOrbitDistance = (planet: any) => {
  const distanceInAU = (planet.perihelion + planet.aphelion) / 2 / 149597870.7
  const distanceInKM = (planet.perihelion + planet.aphelion) / 2
  if (distanceInKM === 0) {
    return "N/A"
  } else if (distanceInAU < 1) {
    return Math.round(distanceInKM) + " km"
  } else {
    return distanceInAU.toFixed(2) + " AU"
  }
}

const planetTravelCost = (planet: any) => {
  // if (planet.bodyType === "Planet") {
  const distanceInKM = (planet.perihelion + planet.aphelion) / 2
  const baseTemperature = Math.max(50, planet.avgTemp)
  const moonMultiplier = planet.moons ? planet.moons.length * 0.072 : 0
  const travelCost = (distanceInKM * baseTemperature * (1 + moonMultiplier)) / 100000000
  return Number(travelCost.toFixed(2))
}
/* else if (planet.bodyType === "Moon") {

    TO DO: tried to get this to work by getting the data via parentPlanet(planet) but couldn't figure it out in time

  }
} */

const cart = ref<Planet[]>([])
const isCheckoutModalOpen = ref(false)

const addToCart = (planet: Planet) => {
  const existingPlanet = cart.value.find(p => p.id === planet.id)
  if (existingPlanet) {
    alert(`${planetName(planet)} is already in the cart.`)
  } else {
    alert(`Added ${planetName(planet)} to the cart.`)
    planet.quantity = 1
    cart.value.push(planet)
  }
}

const closeCheckoutModal = () => {
  isCheckoutModalOpen.value = false
}

const openCheckoutModal = () => {
  isCheckoutModalOpen.value = true
}

const increaseQuantity = (planet: any) => {
  planet.quantity = (planet.quantity || 1) + 1
}

const decreaseQuantity = (planet: any) => {
  planet.quantity = Math.max((planet.quantity || 1) - 1, 1)
}

const tripBought = () => {
  isCheckoutModalOpen.value = false
  alert(`Trip successfully bought!`)
}

</script>
