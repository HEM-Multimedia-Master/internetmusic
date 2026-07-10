
 INSTRUCTIONS
 INSTALLATION
 
 make sure you have osc and ws libs installed:
 
 ```bash
 bun add osc ws
 ```
 
 
 USAGE
 1. on first terminal Start the OSC bridge server:
 ```bash
 TD_HOST=127.0.0.1 TD_PORT=9000 WS_PORT=57121 bun osc-bridge.js
 ```
 2. on second terminal run the dev server
 ```bash
 bun run main.js
 ```
 ON VERCEL
 3. deploy
 ```bash
 vercel --prod
 ```
 4. set enviromental variables


 VITE_WS_HOST= localipaddress(get it with `ipconfig getifaddr en0`)
 VIT_WS_PORT=57121
 ```bash
 vercel env add VITE_WS_HOST production
 vercel env add VITE_WS_PORT production // "57121"
 ```