# Module 4: Advanced Applications & Design Patterns in Vibecoding

## Introduction
This module explores advanced vibecoding applications and design patterns that leverage the full potential of Web Audio API, Three.js, and modern frontend frameworks while maintaining ethical principles and human-centered design.

## Advanced Audio Techniques

### Dynamic Audio Graph Construction
```javascript
class DynamicAudioGraph {
    constructor(context) {
        this.context = context;
        this.nodes = new Map();
        this.connections = [];
    }

    createNode(type, options = {}) {
        let node;
        switch (type) {
            case 'oscillator':
                node = this.context.createOscillator();
                node.type = options.waveform || 'sine';
                node.frequency.value = options.frequency || 440;
                break;
            case 'gain':
                node = this.context.createGain();
                node.gain.value = options.gain || 1.0;
                break;
            case 'filter':
                node = this.context.createBiquadFilter();
                node.type = options.filterType || 'lowpass';
                node.frequency.value = options.frequency || 350;
                node.Q.value = options.Q || 1.0;
                break;
            case 'delay':
                node = this.context.createDelay();
                node.delayTime.value = options.time || 0.5;
                break;
            case 'convolver':
                node = this.context.createConvolver();
                break;
            default:
                throw new Error(`Unknown node type: ${type}`);
        }

        const nodeId = this.generateNodeId(type);
        this.nodes.set(nodeId, node);
        return nodeId;
    }

    connect(fromNodeId, toNodeId) {
        const fromNode = this.nodes.get(fromNodeId);
        const toNode = this.nodes.get(toNodeId);
        
        if (!fromNode || !toNode) {
            throw new Error('Invalid node IDs');
        }
        
        fromNode.connect(toNode);
        this.connections.push({ from: fromNodeId, to: toNodeId });
    }

    generateNodeId(type) {
        return `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    removeNode(nodeId) {
        const node = this.nodes.get(nodeId);
        if (node) {
            node.disconnect();
            this.nodes.delete(nodeId);
        }
        
        // Remove associated connections
        this.connections = this.connections.filter(conn => 
            conn.from !== nodeId && conn.to !== nodeId
        );
    }

    // Advanced feature: Audio graph serialization
    serialize() {
        const serializedNodes = {};
        for (let [id, node] of this.nodes) {
            serializedNodes[id] = {
                type: this.getNodeType(node),
                params: this.getNodeParameters(node)
            };
        }

        return {
            nodes: serializedNodes,
            connections: this.connections
        };
    }

    getNodeType(node) {
        if (node instanceof OscillatorNode) return 'oscillator';
        if (node instanceof GainNode) return 'gain';
        if (node instanceof BiquadFilterNode) return 'filter';
        if (node instanceof DelayNode) return 'delay';
        if (node instanceof ConvolverNode) return 'convolver';
        return 'unknown';
    }

    getNodeParameters(node) {
        const params = {};
        
        // Extract common parameters based on node type
        if (node instanceof OscillatorNode) {
            params.frequency = node.frequency.value;
            params.type = node.type;
        } else if (node instanceof GainNode) {
            params.gain = node.gain.value;
        } else if (node instanceof BiquadFilterNode) {
            params.frequency = node.frequency.value;
            params.Q = node.Q.value;
            params.type = node.type;
        } else if (node instanceof DelayNode) {
            params.delayTime = node.delayTime.value;
        }
        
        return params;
    }
}

// Usage example
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const graph = new DynamicAudioGraph(audioContext);

// Create a complex audio graph
const osc1 = graph.createNode('oscillator', { frequency: 220, waveform: 'sawtooth' });
const filter1 = graph.createNode('filter', { frequency: 1000, Q: 5 });
const delay1 = graph.createNode('delay', { time: 0.2 });
const gain1 = graph.createNode('gain', { gain: 0.5 });

graph.connect(osc1, filter1);
graph.connect(filter1, delay1);
graph.connect(delay1, gain1);
graph.connect(gain1, audioContext.destination);

