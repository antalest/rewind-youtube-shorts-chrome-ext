console.log('youtube shorts loaded');

//Get video ID
const url = new URL(document.location.href);
const videoID = url.pathname.slice(8);

//Create and inject a link to watch as a normal video
let a = document.createElement("a");
a.innerHTML = "Watch as a normal video";
a.href = `https://www.youtube.com/watch?v=${videoID}`;
a.style.cssText = `position: absolute; right: 1em; bottom: 10em; font-size: 1.5em`
document.body.appendChild(a);
