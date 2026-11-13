(function () {
  "use strict";

  var view = document.getElementById("view");
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tabs button"));
  var installBtn = document.getElementById("install");
  var currentTab = "today";

  document.getElementById("sub").textContent = HEADER;

  /* ---------- helpers ---------- */
  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function fmt(m) {
    var h = Math.floor(m / 60), mm = m % 60;
    var ap = h >= 12 ? "PM" : "AM";
    var h12 = ((h + 11) % 12) + 1;
    return h12 + ":" + (mm < 10 ? "0" : "") + mm + " " + ap;
  }

  function duration(a, b) {
    var d = b - a;
    if (d < 60) return d + " min";
    var hrs = d / 60;
    return (d % 60 ? hrs.toFixed(1) : hrs) + " hr";
  }

  function nowMinutes() {
    var n = new Date();
    return n.getHours() * 60 + n.getMinutes();
  }

  function badge(text, extra) {
    return el("span", "badge" + (extra ? " " + extra : ""), text);
  }

  function dayHeader(dayNum, isToday) {
    var wrap = document.createDocumentFragment();
    var h = el("h2", null, DAYS[dayNum].name);
    if (isToday) h.appendChild(el("span", "pill", "Today"));
    wrap.appendChild(h);
    return wrap;
  }

  /* ---------- slot builders ---------- */
  function classSlot(c, status) {
    var course = COURSES[c.course];
    var box = el("div", "slot " + c.course + (status ? " " + status : ""));

    var time = el("div", "time", fmt(c.start));
    time.appendChild(document.createElement("br"));
    time.appendChild(document.createTextNode(fmt(c.end)));
    time.appendChild(el("small", null, "Be there by " + fmt(c.start - 15)));
    box.appendChild(time);

    var body = el("div");
    var what = el("div", "what", course.code);
    if (c.confirm) what.appendChild(badge("confirm", "warn"));
    if (status === "now") what.appendChild(badge("Now", "live"));
    if (status === "next") what.appendChild(badge("Next", "live"));
    body.appendChild(what);
    body.appendChild(el("div", "sub2", course.title));
    body.appendChild(el("div", "venue" + (c.venue ? "" : " tbc"), c.venue || "Venue to be confirmed"));
    box.appendChild(body);
    return box;
  }

  function studySlot(s, status) {
    var box = el("div", "slot " + s.kind + (status ? " " + status : ""));

    var time = el("div", "time", fmt(s.start));
    time.appendChild(document.createElement("br"));
    time.appendChild(document.createTextNode(fmt(s.end)));
    time.appendChild(el("small", null, duration(s.start, s.end)));
    box.appendChild(time);

    var body = el("div");
    var what = el("div", "what", s.title);
    if (s.optional) what.appendChild(badge("optional"));
    if (status === "now") what.appendChild(badge("Now", "live"));
    if (status === "next") what.appendChild(badge("Next", "live"));
    body.appendChild(what);
    body.appendChild(el("div", "sub2", s.how));
    box.appendChild(body);
    return box;
  }

  /* ---------- views ---------- */
  function renderToday() {
    var now = new Date();
    var dayNum = now.getDay();
    var mins = nowMinutes();

    var h = el("section", "day");
    var title = now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
    var h2 = el("h2", null, title);
    h2.appendChild(el("span", "pill", "Today"));
    h.appendChild(h2);
    h.appendChild(el("p", "ctx", DAYS[dayNum].note));

    var items = [];
    CLASSES.forEach(function (c) {
      if (c.day === dayNum) items.push({ type: "class", data: c, start: c.start, end: c.end });
    });
    STUDY.forEach(function (s) {
      if (s.day === dayNum) items.push({ type: "study", data: s, start: s.start, end: s.end });
    });
    items.sort(function (a, b) { return a.start - b.start; });

    if (!items.length) {
      h.appendChild(el("p", "empty", "Nothing scheduled today."));
    } else {
      var nextMarked = false;
      items.forEach(function (it) {
        var status = "";
        if (mins >= it.end) status = "done";
        else if (mins >= it.start) status = "now";
        else if (!nextMarked) { status = "next"; nextMarked = true; }
        h.appendChild(it.type === "class" ? classSlot(it.data, status) : studySlot(it.data, status));
      });
    }
    if (DAYS[dayNum].tip) h.appendChild(el("p", "tip", DAYS[dayNum].tip));
    view.appendChild(h);
  }

  function renderClasses() {
    var today = new Date().getDay();
    WEEK_ORDER.forEach(function (d) {
      var list = CLASSES.filter(function (c) { return c.day === d; })
        .sort(function (a, b) { return a.start - b.start; });
      if (!list.length) return;
      var sec = el("section", "day");
      sec.appendChild(dayHeader(d, d === today));
      list.forEach(function (c) { sec.appendChild(classSlot(c)); });
      view.appendChild(sec);
    });

    var key = el("section", "key");
    key.appendChild(el("h2", null, "My courses"));
    var ul = el("ul");
    var total = 0;
    Object.keys(COURSES).forEach(function (k) {
      var c = COURSES[k];
      total += c.credits;
      var li = el("li", k);
      li.appendChild(el("span", "dot"));
      li.appendChild(el("span", null, c.code + " " + c.title));
      li.appendChild(el("span", "cr", c.credits + " cr"));
      ul.appendChild(li);
    });
    key.appendChild(ul);
    key.appendChild(el("p", "note", "Total credits: " + total));
    key.appendChild(el("p", "note", "“Confirm” marks times copied as printed on the official sheet. Check them with your course rep. Venues marked TBC are not listed on the sheet."));
    view.appendChild(key);
  }

  function renderStudy() {
    var today = new Date().getDay();
    WEEK_ORDER.forEach(function (d) {
      var sec = el("section", "day");
      sec.appendChild(dayHeader(d, d === today));
      sec.appendChild(el("p", "ctx", DAYS[d].note));
      STUDY.filter(function (s) { return s.day === d; })
        .sort(function (a, b) { return a.start - b.start; })
        .forEach(function (s) { sec.appendChild(studySlot(s)); });
      if (DAYS[d].tip) sec.appendChild(el("p", "tip", DAYS[d].tip));
      view.appendChild(sec);
    });
  }

  function render() {
    view.textContent = "";
    if (currentTab === "classes") renderClasses();
    else if (currentTab === "study") renderStudy();
    else renderToday();
    tabs.forEach(function (b) {
      b.setAttribute("aria-selected", b.getAttribute("data-tab") === currentTab ? "true" : "false");
    });
  }

  function setTab(name) {
    currentTab = name;
    try { localStorage.setItem("tt-tab", name); } catch (e) { /* storage unavailable */ }
    render();
    window.scrollTo(0, 0);
  }

  tabs.forEach(function (b) {
    b.addEventListener("click", function () { setTab(b.getAttribute("data-tab")); });
  });

  try {
    var saved = localStorage.getItem("tt-tab");
    if (saved === "today" || saved === "classes" || saved === "study") currentTab = saved;
  } catch (e) { /* storage unavailable */ }

  render();

  /* Keep "Now / Next" fresh on the Today tab */
  setInterval(function () { if (currentTab === "today") render(); }, 60000);
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && currentTab === "today") render();
  });

  /* ---------- install button ---------- */
  var deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.hidden = false;
  });
  installBtn.addEventListener("click", function () {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function () {
      deferredPrompt = null;
      installBtn.hidden = true;
    });
  });
  window.addEventListener("appinstalled", function () { installBtn.hidden = true; });

  /* ---------- service worker ---------- */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("./sw.js").catch(function () { /* offline support unavailable */ });
    });
  }
})();