// Start the oscillator
graph.nodes.get(osc1).start();
```

### Real-time Audio Analysis and Synthesis
```javascript
class RealTimeAnalyzer {
    constructor(audioContext) {
        this.audioContext = audioContext;
        this.analyzer = audioContext.createAnalyser();
        this.analyzer.fftSize = 2048;
        
        // Create multiple analyzers for different frequency ranges
        this.lowAnalyzer = audioContext.createAnalyser();
        this.midAnalyzer = audioContext.createAnalyser();
        this.highAnalyzer = audioContext.createAnalyser();
        
        // Configure analyzers for different ranges
        this.lowAnalyzer.fftSize = 512; // Lower resolution for low frequencies
        this.midAnalyzer.fftSize = 1024;
        this.highAnalyzer.fftSize = 2048;
        
        // Buffer data arrays
        this.lowBuffer = new Uint8Array(this.lowAnalyzer.frequencyBinCount);
        this.midBuffer = new Uint8Array(this.midAnalyzer.frequencyBinCount);
        this.highBuffer = new Uint8Array(this.highAnalyzer.frequencyBinCount);
    }

    connectToSource(source) {
        // Split the audio signal to different analyzers
        source.connect(this.analyzer);
        source.connect(this.lowAnalyzer);
        source.connect(this.midAnalyzer);
        source.connect(this.highAnalyzer);
    }

    analyze() {
        // Get frequency data for different ranges
        this.analyzer.getByteFrequencyData(this.lowBuffer);
        this.analyzer.getByteFrequencyData(this.midBuffer);
        this.analyzer.getByteFrequencyData(this.highBuffer);

        // Calculate energy in different frequency bands
        const lowEnergy = this.calculateBandEnergy(this.lowBuffer, 0, 10);
        const midEnergy = this.calculateBandEnergy(this.midBuffer, 10, 50);
        const highEnergy = this.calculateBandEnergy(this.highBuffer, 50, 100);

        // Calculate spectral centroid (brightness)
        const spectralCentroid = this.calculateSpectralCentroid(this.lowBuffer);

        return {
            lowEnergy,
            midEnergy,
            highEnergy,
            spectralCentroid,
            totalRMS: this.calculateRMS(this.lowBuffer)
        };
    }

    calculateBandEnergy(buffer, start, end) {
        let sum = 0;
        for (let i = start; i < Math.min(end, buffer.length); i++) {
            sum += buffer[i] * buffer[i];
        }
        return Math.sqrt(sum / (end - start));
    }

    calculateSpectralCentroid(buffer) {
        let weightedSum = 0;
        let sum = 0;
        
        for (let i = 0; i < buffer.length; i++) {
            weightedSum += i * buffer[i];
            sum += buffer[i];
        }
        
        return sum > 0 ? weightedSum / sum : 0;
    }

    calculateRMS(buffer) {
        let sum = 0;
        for (let i = 0; i < buffer.length; i++) {
            sum += buffer[i] * buffer[i];
        }
        return Math.sqrt(sum / buffer.length);
    }
}
```

## Advanced Three.js Techniques

### Procedural Audio-Reactive Geometry
```javascript
class AudioReactiveGeometry {
    constructor(scene, audioAnalyzer) {
        this.scene = scene;
        this.analyzer = audioAnalyzer;
        this.meshes = [];
        this.geometryType = 'particles';
    }

    createParticles(count = 1000) {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
            
            colors[i * 3] = Math.random();
            colors[i * 3 + 1] = Math.random();
            colors[i * 3 + 2] = Math.random();
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        this.particleSystem = new THREE.Points(geometry, material);
        this.scene.add(this.particleSystem);
        
        return this.particleSystem;
    }

