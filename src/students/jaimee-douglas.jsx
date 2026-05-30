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

  .jd-tumblr-frame-wrap {
    display: flex;
    justify-content: center;
    margin: 0 auto 28px;
    max-width: 100%;
  }

  .jd-tumblr-frame {
    position: relative;
    display: inline-block;
    max-width: 100%;
    box-sizing: border-box;
    isolation: isolate;
    filter: drop-shadow(0 16px 32px rgba(0, 0, 0, 0.32));
    /* Padding scales the film-frame-single.png window around the post */
    padding: clamp(58px, 12vw, 78px) clamp(14px, 2.5vw, 24px) clamp(58px, 12vw, 78px) clamp(8px, 1.4vw, 12px);
  }

  .jd-tumblr-frame-overlay {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
    pointer-events: none;
    user-select: none;
    z-index: 0;
  }

  .jd-tumblr-post {
    position: relative;
    z-index: 1;
    max-width: 540px;
    width: 100%;
    margin: 0;
    padding: 22px 26px 18px;
    background: #fff;
    color: #444;
    text-align: left;
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 14px;
    line-height: 1.55;
    box-sizing: border-box;
  }

  .jd-tumblr-block {
    margin: 0 0 10px;
  }

  .jd-tumblr-block:last-child {
    margin-bottom: 0;
  }

  .jd-tumblr-user {
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 2px;
    color: #444;
  }

  .jd-tumblr-reblog {
    margin-top: 4px;
    padding-left: 18px;
    border-left: 3px solid #d8d8d8;
  }

  .jd-tumblr-reblog-from {
    margin: 0 0 10px;
    font-size: 13px;
    color: #888;
    font-style: normal;
  }

  .jd-tumblr-signoff {
    display: inline-block;
    margin-top: 6px;
  }

  .jd-tumblr-tags {
    margin: 16px 0 0;
    padding-top: 12px;
    border-top: 1px solid #eee;
    font-size: 13px;
    line-height: 1.65;
    color: #888;
  }

  .jd-tumblr-tag {
    margin-right: 14px;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .jd-tumblr-frame {
      padding: clamp(48px, 14vw, 64px) clamp(10px, 2.2vw, 18px) clamp(48px, 14vw, 64px) clamp(6px, 1.2vw, 10px);
    }

    .jd-tumblr-post {
      padding: 18px 20px 16px;
      font-size: 13px;
    }

    .jd-tumblr-tag {
      margin-right: 10px;
      white-space: normal;
    }
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
    min-height: 0 !important;
    border-radius: 4px;
  }

  .jd-photo-slot--reflection img {
    width: 100%;
    height: auto !important;
    display: block;
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

  .jd-meta-chip--link {
    text-decoration: none;
    cursor: pointer;
    transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
  }

  .jd-meta-chip--link:hover {
    border-color: rgba(201,151,42,0.65);
    background: rgba(250,245,236,0.12);
    color: var(--gold-lt);
  }

  .jd-hero-identity-linkedin {
    display: flex;
    justify-content: center;
    margin-top: 10px;
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
    max-width: 1000px;
    margin: 0 auto;
  }

  .jd-reflection-body::after {
    content: "";
    display: table;
    clear: both;
  }

  .jd-reflection-photo {
    float: right;
    width: min(46%, 480px);
    margin: 0 0 20px 40px;
    padding: 0;
    border: 0;
  }

  .jd-reflection-copy {
    text-align: left;
  }

  .jd-reflection-copy .jd-soundtrack {
    clear: both;
    margin-top: 28px;
  }

  .jd-reflection-copy .jd-rule {
    margin-left: 0;
  }

  @media (max-width: 768px) {
    .jd-book-panel { grid-template-columns: 1fr; }
    .jd-reflection-photo {
      float: none;
      width: 100%;
      max-width: 480px;
      margin: 0 auto 32px;
    }
    .jd-reflection-copy {
      text-align: center;
    }
    .jd-reflection-copy .jd-rule {
      margin-left: auto;
      margin-right: auto;
    }
  }

  /* ── HERO ── */
  .jd-hero {
    min-height: auto;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    background: var(--burg-dk);
    padding-bottom: clamp(150px, 18vh, 190px);
  }

  .jd-hero-back {
    position: absolute;
    top: clamp(22px, 3vh, 36px);
    left: clamp(24px, 4vw, 80px);
    z-index: 10;
  }

  .jd-hero-header {
    width: 100%;
    padding: clamp(56px, 8vh, 80px) clamp(24px, 5vw, 80px) clamp(12px, 2vh, 24px);
    text-align: center;
    position: relative;
    z-index: 2;
    overflow: visible;
  }

  .jd-hero-name {
    font-family: 'Great Vibes', cursive;
    font-size: clamp(3.25rem, 9vw, 7rem);
    font-weight: 400;
    line-height: 1.15;
    color: var(--cream);
    margin: 0 auto;
    letter-spacing: 0.02em;
    text-align: center;
    width: max-content;
    max-width: 100%;
    padding: 0.08em 0.24em 0.2em;
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
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: flex-start;
    gap: 16px 24px;
    margin-top: 14px;
    max-width: 720px;
    margin-left: auto;
    margin-right: auto;
  }

  .jd-hero-identity-chips .jd-meta-chip-wrap {
    flex: 0 1 auto;
    min-width: 0;
  }

  .jd-hero-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: clamp(36px, 5vh, 52px) clamp(24px, 5vw, 80px) clamp(28px, 4vh, 40px);
  }

  .jd-hero-identity {
    width: 100%;
    text-align: center;
    margin-bottom: clamp(18px, 2.5vh, 28px);
  }

  .jd-hero-identity .jd-kicker {
    display: block;
    margin-bottom: 10px;
  }

  .jd-hero-identity .jd-signature-wrap {
    margin: 0 auto;
  }

  .jd-hero-identity .jd-hero-name {
    font-size: clamp(3.25rem, 9vw, 7rem);
    margin: 0 auto;
    width: max-content;
    max-width: 100%;
    white-space: nowrap;
    text-align: center;
  }

  .jd-hero-identity .jd-hero-film-quote {
    margin: clamp(10px, 1.5vh, 14px) auto clamp(12px, 2vh, 18px);
  }

  .jd-hero-identity .jd-hero-identity-chips {
    margin-top: 0;
  }

  .jd-hero-stage {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: clamp(24px, 3.5vw, 44px);
    align-items: center;
    width: 100%;
  }

  .jd-hero-stage-photo {
    min-width: 0;
  }

  .jd-hero-stage-photo .jd-hero-film-stack {
    max-width: min(100%, 640px);
    margin: 0 auto;
  }

  .jd-hero-stage-copy {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: clamp(18px, 2.5vh, 24px);
  }

  .jd-hero-highlights {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  .jd-hero-highlights-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.9rem, 3.4vw, 2.55rem);
    font-style: italic;
    font-weight: 400;
    letter-spacing: 0.03em;
    text-transform: none;
    text-align: left;
    padding: 0 0 12px;
    margin: 0;
    border: none;
    border-bottom: 2px solid rgba(201, 151, 42, 0.45);
    background: transparent;
    color: var(--gold-lt);
    cursor: none;
    width: 100%;
    line-height: 1.15;
    transition: color 0.3s ease, border-color 0.3s ease;
  }

  .jd-hero-highlights-title:hover {
    color: var(--cream);
    border-bottom-color: var(--gold);
  }

  .jd-hero-highlights-title.active {
    color: var(--cream);
    border-bottom-color: var(--gold-lt);
  }

  .jd-hero-day-nav {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
  }

  .jd-hero-day-nav .jd-day-btn {
    text-align: left;
    padding: 10px 14px;
    font-size: 0.72rem;
    letter-spacing: 0.1em;
  }

  .jd-hero-story-panel {
    border-left: 3px solid var(--gold);
    padding-left: 20px;
    max-height: min(42vh, 340px);
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: thin;
    scrollbar-color: rgba(201, 151, 42, 0.45) transparent;
  }

  .jd-hero-story-panel::-webkit-scrollbar {
    width: 5px;
  }

  .jd-hero-story-panel::-webkit-scrollbar-thumb {
    background: rgba(201, 151, 42, 0.45);
    border-radius: 999px;
  }

  .jd-hero-day-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.85rem, 2.8vw, 2.35rem);
    font-style: italic;
    color: var(--gold-lt);
    margin-bottom: 6px;
    line-height: 1.15;
  }

  .jd-hero-day-subtitle {
    font-size: 0.78rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(250, 245, 236, 0.5);
    margin-bottom: 14px;
  }

  .jd-hero-stage-photo .jd-hero-film-stack .jd-film-frame-photo {
    object-fit: cover;
    object-position: center center;
  }

  @media (max-height: 860px) and (min-width: 901px) {
    .jd-hero-header {
      padding-top: clamp(48px, 7vh, 64px);
      padding-bottom: 8px;
    }

    .jd-hero-film-quote {
      font-size: clamp(1rem, 2.2vw, 1.35rem);
      margin-bottom: 0.35em;
    }

    .jd-hero-stage-photo .jd-hero-film-stack {
      max-width: min(100%, 500px);
    }

    .jd-hero-story-panel {
      max-height: min(36vh, 280px);
    }
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

  .jd-film-frame {
    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: 158 / 143;
    overflow: hidden;
    isolation: isolate;
    filter: drop-shadow(0 16px 32px rgba(0, 0, 0, 0.32));
    /* Measured from film-frame-single.png window cutout */
    --jd-film-window-top: 15.38%;
    --jd-film-window-bottom: 15.38%;
    --jd-film-window-left: 1.9%;
    --jd-film-window-right: 3.8%;
  }

  .jd-film-frame-overlay {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
    pointer-events: none;
    user-select: none;
    z-index: 1;
  }

  .jd-film-frame-window {
    position: absolute;
    top: var(--jd-film-window-top);
    left: var(--jd-film-window-left);
    right: var(--jd-film-window-right);
    bottom: var(--jd-film-window-bottom);
    z-index: 2;
    overflow: hidden;
    background: #050505;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
  }

  .jd-hero-film-wrap {
    width: 100%;
  }

  .jd-hero-film-stack {
    width: 100%;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    grid-template-rows: auto auto auto;
    align-items: stretch;
    justify-items: stretch;
    column-gap: 0;
    row-gap: 0;
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
    overflow: hidden;
  }

  .jd-film-strip-wrap--side {
    width: 100%;
    height: 100%;
    min-height: 0;
  }

  .jd-film-strip-wrap .jd-film-strip-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  .jd-hero-film-stack .jd-film-strip-wrap--row-top,
  .jd-hero-film-stack .jd-film-strip-wrap--row-bottom {
    width: 100%;
    aspect-ratio: 798 / 152;
  }

  .jd-film-strip-wrap--row-top,
  .jd-film-strip-wrap--row-bottom {
    width: 100%;
    aspect-ratio: 798 / 152;
    min-height: 0;
  }

  .jd-film-frames {
    position: absolute;
    inset: 0;
    z-index: 0;
    display: grid;
  }

  .jd-hero-film-stack .jd-film-frames--row,
  .jd-hero-film-stack .jd-film-frames--col {
    display: block;
  }

  /* Transparent window bounds measured from film-strip-full.png (798×152) */
  .jd-hero-film-stack .jd-film-frames--row .jd-film-slot:nth-child(1) {
    left: 0.75%;
    top: 15.79%;
    width: 18.67%;
    height: 65.79%;
  }

  .jd-hero-film-stack .jd-film-frames--row .jd-film-slot:nth-child(2) {
    left: 20.43%;
    top: 15.79%;
    width: 18.67%;
    height: 65.79%;
  }

  .jd-hero-film-stack .jd-film-frames--row .jd-film-slot:nth-child(3) {
    left: 40.1%;
    top: 15.79%;
    width: 18.67%;
    height: 65.79%;
  }

  .jd-hero-film-stack .jd-film-frames--row .jd-film-slot:nth-child(4) {
    left: 59.77%;
    top: 15.79%;
    width: 18.67%;
    height: 65.79%;
  }

  .jd-hero-film-stack .jd-film-frames--row .jd-film-slot:nth-child(5) {
    left: 79.57%;
    top: 15.79%;
    width: 18.67%;
    height: 65.79%;
  }

  /* Transparent window bounds measured from film-strip-side.png (152×798) */
  .jd-hero-film-stack .jd-film-frames--col .jd-film-slot:nth-child(1) {
    left: 15.79%;
    top: 1.75%;
    width: 65.79%;
    height: 18.67%;
  }

  .jd-hero-film-stack .jd-film-frames--col .jd-film-slot:nth-child(2) {
    left: 15.79%;
    top: 21.55%;
    width: 65.79%;
    height: 18.67%;
  }

  .jd-hero-film-stack .jd-film-frames--col .jd-film-slot:nth-child(3) {
    left: 15.79%;
    top: 41.23%;
    width: 65.79%;
    height: 18.67%;
  }

  .jd-hero-film-stack .jd-film-frames--col .jd-film-slot:nth-child(4) {
    left: 15.79%;
    top: 60.9%;
    width: 65.79%;
    height: 18.67%;
  }

  .jd-hero-film-stack .jd-film-frames--col .jd-film-slot:nth-child(5) {
    left: 15.79%;
    top: 80.58%;
    width: 65.79%;
    height: 18.67%;
  }

  .jd-film-frames--row {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 0.9%;
    padding: 2.8% 3.2%;
  }

  .jd-film-frames--col {
    grid-template-rows: repeat(5, minmax(0, 1fr));
    gap: 1.1%;
    padding: 3.4% 2.4%;
  }

  .jd-film-slot {
    overflow: hidden;
    min-width: 0;
    min-height: 0;
    position: relative;
    background: #0a0a0a;
  }

  .jd-hero-film-stack .jd-film-slot {
    position: absolute;
  }

  .jd-film-frame-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    display: block;
  }

  .jd-film-side-cell {
    grid-row: 1 / -1;
    display: flex;
    align-items: stretch;
    justify-content: center;
    width: auto;
    height: 100%;
    aspect-ratio: 152 / 798;
    min-width: 0;
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
    transform: scaleY(-1);
  }

  .jd-film-strip-wrap--row-bottom .jd-film-slot {
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
    aspect-ratio: 16 / 10;
    min-height: clamp(200px, 30vw, 300px);
    position: relative;
    line-height: 0;
    background: #050505;
    overflow: hidden;
    display: block;
    padding: 0;
  }

  .jd-hero-center-slot {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .jd-hero-center-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
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

  .jd-aux-note {
    display: block;
    margin-top: 8px;
    max-width: 220px;
    font-size: 0.68rem;
    line-height: 1.45;
    letter-spacing: 0.02em;
    text-transform: none;
    color: rgba(250,245,236,0.58);
    font-style: italic;
    white-space: normal;
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

  .jd-friends-layout {
    max-width: 1080px;
    margin: 0 auto;
  }

  .jd-friends-header {
    margin-bottom: 36px;
  }

  .jd-friends-header .jd-body {
    max-width: 640px;
  }

  .jd-friends-main {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(300px, 400px);
    gap: 32px 36px;
    align-items: start;
  }

  .jd-friends-stories {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .jd-friends-story {
    border-left: 3px solid var(--pink-lt);
    padding-left: 20px;
  }

  .jd-friends-story-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.35rem;
    font-style: italic;
    color: var(--gold-pale);
    margin: 0 0 8px;
  }

  .jd-friends-story p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.85;
    font-weight: 300;
    color: rgba(250, 245, 236, 0.88);
  }

  .jd-friends-mosaic {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    position: sticky;
    top: 88px;
  }

  .jd-friends-mosaic-item {
    border-radius: 2px;
    overflow: hidden;
    will-change: transform;
  }

  .jd-friends-mosaic-item--hero {
    grid-column: 1 / -1;
  }

  .jd-friends-mosaic-item .jd-photo-item {
    height: 100%;
    min-height: clamp(130px, 16vw, 168px);
  }

  .jd-friends-mosaic-item--hero .jd-photo-item {
    min-height: clamp(168px, 22vw, 220px);
  }

  @media (max-width: 900px) {
    .jd-friends-main {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    .jd-friends-mosaic {
      position: relative;
      top: auto;
      max-width: 520px;
      margin: 0 auto;
    }

    .jd-friends-header .jd-body {
      max-width: none;
    }
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
    max-width: 340px;
    aspect-ratio: 581 / 1024;
    height: auto;
    min-height: 0;
    max-height: min(72vh, 580px);
    margin: 0 auto;
  }

  .jd-jeronimos-intro .jd-sticky-zoom-copy {
    padding-top: 0;
    padding-bottom: 0;
  }

  .jd-jeronimos-gallery {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: clamp(8px, 1.2vw, 14px);
    width: 100%;
    max-width: 1080px;
    margin: 48px auto 0;
    align-items: start;
  }

  .jd-jeronimos-gallery .jd-film-frame-item {
    width: 100%;
  }

  .jd-jeronimos-gallery .jd-film-frame {
    max-width: none;
    margin-top: 0;
    width: 100%;
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

  .jd-film-perf {
    width: 100%;
    height: 7px;
    flex-shrink: 0;
    position: relative;
    z-index: 3;
    background:
      repeating-linear-gradient(90deg, rgba(250,245,236,0.1) 0 5px, transparent 5px 13px),
      #050505;
  }

  .jd-chapter-nav {
    background: linear-gradient(180deg, var(--burg) 0%, #3a0c18 100%);
    padding: 14px clamp(18px, 5vw, 80px) 25px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    border-top: 1px solid rgba(201,151,42,0.2);
    position: relative;
  }

  .jd-chapter-nav-head {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    padding-bottom: 4px;
    border-bottom: 1px solid rgba(201,151,42,0.22);
  }

  .jd-chapter-nav-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.75rem, 3.2vw, 2.35rem);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--cream);
    margin: 0;
    font-weight: 400;
    line-height: 1.05;
  }

  .jd-chapter-nav-sub {
    font-family: 'Jost', sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(250,245,236,0.55);
    margin: 0 0 2px;
  }

  .jd-chapter-nav-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .jd-chapter-nav::before,
  .jd-chapter-nav::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 7px;
    background:
      repeating-linear-gradient(90deg, rgba(250,245,236,0.1) 0 5px, transparent 5px 13px),
      #050505;
  }

  .jd-chapter-nav::before {
    top: 0;
    transform: translateY(-100%);
  }

  .jd-chapter-nav::after {
    bottom: 0;
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
    white-space: nowrap;
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
    flex-shrink: 0;
  }

  .jd-chapter-btn-label {
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.78rem;
    letter-spacing: 0.06em;
    color: var(--gold-pale);
    line-height: 1;
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
  @media (max-width: 900px) {
    .jd-hero-stage {
      grid-template-columns: 1fr;
      gap: 24px;
    }

    .jd-hero-identity-chips {
      flex-wrap: wrap;
    }

    .jd-hero-stage-photo {
      max-width: 520px;
      margin: 0 auto;
      width: 100%;
    }

    .jd-hero-story-panel {
      min-height: 0;
      max-height: none;
      overflow: visible;
    }
  }

  @media (max-width: 768px) {
    .jd-hero-header { padding-top: 72px; }
    .jd-hero-name { white-space: normal; font-size: clamp(3.75rem, 18vw, 5.5rem); line-height: 1.05; }
    .jd-hero-identity .jd-hero-name { white-space: normal; font-size: clamp(3.75rem, 18vw, 5.5rem); line-height: 1.05; }
    .jd-hero-main { padding-left: 20px; padding-right: 20px; }
    .jd-hero-identity-chips {
      flex-direction: column;
      align-items: center;
    }
    .jd-hero-stage-photo { max-width: 100%; padding-left: 0; padding-right: 0; }
    .jd-film-side-cell { aspect-ratio: 152 / 798; max-width: 72px; }
    .jd-film-strip-wrap--side { max-width: none; }
    .jd-hero-back { left: 20px; top: 20px; }
    .jd-hero-day-nav .jd-day-btn {
      font-size: 0.68rem;
      padding: 10px 12px;
      line-height: 1.35;
      text-align: left;
    }
    .jd-hero-bio .jd-film-frame { max-width: 100%; }
    .jd-map-section { padding: 60px 30px; }
    .jd-cities-layout { grid-template-columns: 1fr; gap: 40px; }
    .jd-cities-list { padding: 0; gap: 28px; }
    .jd-cities-list-note { max-width: none; }
    .jd-aux-deck-body { padding: 10px 16px 12px; gap: 12px; }
    .jd-chapter-btn {
      font-size: 0.62rem;
      padding: 8px 10px;
    }
    .jd-chapter-btn-label {
      font-size: 0.72rem;
    }
    .jd-karaoke-cartoon-note {
      font-size: 0.84rem;
      max-width: none;
    }
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
    .jd-aux-note { max-width: none; }
    .jd-spotify-embed { width: 100% !important; max-width: 100%; min-width: 0 !important; height: 80px !important; }
    .jd-section-label { display: none; }
    .jd-frame-badge { display: none; }
    .jd-chapter-nav { padding: 12px 16px 22px; }
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

/* ─── INTRO FLASH + CURSOR ──────────────────────────────────────────────────── */
const PORTUGAL_FLAG_FLASH_MS = 2000;
const WELCOME_SNAP_DELAY_AFTER_FLAG_MS = 2000;

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
    const done = window.setTimeout(() => setPhase("done"), PORTUGAL_FLAG_FLASH_MS);
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

/* ─── DATA ──────────────────────────────────────────────────────────────────── */
const me = {
  name: "Jaimee Douglas",
  linkedin: "https://www.linkedin.com/in/jaimee-douglas",
  academicLine: "Senior · AMP · MIS · Accounting",
  hometown: "Birmingham, AL & Plano, TX",
};

const PARIS_LAYOVER_STORY =
  "The trip almost ended before it even began. As a first-time international traveler, I was still figuring out the intricacies of international travel when I nearly boarded a train at Paris Charles de Gaulle. I realized I was headed in the wrong direction when Sofia B. (who was also on the same connecting flights as me and had run with me through Paris's airport to catch our plane, though we got separated) texted me the correct boarding gates. I then turned around and sprinted for 15 minutes to my correct gate, fearing I would miss my flight to Lisbon. Thankfully, I made it. That sprint became the story I told myself throughout the rest of the trip: I can land in the wrong place, panic, run, and still arrive at my destination. For a first-time traveler, that felt like the entire theme of the trip in just one afternoon.";

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
      `If you told me a year ago that I would be standing in a kitchen in Porto learning how to cook authentic Portuguese food alongside Michelin-star chefs, I probably would have laughed. I had never left the United States before this trip. But here we are, and honestly, it might be one of the best things I have done abroad.`,
      `As part of my study abroad experience, I had the chance to take a cooking class hosted by Chef Vetor and Chef Jorge. It was so much more than following a recipe: flour on my hands, broken Portuguese on my lips, and the smell of something incredible rising from the stove.`,
      `Sopa de Legumes is a silky, comforting Portuguese vegetable cream soup. Vegetarian-friendly and honestly one of the most satisfying things I have eaten on this trip. Simple ingredients, but the technique made all the difference.`,
      `The base is built from cucumbers, potatoes, onions, sweet potatoes, and cauliflower, all slowly cooked down and blended into a velvety cream. Chef Vetor and Chef Jorge walked us through building flavor layer by layer, explaining why each vegetable was added when it was and how the order of cooking affects the final depth.`,
      `No meat, no heavy seasoning: just fresh produce and technique. Every spoonful was smooth, warm, and grounding. This one is absolutely going into my regular rotation back home.`,
      `Pica-Pau is a Portuguese tavern classic: tender marinated meat with crusty bread for dipping into the sauce. The kind of dish made to be shared over good conversation, and it absolutely delivered.`,
      `Now for the inside scoop. That dish was not originally mine to make. One who shall not be named was stationed at the stove with it while I worked on my soup. I was not getting many good pictures at my station, so I asked if I could borrow his pot for a few photos (a quick "yes, I totally made this" moment for the blog). He said yes. I got my shots, turned around to hand things back, and he was gone.`,
      `Chef Vetor looked at me. I looked at the pot. Without missing a beat he kept instructing me on how to finish the dish. So I finished it. And honestly? Everyone loved it. You're welcome, one who shall not be named.`,
      `What I did not expect was how much intention goes into Portuguese cooking. They did not just teach recipes; they taught philosophy: why ingredients are paired, how Pica-Pau evolved from tavern culture, and how food in Portugal carries centuries of history in every bite.`,
      `Cooking with Michelin-star chefs sounds intimidating, and I would be lying if I said I did not have a few Gordon Ramsay flashbacks walking in. But Chef Vetor and Chef Jorge could not have been warmer. If you ever get a local cooking class abroad, especially with people who are truly passionate about their cuisine, do not hesitate.`,
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
      `I want to be upfront: I am not a surfer. I grew up in Alabama, and this was my first time abroad. The closest thing to a wave I had experienced was a lazy river. So when our Porto day paired a morning surf lesson with a Benfica match that night, I signed up knowing I would be bad at one and loud at the other.`,
      `Porto Surf School gave us foam boards and an instructor who had clearly watched a hundred first-timers wipe out. He was calm about it. I was not graceful. I fell more than I stood. Between sets, though, the ocean got quiet in a way my phone never does: no inbox, no itinerary, just water and sky and the sound of the Atlantic doing its job.`,
      `The boards are heavier than they look. By the time we walked back to the van, my arms were done. Tino, who shows up in my photos carrying a board that might as well have been furniture, took mine without making a big deal out of it. Thank you, Tino.`,
      `I did not catch many waves. I did catch the afternoon: salt on my skin, sand in places sand should not be, and the smug feeling of having tried something I had no business trying.`,
      `That night we were at Estádio da Luz in matching Benfica gear, singing along to chants I did not fully understand but absolutely felt. Surfing in the morning, flares at night. Same person, same day, two versions of brave.`,
      `If you are studying abroad in Portugal and you are on the fence about surf: go. You do not have to be good. You just have to show up, and maybe make friends with whoever carries the board back.`,
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
      `There are cities you visit, and then there are cities that visit you back. Lisbon is the latter, and it was only my first week in a country I had never seen before. I had done my research before arriving. I knew Portugal had once been one of the most powerful seafaring empires on earth. But knowing something intellectually and standing inside it are two entirely different experiences, especially when you have no personal memory of anywhere like it. Belém taught me that.`,
      `Belém is a waterfront neighborhood on the edge of Lisbon, where Portugal's great explorers once departed into the unknown. Walking through it felt like moving through a living archive.`,
      `Our first stop was the Jerónimos Monastery, a UNESCO World Heritage Site that stopped me in my tracks. The Manueline architecture is unlike anything I had seen before: stone carved with ropes, coral, armillary spheres, and sea creatures, as if the building itself is telling you it was built by a people obsessed with the ocean. Inside, the silence asks something of you. You slow down. You look up. You stay longer than you planned.`,
      `The moment that truly stayed with me came inside the adjoining museum, in front of a depiction of the Portuguese explorer Diogo Cão. He is shown erecting a stone pillar, a padrão, on the Atlantic coast of Africa during the 15th-century Age of Discoveries. Portugal used these pillars to mark newly claimed territories as explorers pushed further into uncharted waters.`,
      `What struck me was how deliberate and defiant the act was. This was not just navigation. This was declaration. Diogo Cão was among the first Europeans to explore the western coast of Africa, sailing further south than anyone before him. At each significant arrival he stopped and built something permanent: a stone pillar bearing the Portuguese coat of arms, left on foreign soil as proof that someone had been bold enough to come this far.`,
      `We also learned about Infante D. Henrique, Prince Henry the Navigator, whose patronage and obsession with maritime exploration set the entire Age of Discoveries in motion. He never sailed on the great voyages himself, but without him, they likely would never have happened.`,
      `We ended the day at the Monument of the Discoveries, standing at the edge of the Tagus River. The monument is massive: Henry the Navigator at the bow with 32 historical figures behind him, all leaning forward, all facing the sea.`,
      `Study abroad has a way of doing this to you. You sign up expecting to learn, and you do, but not always in the ways you anticipated. Sometimes the lesson is a painting of a man planting a pillar in foreign soil. Sometimes it is the silence inside a monastery that has stood for five centuries. Sometimes it is just the river, and the weight of everything it has carried.`,
      `Lisbon will visit you back. Go let it.`,
    ],
  },
];

