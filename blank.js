
function toRGB(hex) {
  if (hex.startsWith('#')) {
    hex = hex.substring(1);
  }
  if (hex.length !== 6) return [];
  r = parseInt(hex.substring(0,2),16);
  g = parseInt(hex.substring(2,4),16);
  b = parseInt(hex.substring(4,6),16);
  return [r,g,b];
}

var REGEX = /rgb\(\s*([0-9]{1,3}),\s*([0-9]{1,3}),\s*([0-9]{1,3})/

function parseRGB(string) {
  var match = string.match(REGEX);  
  if (!match) return [];
  // take the 3 matching elements & convert to int
  return match.slice(1,4).map(function(item) {
    return parseInt(item,10);
  });
}

function backgroundToRGB(backgroundColor) {
  if (backgroundColor.includes("#")) {
    return toRGB(backgroundColor);
  }
  return parseRGB(backgroundColor);
}

function pulsate(elem) {
  var start = backgroundToRGB(elem.style.backgroundColor);
  var colors = colorWheel(start, 40);
  if (!elem.interval) {
    elem.interval = setInterval(function() {
      colors.cycle();
      elem.style.backgroundColor = colors.toString();
    }, 200);
  } else {
    clearInterval(elem.interval);
    elem.interval = undefined;
  }
}

function bindEvents() {
  // find all the events
  var events = document.querySelectorAll('div[class*="NlL62b"]')

  for (var i = 0; i<events.length; i++) {
    var elem = events[i];
    if (elem.style.backgroundColor.length > 0) {
      pulsate(elem);
    } else if (elem.firstChild.style.backgroundColor.length > 0) {
      pulsate(elem.firstChild);
    } 
  }
}

/*
	#pink pearl
	#d81b60 || rgb(216, 27, 96)
	#f3bbcf || rgb(243, 187, 207)

	# yellow bug
	#E4C441 || rgb(228, 196, 65)
	#f7edc6 || rgb(247, 237, 198)

	# grey lady
	#616161 || rgb(97, 97, 97)
	#d0d0d0 || rgb(208,208,208)
*/
