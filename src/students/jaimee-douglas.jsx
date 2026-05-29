import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";

/* ─── PALETTE ─────────────────────────────────────────────────────────────── */
const C = {
  burgundy:    "#6B1A2A",
  burgundyDk:  "#4A0F1C",
  burgundyLt:  "#8B2A3F",
  pink:        "#C4516A",
  pinkLt:      "#E8A0AF",
  gold:        "#C9972A",
  goldLt:      "#E8C060",
  goldPale:    "#F5E8C0",
  royal:       "#1A3A7A",
  royalLt:     "#2E5FBF",
  royalPale:   "#C0CFEA",
  emerald:     "#1A6B45",
  emeraldLt:   "#2E9E6A",
  emeraldPale: "#C0E8D4",
  cream:       "#FAF5EC",
  ink:         "#1A1008",
  inkSoft:     "#3A2818",
  ptGreen:     "#046A38",
  ptRed:       "#DA291C",
};

/* ─── PAGE CSS ─────────────────────────────────────────────────────────────── */
const PAGE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Great+Vibes&family=Jost:wght@300;400;500;600&display=swap');

  .jd-page {
    --burg: ${C.burgundy};
    --burg-dk: ${C.burgundyDk};
    --burg-lt: ${C.burgundyLt};
    --pink: ${C.pink};
    --pink-lt: ${C.pinkLt};
    --gold: ${C.gold};
    --gold-lt: ${C.goldLt};
    --gold-pale: ${C.goldPale};
    --royal: ${C.royal};
    --royal-lt: ${C.royalLt};
    --royal-pale: ${C.royalPale};
    --emerald: ${C.emerald};
    --emerald-lt: ${C.emeraldLt};
    --emerald-pale: ${C.emeraldPale};
    --cream: ${C.cream};
    --ink: ${C.ink};
    --ink-soft: ${C.inkSoft};
    --jd-section-x: clamp(18px, 5vw, 80px);
    --jd-section-y: clamp(56px, 11vw, 88px);

    font-family: 'Jost', sans-serif;
    background: var(--burg-dk);
    color: var(--cream);
    min-height: 100vh;
    overflow-x: hidden;
    padding-bottom: clamp(148px, 32vw, 200px);
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }

  @media (hover: hover) and (pointer: fine) {
    .jd-page.jd-custom-cursor { cursor: none; }
  }

  .jd-page * { box-sizing: border-box; }

  .jd-display { font-family: 'Cormorant Garamond', serif; }

  /* ── VIEWFINDER CURSOR ── */
  .jd-viewfinder {
    position: fixed;
    top: 0;
    left: 0;
    width: 28px;
    height: 28px;
    pointer-events: none;
    z-index: 9999;
    will-change: transform;
    transition: width 0.22s ease, height 0.22s ease;
  }

  .jd-viewfinder--active {
    width: 48px;
    height: 48px;
  }

  .jd-viewfinder--snap {
    transition: width 0.08s ease, height 0.08s ease, filter 0.15s ease;
    filter: drop-shadow(0 0 16px rgba(232, 192, 96, 0.55));
  }

  .jd-viewfinder-corner {
    position: absolute;
    width: 9px;
    height: 9px;
    border: 1.5px solid rgba(201, 151, 42, 0.75);
    transition: width 0.22s ease, height 0.22s ease, border-color 0.2s ease;
  }

  .jd-viewfinder--active .jd-viewfinder-corner {
    width: 13px;
    height: 13px;
    border-color: rgba(232, 192, 96, 0.95);
  }

  .jd-viewfinder-corner--tl {
    top: 0;
    left: 0;
    border-right: none;
    border-bottom: none;
  }

  .jd-viewfinder-corner--tr {
    top: 0;
    right: 0;
    border-left: none;
    border-bottom: none;
  }

  .jd-viewfinder-corner--bl {
    bottom: 0;
    left: 0;
    border-right: none;
    border-top: none;
  }

  .jd-viewfinder-corner--br {
    bottom: 0;
    right: 0;
    border-left: none;
    border-top: none;
  }

  .jd-viewfinder-reticle {
    position: absolute;
    inset: 0;
    opacity: 0.5;
    transition: opacity 0.2s ease;
  }

  .jd-viewfinder--active .jd-viewfinder-reticle {
    opacity: 0;
  }

  .jd-viewfinder-reticle::before,
  .jd-viewfinder-reticle::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    background: rgba(201, 151, 42, 0.45);
    transform: translate(-50%, -50%);
  }

  .jd-viewfinder-reticle::before {
    width: 1px;
    height: 62%;
  }

  .jd-viewfinder-reticle::after {
    width: 62%;
    height: 1px;
  }

  .jd-viewfinder-dot {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 3px;
    height: 3px;
    margin: -1.5px 0 0 -1.5px;
    border-radius: 50%;
    background: var(--gold-lt);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .jd-viewfinder--active .jd-viewfinder-dot {
    opacity: 0.9;
  }

  .jd-camera-flash {
    position: fixed;
    top: 0;
    left: 0;
    width: 158px;
    height: 158px;
    margin: -79px 0 0 -79px;
    pointer-events: none;
    z-index: 10001;
    border-radius: 50%;
    background: radial-gradient(
      circle at center,
      rgba(255, 248, 235, 0.52) 0%,
      rgba(245, 232, 192, 0.38) 30%,
      rgba(232, 192, 96, 0.16) 52%,
      transparent 72%
    );
  }

  .jd-camera-flash--welcome {
    width: 240px;
    height: 240px;
    margin: -120px 0 0 -120px;
    background: radial-gradient(
      circle at center,
      rgba(255, 252, 245, 0.92) 0%,
      rgba(255, 245, 220, 0.72) 24%,
      rgba(245, 228, 180, 0.42) 46%,
      rgba(232, 192, 96, 0.18) 62%,
      transparent 78%
    );
  }

  /* ── SECTIONS ── */
  .jd-section {
    position: relative;
    scroll-margin-top: 24px;
    padding: var(--jd-section-y) var(--jd-section-x);
  }

  .jd-section--hero {
    padding: 0;
  }

  .jd-section--cities {
    padding-top: clamp(64px, 12vw, 96px);
    padding-bottom: clamp(72px, 12vw, 100px);
  }

  .jd-section--monastery {
    padding-top: clamp(48px, 10vw, 72px);
    padding-bottom: clamp(36px, 7vw, 48px);
  }

  .jd-section--blog {
    padding-bottom: clamp(80px, 14vw, 120px);
  }

  .jd-section--farewell {
    padding-top: clamp(72px, 14vw, 120px);
    padding-bottom: clamp(56px, 10vw, 80px);
  }

  .jd-photo-slot--tall {
    height: clamp(220px, 55vw, 420px) !important;
    min-height: 0 !important;
    border-radius: 4px;
  }

  .jd-photo-slot--reflection {
    height: auto !important;
    min-height: clamp(220px, 52vw, 380px) !important;
    border-radius: 4px;
  }

  .jd-ambient {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    transition: background 1.4s ease;
  }

  .jd-content {
    position: relative;
    z-index: 1;
    counter-reset: jd-frame;
  }

  .jd-film-grain {
    position: fixed;
    inset: 0;
    z-index: 50;
    pointer-events: none;
    opacity: 0.045;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    mix-blend-mode: soft-light;
  }

  .jd-vignette {
    position: fixed;
    inset: 0;
    z-index: 49;
    pointer-events: none;
    background: radial-gradient(ellipse at center, transparent 42%, rgba(10, 6, 8, 0.55) 100%);
  }

  .jd-meta-chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border-radius: 999px;
    border: 1px solid rgba(201,151,42,0.35);
    background: rgba(250,245,236,0.06);
    padding: 8px 16px;
    font-size: 0.82rem;
    letter-spacing: 0.04em;
    color: var(--cream);
    backdrop-filter: blur(6px);
  }

  .jd-meta-chip em {
    font-style: normal;
    color: var(--gold-lt);
  }

  .jd-meta-chip-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
  }

  .jd-meta-chip-label {
    font-size: 0.58rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--gold);
    line-height: 1.2;
  }

  .jd-blog-card {
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid rgba(201,151,42,0.22);
    background: rgba(250,245,236,0.04);
    transition: border-color 0.3s ease, background 0.3s ease;
  }

  .jd-blog-card:hover {
    border-color: rgba(201,151,42,0.45);
    background: rgba(250,245,236,0.07);
  }

  .jd-blog-card button {
    width: 100%;
    border: none;
    background: transparent;
    cursor: pointer;
    text-align: left;
    padding: 24px 28px;
    color: var(--cream);
    font-family: 'Jost', sans-serif;
  }

  .jd-blog-body {
    border-top: 1px solid rgba(201,151,42,0.15);
    padding: 24px 28px 32px;
    display: flex;
    flex-direction: column;
    gap: 1.15rem;
  }

  .jd-blog-body p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.85;
    color: rgba(250,245,236,0.82);
    font-weight: 300;
  }

  .jd-book-panel {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 48px;
    align-items: center;
    max-width: 900px;
    margin: 0 auto;
  }

  .jd-reflection-panel {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
    gap: 48px;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;
  }

  .jd-reflection-panel .jd-photo-item {
    height: clamp(360px, 42vw, 480px);
  }

  .jd-reflection-panel .jd-reflection-copy {
    text-align: left;
  }

  .jd-reflection-panel .jd-reflection-copy .jd-rule {
    margin-left: 0;
  }

  @media (max-width: 768px) {
    .jd-book-panel { grid-template-columns: 1fr; }
    .jd-reflection-panel {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .jd-reflection-panel .jd-reflection-copy {
      text-align: center;
    }
    .jd-reflection-panel .jd-reflection-copy .jd-rule {
      margin-left: auto;
      margin-right: auto;
    }
    .jd-reflection-panel .jd-photo-item {
      min-height: 280px;
      height: auto;
    }
  }

  /* ── HERO ── */
  .jd-hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    background: var(--burg-dk);
  }

  .jd-hero-back {
    position: absolute;
    top: clamp(22px, 3vh, 36px);
    left: clamp(24px, 4vw, 80px);
    z-index: 10;
  }

  .jd-hero-header {
    width: 100%;
    padding: clamp(64px, 9vh, 96px) clamp(24px, 5vw, 80px) clamp(20px, 3vh, 36px);
    text-align: center;
    position: relative;
    z-index: 2;
    overflow: visible;
  }

  .jd-hero-name {
    font-family: 'Great Vibes', cursive;
    font-size: clamp(4rem, 12vw, 9.25rem);
    font-weight: 400;
    line-height: 1.2;
    color: var(--cream);
    margin: 0 auto;
    letter-spacing: 0.02em;
    text-align: center;
    width: max-content;
    max-width: 100%;
    padding: 0.12em 0.28em 0.28em;
    overflow: visible;
    white-space: nowrap;
  }

  .jd-hero-name em {
    color: var(--pink-lt);
    font-style: normal;
  }

  .jd-hero-film-quote {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.15rem, 2.6vw, 1.65rem);
    font-style: italic;
    font-weight: 400;
    color: var(--pink-lt);
    letter-spacing: 0.1em;
    margin: 0.2em auto 0.55em;
    line-height: 1.35;
  }

  .jd-signature-wrap {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    max-width: calc(100% - 2rem);
    margin: 0 auto;
    padding: 0 0.2em;
    overflow: visible;
  }

  .jd-hero-name--animate {
    display: block;
  }

  .jd-signature-letter {
    display: inline-block;
    vertical-align: baseline;
    will-change: transform, opacity, filter;
  }

  .jd-signature-letter--surname {
    font-style: normal;
    color: var(--pink-lt);
  }

  .jd-signature-quill {
    position: absolute;
    bottom: 0.35em;
    width: 32px;
    height: 32px;
    margin-left: -16px;
    pointer-events: none;
    z-index: 3;
    filter: drop-shadow(0 2px 5px rgba(0,0,0,0.3));
  }

  .jd-signature-quill svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  .jd-hero-identity-chips {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 16px 20px;
    margin-top: 22px;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }

  .jd-hero-main {
    flex: 1;
    display: grid;
    grid-template-columns: minmax(0, 0.46fr) minmax(0, 0.54fr);
    align-items: center;
    position: relative;
    z-index: 2;
  }

  .jd-hero-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 24px 40px 64px 80px;
  }

  .jd-hero-bio .jd-body {
    font-size: clamp(1.05rem, 1.35vw, 1.15rem);
    line-height: 1.85;
    max-width: 520px;
  }

  .jd-hero-bio .jd-kicker {
    font-size: 0.72rem;
  }

  .jd-hero-bio .jd-day-btn {
    font-size: 0.76rem;
    padding: 9px 16px;
  }

  .jd-hero-bio .jd-hero-day-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.75rem, 2.5vw, 2rem);
    font-style: italic;
    color: var(--gold-lt);
    margin-bottom: 6px;
  }

  .jd-hero-day-frame {
    position: relative;
    margin-top: 18px;
    width: 100%;
    max-width: 340px;
    aspect-ratio: 158 / 143;
    line-height: 0;
    filter: drop-shadow(0 16px 32px rgba(0, 0, 0, 0.32));
  }

  .jd-hero-day-frame-photo {
    position: absolute;
    top: 16.08%;
    left: 1.9%;
    right: 3.8%;
    bottom: 15.38%;
    object-fit: cover;
    display: block;
  }

  .jd-hero-day-frame-overlay {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    user-select: none;
    z-index: 1;
  }

  .jd-hero-right {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px clamp(16px, 2.5vw, 32px) 48px;
  }

  .jd-hero-film-wrap {
    width: 100%;
    max-width: min(100%, 920px);
  }

  .jd-hero-film-stack {
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto auto;
    align-items: stretch;
  }

  .jd-film-strip {
    display: block;
    pointer-events: none;
    user-select: none;
  }

  .jd-film-strip-wrap {
    position: relative;
    width: 100%;
    line-height: 0;
  }

  .jd-film-strip-wrap--side {
    height: 100%;
  }

  .jd-film-strip-wrap--side .jd-film-strip-overlay {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  .jd-film-frames {
    position: absolute;
    inset: 0;
    z-index: 0;
    display: grid;
  }

  .jd-film-frames--row {
    grid-template-columns: repeat(5, 1fr);
    gap: 1.1%;
    padding: 0 0.8%;
  }

  .jd-film-frames--col {
    grid-template-rows: repeat(5, 1fr);
    gap: 1.3%;
    padding: 1.8% 0;
  }

  .jd-film-frame-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    background: #0a0a0a;
  }

  .jd-film-strip-overlay {
    position: relative;
    z-index: 1;
    width: 100%;
    height: auto;
    display: block;
    pointer-events: none;
    user-select: none;
  }

  .jd-film-side-cell {
    grid-row: 1 / -1;
    display: flex;
    align-items: stretch;
    width: clamp(64px, 11vw, 112px);
    min-height: 0;
  }

  .jd-film-side-cell--left {
    grid-column: 1;
  }

  .jd-film-side-cell--right {
    grid-column: 3;
  }

  .jd-film-strip-wrap--row-top {
    grid-column: 2;
    grid-row: 1;
  }

  .jd-film-strip-wrap--row-bottom {
    grid-column: 2;
    grid-row: 3;
  }

  .jd-film-strip-wrap--row-bottom .jd-film-strip-overlay {
    transform: scaleY(-1);
  }

  .jd-film-strip--side {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  .jd-hero-film-photo {
    grid-column: 2;
    grid-row: 2;
    width: 100%;
    line-height: 0;
    background: transparent;
    min-height: 0;
  }

  .jd-hero-photo {
    width: 100%;
    height: auto;
    max-height: min(54vh, 540px);
    object-fit: cover;
    object-position: center 38%;
    opacity: 1;
    display: block;
  }

  /* ── DAY SELECTOR ── */
  .jd-day-btn {
    border: 1.5px solid transparent;
    background: transparent;
    color: var(--gold-pale);
    font-family: 'Jost', sans-serif;
    font-size: 0.78rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 8px 20px;
    cursor: none;
    transition: all 0.3s ease;
    border-radius: 2px;
  }

  .jd-day-btn:hover {
    border-color: var(--gold);
    color: var(--gold-lt);
    background: rgba(201,151,42,0.08);
  }

  .jd-day-btn.active {
    border-color: var(--gold);
    background: rgba(201,151,42,0.15);
    color: var(--gold-lt);
  }

  /* ── CITY MAP ── */
  .jd-map-section {
    background: var(--royal);
    padding: 100px 80px;
    position: relative;
    overflow: hidden;
  }

  .jd-portugal-map {
    width: 100%;
    border-radius: 4px;
    border: 1px solid rgba(201, 151, 42, 0.25);
    background: linear-gradient(165deg, rgba(18, 42, 88, 0.95) 0%, rgba(10, 26, 56, 0.98) 100%);
    overflow: visible;
    box-shadow: inset 0 0 80px rgba(46, 95, 191, 0.15);
  }

  .jd-portugal-map svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .jd-map-pin {
    cursor: none;
  }

  .jd-map-pin:hover .jd-map-pin-core {
    fill: var(--gold-lt);
  }

  .jd-map-pin:hover .jd-map-pin-ring {
    stroke-opacity: 0.85;
  }

  .jd-cities-layout {
    display: grid;
    grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
    gap: clamp(48px, 6vw, 80px);
    align-items: center;
  }

  .jd-cities-list {
    display: flex;
    flex-direction: column;
    gap: clamp(32px, 4.5vh, 48px);
    padding: 8px 0 8px 12px;
  }

  .jd-cities-list-item {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }

  .jd-cities-list-mark {
    width: 4px;
    min-height: 56px;
    align-self: stretch;
    flex-shrink: 0;
    border-radius: 2px;
  }

  .jd-cities-list-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.6rem, 2.6vw, 2.15rem);
    font-style: italic;
    color: var(--gold-lt);
    line-height: 1.12;
    margin: 0 0 10px;
  }

  .jd-cities-list-note {
    font-family: 'Jost', sans-serif;
    font-size: clamp(1.05rem, 1.5vw, 1.2rem);
    font-weight: 300;
    line-height: 1.75;
    color: rgba(250,245,236,0.8);
    margin: 0;
    max-width: 46ch;
  }

  /* ── AUX DECK (cassette + film strip) ── */
  .jd-aux-deck {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: linear-gradient(180deg, #0c0a0b 0%, var(--burg-dk) 18%, #120810 100%);
    border-top: 2px solid rgba(201,151,42,0.45);
    box-shadow: 0 -12px 40px rgba(0,0,0,0.45);
  }

  .jd-aux-deck-perfs {
    height: 10px;
    background:
      repeating-linear-gradient(90deg, rgba(250,245,236,0.14) 0 5px, transparent 5px 13px),
      #050505;
    border-bottom: 1px solid rgba(201,151,42,0.2);
  }

  .jd-aux-deck-body {
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 12px 24px 14px 28px;
    min-height: 100px;
    flex-wrap: wrap;
  }

  @media (min-width: 901px) {
    .jd-aux-deck-body { min-height: 158px; align-items: center; }
  }

  .jd-aux-deck-left {
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: clamp(130px, 15vw, 200px);
    flex-shrink: 0;
  }

  .jd-aux-title {
    font-family: 'Great Vibes', cursive;
    font-size: clamp(1.35rem, 2.2vw, 1.75rem);
    color: var(--gold-lt);
    white-space: nowrap;
    line-height: 1.1;
    letter-spacing: 0.02em;
  }

  .jd-aux-sub {
    font-size: 0.58rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(250,245,236,0.42);
    white-space: nowrap;
  }

  .jd-frame-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 2px;
    padding: 4px 10px;
    border: 1px solid rgba(201,151,42,0.35);
    border-radius: 2px;
    background: rgba(0,0,0,0.35);
    font-size: 0.58rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--gold-pale);
    white-space: nowrap;
    width: fit-content;
  }

  .jd-frame-badge em {
    font-style: normal;
    color: var(--pink-lt);
  }

  .jd-now-playing-label {
    font-size: 0.62rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--gold);
    white-space: nowrap;
  }

  .jd-cassette-well {
    position: relative;
    flex-shrink: 0;
    padding: 10px 14px 12px;
    border-radius: 6px;
    border: 1px solid rgba(201,151,42,0.35);
    background:
      linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 40%),
      linear-gradient(135deg, #1a1218 0%, #0d0a0c 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 24px rgba(0,0,0,0.35);
  }

  .jd-cassette-reels {
    position: absolute;
    top: 6px;
    left: 14px;
    right: 14px;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
    z-index: 2;
  }

  .jd-reel {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid rgba(201,151,42,0.55);
    background:
      radial-gradient(circle at center, #0a0a0a 0 3px, transparent 3px 100%),
      repeating-conic-gradient(from 0deg, rgba(201,151,42,0.25) 0deg 24deg, transparent 24deg 48deg);
    animation: jd-reel-spin 3.2s linear infinite;
  }

  .jd-reel--reverse {
    animation-direction: reverse;
    animation-duration: 2.8s;
  }

  @keyframes jd-reel-spin {
    to { transform: rotate(360deg); }
  }

  .jd-spotify-embed {
    position: relative;
    z-index: 1;
    display: block;
    border-radius: 8px;
    flex-shrink: 0;
    border: 1px solid rgba(201,151,42,0.22);
    background: #000;
    min-width: 280px;
    margin-top: 8px;
  }

  .jd-aux-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    flex-shrink: 0;
  }

  .jd-soundtrack {
    margin-top: 24px;
    padding: 14px 20px 14px 24px;
    border: 1px solid rgba(201,151,42,0.22);
    border-radius: 2px;
    display: inline-block;
    text-align: left;
    position: relative;
    background: linear-gradient(135deg, rgba(0,0,0,0.28) 0%, rgba(74,15,28,0.18) 100%);
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.03);
  }

  .jd-soundtrack::before {
    content: "";
    position: absolute;
    left: 0;
    top: 8px;
    bottom: 8px;
    width: 4px;
    border-radius: 0 2px 2px 0;
    background: linear-gradient(180deg, var(--gold), var(--burg));
  }

  .jd-soundtrack-label {
    font-size: 0.58rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 5px;
  }

  .jd-soundtrack--light {
    border-color: rgba(107, 26, 42, 0.28);
    background: linear-gradient(135deg, rgba(250,245,236,0.65) 0%, rgba(250,245,236,0.35) 100%);
    box-shadow: inset 0 0 0 1px rgba(107,26,42,0.08);
  }

  .jd-soundtrack--light::before {
    background: linear-gradient(180deg, var(--burg), var(--gold));
  }

  .jd-soundtrack--light .jd-soundtrack-label {
    color: var(--burg);
  }

  .jd-soundtrack-track {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.05rem;
    font-style: italic;
    color: var(--gold-lt);
    line-height: 1.35;
  }

  .jd-soundtrack--light .jd-soundtrack-track {
    color: var(--ink-soft);
  }

  .jd-section-label {
    font-family: 'Jost', sans-serif;
    font-size: 0.62rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--gold-pale);
    white-space: nowrap;
    min-width: 140px;
    padding: 6px 10px;
    border: 1px solid rgba(201,151,42,0.25);
    border-radius: 2px;
    background: rgba(0,0,0,0.25);
  }

  .jd-soundtrack--center {
    text-align: left;
  }

  /* ── PHOTO GRID ── */
  .jd-photo-grid {
    display: grid;
    gap: 3px;
  }

  .jd-photo-item {
    overflow: hidden;
    position: relative;
  }

  .jd-photo-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  .jd-photo-item:hover img {
    transform: scale(1.05);
  }

  .jd-photo-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background: linear-gradient(to top, rgba(74, 15, 28, 0.95) 55%, rgba(74, 15, 28, 0.55) 80%, transparent);
    padding: 28px 14px 14px;
    font-size: 0.72rem;
    line-height: 1.45;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--gold-pale);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    font-family: 'Jost', sans-serif;
  }

  .jd-photo-item--has-caption {
    counter-increment: jd-frame;
    cursor: pointer;
  }

  .jd-photo-caption::before {
    content: "Frame " counter(jd-frame, decimal-leading-zero) " · ";
    color: var(--gold);
    letter-spacing: 0.14em;
    font-size: 0.58rem;
  }

  .jd-photo-item--has-caption:hover .jd-photo-caption,
  .jd-photo-item--has-caption:focus-visible .jd-photo-caption,
  .jd-photo-item--show-caption .jd-photo-caption {
    opacity: 1;
  }

  .jd-photo-item--has-caption:hover img,
  .jd-photo-item--has-caption:focus-visible img,
  .jd-photo-item--show-caption img {
    transform: none;
  }

  .jd-scroll-progress-wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 300;
    pointer-events: none;
  }

  .jd-scroll-progress-perfs {
    height: 6px;
    background:
      repeating-linear-gradient(90deg, rgba(250,245,236,0.12) 0 4px, transparent 4px 11px),
      #050505;
  }

  .jd-scroll-progress {
    height: 3px;
    transform-origin: 0% 50%;
    background: linear-gradient(90deg, var(--gold), var(--gold-lt), var(--pink-lt));
    box-shadow: 0 0 14px rgba(201,151,42,0.45);
  }

  .jd-parallax-columns {
    overflow: hidden;
    width: 100%;
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .jd-parallax-columns--bleed {
    overflow: visible;
    width: 100vw;
    max-width: none;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    padding: 0;
    align-items: stretch;
    gap: 14px;
  }

  .jd-parallax-row-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    overflow: hidden;
  }

  .jd-parallax-columns--bleed .jd-parallax-row-wrap {
    overflow: visible;
    display: block;
    width: 100%;
  }

  .jd-parallax-row {
    display: flex;
    gap: 12px;
    width: max-content;
    will-change: transform;
  }

  .jd-section--food,
  .jd-section--gallery-bleed {
    overflow: visible;
  }

  .jd-surf-benfica-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
    gap: 32px 40px;
    align-items: center;
  }

  .jd-surf-benfica-gallery {
    min-width: 0;
    width: 100%;
  }

  .jd-surf-benfica-stack {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  .jd-surf-benfica-stack-hero.jd-photo-item {
    width: 100%;
    height: clamp(200px, 26vw, 300px);
  }

  .jd-surf-benfica-stack-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    width: 100%;
  }

  .jd-surf-benfica-stack-row .jd-photo-item {
    height: clamp(150px, 18vw, 220px);
  }

  .jd-pena-collage {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.45fr) minmax(0, 0.88fr);
    grid-template-rows: minmax(150px, 1fr) minmax(150px, 1fr) minmax(150px, 1fr);
    gap: 8px;
    max-width: 1080px;
    margin: 0 auto;
    min-height: clamp(480px, 58vw, 620px);
  }

  .jd-pena-collage .jd-photo-item {
    height: 100%;
    min-height: 0;
  }

  .jd-pena-collage-hero {
    grid-column: 2;
    grid-row: 1 / 4;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.38);
    border: 2px solid rgba(201, 151, 42, 0.4);
    border-radius: 3px;
  }

  .jd-pena-collage-hero img {
    object-position: center 32%;
  }

  .jd-pena-collage-terraces {
    grid-column: 1;
    grid-row: 1;
  }

  .jd-pena-collage-terraces img {
    object-position: center 45%;
  }

  .jd-pena-collage-mist {
    grid-column: 1;
    grid-row: 2 / 4;
  }

  .jd-pena-collage-capes {
    grid-column: 3;
    grid-row: 1 / 4;
  }

  .jd-pena-collage-capes img {
    object-position: center 22%;
  }

  .jd-parallax-row .jd-photo-item {
    flex: 0 0 clamp(220px, 28vw, 320px);
    height: clamp(200px, 24vw, 280px);
    border-radius: 2px;
  }

  /* ── FOOD PARALLAX FILM STRIPS ── */
  .jd-parallax-film-strips {
    overflow: hidden;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-top: 8px;
  }

  .jd-parallax-film-strips--bleed {
    overflow: visible;
    width: 100vw;
    max-width: none;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    gap: 20px;
  }

  .jd-parallax-film-row-wrap {
    width: 100%;
    overflow: hidden;
  }

  .jd-parallax-film-strips--bleed .jd-parallax-film-row-wrap {
    overflow: visible;
  }

  .jd-parallax-film-row {
    display: flex;
    width: max-content;
    will-change: transform;
    gap: 20px;
  }

  .jd-parallax-film-unit {
    position: relative;
    flex-shrink: 0;
    width: min(94vw, 1520px);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .jd-parallax-film-body {
    position: relative;
    width: 100%;
    line-height: 0;
  }

  .jd-parallax-film-frames {
    position: absolute;
    inset: 0;
    z-index: 0;
    display: grid;
    gap: 1.1%;
    padding: 0 0.8%;
    align-items: stretch;
  }

  .jd-parallax-film-labels {
    display: grid;
    gap: 1.1%;
    padding: 0 0.8%;
    width: 100%;
  }

  .jd-parallax-film-label {
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--gold-pale);
    text-align: center;
    line-height: 1.35;
    padding: 0 4px;
  }

  .jd-parallax-film-overlay {
    position: relative;
    z-index: 1;
    display: flex;
    width: 100%;
    pointer-events: none;
    user-select: none;
  }

  .jd-parallax-film-overlay img {
    display: block;
    width: 50%;
    height: auto;
    flex: 0 0 50%;
  }

  .jd-parallax-film-overlay--flip img {
    transform: scaleY(-1);
  }

  .jd-parallax-film-frame.jd-photo-item {
    border-radius: 0;
    height: 100%;
    min-height: 0;
    aspect-ratio: auto;
  }

  .jd-parallax-film-frame.jd-photo-item img {
    object-fit: cover;
  }

  @media (max-width: 768px) {
    .jd-parallax-film-unit {
      width: min(94vw, 920px);
    }
  }

  .jd-sticky-zoom-wrap {
    position: relative;
  }

  .jd-sticky-zoom-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: start;
  }

  .jd-sticky-zoom-media {
    position: sticky;
    top: 14vh;
    height: min(72vh, 560px);
    overflow: hidden;
    border-radius: 3px;
  }

  .jd-sticky-zoom-media .jd-photo-item {
    height: 100%;
    min-height: min(72vh, 560px);
  }

  .jd-sticky-zoom-media--compact {
    height: min(58vh, 480px);
    top: 10vh;
  }

  .jd-sticky-zoom-media--compact .jd-photo-item {
    min-height: min(58vh, 480px);
  }

  .jd-jeronimos-intro.jd-sticky-zoom-wrap {
    min-height: auto;
  }

  .jd-jeronimos-intro .jd-sticky-zoom-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(32px, 5vw, 52px);
    align-items: center;
  }

  .jd-jeronimos-intro .jd-sticky-zoom-media--compact {
    position: relative;
    top: auto;
    height: auto;
    max-height: none;
    overflow: visible;
  }

  .jd-jeronimos-intro .jd-sticky-zoom-media--compact .jd-photo-item {
    border-radius: 3px;
  }

  .jd-jeronimos-intro .jd-sticky-zoom-media--compact .jd-photo-item {
    width: 100%;
    aspect-ratio: 4 / 5;
    height: auto;
    min-height: 0;
    max-height: min(68vh, 540px);
  }

  .jd-jeronimos-intro .jd-sticky-zoom-copy {
    padding-top: 0;
    padding-bottom: 0;
  }

  .jd-jeronimos-gallery {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    width: 100%;
    max-width: 1080px;
    margin: 48px auto 0;
    align-items: stretch;
  }

  .jd-jeronimos-gallery .jd-photo-item {
    width: 100%;
    aspect-ratio: 4 / 5;
    height: auto;
    min-height: 0;
  }

  .jd-jeronimos-gallery .jd-photo-item img {
    object-fit: cover;
  }

  .jd-jeronimos-gallery .jd-photo-item--contain {
    background: #0c0c0c;
  }

  .jd-jeronimos-gallery .jd-photo-item--contain img {
    object-fit: contain;
  }

  @media (max-width: 900px) {
    .jd-jeronimos-gallery {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .jd-jeronimos-intro .jd-sticky-zoom-grid {
      grid-template-columns: 1fr;
    }
    .jd-jeronimos-intro .jd-sticky-zoom-media--compact .jd-photo-item {
      max-height: none;
      aspect-ratio: 16 / 10;
    }
    .jd-jeronimos-gallery {
      grid-template-columns: 1fr;
      max-width: 360px;
    }
  }

  .jd-word-reveal {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.65rem, 3.5vw, 2.4rem);
    font-style: italic;
    line-height: 1.35;
    color: var(--gold-pale);
    margin: 28px 0 0;
  }

  .jd-word-reveal-word {
    display: inline-block;
    position: relative;
    margin-right: 0.28em;
    white-space: pre;
  }

  .jd-word-reveal-ghost {
    opacity: 0.22;
  }

  .jd-word-reveal-live {
    position: absolute;
    left: 0;
    top: 0;
    color: var(--gold-lt);
  }

  /* ── ACCENT RULE ── */
  .jd-rule {
    height: 1px;
    background: linear-gradient(to right, transparent, var(--gold), transparent);
    margin: 0 auto;
  }

  /* ── SECTION HEADERS ── */
  .jd-kicker {
    font-size: 0.62rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--gold);
    display: inline-block;
    margin-bottom: 12px;
    padding: 5px 12px 5px 10px;
    border: 1px solid rgba(201,151,42,0.28);
    border-left: 3px solid var(--gold);
    background: rgba(0,0,0,0.22);
  }

  .jd-chapter-nav {
    background: linear-gradient(180deg, var(--burg) 0%, #3a0c18 100%);
    padding: 14px clamp(18px, 5vw, 80px) 18px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    border-top: 1px solid rgba(201,151,42,0.2);
    position: relative;
  }

  .jd-chapter-nav::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 7px;
    background:
      repeating-linear-gradient(90deg, rgba(250,245,236,0.1) 0 5px, transparent 5px 13px),
      #050505;
    transform: translateY(-100%);
  }

  .jd-chapter-btn {
    background: rgba(0,0,0,0.2);
    border: 1px solid rgba(201,151,42,0.22);
    color: var(--gold-pale);
    font-family: 'Jost', sans-serif;
    font-size: 0.66rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 6px 12px;
    border-radius: 2px;
    cursor: none;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .jd-chapter-btn:hover {
    border-color: var(--gold);
    color: var(--gold-lt);
    background: rgba(201,151,42,0.1);
  }

  .jd-chapter-btn-frame {
    font-size: 0.58rem;
    letter-spacing: 0.12em;
    color: var(--gold);
    opacity: 0.85;
  }

  .jd-h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.8rem, 5vw, 4.5rem);
    font-weight: 300;
    line-height: 1.05;
    letter-spacing: -0.01em;
    color: var(--cream);
  }

  .jd-h2 em {
    font-style: italic;
    color: var(--pink-lt);
  }

  .jd-body {
    font-size: 1rem;
    line-height: 1.8;
    color: rgba(250,245,236,0.82);
    font-weight: 300;
  }

  /* ── COOKING CARDS ── */
  .jd-dish-card {
    border: 1px solid rgba(201,151,42,0.2);
    border-radius: 4px;
    overflow: hidden;
    background: rgba(255,255,255,0.03);
    transition: border-color 0.3s ease;
  }

  .jd-dish-card:hover {
    border-color: rgba(201,151,42,0.5);
  }

  .jd-dish-photo {
    position: relative;
    width: 100%;
    aspect-ratio: 4/3;
    overflow: hidden;
    background: rgba(107,26,42,0.08);
    display: block;
  }

  .jd-dish-photo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    display: block;
  }

  .jd-cooking-class {
    max-width: 1040px;
    margin: 0 auto;
  }

  .jd-cooking-intro {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.15rem, 2.2vw, 1.35rem);
    line-height: 1.75;
    color: var(--ink-soft);
    font-style: italic;
    margin: 0 0 32px;
    max-width: 720px;
  }

  .jd-cooking-moments {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 56px;
  }

  .jd-cooking-moments .jd-photo-item {
    width: 100%;
    aspect-ratio: 4 / 5;
    height: auto;
    min-height: 0;
  }

  .jd-cooking-moments .jd-photo-item img {
    object-fit: cover;
  }

  .jd-cooking-dishes-label {
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${C.burgundy};
    margin-bottom: 20px;
    display: block;
  }

  .jd-cooking-dishes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    .jd-cooking-moments {
      grid-template-columns: 1fr;
      max-width: 360px;
      margin-left: auto;
      margin-right: auto;
    }
    .jd-cooking-dishes {
      grid-template-columns: 1fr;
    }
  }

  /* ── KARAOKE ── */
  .jd-karaoke-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  .jd-karaoke-cartoon-note {
    font-size: 0.88rem;
    font-style: italic;
    color: rgba(250, 245, 236, 0.78);
    line-height: 1.75;
    margin-top: 16px;
    max-width: 36rem;
  }

  .jd-karaoke-cartoon.jd-photo-item {
    width: 100%;
    aspect-ratio: 1024 / 617;
    height: auto;
    min-height: 0;
    border: 1px solid rgba(201, 151, 42, 0.35);
    box-shadow: 0 24px 56px rgba(0, 0, 0, 0.32);
    background: rgba(10, 8, 12, 0.35);
  }

  .jd-karaoke-cartoon.jd-photo-item img {
    object-fit: contain;
    background: rgba(10, 8, 12, 0.2);
  }

  .jd-karaoke-cartoon-stage {
    position: relative;
  }

  .jd-karaoke-cartoon-frame {
    position: relative;
    overflow: hidden;
    width: 100%;
    aspect-ratio: 1024 / 617;
    border: 1px solid rgba(201, 151, 42, 0.35);
    border-radius: 4px;
    background: rgba(10, 8, 12, 0.35);
    box-shadow: 0 24px 56px rgba(0, 0, 0, 0.32);
    animation: jd-karaoke-frame-glow 5.5s ease-in-out infinite;
  }

  @keyframes jd-karaoke-frame-glow {
    0%, 100% { box-shadow: 0 24px 56px rgba(0, 0, 0, 0.32), 0 0 0 rgba(232, 160, 175, 0); }
    45% { box-shadow: 0 26px 58px rgba(0, 0, 0, 0.34), 0 0 28px rgba(232, 160, 175, 0.22); }
  }

  .jd-karaoke-cartoon-media {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .jd-karaoke-cartoon-media img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    will-change: transform;
  }

  .jd-karaoke-neon-glow {
    position: absolute;
    inset: 0;
    pointer-events: none;
    mix-blend-mode: screen;
    opacity: 0.2;
  }

  .jd-karaoke-neon-glow--pink {
    background:
      radial-gradient(circle at 16% 38%, rgba(255, 120, 180, 0.42), transparent 44%),
      radial-gradient(circle at 78% 24%, rgba(255, 95, 155, 0.28), transparent 40%);
    animation: jd-karaoke-neon-pulse 4.8s ease-in-out infinite;
  }

  .jd-karaoke-neon-glow--gold {
    background:
      radial-gradient(circle at 88% 58%, rgba(232, 192, 96, 0.38), transparent 46%),
      radial-gradient(circle at 52% 82%, rgba(201, 151, 42, 0.22), transparent 42%);
    animation: jd-karaoke-neon-pulse 5.6s ease-in-out infinite;
    animation-delay: 2.2s;
  }

  @keyframes jd-karaoke-neon-pulse {
    0%, 100% { opacity: 0.12; }
    40% { opacity: 0.52; }
    68% { opacity: 0.22; }
  }

  .jd-karaoke-screen-flicker {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(118deg, transparent 42%, rgba(255, 252, 245, 0.07) 50%, transparent 58%);
    opacity: 0;
    animation: jd-karaoke-shimmer 9s ease-in-out infinite;
  }

  @keyframes jd-karaoke-shimmer {
    0%, 86%, 100% { opacity: 0; transform: translateX(-12%); }
    91% { opacity: 0.45; transform: translateX(10%); }
  }

  .jd-karaoke-vignette-pulse {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(circle at center, transparent 52%, rgba(10, 6, 8, 0.28) 100%);
    animation: jd-karaoke-vignette 6.5s ease-in-out infinite;
  }

  @keyframes jd-karaoke-vignette {
    0%, 100% { opacity: 0.35; }
    50% { opacity: 0.65; }
  }

  @media (max-width: 900px) {
    .jd-karaoke-layout {
      grid-template-columns: 1fr;
      gap: 36px;
    }
  }

  .jd-karaoke-section {
    background: var(--emerald);
    position: relative;
    overflow: hidden;
  }

  /* ── BOAT / FAREWELL ── */
  .jd-farewell {
    background: var(--burg-dk);
    text-align: center;
    padding: 120px 40px 200px;
    position: relative;
  }

  /* ── MAP SVG ── */
  .jd-map-svg {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }

  /* ── BACK LINK ── */
  .jd-back {
    font-size: 0.72rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gold);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    opacity: 0.7;
    transition: opacity 0.2s ease;
  }
  .jd-back:hover { opacity: 1; }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .jd-hero-main { grid-template-columns: 1fr; }
    .jd-hero-header { padding-top: 72px; }
    .jd-hero-name { white-space: normal; font-size: clamp(3.75rem, 18vw, 5.5rem); line-height: 1.05; }
    .jd-hero-left { padding: 32px 20px 48px; }
    .jd-hero-right { padding: 0 16px 40px; }
    .jd-hero-photo { max-height: 42vh; }
    .jd-film-side-cell { width: clamp(44px, 12vw, 72px); }
    .jd-hero-back { left: 20px; top: 20px; }
    .jd-hero-bio .jd-day-btn {
      font-size: 0.68rem;
      padding: 10px 12px;
      line-height: 1.35;
      text-align: left;
    }
    .jd-hero-day-frame { max-width: 100%; }
    .jd-map-section { padding: 60px 30px; }
    .jd-cities-layout { grid-template-columns: 1fr; gap: 40px; }
    .jd-cities-list { padding: 0; gap: 28px; }
    .jd-cities-list-note { max-width: none; }
    .jd-aux-deck-body { padding: 10px 16px 12px; gap: 12px; }
    .jd-chapter-btn {
      font-size: 0.62rem;
      padding: 8px 10px;
    }
    .jd-karaoke-cartoon-note {
      font-size: 0.84rem;
      max-width: none;
    }
  }

  .jd-type-cursor {
    display: inline-block;
    width: 2px;
    height: 0.95em;
    margin-left: 3px;
    vertical-align: text-bottom;
    background: var(--gold-lt);
    animation: jd-type-blink 0.85s step-end infinite;
  }

  @keyframes jd-type-blink {
    50% { opacity: 0; }
  }

  .jd-flag-flash {
    position: fixed;
    inset: 0;
    z-index: 200;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .jd-page.jd-custom-cursor { cursor: auto; }
    .jd-viewfinder,
    .jd-camera-flash { display: none !important; }
    .jd-type-cursor { display: none; }
    .jd-flag-flash { display: none !important; }
    .jd-scroll-progress-wrap { display: none !important; }
    .jd-film-grain { display: none !important; }
    .jd-vignette { display: none !important; }
    .jd-karaoke-neon-glow,
    .jd-karaoke-screen-flicker,
    .jd-karaoke-vignette-pulse,
    .jd-karaoke-cartoon-frame { animation: none !important; }
    .jd-parallax-columns { margin: 0 auto; padding: 0 8px; }
    * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }

  @media (max-width: 900px) {
    .jd-aux-deck-body { padding: 10px 16px 12px; }
    .jd-aux-deck-left { min-width: 0; flex: 1 1 140px; }
    .jd-aux-title { white-space: normal; }
    .jd-aux-sub { white-space: normal; }
    .jd-spotify-embed { width: 100% !important; max-width: 100%; min-width: 0 !important; height: 80px !important; }
    .jd-section-label { display: none; }
    .jd-frame-badge { display: none; }
    .jd-chapter-nav { padding: 12px 16px 16px; }
    .jd-sticky-zoom-grid { grid-template-columns: 1fr; gap: 36px; }
    .jd-sticky-zoom-media,
    .jd-sticky-zoom-media--compact {
      position: relative;
      top: auto;
      height: auto;
      max-height: none;
    }
    .jd-sticky-zoom-media .jd-photo-item,
    .jd-sticky-zoom-media--compact .jd-photo-item {
      min-height: clamp(220px, 52vw, 420px);
      height: auto;
    }
    .jd-parallax-columns--bleed {
      width: 100%;
      max-width: 100%;
      margin-left: 0;
      margin-right: 0;
      overflow: hidden;
    }
    .jd-parallax-columns--bleed .jd-parallax-row-wrap,
    .jd-parallax-columns--bleed .jd-parallax-film-row-wrap {
      overflow: hidden;
    }
    .jd-section--food,
    .jd-section--gallery-bleed {
      overflow: hidden;
    }
    .jd-surf-benfica-layout {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .jd-surf-benfica-stack-hero.jd-photo-item {
      height: clamp(200px, 48vw, 280px);
    }
    .jd-surf-benfica-stack-row .jd-photo-item {
      height: clamp(140px, 36vw, 200px);
    }
    .jd-pena-collage {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
      min-height: 0;
    }
    .jd-pena-collage-hero {
      grid-column: 1 / 3;
      grid-row: 1;
      min-height: clamp(320px, 70vw, 480px);
    }
    .jd-pena-collage-terraces {
      grid-column: 1;
      grid-row: 2;
      min-height: 180px;
    }
    .jd-pena-collage-mist {
      grid-column: 2;
      grid-row: 2;
      min-height: 180px;
    }
    .jd-pena-collage-capes {
      grid-column: 1 / 3;
      grid-row: 3;
      min-height: 220px;
    }
  }
`;

/* ─── INTRO FLASH + TYPEWRITER ─────────────────────────────────────────────── */
function readPrefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(readPrefersReducedMotion);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function PortugalIntroFlash() {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState(reduced ? "done" : "green");

  useEffect(() => {
    if (reduced) return;
    const toRed = window.setTimeout(() => setPhase("red"), 650);
    const toFade = window.setTimeout(() => setPhase("fade"), 1300);
    const done = window.setTimeout(() => setPhase("done"), 2000);
    return () => {
      window.clearTimeout(toRed);
      window.clearTimeout(toFade);
      window.clearTimeout(done);
    };
  }, [reduced]);

  if (phase === "done") return null;

  const bg = phase === "red" || phase === "fade" ? C.ptRed : C.ptGreen;
  const opacity = phase === "fade" ? 0 : phase === "green" || phase === "red" ? 0.42 : 0;

  return (
    <motion.div
      className="jd-flag-flash"
      aria-hidden="true"
      initial={false}
      animate={{ opacity, backgroundColor: bg }}
      transition={{
        opacity: { duration: phase === "fade" ? 0.7 : 0.35, ease: "easeInOut" },
        backgroundColor: { duration: 0.25 },
      }}
    />
  );
}

function useTypewriter(text, speedMs = 28, active = true) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;
    let i = 0;
    let tick;
    const delay = window.setTimeout(() => {
      setDisplayed("");
      setDone(false);
      tick = window.setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          window.clearInterval(tick);
          setDone(true);
        }
      }, speedMs);
    }, 400);
    return () => {
      window.clearTimeout(delay);
      if (tick) window.clearInterval(tick);
    };
  }, [text, speedMs, active]);

  if (!active) {
    return { displayed: text, done: true };
  }

  return { displayed, done };
}

function HeroTagline() {
  const reduced = usePrefersReducedMotion();
  const { displayed, done } = useTypewriter(me.taglineTyped, 28, !reduced);

  if (reduced) {
    return (
      <p className="jd-body" style={{ marginBottom: 24 }}>
        {me.taglineLead}
        {me.taglineTyped}
        {me.taglineEnd}
      </p>
    );
  }

  return (
    <p className="jd-body" style={{ marginBottom: 24, minHeight: "4.5em" }}>
      <span>{me.taglineLead}</span>
      <span>{displayed}</span>
      {!done && <span className="jd-type-cursor" aria-hidden="true" />}
      {done && <span>{me.taglineEnd}</span>}
    </p>
  );
}

/* ─── DATA ──────────────────────────────────────────────────────────────────── */
const me = {
  name: "Jaimee Douglas",
  academicLine: "Senior · AMP · MIS · Accounting",
  hometown: "Birmingham, AL & Plano, TX",
  taglineLead: "Singer at heart. ",
  taglineTyped:
    "I came to Portugal for the curriculum and left with something I didn't expect",
  taglineEnd: ": myself, a little more fully.",
};

const BLOG_POSTS = [
  {
    id: "blog-cooking",
    kicker: "Entry one",
    title: "Aprons, Accidents, and Authentic Flavor",
    subtitle: "My Portuguese cooking class adventure",
    blurb: "Michelin-star chefs, sopa de legumes, and a Pica-Pau plot twist.",
    readTime: "6 min read",
    scrollTarget: "cooking-class",
    paragraphs: [
      `If you told me a year ago that I'd be standing in a kitchen in Porto learning how to cook authentic Portuguese food alongside Michelin-star chefs, I probably would've laughed. But here we are, and honestly? It might be one of the best things I've done on this trip.`,
      `As part of my study abroad experience, I had the chance to take a cooking class hosted by Chef Vetor and Chef Jorge. It was so much more than following a recipe: flour on my hands, broken Portuguese on my lips, and the smell of something incredible rising from the stove.`,
      `Sopa de Legumes is a silky, comforting Portuguese vegetable cream soup. Vegetarian-friendly and honestly one of the most satisfying things I've eaten on this trip. Simple ingredients, but the technique made all the difference.`,
      `The base is built from cucumbers, potatoes, onions, sweet potatoes, and cauliflower, all slowly cooked down and blended into a velvety cream. Chef Vetor and Chef Jorge walked us through building flavor layer by layer, explaining why each vegetable was added when it was and how the order of cooking affects the final depth.`,
      `No meat, no heavy seasoning: just fresh produce and technique. Every spoonful was smooth, warm, and grounding. This one is absolutely going into my regular rotation back home.`,
      `Pica-Pau is a Portuguese tavern classic: tender marinated meat with crusty bread for dipping into the sauce. The kind of dish made to be shared over good conversation, and it absolutely delivered.`,
      `Now for the inside scoop. That dish was not originally mine to make. One who shall not be named was stationed at the stove with it while I worked on my soup. I wasn't getting many good pictures at my station, so I asked if I could borrow his pot for a few photos (a quick "yes, I totally made this" moment for the blog). He said yes. I got my shots, turned around to hand things back, and he was gone.`,
      `Chef Vetor looked at me. I looked at the pot. Without missing a beat he kept instructing me on how to finish the dish. So I finished it. And honestly? Everyone loved it. You're welcome, one who shall not be named.`,
      `What I didn't expect was how much intention goes into Portuguese cooking. They didn't just teach recipes; they taught philosophy: why ingredients are paired, how Pica-Pau evolved from tavern culture, and how food in Portugal carries centuries of history in every bite.`,
      `Cooking with Michelin-star chefs sounds intimidating, and I'd be lying if I said I didn't have a few Gordon Ramsay flashbacks walking in. But Chef Vetor and Chef Jorge could not have been warmer. If you ever get a local cooking class abroad, especially with people who are truly passionate about their cuisine, do not hesitate.`,
    ],
  },
  {
    id: "blog-surf",
    kicker: "Entry two",
    title: "Thrilling, Terrifying, Unforgettable",
    subtitle: "My first surf experience in Portugal",
    blurb: "Alabama roots, Atlantic waves, and a guide named Tino who carried my board.",
    readTime: "5 min read",
    scrollTarget: "surf-benfica",
    paragraphs: [
      `I want to be upfront: I am not a surfer. I grew up in Alabama. The closest thing to a wave I'd experienced was a lazy river. So when I found out surfing is one of Portugal's most beloved pastimes, and that the Atlantic coast produces some of the most legendary waves in the world, I knew I had to try it.`,
      `Portugal has been a surf mecca for decades. The western coastline faces the full force of the Atlantic, generating powerful, consistent swells year-round. Nazaré holds the world record for the largest wave ever surfed. Peniche, Ericeira, Cascais: pilgrimage sites for surfers across the globe. Ericeira is even Europe's only World Surfing Reserve.`,
      `For me, it started much smaller. A beginner lesson. A foam board. And a whole lot of falling. My instructor was patient in the way that only someone who has watched a hundred first-timers wipe out can be: calm, encouraging, and very good at pretending not to laugh.`,
      `But here's the thing about surfing that nobody really tells you. It's deeply meditative. You're sitting in the water between sets, the ocean stretching out in front of you, and for a moment everything else quiets down. No inbox, no agenda, no noise. Just water and sky and the rhythm of something much older and much larger than you.`,
      `The Portuguese have a word, saudade, that describes a kind of longing. Out on the water, I think I understood it for the first time.`,
      `I didn't catch many waves. But I caught something better: a new way of being present.`,
      `Shoutout to Tino, who is depicted in my photos and who kindly carried my board back to the van when my arms gave up. The boards are low-key extremely heavy. Thank you, Tino.`,
      `If you're studying abroad in Portugal and you're on the fence about trying to surf: go. You don't have to be good. You just have to show up.`,
    ],
  },
  {
    id: "blog-belem",
    kicker: "Entry three",
    title: "Uncover Lisbon's Belém",
    subtitle: "Astounding secrets of a forgotten empire",
    blurb: "Jerónimos, Diogo Cão, Prince Henry, and the Monument of the Discoveries.",
    readTime: "6 min read",
    scrollTarget: "monastery",
    paragraphs: [
      `There are cities you visit, and then there are cities that visit you back. Lisbon is the latter. I had done my research before arriving. I knew Portugal had once been one of the most powerful seafaring empires on earth. But knowing something intellectually and standing inside it are two entirely different experiences. Belém taught me that.`,
      `Belém is a waterfront neighborhood on the edge of Lisbon, where Portugal's great explorers once departed into the unknown. Walking through it felt like moving through a living archive.`,
      `Our first stop was the Jerónimos Monastery, a UNESCO World Heritage Site that stopped me in my tracks. The Manueline architecture is unlike anything I had seen before: stone carved with ropes, coral, armillary spheres, and sea creatures, as if the building itself is telling you it was built by a people obsessed with the ocean. Inside, the silence asks something of you. You slow down. You look up. You stay longer than you planned.`,
      `The moment that truly stayed with me came inside the adjoining museum, in front of a depiction of the Portuguese explorer Diogo Cão. He is shown erecting a stone pillar, a padrão, on the Atlantic coast of Africa during the 15th-century Age of Discoveries. Portugal used these pillars to mark newly claimed territories as explorers pushed further into uncharted waters.`,
      `What struck me was how deliberate and defiant the act was. This was not just navigation. This was declaration. Diogo Cão was among the first Europeans to explore the western coast of Africa, sailing further south than anyone before him. At each significant arrival he stopped and built something permanent: a stone pillar bearing the Portuguese coat of arms, left on foreign soil as proof that someone had been bold enough to come this far.`,
      `We also learned about Infante D. Henrique, Prince Henry the Navigator, whose patronage and obsession with maritime exploration set the entire Age of Discoveries in motion. He never sailed on the great voyages himself, but without him, they likely never happen.`,
      `We ended the day at the Monument of the Discoveries, standing at the edge of the Tagus River. The monument is massive: Henry the Navigator at the bow with 32 historical figures behind him, all leaning forward, all facing the sea.`,
      `Study abroad has a way of doing this to you. You sign up expecting to learn, and you do, but not always in the ways you anticipated. Sometimes the lesson is a painting of a man planting a pillar in foreign soil. Sometimes it's the silence inside a monastery that has stood for five centuries. Sometimes it's just the river, and the weight of everything it has carried.`,
      `Lisbon will visit you back. Go let it.`,
    ],
  },
];