    createWaveMesh(width = 20, height = 20) {
        const geometry = new THREE.PlaneGeometry(width, height, width * 2, height * 2);
        const material = new THREE.MeshPhongMaterial({
            color: 0x00ff00,
            wireframe: true,
            side: THREE.DoubleSide
        });

        this.waveMesh = new THREE.Mesh(geometry, material);
        this.waveMesh.rotation.x = -Math.PI / 2; // Make it horizontal
        this.scene.add(this.waveMesh);
        
        return this.waveMesh;
    }

    createSpectrumBars(count = 64) {
        this.spectrumBars = [];
        
        for (let i = 0; i < count; i++) {
            const barGeometry = new THREE.BoxGeometry(0.1, 1, 0.1);
            const barMaterial = new THREE.MeshPhongMaterial({ 
                color: new THREE.Color(i / count, 0.5, 1 - i / count) 
            });
            
            const bar = new THREE.Mesh(barGeometry, barMaterial);
            bar.position.x = (i - count / 2) * 0.2;
            bar.position.y = 0.5;
            
            this.scene.add(bar);
            this.spectrumBars.push(bar);
        }
        
        return this.spectrumBars;
    }

    update() {
        if (!this.analyzer) return;
        
        const analysis = this.analyzer.analyze();
        
        // Update particles based on audio
        if (this.particleSystem) {
            const positions = this.particleSystem.geometry.attributes.position.array;
            const colors = this.particleSystem.geometry.attributes.color.array;
            
            for (let i = 0; i < positions.length; i += 3) {
                // Move particles based on audio energy
                const energyFactor = (analysis.lowEnergy + analysis.midEnergy + analysis.highEnergy) / 300;
                
                positions[i] += (Math.random() - 0.5) * energyFactor * 0.1;
                positions[i + 1] += (Math.random() - 0.5) * energyFactor * 0.1;
                positions[i + 2] += (Math.random() - 0.5) * energyFactor * 0.1;
                
                // Update colors based on spectral centroid
                const hue = (analysis.spectralCentroid / 100) % 1;
                const color = new THREE.Color().setHSL(hue, 0.8, 0.5);
                
                colors[i] = color.r;
                colors[i + 1] = color.g;
                colors[i + 2] = color.b;
            }
            
            this.particleSystem.geometry.attributes.position.needsUpdate = true;
            this.particleSystem.geometry.attributes.color.needsUpdate = true;
            
            // Scale overall particle system based on RMS
            this.particleSystem.scale.setScalar(1 + analysis.totalRMS / 100);
        }

        // Update wave mesh based on audio
        if (this.waveMesh) {
            const positions = this.waveMesh.geometry.attributes.position.array;
            const time = Date.now() * 0.001;
            
            for (let i = 0; i < positions.length; i += 3) {
                const x = positions[i];
                const z = positions[i + 2];
                
                // Create wave pattern influenced by audio
                const wave1 = Math.sin(x * 2 + time) * analysis.lowEnergy / 50;
                const wave2 = Math.cos(z * 2 + time * 1.3) * analysis.midEnergy / 50;
                const wave3 = Math.sin((x + z) * 1.5 + time * 0.7) * analysis.highEnergy / 50;
                
                positions[i + 1] = (wave1 + wave2 + wave3) * 2;
            }
            
            this.waveMesh.geometry.attributes.position.needsUpdate = true;
        }

        // Update spectrum bars
        if (this.spectrumBars && this.analyzer.lowBuffer) {
            for (let i = 0; i < this.spectrumBars.length; i++) {
                const barIndex = Math.floor(i * this.analyzer.lowBuffer.length / this.spectrumBars.length);
                const amplitude = this.analyzer.lowBuffer[barIndex] || 0;
                
                this.spectrumBars[i].scale.y = Math.max(0.1, amplitude / 50);
                this.spectrumBars[i].material.color.setHSL(amplitude / 255, 0.8, 0.5);
            }
        }
    }
}
```

## Integration Patterns

### Modular Architecture for Vibecoding Apps
```javascript
// Base module interface
class VibecodingModule {
    constructor(name, dependencies = []) {
        this.name = name;
        this.dependencies = dependencies;
        this.initialized = false;
        this.active = false;
    }

