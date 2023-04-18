let lastUrl = new URL(document.location.href);

const getVideoId = (url) => {
  return url.pathname.slice(8);
}

const injectVideoLink = (videoID) => {
  const videoLink = document.getElementById("normal-video-link");

  //Add video link if didn't exist yet
  if (!videoLink) {
    let a = document.createElement("a");
    a.innerHTML = "Watch as a normal video";
    a.href = `https://www.youtube.com/watch?v=${videoID}`;
    a.id = "normal-video-link";
    a.style.cssText = `position: absolute; right: 0.5em; bottom: 5em; font-size: 1.5em;
                      width: 4em; color: black; font-family: "Roboto","Arial",sans-serif`;
    document.body.appendChild(a);
    log(`added video link: ${a.href}`);
    return;
  }

  //Update video link otherwise
  videoLink.href = `https://www.youtube.com/watch?v=${videoID}`;
  log(`updated video link: ${videoLink.href}`);
}

const removeVideoLink = () => {
  const videoLink = document.getElementById("normal-video-link");
  if (videoLink) {
    videoLink.remove();
  }
}

const log = (message) => {
  console.log(`[Rewind Youtube Shorts]: ${message}`);
}

//Run for the first time
if (location.href.includes("/shorts/")) {
  const videoID = getVideoId(lastUrl);
  injectVideoLink(videoID);
}

new MutationObserver(() => {
  let url = new URL(document.location.href);
  
  //Return early if URL didn't change
  if (url.href == lastUrl.href) {
    return;
  }

  //Handle video link injection
  if (url.pathname.includes("/shorts/")) {
    lastUrl = url;
    const videoID = getVideoId(url);
    log(`new videoID: ${videoID}`);
    injectVideoLink(videoID);
    return;
  }

  //Handle video link removal
  removeVideoLink();
}).observe(document, { subtree: true, childList: true });