const FERNANDO_PESSOA = {
  title: "Fernando Pessoa · Poems",
  quote: "I am the size of whatever I see.",
  note: "I bought this book in Portugal and have been carrying it home in my bag ever since. Pessoa wrote as dozens of different personas; this line stopped me in a bookstore aisle because it felt like study abroad in one sentence: you grow or shrink depending on what you are paying attention to.",
  cover: "/students/jaimee-douglas/pessoa-book.png",
};

const HERO_PHOTO = "/students/jaimee-douglas/hero-portrait.png";
const FILM_STRIP_SRC = "/students/jaimee-douglas/film-strip-full.png";
const FAVORITE_DAY_FRAME_SRC = "/students/jaimee-douglas/film-frame-single.png";
const FILM_STRIP_SIDE_SRC = "/students/jaimee-douglas/film-strip-side.png";
const FILM_BASE = "/students/jaimee-douglas/film";

/** 20 trip photos — people spaced so no two portraits sit side-by-side on any strip. */
const FILM_STRIP_PHOTOS = {
  top: [
    { src: `${FILM_BASE}/stained-glass.jpg`, alt: "Rose window at Jerónimos Monastery" },
    { src: `${FILM_BASE}/boat-portrait.jpg`, alt: "Jaimee on the Douro River" },
    { src: `${FILM_BASE}/benfica-flares.jpg`, alt: "SL Benfica stadium at night" },
    { src: `${FILM_BASE}/museum-portrait.jpg`, alt: "Jaimee at the Maritime Museum" },
    { src: `${FILM_BASE}/discovery-map.jpg`, alt: "Age of Discovery map exhibit" },
  ],
  bottom: [
    { src: `${FILM_BASE}/surf-lesson.jpg`, alt: "Surf lesson on Porto beach" },
    { src: `${FILM_BASE}/compass-panel.jpg`, alt: "Wind rose of Brazil, c. 1560" },
    { src: `${FILM_BASE}/surf-portrait.jpg`, alt: "Jaimee with surfboard" },
    { src: `${FILM_BASE}/maritime-painting.jpg`, alt: "Privateering in the Mediterranean" },
    { src: `${FILM_BASE}/peacock.jpg`, alt: "Peacock at Pena Palace gardens" },
  ],
  left: [
    { src: `${FILM_BASE}/cassette-door.jpg`, alt: "Vintage cassette tape door in Lisbon" },
    { src: `${FILM_BASE}/boat-portrait-c.jpg`, alt: "Portrait on the river cruise" },
    { src: `${FILM_BASE}/chapel-interior.jpg`, alt: "Coimbra University chapel organ" },
    { src: `${FILM_BASE}/friends-boat.jpg`, alt: "Friends on the farewell boat ride" },
    { src: `${FILM_BASE}/map-hall.jpg`, alt: "Cartography hall at Jerónimos" },
  ],
  right: [
    { src: `${FILM_BASE}/surf-beach.jpg`, alt: "Jaimee at Porto Surf School" },
    { src: `${FILM_BASE}/discovery-map-b.jpg`, alt: "Historic portolan chart" },
    { src: `${FILM_BASE}/boat-portrait-d.jpg`, alt: "Golden hour on the water" },
    { src: `${FILM_BASE}/night-boat.jpg`, alt: "Porto skyline from the Douro at night" },
    { src: `${FILM_BASE}/boat-portrait-b.jpg`, alt: "River cruise portrait" },
  ],
};

