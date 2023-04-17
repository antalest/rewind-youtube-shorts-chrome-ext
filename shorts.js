let videoID;
let lastUrl = new URL(document.location.href);

const updateVideoId = (url) => {
  videoID = url.pathname.slice(8);
}

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

const removeVideoLink = () => {
  const videoLink = document.getElementById("normal-video-link");
  if (videoLink) {
    videoLink.remove();
  }
}

//Run for the first time
if (location.href.includes("/shorts/")) {
  updateVideoId(lastUrl);
  injectVideoLink();
}

new MutationObserver(() => {
  let url = new URL(document.location.href);
  //Return early if URL didn't change
  if (url.href == lastUrl.href) {
    return;
  }

  //Handle video link injection or removal
  if (url.pathname.includes("/shorts/")) {
    lastUrl = url;
    updateVideoId(url);
    console.log(`videoID: ${videoID}`);
    injectVideoLink();
  } else {
    removeVideoLink();
  }
}).observe(document, { subtree: true, childList: true });