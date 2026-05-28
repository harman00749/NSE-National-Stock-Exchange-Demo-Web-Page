
var stocks = [
  { name: "Reliance Industries", symbol: "RELIANCE",  price: 2450.10, change: +35.20  },
  { name: "TCS",                 symbol: "TCS",        price: 3890.00, change: -42.00  },
  { name: "Infosys",             symbol: "INFY",       price: 1560.45, change: +18.75  },
  { name: "HDFC Bank",           symbol: "HDFCBANK",   price: 1720.30, change: -12.50  },
  { name: "Wipro",               symbol: "WIPRO",      price:  490.80, change:  +6.30  },
  { name: "Bajaj Finance",       symbol: "BAJFINANCE", price: 7100.00, change: +95.00  },
  { name: "SBI",                 symbol: "SBIN",       price:  620.15, change:  -8.40  },
  { name: "Maruti Suzuki",       symbol: "MARUTI",     price: 10250.00,change: +210.00 },
  { name: "ICICI Bank",          symbol: "ICICIBANK",  price: 1258.40, change:  +7.20  },
  { name: "Hindustan Unilever",  symbol: "HINDUNILVR", price: 2136.00, change: +51.00  }
];

var indices = [
  { name: "NIFTY 50",          value: 23306.45, change: +394.05,  pct: "+1.72%" },
  { name: "NIFTY NEXT 50",     value: 63620.60, change: +1259.90, pct: "+2.02%" },
  { name: "NIFTY FIN SERVICE", value: 25056.35, change: +574.15,  pct: "+2.35%" },
  { name: "NIFTY BANK",        value: 53708.10, change: +1102.45, pct: "+2.10%" },
  { name: "NIFTY IT",          value: 23915.00, change: +415.85,  pct: "+1.77%" }
];

var cardsDiv = document.getElementById("index-cards");

indices.forEach(function(idx) {
  var isUp = idx.change >= 0;
  var html =
    '<div class="index-card">' +
      '<div class="ic-name">'  + idx.name + '</div>' +
      '<div class="ic-value">' + idx.value.toLocaleString() + '</div>' +
      '<div class="' + (isUp ? "ic-change-up" : "ic-change-down") + '">' +
        (isUp ? "▲ " : "▼ ") + Math.abs(idx.change).toFixed(2) + ' (' + idx.pct + ')' +
      '</div>' +
    '</div>';
  cardsDiv.innerHTML += html;
});

function buildTicker() {
  var tickerDiv = document.getElementById("ticker");
  var html = "";

  for (var loop = 0; loop < 2; loop++) {
    stocks.forEach(function(s) {
      var isUp = s.change >= 0;
      html +=
        '<div class="ticker-item">' +
          '<span class="t-name">'  + s.symbol + '</span>' +
          '<span class="t-price">' + s.price.toFixed(2) + '</span>' +
          '<span class="' + (isUp ? "t-up" : "t-down") + '">' +
            (isUp ? "▲ +" : "▼ ") + s.change.toFixed(2) +
          '</span>' +
        '</div>';
    });
  }

  tickerDiv.innerHTML = html;
}

buildTicker();

function buildTable() {
  var tbody = document.getElementById("stock-table-body");
  tbody.innerHTML = "";

  stocks.forEach(function(s) {
    var isUp = s.change >= 0;
    var pct  = ((s.change / (s.price - s.change)) * 100).toFixed(2);
    var vol  = Math.floor(100000 + Math.random() * 900000).toLocaleString();

    tbody.innerHTML +=
      '<tr>' +
        '<td>' + s.name + '</td>' +
        '<td>' + s.price.toFixed(2) + '</td>' +
        '<td class="' + (isUp ? "up" : "down") + '">' + (isUp ? "+" : "") + s.change.toFixed(2) + '</td>' +
        '<td class="' + (isUp ? "up" : "down") + '">' + (isUp ? "+" : "") + pct + '%</td>' +
        '<td>' + vol + '</td>' +
        '<td><button class="buy-btn" onclick="buyStock(\'' + s.symbol + '\', \'' + s.price.toFixed(2) + '\')">BUY</button></td>' +
      '</tr>';
  });
}

buildTable();

