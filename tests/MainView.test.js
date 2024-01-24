import { mount } from "@vue/test-utils"
import MainView from "../components/MainView.vue"

// TO DO: actually make this test test, at the moment "npm test" results in an error

describe("MainView", () => {
  test("renders correctly", () => {
    // mock data
    const mockPlanet = {
      id: "1",
      englishName: "Mars",
      bodyType: "Planet",
      aroundPlanet: { planet: "Sun" },
      moons: ["Phobos", "Deimos"],
      avgTemp: 220,
      perihelion: 207.34,
      aphelion: 250.23
    }

    const wrapper = mount(MainView, {
      props: { planet: mockPlanet }
    })

    expect(wrapper.text()).toContain("Mars")
    expect(wrapper.text()).toContain("Type: Planet")
    expect(wrapper.text()).toContain("Moons: 2")
    expect(wrapper.text()).toContain("Orbital distance:")
    expect(wrapper.text()).toContain("Average temperature: -53.15°C")
    expect(wrapper.text()).toContain("0.00€ per person")
  })
})
