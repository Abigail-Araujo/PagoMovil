function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var d = today.getDate();
    var mo = today.getMonth()+1;
    var y = today.getFullYear();
    var ampm = h >= 12 ? 'p.m.' : 'a.m.';
    h = h % 12;
    h = h ? h : 12; // la hora '0' debe ser '12'
    m = checkTime(m);
    document.getElementById('hora').innerHTML = h + ":" + m + " " + ampm;
    document.getElementById('fecha').innerHTML = d + "/" + mo + "/" + y;
    var t = setTimeout(startTime, 500);
  }

  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // añade un cero delante de los números < 10
    return i;
  }

  startTime();
