// ---------- FILE LAYOUT ------------
// ---> functions
// ---> variables
// ---> code

// ================================= FUNCTIONS ========================================

function Loader_Reset() {
  Loader_counter = -1
  circles.forEach((e) => {
    e.style.backgroundColor = 'transparent'
  })
}
function Loader_Start() {
  Loader_window.style.display = 'flex'
  Loader = setInterval(() => {
    Loader_counter++
    if (Loader_counter == circles.length) {
      Loader_Reset()
    } else {
      circles[Loader_counter].style.backgroundColor = 'white'
    }
  }, 300);
}
function Loader_Stop() {
  clearInterval(Loader)
  Loader_window.style.display = 'none'
}
async function Get_Weather_by_CityName(cityname) {
  try {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=ea2e4c210b5b1371c7094b6a5fae2905&units=metric`)
    let data = await response.json()
    if (data.cod == 404) {
      ErrorMsg('City not Found!')
    } else if (data.cod == 400) {
      ErrorMsg('Something went Wrong!')
    }
    dataUpdate(data.name, data.sys.country, data.weather[0].main, data.main.temp, data.weather[0].main, data.main.humidity, data.wind.speed, data.sys.sunrise, data.sys.sunset)
  } catch (error) {
  }
}
async function Get_Weather_by_Current_location(lattitude, longitude) {
  try {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longitude}&appid=ea2e4c210b5b1371c7094b6a5fae2905&units=metric`)
    let data = await response.json()
    if (data.cod == 404) {
      ErrorMsg('City not Found!')
    } else if (data.cod == 400) {
      ErrorMsg('Something went Wrong!')
    }
    dataUpdate(data.name, data.sys.country, data.weather[0].main, data.main.temp, data.weather[0].main, data.main.humidity, data.wind.speed, data.sys.sunrise, data.sys.sunset)
  } catch (error) {
  }
}
function onSuccess(position) {
  let lattitude = position.coords.latitude
  let longitude = position.coords.longitude
  Get_Weather_by_Current_location(lattitude, longitude)
}
function onFailure() {
  ErrorMsg('Location Denied/Not Found')
}
function ErrorMsg(msg) {
  Loader_Stop()
  container.style.height = '545px'
  GoBack_btn.classList.remove('display_none')
  NotfoundMsg.innerText = msg
  NotFound.classList.remove('display_none')
}
function UI_Changes() {
  NotFound.classList.add('display_none')
  GoBack_btn.classList.remove('display_none')
  WeatherDetails.classList.remove('display_none')
  setTimeout(() => {
    WeatherDetails.classList.add('active')
  }, 500);
}
function Undo_UI_Changes() {
  Loader_Stop()
  NotFound.classList.add('display_none')
  GoBack_btn.classList.remove('display_none')
  WeatherDetails.classList.add('display_none')
  setTimeout(() => {
    WeatherDetails.classList.remove('active')
  }, 0);
}
function dataUpdate(city, country, Weather_img, temp, type, humid, wind, rise, set) {
  CityName.innerText = `${city}, ${country}`
  switch (Weather_img) {
    case 'Smoke':
      WeatherImage.src = 'Assets/mist.png'
      body.style.backgroundImage = 'url(/Assets/Mist-Bg.jpg)'
      break
    case 'Mist':
      WeatherImage.src = 'Assets/mist.png'
      body.style.backgroundImage = 'url(/Assets/Mist-Bg.jpg)'
      break
    case 'Haze':
      WeatherImage.src = 'Assets/mist.png'
      body.style.backgroundImage = 'url(/Assets/Mist-Bg.jpg)'
      break
    case 'Rain':
      WeatherImage.src = 'Assets/rain.png'
      body.style.backgroundImage = 'url(/Assets/Rain-Bg.jpg)'
      break
    case 'Thunderstorm':
      WeatherImage.src = 'Assets/rain.png'
      body.style.backgroundImage = 'url(/Assets/Rain-Bg.jpg)'
      break
    case 'Clear':
      WeatherImage.src = 'Assets/clear.png'
      body.style.backgroundImage = 'url(/Assets/Clear-Bg.jpg)'
      break
    case 'Clouds':
      WeatherImage.src = 'Assets/cloud.png'
      body.style.backgroundImage = 'url(/Assets/Clouds-Bg.jpg)'
      break
    case 'Snow':
      WeatherImage.src = 'Assets/snow.png'
      body.style.backgroundImage = 'url(/Assets/Snow-Bg.jpg)'
      break
    default:
      WeatherImage.src = 'Assets/cloud.png'
      body.style.backgroundImage = 'url(/Assets/Default-Bg.jpg)'
      break
  }
  Temperature.innerText = `${Math.round(temp)}°C`
  WeatherType.innerText = type
  Humidity.innerText = `${humid}%`
  WindSpeed.innerText = `${Math.round(wind * 3.6)} KPH`
  Sunrise.innerText = ConvertTime(rise)
  sunset.innerText = ConvertTime(set)
  UI_Changes()
  Loader_Stop()
}
function ConvertTime(time) {
  let date = new Date(time * 1000)//convert to miliseconds
  Formated_time = date.toLocaleTimeString('en-US', { timeStyle: 'short' })
  return Formated_time;
}