    async initialize() {
        // Check dependencies
        for (const dep of this.dependencies) {
            if (!dep.initialized) {
                await dep.initialize();
            }
        }
        
        this.initialized = true;
        console.log(`${this.name} module initialized`);
    }

    activate() {
        if (!this.initialized) {
            throw new Error(`${this.name} not initialized`);
        }
        this.active = true;
        console.log(`${this.name} module activated`);
    }

    deactivate() {
        this.active = false;
        console.log(`${this.name} module deactivated`);
    }

    update(deltaTime) {
        if (!this.active) return;
        // Override in subclasses
    }

    destroy() {
        this.deactivate();
        this.initialized = false;
    }
}

// Audio module
class AudioModule extends VibecodingModule {
    constructor(audioContext) {
        super('Audio', []);
        this.audioContext = audioContext;
        this.graph = new DynamicAudioGraph(audioContext);
        this.analyzer = new RealTimeAnalyzer(audioContext);
    }

    async initialize() {
        await super.initialize();
        // Additional audio-specific initialization
        console.log('Audio module ready');
    }

    update(deltaTime) {
        if (!this.active) return;
        // Audio processing logic
    }
}

// Visual module
class VisualModule extends VibecodingModule {
    constructor(scene, camera, renderer) {
        super('Visual', []);
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.reactiveGeometry = new AudioReactiveGeometry(scene, null);
    }

    async initialize() {
        await super.initialize();
        // Additional visual-specific initialization
        console.log('Visual module ready');
    }

    update(deltaTime) {
        if (!this.active) return;
        this.reactiveGeometry.update();
        this.renderer.render(this.scene, this.camera);
    }
}

// Main vibecoding application
class VibecodingApp {
    constructor() {
        this.modules = new Map();
        this.isRunning = false;
        this.lastUpdateTime = 0;
    }

    registerModule(module) {
        this.modules.set(module.name, module);
    }

    async initialize() {
        // Initialize all modules
        for (const module of this.modules.values()) {
            await module.initialize();
        }
    }

    async start() {
        await this.initialize();
        
        // Activate essential modules
        for (const module of this.modules.values()) {
            if (module.name === 'Audio' || module.name === 'Visual') {
                module.activate();
            }
        }
        
        this.isRunning = true;
        this.lastUpdateTime = performance.now();
        this.gameLoop();
    }

    gameLoop() {
        if (!this.isRunning) return;

        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = currentTime;

        // Update all active modules
        for (const module of this.modules.values()) {
            module.update(deltaTime);
        }

        requestAnimationFrame(() => this.gameLoop());
    }

    stop() {
        this.isRunning = false;
    }
}
```

## Design Patterns for Vibecoding

### Observer Pattern for Audio Events
```javascript
class AudioEventManager {
    constructor() {
        this.observers = new Map();
    }

    subscribe(eventType, callback) {
        if (!this.observers.has(eventType)) {
            this.observers.set(eventType, []);
        }
        this.observers.get(eventType).push(callback);
    }

    unsubscribe(eventType, callback) {
        if (this.observers.has(eventType)) {
            const callbacks = this.observers.get(eventType);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }

    emit(eventType, data) {
        if (this.observers.has(eventType)) {
            this.observers.get(eventType).forEach(callback => {
                callback(data);
            });
        }
    }
}

// Usage in vibecoding context
const eventManager = new AudioEventManager();

// Subscribe to beat detection events
eventManager.subscribe('beat', (beatData) => {
    // Trigger visual effects on beat
    triggerBeatVisualization(beatData);
});

// Subscribe to pitch detection events
eventManager.subscribe('pitch', (pitchData) => {
    // Adjust visual colors based on pitch
    adjustColorsByPitch(pitchData);
});
```

### Factory Pattern for Audiovisual Effects
```javascript
class EffectFactory {
    static createEffect(type, params) {
        switch (type) {
            case 'pulsing':
                return new PulsingEffect(params);
            case 'spectral':
                return new SpectralEffect(params);
            case 'waveform':
                return new WaveformEffect(params);
            case 'particle':
                return new ParticleEffect(params);
            default:
                throw new Error(`Unknown effect type: ${type}`);
        }
    }
}

class BaseEffect {
    constructor(params = {}) {
        this.enabled = params.enabled !== false;
        this.intensity = params.intensity || 1.0;
        this.speed = params.speed || 1.0;
    }