function buildGainersLosers() {
  var sorted = stocks.slice().sort(function(a, b) {
    return (b.change / b.price) - (a.change / a.price);
  });

  var gainersDiv = document.getElementById("gainers-list");
  gainersDiv.innerHTML = "";
  sorted.slice(0, 4).forEach(function(s) {
    var pct = ((s.change / (s.price - s.change)) * 100).toFixed(2);
    gainersDiv.innerHTML +=
      '<div class="sb-row">' +
        '<span>' + s.symbol + '</span>' +
        '<span class="up">+' + pct + '%</span>' +
      '</div>';
  });

  var losersDiv = document.getElementById("losers-list");
  losersDiv.innerHTML = "";
  sorted.slice(-3).reverse().forEach(function(s) {
    var pct = ((s.change / (s.price - s.change)) * 100).toFixed(2);
    losersDiv.innerHTML +=
      '<div class="sb-row">' +
        '<span>' + s.symbol + '</span>' +
        '<span class="down">' + pct + '%</span>' +
      '</div>';
  });
}

buildGainersLosers();

function fluctuatePrices() {
  stocks.forEach(function(s) {
    var fluctuation = (Math.random() - 0.5) * 0.01 * s.price;
    s.price  = parseFloat((s.price  + fluctuation).toFixed(2));
    s.change = parseFloat((s.change + fluctuation * 0.1).toFixed(2));
  });

  var niftyVal = 23306.45 + (Math.random() - 0.5) * 100;
  niftyVal = niftyVal.toFixed(2);
  document.getElementById("header-nifty").textContent    = parseFloat(niftyVal).toLocaleString('en-IN', { minimumFractionDigits: 2 });
  document.getElementById("chart-nifty-val").textContent = parseFloat(niftyVal).toLocaleString('en-IN', { minimumFractionDigits: 2 });

  buildTable();
  buildTicker();
  buildGainersLosers();
}

setInterval(fluctuatePrices, 2000);

var activePeriod = "1D";

var periodConfig = {
  "1D": { points: 80,  step: 15, base: 23064, label: "Today (every 5 min)"   },
  "1M": { points: 30,  step: 80, base: 20500, label: "Last 1 Month (daily)"  },
  "3M": { points: 90,  step: 60, base: 19000, label: "Last 3 Months (daily)" },
  "6M": { points: 180, step: 50, base: 17000, label: "Last 6 Months (daily)" },
  "1Y": { points: 365, step: 40, base: 15000, label: "Last 1 Year (daily)"   }
};

function generateTimestamps(period, count) {
  var times  = [];
  var now    = new Date();
  var days   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  for (var i = count - 1; i >= 0; i--) {
    var d = new Date(now);
    if (period === "1D") {
      d.setMinutes(d.getMinutes() - i * 5);
      var hh = d.getHours().toString().padStart(2, "0");
      var mm = d.getMinutes().toString().padStart(2, "0");
      times.push(days[d.getDay()] + ", " + d.getDate() + " " + months[d.getMonth()] + " | " + hh + ":" + mm + ":00");
    } else {
      d.setDate(d.getDate() - i);
      times.push(days[d.getDay()] + ", " + d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear());
    }
  }
  return times;
}

function generateData(period) {
  var cfg  = periodConfig[period];
  var data = [];
  var val  = cfg.base;
  for (var i = 0; i < cfg.points; i++) {
    val += (Math.random() - 0.48) * cfg.step;
    if (val < cfg.base * 0.85) val = cfg.base * 0.85;
    data.push(parseFloat(val.toFixed(2)));
  }
  return data;
}

var allChartData  = {};
var allTimestamps = {};

Object.keys(periodConfig).forEach(function(p) {
  allChartData[p]  = generateData(p);
  allTimestamps[p] = generateTimestamps(p, periodConfig[p].points);
});

var chartData = allChartData["1D"];

var zoomStart  = 0;
var zoomEnd    = chartData.length - 1;

var hoverIndex = -1;

