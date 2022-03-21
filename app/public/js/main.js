const c1 = document.getElementById("c1"),
    c2 = document.getElementById("c2"),
    c3 = document.getElementById("c3"),
    c4 = document.getElementById("c4"),
    c5 = document.getElementById("c5"),
    c6 = document.getElementById("c6"),
    c7 = document.getElementById("c7"),
    c8 = document.getElementById("c8");



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

 
  getJSON('http://api.openweathermap.org/data/2.5/weather?q=cheonan&appid=707ff0c3902b644c6468659c800225c0&units=metric',
    function(err, data) {
    if(err !== null) {
      alert('예상치 못한 오류 발생.' + err);
    } else {

        if(data.main.temp<=11){
            c1.src = "image/winterc1.jpg";
            
            c2.src = "image/winterc2.jpg";
            
            c3.src = "image/winterc3.jpg";
            
            c4.src = "image/winterc4.jpg";
           
            c5.src = "image/winterc5.jpg";
            
            c6.src = "image/winterc6.jpg";
            
            c7.src = "image/C1.jpg";
            
            c8.src = "image/Coat6.jpg";
            
        }
        else if(11<data.main.temp<=20){
            c1.src = "image/C2.jpg";
            
            c2.src = "image/C3.jpg";
            
            c3.src = "image/C4.jpg";
            
            c4.src = "image/C5.jpg";
            
            c5.src = "image/C6.jpg";
            
            c6.src = "image/C7.jpg";
            
            c7.src = "image/Coat8.jpg";
            
            c8.src = "image/Coat5.jpg";
            
        }

      
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