    update(audioAnalysis, deltaTime) {
        if (!this.enabled) return;
        // Override in subclasses
    }

    setIntensity(level) {
        this.intensity = Math.max(0, Math.min(1, level));
    }

    enable() {
        this.enabled = true;
    }

    disable() {
        this.enabled = false;
    }
}

class PulsingEffect extends BaseEffect {
    constructor(params = {}) {
        super(params);
        this.baseScale = params.baseScale || 1.0;
        this.pulseMultiplier = params.pulseMultiplier || 2.0;
    }

    update(audioAnalysis, deltaTime) {
        if (!this.enabled) return;
        
        const pulseAmount = (audioAnalysis.totalRMS / 255) * this.intensity * this.pulseMultiplier;
        const scale = this.baseScale + pulseAmount;
        
        // Apply scaling to target objects
        this.applyScale(scale);
    }

    applyScale(scale) {
        // This would be implemented based on your specific 3D objects
        console.log(`Scaling to: ${scale}`);
    }
}

class SpectralEffect extends BaseEffect {
    constructor(params = {}) {
        super(params);
        this.frequencyBands = params.frequencyBands || 8;
    }

    update(audioAnalysis, deltaTime) {
        if (!this.enabled) return;
        
        // Divide spectrum into bands and apply different effects
        const bandSize = Math.floor(audioAnalysis.buffer.length / this.frequencyBands);
        
        for (let i = 0; i < this.frequencyBands; i++) {
            const start = i * bandSize;
            const end = Math.min(start + bandSize, audioAnalysis.buffer.length);
            
            let bandEnergy = 0;
            for (let j = start; j < end; j++) {
                bandEnergy += audioAnalysis.buffer[j];
            }
            bandEnergy /= bandSize;
            
            this.applyBandEffect(i, bandEnergy, deltaTime);
        }
    }

    applyBandEffect(bandIndex, energy, deltaTime) {
        // Apply specific effect for this frequency band
        console.log(`Band ${bandIndex}: Energy ${energy}`);
    }
}
```

## Ethical Implementation Patterns

### Adaptive Intensity Controller
```javascript
class AdaptiveIntensityController {
    constructor() {
        this.currentIntensity = 0.5; // 0.0 to 1.0
        this.userComfortThreshold = 0.7; // Above this feels uncomfortable
        this.intensityHistory = [];
        this.comfortFeedback = [];
    }

    update(audioAnalysis, userState) {
        // Calculate current intensity based on audio and user comfort
        const audioIntensity = this.calculateAudioIntensity(audioAnalysis);
        const userComfort = this.estimateUserComfort(userState);
        
        // Adjust intensity based on user comfort
        if (userComfort < this.userComfortThreshold) {
            this.currentIntensity *= 0.95; // Reduce intensity
        } else {
            // Gradually increase intensity if comfortable
            this.currentIntensity = Math.min(1.0, this.currentIntensity + 0.001);
        }
        
        // Ensure intensity stays within bounds
        this.currentIntensity = Math.max(0.1, Math.min(1.0, this.currentIntensity));
        
        // Record for historical analysis
        this.intensityHistory.push({
            timestamp: Date.now(),
            intensity: this.currentIntensity,
            audioIntensity,
            userComfort
        });
        
        return this.currentIntensity;
    }