function drawChart() {
  var canvas = document.getElementById("niftyChart");
  var ctx    = canvas.getContext("2d");
  var W      = canvas.offsetWidth;
  var H      = 180;
  canvas.width  = W;
  canvas.height = H;

  ctx.clearRect(0, 0, W, H);

  var data  = chartData.slice(zoomStart, zoomEnd + 1);
  var times = allTimestamps[activePeriod].slice(zoomStart, zoomEnd + 1);

  if (data.length < 2) return;

  var min  = Math.min.apply(null, data) - 30;
  var max  = Math.max.apply(null, data) + 30;
  var LEFT = 48;
  function toX(i) {
    return LEFT + (i / (data.length - 1)) * (W - LEFT - 8);
  }

  function toY(v) {
    return H - 10 - ((v - min) / (max - min)) * (H - 25);
  }

  ctx.strokeStyle = "#eee";
  ctx.lineWidth   = 1;
  for (var g = 0; g <= 4; g++) {
    var gy = H - 10 - (g / 4) * (H - 25);
    ctx.beginPath();
    ctx.moveTo(LEFT, gy);
    ctx.lineTo(W, gy);
    ctx.stroke();
  }

  ctx.fillStyle  = "#999";
  ctx.font       = "11px Arial";
  ctx.textAlign  = "right";
  for (var g = 0; g <= 4; g++) {
    var labelVal = min + (g / 4) * (max - min);
    var gy       = H - 10 - (g / 4) * (H - 25);
    ctx.fillText(Math.round(labelVal).toLocaleString(), LEFT - 4, gy + 4);
  }
  ctx.textAlign = "left";

  ctx.beginPath();
  data.forEach(function(val, i) {
    i === 0 ? ctx.moveTo(toX(i), toY(val)) : ctx.lineTo(toX(i), toY(val));
  });
  ctx.lineTo(toX(data.length - 1), H - 10);
  ctx.lineTo(toX(0), H - 10);
  ctx.closePath();
  ctx.fillStyle = "rgba(0, 153, 68, 0.12)";
  ctx.fill();

  ctx.beginPath();
  data.forEach(function(val, i) {
    i === 0 ? ctx.moveTo(toX(i), toY(val)) : ctx.lineTo(toX(i), toY(val));
  });
  ctx.strokeStyle = "#009944";
  ctx.lineWidth   = 2;
  ctx.stroke();

  ctx.fillStyle = "#bbb";
  ctx.font      = "11px Arial";
  ctx.textAlign = "right";
  ctx.fillText(periodConfig[activePeriod].label, W - 4, H - 2);
  ctx.textAlign = "left";

  ctx.fillStyle = "#bbb";
  ctx.font      = "11px Arial";
  ctx.fillText("🔍 Scroll to zoom", LEFT + 2, 14);

  if (hoverIndex >= 0 && hoverIndex < data.length) {
    var hx = toX(hoverIndex);
    var hy = toY(data[hoverIndex]);

    ctx.setLineDash([4, 3]);
    ctx.strokeStyle = "rgba(0,0,0,0.2)";
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.moveTo(hx, 0);
    ctx.lineTo(hx, H - 10);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.arc(hx, hy, 5, 0, Math.PI * 2);
    ctx.fillStyle   = "#009944";
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.lineWidth   = 2;
    ctx.stroke();

    var val      = data[hoverIndex];
    var firstVal = data[0];
    var change   = val - firstVal;
    var pct      = ((change / firstVal) * 100).toFixed(2);
    var isUp     = change >= 0;
    var timeStr  = times[hoverIndex] || "";
    var valStr   = val.toLocaleString('en-IN', { minimumFractionDigits: 2 });

    ctx.font = "bold 15px Arial";
    var w2   = ctx.measureText(valStr).width;
    ctx.font = "12px Arial";
    var w3   = ctx.measureText(timeStr).width;
    var tipW = Math.max(w2, w3) + 80;
    var tipH = 68;

    var tipX = hx + 14;
    if (tipX + tipW > W - 5) tipX = hx - tipW - 14;
    var tipY = hy - tipH / 2;
    if (tipY < 5) tipY = 5;
    if (tipY + tipH > H - 5) tipY = H - tipH - 5;

    ctx.shadowColor = "rgba(0,0,0,0.15)";
    ctx.shadowBlur  = 8;
    ctx.fillStyle   = "white";
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth   = 1;

    var r = 6;
    ctx.beginPath();
    ctx.moveTo(tipX + r, tipY);
    ctx.lineTo(tipX + tipW - r, tipY);
    ctx.quadraticCurveTo(tipX + tipW, tipY, tipX + tipW, tipY + r);
    ctx.lineTo(tipX + tipW, tipY + tipH - r);
    ctx.quadraticCurveTo(tipX + tipW, tipY + tipH, tipX + tipW - r, tipY + tipH);
    ctx.lineTo(tipX + r, tipY + tipH);
    ctx.quadraticCurveTo(tipX, tipY + tipH, tipX, tipY + tipH - r);
    ctx.lineTo(tipX, tipY + r);
    ctx.quadraticCurveTo(tipX, tipY, tipX + r, tipY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.font      = "bold 12px Arial";
    ctx.fillStyle = "#009944";
    ctx.fillText("●", tipX + 10, tipY + 20);
    ctx.fillStyle = "#333";
    ctx.fillText(" NIFTY 50", tipX + 20, tipY + 20);

    ctx.font      = "bold 14px Arial";
    ctx.fillStyle = "#111";
    ctx.fillText(valStr, tipX + 10, tipY + 38);
    ctx.font      = "bold 13px Arial";
    ctx.fillStyle = isUp ? "green" : "red";
    var valW      = ctx.measureText(valStr + "  ").width + 10;
    ctx.fillText((isUp ? "+" : "") + change.toFixed(2) + " (" + (isUp ? "+" : "") + pct + "%)", tipX + valW + 4, tipY + 38);

    ctx.font      = "11px Arial";
    ctx.fillStyle = "#888";
    ctx.fillText(timeStr, tipX + 10, tipY + 56);
  }
}

function switchChart(period, btn) {
  document.querySelectorAll(".chart-btns button").forEach(function(b) {
    b.classList.remove("active");
  });

  btn.classList.add("active");

  activePeriod = period;
  chartData    = allChartData[period];

  zoomStart  = 0;
  zoomEnd    = chartData.length - 1;
  hoverIndex = -1;

  drawChart();
}

function updateChart() {
  if (activePeriod !== "1D") return;

  var data = allChartData["1D"];
  var last = data[data.length - 1];
  var next = last + (Math.random() - 0.48) * 15;
  data.push(parseFloat(next.toFixed(2)));

  allTimestamps["1D"].push(generateTimestamps("1D", 1)[0]);

  if (data.length > 80) {
    data.shift();
    allTimestamps["1D"].shift();
  }

  chartData = data;
  zoomEnd   = chartData.length - 1;
  drawChart();
}

setInterval(updateChart, 2000);

var canvas = document.getElementById("niftyChart");

canvas.addEventListener("mousemove", function(e) {
  var rect   = canvas.getBoundingClientRect();
  var mouseX = e.clientX - rect.left;
  var W      = canvas.width;
  var LEFT   = 48;
  var data   = chartData.slice(zoomStart, zoomEnd + 1);

  var idx = Math.round((mouseX - LEFT) / (W - LEFT - 8) * (data.length - 1));
  idx = Math.max(0, Math.min(data.length - 1, idx));

  hoverIndex = idx;
  drawChart();
});

canvas.addEventListener("mouseleave", function() {
  hoverIndex = -1;
  drawChart();
});

canvas.addEventListener("wheel", function(e) {
  e.preventDefault();

  var visibleCount = zoomEnd - zoomStart + 1;
  var zoomAmount   = Math.ceil(visibleCount * 0.1);
  if (zoomAmount < 1) zoomAmount = 1;

  if (e.deltaY < 0) {
    zoomStart = Math.min(zoomStart + zoomAmount, zoomEnd - 5);
    zoomEnd   = Math.max(zoomEnd   - zoomAmount, zoomStart + 5);
  } else {
    zoomStart = Math.max(zoomStart - zoomAmount, 0);
    zoomEnd   = Math.min(zoomEnd   + zoomAmount, chartData.length - 1);
  }

  hoverIndex = -1;
  drawChart();
}, { passive: false });
drawChart();

window.addEventListener("resize", function() {
  zoomStart = 0;
  zoomEnd   = chartData.length - 1;
  drawChart();
});

var currentSlide = 0;
var slides       = document.querySelectorAll(".slide");
var dots         = document.querySelectorAll(".slide-dots .dot");

function goSlide(n) {
  slides[currentSlide].classList.remove("active");
  dots[currentSlide].classList.remove("active");

  currentSlide = n % slides.length;
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

setInterval(function() {
  goSlide(currentSlide + 1);
}, 3000);

var snapshotData = {
  gainers: [
    { symbol: "ONGC",       ltp: 281.10,  chng: +10.90, pct: +4.03, vol: "600.49",  val: "1,684.19"  },
    { symbol: "WIPRO",      ltp: 191.35,  chng: +2.30,  pct: +1.22, vol: "262.69",  val: "501.53"    },
    { symbol: "BHARTIARTL", ltp: 1850.00, chng: +15.10, pct: +0.82, vol: "244.90",  val: "4,504.82"  },
    { symbol: "TCS",        ltp: 2387.50, chng: +10.10, pct: +0.42, vol: "49.79",   val: "1,196.87"  },
    { symbol: "COALINDIA",  ltp: 445.10,  chng: +1.40,  pct: +0.32, vol: "171.84",  val: "762.79"    }
  ],
  losers: [
    { symbol: "SBIN",       ltp: 620.15,  chng: -8.40,  pct: -1.34, vol: "480.10",  val: "2,980.00"  },
    { symbol: "HDFCBANK",   ltp: 1720.30, chng: -12.50, pct: -0.72, vol: "310.50",  val: "5,340.60"  },
    { symbol: "TCS",        ltp: 3890.00, chng: -42.00, pct: -1.07, vol: "82.20",   val: "3,196.00"  },
    { symbol: "INFY",       ltp: 1560.45, chng: -5.80,  pct: -0.37, vol: "210.30",  val: "3,282.00"  },
    { symbol: "WIPRO",      ltp: 490.80,  chng: -3.20,  pct: -0.65, vol: "150.00",  val: "736.20"    }
  ],
  activeVal: [
    { symbol: "RELIANCE",   ltp: 2450.10, chng: +35.20, pct: +1.46, vol: "1240.50", val: "30,386.23" },
    { symbol: "HDFCBANK",   ltp: 1720.30, chng: -12.50, pct: -0.72, vol: "915.80",  val: "15,752.07" },
    { symbol: "ICICIBANK",  ltp: 1258.40, chng: +7.20,  pct: +0.57, vol: "820.30",  val: "10,326.00" },
    { symbol: "BAJFINANCE", ltp: 7100.00, chng: +95.00, pct: +1.35, vol: "210.60",  val: "14,952.60" },
    { symbol: "MARUTI",     ltp: 10250.0, chng: +210.0, pct: +2.09, vol: "105.40",  val: "10,803.50" }
  ],
  activeVol: [
    { symbol: "SBIN",       ltp: 620.15,  chng: -8.40,  pct: -1.34, vol: "1480.90", val: "9,183.00"  },
    { symbol: "RELIANCE",   ltp: 2450.10, chng: +35.20, pct: +1.46, vol: "1240.50", val: "30,386.23" },
    { symbol: "ONGC",       ltp: 281.10,  chng: +10.90, pct: +4.03, vol: "600.49",  val: "1,684.19"  },
    { symbol: "HDFCBANK",   ltp: 1720.30, chng: -12.50, pct: -0.72, vol: "915.80",  val: "15,752.07" },
    { symbol: "WIPRO",      ltp: 191.35,  chng: +2.30,  pct: +1.22, vol: "262.69",  val: "501.53"    }
  ],
  etf: [
    { symbol: "NIFTYBEES",  ltp: 234.50,  chng: +3.80,  pct: +1.65, vol: "520.30",  val: "1,219.90"  },
    { symbol: "BANKBEES",   ltp: 537.20,  chng: +5.10,  pct: +0.95, vol: "310.40",  val: "1,668.07"  },
    { symbol: "GOLDBEES",   ltp: 58.40,   chng: +0.30,  pct: +0.52, vol: "180.50",  val: "1,054.12"  },
    { symbol: "ITBEES",     ltp: 41.20,   chng: -0.50,  pct: -1.20, vol: "95.20",   val: "392.22"    },
    { symbol: "JUNIORBEES", ltp: 632.00,  chng: +12.40, pct: +2.00, vol: "60.10",   val: "379.83"    }
  ]
};

function buildSnapshotTable(tabKey) {
  var tbody = document.getElementById("snapshot-tbody");
  tbody.innerHTML = "";

  snapshotData[tabKey].forEach(function(row) {
    var isUp = row.chng >= 0;
    tbody.innerHTML +=
      '<tr>' +
        '<td>' + row.symbol + '</td>' +
        '<td>' + row.ltp.toFixed(2) + '</td>' +
        '<td class="' + (isUp ? "up" : "down") + '">' + (isUp ? "+" : "") + row.chng.toFixed(2) + '</td>' +
        '<td class="' + (isUp ? "up" : "down") + '">' + (isUp ? "+" : "") + row.pct.toFixed(2) + '</td>' +
        '<td>' + row.vol + '</td>' +
        '<td>' + row.val + '</td>' +
      '</tr>';
  });
}

function switchSnapshotTab(tabKey, clickedTab) {
  document.querySelectorAll(".snap-tab").forEach(function(t) {
    t.classList.remove("active");
  });

  clickedTab.classList.add("active");

  buildSnapshotTable(tabKey);
}

buildSnapshotTable("gainers");

function isMarketOpen() {
  var now     = new Date();
  var hours   = now.getHours();
  var minutes = now.getMinutes();

  var currentTime = hours * 60 + minutes;

  var openTime  = 9  * 60 + 30;   
  var closeTime = 17 * 60 + 30;  

  return currentTime >= openTime && currentTime < closeTime;
}

function getCurrentTimeString() {
  var now = new Date();
  var hh  = now.getHours().toString().padStart(2, "0");
  var mm  = now.getMinutes().toString().padStart(2, "0");
  var ss  = now.getSeconds().toString().padStart(2, "0");
  return hh + ":" + mm + ":" + ss;
}

function updateMarketStatus() {
  var statusBar  = document.getElementById("market-status-bar");
  var statusIcon = document.getElementById("market-status-icon");
  var statusText = document.getElementById("market-status-text");
  var statusTime = document.getElementById("market-status-time");

  var open = isMarketOpen();

  if (open) {
    statusBar.classList.remove("closed");
    statusIcon.textContent = "🟢";
    statusText.textContent = "Market is OPEN  |  Trading Hours: 9:30 AM – 5:30 PM";
  } else {
    statusBar.classList.add("closed");
    statusIcon.textContent = "🔴";
    statusText.textContent = "Market is CLOSED  |  Opens at 9:30 AM";
  }

  statusTime.textContent = "Current Time: " + getCurrentTimeString();

  var buyBtns = document.querySelectorAll(".buy-btn");
  buyBtns.forEach(function(btn) {
    if (open) {
      btn.disabled = false;
      btn.title    = "Click to Buy";
    } else {
      btn.disabled = true;
      btn.title    = "Market is closed. Trading resumes at 9:30 AM.";
    }
  });
}

function checkMarketOnLoad() {
  if (!isMarketOpen()) {
    var overlay    = document.getElementById("market-closed-overlay");
    var overlayMsg = document.getElementById("overlay-time");
    overlay.classList.add("show");
    overlayMsg.textContent = "Current Time: " + getCurrentTimeString();
  }
}

function buyStock(symbol, price) {
  if (!isMarketOpen()) {
    alert("❌ Market is closed!\nTrading hours: 9:30 AM – 5:30 PM\nYou can only view market data now.");
    return;
  }
  alert("✅ Order placed!\nStock: " + symbol + "\nPrice: ₹" + price + "\n\nYour order has been submitted successfully.");
}

setInterval(updateMarketStatus, 1000);
updateMarketStatus();   
checkMarketOnLoad();    

function showPage(pageName) {
  var allPages = document.querySelectorAll(".inner-page");
  allPages.forEach(function(p) {
    p.style.display = "none";
  });

  var homePage = document.getElementById("page-home");

  if (pageName === "home") {
    homePage.style.display = "block";
  } else {
    homePage.style.display = "none";
    var targetPage = document.getElementById("page-" + pageName);
    if (targetPage) {
      targetPage.style.display = "block";
    }
  }
  window.scrollTo(0, 0);
}

function toggleGroup(titleEl) {
  var group = titleEl.parentElement;
  var isOpen = group.classList.contains("open");

  var allGroups = group.parentElement.querySelectorAll(".sidebar-group");
  allGroups.forEach(function(g) {
    g.classList.remove("open");
    var span = g.querySelector(".sidebar-group-title span");
    if (span) span.textContent = "+";
  });

  if (!isOpen) {
    group.classList.add("open");
    var span = titleEl.querySelector("span");
    if (span) span.textContent = "−";
  }
}

var sectionContent = {
  intro: {
    title: "Introduction",
    content: `
      <p>NSE (National Stock Exchange) is an institution of national importance with international stature. We are a trusted market infrastructure institution with high standards of corporate governance.</p>
      <br>
      <p>A homegrown brand with a global vision, NSE is counted as one of the world's largest exchanges and a catalyst for driving India's economic growth. NSE was the first exchange in India to implement electronic or screen-based trading which began its operations in 1994.</p>
      <br>
      <p>Our robust state-of-the-art technology platform offers high levels of robustness, safety and resilience for trading and investment opportunities across all asset classes and for all categories of investors.</p>
    `
  },
  history: {
    title: "History & Milestones",
    content: `
      <p>NSE's journey from its inception to becoming one of the world's largest exchanges is a story of innovation, perseverance, and commitment to transparency.</p>
      <br>
      <table class="inner-table">
        <thead><tr><th>Year</th><th>Milestone</th></tr></thead>
        <tbody>
          <tr><td>1992</td><td>NSE incorporated as a company</td></tr>
          <tr><td>1993</td><td>Recognized as a stock exchange by SEBI</td></tr>
          <tr><td>1994</td><td>WDM (Wholesale Debt Market) segment begins operations</td></tr>
          <tr><td>1994</td><td>Capital Market (Equities) segment begins operations</td></tr>
          <tr><td>1996</td><td>Nifty 50 index launched</td></tr>
          <tr><td>2000</td><td>Internet trading begins</td></tr>
          <tr><td>2000</td><td>Futures & Options (F&O) segment launched</td></tr>
          <tr><td>2012</td><td>NSE EMERGE (SME Platform) launched</td></tr>
          <tr><td>2016</td><td>NSE lists on BSE and NSE itself</td></tr>
        </tbody>
      </table>
    `
  },
  awards: {
    title: "Awards & Recognition",
    content: `
      <p>NSE has received numerous awards and recognitions for its contribution to the Indian capital markets and for adopting best practices in technology, governance, and investor services.</p>
      <br>
      <ul style="margin-left:20px; line-height:2.2; font-size:14px;">
        <li>🏆 Best Stock Exchange in South Asia — multiple years</li>
        <li>🏆 Best Technology Provider — Asia Pacific</li>
        <li>🏆 Best Derivatives Exchange — India</li>
        <li>🏆 FICCI Award for Financial Inclusion</li>
        <li>🏆 National Award for Excellence in Corporate Governance</li>
        <li>🏆 Best Commodity Derivatives Exchange in India</li>
      </ul>
    `
  },
  products: {
    title: "Our Products",
    content: `
      <p>NSE offers a wide range of financial products and services to meet the diverse needs of market participants.</p>
      <br>
      <table class="inner-table">
        <thead><tr><th>Product</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>Equity Market</td><td>Shares and stocks of listed companies</td></tr>
          <tr><td>Equity Derivatives</td><td>Futures and Options on stocks and indices</td></tr>
          <tr><td>Currency Derivatives</td><td>Futures and Options on currency pairs</td></tr>
          <tr><td>Commodity Derivatives</td><td>Futures on commodities like Gold, Silver</td></tr>
          <tr><td>Debt Market</td><td>Bonds, debentures and government securities</td></tr>
          <tr><td>Mutual Funds</td><td>MF units traded on exchange</td></tr>
          <tr><td>ETFs</td><td>Exchange Traded Funds</td></tr>
        </tbody>
      </table>
    `
  },
  regulations: {
    title: "Regulations",
    content: `
      <p>NSE operates under a robust regulatory framework governed by SEBI (Securities and Exchange Board of India) and various Acts of the Indian Parliament.</p>
      <br>
      <ul style="margin-left:20px; line-height:2.2; font-size:14px;">
        <li>📜 Securities Contracts (Regulation) Act, 1956</li>
        <li>📜 Securities and Exchange Board of India Act, 1992</li>
        <li>📜 Depositories Act, 1996</li>
        <li>📜 Companies Act, 2013</li>
        <li>📜 Prevention of Money Laundering Act, 2002</li>
        <li>📜 SEBI (Stock Brokers and Sub-Brokers) Regulations</li>
      </ul>
    `
  },
  facts: {
    title: "Facts & Figures (Records)",
    content: `
      <p>NSE has set numerous records and achieved several milestones in its journey as India's premier stock exchange.</p>
      <br>
      <table class="inner-table">
        <thead><tr><th>Record</th><th>Details</th></tr></thead>
        <tbody>
          <tr><td>World's Largest Derivatives Exchange</td><td>By number of contracts traded (2023)</td></tr>
          <tr><td>Registered Investors</td><td>Over 25 Crore (250 million)</td></tr>
          <tr><td>Market Capitalization</td><td>Over ₹420 Lac Crores</td></tr>
          <tr><td>Listed Companies</td><td>Over 2,000 companies</td></tr>
          <tr><td>Daily Turnover</td><td>₹6-7 Lakh Crores average</td></tr>
          <tr><td>Trading Members</td><td>Over 1,300 registered members</td></tr>
        </tbody>
      </table>
    `
  }
};

function loadSection(key) {
  var data    = sectionContent[key];
  var content = document.getElementById("about-content");
  if (!data || !content) return;

  content.innerHTML = "<h3>" + data.title + "</h3><br>" + data.content;

  var links = document.querySelectorAll("#page-about-us .page-sidebar a");
  links.forEach(function(a) { a.classList.remove("active"); });
  event.target.classList.add("active");
}

function searchCompany() {
  var input      = document.getElementById("search-input");
  var dropdown   = document.getElementById("search-results");
  var query      = input.value.trim().toLowerCase();

  if (query.length === 0) {
    dropdown.classList.remove("show");
    dropdown.innerHTML = "";
    return;
  }

  // stocks array mein se match dhundo
  var results = stocks.filter(function(s) {
    return s.name.toLowerCase().includes(query) ||
           s.symbol.toLowerCase().includes(query);
  });

  // Dropdown HTML banao
  if (results.length === 0) {
    dropdown.innerHTML = '<div class="search-no-result">❌ No company found for "' + input.value + '"</div>';
  } else {
    dropdown.innerHTML = "";
    results.forEach(function(s) {
      var isUp   = s.change >= 0;
      var pct    = ((s.change / (s.price - s.change)) * 100).toFixed(2);
      var color  = isUp ? "green" : "red";
      var arrow  = isUp ? "▲" : "▼";

      dropdown.innerHTML +=
        '<div class="search-item" onclick="selectStock(\'' + s.symbol + '\')">' +
          '<div class="search-item-left">' +
            '<div class="s-symbol">' + s.symbol + '</div>' +
            '<div class="s-name">'   + s.name   + '</div>' +
          '</div>' +
          '<div class="search-item-right">' +
            '<div class="s-price">₹' + s.price.toFixed(2) + '</div>' +
            '<div class="s-change" style="color:' + color + '">' +
              arrow + ' ' + Math.abs(s.change).toFixed(2) + ' (' + (isUp ? '+' : '') + pct + '%)' +
            '</div>' +
          '</div>' +
        '</div>';
    });
  }

  dropdown.classList.add("show");
}

// Stock select hone par search box mein naam dalo aur dropdown band karo
function selectStock(symbol) {
  var stock = stocks.find(function(s) { return s.symbol === symbol; });
  if (stock) {
    document.getElementById("search-input").value = stock.symbol + " — " + stock.name;
  }
  document.getElementById("search-results").classList.remove("show");
}

// Page pe kahin bhi click karo — dropdown band ho
document.addEventListener("click", function(e) {
  var wrapper = document.querySelector(".search-wrapper");
  if (wrapper && !wrapper.contains(e.target)) {
    var dropdown = document.getElementById("search-results");
    if (dropdown) dropdown.classList.remove("show");
  }
});


/* ============================
   SECTION 21: BOTTOM SNAP SLIDESHOW
   img4, img5, img6 — har 3 sec mein change hoti hai
   ============================ */

var currentSnapSlide = 0;
var snapSlides = document.querySelectorAll(".snap-slide");
var snapDots   = document.querySelectorAll(".snap-slideshow .snap-dot");

function goSnapSlide(n) {
  if (snapSlides.length === 0) return;

  // Purani slide hide karo
  snapSlides[currentSnapSlide].classList.remove("active");
  if (snapDots[currentSnapSlide]) snapDots[currentSnapSlide].classList.remove("active");

  // Nayi slide dikhao
  currentSnapSlide = n % snapSlides.length;
  snapSlides[currentSnapSlide].classList.add("active");
  if (snapDots[currentSnapSlide]) snapDots[currentSnapSlide].classList.add("active");
}

// Har 3 second mein auto change
setInterval(function() {
  goSnapSlide(currentSnapSlide + 1);
}, 3000);
