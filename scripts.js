var playbackUrl;
var streamRtmp;

function getStreamRtmp() {
  fetch('https://owb9o3o0ll.execute-api.us-east-1.amazonaws.com/prod/drone').then((response) => {
	  return response.json();
  }).then((data) => {
    playbackUrl = JSON.parse(data.body).playbackUrl
    streamRtmp = JSON.parse(data.body).streamRtmp

    document.getElementById('rtmp').style.display = 'block'
    document.getElementById('rtmpInstructions').style.display = 'block'
    document.getElementById('startStreamInstructions').style.display = 'block'
    document.getElementById('startStream').style.display = 'block'
    document.getElementById('getStreamRtmp').style.display = 'none'

    document.getElementById('rtmp').innerText = streamRtmp
  }).catch((error) => {
  	console.log(error);
  });
}

function startStream() {
  if (IVSPlayer.isPlayerSupported) {
    document.getElementById('video-player').style.display = 'block'
    const player = IVSPlayer.create();
    player.attachHTMLVideoElement(document.getElementById('video-player'));
    player.load(playbackUrl);
    player.play();

    document.getElementById('stopStream').style.display = 'block'
    document.getElementById('startStream').style.display = 'none'
    document.getElementById('rtmp').style.display = 'none'
    document.getElementById('rtmpInstructions').style.display = 'none'
    document.getElementById('startStreamInstructions').style.display = 'none'
    document.getElementById('startStream').style.display = 'none'
  } else {
    alert('Browser not supported')
  }
}

function stopStream() {
  fetch('https://owb9o3o0ll.execute-api.us-east-1.amazonaws.com/prod/drone', {
    method: 'DELETE'
  }).then((response) => {
	  return response.json();
  }).then((data) => {
    console.log(data)
    if(data.errorMessage) {
      alert('Cant stop stream because it has not started yet')
    } else {
      document.getElementById('getStreamRtmp').style.display = 'block'
      document.getElementById('stopStream').style.display = 'none'
      document.getElementById('video-player').style.display = 'none'
      document.getElementById('video-player').removeAttribute('src');
      document.getElementById('video-player').muted = true;
      document.getElementById('video-player').pause();
    }
  }).catch((error) => {
  	console.log(error);
  });
}