    calculateAudioIntensity(audioAnalysis) {
        // Combine different audio metrics to determine intensity
        const rmsFactor = audioAnalysis.totalRMS / 255;
        const spectralFactor = Math.min(1, audioAnalysis.spectralCentroid / 50);
        const energyFactor = (audioAnalysis.lowEnergy + audioAnalysis.midEnergy + audioAnalysis.highEnergy) / 300;
        
        return (rmsFactor + spectralFactor + energyFactor) / 3;
    }

    estimateUserComfort(userState) {
        // Estimate comfort based on various factors
        // This could use biometric data, interaction patterns, etc.
        const baseComfort = 0.7;
        
        // Adjust based on session duration
        const sessionTime = userState.sessionDuration || 0;
        if (sessionTime > 1800) { // More than 30 minutes
            return baseComfort * 0.8; // Reduce comfort expectation
        }
        
        // Adjust based on user feedback
        if (this.comfortFeedback.length > 0) {
            const recentFeedback = this.comfortFeedback.slice(-5);
            const avgFeedback = recentFeedback.reduce((sum, f) => sum + f, 0) / recentFeedback.length;
            return avgFeedback;
        }
        
        return baseComfort;
    }

    recordComfortFeedback(feedback) {
        // User indicates comfort level (0.0 to 1.0)
        this.comfortFeedback.push(feedback);
        
        // Keep only recent feedback
        if (this.comfortFeedback.length > 20) {
            this.comfortFeedback.shift();
        }
    }

    getRecommendedIntensity() {
        return {
            current: this.currentIntensity,
            min: 0.1,
            max: 1.0,
            comfortZone: this.userComfortThreshold
        };
    }
}
```

### Attention Management System
```javascript
class AttentionManagementSystem {
    constructor() {
        this.attentionLevels = {
            focused: 0,
            distracted: 0,
            fatigued: 0
        };
        this.sessionStartTime = Date.now();
        this.lastBreakSuggestion = 0;
        this.breakInterval = 25 * 60 * 1000; // 25 minutes
        this.breakDuration = 5 * 60 * 1000;  // 5 minutes
        this.inBreakMode = false;
    }

    update(userInteractionData) {
        // Analyze user interaction patterns to estimate attention state
        const attentionMetrics = this.analyzeAttention(userInteractionData);
        
        // Update attention level scores
        this.attentionLevels.focused = this.smoothValue(
            this.attentionLevels.focused, 
            attentionMetrics.focusScore, 
            0.1
        );
        
        this.attentionLevels.distracted = this.smoothValue(
            this.attentionLevels.distracted, 
            attentionMetrics.distractionScore, 
            0.1
        );
        
        this.attentionLevels.fatigued = this.smoothValue(
            this.attentionLevels.fatigued, 
            attentionMetrics.fatigueScore, 
            0.05
        );
        
        // Check if break should be suggested
        this.checkBreakTiming();
        
        return {
            ...this.attentionLevels,
            shouldSuggestBreak: this.shouldSuggestBreak(),
            inBreakMode: this.inBreakMode
        };
    }

    analyzeAttention(interactionData) {
        const now = Date.now();
        const sessionDuration = now - this.sessionStartTime;
        
        // Calculate focus score based on interaction patterns
        let focusScore = 0.5; // Base score
        
        if (interactionData.mouseMovement && interactionData.mouseMovement.length > 10) {
            // Less random mouse movement indicates focus
            const movementRate = this.calculateMovementRate(interactionData.mouseMovement);
            focusScore += (0.5 - movementRate) * 0.3;
        }
        
        if (interactionData.keyPresses) {
            // Consistent typing rhythm indicates focus
            const typingRhythm = this.calculateTypingRhythm(interactionData.keyPresses);
            focusScore += typingRhythm * 0.2;
        }
        
        // Fatigue increases with session length
        const fatigueScore = Math.min(1.0, (sessionDuration / (60 * 60 * 1000)) * 0.5); // 50% fatigue per hour
        
        // Distraction score based on window unfocus events
        const distractionScore = interactionData.unfocusEvents ? 
            Math.min(1.0, interactionData.unfocusEvents.length / 10) : 0;
        
        return {
            focusScore: Math.max(0, Math.min(1, focusScore)),
            distractionScore: Math.max(0, Math.min(1, distractionScore)),
            fatigueScore: Math.max(0, Math.min(1, fatigueScore))
        };
    }

