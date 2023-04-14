let prevVideoID;
let videoID;

const injectVideoLink = () => {
  const videoLink = document.getElementById("normal-video-link");
  if (!videoLink) {
    let a = document.createElement("a");
    a.innerHTML = "Watch as a normal video";
    a.href = `https://www.youtube.com/watch?v=${videoID}`;
    a.id = "normal-video-link";
    a.style.cssText = `position: absolute; right: 0.5em; bottom: 5em; font-size: 1.5em;
                      width: 4em; color: black; font-family: "Roboto","Arial",sans-serif`
    document.body.appendChild(a);
  } else {
    videoLink.href = `https://www.youtube.com/watch?v=${videoID}`;
  }
}

const updateVideoId = (url) => {
  videoID = url.pathname.slice(8);
}

let lastUrl = new URL(document.location.href);

new MutationObserver(() => {
  let url = new URL(document.location.href);
  if (url.href != lastUrl.href) {
    lastUrl = url;
    updateVideoId(url);
    console.log(`videoID: ${videoID}`);
    injectVideoLink();
  }
}).observe(document, { subtree: true, childList: true });

updateVideoId(lastUrl);
injectVideoLink();