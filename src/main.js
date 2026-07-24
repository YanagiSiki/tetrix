import { Renderer3D } from './renderer.js';
import { GameEngine3D } from './engine.js';
import { SoundEngine } from './audio.js';
import { UIManager } from './ui.js';

class Application {
  constructor() {
    this.container = document.getElementById('canvas-container');
    this.renderer = new Renderer3D(this.container);
    this.engine = new GameEngine3D();
    this.audio = new SoundEngine();
    this.ui = new UIManager();

    this.lastTime = performance.now();
    this.frameCount = 0;
    this.fpsTimer = 0;

    this.init();
  }

  init() {
    // Setup Engine Callback for Layer Clear FX & Audio
    this.engine.onLayerClearCallback = (layerY) => {
      this.renderer.spawnLayerParticles(layerY, 0x00f0ff);
      this.audio.playClear();
    };

    // Keyboard Event Listener
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));

    // UI Button Event Listeners
    this.setupUIEvents();

    // Mobile Touch Events
    this.setupTouchEvents();

    // Global Developer Debug Interface
    this.setupDebugInterface();

    // Start Game
    this.engine.reset();
    this.ui.updateNextPiece(this.engine.nextPiece);
    this.ui.updateHoldPiece(this.engine.holdPiece);

    // Request Animation Frame Loop
    requestAnimationFrame((t) => this.loop(t));
  }

  setupUIEvents() {
    const btnAudio = document.getElementById('btn-audio');
    if (btnAudio) {
      btnAudio.onclick = () => {
        const isMuted = this.audio.toggleMute();
        this.ui.updateAudioBtn(isMuted);
      };
    }

    const btnCamera = document.getElementById('btn-camera');
    if (btnCamera) {
      btnCamera.onclick = () => this.renderer.resetCameraPosition();
    }

    const btnDebug = document.getElementById('btn-debug');
    if (btnDebug) {
      btnDebug.onclick = () => {
        const isWire = this.renderer.toggleWireframe();
        this.ui.toggleDebugHUD(true, isWire);
      };
    }

    const btnPause = document.getElementById('btn-pause');
    if (btnPause) {
      btnPause.onclick = () => this.togglePause();
    }
  }

  setupTouchEvents() {
    const bindTouch = (id, action) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('touchstart', (e) => {
          e.preventDefault();
          action();
        });
        el.addEventListener('click', () => action());
      }
    };

    bindTouch('touch-move-left', () => { if (this.engine.move(-1, 0)) this.audio.playMove(); });
    bindTouch('touch-move-right', () => { if (this.engine.move(1, 0)) this.audio.playMove(); });
    bindTouch('touch-move-up', () => { if (this.engine.move(0, -1)) this.audio.playMove(); });
    bindTouch('touch-move-down', () => { if (this.engine.move(0, 1)) this.audio.playMove(); });

    bindTouch('touch-rot-x', () => { if (this.engine.rotate('x')) this.audio.playRotate(); });
    bindTouch('touch-rot-y', () => { if (this.engine.rotate('y')) this.audio.playRotate(); });
    bindTouch('touch-rot-z', () => { if (this.engine.rotate('z')) this.audio.playRotate(); });

    bindTouch('touch-drop', () => {
      if (this.engine.hardDrop() > 0) {
        this.renderer.triggerHardDropFX();
        this.audio.playDrop();
      }
    });
  }

  handleKeyDown(e) {
    if (this.engine.isGameOver) return;

    // Prevent default scrolling for game keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
      e.preventDefault();
    }

    const key = e.key.toLowerCase();

    // Navigation & Movements
    if (key === 'a' || e.code === 'ArrowLeft') {
      if (this.engine.move(-1, 0)) this.audio.playMove();
    } else if (key === 'd' && !e.ctrlKey) {
      if (this.engine.move(1, 0)) this.audio.playMove();
    } else if (key === 'w' || e.code === 'ArrowUp') {
      if (this.engine.move(0, -1)) this.audio.playMove();
    } else if (key === 's' || e.code === 'ArrowDown') {
      if (this.engine.move(0, 1)) this.audio.playMove();
    } else if (key === 'q') {
      if (this.engine.move(-1, 0)) this.audio.playMove();
    } else if (key === 'e') {
      if (this.engine.move(1, 0)) this.audio.playMove();
    }
    // Rotations (J, K, L)
    else if (key === 'j') {
      if (this.engine.rotate('x')) this.audio.playRotate();
    } else if (key === 'k') {
      if (this.engine.rotate('y')) this.audio.playRotate();
    } else if (key === 'l') {
      if (this.engine.rotate('z')) this.audio.playRotate();
    }
    // Hard Drop
    else if (e.code === 'Space') {
      if (this.engine.hardDrop() > 0) {
        this.renderer.triggerHardDropFX();
        this.audio.playDrop();
      }
    }
    // Hold Piece
    else if (key === 'c' || e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      if (this.engine.doHold()) {
        this.audio.playRotate();
        this.ui.updateHoldPiece(this.engine.holdPiece);
      }
    }
    // Pause Game
    else if (key === 'p' || e.code === 'Escape') {
      this.togglePause();
    }
    // Reset Camera
    else if (key === 'r') {
      this.renderer.resetCameraPosition();
    }
    // Toggle Sound Mute
    else if (key === 'm') {
      const isMuted = this.audio.toggleMute();
      this.ui.updateAudioBtn(isMuted);
    }
  }

  togglePause() {
    this.engine.isPaused = !this.engine.isPaused;
    if (this.engine.isPaused) {
      this.ui.showPauseModal(
        () => { this.engine.isPaused = false; },
        () => { this.restartGame(); }
      );
    }
  }

  restartGame() {
    this.engine.reset();
    this.ui.updateNextPiece(this.engine.nextPiece);
    this.ui.updateHoldPiece(this.engine.holdPiece);
  }

  setupDebugInterface() {
    window.TETRIS_DEBUG = {
      toggleWireframe: () => {
        const isWire = this.renderer.toggleWireframe();
        this.ui.toggleDebugHUD(true, isWire);
        console.log(`[TETRIS_DEBUG] Wireframe mode: ${isWire}`);
        return isWire;
      },
      addScore: (pts = 1000) => {
        this.engine.score += pts;
        this.engine.saveHighScore();
        console.log(`[TETRIS_DEBUG] Added ${pts} points. Current score: ${this.engine.score}`);
      },
      getState: () => ({
        score: this.engine.score,
        level: this.engine.level,
        lines: this.engine.linesCleared,
        isGameOver: this.engine.isGameOver,
        isPaused: this.engine.isPaused,
        activePiece: this.engine.activePiece
      })
    };
  }

  loop(currentTime) {
    const deltaMs = currentTime - this.lastTime;
    const deltaSec = deltaMs / 1000;
    this.lastTime = currentTime;

    // FPS Counter
    this.frameCount++;
    this.fpsTimer += deltaMs;
    if (this.fpsTimer >= 1000) {
      this.ui.updateFPS(this.frameCount);
      this.frameCount = 0;
      this.fpsTimer = 0;
    }

    if (!this.engine.isPaused && !this.engine.isGameOver) {
      this.engine.update(deltaMs);

      // Render Active Piece & Ghost Projection in 3D Scene
      this.renderer.renderActivePiece(this.engine.activePiece);
      this.renderer.renderGhostPiece(this.engine.activePiece, this.engine.getGhostY());

      // Update Locked Grid Meshes
      this.renderer.updateLockedGrid(this.engine.grid);

      // Update UI Stats & Previews
      this.ui.updateStats(
        this.engine.score,
        this.engine.highScore,
        this.engine.level,
        this.engine.linesCleared
      );
      this.ui.updateNextPiece(this.engine.nextPiece);
      this.ui.updateHoldPiece(this.engine.holdPiece);
    } else if (this.engine.isGameOver) {
      this.audio.playGameOver();
      this.ui.showGameOverModal(
        this.engine.score,
        this.engine.linesCleared,
        () => this.restartGame()
      );
    }

    // 3D Scene Render Loop
    this.renderer.render(deltaSec);
    requestAnimationFrame((t) => this.loop(t));
  }
}

// Instantiate application on DOM ready
window.addEventListener('DOMContentLoaded', () => {
  new Application();
});