    calculateMovementRate(mouseMovements) {
        // Calculate how random the mouse movement is
        // Less random = more focused
        let totalDistance = 0;
        for (let i = 1; i < mouseMovements.length; i++) {
            const dx = mouseMovements[i].x - mouseMovements[i-1].x;
            const dy = mouseMovements[i].y - mouseMovements[i-1].y;
            totalDistance += Math.sqrt(dx*dx + dy*dy);
        }
        return totalDistance / mouseMovements.length;
    }

    calculateTypingRhythm(keyPresses) {
        // Calculate consistency of typing rhythm
        if (keyPresses.length < 2) return 0;
        
        const intervals = [];
        for (let i = 1; i < keyPresses.length; i++) {
            intervals.push(keyPresses[i].time - keyPresses[i-1].time);
        }
        
        if (intervals.length === 0) return 0;
        
        const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        const variance = intervals.reduce((sum, interval) => 
            sum + Math.pow(interval - avgInterval, 2), 0) / intervals.length;
        
        // More consistent rhythm = higher focus
        return Math.max(0, 1 - (variance / 1000)); // Normalize
    }

    smoothValue(current, target, factor) {
        return current * (1 - factor) + target * factor;
    }

    checkBreakTiming() {
        const now = Date.now();
        const timeSinceLastBreak = now - this.lastBreakSuggestion;
        
        if (timeSinceLastBreak > this.breakInterval && !this.inBreakMode) {
            this.suggestBreak();
        }
    }

    suggestBreak() {
        this.inBreakMode = true;
        this.lastBreakSuggestion = Date.now();
        
        // Notify the system to suggest a break
        console.log('Suggesting break - session has been active for too long');
        
        // End break mode after duration
        setTimeout(() => {
            this.inBreakMode = false;
        }, this.breakDuration);
    }

    shouldSuggestBreak() {
        return this.attentionLevels.fatigued > 0.7 || 
               this.attentionLevels.distracted > 0.8;
    }
}
```

## Advanced Integration Example: Complete Vibecoding Application

```javascript
// Putting it all together
class CompleteVibecodingApp {
    constructor() {
        // Core systems
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        
        // Modules
        this.audioModule = new AudioModule(this.audioContext);
        this.visualModule = new VisualModule(this.scene, this.camera, this.renderer);
        
        // Controllers
        this.intensityController = new AdaptiveIntensityController();
        this.attentionManager = new AttentionManagementSystem();
        
        // Effects system
        this.effects = [];
        this.eventManager = new AudioEventManager();
        
        this.isRunning = false;
        this.lastUpdateTime = 0;
    }

    async initialize() {
        // Set up renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        
        // Initialize modules
        await this.audioModule.initialize();
        await this.visualModule.initialize();
        
        // Create reactive geometry
        this.reactiveGeometry = new AudioReactiveGeometry(
            this.scene, 
            this.audioModule.analyzer
        );
        
        // Create initial geometry
        this.reactiveGeometry.createParticles(2000);
        this.reactiveGeometry.createSpectrumBars(32);
        
        // Position camera
        this.camera.position.z = 10;
        
        // Create some effects
        this.effects.push(EffectFactory.createEffect('pulsing', { intensity: 0.5 }));
        this.effects.push(EffectFactory.createEffect('spectral', { frequencyBands: 16 }));
        
        // Listen for audio events
        this.eventManager.subscribe('beat', (data) => {
            // Trigger effects on beats
            this.handleBeatEvent(data);
        });
        
        // Set up user interaction monitoring
        this.setupUserMonitoring();
    }