const FERNANDO_PESSOA = {
  title: "Fernando Pessoa · Poems",
  quote: "I am the size of whatever I see.",
  note: "I bought this in a Portuguese bookstore on my first trip abroad, and it has lived in my carry-on since. Pessoa wrote under dozens of names; that line felt unfairly accurate for this trip. Some days I felt huge (Michelin dinner, Benfica roar) and some days small (lost in an airport terminal, arms dead after surfing). Study abroad resized me depending on what I was brave enough to look at.",
  cover: "/students/jaimee-douglas/pessoa-book.png",
};

/** Short beats for the friends section — names and places you already mention elsewhere. */
const GROUP_MOMENTS = [
  {
    title: "Paris, before Portugal",
    body: PARIS_LAYOVER_STORY,
  },
  {
    title: "Cook in Ribeira",
    body: "The whole cohort in one Porto kitchen with Chef Vetor and Chef Jorge: flour on everyone's hands, broken Portuguese, and the day I borrowed someone else's Pica-Pau station for photos and accidentally became head chef. (The full confession is in Bama Blog entry one.)",
  },
  {
    title: "On the Douro",
    body: "Boat portraits, river light, the kind of group photos you take when you know the trip is ending. We kept migrating to the front deck the way you gravitate toward the good lighting.",
  },
  {
    title: "Beach circle",
    body: "Holding hands in a circle on the sand: corny on paper, sincere in person. Twenty MIS students who started as names on a roster and left as people I would recognize in an airport. That was the cohort version of the trip working: strangers at the start of my first abroad, family by the end.",
  },
];