// ================================= VARIABLES ========================================

// CSS SELECTORS
const body = document.querySelector('body')
const CheckLocation_btn = document.querySelector('.CheckLocation_btn')
const search_btn = document.querySelector('.search_btn')
const WeatherDetails = document.querySelector('.WeatherDetails')
const container = document.querySelector('.container')
const Or = document.querySelector('.OR')
const GoBack_btn = document.querySelector('.GoBack_btn')
const search_input = document.getElementById('search_input')
const NotFound = document.querySelector('.NotFound')
const NotfoundMsg = document.querySelector('.NotfoundMsg')
// WEATHER DETAILS
const CityName = document.querySelector('.CityName')
const WeatherImage = document.querySelector('.WeatherImg img')
const Temperature = document.querySelector('.Temperature')
const WeatherType = document.querySelector('.WeatherType')
const Humidity = document.querySelector('#HumidityCard .data .percentage')
const WindSpeed = document.querySelector('#WindSpeedCard .data .percentage')
const Sunrise = document.querySelector('#Sunrise .data .percentage')
const sunset = document.querySelector('#sunset .data .percentage')
let from;
let temp = 0;
// LOADER
let Loader;
let Loader_counter = -1
const Loader_window = document.querySelector('.Loader_window')
const circles = document.querySelectorAll('.circle')

// ================================= CODE =============================================

CheckLocation_btn.addEventListener('click', () => {
  from = 'CheckLocationBtn'
  search_btn.click()
})
GoBack_btn.addEventListener('click', () => {
  search_input.value = ''
  Loader_Stop()
  NotFound.classList.add('display_none')
  container.style.height = '222px'
  GoBack_btn.classList.add('display_none')
  WeatherDetails.classList.add('display_none')
  Or.classList.remove('display_none')
  CheckLocation_btn.classList.remove('display_none')
  WeatherDetails.classList.remove('active')
  body.style.backgroundImage = 'url(/Assets/Default-Bg.jpg)'
})
search_btn.addEventListener('click', () => {
  if (temp == 0) {
    Undo_UI_Changes()
    Loader_Start()
    container.style.height = '545px'
    Or.classList.add('display_none')
    CheckLocation_btn.classList.add('display_none')
    if (from == 'CheckLocationBtn') {
      from = ''
      navigator.geolocation.getCurrentPosition(onSuccess, onFailure)
    } else {
      if (search_input.value == '') {
        navigator.geolocation.getCurrentPosition(onSuccess, onFailure)
      } else {
        Get_Weather_by_CityName(search_input.value)
      }
    }
  }
})
search_input.addEventListener('focus', () => {
  temp = 0
  search_input.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
      search_input.blur()//removes focus from input after pressing enter
      search_btn.click()
      temp = 1
    }
  })
})