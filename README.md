# How to get it running
- Install [Node.js](https://nodejs.org/en).
- Clone the repository to your machine.
- Open PowerShell into the root folder.
- Run 'npm install'.
- After that, open the website with 'npm run dev'.

# Oura Summer Trainee Code Task

The task is to develop a simple web application for the needs of interplanetary travel agency that offers
trips to different planets.

The Web application needs to support the following:
- Browsing available destinations
- Booking a trip to a destination
  - Only the frontend for booking is needed, no need to store the bookings anywhere or call any backend API endpoints
  - The booking should calculate the price for the trip based on the user's input (passengers & destination)
    - The calculation instructions are provided in "Calculating the price" section later

If the technologies are new, it can take up to 8h to fulfill the task so remember to start early.
Read the instructions carefully before starting and remember that you can always get back to these
if something is unclear when implementing.

## Fetching the data

The data of the planets to travel to is fetched from
[The Solar System OpenData](https://api.le-systeme-solaire.net/en/).
In addition to planetary data, your service has to calculate the price for the trip.
The calculation instructions are provided in "Calculating the price" section later.


### Calculating the price

The cost of travel to any chosen destination is composed of 4 parts:

1. Distance. This is determined by average of perihelion and aphelion of the planet. If the destination is a moon, the distance is determined to the planet it orbits. The additional distance to the moon is considered negligible and doesn't impact the value.
2. Average temperature on the destination. The minimum value is capped at 50 degrees Kelvin. That is, if the value is below 50, use 50 instead.
3. Number of moons orbiting the planet. If the destination is a moon, use values of the planet it orbits. Each moon increases the cost by 7.2% of the base price, determined in previous steps.
4. Number of passengers. This is simply the cost for single passenger multiplied by the amount of passengers.

The cost for a single passenger is the average distance calculated as in step 1, multiplied by average temperature as in step 2, increased by 7.2% for each moon the planet has as in step 3. The final value is then divided by 100 million.

Below are a couple of examples you can use to verify your formula:

- Example for Uranus for 1 person: 6422.93 € to the nearest cent \
  Values used: aphelion and perihelion of Uranus, average temperature on Uranus and number of moons for Uranus

- Example for Phobos for 1 person: 130.39 € to the nearest cent \
  Values used: aphelion and perihelion of Mars (since Phobos orbits Mars), average temperature of 50 since value below the minimum threshold and number of moons for Mars


## Requirements

- Web application according to instructions
  -  You are free to choose the framework, for example Vue, React, Angular, etc.
- Develop some unit tests for your application
- Document your implementation so that we can get it up & running easily
- Document in code with "//TODO" notes if something is not working or is missing

## Evaluation criteria
Don't spend more than 8 hours on the task.

When evaluating the implementations we pay attention to following:
- Functionality
- Code style
- Look & feel of the application (To some extent. Don't spend too much time here.)
- Test cases
  - Only one or two test cases to show that you can write them
  - No 100% coverage needed

What will <b>NOT</b> be evaluated:
- Extra functionality
- Deploying the service to Cloud or own server
- Deployment pipelines
- Anything extra outside the requirements and our evaluation criteria list
- Test coverage

We will give everyone feedback of the submitted task. We'd like to encourage you to submit
the task even if you don't complete it fully.
