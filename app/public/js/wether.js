
    const getJSON = function(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      const status = xhr.status;
      if(status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
  };


  const C = document.getElementById("C");

 
  getJSON('http://api.openweathermap.org/data/2.5/weather?q=Cheonan&appid=707ff0c3902b644c6468659c800225c0&units=metric',
    function(err, data) {
    if(err !== null) {
      alert('예상치 못한 오류 발생.' + err);
    } else {

        C.innerHTML = data.main.temp+"°";
//       alert(`현재
//         온도는 ${data.main.temp}°
//         풍속은 ${data.wind.speed}m/s
//         습도는 ${data.main.humidity}%
//   입니다.
//   오늘의
//         최고기온은 ${data.main.temp_max}°
//         최저기온은 ${data.main.temp_min}°
//   입니다.`)
    }
  });
