# Module 1: Vibecoding Fundamentals - Practical Implementation

## Learning Objectives
- Set up a basic vibecoding environment
- Create your first audiovisual interaction
- Understand the relationship between audio and visual elements
- Begin developing your personal aesthetic vocabulary

## Prerequisites
- Basic JavaScript knowledge
- Familiarity with HTML/CSS
- Access to a modern web browser
- Text editor or IDE

## Step 1: Environment Setup

### Create Project Directory
```bash
mkdir vibecoding-workshop
cd vibecoding-workshop
npm init -y
```

### Install Essential Dependencies
```bash
npm install --save-dev vite
npm install three
```

### Basic HTML Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vibecoding Workshop</title>
</head>
<body>
    <div id="container">
        <canvas id="audio-visualizer"></canvas>
    </div>
    <div id="controls">
        <button id="start-btn">Start Audio</button>
        <input type="range" id="frequency-slider" min="20" max="20000" value="440">
        <span id="freq-display">440 Hz</span>
    </div>
    <script type="module" src="main.js"></script>
</body>
</html>
```

## Step 2: Basic Audio System

### Web Audio API Foundation
```javascript
// main.js
class AudioSystem {
    constructor() {
        this.audioContext = null;
        this.analyser = null;
        this.isInitialized = false;
    }

    async initialize() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create analyser node for visualization
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 256;
            
            this.isInitialized = true;
            console.log('Audio system initialized successfully');
        } catch (error) {
            console.error('Error initializing audio system:', error);
        }
    }

    async startAudio() {
        if (!this.isInitialized) {
            await this.initialize();
        }
        
        if (this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }
    }
}

// Initialize audio system
const audioSystem = new AudioSystem();
```

## Step 3: Basic Visual System

### Three.js Integration
```javascript
// Add to main.js
import * as THREE from 'three';

class VisualSystem {
    constructor(canvasId) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: document.getElementById(canvasId),
            antialias: true 
        });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.setupScene();
    }

    setupScene() {
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
        
        // Add basic geometry
        this.geometry = new THREE.IcosahedronGeometry(1, 0);
        this.material = new THREE.MeshPhongMaterial({ 
            color: 0x00ff00,
            wireframe: true 
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
        
        this.camera.position.z = 5;
    }

    update() {
        // Rotate mesh
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize visual system
const visualSystem = new VisualSystem('audio-visualizer');
```

## Step 4: Audio-Visual Connection

### Linking Audio Data to Visual Properties
```javascript
// Add to main.js
class AudioVisualConnector {
    constructor(audioSystem, visualSystem) {
        this.audioSystem = audioSystem;
        this.visualSystem = visualSystem;
        this.audioDataArray = new Uint8Array(128); // Half of fftSize
        this.isPlaying = false;
    }

    connect() {
        // Create an oscillator to demonstrate connection
        this.oscillator = this.audioSystem.audioContext.createOscillator();
        this.gainNode = this.audioSystem.audioContext.createGain();
        
        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.audioSystem.analyser);
        this.audioSystem.analyser.connect(this.audioSystem.audioContext.destination);
        
        this.oscillator.type = 'sine';
        this.oscillator.frequency.value = 440;
        this.gainNode.gain.value = 0.1;
    }

    updateVisuals() {
        if (!this.audioSystem.analyser) return;
        
        // Get frequency data
        this.audioSystem.analyser.getByteFrequencyData(this.audioDataArray);
        
        // Calculate average amplitude
        let sum = 0;
        for (let i = 0; i < this.audioDataArray.length; i++) {
            sum += this.audioDataArray[i];
        }
        const avgAmplitude = sum / this.audioDataArray.length;
        
        // Map audio data to visual properties
        const scale = 0.5 + (avgAmplitude / 256) * 2;
        this.visualSystem.mesh.scale.set(scale, scale, scale);
        
        // Color changes based on frequency distribution
        const lowFreq = this.audioDataArray[0];
        const midFreq = this.audioDataArray[Math.floor(this.audioDataArray.length / 2)];
        const highFreq = this.audioDataArray[this.audioDataArray.length - 1];
        
        const r = Math.min(255, lowFreq);
        const g = Math.min(255, midFreq);
        const b = Math.min(255, highFreq);
        
        this.visualSystem.material.color.setRGB(r/255, g/255, b/255);
    }

    start() {
        if (!this.isPlaying) {
            this.oscillator.start();
            this.isPlaying = true;
        }
    }

    stop() {
        if (this.isPlaying) {
            this.oscillator.stop();
            this.isPlaying = false;
        }
    }
}

// Initialize connector
const connector = new AudioVisualConnector(audioSystem, visualSystem);
```

## Step 5: User Interface Controls

### Adding Interactive Elements
```javascript
// Add to main.js after connector initialization
function setupControls() {
    const startBtn = document.getElementById('start-btn');
    const freqSlider = document.getElementById('frequency-slider');
    const freqDisplay = document.getElementById('freq-display');

    startBtn.addEventListener('click', async () => {
        await audioSystem.startAudio();
        connector.connect();
        connector.start();
        startBtn.textContent = 'Stop Audio';
        startBtn.onclick = () => {
            connector.stop();
            startBtn.textContent = 'Start Audio';
            startBtn.onclick = setupControls; // Reset to original functionality
        };
    });

    freqSlider.addEventListener('input', (e) => {
        const freq = parseInt(e.target.value);
        freqDisplay.textContent = `${freq} Hz`;
        
        if (connector.oscillator && connector.isPlaying) {
            connector.oscillator.frequency.value = freq;
        }
    });
}

setupControls();
```

## Step 6: Animation Loop

### Bringing It All Together
```javascript
// Add to main.js
function animate() {
    requestAnimationFrame(animate);
    
    // Update visual system
    visualSystem.update();
    
    // Update audio-visual connections
    if (connector.isPlaying) {
        connector.updateVisuals();
    }
    
    // Render the scene
    visualSystem.render();
}

// Start animation loop
animate();

// Handle window resize
window.addEventListener('resize', () => {
    visualSystem.camera.aspect = window.innerWidth / window.innerHeight;
    visualSystem.camera.updateProjectionMatrix();
    visualSystem.renderer.setSize(window.innerWidth, window.innerHeight);
});
```

## Step 7: Ethical Considerations Exercise

### Mindful Interaction Design
As you build your first vibecoding project, consider these ethical questions:

1. **Attention**: How does your creation affect the user's focus and attention span?
2. **Retention**: Are you designing for addictive behavior or meaningful engagement?
3. **Wellbeing**: Does your project enhance or detract from the user's mental health?
4. **Accessibility**: Can users with different abilities engage with your creation?

### Reflection Prompt
Write a brief reflection on how your first audiovisual creation makes you feel. Consider:
- Does it feel overwhelming or calming?
- How long did you spend interacting with it?
- What emotions did it evoke?
- How might you modify it to be more ethically designed?

## Next Steps
- Experiment with different audio sources (microphone input, audio files)
- Try different visual geometries and materials
- Explore color theory in relation to audio frequencies
- Investigate how different audio waveforms affect the visual output

## Homework
Create a simple modification to the basic example:
1. Change the visual geometry to something different
2. Add a new audio property control (like waveform type or volume)
3. Document your changes and reflect on the aesthetic choices you made