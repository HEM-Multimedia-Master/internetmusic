//- global logics that will be used on each new module hp-X.js
function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  
  function createHUD() {
    const hudContainer = document.createElement("div");
    hudContainer.className = "hud";
    
    const hudLed = document.createElement("div");
    hudLed.className = "hud-led";
  
    const hudX = document.createElement("div");
    const hudY = document.createElement("div");
  
    hudContainer.appendChild(hudLed);
    hudContainer.appendChild(hudX);
    hudContainer.appendChild(hudY);
    document.body.appendChild(hudContainer);
  
    return { hudContainer, hudLed, hudX, hudY };
  }
  