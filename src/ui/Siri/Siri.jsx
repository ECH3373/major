'use client'

import React, { useRef, useEffect } from 'react';
import { Card } from '..'

export const Siri = ({ className }) => {
  const canvasTopRef = useRef(null);
  const canvasBottomRef = useRef(null);
  const animationFrameId = useRef(null);

  useEffect(() => {
    // Configuración
    const opts = {
      numberOrbs: 100,
      maxVelocity: 2.5,
      orbRadius: 1,
      minProximity: 100,
      initialColorAngle: 7,
      colorFrequency: 0.3,
      colorAngleIncrement: 0.009,
      globalAlpha: 0.010,
    };

    let width, height;
    const canvasTop = canvasTopRef.current;
    const canvasBottom = canvasBottomRef.current;
    const lineCtx = canvasTop.getContext('2d');
    const dotCtx = canvasBottom.getContext('2d');
    let orbs;

    // Vector auxiliar
    class Vector {
      constructor(x, y) { this.x = x; this.y = y; }
      add(v) { return new Vector(this.x + v.x, this.y + v.y); }
      subtract(v) { return new Vector(this.x - v.x, this.y - v.y); }
      length() { return Math.hypot(this.x, this.y); }
      multiply(s) { return new Vector(this.x * s, this.y * s); }
      static randomDirection() {
        const angle = Math.random() * 2 * Math.PI;
        return new Vector(Math.cos(angle), Math.sin(angle));
      }
    }

    // Un punto que rebota
    class Orb {
      constructor(radius) {
        this.position = new Vector(Math.random() * width, Math.random() * height);
        this.velocity = Vector.randomDirection().multiply(Math.random() * opts.maxVelocity);
        this.radius = radius;
        this.color = null;
      }
      update() {
        this.position = this.position.add(this.velocity);
        if (this.position.x + this.radius >= width || this.position.x - this.radius <= 0) this.velocity.x *= -1;
        if (this.position.y + this.radius >= height || this.position.y - this.radius <= 0) this.velocity.y *= -1;
      }
      display() {
        dotCtx.beginPath();
        dotCtx.fillStyle = this.color;
        dotCtx.ellipse(this.position.x, this.position.y, this.radius, this.radius, 0, 0, 2 * Math.PI);
        dotCtx.fill();
        dotCtx.closePath();
      }
      run() {
        this.update();
        this.display();
      }
    }

    // Contenedor de orbs + líneas
    class Orbs {
      constructor() {
        this.orbs = [];
        this.colorAngle = opts.initialColorAngle;
        this.color = null;
        for (let i = 0; i < opts.numberOrbs; i++) {
          this.orbs.push(new Orb(opts.orbRadius));
        }
      }
      phaseColor() {
        const a = this.colorAngle;
        const f = opts.colorFrequency;
        const inc = opts.colorAngleIncrement;
        const r = Math.floor(Math.sin(f * a + 0) * 127 + 128);
        const g = Math.floor(Math.sin(f * a + 2 * Math.PI / 3) * 127 + 128);
        const b = Math.floor(Math.sin(f * a + 4 * Math.PI / 3) * 127 + 128);
        this.color = `rgba(${r},${g},${b},1)`;
        this.colorAngle += inc;
      }
      compare(a, b) {
        if (a.position.subtract(b.position).length() <= opts.minProximity) {
          lineCtx.beginPath();
          lineCtx.strokeStyle = this.color;
          lineCtx.globalAlpha = opts.globalAlpha;
          lineCtx.moveTo(a.position.x, a.position.y);
          lineCtx.lineTo(b.position.x, b.position.y);
          lineCtx.stroke();
          lineCtx.closePath();
        }
      }
      run() {
        this.phaseColor();
        for (let i = 0; i < this.orbs.length; i++) {
          for (let j = i + 1; j < this.orbs.length; j++) {
            this.compare(this.orbs[i], this.orbs[j]);
          }
          this.orbs[i].color = this.color;
          this.orbs[i].run();
        }
      }
    }

    // Ajusta tamaño y (re)crea orbs
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvasTop.width = canvasBottom.width = width;
      canvasTop.height = canvasBottom.height = height;
      orbs = new Orbs();
    }

    // Pinta cada frame: limpia puntos y corre orbs
    function draw() {
      dotCtx.clearRect(0, 0, width, height);
      orbs.run();
      animationFrameId.current = requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', resize);
    };
  }, []);


  return (
    <Card className={`absolute h-[120px] w-[120px] overflow-hidden rounded-full animate-[spin_20s_linear_infinite] shadow-2xl ${className}`}>
      <canvas
        ref={canvasBottomRef}
        className="absolute inset-0 bg-transparent"
      />
      <canvas
        ref={canvasTopRef}
        className="absolute inset-0 bg-transparent"
      />
    </Card>
  )
}