const SIGN_QUILL_EASE = [0.33, 0.02, 0.15, 1];
const SIGN_QUILL_DURATION = 2.35;

/** Per-letter timing — slight pause before the surname reads like a signature. */
const SIGNATURE_LETTERS = (() => {
  const items = [];
  let t = 0.05;
  const pushChars = (word, em, step = 0.1) => {
    for (const c of word) {
      items.push({ c, em, delay: t });
      t += step;
    }
  };
  pushChars("Jaimee", false, 0.1);
  t += 0.12;
  items.push({ c: "\u00A0", em: false, delay: t });
  t += 0.14;
  pushChars("Douglas", true, 0.11);
  return items;
})();

const SIGN_COMPLETE_MS = Math.ceil((SIGNATURE_LETTERS.at(-1).delay + 0.45) * 1000);

function QuillNibIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M6 26 L14 8 L18 10 L10 28 Z"
        fill={C.goldPale}
        stroke={C.gold}
        strokeWidth="0.8"
      />
      <path d="M14 8 L22 4 L20 12 L14 10 Z" fill={C.cream} stroke={C.gold} strokeWidth="0.6" opacity="0.9" />
      <circle cx="22" cy="4.5" r="1.2" fill={C.goldLt} />
    </svg>
  );
}

const CURSOR_TARGETS =
  'a, button, [role="button"], input, textarea, select, summary, .jd-photo-item--has-caption, .jd-chapter-btn, .jd-day-btn, .jd-map-pin, .jd-blog-card';