const HERO_PHOTO = "/students/jaimee-douglas/hero-portrait.png";
const FILM_STRIP_SRC = "/students/jaimee-douglas/film-strip-full.png";
const FAVORITE_DAY_FRAME_SRC = "/students/jaimee-douglas/film-frame-single.png";
const FILM_STRIP_SIDE_SRC = "/students/jaimee-douglas/film-strip-side.png";
const FILM_BASE = "/students/jaimee-douglas/film";

/** 20 trip photos — people spaced so no two portraits sit side-by-side on any strip. */
const FILM_STRIP_PHOTOS = {
  top: [
    { src: `${FILM_BASE}/stained-glass.jpg`, alt: "Jaimee on the Douro River", objectPosition: "center 35%" },
    { src: `${FILM_BASE}/boat-portrait.jpg`, alt: "Douro valley from the river", objectPosition: "center center" },
    { src: `${FILM_BASE}/benfica-flares.jpg`, alt: "Jaimee on the farewell cruise", objectPosition: "center 30%" },
    { src: `${FILM_BASE}/surf-lesson.jpg`, alt: "Surf lesson on Porto beach", objectPosition: "center center" },
    { src: `${FILM_BASE}/discovery-map.jpg`, alt: "SL Benfica stadium at night", objectPosition: "center center" },
  ],
  bottom: [
    { src: `${FILM_BASE}/surf-lesson.jpg`, alt: "Surf lesson on Porto beach", objectPosition: "center 20%" },
    { src: `${FILM_BASE}/compass-panel.jpg`, alt: "Wind rose of Brazil, c. 1560", objectPosition: "center center" },
    { src: `${FILM_BASE}/surf-portrait.jpg`, alt: "Jaimee with surfboard", objectPosition: "center 25%" },
    { src: `${FILM_BASE}/maritime-painting.jpg`, alt: "Privateering in the Mediterranean", objectPosition: "center center" },
    { src: `${FILM_BASE}/peacock.jpg`, alt: "Peacock at Pena Palace gardens", objectPosition: "center center" },
  ],
  left: [
    { src: `${FILM_BASE}/chapel-interior.jpg`, alt: "Coimbra University chapel organ", objectPosition: "center center" },
    { src: `${FILM_BASE}/boat-portrait-c.jpg`, alt: "Portrait on the river cruise", objectPosition: "center 35%" },
    { src: `${FILM_BASE}/map-hall.jpg`, alt: "Cartography hall at Jerónimos", objectPosition: "center center" },
    { src: `${FILM_BASE}/friends-boat.jpg`, alt: "Friends on the farewell boat ride", objectPosition: "center 30%" },
    { src: `${FILM_BASE}/cassette-door.jpg`, alt: "Cassette-covered unisex door in Lisbon", objectPosition: "center center" },
  ],
  right: [
    { src: `${FILM_BASE}/surf-beach.jpg`, alt: "Jaimee at Porto Surf School", objectPosition: "center 20%" },
    { src: `${FILM_BASE}/compass-panel.jpg`, alt: "Wind rose of Brazil, c. 1560", objectPosition: "center center" },
    { src: `${FILM_BASE}/boat-portrait-d.jpg`, alt: "Golden hour on the water", objectPosition: "center 35%" },
    { src: `${FILM_BASE}/night-boat.jpg`, alt: "Porto skyline from the Douro at night", objectPosition: "center center" },
    { src: `${FILM_BASE}/cassette-bag.jpg`, alt: "Acoustic cassette bag at Duque Restaurante, Lisbon", objectPosition: "center center" },
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
    }, PORTUGAL_FLAG_FLASH_MS + WELCOME_SNAP_DELAY_AFTER_FLAG_MS);

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

