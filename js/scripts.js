//###################################################################
// Author: ricocheting.com
// Version: v3.0
// Date: 2014-09-05
// Description: displays the amount of time until the "dateFuture" entered below.
$(document).ready(function() {
  var CDown = function() {
    this.state = 0; // if initialized
    this.counts = []; // array holding countdown date objects and id to print to {d:new Date(2013,11,18,18,54,36), id:"countbox1"}
    this.interval = null; // setInterval object
  }
  CDown.prototype = {
    init: function() {
      this.state = 1;
      var self = this;
      this.interval = window.setInterval(function() {
        self.tick();
      }, 1000);
    },
    add: function(date, id) {
      this.counts.push({
        d: date,
        id: id
      });
      this.tick();
      if (this.state == 0) this.init();
    },
    expire: function(idxs) {
      for (var x in idxs) {
        this.display(this.counts[idxs[x]], "Most!");
        this.counts.splice(idxs[x], 1);
      }
    },
    format: function(r) {
      var out = '';
      out += '<div class="time-wr day"><span>' + r.d + '</span><span class="time-unit">Nap</span></div>';
      out += '<div class="time-wr hour"><span>' + r.h + '</span><span class="time-unit">Óra</span></div>';
      out += '<div class="time-wr min"><span>' + r.m + '</span><span class="time-unit">Perc</span></div>';
      out += '<div class="time-wr sec"><span>' + r.s + '</span><span class="time-unit">Másodperc</span></div>';

      return out.substr(0, out.length - 2);
    },
    math: function(work) {
      var y = w = d = h = m = s = ms = 0;

      ms = ("" + ((work % 1000) + 1000)).substr(1, 3);
      work = Math.floor(work / 1000); //kill the "milliseconds" so just secs

      y = Math.floor(work / 31536000); //years (no leapyear support)
      w = Math.floor(work / 604800); //weeks
      d = Math.floor(work / 86400); //days
      work = work % 86400;

      h = Math.floor(work / 3600); //hours
      work = work % 3600;

      m = Math.floor(work / 60); //minutes
      work = work % 60;

      s = Math.floor(work); //seconds

      return {
        y: y,
        w: w,
        d: d,
        h: h,
        m: m,
        s: s,
        ms: ms
      };
    },
    tick: function() {
      var now = (new Date()).getTime(),
        expired = [],
        cnt = 0,
        amount = 0;

      if (this.counts)
        for (var idx = 0, n = this.counts.length; idx < n; ++idx) {
          cnt = this.counts[idx];
          amount = cnt.d.getTime() - now; //calc milliseconds between dates

          // if time is already past
          if (amount < 0) {
            expired.push(idx);
          }
          // date is still good
          else {
            this.display(cnt, this.format(this.math(amount)));


          }
        }

      // deal with any expired
      if (expired.length > 0) this.expire(expired);

      // if no active counts, stop updating
      if (this.counts.length == 0) window.clearTimeout(this.interval);

    },
    display: function(cnt, msg) {
      document.getElementById(cnt.id).innerHTML = msg;
    }
  };

  window.onload = function() {
    var cdown = new CDown();

    cdown.add(new Date(2016, 4, 26, 23, 59, 59), "countbox1");
  };

  function initialize() {
    var mapCanvas = document.getElementById('map');
    var location = new google.maps.LatLng(46.761595, 17.343054);
    var mapOptions = {
      center: location,
      zoom: 16,
      maxZoom: 17,
      scrollwheel: false,
      draggable: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,

    }
    var map = new google.maps.Map(mapCanvas, mapOptions);

    var infowindow = new google.maps.InfoWindow({
      content: '8313 Balatongyörök, Zsölleháti Dűlő 9.'
    });

    var marker = new google.maps.Marker({
      position: location,
      map: map,
      animation: google.maps.Animation.DROP,
      title: 'Osztálytalálkozó'
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  }

  var loaded = false;
  var isTop = $(document).scrollTop() <= 10;
  var header = $($('.site-header')[0]);

  if (isTop) {
    header.addClass('top');
  }

  $(document).scroll(function() {
    if (!loaded && $(document).scrollTop() > 140) {
      initialize();
      loaded = true;
    }
    if (isTop && $(document).scrollTop() > 10) {
      isTop = false;
      header.removeClass('top');
    } else if (!isTop && $(document).scrollTop() <= 10) {
      isTop = true;
      header.addClass('top');
    }

  });

  function shakeFlaskInRandomTime() {
    var randomTime = Math.random() * 10000;
    setTimeout(function() {
      header.addClass('hover');
      setTimeout(function() {
        header.removeClass('hover');
      }, 2000)
    }, randomTime)
  }

  shakeFlaskInRandomTime();

  setInterval(function() {
   shakeFlaskInRandomTime();
  }, 20000);

  $('#down').click(function() {
    var body = $("html, body");
    body.stop().animate({
      scrollTop: $('.map-header').offset().top - $('.site-header').height()
    }, '5000', 'swing');
  });

  google.maps.event.addDomListener(document, 'load', initialize);
});
