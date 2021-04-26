const apiKey = 'bfcfb9ccdaa6b44e1a992a26c9e25629';
const apiBaseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';


const fetchWeather = async function (url) {
  let response = await fetch(url);
  try {
    let data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log("Err:", error)
  }
}
// Click Function
const magicClick= async function() {
  const zip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;
  const url = `${apiBaseUrl}${zip}&appid=${apiKey}`;
  // If Fields Empty Show Alert
  if (zip.length === 0 || feelings.length === 0) {
    alert("Fill Form First ");
    return;
  }

  let weatherData = await fetchWeather(url);
  
  let temp = weatherData.main.temp;

  // Create a new date instance dynamically with JS
  let d = new Date();
  let date = d.getDate() + '.'+ (d.getMonth() + 1 )+ '.' + d.getFullYear();

  const data = {
    date: date,
    temp: temp,
    content: content,
  }
  
  //Post Data To Server
  await postData("http://localhost:8000/projectData", data);
  
  //Updating UI
  updateUI();  
}


const updateUI= async function() {
  const date_ = document.getElementById('date');
  const temp_ = document.getElementById('temp');
  const content_ = document.getElementById('content');
  
  //Get Data From Server
  let UI_Data = await getData("http://localhost:8000/projectData");
  
  //UI Update 
  date_.innerHTML = UI_Data.date;
  temp_.innerHTML = UI_Data.temp;
  content_.innerHTML = UI_Data.content;
}
// FUNCTIONS 
async function postData(url,data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json(); 
}

const getData= async function(url) {
  let response = await fetch(url)
  try {
    let data = response.json();
    //console.log(data);
    
    return data;
  } catch(error){
    console.log(error);
  }
 
}


// EVENTHANDLER
const generateBtn = document.querySelector('#generate');
generateBtn.addEventListener('click', magicClick);