function FilmStripFrames({ photos, orientation }) {
  const slots = photos.slice(0, 5);
  return (
    <div className={`jd-film-frames jd-film-frames--${orientation}`}>
      {slots.map((photo, i) => (
        <div key={`${photo.src}-${i}`} className="jd-film-slot">
          <img
            src={photo.src}
            alt={photo.alt}
            className="jd-film-frame-photo"
            style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined}
            loading="lazy"
          />
        </div>
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

function HeroFilmPortrait({ centerSrc, centerAlt, objectPosition = "center center" }) {
  return (
    <div className="jd-hero-film-stack">
      <div className="jd-film-side-cell jd-film-side-cell--left">
        <FilmStripColumn photos={FILM_STRIP_PHOTOS.left} />
      </div>
      <FilmStripRow photos={FILM_STRIP_PHOTOS.top} />
      <div className="jd-hero-film-photo">
        <AnimatePresence mode="wait">
          <motion.div
            key={centerSrc}
            className="jd-hero-center-slot"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: fadeEase }}
          >
            <img
              src={centerSrc}
              alt={centerAlt}
              className="jd-hero-center-photo"
              style={{ objectPosition }}
              width={1600}
              height={1000}
              decoding="async"
            />
          </motion.div>
        </AnimatePresence>
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
    tagline: "First stamp in my passport. First food I could not name.",
    accent: C.royal,
    photo: "/students/jaimee-douglas/favorite-day-may6-lisbon.png",
    photoPosition: "center center",
    description:
      "After the Paris airport sprint, I landed in Lisbon for the first time in my life: jet-lagged, shaky, and already out of my comfort zone. Cobblestones fought my shoes, azulejo was everywhere, and at the welcome dinner I said yes to prawns and octopus before my brain caught up. I am usually a chicken-tenders person. Day one was not polished. It was real.",
  },
  {
    id: "may13",
    label: "May 13",
    title: "Michelin Night",
    subtitle: "Le Monument, Porto",
    tagline: "Four hours. Ten courses. The night I stopped playing it safe.",
    accent: C.gold,
    photo: "/students/jaimee-douglas/favorite-day-may13-michelin.png",
    photoPosition: "center 35%",
    description:
      "By the middle of the trip I was not the same person who had almost missed her connection in Paris. Le Monument in Porto was the night this up-and-coming chef met fine dining and lost the argument in the best way. Petits fours before we sat down, then course after course: egg in a nest, seafood on a river stone, lamb with flowers I was afraid to ruin. Four hours at one table sounds excessive until you are two hours in and hoping they never stop.",
  },
  {
    id: "may18",
    label: "May 18",
    title: "Douro Farewell Cruise",
    subtitle: "Douro River, Porto",
    tagline: "Front of the boat. City lights. The last night of my first abroad.",
    accent: C.emerald,
    photo: "/students/jaimee-douglas/favorite-day-may18-douro.png",
    photoPosition: "center 40%",
    description:
      "Our last night: farewell cruise on the Douro, everyone drifting to the front of the boat for photos and laughter while the river went dark and Porto lit up along the banks. I had Beyoncé in my ears and a group I did not want to say goodbye to yet. I thought about Paris, about the welcome dinner, about karaoke. First abroad has an ending. This one hurt a little, which meant it mattered.",
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

const AUX_PLAYLIST_NOTE =
  "Fair warning: I just saw the new Michael Jackson movie, so you all will have to endure my rediscovered MJ obsession on this playlist.";

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
  { label: "Group Moments", id: "friends" },
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
          <span className="jd-aux-note">{AUX_PLAYLIST_NOTE}</span>
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
            Reel {frame} · {sec.label}
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
function TumblrBlogIntro() {
  return (
    <div className="jd-tumblr-frame-wrap">
      <div className="jd-tumblr-frame">
        <div className="jd-tumblr-post">
          <p className="jd-tumblr-block">
            <span className="jd-tumblr-user">juicy-B-jones</span>
            <br />
            Breaking news from your favorite study abroad correspondent. I&apos;ve received a few tips that Jaimee was spotted leaving the country, one would even say minutes after the semester ended. The people would like to know where she is headed in such a rush. If anyone&apos;s seen J, please alert yours truly.
          </p>
          <div className="jd-tumblr-reblog">
            <p className="jd-tumblr-block">
              <span className="jd-tumblr-user">juicy-B-jones</span>
            </p>
            <p className="jd-tumblr-reblog-from">reblogged from juicy-B-jones:</p>
            <p className="jd-tumblr-block">
              Update: The entries are live, don&apos;t say I didn&apos;t warn you.
              <br />
              filed under: portugal, growth, and things you had to be there for.
              <br />
              three entries. all the tea. tap to read.
              <br />
              <span className="jd-tumblr-signoff">xo xo GOSSIP GIRL</span>
            </p>
          </div>
          <p className="jd-tumblr-tags">
            <span className="jd-tumblr-tag">#study abroad</span>
            <span className="jd-tumblr-tag">#portugal</span>
            <span className="jd-tumblr-tag">#field notes</span>
            <span className="jd-tumblr-tag">#lisbon</span>
            <span className="jd-tumblr-tag">#tumblr girls</span>
          </p>
        </div>
        <img
          src={FAVORITE_DAY_FRAME_SRC}
          alt=""
          className="jd-tumblr-frame-overlay"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

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
  "Unfortunately, we did not capture any pictures that night, so I drew this cartoon instead. I prefer to live in the moment. Some things are meant to be remembered, not filmed on your phone.";

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
  { src: "/students/jaimee-douglas/friends-boat-night-singing.jpg", alt: "Singing on the Douro at night with Porto and the bridge lit up behind the boat", caption: "Douro at night", color: C.royalLt, objectPosition: "center 40%" },
];

function FriendsMosaicTile({ photo, index, layoutClass, scrollYProgress, reduced }) {
  const drift = 10 + index * 4;
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [drift, -drift]);

  return (
    <motion.div
      className={["jd-friends-mosaic-item", layoutClass].filter(Boolean).join(" ")}
      style={reduced ? undefined : { y }}
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: "easeOut" }}
    >
      <PhotoSlot
        src={photo.src}
        alt={photo.alt}
        caption={photo.caption}
        color={photo.color}
        objectPosition={photo.objectPosition}
        style={{ height: "100%" }}
      />
    </motion.div>
  );
}

function FriendsPhotoMosaic({ photos }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={ref} className="jd-friends-mosaic">
      {photos.map((photo, index) => {
        const layoutClass = index === 0 ? "jd-friends-mosaic-item--hero" : "";
        return (
          <FriendsMosaicTile
            key={photo.src}
            photo={photo}
            index={index}
            layoutClass={layoutClass}
            scrollYProgress={scrollYProgress}
            reduced={reduced}
          />
        );
      })}
    </div>
  );
}

const KARAOKE_REVEAL_LINE = "I had not sung in over six months";

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

function FilmStripPhotoFrames({ photos, useCaptions = false }) {
  return (
    <div
      className="jd-parallax-film-frames jd-film-frames jd-film-frames--row"
      style={{ gridTemplateColumns: `repeat(${photos.length}, minmax(0, 1fr))` }}
    >
      {photos.map((photo) => (
        <PhotoSlot
          key={photo.src}
          className={[
            "jd-parallax-film-frame",
            photo.contain ? "jd-photo-item--contain" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          src={photo.src}
          alt={photo.alt}
          caption={useCaptions ? photo.caption : undefined}
          color={photo.color}
          objectFit={photo.contain ? "contain" : "cover"}
          objectPosition={photo.objectPosition}
        />
      ))}
    </div>
  );
}

function FilmFramePhoto({
  src,
  alt,
  caption,
  objectPosition = "center center",
  className = "",
}) {
  const [showCaption, setShowCaption] = useState(false);
  const itemClass = [
    "jd-photo-item",
    "jd-film-frame-item",
    caption ? "jd-photo-item--has-caption" : "",
    showCaption ? "jd-photo-item--show-caption" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={itemClass}
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
      <div className="jd-film-frame">
        <img
          className="jd-film-frame-overlay"
          src={FAVORITE_DAY_FRAME_SRC}
          alt=""
          aria-hidden="true"
        />
        <div
          className="jd-film-frame-window"
          role="img"
          aria-label={alt}
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: objectPosition,
          }}
        />
      </div>
      {caption && <div className="jd-photo-caption">{caption}</div>}
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

function ParallaxFilmStripRow({ photos, x, flip = false, showLabels = true, useCaptions = false }) {
  const segments = Math.max(1, Math.ceil(photos.length / 5));

  return (
    <div className="jd-parallax-film-row-wrap">
      <motion.div className="jd-parallax-film-row" style={{ x }}>
        {[0, 1].map((dup) => (
          <div key={dup} className="jd-parallax-film-unit">
            <div className="jd-parallax-film-body">
              <FilmStripPhotoFrames photos={photos} useCaptions={useCaptions} />
              <FilmStripOverlay segments={segments} flip={flip} />
            </div>
            {showLabels && <FilmStripPhotoLabels photos={photos} />}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function ParallaxFilmStrips({ photos, showLabels = true, useCaptions = false, className = "" }) {
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
  const stripClass = ["jd-parallax-film-strips", className].filter(Boolean).join(" ");

  if (reduced) {
    return (
      <div className={stripClass}>
        {[rowTop, rowBottom].map((row, i) => (
          <div key={i} className="jd-parallax-film-unit" style={{ width: "100%", maxWidth: 920, margin: "0 auto" }}>
            <div className="jd-parallax-film-body">
              <FilmStripPhotoFrames photos={row} useCaptions={useCaptions} />
              <FilmStripOverlay segments={Math.ceil(row.length / 5)} flip={i === 1} />
            </div>
            {showLabels && <FilmStripPhotoLabels photos={row} />}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={`${stripClass} jd-parallax-film-strips--bleed`}>
      <ParallaxFilmStripRow photos={rowTop} x={xTop} showLabels={showLabels} useCaptions={useCaptions} />
      {rowBottom.length > 0 && (
        <ParallaxFilmStripRow photos={rowBottom} x={xBottom} flip showLabels={showLabels} useCaptions={useCaptions} />
      )}
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
  { src: "/students/jaimee-douglas/jeronimos-stained-glass.png", alt: "Triangular stained glass at Jerónimos", caption: "Manueline glass", objectPosition: "center" },
  { src: "/students/jaimee-douglas/jeronimos-map-hall.png", alt: "Jerónimos map room with stained glass", caption: "The age of discovery", objectPosition: "center 40%" },
  { src: "/students/jaimee-douglas/jeronimos-padrao-painting.png", alt: "Painting of explorers erecting a padrão", caption: "Erecting the padrão", objectPosition: "center 45%" },
  { src: "/students/jaimee-douglas/jeronimos-navigator-mural.png", alt: "Navigator school mural", caption: "Prince Henry's school", objectPosition: "center 35%" },
];

function JeronimosGallery() {
  return (
    <div className="jd-jeronimos-gallery">
      {JERONIMOS_GALLERY.map((photo) => (
        <FilmFramePhoto
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          caption={photo.caption}
          objectPosition={photo.objectPosition}
        />
      ))}
    </div>
  );
}

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

/* ─── FILM PERFORATION ─────────────────────────────────────────────────────── */
function FilmPerforation() {
  return <div className="jd-film-perf" aria-hidden="true" />;
}

/* ─── SECTION WRAPPER ──────────────────────────────────────────────────────── */
function Section({ id, children, style = {}, className = "", filmTop = false }) {
  return (
    <>
      {filmTop && <FilmPerforation />}
      <section id={id} className={className ? `jd-section ${className}` : "jd-section"} style={style}>
        {children}
      </section>
    </>
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
  /** null = hero portrait in the center frame (default / Trip highlights). */
  const [activeDayId, setActiveDayId] = useState(null);
  const [openBlog, setOpenBlog] = useState(-1);
  const reducedMotion = usePrefersReducedMotion();
  const [heroChipsReady, setHeroChipsReady] = useState(reducedMotion);
  const showHeroChips = heroChipsReady || reducedMotion;
  const currentSection = useActiveSection(SECTION_IDS);
  const ambientBg = AMBIENT_BY_SECTION[currentSection] ?? AMBIENT_BY_SECTION.hero;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeDay = activeDayId ? FAVORITE_DAYS.find((d) => d.id === activeDayId) ?? null : null;
  const centerPhoto = activeDay
    ? {
        src: activeDay.photo,
        alt: `${activeDay.title} · ${activeDay.subtitle}`,
        objectPosition: activeDay.photoPosition ?? "center center",
      }
    : {
        src: HERO_PHOTO,
        alt: "Jaimee Douglas at Jerónimos Monastery",
        objectPosition: "center 38%",
      };

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

          <div className="jd-hero-main">
            <motion.header
              className="jd-hero-identity"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
            >
              <span className="jd-kicker">UA MIS · Portugal 2026 · First time abroad</span>
              <SignatureHeroName
                play={currentSection === "hero"}
                onComplete={() => setHeroChipsReady(true)}
              />
              <motion.div
                className="jd-hero-identity-linkedin"
                initial={false}
                animate={{ opacity: showHeroChips ? 1 : 0, y: showHeroChips ? 0 : 8 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <a
                  href={me.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jd-meta-chip jd-meta-chip--link"
                  aria-label="Jaimee Douglas on LinkedIn (opens in a new tab)"
                >
                  LinkedIn
                </a>
              </motion.div>
              <motion.p
                className="jd-hero-film-quote"
                initial={false}
                animate={{ opacity: showHeroChips ? 1 : 0, y: showHeroChips ? 0 : 8 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                My first time abroad, on film. Say cheese!
              </motion.p>
              <motion.div
                className="jd-hero-identity-chips"
                initial={false}
                animate={{ opacity: showHeroChips ? 1 : 0, y: showHeroChips ? 0 : 10 }}
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
            </motion.header>

            <div className="jd-hero-stage">
              <motion.div
                className="jd-hero-stage-photo"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.85, delay: 0.06, ease: "easeOut" }}
              >
                <HeroFilmPortrait
                  centerSrc={centerPhoto.src}
                  centerAlt={centerPhoto.alt}
                  objectPosition={centerPhoto.objectPosition}
                />
              </motion.div>

              <motion.div
                className="jd-hero-stage-copy"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.85, delay: 0.12, ease: "easeOut" }}
              >
                <div className="jd-hero-highlights">
                  <button
                    type="button"
                    className={`jd-hero-highlights-title${activeDayId === null ? " active" : ""}`}
                    onClick={() => setActiveDayId(null)}
                  >
                    Portrait · Trip highlights
                  </button>
                  <div className="jd-hero-day-nav">
                    {FAVORITE_DAYS.map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        className={`jd-day-btn${activeDayId === d.id ? " active" : ""}`}
                        onClick={() => setActiveDayId(d.id)}
                      >
                        {d.label} · {d.title}
                      </button>
                    ))}
                    <button type="button" className="jd-day-btn" onClick={() => scrollTo("bama-blog")}>
                      Bama Blog entries
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDay?.id ?? "hero-story"}
                    className="jd-hero-story-panel"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: fadeEase }}
                    style={{ borderLeftColor: activeDay?.accent ?? C.gold }}
                  >
                    {activeDay ? (
                      <>
                        <div className="jd-hero-day-title">{activeDay.title}</div>
                        <div className="jd-hero-day-subtitle">{activeDay.subtitle}</div>
                        <p className="jd-body" style={{ marginBottom: 16 }}>
                          {activeDay.description}
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.92rem",
                            fontStyle: "italic",
                            color: C.pinkLt,
                            lineHeight: 1.6,
                          }}
                        >
                          &ldquo;{activeDay.tagline}&rdquo;
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="jd-hero-day-title">My portrait</div>
                        <p className="jd-body" style={{ marginBottom: 0 }}>
                          Music has always been how I make sense of things, so when I went to Portugal, I brought a
                          playlist and let it do the heavy lifting. Every city, every meal, every moment that stopped me
                          in my tracks had a song underneath it. This page is my attempt to give you both: the trip and
                          the soundtrack it deserved. Pick a day above to start where I did, the photo shifts, the story
                          changes, and the feeling follows. The rest of the film keeps running below.
                        </p>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Chapter nav — film reel index */}
        <div className="jd-chapter-nav">
          <header className="jd-chapter-nav-head">
            <span className="jd-kicker">Scene Guide</span>
            <h2 className="jd-chapter-nav-title">Reel Index</h2>
            <p className="jd-chapter-nav-sub">Scenes from my first time abroad. Tap a frame to jump ahead.</p>
          </header>
          <div className="jd-chapter-nav-buttons">
            {CHAPTER_NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                className="jd-chapter-btn"
                onClick={() => scrollTo(item.id)}
              >
                <span className="jd-chapter-btn-frame">{SECTION_FRAME[item.id]}</span>
                <span className="jd-chapter-btn-label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CITY MAP ── */}
      <Section id="cities" filmTop className="jd-section--cities" style={{ background: "rgba(26,58,122,0.92)" }}>
        <FadeUp>
          <span className="jd-kicker">The route</span>
          <h2 className="jd-h2" style={{ marginBottom: 16 }}>Cities I <em style={{ color: C.pinkLt }}>Loved</em></h2>
          <p className="jd-body" style={{ maxWidth: 520, marginBottom: 32 }}>
            I had never navigated a foreign country on my own before Portugal. These four cities are where the trip stopped feeling like a brochure and started feeling like mine.
          </p>
          <div className="jd-rule" style={{ width: 60, marginLeft: 0, marginBottom: 48 }} />
          <SectionSoundtrack sectionId="cities" style={{ marginTop: 0, marginBottom: 48 }} />
        </FadeUp>

        <div className="jd-cities-layout">
          <PortugalCitiesMap onCityClick={scrollTo} />

          <div className="jd-cities-list">
            {[
              {
                city: "Lisbon",
                note: "Where I landed jet-lagged, ate things I could not pronounce at the welcome dinner, and closed out the trip at karaoke with Olivia: Tia Tamera, then Beyoncé, and no photos because I was busy living in the moment.",
                color: C.burgundy,
              },
              {
                city: "Porto",
                note: "Surf school in the morning, Le Monument at night, and a cooking class where I unwillingly borrowed someone else's station. Also: the McDonald's stop when my adventurous-eater energy ran out.",
                color: C.goldLt,
              },
              {
                city: "Sintra",
                note: "Pena Palace in actual mist: lavender tile, gold dome, me squinting like the weather was part of the ticket price.",
                color: C.emerald,
              },
              {
                city: "Coimbra",
                note: "Oldest university chapel in Portugal. Students in black capes on the stairs. I looked up at the organ and forgot to take a mediocre photo for once.",
                color: C.gold,
              },
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
      <Section id="food" filmTop className="jd-section--food" style={{ background: "rgba(107,26,42,0.9)" }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className="jd-kicker">Two cities, many plates</span>
          <h2 className="jd-h2" style={{ marginBottom: 16 }}>
            Lisbon & <em style={{ color: C.pinkLt }}>Porto</em>
          </h2>
          <div className="jd-rule" style={{ width: 60, marginLeft: 0, marginBottom: 32 }} />
          <p className="jd-body" style={{ maxWidth: 560, marginBottom: 32 }}>
            I had never built a meal around octopus or polvo before this trip. From pastéis in Belém to francesinhas by the Douro, I ate many new foods in both cities and that surprised even me. I am usually a picky eater, and once I find something I like, I tend to stick with it. On my first time abroad I pushed myself anyway. I am normally a chicken tenders and French fries person, but I switched things up for Portugal. When the adventurous phase wore off, I still found a McDonald&apos;s and ordered chicken nuggets with BBQ sauce. Trying new things was starting to wear me out, and the nuggets were exactly what I needed.
          </p>
          <SectionSoundtrack sectionId="food" style={{ marginTop: 0, marginBottom: 48 }} />
        </motion.div>
        <ParallaxFilmStrips photos={FOOD_PARALLAX_PHOTOS} />
      </Section>

      {/* ── SURF + BENFICA ── */}
      <Section id="surf-benfica" filmTop style={{ background: "rgba(74,15,28,0.92)" }}>
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
              One Porto day: surf school in the morning, Benfica at night. First board, first match abroad. I fell more than I stood, then got loud at Estádio da Luz. Same day, two kinds of brave.
            </p>
            <p className="jd-body">
              The photos are here; Tino, the van, and the full wipeout count are in Bama Blog entry two.
            </p>
            <SectionSoundtrack sectionId="surf-benfica" />
          </motion.div>
          <div className="jd-surf-benfica-gallery">
            <SurfBenficaGallery />
          </div>
        </div>
      </Section>

      {/* ── COOKING CLASS ── */}
      <Section id="cooking-class" filmTop style={{ background: "rgba(250,245,236,0.97)" }}>
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
            In a Porto kitchen with Chef Vetor and Chef Jorge, we prepped sopa de legumes and finished Pica-Pau: flour on hands, broken Portuguese, Michelin-star calm. These photos are the honest part. The borrowed-pot confession is in Bama Blog entry one.
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
                  Marinated beef, mushrooms, and a fried egg. Tavern food built for dipping crusty bread into the sauce.
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
                  Silky vegetable cream: cucumber, potato, sweet potato, cauliflower. Vegetarian and going into my rotation at home.
                </p>
              </div>
            </div>
          </div>

          <p style={{ fontSize: "0.92rem", color: C.inkSoft, lineHeight: 1.8, fontStyle: "italic", borderLeft: `3px solid ${C.burgundy}`, paddingLeft: 20, margin: 0 }}>
            Intimidating on paper; warm and hands-on in person. Entry one has the philosophy and the accident.
          </p>
          <SectionSoundtrack sectionId="cooking-class" light />
        </div>
      </Section>

      {/* ── JERÓNIMOS ── */}
      <Section id="monastery" filmTop className="jd-section--monastery" style={{ background: "rgba(74,15,28,0.9)" }}>
        <StickyZoomReveal
          compact
          className="jd-jeronimos-intro"
          src="/students/jaimee-douglas/jeronimos-1.png"
          alt="Jerónimos Monastery collage with portrait and cloister views"
          caption="Jerónimos Monastery, Belém"
          color={C.royal}
          objectFit="contain"
          objectPosition="center center"
        >
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="jd-kicker">Belém · Lisbon</span>
            <h2 className="jd-h2" style={{ marginBottom: 16 }}>Jerónimos <em style={{ color: C.pinkLt }}>Monastery</em></h2>
            <div className="jd-rule" style={{ width: 60, marginLeft: 0, marginBottom: 28 }} />
            <p className="jd-body" style={{ marginBottom: 20 }}>
              Jerónimos stopped me at the door: rope and coral carved into stone, cloister silence on my first trip abroad. I looked up and forgot to take a mediocre photo.
            </p>
            <p className="jd-body" style={{ marginBottom: 20 }}>
              Her's <em>What Once Was</em> was already in my headphones, and the title landed differently inside those walls. The monastery stood on generations of monks' dedication until 1833, when the state secularized it and forced them out. I held that silence in the moment to remember what once was.
            </p>
            <p className="jd-body">
              For Diogo Cão, Prince Henry, and the Monument of the Discoveries, read Bama Blog entry three.
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
      <Section id="pena-palace" filmTop style={{ background: "rgba(26,107,69,0.92)" }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="jd-kicker" style={{ color: C.goldLt }}>Sintra · Coimbra</span>
          <h2 className="jd-h2" style={{ marginBottom: 16 }}>
            Pena Palace <em style={{ color: C.goldPale }}>&amp; the Universidade de Coimbra</em>
          </h2>
          <div className="jd-rule" style={{ width: 60, marginBottom: 28 }} />
          <p className="jd-body" style={{ maxWidth: 560, margin: "0 auto 28px" }}>
            Sintra gave us Pena Palace in real mist: not postcard weather, but better weather. Terraces, peacocks, colors that look fake until you are standing in them. Coimbra gave us the chapel organ and students in traje académico on the stairs, capes and all. One day felt like a fairy tale; the other felt like every old movie about college, except you are in it.
          </p>
          <SectionSoundtrack sectionId="pena-palace" center style={{ marginTop: 0 }} />
        </motion.div>

        <PenaCoimbraCollage />
      </Section>

      {/* ── KARAOKE ── */}
      <Section id="karaoke" filmTop style={{ background: "rgba(46,95,191,0.9)", position: "relative", overflow: "hidden" }}>
        {/* Decorative glow */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: `radial-gradient(circle, rgba(201,151,42,0.15) 0%, transparent 70%)`, pointerEvents: "none" }} />

        <div className="jd-karaoke-layout">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="jd-kicker" style={{ color: C.goldLt }}>Last nights in Lisbon</span>
            <h2 className="jd-h2" style={{ marginBottom: 16 }}>Karaoke with <em style={{ color: C.goldPale }}>Olivia</em></h2>
            <div className="jd-rule" style={{ width: 60, marginLeft: 0, marginBottom: 28 }} />
            <p className="jd-body" style={{ marginBottom: 20 }}>
              One of our last nights in Lisbon, Olivia and I decided to close it out with a duet of <em>Tia Tamera</em>, full commitment. The crowd woke up. That one song turned into a full night: duets with others pulling me back up, music ranging from Queen to Michael Jackson to everything in between, and somewhere in the middle I snuck in a solo of Beyoncé&apos;s <em>All Night</em>.
            </p>
            <p className="jd-body" style={{ marginBottom: 16 }}>
              People stopped me afterward to say how much they loved it. I had not sung in over six months, but the crowd at the karaoke bar was not counting. They loved my voice, which was a pleasant surprise since it was my first time singing in front of an audience.
            </p>
            <ScrollWordReveal text={KARAOKE_REVEAL_LINE} />
            <div style={{ padding: "16px 20px", background: "rgba(0,0,0,0.2)", borderRadius: 4, borderLeft: `3px solid ${C.goldLt}`, marginTop: 20 }}>
              <span style={{ fontSize: "0.75rem", fontStyle: "italic", color: C.goldPale, lineHeight: 1.6, display: "block" }}>
                Then Lisbon gave me a microphone. The room was with me.
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
      <Section id="friends" filmTop style={{ background: "rgba(107,26,42,0.88)" }}>
        <div className="jd-friends-layout">
          <FadeUp className="jd-friends-header">
            <span className="jd-kicker">On the trip</span>
            <h2 className="jd-h2" style={{ marginBottom: 16 }}>Group <em style={{ color: C.pinkLt }}>moments</em></h2>
            <div className="jd-rule" style={{ width: 60, marginLeft: 0, marginBottom: 20 }} />
            <p className="jd-body" style={{ marginBottom: 28 }}>
              Twenty MIS students, two weeks, my first time abroad. I did not expect to leave with inside jokes, borrowed pots, and beach circles that sound cheesy until you are in one. The cohort is the through-line: I arrived alone in spirit after that Paris sprint, and I left knowing who would notice if I went quiet in the group chat.
            </p>
            <SectionSoundtrack sectionId="friends" style={{ marginTop: 0 }} />
          </FadeUp>

          <div className="jd-friends-main">
            <div className="jd-friends-stories">
              {GROUP_MOMENTS.map((item, i) => (
                <FadeUp key={item.title} delay={i * 0.05}>
                  <article className="jd-friends-story">
                    <h3 className="jd-friends-story-title">{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                </FadeUp>
              ))}
            </div>
            <FriendsPhotoMosaic photos={FRIENDS_PARALLAX_PHOTOS} />
          </div>
        </div>
      </Section>

      {/* ── FERNANDO PESSOA ── */}
      <Section id="pessoa-book" filmTop style={{ background: "rgba(26,107,69,0.88)" }}>
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
      <Section id="reflection" filmTop style={{ background: "rgba(26,58,122,0.9)" }}>
        <div className="jd-reflection-panel">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="jd-reflection-body"
          >
            <figure className="jd-reflection-photo">
              <PhotoSlot
                src="/students/jaimee-douglas/reflection-boat.png"
                alt="On the boat with the river and hillside behind"
                caption="Golden hour on the water"
                color={C.royal}
                objectPosition="center 35%"
                className="jd-photo-slot--reflection"
              />
            </figure>
            <div className="jd-reflection-copy">
              <span className="jd-kicker">On the water</span>
              <h2 className="jd-h2" style={{ marginBottom: 20 }}>
                Don&apos;t You Worry<br />
                <em style={{ color: C.pinkLt }}>&apos;Bout a Thing</em>
              </h2>
              <div className="jd-rule" style={{ width: 60, marginBottom: 32 }} />
              <p className="jd-body" style={{ marginBottom: 20 }}>
                I left the United States having never really traveled internationally. Portugal asked me to slow down at Jerónimos, at a four-hour Michelin table, and on a Douro boat when I did not want the night to end. It also asked me to speed up: a wrong train in Paris, surf falls, stadium chants, and karaoke when I had not sung in six months.
              </p>
              <p className="jd-body" style={{ marginBottom: 20 }}>
                I came for MIS class credits. I returned home with a passport brimming with stories, an octopus on my plate, unwillingly borrowed Pica-Pau, a karaoke crowd in Lisbon that loved my voice, and a trophy hall memory from Benfica players that served as proof that anything is possible when you work hard and never let anything or anyone deter you from achieving your dreams. While the trophies are what people on the outside see, the late nights, endless hours of practice, and dedication to your craft are what truly give them meaning.
              </p>
              <p className="jd-body" style={{ fontStyle: "italic", color: C.goldPale, marginBottom: 0 }}>
                If this page feels pretty, that is the point. If it feels real, that is the trip.
              </p>
              <SectionSoundtrack sectionId="reflection" />
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ── BAMA BLOG ENTRIES ── */}
      <Section id="bama-blog" filmTop className="jd-section--blog" style={{ background: "rgba(74,15,28,0.94)" }}>
        <FadeUp style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="jd-kicker">University of Alabama · Study abroad</span>
          <h2 className="jd-h2" style={{ marginBottom: 12 }}>
            Portugal, I Love You, XOXO - Gossip Girl
          </h2>
          <p className="jd-display" style={{ fontSize: "1.35rem", fontStyle: "italic", color: C.pinkLt, marginBottom: 16 }}>
            Bama Blog Entries
          </p>
          <div className="jd-rule" style={{ width: 60, marginBottom: 20 }} />
          <TumblrBlogIntro />
          <SectionSoundtrack sectionId="bama-blog" center style={{ marginTop: 0 }} />
        </FadeUp>
        <BamaBlogEntries openPost={openBlog} setOpenPost={setOpenBlog} scrollTo={scrollTo} />
      </Section>

      {/* ── FAREWELL / BOAT ── */}
      <Section id="farewell" filmTop className="jd-section--farewell" style={{ background: C.burgundyDk, position: "relative", overflow: "hidden" }}>
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
            Last night of my first abroad: farewell cruise on the Douro. We kept drifting to the front of the boat for photos, the same way we had drifted toward each other all trip. River dark, banks lit, Beyoncé&apos;s <em>Before I Let Go</em> in my ears because of course it was. I knew exactly what song matched the ending.
          </p>
          <p className="jd-body" style={{ fontStyle: "italic", color: C.pinkLt, maxWidth: 480, margin: "0 auto 28px" }}>
            I still do not have one neat sentence for what I brought home. I have a book in my bag, a few recipes, a group chat that did not exist before May, and the quiet knowledge that I made it, from Paris to Lisbon to this boat, even when I was sure I would not.
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