    setupUserMonitoring() {
        // Monitor user interactions for attention management
        let mouseMovements = [];
        let keyPresses = [];
        let unfocusEvents = [];
        
        document.addEventListener('mousemove', (e) => {
            mouseMovements.push({ x: e.clientX, y: e.clientY, time: Date.now() });
            if (mouseMovements.length > 20) mouseMovements.shift();
        });
        
        document.addEventListener('keydown', (e) => {
            keyPresses.push({ key: e.key, time: Date.now() });
            if (keyPresses.length > 50) keyPresses.shift();
        });
        
        window.addEventListener('blur', () => {
            unfocusEvents.push({ time: Date.now() });
            if (unfocusEvents.length > 10) unfocusEvents.shift();
        });
        
        this.userInteractionData = {
            mouseMovement: mouseMovements,
            keyPresses: keyPresses,
            unfocusEvents: unfocusEvents
        };
    }

    handleBeatEvent(beatData) {
        // Visual flash on beat
        this.scene.background = new THREE.Color(
            Math.random(), 
            Math.random(), 
            Math.random()
        );
        
        // Temporarily increase effect intensity
        this.effects.forEach(effect => {
            if (effect instanceof PulsingEffect) {
                effect.setIntensity(Math.min(1.0, effect.intensity + 0.3));
            }
        });
        
        // Reset after a moment
        setTimeout(() => {
            this.effects.forEach(effect => {
                if (effect instanceof PulsingEffect) {
                    effect.setIntensity(0.5); // Back to normal
                }
            });
        }, 100);
    }

    async start() {
        await this.initialize();
        
        this.audioModule.activate();
        this.visualModule.activate();
        
        this.isRunning = true;
        this.lastUpdateTime = performance.now();
        this.gameLoop();
    }

    gameLoop() {
        if (!this.isRunning) return;

        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = currentTime;

        // Update audio analysis
        const audioAnalysis = this.audioModule.analyzer.analyze();
        
        // Update attention management
        const attentionState = this.attentionManager.update(this.userInteractionData);
        
        // Update intensity controller
        const intensity = this.intensityController.update(audioAnalysis, {
            sessionDuration: currentTime - this.sessionStartTime
        });
        
        // Apply intensity to effects
        this.effects.forEach(effect => {
            effect.setIntensity(intensity);
            effect.update(audioAnalysis, deltaTime);
        });
        
        // Update reactive geometry
        this.reactiveGeometry.update();
        
        // Render scene
        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(() => this.gameLoop());
    }

    stop() {
        this.isRunning = false;
    }
}

// Initialize and start the application
const app = new CompleteVibecodingApp();
app.start().catch(console.error);

// Handle window resize
window.addEventListener('resize', () => {
    app.camera.aspect = window.innerWidth / window.innerHeight;
    app.camera.updateProjectionMatrix();
    app.renderer.setSize(window.innerWidth, window.innerHeight);
});
```

## Best Practices & Future Considerations

### Performance Optimization
- Use WebGL instancing for large numbers of similar objects
- Implement level-of-detail (LOD) systems
- Optimize shader complexity
- Use efficient data structures for audio processing

### Accessibility Considerations
- Provide visual alternatives for audio content
- Support keyboard navigation
- Allow customization of intensity levels
- Include pause/resume functionality

### Scalability Patterns
- Implement modular architecture for easy feature addition
- Use event-driven architecture for loose coupling
- Design for progressive enhancement
- Plan for multi-user scenarios

This module provides advanced techniques and design patterns for building sophisticated vibecoding applications that are both technically impressive and ethically responsible. The examples demonstrate how to combine audio and visual elements in complex ways while maintaining user wellbeing and attention health.