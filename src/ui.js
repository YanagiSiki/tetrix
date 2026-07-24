import { TETROMINOES } from './constants.js';

export class UIManager {
  constructor() {
    this.scoreValEl = document.getElementById('score-val');
    this.highScoreValEl = document.getElementById('high-score-val');
    this.levelValEl = document.getElementById('level-val');
    this.linesValEl = document.getElementById('lines-val');

    this.nextCanvas = document.getElementById('next-canvas');
    this.nextCtx = this.nextCanvas.getContext('2d');

    this.holdCanvas = document.getElementById('hold-canvas');
    this.holdCtx = this.holdCanvas.getContext('2d');

    this.modalOverlay = document.getElementById('modal-overlay');
    this.modalTitle = document.getElementById('modal-title');
    this.modalMsg = document.querySelector('.modal-msg');
    this.finalStatsEl = document.getElementById('final-stats');
    this.finalScoreEl = document.getElementById('final-score');
    this.finalLinesEl = document.getElementById('final-lines');

    this.btnPrimary = document.getElementById('modal-primary-btn');
    this.btnRestart = document.getElementById('modal-restart-btn');

    this.debugOverlay = document.getElementById('debug-overlay');
    this.fpsValEl = document.getElementById('fps-val');
    this.debugStateEl = document.getElementById('debug-state');

    this.audioBtnText = document.querySelector('#btn-audio .btn-text');
  }

  updateStats(score, highScore, level, lines) {
    if (this.scoreValEl) this.scoreValEl.textContent = score.toLocaleString();
    if (this.highScoreValEl) this.highScoreValEl.textContent = highScore.toLocaleString();
    if (this.levelValEl) this.levelValEl.textContent = level;
    if (this.linesValEl) this.linesValEl.textContent = lines;
  }

  drawPiecePreview(canvasCtx, piece) {
    canvasCtx.clearRect(0, 0, 120, 120);
    if (!piece) return;

    const blocks = piece.blocks;
    const colorHex = '#' + piece.color.toString(16).padStart(6, '0');

    canvasCtx.fillStyle = colorHex;
    canvasCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    canvasCtx.lineWidth = 2;

    const blockSize = 20;
    const centerX = 60;
    const centerY = 60;

    blocks.forEach(([bx, by, bz]) => {
      const px = centerX + bx * blockSize - blockSize / 2;
      const py = centerY + bz * blockSize - blockSize / 2;

      canvasCtx.fillRect(px, py, blockSize - 2, blockSize - 2);
      canvasCtx.strokeRect(px, py, blockSize - 2, blockSize - 2);
    });
  }

  updateNextPiece(piece) {
    this.drawPiecePreview(this.nextCtx, piece);
  }

  updateHoldPiece(piece) {
    this.drawPiecePreview(this.holdCtx, piece);
  }

  showPauseModal(onResume, onRestart) {
    this.modalTitle.textContent = 'GAME PAUSED';
    this.modalMsg.textContent = 'Take a breather! Ready to resume?';
    this.finalStatsEl.classList.add('hidden');
    this.btnPrimary.textContent = 'RESUME';

    this.modalOverlay.classList.remove('hidden');

    this.btnPrimary.onclick = () => {
      this.modalOverlay.classList.add('hidden');
      if (onResume) onResume();
    };

    this.btnRestart.onclick = () => {
      this.modalOverlay.classList.add('hidden');
      if (onRestart) onRestart();
    };
  }

  showGameOverModal(score, lines, onRestart) {
    this.modalTitle.textContent = 'GAME OVER';
    this.modalMsg.textContent = 'The 3D Well is filled up!';
    this.finalScoreEl.textContent = score.toLocaleString();
    this.finalLinesEl.textContent = lines;
    this.finalStatsEl.classList.remove('hidden');
    this.btnPrimary.textContent = 'PLAY AGAIN';

    this.modalOverlay.classList.remove('hidden');

    this.btnPrimary.onclick = () => {
      this.modalOverlay.classList.add('hidden');
      if (onRestart) onRestart();
    };

    this.btnRestart.onclick = () => {
      this.modalOverlay.classList.add('hidden');
      if (onRestart) onRestart();
    };
  }

  updateAudioBtn(isMuted) {
    if (this.audioBtnText) {
      this.audioBtnText.textContent = isMuted ? 'SOUND: OFF' : 'SOUND: ON';
    }
  }

  toggleDebugHUD(visible, isWireframe) {
    if (visible) {
      this.debugOverlay.classList.remove('hidden');
      this.debugStateEl.textContent = isWireframe ? 'WIREFRAME' : 'ON';
    } else {
      this.debugOverlay.classList.add('hidden');
    }
  }

  updateFPS(fps) {
    if (this.fpsValEl) {
      this.fpsValEl.textContent = fps;
    }
  }
}