function readCursorEnabled() {
  if (typeof window === "undefined") return false;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touch = window.matchMedia("(hover: none)").matches;
  return !reduced && !touch;
}

function FilmCameraCursor() {
  const [enabled] = useState(readCursorEnabled);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(enabled);
  const [snapping, setSnapping] = useState(false);
  const [flash, setFlash] = useState(null);
  const viewX = useSpring(0, { stiffness: 420, damping: 38, mass: 0.45 });
  const viewY = useSpring(0, { stiffness: 420, damping: 38, mass: 0.45 });
  const snapTimer = useRef(null);
  const lastFlashAt = useRef(0);
  const welcomeFlashDone = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const heroFlashPoint = () => ({
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.38,
    });

    const { x: startX, y: startY } = heroFlashPoint();
    viewX.set(startX);
    viewY.set(startY);

    const welcomeTimer = window.setTimeout(() => {
      if (welcomeFlashDone.current) return;
      welcomeFlashDone.current = true;
      const { x, y } = heroFlashPoint();
      viewX.set(x);
      viewY.set(y);
      setSnapping(true);
      if (snapTimer.current) window.clearTimeout(snapTimer.current);
      snapTimer.current = window.setTimeout(() => setSnapping(false), 150);
      lastFlashAt.current = Date.now();
      setFlash({ id: Date.now(), x, y, welcome: true });
    }, 2400);

    const move = (e) => {
      if (!visible) setVisible(true);
      viewX.set(e.clientX);
      viewY.set(e.clientY);
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setActive(Boolean(el?.closest(CURSOR_TARGETS)));
    };

    const down = (e) => {
      const el = e.target;
      if (!el?.closest(CURSOR_TARGETS)) return;

      const now = Date.now();
      if (now - lastFlashAt.current < 550) return;
      lastFlashAt.current = now;

      setSnapping(true);
      if (snapTimer.current) window.clearTimeout(snapTimer.current);
      snapTimer.current = window.setTimeout(() => setSnapping(false), 120);

      setFlash({
        id: now,
        x: e.clientX,
        y: e.clientY,
      });
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);

    return () => {
      window.clearTimeout(welcomeTimer);
      if (snapTimer.current) window.clearTimeout(snapTimer.current);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
    };
  }, [enabled, viewX, viewY, visible]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className={`jd-viewfinder${active ? " jd-viewfinder--active" : ""}${snapping ? " jd-viewfinder--snap" : ""}`}
        style={{ x: viewX, y: viewY, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
        aria-hidden="true"
      >
        <span className="jd-viewfinder-corner jd-viewfinder-corner--tl" />
        <span className="jd-viewfinder-corner jd-viewfinder-corner--tr" />
        <span className="jd-viewfinder-corner jd-viewfinder-corner--bl" />
        <span className="jd-viewfinder-corner jd-viewfinder-corner--br" />
        <span className="jd-viewfinder-reticle" />
        <span className="jd-viewfinder-dot" />
      </motion.div>

      <AnimatePresence>
        {flash && (
          <motion.div
            key={`flash-${flash.id}`}
            className={`jd-camera-flash${flash.welcome ? " jd-camera-flash--welcome" : ""}`}
            style={{ left: flash.x, top: flash.y }}
            initial={{ opacity: flash.welcome ? 0.88 : 0.44, scale: flash.welcome ? 0.82 : 0.92 }}
            animate={{ opacity: 0, scale: flash.welcome ? 1.38 : 1.14 }}
            transition={{ duration: flash.welcome ? 0.82 : 0.68, ease: "easeOut" }}
            onAnimationComplete={() =>
              setFlash((current) => (current?.id === flash.id ? null : current))
            }
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}

function SignatureHeroName({ play, onComplete }) {
  const reduced = usePrefersReducedMotion();
  const [run, setRun] = useState(() => (play && !reduced ? 1 : 0));
  const [signing, setSigning] = useState(() => play && !reduced);
  const wasPlay = useRef(play);

  useEffect(() => {
    if (reduced) return;

    const frame = window.requestAnimationFrame(() => {
      if (play && !wasPlay.current) {
        setSigning(true);
        setRun((r) => r + 1);
      }
      if (!play) setSigning(false);
      wasPlay.current = play;
    });

    return () => window.cancelAnimationFrame(frame);
  }, [play, reduced]);

  useEffect(() => {
    if (reduced) onComplete?.();
  }, [reduced, onComplete]);

  useEffect(() => {
    if (!signing || reduced) return;
    const timer = window.setTimeout(() => {
      setSigning(false);
      onComplete?.();
    }, SIGN_COMPLETE_MS);
    return () => window.clearTimeout(timer);
  }, [signing, run, reduced, onComplete]);

  const staticName = (
    <h1 className="jd-hero-name">
      Jaimee <em>Douglas</em>
    </h1>
  );

  if (reduced) return staticName;
  if (!play && !signing) return <div className="jd-signature-wrap">{staticName}</div>;

  return (
    <div className="jd-signature-wrap">
      <motion.h1
        key={`sign-${run}`}
        className="jd-hero-name jd-hero-name--animate"
        aria-label="Jaimee Douglas"
      >
        {SIGNATURE_LETTERS.map((letter, i) => {
          const letterProps = {
            key: `${run}-${i}-${letter.c}`,
            className: `jd-signature-letter${letter.em ? " jd-signature-letter--surname" : ""}`,
            initial: { opacity: 0, y: 14, x: -10, filter: "blur(5px)" },
            animate: { opacity: 1, y: 0, x: 0, filter: "blur(0px)" },
            transition: {
              delay: letter.delay,
              duration: 0.38,
              ease: [0.22, 1, 0.32, 1],
            },
          };
          return letter.em ? (
            <motion.em {...letterProps}>{letter.c}</motion.em>
          ) : (
            <motion.span {...letterProps}>{letter.c}</motion.span>
          );
        })}
      </motion.h1>

      <AnimatePresence>
        {signing && (
          <motion.div
            key={`quill-${run}`}
            className="jd-signature-quill"
            initial={{ left: "2%", opacity: 0, rotate: -20, y: 6 }}
            animate={{
              left: "98%",
              opacity: [0, 1, 1, 0],
              rotate: [-20, -12, -8, -4],
              y: [6, 2, 0, -2],
            }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{
              duration: SIGN_QUILL_DURATION,
              ease: SIGN_QUILL_EASE,
              opacity: { times: [0, 0.06, 0.9, 1] },
            }}
            aria-hidden="true"
          >
            <QuillNibIcon />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HeroIdentityHeader({ signatureActive }) {
  const reduced = usePrefersReducedMotion();
  const [chipsReady, setChipsReady] = useState(reduced);
  const showChips = chipsReady || reduced;

  return (
    <header className="jd-hero-header">
      <span className="jd-kicker">UA MIS · Portugal 2026</span>
      <SignatureHeroName
        play={signatureActive}
        onComplete={() => setChipsReady(true)}
      />
      <motion.p
        className="jd-hero-film-quote"
        initial={false}
        animate={{ opacity: showChips ? 1 : 0, y: showChips ? 0 : 8 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        My Life on Film, Say Cheese!
      </motion.p>
      <motion.div
        className="jd-hero-identity-chips"
        initial={false}
        animate={{ opacity: showChips ? 1 : 0, y: showChips ? 0 : 10 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className="jd-meta-chip-wrap">
          <span className="jd-meta-chip-label">Classification / Major</span>
          <span className="jd-meta-chip">{me.academicLine}</span>
        </div>
        <div className="jd-meta-chip-wrap">
          <span className="jd-meta-chip-label">Where I&apos;m from</span>
          <span className="jd-meta-chip">✈ {me.hometown}</span>
        </div>
      </motion.div>
    </header>
  );
}

function FilmStripFrames({ photos, orientation }) {
  return (
    <div className={`jd-film-frames jd-film-frames--${orientation}`}>
      {photos.map((photo) => (
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          className="jd-film-frame-photo"
          loading="lazy"
        />
      ))}
    </div>
  );
}

function FilmStripRow({ photos, flip = false }) {
  return (
    <div className={`jd-film-strip-wrap${flip ? " jd-film-strip-wrap--row-bottom" : " jd-film-strip-wrap--row-top"}`}>
      <FilmStripFrames photos={photos} orientation="row" />
      <img
        src={FILM_STRIP_SRC}
        alt=""
        className="jd-film-strip jd-film-strip-overlay"
        aria-hidden="true"
      />
    </div>
  );
}

function FilmStripColumn({ photos }) {
  return (
    <div className="jd-film-strip-wrap jd-film-strip-wrap--side">
      <FilmStripFrames photos={photos} orientation="col" />
      <img
        src={FILM_STRIP_SIDE_SRC}
        alt=""
        className="jd-film-strip jd-film-strip-overlay jd-film-strip--side"
        aria-hidden="true"
      />
    </div>
  );
}

function HeroFilmPortrait({ src, alt }) {
  return (
    <div className="jd-hero-film-stack">
      <div className="jd-film-side-cell jd-film-side-cell--left">
        <FilmStripColumn photos={FILM_STRIP_PHOTOS.left} />
      </div>
      <FilmStripRow photos={FILM_STRIP_PHOTOS.top} />
      <div className="jd-hero-film-photo">
        <img
          src={src}
          alt={alt}
          className="jd-hero-photo"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentNode.style.minHeight = "280px";
          }}
        />
      </div>
      <FilmStripRow photos={FILM_STRIP_PHOTOS.bottom} flip />
      <div className="jd-film-side-cell jd-film-side-cell--right">
        <FilmStripColumn photos={FILM_STRIP_PHOTOS.right} />
      </div>
    </div>
  );
}

const FAVORITE_DAYS = [
  {
    id: "may6",
    label: "May 6",
    title: "Arrival",
    subtitle: "Lisbon, Portugal",
    tagline: "The city that changed everything.",
    accent: C.royal,
    photo: "/students/jaimee-douglas/favorite-day-may6-lisbon.png",
    photoPosition: "center 40%",
    description: "Landing in Lisbon felt like stepping into a painting I'd been dreaming of. Cobblestones, azulejo tiles, and the smell of pastéis de nata. This city welcomed me like it already knew me.",
  },
  {
    id: "may13",
    label: "May 13",
    title: "Michelin Night",
    subtitle: "Le Monument, Porto",
    tagline: "The dinner that redefined luxury.",
    accent: C.gold,
    photo: "/students/jaimee-douglas/favorite-day-may13-michelin.png",
    photoPosition: "center 45%",
    description: "Sitting in a Michelin-star restaurant in Porto felt like a full-circle moment. Every course was a conversation between flavor and history, and I sat there thinking: this is why you say yes.",
  },
  {
    id: "may18",
    label: "May 18",
    title: "Douro Farewell Cruise",
    subtitle: "Douro River, Porto",
    tagline: "Before I let go.",
    accent: C.emerald,
    photo: "/students/jaimee-douglas/favorite-day-may18-douro.png",
    photoPosition: "center 55%",
    description: "Our last evening on the Douro farewell cruise, the river went dark and the city lights came on. Beyoncé in my ears, bridges glowing ahead of us, and a feeling I was not ready to let go of.",
  },
];

/** Mainland Portugal outline (GeoJSON) projected to SVG viewBox 0 0 400 520 */
const PORTUGAL_MAP_PATH =
  "M88.2,64.8 L125.6,43.2 L167.7,30.9 L193.5,72.3 L254.3,72.2 L272.0,61.6 L332.0,64.5 L360.8,107.0 L313.2,129.9 L311.9,196.0 L295.2,208.4 L291.0,248.4 L246.5,255.4 L287.8,306.1 L259.3,361.8 L294.9,387.0 L280.7,410.0 L242.5,441.7 L251.1,469.8 L209.7,491.8 L155.4,479.9 L102.2,489.2 L118.0,422.9 L108.3,370.8 L62.2,363.0 L37.6,330.9 L45.8,275.5 L86.8,244.7 L94.2,210.5 L115.7,159.6 L113.4,123.7 L92.8,93.3 L88.2,64.8 Z";

const CITIES = [
  { name: "Porto", cx: 130, cy: 126, id: "cooking-class" },
  { name: "Coimbra", cx: 153, cy: 207, id: "pena-palace" },
  { name: "Lisbon", cx: 77, cy: 332, id: "food" },
  { name: "Sintra", cx: 53, cy: 325, id: "pena-palace" },
];

const CITY_ROUTE = ["Porto", "Coimbra", "Lisbon", "Sintra"];

function mapCityLabel(city) {
  switch (city.name) {
    case "Sintra":
      return { x: city.cx + 18, y: city.cy - 14, textAnchor: "start" };
    case "Lisbon":
      return { x: city.cx, y: city.cy + 22, textAnchor: "middle" };
    case "Porto":
      return { x: city.cx, y: city.cy - 20, textAnchor: "middle" };
    default:
      return { x: city.cx, y: city.cy - 16, textAnchor: "middle" };
  }
}

/**
 * Spotify track IDs — verified via open.spotify.com/oembed (May 2026).
 * Embeds play 30s previews without login; full tracks need a free Spotify account.
 */
const SPOTIFY_ID = {
  offTheWall: "44VDzArg0JL2kdiha8CdOz",
  iLikeYou: "0O6u0VJ46W86TxN9wgyqDj",
  tasteBack: "3xClevycpBON8bkyxFbAna",
  ringMyBell: "7GK2KVYH8FrTC9zehmjVMd",
  americanGirls: "7gtG45ieyQzKtNKobfLd49",
  getOnTheFloor: "58OdFNa5XuaMI4qkDvhofP",
  allNight: "7oAuqs6akGnPU3Tb00ZmyM",
  tumblrGirls: "4jBoDiKbZEvjcnQjjiFirg",
  ben: "5ClobDfgyqxz7UM14OVZWs",
  whatOnceWas: "1XrSjpNe49IiygZfzb74pk",
  as: "13toFl1UwJPsRxDiD9jgtn",
  makingsOfYou: "5ogAtObpc75chCFp1cUQsb",
  illTakeCare: "4waPZF96vX1Oz5pzH6dB0h",
  dontYouWorry: "1QvWxgZvTU0w8rlPRE5Zrv",
  beforeILetGo: "7LikBkHerFGZ58QHVOKp1t",
};

const SECTIONS = [
  { id: "hero", label: "Arrival", track: "Off the Wall", artist: "Michael Jackson", spotifyId: SPOTIFY_ID.offTheWall },
  { id: "cities", label: "The Journey", track: "I Like You", artist: "Post Malone ft. Doja Cat", spotifyId: SPOTIFY_ID.iLikeYou },
  { id: "food", label: "Lisbon & Porto", track: "Taste Back", artist: "Harry Styles", spotifyId: SPOTIFY_ID.tasteBack },
  { id: "surf-benfica", label: "Surf & Benfica", track: "Ring My Bell", artist: "Anita Ward", spotifyId: SPOTIFY_ID.ringMyBell },
  { id: "cooking-class", label: "Cooking Class", track: "Get on the Floor", artist: "Michael Jackson", spotifyId: SPOTIFY_ID.getOnTheFloor },
  { id: "monastery", label: "Jerónimos", track: "What Once Was", artist: "Her's", spotifyId: SPOTIFY_ID.whatOnceWas },
  { id: "pena-palace", label: "Pena & Coimbra", track: "Ben", artist: "Michael Jackson", spotifyId: SPOTIFY_ID.ben },
  { id: "karaoke", label: "Karaoke Night", track: "All Night", artist: "Beyoncé", spotifyId: SPOTIFY_ID.allNight },
  { id: "friends", label: "Group moments", track: "American Girls", artist: "Harry Styles", spotifyId: SPOTIFY_ID.americanGirls },
  { id: "pessoa-book", label: "On the shelf", track: "The Makings of You", artist: "Gladys Knight & The Pips", spotifyId: SPOTIFY_ID.makingsOfYou },
  { id: "reflection", label: "On the Water", track: "Don't You Worry 'Bout a Thing", artist: "Stevie Wonder", spotifyId: SPOTIFY_ID.dontYouWorry },
  { id: "bama-blog", label: "Bama Blog", track: "Tumblr Girls", artist: "kobzx2z & mikeeysmind", spotifyId: SPOTIFY_ID.tumblrGirls },
  { id: "farewell", label: "Douro Farewell", track: "Before I Let Go", artist: "Beyoncé", spotifyId: SPOTIFY_ID.beforeILetGo },
];

const SECTION_FRAME = Object.fromEntries(
  SECTIONS.map((s, i) => [s.id, String(i + 1).padStart(2, "0")])
);

const SECTION_SIDE = Object.fromEntries(
  SECTIONS.map((s, i) => [s.id, i % 2 === 0 ? "A" : "B"])
);

function sectionCassetteSide(sectionId) {
  return SECTION_SIDE[sectionId] ?? "A";
}

const CHAPTER_NAV = [
  { label: "The Cities", id: "cities" },
  { label: "Food", id: "food" },
  { label: "Surf & Benfica", id: "surf-benfica" },
  { label: "Cooking Class", id: "cooking-class" },
  { label: "Jerónimos", id: "monastery" },
  { label: "Pena & Coimbra", id: "pena-palace" },
  { label: "Karaoke Night", id: "karaoke" },
  { label: "Group moments", id: "friends" },
  { label: "Book", id: "pessoa-book" },
  { label: "Reflection", id: "reflection" },
  { label: "Bama Blog", id: "bama-blog" },
  { label: "Douro Farewell", id: "farewell" },
];

function spotifyEmbedUrl(trackId) {
  if (!trackId || trackId.length !== 22) return null;
  return `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;
}

const AMBIENT_BY_SECTION = {
  hero: `radial-gradient(ellipse 70% 55% at 22% 40%, ${C.royal}88, ${C.burgundyDk})`,
  cities: `radial-gradient(ellipse 90% 70% at 30% 40%, ${C.royal}99, ${C.burgundyDk})`,
  food: `radial-gradient(ellipse 80% 60% at 60% 50%, ${C.burgundy}aa, ${C.burgundyDk})`,
  "surf-benfica": `radial-gradient(ellipse 85% 65% at 50% 45%, ${C.royal}77, ${C.burgundyDk})`,
  "cooking-class": `radial-gradient(ellipse 90% 70% at 40% 50%, ${C.cream}22, ${C.burgundyDk})`,
  monastery: `radial-gradient(ellipse 85% 65% at 55% 40%, ${C.burgundy}cc, ${C.burgundyDk})`,
  "pena-palace": `radial-gradient(ellipse 90% 70% at 50% 50%, ${C.emerald}99, ${C.burgundyDk})`,
  karaoke: `radial-gradient(ellipse 85% 65% at 45% 45%, ${C.royalLt}88, ${C.burgundyDk})`,
  "bama-blog": `radial-gradient(ellipse 85% 65% at 40% 50%, ${C.gold}33, ${C.burgundyDk})`,
  "pessoa-book": `radial-gradient(ellipse 80% 60% at 60% 40%, ${C.emerald}77, ${C.burgundyDk})`,
  friends: `radial-gradient(ellipse 80% 60% at 50% 50%, ${C.burgundy}bb, ${C.burgundyDk})`,
  reflection: `radial-gradient(ellipse 85% 65% at 50% 40%, ${C.royal}88, ${C.burgundyDk})`,
  farewell: `radial-gradient(ellipse 90% 70% at 50% 60%, ${C.gold}33, ${C.burgundyDk})`,
};

const fadeEase = [0.25, 0.1, 0.25, 1];

function FadeUp({ children, delay = 0, className = "", style = {} }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      transition={{ duration: 0.9, delay, ease: fadeEase }}
    >
      {children}
    </motion.div>
  );
}

/* ─── SPOTIFY STRIP ────────────────────────────────────────────────────────── */
function SectionSoundtrack({ sectionId, light = false, center = false, style = {} }) {
  const sec = SECTIONS.find((s) => s.id === sectionId);
  if (!sec) return null;
  const side = sectionCassetteSide(sectionId);
  return (
    <div
      className={`jd-soundtrack${light ? " jd-soundtrack--light" : ""}${center ? " jd-soundtrack--center" : ""}`}
      style={style}
    >
      <div className="jd-soundtrack-label">Side {side} · Track</div>
      <div className="jd-soundtrack-track">{sec.track} · {sec.artist}</div>
    </div>
  );
}

function AuxDeck({ currentSection }) {
  const sec = SECTIONS.find(s => s.id === currentSection) || SECTIONS[0];
  const frame = SECTION_FRAME[sec.id] ?? "01";
  const side = sectionCassetteSide(sec.id);
  const isApple = Boolean(sec.appleMusicEmbed && !sec.spotifyId);
  const embedSrc = sec.spotifyId ? spotifyEmbedUrl(sec.spotifyId) : sec.appleMusicEmbed ?? null;
  const openHref = sec.openUrl ?? (sec.spotifyId ? `https://open.spotify.com/track/${sec.spotifyId}` : null);
  const openLabel = isApple ? "Open in Apple Music ↗" : "Open in Spotify ↗";
  const previewHint = isApple
    ? "Preview plays here · full song in Apple Music"
    : "Preview plays here · full song with free Spotify";
  return (
    <div className="jd-aux-deck">
      <div className="jd-aux-deck-perfs" aria-hidden="true" />
      <div className="jd-aux-deck-body">
        <div className="jd-aux-deck-left">
          <span className="jd-aux-title">Jaimee&apos;s Aux, No Skips</span>
          <span className="jd-aux-sub">Cassette deck · Side {side} · Portugal 2026</span>
          <span className="jd-frame-badge">
            Scene <em>{frame}</em> · {sec.label}
          </span>
          <span className="jd-now-playing-label">♪ Now playing</span>
        </div>
        <div className="jd-rule" style={{ width: 1, height: 48, background: `rgba(201,151,42,0.3)`, flex: "none" }} />
        <AnimatePresence mode="wait">
          <motion.div
            key={sec.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            style={{ display: "flex", flexDirection: "column", minWidth: 0, maxWidth: 220 }}
          >
            <span className="jd-display" style={{ fontSize: "1rem", fontStyle: "italic", color: C.pinkLt, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {sec.track}
            </span>
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.1em", color: "rgba(250,245,236,0.5)", textTransform: "uppercase" }}>
              {sec.artist}
            </span>
          </motion.div>
        </AnimatePresence>
        <div style={{ flex: 1 }} />
        <AnimatePresence mode="wait">
          <motion.span
            key={sec.id + "-label"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="jd-section-label"
          >
            Reel {frame}
          </motion.span>
        </AnimatePresence>
        <div className="jd-cassette-well">
          <div className="jd-cassette-reels" aria-hidden="true">
            <span className="jd-reel" />
            <span className="jd-reel jd-reel--reverse" />
          </div>
          {embedSrc ? (
            <iframe
              key={`${sec.id}-${embedSrc}`}
              className="jd-spotify-embed"
              src={embedSrc}
              width="300"
              height="152"
              frameBorder="0"
              allow={
                isApple
                  ? "autoplay *; encrypted-media *; fullscreen *"
                  : "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              }
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title={`Play ${sec.track}`}
            />
          ) : (
            <span style={{ fontSize: "0.7rem", color: "rgba(250,245,236,0.5)", display: "block", padding: 24 }}>Track link unavailable</span>
          )}
        </div>
        <div className="jd-aux-meta">
          {openHref && (
            <a
              href={openHref}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: "0.65rem",
                color: "rgba(250,245,236,0.45)",
                letterSpacing: "0.08em",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              {openLabel}
            </a>
          )}
          {embedSrc && (
            <span style={{ fontSize: "0.58rem", color: "rgba(250,245,236,0.35)", letterSpacing: "0.06em", maxWidth: 140, textAlign: "right", lineHeight: 1.35 }}>
              {previewHint}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── BAMA BLOG (accordion) ─────────────────────────────────────────────────── */
function BamaBlogEntries({ openPost, setOpenPost, scrollTo }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 720, margin: "0 auto" }}>
      {BLOG_POSTS.map((post, i) => {
        const open = openPost === i;
        return (
          <article key={post.id} className="jd-blog-card">
            <button
              type="button"
              onClick={() => setOpenPost(open ? -1 : i)}
              aria-expanded={open}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <p className="jd-kicker" style={{ marginBottom: 8 }}>{post.kicker}</p>
                  <h3 className="jd-display" style={{ fontSize: "1.65rem", fontStyle: "italic", color: C.goldLt, lineHeight: 1.2, marginBottom: 6 }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: "0.8rem", color: C.pinkLt, marginBottom: 10 }}>{post.subtitle}</p>
                  <p style={{ fontSize: "0.88rem", lineHeight: 1.65, color: "rgba(250,245,236,0.7)", margin: 0 }}>{post.blurb}</p>
                </div>
                <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
                  <span style={{ fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(250,245,236,0.45)" }}>
                    {post.readTime}
                  </span>
                  <span
                    className="jd-display"
                    style={{
                      fontSize: "1.75rem",
                      color: C.gold,
                      lineHeight: 1,
                      transform: open ? "rotate(45deg)" : "none",
                      transition: "transform 0.3s ease",
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </span>
              </div>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: fadeEase }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="jd-blog-body">
                    {post.paragraphs.map((para, p) => (
                      <p key={p}>{para}</p>
                    ))}
                    <button
                      type="button"
                      onClick={() => scrollTo(post.scrollTarget)}
                      style={{
                        alignSelf: "flex-start",
                        marginTop: 8,
                        background: "transparent",
                        border: `1px solid ${C.gold}`,
                        color: C.goldLt,
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "0.68rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        padding: "8px 14px",
                        borderRadius: 2,
                        cursor: "pointer",
                      }}
                    >
                      See photos on this page →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}

/* ─── PHOTO PLACEHOLDER ────────────────────────────────────────────────────── */
function PhotoSlot({ src, alt, caption, style = {}, className = "", color = C.royal, objectFit = "cover", objectPosition = "center" }) {
  const [showCaption, setShowCaption] = useState(false);
  const itemClass = [
    "jd-photo-item",
    caption ? "jd-photo-item--has-caption" : "",
    showCaption ? "jd-photo-item--show-caption" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={itemClass}
      style={style}
      role={caption ? "button" : undefined}
      tabIndex={caption ? 0 : undefined}
      aria-label={caption ? `${alt}. ${caption}` : alt}
      onClick={caption ? () => setShowCaption((on) => !on) : undefined}
      onKeyDown={
        caption
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setShowCaption((on) => !on);
              }
            }
          : undefined
      }
    >
      <img
        src={src || ""}
        alt={alt}
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling && (e.target.nextSibling.style.display = "flex");
        }}
        style={{ width: "100%", height: "100%", objectFit, objectPosition, display: "block" }}
      />
      <div style={{ display: "none", background: color, width: "100%", height: "100%", minHeight: 200, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: "1.4rem", opacity: 0.3 }}>✦</span>
        <span style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(250,245,236,0.35)" }}>{alt}</span>
      </div>
      {caption && <div className="jd-photo-caption">{caption}</div>}
    </div>
  );
}

const FOOD_PARALLAX_PHOTOS = [
  { src: "/students/jaimee-douglas/food-lisbon-polvo.png", alt: "Grilled octopus with vegetables", caption: "Polvo & vegetables", color: C.gold, objectPosition: "center 55%" },
  { src: "/students/jaimee-douglas/food-lisbon-shrimp.png", alt: "Garlic shrimp in a pan", caption: "Garlic shrimp", color: C.emerald },
  { src: "/students/jaimee-douglas/food-lisbon-octopus-bowl.png", alt: "Octopus and potatoes in a blue bowl", caption: "Octopus & potatoes", color: C.royal, objectPosition: "center 42%" },
  { src: "/students/jaimee-douglas/food-lisbon-grilled-fish.png", alt: "Grilled fish at Duque", caption: "Duque Restaurante", color: C.burgundyLt, objectPosition: "center 40%" },
  { src: "/students/jaimee-douglas/food-porto-seafood-platter.png", alt: "Fine seafood presentation", caption: "Seafood artistry", color: C.pink, objectPosition: "center 35%" },
  { src: "/students/jaimee-douglas/food-porto-michelin.png", alt: "Michelin course in Porto", caption: "Michelin night", color: C.goldLt, objectPosition: "center 38%" },
  { src: "/students/jaimee-douglas/food-porto-breakfast.png", alt: "Breakfast with fried egg in Porto", caption: "Porto mornings", color: C.emeraldLt, objectPosition: "center 45%" },
  { src: "/students/jaimee-douglas/food-lisbon-tacos.png", alt: "Tacos on a wooden board", caption: "Shared plates", color: C.royal, objectPosition: "center 30%" },
  { src: "/students/jaimee-douglas/food-fine-canape.png", alt: "Flower-garnished canapés on a white plate", caption: "Tasting course", color: C.gold, objectPosition: "center 45%" },
  { src: "/students/jaimee-douglas/food-fine-rock-canape.png", alt: "Seafood canapés served on a river stone", caption: "On the rock", color: C.emerald, objectPosition: "center 40%" },
  { src: "/students/jaimee-douglas/food-fine-steak.png", alt: "Steak with relish and green puree on a white plate", caption: "Main course", color: C.burgundyLt, objectPosition: "center 50%" },
  { src: "/students/jaimee-douglas/food-fine-egg-nest.png", alt: "Foamed egg served in a shell on straw", caption: "Egg in the nest", color: C.pink, objectPosition: "center 42%" },
  { src: "/students/jaimee-douglas/food-mcdonalds-portugal.png", alt: "McDonald's logo in Portugal", caption: "McDonald's · Portugal", color: C.emeraldLt, objectPosition: "center center" },
];

const SURF_BENFICA_PHOTOS = {
  hero: { src: "/students/jaimee-douglas/surf-walk-to-water.png", alt: "Walking to the Atlantic with a surfboard", caption: "Walk to the water", color: C.royal, objectPosition: "center 40%" },
  bottom: [
    { src: "/students/jaimee-douglas/surf-porto-school.png", alt: "At Porto Surf School in front of the van", caption: "Porto Surf School", color: C.emerald, objectPosition: "center 35%" },
    { src: "/students/jaimee-douglas/benfica-stadium-night.png", alt: "Benfica stadium packed with fans and flares at night", caption: "Estádio da Luz", color: C.burgundy, objectPosition: "center 30%" },
  ],
};

function PenaCoimbraCollage() {
  return (
    <div className="jd-pena-collage">
      <PhotoSlot
        className="jd-pena-collage-terraces"
        src="/students/jaimee-douglas/pena-palace-terraces.png"
        alt="Pena Palace terraces overlooking Sintra and the sea"
        caption="Above the clouds"
        color={C.emeraldLt}
      />
      <PhotoSlot
        className="jd-pena-collage-mist"
        src="/students/jaimee-douglas/pena-palace-mist.png"
        alt="Pena Palace in the mist with lavender tiles and golden domes"
        caption="Palace in the mist"
        color={C.gold}
        objectPosition="center 40%"
      />
      <PhotoSlot
        className="jd-pena-collage-hero"
        src="/students/jaimee-douglas/pena-coimbra-center.png"
        alt="Chapel interior with a gilded altarpiece, frescoed vaulted ceiling, and visitors in the foreground"
        caption="Universidade de Coimbra"
        color={C.royal}
        objectPosition="center 42%"
      />
      <PhotoSlot
        className="jd-pena-collage-capes"
        src="/students/jaimee-douglas/coimbra-capes.png"
        alt="Students in black capes celebrating on the university stairs"
        caption="Traje académico"
        color={C.burgundy}
      />
    </div>
  );
}

const COOKING_CLASS_MOMENTS = [
  {
    src: "/students/jaimee-douglas/cooking-chef-photo.png",
    alt: "Chef Vetor photographing dishes at the cooking class",
    caption: "Chef capturing our plates",
    color: C.emerald,
    objectPosition: "center 40%",
  },
  {
    src: "/students/jaimee-douglas/cooking-prep-vegetables.png",
    alt: "Peeling sweet potato and squash beside cauliflower at the prep station",
    caption: "Prep station",
    color: C.burgundy,
    objectPosition: "center 35%",
  },
  {
    src: "/students/jaimee-douglas/cooking-garnish-pica-pau.png",
    alt: "Garnishing Pica-Pau while Chef Vetor photographs the dish",
    caption: "Finishing the Pica-Pau",
    color: C.royal,
    objectPosition: "center 42%",
  },
];

const KARAOKE_CARTOON_SRC = "/students/jaimee-douglas/karaoke-cartoon.png";
const KARAOKE_CARTOON_NOTE =
  "Unfortunately, we didn\u2019t manage to capture any pictures that night. So, I provided this cartoon above for you to follow along with. I much prefer to live in the present moment. Some things are meant to be cherished in your mind rather than being captured on your phone.";

function KaraokeCartoonPanel() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const driftY = useTransform(scrollYProgress, [0, 1], [14, -14]);

  if (reduced) {
    return (
      <div className="jd-karaoke-cartoon-stage">
        <PhotoSlot
          className="jd-karaoke-cartoon"
          src={KARAOKE_CARTOON_SRC}
          alt="Illustrated collage of karaoke night in Lisbon, with screens showing Tia Tamera, We Are The Champions, and All Night"
          color={C.royal}
          objectFit="contain"
        />
        <p className="jd-karaoke-cartoon-note">{KARAOKE_CARTOON_NOTE}</p>
      </div>
    );
  }

  return (
    <div ref={ref} className="jd-karaoke-cartoon-stage">
      <motion.div className="jd-karaoke-cartoon-frame" style={{ y: driftY }}>
        <motion.div
          className="jd-karaoke-cartoon-media"
          animate={{
            scale: [1, 1.025, 1.015, 1.03, 1],
            x: [0, -5, 3, -4, 0],
            y: [0, -4, 2, -3, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={KARAOKE_CARTOON_SRC}
            alt="Illustrated collage of karaoke night in Lisbon, with screens showing Tia Tamera, We Are The Champions, and All Night"
            loading="lazy"
          />
        </motion.div>
        <span className="jd-karaoke-neon-glow jd-karaoke-neon-glow--pink" aria-hidden="true" />
        <span className="jd-karaoke-neon-glow jd-karaoke-neon-glow--gold" aria-hidden="true" />
        <span className="jd-karaoke-screen-flicker" aria-hidden="true" />
        <span className="jd-karaoke-vignette-pulse" aria-hidden="true" />
      </motion.div>
      <p className="jd-karaoke-cartoon-note">{KARAOKE_CARTOON_NOTE}</p>
    </div>
  );
}

function SurfBenficaGallery() {
  const { hero, bottom } = SURF_BENFICA_PHOTOS;
  return (
    <div className="jd-surf-benfica-stack">
      <PhotoSlot
        className="jd-surf-benfica-stack-hero"
        src={hero.src}
        alt={hero.alt}
        caption={hero.caption}
        color={hero.color}
        objectPosition={hero.objectPosition}
      />
      <div className="jd-surf-benfica-stack-row">
        {bottom.map((p) => (
          <PhotoSlot
            key={p.src}
            src={p.src}
            alt={p.alt}
            caption={p.caption}
            color={p.color}
            objectPosition={p.objectPosition}
          />
        ))}
      </div>
    </div>
  );
}

const FRIENDS_PARALLAX_PHOTOS = [
  { src: "/students/jaimee-douglas/friends-group-steps.png", alt: "Cohort posing on stone steps in front of a historic building", caption: "On the quad", color: C.royal, objectPosition: "center 40%" },
  { src: "/students/jaimee-douglas/friends-beach-circle.png", alt: "Group holding hands in a circle on the beach", caption: "Beach day", color: C.emerald, objectPosition: "center 45%" },
  { src: "/students/jaimee-douglas/friends-cooking-class.png", alt: "Cooking class group at Cook in Ribeira", caption: "Cook in Ribeira", color: C.burgundyDk, objectPosition: "center 35%" },
  { src: "/students/jaimee-douglas/friends-boat.png", alt: "Cohort on a boat deck on the river", caption: "On the water", color: C.gold, objectPosition: "center 42%" },
];

const KARAOKE_REVEAL_LINE = "I hadn't sung in over six months";

/* ─── SCROLL EFFECTS (Framer Motion) ───────────────────────────────────────── */
function ScrollProgressBar() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (reduced) return null;

  return (
    <div className="jd-scroll-progress-wrap" aria-hidden="true">
      <div className="jd-scroll-progress-perfs" />
      <motion.div className="jd-scroll-progress" style={{ scaleX }} />
    </div>
  );
}

function FilmStripOverlay({ segments = 1, flip = false }) {
  return (
    <div className={`jd-parallax-film-overlay${flip ? " jd-parallax-film-overlay--flip" : ""}`} aria-hidden="true">
      {Array.from({ length: segments }).map((_, i) => (
        <img key={i} src={FILM_STRIP_SRC} alt="" className="jd-film-strip jd-film-strip-overlay" />
      ))}
    </div>
  );
}

function FilmStripPhotoFrames({ photos }) {
  return (
    <div
      className="jd-parallax-film-frames jd-film-frames jd-film-frames--row"
      style={{ gridTemplateColumns: `repeat(${photos.length}, minmax(0, 1fr))` }}
    >
      {photos.map((photo) => (
        <PhotoSlot
          key={photo.src}
          className="jd-parallax-film-frame"
          src={photo.src}
          alt={photo.alt}
          color={photo.color}
          objectPosition={photo.objectPosition}
        />
      ))}
    </div>
  );
}

function FavoriteDayFilmFrame({ src, alt, objectPosition = "center center" }) {
  return (
    <div className="jd-hero-day-frame">
      <img
        className="jd-hero-day-frame-photo"
        src={src}
        alt={alt}
        style={{ objectPosition }}
        loading="lazy"
      />
      <img
        className="jd-hero-day-frame-overlay"
        src={FAVORITE_DAY_FRAME_SRC}
        alt=""
        aria-hidden="true"
      />
    </div>
  );
}

function FilmStripPhotoLabels({ photos }) {
  return (
    <div
      className="jd-parallax-film-labels"
      style={{ gridTemplateColumns: `repeat(${photos.length}, minmax(0, 1fr))` }}
    >
      {photos.map((photo) => (
        <span key={`${photo.src}-label`} className="jd-parallax-film-label">
          {photo.caption}
        </span>
      ))}
    </div>
  );
}

function ParallaxFilmStripRow({ photos, x, flip = false }) {
  const segments = Math.max(1, Math.ceil(photos.length / 5));

  return (
    <div className="jd-parallax-film-row-wrap">
      <motion.div className="jd-parallax-film-row" style={{ x }}>
        {[0, 1].map((dup) => (
          <div key={dup} className="jd-parallax-film-unit">
            <div className="jd-parallax-film-body">
              <FilmStripPhotoFrames photos={photos} />
              <FilmStripOverlay segments={segments} flip={flip} />
            </div>
            <FilmStripPhotoLabels photos={photos} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function ParallaxFoodFilmStrips({ photos }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const xTop = useTransform(scrollYProgress, [0, 1], ["-28vw", "28vw"]);
  const xBottom = useTransform(scrollYProgress, [0, 1], ["28vw", "-28vw"]);

  const split = Math.ceil(photos.length / 2);
  const rowTop = photos.slice(0, split);
  const rowBottom = photos.slice(split);

  if (reduced) {
    return (
      <div className="jd-parallax-film-strips">
        {[rowTop, rowBottom].map((row, i) => (
          <div key={i} className="jd-parallax-film-unit" style={{ width: "100%", maxWidth: 920, margin: "0 auto" }}>
            <div className="jd-parallax-film-body">
              <FilmStripPhotoFrames photos={row} />
              <FilmStripOverlay segments={Math.ceil(row.length / 5)} flip={i === 1} />
            </div>
            <FilmStripPhotoLabels photos={row} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="jd-parallax-film-strips jd-parallax-film-strips--bleed">
      <ParallaxFilmStripRow photos={rowTop} x={xTop} />
      {rowBottom.length > 0 && <ParallaxFilmStripRow photos={rowBottom} x={xBottom} flip />}
    </div>
  );
}

function ParallaxPhotoColumns({ photos, fullBleed = false }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const xTop = useTransform(scrollYProgress, [0, 1], fullBleed ? ["-28vw", "28vw"] : ["-3%", "3%"]);
  const xBottom = useTransform(scrollYProgress, [0, 1], fullBleed ? ["28vw", "-28vw"] : ["3%", "-3%"]);

  const split = Math.ceil(photos.length / 2);
  const rowTop = photos.slice(0, split);
  const rowBottom = photos.slice(split);
  const bleedRow = (row) => (fullBleed ? [...row, ...row] : row);

  if (reduced) {
    return (
      <div className="jd-photo-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 3, maxWidth: 1200, margin: "0 auto" }}>
        {photos.map((p) => (
          <PhotoSlot
            key={p.src}
            src={p.src}
            alt={p.alt}
            caption={p.caption}
            color={p.color}
            objectPosition={p.objectPosition}
            style={{ height: 240 }}
          />
        ))}
      </div>
    );
  }

  const renderRow = (row, x) => (
    <div className="jd-parallax-row-wrap">
      <motion.div className="jd-parallax-row" style={{ x }}>
        {row.map((p, i) => (
          <PhotoSlot
            key={`${p.src}-${i}`}
            src={p.src}
            alt={p.alt}
            caption={p.caption}
            color={p.color}
            objectPosition={p.objectPosition}
          />
        ))}
      </motion.div>
    </div>
  );

  return (
    <div ref={ref} className={fullBleed ? "jd-parallax-columns jd-parallax-columns--bleed" : "jd-parallax-columns"}>
      {renderRow(bleedRow(rowTop), xTop)}
      {rowBottom.length > 0 && renderRow(bleedRow(rowBottom), xBottom)}
    </div>
  );
}

function ScrollRevealWord({ word, index, total, containerRef, reduced }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.25"],
  });
  const start = index / total;
  const end = Math.min(1, (index + 1.4) / total);
  const clipPath = useTransform(
    scrollYProgress,
    [start, end],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );

  if (reduced) {
    return <span className="jd-word-reveal-word">{word} </span>;
  }

  return (
    <span className="jd-word-reveal-word">
      <span className="jd-word-reveal-ghost" aria-hidden="true">
        {word}
      </span>
      <motion.span className="jd-word-reveal-live" style={{ clipPath }}>
        {word}
      </motion.span>{" "}
    </span>
  );
}

function ScrollWordReveal({ text, className = "" }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <p ref={ref} className={`jd-word-reveal ${className}`.trim()} aria-label={text}>
      {words.map((word, i) => (
        <ScrollRevealWord
          key={`${word}-${i}`}
          word={word}
          index={i}
          total={words.length}
          containerRef={ref}
          reduced={reduced}
        />
      ))}
    </p>
  );
}

function StickyZoomReveal({ src, alt, caption, color, children, minHeight = "130vh", objectFit, objectPosition, compact = false, className = "" }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.55, 1], [0.92, 1.12, 1.2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.35], [0.55, 1]);
  const wrapMinHeight = compact ? "auto" : minHeight;
  const mediaClass = compact ? "jd-sticky-zoom-media jd-sticky-zoom-media--compact" : "jd-sticky-zoom-media";
  const wrapClass = ["jd-sticky-zoom-wrap", className].filter(Boolean).join(" ");
  const copyClass = compact ? "jd-sticky-zoom-copy" : "";
  const motionStyle = compact
    ? { opacity: imageOpacity, height: "100%" }
    : { scale, opacity: imageOpacity, height: "100%", transformOrigin: "center center" };

  if (reduced) {
    return (
      <div className={wrapClass}>
        <div className="jd-sticky-zoom-grid">
          <PhotoSlot src={src} alt={alt} caption={caption} color={color} style={{ height: compact ? 380 : 420, aspectRatio: compact ? "4/5" : undefined }} objectFit={objectFit} objectPosition={objectPosition} />
          <div className={copyClass}>{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={wrapClass} style={{ minHeight: wrapMinHeight }}>
      <div className="jd-sticky-zoom-grid">
        <div className={mediaClass}>
          <motion.div style={motionStyle}>
            <PhotoSlot src={src} alt={alt} caption={caption} color={color} style={{ height: "100%" }} objectFit={objectFit} objectPosition={objectPosition} />
          </motion.div>
        </div>
        <div className={copyClass} style={compact ? undefined : { paddingTop: "6vh", paddingBottom: "8vh" }}>{children}</div>
      </div>
    </div>
  );
}

const JERONIMOS_GALLERY = [
  { src: "/students/jaimee-douglas/jeronimos-stained-glass.png", alt: "Triangular stained glass at Jerónimos", caption: "Manueline glass", color: C.royal, contain: true, objectPosition: "center" },
  { src: "/students/jaimee-douglas/jeronimos-map-hall.png", alt: "Jerónimos map room with stained glass", caption: "The age of discovery", color: C.emerald, objectPosition: "center 40%" },
  { src: "/students/jaimee-douglas/jeronimos-padrao-painting.png", alt: "Painting of explorers erecting a padrão", caption: "Erecting the padrão", color: C.royal, objectPosition: "center 45%" },
  { src: "/students/jaimee-douglas/jeronimos-navigator-mural.png", alt: "Navigator school mural", caption: "Prince Henry's school", color: C.burgundyLt, objectPosition: "center 35%" },
];

function PortugalCitiesMap({ onCityClick }) {
  const routePoints = CITY_ROUTE.map((name) => CITIES.find((c) => c.name === name)).filter(Boolean);
  const routeD = routePoints.map((c, i) => `${i === 0 ? "M" : "L"}${c.cx},${c.cy}`).join(" ");

  return (
    <div className="jd-portugal-map" role="img" aria-label="Map of Portugal with cities visited on the trip">
      <svg viewBox="-22 -10 444 540" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="jd-pt-land" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(46,95,191,0.55)" />
            <stop offset="100%" stopColor="rgba(26,58,122,0.75)" />
          </linearGradient>
          <filter id="jd-map-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="rgba(201,151,42,0.35)" />
          </filter>
        </defs>

        {/* subtle lat/lon grid */}
        {[120, 200, 280, 360].map((y) => (
          <line key={`h-${y}`} x1="20" y1={y} x2="380" y2={y} stroke="rgba(250,245,236,0.06)" strokeWidth="1" />
        ))}
        {[100, 200, 300].map((x) => (
          <line key={`v-${x}`} x1={x} y1="20" x2={x} y2="500" stroke="rgba(250,245,236,0.06)" strokeWidth="1" />
        ))}

        <motion.path
          d={PORTUGAL_MAP_PATH}
          fill="url(#jd-pt-land)"
          stroke="rgba(201,151,42,0.45)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ transformOrigin: "200px 260px" }}
        />

        <motion.path
          d={routeD}
          fill="none"
          stroke="rgba(232,180,90,0.55)"
          strokeWidth="2"
          strokeDasharray="6 5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
        />

        {CITIES.map((city, i) => {
          const label = mapCityLabel(city);
          return (
            <motion.g
              key={city.name}
              className="jd-map-pin"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 + i * 0.1, type: "spring", stiffness: 220 }}
              onClick={() => onCityClick(city.id)}
              onKeyDown={(e) => e.key === "Enter" && onCityClick(city.id)}
              role="button"
              tabIndex={0}
              aria-label={`Jump to ${city.name} section`}
              filter="url(#jd-map-glow)"
            >
              <circle
                cx={city.cx}
                cy={city.cy}
                r="9"
                fill="rgba(10, 22, 48, 0.85)"
                stroke="rgba(250,245,236,0.2)"
                strokeWidth="1"
              />
              <circle className="jd-map-pin-ring" cx={city.cx} cy={city.cy} r="14" fill="none" stroke="rgba(201,151,42,0.65)" strokeWidth="1.5" />
              <circle
                className="jd-map-pin-core"
                cx={city.cx}
                cy={city.cy}
                r="5.5"
                fill={C.gold}
                stroke={C.burgundyDk}
                strokeWidth="1.25"
              />
              <text
                x={label.x}
                y={label.y}
                textAnchor={label.textAnchor}
                fill="rgba(250,245,236,0.95)"
                stroke="rgba(10, 22, 48, 0.9)"
                strokeWidth="3"
                paintOrder="stroke fill"
                fontFamily="'Jost', sans-serif"
                fontSize="11"
                fontWeight="500"
                letterSpacing="0.12em"
                style={{ textTransform: "uppercase" }}
              >
                {city.name}
              </text>
            </motion.g>
          );
        })}

        <text x="200" y="505" textAnchor="middle" fill="rgba(250,245,236,0.2)" fontFamily="'Cormorant Garamond', serif" fontSize="13" letterSpacing="0.35em">
          PORTUGAL
        </text>
      </svg>
    </div>
  );
}

function JeronimosGallery() {
  return (
    <div className="jd-jeronimos-gallery">
      {JERONIMOS_GALLERY.map((photo) => (
        <PhotoSlot
          key={photo.src}
          className={photo.contain ? "jd-photo-item--contain" : ""}
          src={photo.src}
          alt={photo.alt}
          caption={photo.caption}
          color={photo.color}
          objectFit={photo.contain ? "contain" : "cover"}
          objectPosition={photo.objectPosition}
        />
      ))}
    </div>
  );
}

/* ─── SECTION WRAPPER ──────────────────────────────────────────────────────── */
function Section({ id, children, style = {}, className = "" }) {
  return (
    <section id={id} className={className ? `jd-section ${className}` : "jd-section"} style={style}>
      {children}
    </section>
  );
}

function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0] ?? "hero");

  useEffect(() => {
    const pick = () => {
      const mid = window.innerHeight * 0.42;
      let bestId = sectionIds[0];
      let bestDist = Infinity;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 80 || rect.top > window.innerHeight - 80) continue;
        const center = rect.top + rect.height * 0.35;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = id;
        }
      }
      setActive(bestId);
    };

    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, [sectionIds]);

  return active;
}

/* ─── MAIN COMPONENT ───────────────────────────────────────────────────────── */
const SECTION_IDS = SECTIONS.map((s) => s.id);

export default function JaimeeDouglas() {
  const [activeDay, setActiveDay] = useState(FAVORITE_DAYS[0]);
  const [openBlog, setOpenBlog] = useState(-1);
  const currentSection = useActiveSection(SECTION_IDS);
  const ambientBg = AMBIENT_BY_SECTION[currentSection] ?? AMBIENT_BY_SECTION.hero;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const day = activeDay;

  return (
    <div className="jd-page jd-custom-cursor">
      <style>{PAGE_CSS}</style>
      <PortugalIntroFlash />
      <ScrollProgressBar />
      <div className="jd-ambient" style={{ background: ambientBg }} aria-hidden="true" />
      <div className="jd-vignette" aria-hidden="true" />
      <div className="jd-film-grain" aria-hidden="true" />
      <FilmCameraCursor />

      <div className="jd-content">
      {/* ── HERO ── */}
      <Section id="hero" className="jd-section--hero">
        <div className="jd-hero">
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse 90% 70% at 50% 35%, ${C.royal}44 0%, transparent 65%)`,
              zIndex: 0,
              pointerEvents: "none",
            }}
            aria-hidden="true"
          />

          <Link to="/" className="jd-back jd-hero-back">
            ← Back to cohort
          </Link>

          <HeroIdentityHeader signatureActive={currentSection === "hero"} />

          <div className="jd-hero-main">
          <div className="jd-hero-left">
            <motion.div className="jd-hero-bio" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
              <HeroTagline />

              <div className="jd-rule" style={{ width: 60, marginTop: 28, marginBottom: 28, marginLeft: 0 }} />

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                <button
                  type="button"
                  className="jd-day-btn active"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  Trip highlights
                </button>
                <button
                  type="button"
                  className="jd-day-btn"
                  onClick={() => scrollTo("bama-blog")}
                >
                  Portugal, I Love You, XOXO - Gossip Girl · Bama Blog Entries
                </button>
              </div>
              <p
                className="jd-body"
                style={{
                  maxWidth: 520,
                  marginBottom: 28,
                  fontSize: "0.92rem",
                  color: "rgba(250,245,236,0.72)",
                  lineHeight: 1.7,
                }}
              >
                I also wrote {BLOG_POSTS.length} entries for the{" "}
                <span style={{ color: C.goldLt }}>Bama Blog</span>, where current UA students share their study
                abroad stories. To read them in full, visit my brief blogger era, and tap the highlight above or
                scroll down to the Bama Blog section.
              </p>

              {/* Favorite Day Selector */}
              <div style={{ marginBottom: 16 }}>
                <span className="jd-kicker" style={{ marginBottom: 10 }}>Choose to learn about some of my favorite days</span>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {FAVORITE_DAYS.map(d => (
                    <button
                      key={d.id}
                      className={`jd-day-btn ${activeDay.id === d.id ? "active" : ""}`}
                      onClick={() => setActiveDay(d)}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={day.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.65, ease: fadeEase }}
                  style={{
                    borderLeft: `3px solid`,
                    borderImage: `linear-gradient(to bottom, ${day.accent}, transparent) 1`,
                    paddingLeft: 20,
                    marginTop: 8,
                  }}
                >
                  <div className="jd-hero-day-title">{day.title}</div>
                  <div style={{ fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(250,245,236,0.5)", marginBottom: 12 }}>
                    {day.subtitle}
                  </div>
                  <p className="jd-body">{day.description}</p>
                  <div style={{ marginTop: 10, fontSize: "0.88rem", fontStyle: "italic", color: C.pinkLt }}>
                    "{day.tagline}"
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.08, ease: fadeEase }}
                  >
                    <FavoriteDayFilmFrame
                      src={day.photo}
                      alt={`${day.title} · ${day.subtitle}`}
                      objectPosition={day.photoPosition ?? "center center"}
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="jd-hero-right">
            <motion.div
              className="jd-hero-film-wrap"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <HeroFilmPortrait src={HERO_PHOTO} alt="Jaimee Douglas at Jerónimos Monastery" />
            </motion.div>
          </div>
          </div>
        </div>

        {/* Chapter nav — film reel index */}
        <div className="jd-chapter-nav">
          {CHAPTER_NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              className="jd-chapter-btn"
              onClick={() => scrollTo(item.id)}
            >
              <span className="jd-chapter-btn-frame">{SECTION_FRAME[item.id]}</span>
              {item.label}
            </button>
          ))}
        </div>
      </Section>

      {/* ── CITY MAP ── */}
      <Section id="cities" className="jd-section--cities" style={{ background: "rgba(26,58,122,0.92)" }}>
        <FadeUp>
          <span className="jd-kicker">The Route</span>
          <h2 className="jd-h2" style={{ marginBottom: 16 }}>Cities I <em style={{ color: C.pinkLt }}>Loved</em></h2>
          <div className="jd-rule" style={{ width: 60, marginLeft: 0, marginBottom: 48 }} />
          <SectionSoundtrack sectionId="cities" style={{ marginTop: 0, marginBottom: 48 }} />
        </FadeUp>

        <div className="jd-cities-layout">
          <PortugalCitiesMap onCityClick={scrollTo} />

          <div className="jd-cities-list">
            {[
              { city: "Lisbon", note: "My home base. Cobblestones, late-night walks, and karaoke at midnight.", color: C.burgundy },
              { city: "Porto", note: "Michelin stars, river views, and the most beautiful bookstore I've ever stepped into.", color: C.goldLt },
              { city: "Sintra", note: "Pena Palace perched on a cloud. It felt like a fairytale I'd earned.", color: C.emerald },
              { city: "Coimbra", note: "The university chapel. I stood inside and felt centuries of learning in the walls.", color: C.gold },
            ].map((item, i) => (
              <motion.div
                key={item.city}
                className="jd-cities-list-item"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="jd-cities-list-mark" style={{ background: item.color }} />
                <div>
                  <h3 className="jd-cities-list-name">{item.city}</h3>
                  <p className="jd-cities-list-note">{item.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── FOOD (Lisbon & Porto) ── */}
      <Section id="food" className="jd-section--food" style={{ background: "rgba(107,26,42,0.9)" }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className="jd-kicker">Two cities, many plates</span>
          <h2 className="jd-h2" style={{ marginBottom: 16 }}>
            Lisbon & <em style={{ color: C.pinkLt }}>Porto</em>
          </h2>
          <div className="jd-rule" style={{ width: 60, marginLeft: 0, marginBottom: 32 }} />
          <p className="jd-body" style={{ maxWidth: 560, marginBottom: 32 }}>
            From pastéis in Belém to francesinhas by the Douro, I ate my way through both cities in a way that surprised even me. I&apos;m usually a picky eater, and once I find something I like, I tend to stick to it. This trip I really put myself out there and tried new foods. Normally I&apos;m more of a chicken tenders and french fries girl, but I switched things up for Portugal. Although my adventurous side emerged during this trip, I managed to find a McDonald&apos;s in Portugal and indulged in my beloved chicken nuggets and BBQ sauce. Trying new things was starting to exhaust me lowkey.
          </p>
          <SectionSoundtrack sectionId="food" style={{ marginTop: 0, marginBottom: 48 }} />
        </motion.div>
        <ParallaxFoodFilmStrips photos={FOOD_PARALLAX_PHOTOS} />
      </Section>

      {/* ── SURF + BENFICA ── */}
      <Section id="surf-benfica" style={{ background: "rgba(74,15,28,0.92)" }}>
        <div className="jd-surf-benfica-layout">
          <motion.div
            className="jd-surf-benfica-copy"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="jd-kicker">Porto · May 2026</span>
            <h2 className="jd-h2" style={{ marginBottom: 16 }}>Surf & <em style={{ color: C.royalLt }}>Benfica</em></h2>
            <div className="jd-rule" style={{ width: 60, marginLeft: 0, marginBottom: 32 }} />
            <p className="jd-body" style={{ marginBottom: 20 }}>
              Atlantic waves, surfboards, and zero experience. I stood on a board in Portugal and felt genuinely fearless, not because I didn't fall, but because falling in the ocean on a warm afternoon is a gift.
            </p>
            <p className="jd-body">
              That same energy carried into the Benfica match that evening. The stadium roared, and the Benfica club chants rang through the crowd. I sang along in my matching Benfica jersey and sweater, swept up in something bigger than the score.
            </p>
            <SectionSoundtrack sectionId="surf-benfica" />
          </motion.div>
          <div className="jd-surf-benfica-gallery">
            <SurfBenficaGallery />
          </div>
        </div>
      </Section>

      {/* ── COOKING CLASS ── */}
      <Section id="cooking-class" style={{ background: "rgba(250,245,236,0.97)" }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className="jd-kicker" style={{ color: C.burgundy }}>Porto · Chef Vetor & Chef Jorge</span>
          <h2 className="jd-h2" style={{ color: C.ink, marginBottom: 16 }}>What I Made <em style={{ color: C.burgundy }}>in Porto</em></h2>
          <div className="jd-rule" style={{ width: 60, marginLeft: 0, marginBottom: 32, background: `linear-gradient(to right, transparent, ${C.burgundy}, transparent)` }} />
        </motion.div>

        <div className="jd-cooking-class">
          <motion.p
            className="jd-cooking-intro"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            In a Porto kitchen with Michelin-star chefs, we chopped, simmered, and learned how Portuguese food is built layer by layer. These photos are from the making of it all: prep, focus, and the moment before anything hit the plate.
          </motion.p>

          <motion.div
            className="jd-cooking-moments"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.08 }}
          >
            {COOKING_CLASS_MOMENTS.map((p) => (
              <PhotoSlot
                key={p.src}
                src={p.src}
                alt={p.alt}
                caption={p.caption}
                color={p.color}
                objectPosition={p.objectPosition}
              />
            ))}
          </motion.div>

          <span className="jd-cooking-dishes-label">What I made</span>

          <div className="jd-cooking-dishes">
            <div className="jd-dish-card" style={{ background: "white" }}>
              <div className="jd-dish-photo" style={{ background: `linear-gradient(135deg, ${C.goldPale}, ${C.cream})` }}>
                <img
                  src="/students/jaimee-douglas/cooking-pica-pau.png"
                  alt="Pica-Pau with fried egg, mushrooms, and chili garnish"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              </div>
              <div style={{ padding: "20px 24px 24px" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontStyle: "italic", color: C.burgundy, marginBottom: 8 }}>Pica-Pau</div>
                <p style={{ fontSize: "0.88rem", color: C.inkSoft, lineHeight: 1.7, margin: 0 }}>
                  Tender marinated beef with mushrooms and onions, finished with a fried egg, chili, and fresh herbs. A Portuguese tavern classic built for dipping crusty bread into the sauce.
                </p>
              </div>
            </div>

            <div className="jd-dish-card" style={{ background: "white" }}>
              <div className="jd-dish-photo" style={{ background: `linear-gradient(135deg, ${C.emeraldPale}, ${C.cream})` }}>
                <img
                  src="/students/jaimee-douglas/cooking-sopa.png"
                  alt="Sopa de legumes in a speckled ceramic bowl"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              </div>
              <div style={{ padding: "20px 24px 24px" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontStyle: "italic", color: C.burgundy, marginBottom: 8 }}>Sopa de Legumes</div>
                <p style={{ fontSize: "0.88rem", color: C.inkSoft, lineHeight: 1.7, margin: 0 }}>
                  A silky Portuguese vegetable cream: cucumber, potato, sweet potato, and cauliflower, blended until velvety. Vegetarian, comforting, and going straight into my rotation at home.
                </p>
              </div>
            </div>
          </div>

          <p style={{ fontSize: "0.92rem", color: C.inkSoft, lineHeight: 1.8, fontStyle: "italic", borderLeft: `3px solid ${C.burgundy}`, paddingLeft: 20, margin: 0 }}>
            They didn't just teach recipes. They taught why Portuguese cooking feels the way it does: pairings, tavern culture, history in every bite. Intimidating on paper; warm and hands-on in person. If you get a chance like this, take it.
          </p>
          <SectionSoundtrack sectionId="cooking-class" light />
        </div>
      </Section>

      {/* ── JERÓNIMOS ── */}
      <Section id="monastery" className="jd-section--monastery" style={{ background: "rgba(74,15,28,0.9)" }}>
        <StickyZoomReveal
          compact
          className="jd-jeronimos-intro"
          src="/students/jaimee-douglas/jeronimos-1.png"
          alt="Jerónimos Monastery collage"
          caption="Jerónimos Monastery, Belém"
          color={C.royal}
          objectFit="contain"
          objectPosition="center top"
        >
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="jd-kicker">Belém · Lisbon</span>
            <h2 className="jd-h2" style={{ marginBottom: 16 }}>Jerónimos <em style={{ color: C.pinkLt }}>Monastery</em></h2>
            <div className="jd-rule" style={{ width: 60, marginLeft: 0, marginBottom: 28 }} />
            <p className="jd-body" style={{ marginBottom: 20 }}>
              Walking into Jerónimos felt like entering a prayer made of stone. Every carved archway and vaulted ceiling was a reminder that some things are built to outlast all of us, and that's okay.
            </p>
            <p className="jd-body" style={{ marginBottom: 20 }}>
              In that silence I thought about the monks who devoted their entire lives here: belief, routine, and years of quiet before a state decree in December 1833 secularized the monastery and dissolved every religious order in Portugal. I was asked to really immerse myself in that moment and remember what once was, and their history.
            </p>
            <p className="jd-body">
              Her's <em>What Once Was</em> was playing in my head the whole visit, as if the song had called me there. It matched the weight of the place better than anything I could have chosen on purpose.
            </p>
            <SectionSoundtrack sectionId="monastery" />
          </motion.div>
        </StickyZoomReveal>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginTop: 36, width: "100%" }}
        >
          <JeronimosGallery />
        </motion.div>
      </Section>

      {/* ── PENA PALACE ── */}
      <Section id="pena-palace" style={{ background: "rgba(26,107,69,0.92)" }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="jd-kicker" style={{ color: C.goldLt }}>Sintra · Coimbra</span>
          <h2 className="jd-h2" style={{ marginBottom: 16 }}>
            Pena Palace <em style={{ color: C.goldPale }}>&amp; the Universidade de Coimbra</em>
          </h2>
          <div className="jd-rule" style={{ width: 60, marginBottom: 28 }} />
          <p className="jd-body" style={{ maxWidth: 560, margin: "0 auto 28px" }}>
            Sintra sits above the clouds. I climbed to Pena Palace and stood at the edge of something that felt ancient and alive at once. Then, at the Universidade de Coimbra, the oldest university chapel in Portugal, I looked up and felt centuries of learning in the walls.
          </p>
          <SectionSoundtrack sectionId="pena-palace" center style={{ marginTop: 0 }} />
        </motion.div>

        <PenaCoimbraCollage />
      </Section>

      {/* ── KARAOKE ── */}
      <Section id="karaoke" style={{ background: "rgba(46,95,191,0.9)", position: "relative", overflow: "hidden" }}>
        {/* Decorative glow */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: `radial-gradient(circle, rgba(201,151,42,0.15) 0%, transparent 70%)`, pointerEvents: "none" }} />

        <div className="jd-karaoke-layout">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="jd-kicker" style={{ color: C.goldLt }}>Last nights in Lisbon</span>
            <h2 className="jd-h2" style={{ marginBottom: 16 }}>Karaoke with <em style={{ color: C.goldPale }}>Olivia</em></h2>
            <div className="jd-rule" style={{ width: 60, marginLeft: 0, marginBottom: 28 }} />
            <p className="jd-body" style={{ marginBottom: 20 }}>
              One of our last nights in Lisbon, Olivia and I decided to close it out with a duet: <em>Tia Tamera</em>, full commitment. The crowd woke up. That one song turned into a full night: duets with others pulling me back up, music ranging from Queen to Michael Jackson to everything in between, and somewhere in the middle I snuck in a solo of Beyoncé&apos;s <em>All Night</em>.
            </p>
            <p className="jd-body" style={{ marginBottom: 16 }}>
              A few people stopped to compliment it after. What made it hit different was that I hadn't sung in over six months, so honestly? I was just as surprised as they were.
            </p>
            <ScrollWordReveal text={KARAOKE_REVEAL_LINE} />
            <div style={{ padding: "16px 20px", background: "rgba(0,0,0,0.2)", borderRadius: 4, borderLeft: `3px solid ${C.goldLt}`, marginTop: 20 }}>
              <span style={{ fontSize: "0.75rem", fontStyle: "italic", color: C.goldPale, lineHeight: 1.6, display: "block" }}>
                Then Lisbon gave me a microphone. I was as surprised as anyone.
              </span>
            </div>
            <SectionSoundtrack sectionId="karaoke" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <KaraokeCartoonPanel />
          </motion.div>
        </div>
      </Section>

      {/* ── GROUP MOMENTS ── */}
      <Section id="friends" style={{ background: "rgba(107,26,42,0.88)" }}>
        <FadeUp style={{ marginBottom: 40 }}>
          <span className="jd-kicker">On the trip</span>
          <h2 className="jd-h2" style={{ marginBottom: 16 }}>Group <em style={{ color: C.pinkLt }}>moments</em></h2>
          <div className="jd-rule" style={{ width: 60, marginLeft: 0, marginBottom: 20 }} />
          <p className="jd-body" style={{ maxWidth: 520, marginBottom: 28 }}>
            Twenty students, two weeks. These are a few shared memories from the trip, not the whole story.
          </p>
          <SectionSoundtrack sectionId="friends" style={{ marginTop: 0 }} />
        </FadeUp>

        <ParallaxPhotoColumns photos={FRIENDS_PARALLAX_PHOTOS} />
      </Section>

      {/* ── FERNANDO PESSOA ── */}
      <Section id="pessoa-book" style={{ background: "rgba(26,107,69,0.88)" }}>
        <FadeUp>
          <div className="jd-book-panel">
            <PhotoSlot
              src={FERNANDO_PESSOA.cover}
              alt="Book cover: I Am the Size of Whatever I See by Fernando Pessoa"
              caption="Bought in Portugal"
              color={C.emeraldLt}
              objectFit="contain"
              style={{ height: 360, borderRadius: 4, background: "rgba(250,245,236,0.08)" }}
            />
            <div>
              <span className="jd-kicker" style={{ color: C.goldLt }}>A souvenir that fits in my bag</span>
              <h2 className="jd-h2" style={{ marginBottom: 16, fontSize: "clamp(2.2rem,4vw,3.5rem)" }}>
                {FERNANDO_PESSOA.title}
              </h2>
              <blockquote
                className="jd-display"
                style={{
                  fontSize: "clamp(1.5rem,3vw,2.25rem)",
                  fontStyle: "italic",
                  color: C.goldPale,
                  lineHeight: 1.35,
                  margin: "0 0 24px",
                  borderLeft: `3px solid ${C.gold}`,
                  paddingLeft: 20,
                }}
              >
                "{FERNANDO_PESSOA.quote}"
              </blockquote>
              <p className="jd-body">{FERNANDO_PESSOA.note}</p>
              <SectionSoundtrack sectionId="pessoa-book" />
            </div>
          </div>
        </FadeUp>
      </Section>

      {/* ── CLOSING REFLECTION ── */}
      <Section id="reflection" style={{ background: "rgba(26,58,122,0.9)" }}>
        <div className="jd-reflection-panel">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="jd-reflection-copy"
          >
            <span className="jd-kicker">On the Water</span>
            <h2 className="jd-h2" style={{ marginBottom: 20 }}>
              Don&apos;t You Worry<br />
              <em style={{ color: C.pinkLt }}>&apos;Bout a Thing</em>
            </h2>
            <div className="jd-rule" style={{ width: 60, marginBottom: 32 }} />
            <p className="jd-body" style={{ marginBottom: 20 }}>
              Portugal asked me to slow down: in cathedrals, in kitchens, on karaoke stages I didn&apos;t plan for. I came for MIS credits and left with people, recipes, and a voice I forgot I had.
            </p>
            <p className="jd-body" style={{ fontStyle: "italic", color: C.goldPale, marginBottom: 0 }}>
              This page is my thank-you to the cities, the kitchens, and the people who made the trip feel real.
            </p>
            <SectionSoundtrack sectionId="reflection" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.12 }}
          >
            <PhotoSlot
              src="/students/jaimee-douglas/reflection-boat.png"
              alt="On the boat with the river and hillside behind"
              caption="Golden hour on the water"
              color={C.royal}
              objectPosition="center 35%"
              className="jd-photo-slot--reflection"
            />
          </motion.div>
        </div>
      </Section>

      {/* ── BAMA BLOG ENTRIES ── */}
      <Section id="bama-blog" className="jd-section--blog" style={{ background: "rgba(74,15,28,0.94)" }}>
        <FadeUp style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="jd-kicker">University of Alabama · Study abroad</span>
          <h2 className="jd-h2" style={{ marginBottom: 12 }}>
            Portugal, I Love You, XOXO - Gossip Girl
          </h2>
          <p className="jd-display" style={{ fontSize: "1.35rem", fontStyle: "italic", color: C.pinkLt, marginBottom: 16 }}>
            Bama Blog Entries
          </p>
          <div className="jd-rule" style={{ width: 60, marginBottom: 20 }} />
          <p className="jd-body" style={{ maxWidth: 520, margin: "0 auto 28px" }}>
            Three assignments from the trip, written like I was reporting back to campus. Tap an entry to read the full post.
          </p>
          <SectionSoundtrack sectionId="bama-blog" center style={{ marginTop: 0 }} />
        </FadeUp>
        <BamaBlogEntries openPost={openBlog} setOpenPost={setOpenBlog} scrollTo={scrollTo} />
      </Section>

      {/* ── FAREWELL / BOAT ── */}
      <Section id="farewell" className="jd-section--farewell" style={{ background: C.burgundyDk, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 80%, ${C.royal}44, transparent 60%)`, pointerEvents: "none" }} />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ textAlign: "center", position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}
        >
          <span className="jd-kicker">Douro Farewell Cruise · Last Evening</span>
          <h2 className="jd-h2" style={{ marginBottom: 16, fontSize: "clamp(3rem,6vw,5rem)" }}>
            Before I Let <em style={{ color: C.pinkLt }}>Go</em>
          </h2>
          <div className="jd-rule" style={{ width: 60, marginBottom: 40 }} />

          <PhotoSlot
            src="/students/jaimee-douglas/douro-farewell.png"
            alt="Douro riverbank at twilight with hillside buildings reflected on the water"
            caption="Douro farewell cruise"
            color={C.royal}
            objectPosition="center 50%"
            className="jd-photo-slot--tall"
            style={{ marginBottom: 48 }}
          />

          <p className="jd-body" style={{ fontSize: "1.05rem", marginBottom: 24, maxWidth: 540, margin: "0 auto 24px" }}>
            Our last evening was the Douro farewell cruise: the river went quiet, the lights came on along the banks, and everything slowed down. Beyoncé in my ears, Porto glowing ahead of us, and a feeling I was not ready to let go of.
          </p>
          <p className="jd-body" style={{ fontStyle: "italic", color: C.pinkLt, maxWidth: 480, margin: "0 auto 28px" }}>
            I came to Portugal for the credits. I left carrying something I didn't have words for yet, but I will.
          </p>
          <SectionSoundtrack sectionId="farewell" center style={{ marginTop: 0, marginBottom: 48 }} />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 60 }}>
            <div className="jd-rule" style={{ width: 60 }} />
            <span className="jd-display" style={{ fontStyle: "italic", color: C.goldLt, fontSize: "1.4rem" }}>Até logo, Jaimee</span>
            <div className="jd-rule" style={{ width: 60 }} />
          </div>

          <Link to="/" className="jd-back" style={{ justifyContent: "center" }}>
            ← Back to cohort
          </Link>
        </motion.div>
      </Section>

      </div>

      {/* ── SPOTIFY STRIP ── */}
      <AuxDeck currentSection={currentSection} />
    </div>
  );
}
