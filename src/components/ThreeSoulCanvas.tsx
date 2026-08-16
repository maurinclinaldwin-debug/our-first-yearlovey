import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { CharacterEmotion } from './SoulCharacter22';

interface ThreeSoulCanvasProps {
  emotion: CharacterEmotion;
  isHovered: boolean;
  showHalo: boolean;
  isBlinking: boolean;
  interactionTrigger: number;
}

// Helper to draw crisp, procedural cute soul face textures onto offscreen canvases
function createFaceTexture(type: CharacterEmotion | 'blinking'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, 512, 512);

  const drawSafeRoundRect = (x: number, y: number, w: number, h: number, r: number | number[]) => {
    if (typeof (ctx as any).roundRect === 'function') {
      (ctx as any).roundRect(x, y, w, h, r);
    } else {
      ctx.rect(x, y, w, h);
    }
  };

  // 1. Soft Rosy Cheeks Blush with dreamy soft gradients and gentle highlights
  const drawBlush = (
    leftX = 145,
    rightX = 367,
    y = 280,
    r = 50,
    opacity = 0.65,
    style: 'soft' | 'hatch' | 'heart' | 'angry' | 'cry' | 'laugh' = 'soft'
  ) => {
    ctx.save();

    // Soft, charming color palette
    let c1 = `rgba(251, 113, 133, ${opacity * 0.95})`;
    let c2 = `rgba(253, 164, 175, ${opacity * 0.55})`;
    let c3 = `rgba(254, 205, 211, ${opacity * 0.2})`;

    if (style === 'angry') {
      c1 = `rgba(248, 113, 113, ${opacity * 0.9})`;
      c2 = `rgba(252, 165, 165, ${opacity * 0.45})`;
      c3 = `rgba(254, 202, 202, 0)`;
    } else if (style === 'heart') {
      c1 = `rgba(244, 63, 94, ${opacity * 1.05})`;
      c2 = `rgba(251, 113, 133, ${opacity * 0.6})`;
      c3 = `rgba(253, 164, 175, ${opacity * 0.25})`;
    } else if (style === 'cry') {
      c1 = `rgba(251, 113, 133, ${opacity * 0.85})`;
      c2 = `rgba(186, 230, 253, ${opacity * 0.4})`;
      c3 = `rgba(224, 242, 254, 0)`;
    }

    // Left Blush Radial Gradient
    let grad = ctx.createRadialGradient(leftX, y, 2, leftX, y, r);
    grad.addColorStop(0, c1);
    grad.addColorStop(0.5, c2);
    grad.addColorStop(0.8, c3);
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(leftX, y, r, 0, Math.PI * 2);
    ctx.fill();

    // Right Blush Radial Gradient
    grad = ctx.createRadialGradient(rightX, y, 2, rightX, y, r);
    grad.addColorStop(0, c1);
    grad.addColorStop(0.5, c2);
    grad.addColorStop(0.8, c3);
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(rightX, y, r, 0, Math.PI * 2);
    ctx.fill();

    // Subtle Cute Nose Glow for extra charm
    const noseGrad = ctx.createRadialGradient(256, y - 8, 2, 256, y - 8, 30);
    noseGrad.addColorStop(0, `rgba(251, 113, 133, ${opacity * 0.45})`);
    noseGrad.addColorStop(0.7, `rgba(253, 164, 175, ${opacity * 0.15})`);
    noseGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = noseGrad;
    ctx.beginPath();
    ctx.arc(256, y - 8, 30, 0, Math.PI * 2);
    ctx.fill();

    // Cute Soft Diagonal Chibi Hatches
    if (style === 'hatch' || style === 'heart' || style === 'laugh') {
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.55)';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';

      [-12, 0, 12].forEach((offset) => {
        ctx.beginPath();
        ctx.moveTo(leftX + offset - 6, y + 8);
        ctx.lineTo(leftX + offset + 6, y - 8);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(rightX + offset - 6, y + 8);
        ctx.lineTo(rightX + offset + 6, y - 8);
        ctx.stroke();
      });
    }

    // Mini floating hearts for inlove / heart
    if (style === 'heart') {
      const drawMiniHeart = (hx: number, hy: number, size = 11) => {
        ctx.fillStyle = 'rgba(244, 63, 94, 0.85)';
        ctx.beginPath();
        ctx.moveTo(hx, hy);
        ctx.bezierCurveTo(hx - size / 2, hy - size / 2, hx - size, hy + size / 3, hx, hy + size);
        ctx.bezierCurveTo(hx + size, hy + size / 3, hx + size / 2, hy - size / 2, hx, hy);
        ctx.fill();
      };
      drawMiniHeart(leftX - 18, y - 18, 12);
      drawMiniHeart(rightX + 18, y - 18, 12);
    }

    ctx.restore();
  };

  // 2. Soft, Expressive Eyebrows
  const drawEyebrows = (
    type: 'happy' | 'sad' | 'angry' | 'thinking' | 'serious' | 'laugh'
  ) => {
    ctx.save();
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 4.5;
    ctx.lineCap = 'round';

    const lx = 185;
    const rx = 327;

    if (type === 'happy' || type === 'laugh') {
      // Gentle cheerful curved brows
      ctx.beginPath();
      ctx.arc(lx, 172, 26, Math.PI * 1.18, Math.PI * 1.82);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(rx, 172, 26, Math.PI * 1.18, Math.PI * 1.82);
      ctx.stroke();
    } else if (type === 'sad') {
      // Soft gentle drooping brows
      ctx.beginPath();
      ctx.moveTo(lx - 22, 172);
      ctx.quadraticCurveTo(lx, 160, lx + 22, 154);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(rx + 22, 172);
      ctx.quadraticCurveTo(rx, 160, rx - 22, 154);
      ctx.stroke();
    } else if (type === 'angry') {
      // Cute pouty furrowed brows
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(lx - 22, 154);
      ctx.lineTo(lx + 20, 168);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(rx + 22, 154);
      ctx.lineTo(rx - 20, 168);
      ctx.stroke();
    } else if (type === 'thinking') {
      // One curious raised brow
      ctx.beginPath();
      ctx.arc(lx, 162, 24, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(rx - 18, 168);
      ctx.lineTo(rx + 20, 166);
      ctx.stroke();
    } else if (type === 'serious') {
      ctx.beginPath();
      ctx.moveTo(lx - 20, 168);
      ctx.lineTo(lx + 20, 166);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(rx - 20, 166);
      ctx.lineTo(rx + 20, 168);
      ctx.stroke();
    }
    ctx.restore();
  };

  // 3. Cute, Glassy, Big Soul Eyes
  const drawEye = (
    x: number,
    y: number,
    isRight = false,
    style:
      | 'standard'
      | 'heart'
      | 'teary'
      | 'sad'
      | 'angry'
      | 'laugh_arc'
      | 'wink_arc'
      | 'gentle_arc' = 'standard'
  ) => {
    ctx.save();
    ctx.translate(x, y);

    if (style === 'laugh_arc') {
      // Joyful Smiling Crescent Eyes (^^ / ><)
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 6.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(0, 6, 26, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();

      // Soft cute eyelash tick
      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.moveTo(isRight ? 18 : -18, 0);
      ctx.lineTo(isRight ? 30 : -30, -6);
      ctx.stroke();

      // Star sparkle near eye
      ctx.fillStyle = '#fde047';
      const sx = isRight ? 38 : -38;
      const sy = -12;
      ctx.beginPath();
      ctx.arc(sx, sy, 4.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      return;
    }

    if (style === 'wink_arc' || style === 'gentle_arc') {
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 6.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(0, 6, 26, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();

      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.moveTo(isRight ? 18 : -18, 0);
      ctx.lineTo(isRight ? 30 : -30, -6);
      ctx.stroke();

      ctx.restore();
      return;
    }

    const eyeW = 34;
    const eyeH = 46;

    // Dark Outer Eye Contour with Smooth Gradient
    const outerGrad = ctx.createRadialGradient(0, eyeH * 0.1, 2, 0, eyeH * 0.1, eyeW);
    outerGrad.addColorStop(0, '#1e293b');
    outerGrad.addColorStop(0.85, '#0f172a');
    outerGrad.addColorStop(1, '#090d16');

    ctx.fillStyle = outerGrad;
    ctx.beginPath();
    ctx.ellipse(0, 0, eyeW, eyeH, 0, 0, Math.PI * 2);
    ctx.fill();

    // Vibrant Luminous Iris with Multi-tone Depth
    const irisGrad = ctx.createRadialGradient(0, eyeH * 0.25, 4, 0, eyeH * 0.25, eyeW);
    if (style === 'heart') {
      irisGrad.addColorStop(0, '#fb7185');
      irisGrad.addColorStop(0.5, '#f43f5e');
      irisGrad.addColorStop(0.85, '#be123c');
      irisGrad.addColorStop(1, '#881337');
    } else if (style === 'teary') {
      irisGrad.addColorStop(0, '#a5f3fc');
      irisGrad.addColorStop(0.5, '#38bdf8');
      irisGrad.addColorStop(0.85, '#0284c7');
      irisGrad.addColorStop(1, '#0c4a6e');
    } else if (style === 'angry') {
      irisGrad.addColorStop(0, '#fde047');
      irisGrad.addColorStop(0.55, '#f97316');
      irisGrad.addColorStop(0.85, '#dc2626');
      irisGrad.addColorStop(1, '#7f1d1d');
    } else if (style === 'sad') {
      irisGrad.addColorStop(0, '#7dd3fc');
      irisGrad.addColorStop(0.6, '#2563eb');
      irisGrad.addColorStop(1, '#1e3a8a');
    } else {
      // Signature Soul Cyan/Azure Glow
      irisGrad.addColorStop(0, '#7dd3fc');
      irisGrad.addColorStop(0.45, '#38bdf8');
      irisGrad.addColorStop(0.8, '#0284c7');
      irisGrad.addColorStop(1, '#075985');
    }

    ctx.fillStyle = irisGrad;
    ctx.beginPath();
    ctx.ellipse(0, eyeH * 0.18, eyeW * 0.88, eyeH * 0.62, 0, 0, Math.PI * 2);
    ctx.fill();

    // Bottom Ambient Bounce Light Crescent
    ctx.fillStyle = style === 'heart' ? 'rgba(254, 205, 211, 0.45)' : 'rgba(186, 230, 253, 0.5)';
    ctx.beginPath();
    ctx.ellipse(0, eyeH * 0.55, eyeW * 0.6, 7, 0, 0, Math.PI);
    ctx.fill();

    // Radiant Heart Pupil for 'heart' style
    if (style === 'heart') {
      ctx.save();
      ctx.fillStyle = '#fff1f2';
      ctx.shadowColor = '#f43f5e';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      const hx = 0;
      const hy = -3;
      const hs = 15;
      ctx.moveTo(hx, hy);
      ctx.bezierCurveTo(hx - hs / 2, hy - hs / 2, hx - hs, hy + hs / 3, hx, hy + hs);
      ctx.bezierCurveTo(hx + hs, hy + hs / 3, hx + hs / 2, hy - hs / 2, hx, hy);
      ctx.fill();
      ctx.restore();
    }

    // Top Glossy Bubble Specular (Cute Sparkle!)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(-9, -eyeH * 0.32, 11, 14, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Secondary Soft Specular Glint
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.beginPath();
    ctx.ellipse(11, eyeH * 0.25, 6, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cute Twinkle Star / Diamond in Iris
    ctx.fillStyle = style === 'heart' ? '#ffe4e6' : '#fef08a';
    ctx.beginPath();
    ctx.arc(2, -eyeH * 0.05, 3.2, 0, Math.PI * 2);
    ctx.fill();

    // Watery glistening bottom pool for teary/sad
    if (style === 'teary' || style === 'sad') {
      ctx.fillStyle = 'rgba(224, 242, 254, 0.9)';
      ctx.beginPath();
      ctx.ellipse(0, eyeH * 0.72, eyeW * 0.7, 7, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Soft Eyelid Line on Top
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 4.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(0, -eyeH * 0.25, eyeW * 1.02, Math.PI * 1.14, Math.PI * 1.86);
    ctx.stroke();

    // Sweet subtle upper lash flick
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(isRight ? eyeW * 0.75 : -eyeW * 0.75, -eyeH * 0.42);
    ctx.lineTo(isRight ? eyeW * 1.15 : -eyeW * 1.15, -eyeH * 0.58);
    ctx.stroke();

    ctx.restore();
  };

  // 4. Cascading Anime Tears for 'cry' and 'emotional'
  const drawTears = (isHeavy = true) => {
    ctx.save();
    const leftEyeX = 185;
    const rightEyeX = 327;

    const drawStream = (startX: number, endX: number, startY = 250, length = 100) => {
      const grad = ctx.createLinearGradient(startX, startY, endX, startY + length);
      grad.addColorStop(0, 'rgba(56, 189, 248, 0.75)');
      grad.addColorStop(0.6, 'rgba(186, 230, 253, 0.9)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = isHeavy ? 7 : 5;
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(
        startX + (startX < 256 ? -10 : 10),
        startY + length * 0.5,
        endX,
        startY + length
      );
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(endX, startY + length, isHeavy ? 7 : 5, 0, Math.PI * 2);
      ctx.fill();
    };

    drawStream(leftEyeX - 8, leftEyeX - 16, 250, isHeavy ? 95 : 65);
    drawStream(rightEyeX + 8, rightEyeX + 16, 250, isHeavy ? 95 : 65);

    if (isHeavy) {
      drawStream(leftEyeX + 10, leftEyeX + 5, 255, 55);
      drawStream(rightEyeX - 10, rightEyeX - 5, 255, 55);
    }

    ctx.restore();
  };

  // 5. Cute Anger Mark (💢)
  const drawAngerMark = (x = 380, y = 145, size = 28) => {
    ctx.save();
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const hs = size / 2;
    ctx.beginPath();
    ctx.arc(x, y - hs, hs * 0.7, 0.15 * Math.PI, 0.85 * Math.PI, true);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y + hs, hs * 0.7, 1.15 * Math.PI, 1.85 * Math.PI, true);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x - hs, y, hs * 0.7, 1.65 * Math.PI, 0.35 * Math.PI, true);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x + hs, y, hs * 0.7, 0.65 * Math.PI, 1.35 * Math.PI, true);
    ctx.stroke();

    ctx.restore();
  };

  // 6. Cute, Soft Pixar-Style Mouths (NO HARD LIPS or HARSH OUTLINES)
  const drawMouth = (
    style:
      | 'smile'
      | 'laugh'
      | 'cry'
      | 'inlove'
      | 'sad'
      | 'angry'
      | 'open'
      | 'cat'
      | 'o'
      | 'line'
      | 'gentle'
  ) => {
    ctx.save();
    // Soft slate-indigo line color instead of harsh black
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 4.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const cx = 256;
    const cy = 296;

    if (style === 'laugh') {
      // Cute Joyful Open Mouth with Soft Tooth and Baby-Pink Tongue
      ctx.beginPath();
      ctx.arc(cx, cy - 10, 36, 0.1 * Math.PI, 0.9 * Math.PI);
      ctx.closePath();

      // Soft gradient mouth cavity
      const mouthGrad = ctx.createLinearGradient(cx, cy - 10, cx, cy + 28);
      mouthGrad.addColorStop(0, '#f43f5e');
      mouthGrad.addColorStop(1, '#be123c');
      ctx.fillStyle = mouthGrad;
      ctx.fill();
      ctx.stroke();

      // Soft Rounded White Top Tooth Peek (Pixar 22 style!)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      drawSafeRoundRect(cx - 16, cy - 10, 32, 10, [0, 0, 4, 4]);
      ctx.fill();

      // Sweet Pink Tongue
      ctx.fillStyle = '#fbcfe8';
      ctx.beginPath();
      ctx.arc(cx, cy + 18, 18, 0, Math.PI, true);
      ctx.fill();
    } else if (style === 'cry') {
      // Soft trembling pout
      ctx.beginPath();
      ctx.arc(cx, cy + 22, 22, Math.PI * 1.2, Math.PI * 1.8);
      ctx.stroke();

      // Soft quivering underlip wave
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.7)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - 12, cy + 28);
      ctx.quadraticCurveTo(cx, cy + 32, cx + 12, cy + 28);
      ctx.stroke();
    } else if (style === 'inlove') {
      // Adorable Soft Cat Smile (:3) with Little Pink Tongue Peek
      ctx.beginPath();
      ctx.arc(cx - 12, cy - 6, 14, 0.12 * Math.PI, 0.88 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx + 12, cy - 6, 14, 0.12 * Math.PI, 0.88 * Math.PI);
      ctx.stroke();

      // Tiny cute tongue
      ctx.fillStyle = '#fda4af';
      ctx.beginPath();
      ctx.arc(cx, cy + 5, 6, 0, Math.PI);
      ctx.fill();

      // Soft cheek dimples
      ctx.fillStyle = 'rgba(244, 63, 94, 0.5)';
      ctx.beginPath();
      ctx.arc(cx - 28, cy - 3, 2.5, 0, Math.PI * 2);
      ctx.arc(cx + 28, cy - 3, 2.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (style === 'sad') {
      // Soft downturned pout
      ctx.beginPath();
      ctx.arc(cx, cy + 20, 22, Math.PI * 1.2, Math.PI * 1.8);
      ctx.stroke();
    } else if (style === 'angry') {
      // Cute puffed chibi pout (>3<)
      ctx.beginPath();
      ctx.moveTo(cx - 18, cy + 4);
      ctx.lineTo(cx - 6, cy - 2);
      ctx.lineTo(cx + 6, cy + 4);
      ctx.lineTo(cx + 18, cy - 2);
      ctx.stroke();
    } else if (style === 'open') {
      // Sweet open excited bean smile
      ctx.beginPath();
      ctx.arc(cx, cy - 8, 28, 0.12 * Math.PI, 0.88 * Math.PI);
      ctx.closePath();
      ctx.fillStyle = '#fb7185';
      ctx.fill();
      ctx.stroke();

      // Tiny white tooth
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      drawSafeRoundRect(cx - 12, cy - 8, 24, 7, [0, 0, 3, 3]);
      ctx.fill();

      // Cute tongue
      ctx.fillStyle = '#fce7f3';
      ctx.beginPath();
      ctx.arc(cx, cy + 12, 13, 0, Math.PI, true);
      ctx.fill();
    } else if (style === 'cat') {
      // Cute cat mouth (:3)
      ctx.beginPath();
      ctx.arc(cx - 13, cy - 6, 14, 0.12 * Math.PI, 0.88 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx + 13, cy - 6, 14, 0.12 * Math.PI, 0.88 * Math.PI);
      ctx.stroke();
    } else if (style === 'gentle') {
      // Sweet subtle gentle smile
      ctx.beginPath();
      ctx.arc(cx, cy - 8, 20, 0.18 * Math.PI, 0.82 * Math.PI);
      ctx.stroke();

      // Soft corner dimple dots
      ctx.fillStyle = 'rgba(244, 63, 94, 0.4)';
      ctx.beginPath();
      ctx.arc(cx - 20, cy - 4, 2, 0, Math.PI * 2);
      ctx.arc(cx + 20, cy - 4, 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (style === 'o') {
      // Cute little rounded "o" mouth
      ctx.beginPath();
      ctx.ellipse(cx, cy, 11, 15, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#fb7185';
      ctx.fill();
      ctx.stroke();

      // Tongue shine
      ctx.fillStyle = '#fce7f3';
      ctx.beginPath();
      ctx.arc(cx, cy + 5, 6, 0, Math.PI);
      ctx.fill();
    } else if (style === 'line') {
      // Soft gentle neutral line
      ctx.beginPath();
      ctx.moveTo(cx - 16, cy);
      ctx.lineTo(cx + 16, cy);
      ctx.stroke();
    } else {
      // Standard Adorable Sweet Smile with Dimples
      ctx.beginPath();
      ctx.arc(cx, cy - 8, 26, 0.16 * Math.PI, 0.84 * Math.PI);
      ctx.stroke();

      // Soft corner dimples
      ctx.fillStyle = 'rgba(244, 63, 94, 0.5)';
      ctx.beginPath();
      ctx.arc(cx - 26, cy - 3, 2.5, 0, Math.PI * 2);
      ctx.arc(cx + 26, cy - 3, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  };

  // --- Render Specific Emotion Expression with High Polish ---
  switch (type) {
    case 'happy':
      drawBlush(145, 367, 275, 52, 0.7, 'hatch');
      drawEyebrows('happy');
      drawEye(185, 220, false, 'standard');
      drawEye(327, 220, true, 'standard');
      drawMouth('smile');
      break;

    case 'laugh':
      drawBlush(145, 367, 275, 56, 0.8, 'laugh');
      drawEyebrows('laugh');
      drawEye(185, 220, false, 'laugh_arc');
      drawEye(327, 220, true, 'laugh_arc');
      drawMouth('laugh');
      break;

    case 'inlove':
    case 'heart-eyes':
      drawBlush(145, 367, 275, 58, 0.85, 'heart');
      drawEyebrows('happy');
      drawEye(185, 218, false, 'heart');
      drawEye(327, 218, true, 'heart');
      drawMouth('inlove');
      break;

    case 'cry':
      drawBlush(145, 367, 275, 55, 0.75, 'cry');
      drawEyebrows('sad');
      drawEye(185, 220, false, 'teary');
      drawEye(327, 220, true, 'teary');
      drawTears(true);
      drawMouth('cry');
      break;

    case 'sad':
      drawBlush(150, 362, 280, 44, 0.5, 'soft');
      drawEyebrows('sad');
      drawEye(185, 222, false, 'sad');
      drawEye(327, 222, true, 'sad');
      drawMouth('sad');
      break;

    case 'angry':
      drawBlush(145, 367, 275, 55, 0.85, 'angry');
      drawEyebrows('angry');
      drawEye(185, 220, false, 'angry');
      drawEye(327, 220, true, 'angry');
      drawAngerMark(385, 140, 30);
      drawMouth('angry');
      break;

    case 'winking':
      drawBlush(145, 367, 275, 54, 0.75, 'hatch');
      drawEyebrows('happy');
      drawEye(185, 220, false, 'standard');
      drawEye(327, 220, true, 'wink_arc');
      drawMouth('cat');
      break;

    case 'excited':
      drawBlush(145, 367, 275, 56, 0.8, 'hatch');
      drawEyebrows('happy');
      drawEye(185, 215, false, 'standard');
      drawEye(327, 215, true, 'standard');
      drawMouth('open');
      break;

    case 'gentle':
      drawBlush(150, 362, 275, 48, 0.6, 'soft');
      drawEyebrows('happy');
      drawEye(185, 218, false, 'gentle_arc');
      drawEye(327, 218, true, 'gentle_arc');
      drawMouth('gentle');
      break;

    case 'emotional':
      drawBlush(145, 367, 275, 56, 0.8, 'cry');
      drawEyebrows('sad');
      drawEye(185, 220, false, 'teary');
      drawEye(327, 220, true, 'teary');
      drawTears(false);
      drawMouth('smile');
      break;

    case 'thinking':
      drawBlush(150, 362, 280, 46, 0.55, 'soft');
      drawEyebrows('thinking');
      drawEye(185, 212, false, 'standard');
      drawEye(327, 224, true, 'standard');
      drawMouth('o');
      break;

    case 'serious':
      drawBlush(150, 362, 280, 38, 0.4, 'soft');
      drawEyebrows('serious');
      drawEye(185, 220, false, 'standard');
      drawEye(327, 220, true, 'standard');
      drawMouth('line');
      break;

    case 'surprised':
      drawBlush(145, 367, 275, 52, 0.7, 'hatch');
      drawEyebrows('thinking');
      drawEye(185, 215, false, 'standard');
      drawEye(327, 215, true, 'standard');
      drawMouth('open');
      break;

    case 'blinking':
      drawBlush(150, 362, 275, 50, 0.6, 'soft');
      drawEye(185, 220, false, 'gentle_arc');
      drawEye(327, 220, true, 'gentle_arc');
      drawMouth('smile');
      break;

    case 'idle':
    default:
      drawBlush(145, 367, 275, 50, 0.65, 'soft');
      drawEyebrows('happy');
      drawEye(185, 220, false, 'standard');
      drawEye(327, 220, true, 'standard');
      drawMouth('smile');
      break;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

export const ThreeSoulCanvas: React.FC<ThreeSoulCanvasProps> = ({
  emotion,
  isHovered,
  showHalo,
  isBlinking,
  interactionTrigger,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const characterGroupRef = useRef<THREE.Group | null>(null);
  const sphereMeshRef = useRef<THREE.Mesh | null>(null);
  const baseGeometryPositionsRef = useRef<Float32Array | null>(null);
  const innerGlowCoreRef = useRef<THREE.Mesh | null>(null);
  const haloGroupRef = useRef<THREE.Group | null>(null);
  const leftHandRef = useRef<THREE.Mesh | null>(null);
  const rightHandRef = useRef<THREE.Mesh | null>(null);
  const faceMeshRef = useRef<THREE.Mesh | null>(null);
  const faceMaterialsMapRef = useRef<{ [key: string]: THREE.MeshBasicMaterial }>({});
  const activeEmotionRef = useRef<string>('happy');

  const mouseTarget = useRef({ x: 0, y: 0 });
  const currentLook = useRef({ x: 0, y: 0, vx: 0, vy: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 340;

    // --- 1. Three.js Scene, Camera, High-Fidelity Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.warn('ThreeSoulCanvas: WebGL Context Lost, preventing crash');
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);
    container.appendChild(renderer.domElement);

    // --- Studio Atmospheric Lighting ---
    const ambientLight = new THREE.AmbientLight(0xf0f9ff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const cyanRimLight = new THREE.DirectionalLight(0x38bdf8, 2.2);
    cyanRimLight.position.set(-3.5, -2, -2.5);
    scene.add(cyanRimLight);

    const warmTopLight = new THREE.PointLight(0xfef08a, 1.3, 10);
    warmTopLight.position.set(0, 3.2, 2);
    scene.add(warmTopLight);

    const roseGlowLight = new THREE.PointLight(0xf472b6, 1.2, 8);
    roseGlowLight.position.set(1.5, -0.8, 1.8);
    scene.add(roseGlowLight);

    // Root 3D Character Group
    const characterGroup = new THREE.Group();
    characterGroupRef.current = characterGroup;
    scene.add(characterGroup);

    // --- 2. 3D PERFECT CIRCLE / SPHERE BODY ---
    const sphereGeo = new THREE.SphereGeometry(1.08, 64, 48);

    // Store base vertex positions for fluid jiggle vertex deformers
    const posAttr = sphereGeo.attributes.position;
    const basePositions = new Float32Array(posAttr.count * 3);
    for (let i = 0; i < posAttr.count; i++) {
      basePositions[i * 3] = posAttr.getX(i);
      basePositions[i * 3 + 1] = posAttr.getY(i);
      basePositions[i * 3 + 2] = posAttr.getZ(i);
    }
    baseGeometryPositionsRef.current = basePositions;

    // Translucent Pearlescent Glass-Silk Material
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0xf8fafc,
      emissive: 0xbae6fd,
      emissiveIntensity: 0.42,
      roughness: 0.12,
      metalness: 0.04,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transmission: 0.35,
      ior: 1.33,
      transparent: true,
      opacity: 0.96,
      sheen: 1.0,
      sheenColor: new THREE.Color(0xfbcfe8),
      sheenRoughness: 0.18,
    });

    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMeshRef.current = sphereMesh;
    characterGroup.add(sphereMesh);

    // --- 3. INNER LUMINESCENT SOUL CORE ---
    const innerGlowGeo = new THREE.SphereGeometry(0.55, 32, 24);
    const innerGlowMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0xfb7185,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.1,
      transparent: true,
      opacity: 0.75,
    });
    const innerGlowCore = new THREE.Mesh(innerGlowGeo, innerGlowMat);
    innerGlowCoreRef.current = innerGlowCore;
    characterGroup.add(innerGlowCore);

    // --- 4. DYNAMIC TEXTURE MAPPED 3D FACE DECAL MESH WITH GSAP OPACITY CROSSFADES ---
    // Curved decal plane matching the sphere curvature
    const faceGeo = new THREE.PlaneGeometry(1.42, 1.42, 16, 16);
    // Project curved onto front sphere dome
    const facePos = faceGeo.attributes.position;
    for (let i = 0; i < facePos.count; i++) {
      const px = facePos.getX(i);
      const py = facePos.getY(i);
      // spherical sagitta offset
      const distSq = px * px + py * py;
      const pz = -distSq * 0.22;
      facePos.setXYZ(i, px, py, pz);
    }
    faceGeo.computeVertexNormals();

    const emotionsList: (CharacterEmotion | 'blinking')[] = [
      'idle',
      'happy',
      'winking',
      'excited',
      'gentle',
      'emotional',
      'thinking',
      'serious',
      'cry',
      'laugh',
      'inlove',
      'heart-eyes',
      'sad',
      'angry',
      'surprised',
      'blinking',
    ];

    const faceMaterialsMap: { [key: string]: THREE.MeshBasicMaterial } = {};
    const faceMeshesGroup = new THREE.Group();
    faceMeshesGroup.position.set(0, 0.04, 1.09);

    emotionsList.forEach((eKey) => {
      const tex = createFaceTexture(eKey);
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: eKey === 'happy' ? 1.0 : 0.0,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      faceMaterialsMap[eKey] = mat;
      const fMesh = new THREE.Mesh(faceGeo, mat);
      faceMeshesGroup.add(fMesh);
    });

    faceMaterialsMapRef.current = faceMaterialsMap;
    characterGroup.add(faceMeshesGroup);

    // --- 5. 3D CUTE FLOATING SPHERE HANDS / PAWS ---
    const handGeo = new THREE.SphereGeometry(0.2, 24, 20);
    const handMat = sphereMat.clone();
    handMat.opacity = 0.95;

    const leftHand = new THREE.Mesh(handGeo, handMat);
    leftHand.position.set(-1.18, -0.22, 0.45);
    leftHandRef.current = leftHand;
    characterGroup.add(leftHand);

    const rightHand = new THREE.Mesh(handGeo, handMat);
    rightHand.position.set(1.18, -0.22, 0.45);
    rightHandRef.current = rightHand;
    characterGroup.add(rightHand);

    // --- 6. FLOATING GOLDEN HALO / CROWN ACCESSORY ---
    const haloGroup = new THREE.Group();
    haloGroupRef.current = haloGroup;
    haloGroup.position.set(0, 1.42, 0);
    haloGroup.rotation.x = Math.PI * 0.15;

    const ringGeo = new THREE.TorusGeometry(0.58, 0.024, 16, 48);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xfde047,
      emissive: 0xfacc15,
      emissiveIntensity: 0.95,
      roughness: 0.2,
      metalness: 0.85,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    haloGroup.add(ringMesh);

    // Mini star jewels
    const miniStarShape = new THREE.Shape();
    for (let i = 0; i < 8; i++) {
      const r = i % 2 === 0 ? 0.08 : 0.025;
      const a = (i * Math.PI) / 4;
      const px = Math.cos(a) * r;
      const py = Math.sin(a) * r;
      if (i === 0) miniStarShape.moveTo(px, py);
      else miniStarShape.lineTo(px, py);
    }
    miniStarShape.closePath();
    const miniStarGeo = new THREE.ShapeGeometry(miniStarShape);
    const miniStarMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });

    for (let i = 0; i < 3; i++) {
      const angle = (i * Math.PI * 2) / 3 - Math.PI / 2;
      const starMesh = new THREE.Mesh(miniStarGeo, miniStarMat);
      starMesh.position.set(Math.cos(angle) * 0.58, 0.02, Math.sin(angle) * 0.58);
      haloGroup.add(starMesh);
    }
    characterGroup.add(haloGroup);

    // --- 7. CELESTIAL STARDUST PARTICLES ORBIT ---
    const starCount = 14;
    const starGroup = new THREE.Group();
    const starShape = new THREE.Shape();
    for (let i = 0; i < 8; i++) {
      const r = i % 2 === 0 ? 0.14 : 0.04;
      const a = (i * Math.PI) / 4;
      const px = Math.cos(a) * r;
      const py = Math.sin(a) * r;
      if (i === 0) starShape.moveTo(px, py);
      else starShape.lineTo(px, py);
    }
    starShape.closePath();
    const starGeo = new THREE.ShapeGeometry(starShape);
    const starColors = [0xfacc15, 0x38bdf8, 0xf472b6, 0xfef08a, 0xe0e7ff];

    const starMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < starCount; i++) {
      const smat = new THREE.MeshBasicMaterial({
        color: starColors[i % starColors.length],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const star = new THREE.Mesh(starGeo, smat);
      const theta = (i / starCount) * Math.PI * 2;
      const radius = 1.6 + Math.random() * 0.7;
      star.position.set(
        Math.cos(theta) * radius,
        Math.sin(theta) * radius * 0.85 + (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 1.4
      );
      star.userData = {
        baseX: star.position.x,
        baseY: star.position.y,
        phase: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.035,
      };
      starGroup.add(star);
      starMeshes.push(star);
    }
    scene.add(starGroup);

    // --- 9. GSAP PHYSICS-BASED SWAY & FLOATING ENGINE ---
    const floatTween = gsap.to(characterGroup.position, {
      y: 0.24,
      duration: 2.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    const squashStretchTween = gsap.to(characterGroup.scale, {
      y: 1.05,
      x: 0.96,
      z: 0.96,
      duration: 2.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 0.35,
    });

    const swayZTween = gsap.to(characterGroup.rotation, {
      z: 0.08,
      duration: 3.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    const pitchXTween = gsap.to(characterGroup.rotation, {
      x: 0.06,
      duration: 2.6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 0.5,
    });

    const leftHandTween = gsap.to(leftHand.position, {
      y: -0.12,
      x: -1.24,
      duration: 1.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    const rightHandTween = gsap.to(rightHand.position, {
      y: -0.12,
      x: 1.24,
      duration: 1.9,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 0.3,
    });

    const corePulseTween = gsap.to(innerGlowCore.scale, {
      x: 1.2,
      y: 1.2,
      z: 1.2,
      duration: 0.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    const haloTween = gsap.to(haloGroup.position, {
      y: 1.52,
      duration: 2.0,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 0.2,
    });

    // --- 10. REAL-TIME RENDER LOOP WITH SPRING PHYSICS ---
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Fluid jiggle vertex undulation
      if (sphereMeshRef.current && baseGeometryPositionsRef.current) {
        const geo = sphereMeshRef.current.geometry;
        const pos = geo.attributes.position;
        const base = baseGeometryPositionsRef.current;

        for (let i = 0; i < pos.count; i++) {
          const bx = base[i * 3];
          const by = base[i * 3 + 1];
          const bz = base[i * 3 + 2];

          const ripple = Math.sin(elapsedTime * 3.2 + by * 2.5 + bx * 2.0) * 0.022;
          const factor = 1 + ripple;

          pos.setXYZ(i, bx * factor, by * factor, bz * factor);
        }
        pos.needsUpdate = true;
      }

      // Spring-Damper Physics Parallax
      if (characterGroupRef.current) {
        const k = 0.09;
        const damping = 0.82;

        const targetX = mouseTarget.current.x * 0.45;
        const targetY = -mouseTarget.current.y * 0.3;

        currentLook.current.vx = (currentLook.current.vx + (targetX - currentLook.current.x) * k) * damping;
        currentLook.current.vy = (currentLook.current.vy + (targetY - currentLook.current.y) * k) * damping;

        currentLook.current.x += currentLook.current.vx;
        currentLook.current.y += currentLook.current.vy;

        characterGroupRef.current.rotation.y = currentLook.current.x;
        characterGroupRef.current.rotation.x = currentLook.current.y;
      }

      // Halo spin
      haloGroup.rotation.y = elapsedTime * 0.6;

      // Stardust Orbit
      starMeshes.forEach((star) => {
        const u = star.userData;
        star.rotation.z += u.rotSpeed;
        star.position.y = u.baseY + Math.sin(elapsedTime * 2.2 + u.phase) * 0.12;
        star.position.x = u.baseX + Math.cos(elapsedTime * 1.6 + u.phase) * 0.08;
        const scale = 0.8 + Math.sin(elapsedTime * 3.5 + u.phase) * 0.35;
        star.scale.set(scale, scale, scale);
      });

      starGroup.rotation.y = elapsedTime * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 340;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      floatTween.kill();
      squashStretchTween.kill();
      swayZTween.kill();
      pitchXTween.kill();
      leftHandTween.kill();
      rightHandTween.kill();
      corePulseTween.kill();
      haloTween.kill();
      gsap.killTweensOf(characterGroup.position);
      gsap.killTweensOf(characterGroup.rotation);
      gsap.killTweensOf(characterGroup.scale);
      Object.values(faceMaterialsMap).forEach((m) => {
        m.map?.dispose();
        m.dispose();
      });
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      faceGeo.dispose();
    };
  }, []);

  // --- DYNAMIC GSAP TEXTURE OPACITY & 3D BODY LANGUAGE TRANSITIONS FOR EXPRESSIONS ---
  useEffect(() => {
    const materialsMap = faceMaterialsMapRef.current;
    if (!materialsMap || Object.keys(materialsMap).length === 0) return;

    const effectiveEmotion = materialsMap[emotion] ? emotion : 'happy';
    const targetKey = isBlinking ? 'blinking' : effectiveEmotion;
    activeEmotionRef.current = targetKey;

    // Crossfade facial texture decals
    Object.keys(materialsMap).forEach((key) => {
      const mat = materialsMap[key];
      if (!mat) return;
      if (key === targetKey) {
        gsap.to(mat, {
          opacity: 1.0,
          duration: isBlinking ? 0.08 : 0.28,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      } else {
        gsap.to(mat, {
          opacity: 0.0,
          duration: isBlinking ? 0.08 : 0.24,
          ease: 'power2.inOut',
          overwrite: 'auto',
        });
      }
    });

    if (isBlinking || !characterGroupRef.current) return;

    // Emotion-specific 3D physical body reactions
    const cg = characterGroupRef.current;
    const lh = leftHandRef.current;
    const rh = rightHandRef.current;

    switch (emotion) {
      case 'inlove':
      case 'heart-eyes':
        gsap.to(cg.rotation, { z: 0.14, duration: 0.45, ease: 'back.out(1.8)' });
        gsap.to(cg.scale, { x: 1.05, y: 0.96, z: 1.05, duration: 0.45, ease: 'sine.out' });
        if (lh && rh) {
          gsap.to(lh.position, { x: -0.85, y: -0.15, z: 0.8, duration: 0.4, ease: 'back.out(1.5)' });
          gsap.to(rh.position, { x: 0.85, y: -0.15, z: 0.8, duration: 0.4, ease: 'back.out(1.5)' });
        }
        break;

      case 'laugh':
        // Joyful double bounce jump
        gsap.timeline()
          .to(cg.position, { y: 0.42, duration: 0.18, ease: 'power2.out' })
          .to(cg.scale, { y: 1.22, x: 0.88, duration: 0.18, ease: 'power1.out' }, '<')
          .to(cg.position, { y: 0, duration: 0.22, ease: 'bounce.out' })
          .to(cg.scale, { y: 1, x: 1, duration: 0.25, ease: 'elastic.out(1.5, 0.4)' }, '<0.05');
        if (lh && rh) {
          gsap.to(lh.position, { y: 0.22, x: -1.35, duration: 0.3, ease: 'back.out(2)' });
          gsap.to(rh.position, { y: 0.22, x: 1.35, duration: 0.3, ease: 'back.out(2)' });
        }
        break;

      case 'cry':
        // Sorrowful droop & gentle tremble
        gsap.to(cg.position, { y: -0.14, duration: 0.5, ease: 'power2.out' });
        gsap.to(cg.rotation, { x: 0.12, z: -0.05, duration: 0.5, ease: 'sine.out' });
        gsap.to(cg.scale, { y: 0.94, x: 1.04, duration: 0.4, ease: 'sine.inOut' });
        if (lh && rh) {
          gsap.to(lh.position, { x: -0.95, y: -0.28, z: 0.7, duration: 0.4, ease: 'power2.out' });
          gsap.to(rh.position, { x: 0.95, y: -0.28, z: 0.7, duration: 0.4, ease: 'power2.out' });
        }
        break;

      case 'angry':
        // Indignant puff up and side twitch
        gsap.timeline()
          .to(cg.scale, { x: 1.18, y: 0.88, z: 1.15, duration: 0.15, ease: 'power2.in' })
          .to(cg.rotation, { z: -0.12, duration: 0.08, ease: 'power1.inOut' })
          .to(cg.rotation, { z: 0.12, duration: 0.08, ease: 'power1.inOut' })
          .to(cg.rotation, { z: 0, duration: 0.1, ease: 'power1.out' });
        if (lh && rh) {
          gsap.to(lh.position, { x: -1.4, y: -0.2, duration: 0.2, ease: 'back.out(1.5)' });
          gsap.to(rh.position, { x: 1.4, y: -0.2, duration: 0.2, ease: 'back.out(1.5)' });
        }
        break;

      case 'sad':
        gsap.to(cg.position, { y: -0.1, duration: 0.45, ease: 'power2.out' });
        gsap.to(cg.rotation, { x: 0.08, z: 0, duration: 0.45, ease: 'power2.out' });
        if (lh && rh) {
          gsap.to(lh.position, { x: -1.05, y: -0.3, z: 0.5, duration: 0.4, ease: 'power2.out' });
          gsap.to(rh.position, { x: 1.05, y: -0.3, z: 0.5, duration: 0.4, ease: 'power2.out' });
        }
        break;

      case 'excited':
        gsap.to(cg.position, { y: 0.28, duration: 0.35, ease: 'back.out(1.6)' });
        gsap.to(cg.scale, { y: 1.12, x: 0.94, duration: 0.35, ease: 'back.out(1.5)' });
        if (lh && rh) {
          gsap.to(lh.position, { y: 0.15, x: -1.3, duration: 0.3, ease: 'back.out(1.8)' });
          gsap.to(rh.position, { y: 0.15, x: 1.3, duration: 0.3, ease: 'back.out(1.8)' });
        }
        break;

      default:
        // Return to natural equilibrium
        gsap.to(cg.scale, { x: 1, y: 1, z: 1, duration: 0.4, ease: 'power2.out' });
        gsap.to(cg.rotation, { z: 0, duration: 0.4, ease: 'power2.out' });
        if (lh && rh) {
          gsap.to(lh.position, { x: -1.18, y: -0.22, z: 0.45, duration: 0.4, ease: 'power2.out' });
          gsap.to(rh.position, { x: 1.18, y: -0.22, z: 0.45, duration: 0.4, ease: 'power2.out' });
        }
        break;
    }
  }, [emotion, isBlinking]);

  // Pointer Movement Tracking
  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseTarget.current = { x, y };
  };

  const handlePointerLeave = () => {
    mouseTarget.current = { x: 0, y: 0 };
  };

  // Hover Spring Lift with Elastic Easing
  useEffect(() => {
    if (!characterGroupRef.current) return;
    if (isHovered) {
      gsap.to(characterGroupRef.current.scale, {
        x: 1.1,
        y: 1.1,
        z: 1.1,
        duration: 0.5,
        ease: 'elastic.out(1.3, 0.4)',
      });
      if (leftHandRef.current && rightHandRef.current) {
        gsap.to(leftHandRef.current.position, { y: 0.1, x: -1.35, duration: 0.4, ease: 'back.out(1.8)' });
        gsap.to(rightHandRef.current.position, { y: 0.1, x: 1.35, duration: 0.4, ease: 'back.out(1.8)' });
      }
    } else {
      gsap.to(characterGroupRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.45,
        ease: 'power2.out',
      });
      if (leftHandRef.current && rightHandRef.current) {
        gsap.to(leftHandRef.current.position, { y: -0.22, x: -1.18, duration: 0.45, ease: 'power2.out' });
        gsap.to(rightHandRef.current.position, { y: -0.22, x: 1.18, duration: 0.45, ease: 'power2.out' });
      }
    }
  }, [isHovered]);

  // Halo Toggle with Elastic Easing
  useEffect(() => {
    if (haloGroupRef.current) {
      gsap.to(haloGroupRef.current.scale, {
        x: showHalo ? 1 : 0.001,
        y: showHalo ? 1 : 0.001,
        z: showHalo ? 1 : 0.001,
        duration: 0.45,
        ease: 'elastic.out(1.3, 0.45)',
      });
    }
  }, [showHalo]);

  // Joyful Click Reaction: 3D Bouncy Sphere Squash & Stretch Jump
  useEffect(() => {
    if (interactionTrigger === 0 || !characterGroupRef.current) return;

    const tl = gsap.timeline();

    tl.to(characterGroupRef.current.scale, {
      y: 0.7,
      x: 1.3,
      z: 1.3,
      duration: 0.12,
      ease: 'power2.in',
    })
      .to(characterGroupRef.current.position, {
        y: 0.9,
        duration: 0.28,
        ease: 'power2.out',
      }, '<0.08')
      .to(characterGroupRef.current.scale, {
        y: 1.38,
        x: 0.76,
        z: 0.76,
        duration: 0.22,
        ease: 'power1.out',
      }, '<')
      .to(characterGroupRef.current.rotation, {
        z: (Math.random() > 0.5 ? 1 : -1) * 0.32,
        duration: 0.25,
        ease: 'sine.inOut',
      }, '<')
      .to(characterGroupRef.current.position, {
        y: 0,
        duration: 0.38,
        ease: 'power2.in',
      })
      .to(characterGroupRef.current.scale, {
        y: 0.82,
        x: 1.18,
        z: 1.18,
        duration: 0.12,
        ease: 'power2.out',
      }, '<0.25')
      .to(characterGroupRef.current.scale, {
        y: 1,
        x: 1,
        z: 1,
        duration: 0.65,
        ease: 'elastic.out(1.8, 0.32)',
      })
      .to(characterGroupRef.current.rotation, {
        z: 0,
        duration: 0.5,
        ease: 'elastic.out(1.4, 0.35)',
      }, '<');
  }, [interactionTrigger]);

  return (
    <div
      ref={mountRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="w-48 h-56 md:w-56 md:h-64 flex items-center justify-center relative cursor-pointer select-none"
    />
  );
};
