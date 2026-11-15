import { FFmpeg } from './ffmpeg.js';

/* =========================================================
   SP02 – Video Player
   Plays natively when the browser can; otherwise converts
   on the device with FFmpeg (nothing is uploaded).
   ========================================================= */

/* ---------------- Language ---------------- */
const I18N = {
  en: {
    tagline: 'Video Player · Any format', install: 'Install',
    heroTitle: 'Every video,<br><span>one player</span>',
    heroSub: 'MP4, MKV, AVI, WMV, FLV, MOV, TS and more. Nothing is uploaded.',
    f1: '👆 Gestures', f2: '💬 Subtitles', f3: '🎵 Audio track', f4: '⏩ Speed', f5: '🔊 Boost 200%', f6: '🎚 Equalizer', f7: '🔁 A-B repeat', f8: '📸 Screenshot',
    pick: 'Open videos', folder: 'Add folder', drop: 'Or drag & drop videos here (PC)',
    apk: 'Get Android app (auto scan)', t1h: 'Mobile', t1: 'Gallery → video → Share → SP02', t2h: 'PC', t2: 'Right-click video → Open with → SP02 (after installing)',
    t3h: 'Gestures', t3: 'Left side ↕ brightness · Right side ↕ volume · ↔ seek · Double-tap ±10s · Pinch zoom',
    foot: 'Your videos stay on your device', unlock: 'Tap to unlock', cancel: 'Cancel',
    brightness: 'Brightness', volume: 'Volume', zoom: 'Zoom', locked: 'Screen locked', unlocked: 'Unlocked',
    speed: 'Speed', aspect: 'Screen size', fit: 'Fit', fill: 'Fill', stretch: 'Stretch', crop: 'Crop',
    subtitles: 'Subtitles', subOff: 'Off', subLoad: '📂 Load subtitle file', subEmbedded: '🔍 Find subtitles inside video',
    subSize: 'Size', subDelay: 'Delay', subBg: 'Background', subColor: 'Color', subNone: 'No text subtitles inside this video.',
    audio: 'Audio track', audioScan: '🔍 Find audio tracks', audioOne: 'Only one audio track in this video.', track: 'Track',
    boost: 'Volume boost', eq: 'Equalizer', eqReset: 'Reset', presets: 'Presets',
    pNormal: 'Normal', pBass: 'Bass', pVocal: 'Vocal', pMovie: 'Movie', pTreble: 'Treble',
    playlist: 'Playlist', more: 'More', abRepeat: 'A-B repeat', abA: 'Set A', abB: 'Set B', abClear: 'Clear A-B',
    shot: 'Screenshot', pip: 'Pop-up', rotate: 'Rotate', loop: 'Loop', loopOff: 'Loop off', loopOne: 'Repeat one', loopAll: 'Repeat all',
    sleep: 'Sleep timer', sleepOff: 'Off', sleepEnd: 'End of video', min: 'min', info: 'Info', fixPlay: 'Fix playback',
    sleepSet: 'Video will stop in', sleepDone: 'Sleep timer: paused',
    resumed: 'Resumed from', startOver: 'Start over',
    noAudioQ: 'No sound?', fixIt: 'Fix', fixingAudio: 'Fixing the sound of this video…', unsupported: 'This format needs converting. Starting…',
    loadingEngine: 'Loading player engine… (first time only, ~31 MB)', checking: 'Checking video…',
    converting: 'Making video playable…', remuxing: 'Quick fix (no quality loss)…', switching: 'Switching audio track…',
    keepOn: 'Keep this screen open.', errEngine: 'Player engine could not load. Connect to the internet once and try again.',
    errConv: 'Could not play this file.', bigFile: 'Very large file. Converting on a phone may fail.',
    shotSaved: 'Screenshot saved', file: 'File', size: 'Size', res: 'Resolution', duration: 'Duration', mode: 'Playing',
    native: 'Direct (no conversion)', converted: 'Converted on device', noPip: 'Pop-up not supported here',
    subLoaded: 'Subtitles loaded', subErr: 'Could not read this subtitle file.', imageSubs: 'Image subtitles (PGS/DVD) are not supported yet.',
    next: 'Next', ended: 'Finished',
  },
  hi: {
    tagline: 'वीडियो प्लेयर · हर फ़ॉर्मेट', install: 'इंस्टॉल',
    heroTitle: 'हर वीडियो,<br><span>एक प्लेयर</span>',
    heroSub: 'MP4, MKV, AVI, WMV, FLV, MOV, TS और भी। कुछ भी अपलोड नहीं होता।',
    f1: '👆 जेस्चर', f2: '💬 सबटाइटल', f3: '🎵 ऑडियो ट्रैक', f4: '⏩ स्पीड', f5: '🔊 बूस्ट 200%', f6: '🎚 इक्वलाइज़र', f7: '🔁 A-B रिपीट', f8: '📸 स्क्रीनशॉट',
    pick: 'वीडियो खोलें', folder: 'फ़ोल्डर जोड़ें', drop: 'या वीडियो यहाँ खींचकर छोड़ें (PC)',
    apk: 'Android ऐप लें (अपने आप स्कैन)', t1h: 'मोबाइल', t1: 'गैलरी → वीडियो → Share → SP02', t2h: 'PC', t2: 'वीडियो पर राइट-क्लिक → Open with → SP02 (इंस्टॉल के बाद)',
    t3h: 'जेस्चर', t3: 'बाएँ ↕ रोशनी · दाएँ ↕ आवाज़ · ↔ आगे-पीछे · डबल-टैप ±10 सेकंड · दो उँगली से ज़ूम',
    foot: 'आपकी वीडियो आपके डिवाइस में ही रहती है', unlock: 'खोलने के लिए टैप करें', cancel: 'रद्द करें',
    brightness: 'रोशनी', volume: 'आवाज़', zoom: 'ज़ूम', locked: 'स्क्रीन लॉक', unlocked: 'अनलॉक',
    speed: 'स्पीड', aspect: 'स्क्रीन साइज़', fit: 'फ़िट', fill: 'फ़िल', stretch: 'खींचें', crop: 'क्रॉप',
    subtitles: 'सबटाइटल', subOff: 'बंद', subLoad: '📂 सबटाइटल फ़ाइल लगाएँ', subEmbedded: '🔍 वीडियो के अंदर के सबटाइटल',
    subSize: 'साइज़', subDelay: 'देरी', subBg: 'पीछे काला', subColor: 'रंग', subNone: 'इस वीडियो में टेक्स्ट सबटाइटल नहीं हैं।',
    audio: 'ऑडियो ट्रैक', audioScan: '🔍 ऑडियो ट्रैक खोजें', audioOne: 'इस वीडियो में एक ही ऑडियो ट्रैक है।', track: 'ट्रैक',
    boost: 'आवाज़ बूस्ट', eq: 'इक्वलाइज़र', eqReset: 'रीसेट', presets: 'प्रीसेट',
    pNormal: 'नॉर्मल', pBass: 'बास', pVocal: 'आवाज़', pMovie: 'मूवी', pTreble: 'ट्रेबल',
    playlist: 'प्लेलिस्ट', more: 'और', abRepeat: 'A-B रिपीट', abA: 'A सेट', abB: 'B सेट', abClear: 'A-B हटाएँ',
    shot: 'स्क्रीनशॉट', pip: 'पॉप-अप', rotate: 'घुमाएँ', loop: 'लूप', loopOff: 'लूप बंद', loopOne: 'यही दोहराएँ', loopAll: 'सब दोहराएँ',
    sleep: 'स्लीप टाइमर', sleepOff: 'बंद', sleepEnd: 'वीडियो खत्म होने पर', min: 'मिनट', info: 'जानकारी', fixPlay: 'चलाने में सुधार',
    sleepSet: 'वीडियो रुकेगी', sleepDone: 'स्लीप टाइमर: रोक दिया',
    resumed: 'यहाँ से शुरू', startOver: 'शुरू से',
    noAudioQ: 'आवाज़ नहीं आ रही?', fixIt: 'ठीक करें', fixingAudio: 'इस वीडियो की आवाज़ ठीक की जा रही है…', unsupported: 'यह फ़ॉर्मेट बदलना पड़ेगा। शुरू हो रहा है…',
    loadingEngine: 'प्लेयर इंजन लोड हो रहा है… (सिर्फ़ पहली बार, ~31 MB)', checking: 'वीडियो जाँची जा रही है…',
    converting: 'वीडियो चलने लायक बनाई जा रही है…', remuxing: 'जल्दी सुधार (क्वालिटी वही)…', switching: 'ऑडियो ट्रैक बदला जा रहा है…',
    keepOn: 'यह स्क्रीन खुली रखें।', errEngine: 'प्लेयर इंजन लोड नहीं हुआ। एक बार इंटरनेट चालू करके दोबारा करें।',
    errConv: 'यह फ़ाइल नहीं चल पाई।', bigFile: 'बहुत बड़ी फ़ाइल। फ़ोन पर बदलना फ़ेल हो सकता है।',
    shotSaved: 'स्क्रीनशॉट सेव हो गया', file: 'फ़ाइल', size: 'साइज़', res: 'रिज़ॉल्यूशन', duration: 'समय', mode: 'चल रही है',
    native: 'सीधे (बिना बदले)', converted: 'डिवाइस पर बदलकर', noPip: 'यहाँ पॉप-अप नहीं चलता',
    subLoaded: 'सबटाइटल लग गए', subErr: 'यह सबटाइटल फ़ाइल पढ़ी नहीं गई।', imageSubs: 'इमेज सबटाइटल (PGS/DVD) अभी नहीं चलते।',
    next: 'अगला', ended: 'खत्म',
  },
};
let lang = (() => { try { return localStorage.getItem('sp02-lang') || 'hi'; } catch { return 'hi'; } })();
const t = (k) => I18N[lang][k] ?? I18N.en[k] ?? k;
const $ = (s) => document.querySelector(s);
function applyI18n() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
  $('#langBtn').textContent = lang === 'en' ? 'हिंदी' : 'English';
  if (typeof renderLib === 'function') try { renderLib(); } catch {}
}
$('#langBtn').onclick = () => { lang = lang === 'en' ? 'hi' : 'en'; try { localStorage.setItem('sp02-lang', lang); } catch {} applyI18n(); };

/* ---------------- Helpers ---------------- */
const fmt = (s) => {
  if (!isFinite(s) || s < 0) s = 0;
  const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = Math.floor(s % 60);
  return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(x).padStart(2, '0');
};
const fmtSize = (b) => b >= 1e9 ? (b / 1e9).toFixed(2) + ' GB' : b >= 1e6 ? (b / 1e6).toFixed(1) + ' MB' : Math.round(b / 1e3) + ' KB';
const extOf = (n) => { const m = /\.([a-z0-9]{2,5})$/i.exec(n || ''); return m ? m[1].toLowerCase() : ''; };
const esc = (x) => String(x).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const MEDIA_EXT = /^(mp4|m4v|mkv|webm|mov|avi|wmv|asf|flv|3gp|3g2|ts|m2ts|mts|mpg|mpeg|vob|ogv|ogg|rm|rmvb|divx|xvid|f4v|mp3|m4a|aac|wav|flac|opus|wma|amr)$/;
const isMedia = (f) => /^(video|audio)\//.test(f.type) || MEDIA_EXT.test(extOf(f.name));
const isAudioOnly = (f) => /^audio\//.test(f.type) || /^(mp3|m4a|aac|wav|flac|opus|wma|amr)$/.test(extOf(f.name));
function toast(msg, ms = 2600, btn, onBtn) {
  const el = $('#toast');
  el.innerHTML = `<span>${esc(msg)}</span>` + (btn ? `<button>${esc(btn)}</button>` : '');
  if (btn) el.querySelector('button').onclick = () => { el.classList.add('hidden'); onBtn(); };
  el.classList.remove('hidden');
  clearTimeout(toast._t); toast._t = setTimeout(() => el.classList.add('hidden'), ms);
}
const store = {
  get(k, d) { try { const v = localStorage.getItem('sp02-' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('sp02-' + k, JSON.stringify(v)); } catch {} },
};

/* ---------------- State ---------------- */
const v = $('#v');
const P = $('#player');
let list = [], idx = -1, file = null;
let srcURL = null, playingConverted = false, triedConvert = false, probeCache = null, audioIdx = 0;
let speed = 1, aspect = 'fit', rot = 0, zoom = 1, bright = 1, locked = false;
let loopMode = store.get('loop', 'off'); // off | one | all
let ab = { a: null, b: null };
let subs = { cues: [], delay: 0, size: store.get('subSize', 1), bg: store.get('subBg', true), color: store.get('subColor', '#ffffff') };
let sleepAt = null, sleepEnd = false;

/* ---------------- Open files ---------------- */
function openFiles(files, start = 0, keepOrder = false) {
  files = [...(files || [])].filter(isMedia);
  if (!files.length) return;
  if (!keepOrder) files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  list = files; playIndex(Math.min(start, files.length - 1));
}
$('#pickBtn').onclick = () => $('#fileInput').click();
$('#fileInput').onchange = (e) => { openFiles(e.target.files); e.target.value = ''; };
const drop = $('#drop');
['dragenter', 'dragover'].forEach((ev) => document.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add('over'); }));
['dragleave', 'drop'].forEach((ev) => document.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove('over'); }));
document.addEventListener('drop', (e) => {
  const fs = [...(e.dataTransfer?.files || [])];
  const sub = fs.find((f) => /^(srt|vtt|ass|ssa)$/.test(extOf(f.name)));
  if (sub && !P.classList.contains('hidden')) { loadSubFile(sub); return; }
  openFiles(fs);
});
if ('launchQueue' in window) {
  window.launchQueue.setConsumer(async (p) => { if (p.files?.length) openFiles(await Promise.all(p.files.map((h) => h.getFile()))); });
}
(async () => {
  if (!new URLSearchParams(location.search).has('shared')) return;
  history.replaceState(null, '', location.pathname);
  try {
    const c = await caches.open('sp02-share');
    const cntKey = new URL('shared-count', location.href).href;
    const cr = await c.match(cntKey); const n = cr ? parseInt(await cr.text(), 10) || 0 : 0;
    const files = [];
    for (let i = 0; i < n; i++) {
      const key = new URL('shared-file-' + i, location.href).href;
      const res = await c.match(key); if (!res) continue;
      const blob = await res.blob();
      files.push(new File([blob], decodeURIComponent(res.headers.get('X-File-Name') || `video${i + 1}.mp4`), { type: blob.type }));
      await c.delete(key);
    }
    await c.delete(cntKey);
    openFiles(files);
  } catch {}
})();

/* ---------------- Play ---------------- */
function posKey(f) { return 'pos-' + f.name + '-' + f.size; }
function savePos() {
  if (!file || !isFinite(v.duration)) return;
  const p = v.currentTime;
  if (p > 10 && p < v.duration - 10) store.set(posKey(file), p); else store.set(posKey(file), 0);
}
function setSrc(url, keepTime) {
  const tm = keepTime ? v.currentTime : 0, wasPlaying = keepTime ? !v.paused : true;
  v.src = url;
  v.onloadedmetadata = null;
  v.addEventListener('loadedmetadata', function once() {
    v.removeEventListener('loadedmetadata', once);
    if (tm) v.currentTime = tm;
    v.playbackRate = speed;
    if (wasPlaying) v.play().catch(() => {});
  });
}
function playIndex(i) {
  if (i < 0 || i >= list.length) return;
  savePos();
  idx = i; file = list[i];
  if (srcURL) URL.revokeObjectURL(srcURL);
  srcURL = file.url || URL.createObjectURL(file);
  playingConverted = false; triedConvert = false; probeCache = null; audioIdx = 0;
  ab = { a: null, b: null }; renderAB();
  subs.cues = []; subs.delay = 0; renderSub(true);
  $('#title').textContent = file.name;
  document.title = file.name + ' · SP02';
  if (P.classList.contains('hidden')) history.pushState({ player: 1 }, '');
  $('#home').classList.add('hidden'); P.classList.remove('hidden'); document.querySelector('header').classList.add('hidden');
  resumeAsked = false;
  setSrc(srcURL, false);
  showUI();
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({ title: file.name, artist: 'SP02', artwork: [{ src: 'icon-512.png', sizes: '512x512', type: 'image/png' }] });
  }
}
let resumeAsked = false;
v.addEventListener('loadedmetadata', () => {
  // HEVC etc: audio plays but the picture can't be decoded
  if (!playingConverted && !isAudioOnly(file) && v.videoWidth === 0 && !triedConvert) { autoConvert(); return; }
  if (!resumeAsked) {
    resumeAsked = true;
    const p = store.get(posKey(file), 0);
    if (p > 10 && p < v.duration - 10) {
      v.currentTime = p;
      toast(`${t('resumed')} ${fmt(p)}`, 4500, t('startOver'), () => { v.currentTime = 0; });
    }
  }
  updateTime();
});
v.addEventListener('error', () => { if (!playingConverted && !triedConvert) autoConvert(); else if (playingConverted) toast(t('errConv'), 4000); });
v.addEventListener('play', () => { setPlayIcon(); scheduleHide(); audioCheck(); });
v.addEventListener('pause', () => { setPlayIcon(); showUI(true); savePos(); });
v.addEventListener('ended', () => {
  if (sleepEnd) { sleepEnd = false; toast(t('sleepDone')); return; }
  store.set(posKey(file), 0);
  if (loopMode === 'one') { v.currentTime = 0; v.play(); }
  else if (idx < list.length - 1) playIndex(idx + 1);
  else if (loopMode === 'all' && list.length) playIndex(0);
  else toast(t('ended'));
});
v.addEventListener('timeupdate', updateTime);
v.addEventListener('durationchange', updateTime);
setInterval(savePos, 5000);
window.addEventListener('pagehide', savePos);

// Silent-audio check (e.g. MKV with AC3/DTS sound)
let audioCheckTimer = null;
function audioCheck() {
  clearTimeout(audioCheckTimer);
  if (playingConverted || !('webkitAudioDecodedByteCount' in v)) return;
  audioCheckTimer = setTimeout(async () => {
    if (v.paused || v.muted || v.webkitAudioDecodedByteCount !== 0 || v.currentTime < 1 || playingConverted) return;
    // Picture plays but no sound decoded (AC3, DTS, E-AC3, PCM…): check the file and fix it automatically
    toast(t('fixingAudio'), 3000);
    try {
      const info = await probe();
      const a = info.streams.filter((x) => x.type === 'Audio')[audioIdx];
      if (a && !['aac', 'mp3', 'opus', 'vorbis', 'flac'].includes(a.codec)) convertForPlayback(audioIdx, true);
    } catch { toast(t('noAudioQ'), 8000, t('fixIt'), () => convertForPlayback(audioIdx, true)); }
  }, 2500);
}

/* ---------------- UI show/hide ---------------- */
let hideTimer = null;
function showUI(stay) {
  if (locked) return;
  P.classList.remove('hide-ui');
  clearTimeout(hideTimer);
  if (!stay) scheduleHide();
}
function scheduleHide() { clearTimeout(hideTimer); hideTimer = setTimeout(() => { if (!v.paused && $('#sheet').classList.contains('hidden')) P.classList.add('hide-ui'); }, 3200); }
function toggleUI() { if (P.classList.contains('hide-ui')) showUI(); else { P.classList.add('hide-ui'); } }
function setPlayIcon() { $('#playPath').setAttribute('d', v.paused ? 'M8 5v14l11-7z' : 'M6 19h4V5H6v14zm8-14v14h4V5h-4z'); }
function updateTime() {
  const d = v.duration, c = v.currentTime;
  $('#cur').textContent = fmt(c); $('#dur').textContent = fmt(d);
  if (!seeking && isFinite(d) && d > 0) { const p = c / d * 1000; $('#seek').value = p; $('#seek').style.setProperty('--p', (p / 10) + '%'); }
}
let seeking = false;
$('#seek').oninput = (e) => {
  seeking = true; const d = v.duration; if (!isFinite(d)) return;
  const s = e.target.value / 1000 * d; $('#cur').textContent = fmt(s); e.target.style.setProperty('--p', (e.target.value / 10) + '%');
  showUI(true);
};
$('#seek').onchange = (e) => { const d = v.duration; if (isFinite(d)) v.currentTime = e.target.value / 1000 * d; seeking = false; scheduleHide(); };
const togglePlay = () => { if (v.paused) v.play().catch(() => {}); else v.pause(); };
$('#playBtn').onclick = (e) => { e.stopPropagation(); togglePlay(); };
$('#rwBtn').onclick = () => skip(-10);
$('#ffBtn').onclick = () => skip(10);
$('#prevBtn').onclick = () => { if (v.currentTime > 5 || idx === 0) v.currentTime = 0; else playIndex(idx - 1); };
$('#nextBtn').onclick = () => { if (idx < list.length - 1) playIndex(idx + 1); };
function skip(s) { v.currentTime = clamp(v.currentTime + s, 0, v.duration || 0); hud(`${s > 0 ? '+' : '−'}${Math.abs(s)}s`, fmt(v.currentTime)); showUI(); }
$('#backBtn').onclick = () => { if (history.state?.player) history.back(); else closePlayer(); };
window.addEventListener('popstate', () => { if (!$('#sheet').classList.contains('hidden')) { closeSheet(); history.pushState({ player: 1 }, ''); } else if (!P.classList.contains('hidden')) closePlayer(); });
function closePlayer() {
  savePos(); v.pause(); v.removeAttribute('src'); v.load();
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  P.classList.add('hidden'); $('#home').classList.remove('hidden'); document.querySelector('header').classList.remove('hidden');
  document.title = 'SP02 - Video Player';
  if (typeof renderLib === 'function') renderLib();
}
$('#fsBtn').onclick = toggleFS;
async function toggleFS() {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else {
      await P.requestFullscreen({ navigationUI: 'hide' });
      if (v.videoWidth > v.videoHeight) screen.orientation?.lock?.('landscape').catch(() => {});
    }
  } catch {}
}

/* ---------------- HUD ---------------- */
let hudTimer = null;
function hud(main, sub, meter) {
  const el = $('#hud');
  el.innerHTML = esc(main) + (sub ? `<small>${esc(sub)}</small>` : '') + (meter != null ? `<div class="meter"><i style="width:${clamp(meter, 0, 1) * 100}%"></i></div>` : '');
  el.classList.remove('hidden');
  clearTimeout(hudTimer); hudTimer = setTimeout(() => el.classList.add('hidden'), 700);
}
function ripple(side, text) {
  const r = document.createElement('div'); r.className = 'ripple';
  r.style[side] = '0'; r.textContent = text; P.appendChild(r); setTimeout(() => r.remove(), 650);
}

/* ---------------- View: aspect / zoom / rotate / brightness ---------------- */
function applyView() {
  const st = $('#stage').getBoundingClientRect();
  let w = st.width, h = st.height;
  const sideways = rot % 180 !== 0;
  if (sideways) [w, h] = [h, w];
  v.style.width = w + 'px'; v.style.height = h + 'px';
  const vw = v.videoWidth || 16, vh = v.videoHeight || 9;
  let fit = 'contain', extra = 1;
  if (aspect === 'fill') fit = 'cover';
  else if (aspect === 'stretch') fit = 'fill';
  else if (aspect === '16:9' || aspect === '4:3') {
    const [a, b] = aspect.split(':').map(Number), r = a / b;
    let bw = w, bh = w / r; if (bh > h) { bh = h; bw = h * r; }
    v.style.width = bw + 'px'; v.style.height = bh + 'px'; fit = 'fill';
  } else if (aspect === 'crop') { fit = 'cover'; extra = 1.15; }
  v.style.objectFit = fit;
  v.style.transform = `rotate(${rot}deg) scale(${zoom * extra})`;
  v.style.filter = bright === 1 ? '' : `brightness(${bright})`;
  void vw; void vh;
}
window.addEventListener('resize', applyView);
v.addEventListener('loadedmetadata', applyView);
$('#aspBtn').onclick = () => {
  const order = ['fit', 'fill', 'stretch', '16:9', '4:3', 'crop'];
  aspect = order[(order.indexOf(aspect) + 1) % order.length]; zoom = 1; applyView();
  hud(t('aspect'), labelAspect(aspect)); showUI();
};
const labelAspect = (a) => ({ fit: t('fit'), fill: t('fill'), stretch: t('stretch'), crop: t('crop') }[a] || a);

/* ---------------- Audio graph: boost + equalizer ---------------- */
const EQ_FREQ = [60, 230, 910, 3600, 14000];
const PRESETS = { pNormal: [0, 0, 0, 0, 0], pBass: [7, 4, 0, -1, 0], pVocal: [-2, 0, 4, 3, 0], pMovie: [4, 1, 2, 3, 2], pTreble: [-1, 0, 0, 4, 6] };
let actx = null, gainNode = null, eqNodes = [], eqGains = store.get('eq', [0, 0, 0, 0, 0]), volume = 1;
function ensureAudioGraph() {
  if (actx) return true;
  try {
    actx = new (window.AudioContext || window.webkitAudioContext)();
    const src = actx.createMediaElementSource(v);
    eqNodes = EQ_FREQ.map((f, i) => { const n = actx.createBiquadFilter(); n.type = i === 0 ? 'lowshelf' : i === 4 ? 'highshelf' : 'peaking'; n.frequency.value = f; n.Q.value = 1; n.gain.value = eqGains[i]; return n; });
    gainNode = actx.createGain();
    let node = src; for (const n of eqNodes) { node.connect(n); node = n; }
    node.connect(gainNode); gainNode.connect(actx.destination);
    return true;
  } catch { actx = null; return false; }
}
function setVolume(x) {
  volume = clamp(x, 0, 2);
  if (volume > 1 && ensureAudioGraph()) { actx.resume(); v.volume = 1; gainNode.gain.value = volume; }
  else { v.volume = Math.min(1, volume); if (gainNode) gainNode.gain.value = 1; }
  v.muted = volume === 0;
}
function setEq(i, val) { eqGains[i] = val; store.set('eq', eqGains); if (ensureAudioGraph()) { actx.resume(); eqNodes[i].gain.value = val; } }

/* ---------------- Gestures ---------------- */
const G = $('#gest');
const ptrs = new Map();
let g = null, lastTap = 0, tapTimer = null;
G.addEventListener('pointerdown', (e) => {
  G.setPointerCapture(e.pointerId);
  ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (locked) return;
  if (ptrs.size === 2) {
    const [a, b] = [...ptrs.values()];
    g = { mode: 'pinch', d0: Math.hypot(a.x - b.x, a.y - b.y), z0: zoom }; return;
  }
  g = { mode: null, pt: e.pointerType, x0: e.clientX, y0: e.clientY, t0: Date.now(), cur: v.currentTime, vol: volume, br: bright, moved: false };
});
G.addEventListener('pointermove', (e) => {
  if (!ptrs.has(e.pointerId)) return;
  ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (!g || locked) return;
  const R = G.getBoundingClientRect();
  if (g.mode === 'pinch' && ptrs.size === 2) {
    const [a, b] = [...ptrs.values()];
    zoom = clamp(g.z0 * Math.hypot(a.x - b.x, a.y - b.y) / g.d0, 0.5, 4); applyView();
    hud(t('zoom'), Math.round(zoom * 100) + '%'); return;
  }
  const dx = e.clientX - g.x0, dy = e.clientY - g.y0;
  if (!g.mode) {
    if (Math.abs(dx) < 14 && Math.abs(dy) < 14) return;
    g.moved = true;
    g.mode = Math.abs(dx) > Math.abs(dy) ? 'seek' : (g.x0 - R.left < R.width / 2 ? 'bright' : 'vol');
    if (g.mode === 'seek') seeking = true;
  }
  if (g.mode === 'seek' && isFinite(v.duration)) {
    const span = Math.min(v.duration, 180);
    g.target = clamp(g.cur + dx / R.width * span, 0, v.duration);
    const diff = g.target - g.cur;
    hud(`${diff >= 0 ? '+' : '−'}${fmt(Math.abs(diff))}`, `${fmt(g.target)} / ${fmt(v.duration)}`, g.target / v.duration);
    $('#cur').textContent = fmt(g.target);
  } else if (g.mode === 'bright') {
    bright = clamp(g.br - dy / R.height * 1.6, 0.15, 1.6); applyView();
    hud('☀ ' + t('brightness'), Math.round(bright * 100) + '%', (bright - 0.15) / 1.45);
  } else if (g.mode === 'vol') {
    setVolume(g.vol - dy / R.height * 2.2);
    hud((volume === 0 ? '🔇 ' : '🔊 ') + t('volume'), Math.round(volume * 100) + '%', volume / 2);
  }
});
function endPtr(e) {
  ptrs.delete(e.pointerId);
  if (locked) { if (!ptrs.size) { $('#unlockBtn').classList.remove('hidden'); clearTimeout(endPtr._u); endPtr._u = setTimeout(() => $('#unlockBtn').classList.add('hidden'), 2500); } return; }
  if (!g) return;
  if (g.mode === 'pinch') { if (!ptrs.size) g = null; return; }
  if (g.mode === 'seek') { if (g.target != null) v.currentTime = g.target; seeking = false; }
  else if (!g.moved && Date.now() - g.t0 < 350) {
    const R = G.getBoundingClientRect(), x = (g.x0 - R.left) / R.width, now = Date.now();
    if (now - lastTap < 300) {
      clearTimeout(tapTimer); lastTap = 0;
      if (x < 0.35) { skip(-10); ripple('left', '« 10s'); }
      else if (x > 0.65) { skip(10); ripple('right', '10s »'); }
      else if (g.pt === 'mouse') toggleFS();
      else togglePlay();
    } else {
      lastTap = now;
      const mouse = g.pt === 'mouse';
      tapTimer = setTimeout(() => { if (mouse) { togglePlay(); showUI(); } else toggleUI(); }, 300);
    }
  }
  g = null;
}
G.addEventListener('pointerup', endPtr);
G.addEventListener('pointercancel', endPtr);
G.addEventListener('wheel', (e) => { e.preventDefault(); setVolume(volume - e.deltaY / 1000); hud('🔊 ' + t('volume'), Math.round(volume * 100) + '%', volume / 2); }, { passive: false });
G.addEventListener('mousemove', () => { if (!locked && !g) showUI(); });

$('#lockBtn').onclick = () => { locked = true; P.classList.add('hide-ui'); hud('🔒 ' + t('locked')); };
$('#unlockBtn').onclick = () => { locked = false; $('#unlockBtn').classList.add('hidden'); hud('🔓 ' + t('unlocked')); showUI(); };

/* Keyboard (PC) */
document.addEventListener('keydown', (e) => {
  if (P.classList.contains('hidden') || /INPUT|TEXTAREA/.test(document.activeElement?.tagName) && document.activeElement.type !== 'range') return;
  const k = e.key;
  if (k === ' ' || k === 'k') { e.preventDefault(); togglePlay(); }
  else if (k === 'ArrowRight') { e.preventDefault(); skip(e.shiftKey ? 60 : 10); }
  else if (k === 'ArrowLeft') { e.preventDefault(); skip(e.shiftKey ? -60 : -10); }
  else if (k === 'ArrowUp') { e.preventDefault(); setVolume(volume + 0.05); hud('🔊 ' + t('volume'), Math.round(volume * 100) + '%', volume / 2); }
  else if (k === 'ArrowDown') { e.preventDefault(); setVolume(volume - 0.05); hud('🔊 ' + t('volume'), Math.round(volume * 100) + '%', volume / 2); }
  else if (k === 'f') toggleFS();
  else if (k === 'm') { setVolume(volume ? 0 : 1); hud('🔊 ' + t('volume'), Math.round(volume * 100) + '%'); }
  else if (k === ']' || k === '>') setSpeed(Math.min(4, +(speed + 0.25).toFixed(2)));
  else if (k === '[' || k === '<') setSpeed(Math.max(0.25, +(speed - 0.25).toFixed(2)));
  else if (k === 'n' || k === 'N') $('#nextBtn').click();
  else if (k === 'p' || k === 'P') $('#prevBtn').click();
  else if (k === 's') screenshot();
  else if (k === 'Escape' && !$('#sheet').classList.contains('hidden')) closeSheet();
  showUI();
});

/* Media session (lock screen / headset buttons) */
if ('mediaSession' in navigator) {
  const ms = navigator.mediaSession;
  ms.setActionHandler('play', () => v.play());
  ms.setActionHandler('pause', () => v.pause());
  ms.setActionHandler('seekbackward', () => skip(-10));
  ms.setActionHandler('seekforward', () => skip(10));
  try { ms.setActionHandler('previoustrack', () => $('#prevBtn').click()); ms.setActionHandler('nexttrack', () => $('#nextBtn').click()); } catch {}
}

/* ---------------- A-B repeat, speed, sleep ---------------- */
function setSpeed(s) { speed = s; v.playbackRate = s; hud('⏩ ' + t('speed'), s + 'x'); }
function renderAB() {
  const m = $('#abMark');
  if (ab.a == null || !isFinite(v.duration)) { m.classList.add('hidden'); return; }
  const b = ab.b ?? v.currentTime;
  m.style.left = (ab.a / v.duration * 100) + '%'; m.style.width = (Math.max(0, b - ab.a) / v.duration * 100) + '%';
  m.classList.remove('hidden');
}
function abStep() {
  if (ab.a == null) { ab.a = v.currentTime; hud('A', fmt(ab.a)); }
  else if (ab.b == null) { if (v.currentTime > ab.a + 0.5) { ab.b = v.currentTime; hud('A-B', `${fmt(ab.a)} → ${fmt(ab.b)}`); } }
  else { ab = { a: null, b: null }; hud(t('abClear')); }
  renderAB();
}
function tick() {
  if (ab.a != null && ab.b != null && v.currentTime >= ab.b) v.currentTime = ab.a;
  if (sleepAt && Date.now() >= sleepAt) { sleepAt = null; v.pause(); toast(t('sleepDone')); }
  renderSub();
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

/* ---------------- Screenshot / PiP / rotate ---------------- */
async function screenshot() {
  if (!v.videoWidth) return;
  const c = document.createElement('canvas'); c.width = v.videoWidth; c.height = v.videoHeight;
  c.getContext('2d').drawImage(v, 0, 0);
  const blob = await new Promise((r) => c.toBlob(r, 'image/png'));
  const name = `${file.name.replace(/\.[^.]+$/, '')}_${fmt(v.currentTime).replace(/:/g, '-')}.png`;
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  toast('📸 ' + t('shotSaved'));
}
async function pip() {
  try { if (document.pictureInPictureElement) await document.exitPictureInPicture(); else await v.requestPictureInPicture(); }
  catch { toast(t('noPip')); }
}
function rotate() { rot = (rot + 90) % 360; applyView(); hud('⟳ ' + t('rotate'), rot + '°'); }

/* ---------------- Subtitles ---------------- */
function parseTime(s) {
  const m = /(?:(\d+):)?(\d{1,2}):(\d{1,2})[.,](\d{1,3})/.exec(s.trim());
  if (!m) return NaN;
  return (+(m[1] || 0)) * 3600 + (+m[2]) * 60 + (+m[3]) + (+m[4].padEnd(3, '0')) / 1000;
}
function cleanText(x) {
  let s = esc(x.replace(/\{[^}]*\}/g, '').replace(/\\N/gi, '\n').replace(/\\h/g, ' '));
  return s.replace(/&lt;(\/?)(i|b|u)&gt;/gi, '<$1$2>').replace(/&lt;\/?font[^&]*&gt;/gi, '').replace(/&lt;[^&]*&gt;/g, '');
}
function parseSRT(txt) {
  const cues = [];
  for (const block of txt.replace(/\r/g, '').split(/\n{2,}/)) {
    const lines = block.split('\n'); const ti = lines.findIndex((l) => l.includes('-->'));
    if (ti < 0) continue;
    const [a, b] = lines[ti].split('-->');
    const s = parseTime(a), e = parseTime(b.split(/\s+/).filter(Boolean)[0] || '');
    const text = lines.slice(ti + 1).join('\n').trim();
    if (isFinite(s) && isFinite(e) && text) cues.push({ s, e, text: cleanText(text) });
  }
  return cues;
}
function parseASS(txt) {
  const cues = []; let fmtF = null;
  for (const line of txt.replace(/\r/g, '').split('\n')) {
    if (/^Format:/i.test(line) && fmtF === null && /Start/i.test(line)) fmtF = line.slice(7).split(',').map((x) => x.trim().toLowerCase());
    if (!/^Dialogue:/i.test(line)) continue;
    const f = fmtF || ['layer', 'start', 'end', 'style', 'name', 'marginl', 'marginr', 'marginv', 'effect', 'text'];
    const parts = line.slice(9).split(',');
    const textIdx = f.indexOf('text');
    const rec = parts.slice(0, textIdx); rec.push(parts.slice(textIdx).join(','));
    const s = parseTime(rec[f.indexOf('start')]), e = parseTime(rec[f.indexOf('end')]);
    const text = cleanText(rec[textIdx] || '').trim();
    if (isFinite(s) && isFinite(e) && text) cues.push({ s, e, text });
  }
  return cues.sort((a, b) => a.s - b.s);
}
function decodeText(buf) {
  let s = new TextDecoder('utf-8').decode(buf);
  if ((s.match(/�/g) || []).length > 5) s = new TextDecoder('windows-1252').decode(buf);
  return s.replace(/^﻿/, '');
}
function setCues(cues) { subs.cues = cues; lastCue = null; renderSub(true); }
async function loadSubFile(f) {
  try {
    const txt = decodeText(await f.arrayBuffer());
    const cues = /^\s*\[Script Info\]/i.test(txt) || /^(ass|ssa)$/.test(extOf(f.name)) ? parseASS(txt) : parseSRT(txt);
    if (!cues.length) throw 0;
    setCues(cues); toast('💬 ' + t('subLoaded') + ` (${cues.length})`);
  } catch { toast(t('subErr')); }
}
$('#subInput').onchange = (e) => { const f = e.target.files[0]; e.target.value = ''; if (f) loadSubFile(f); };
let lastCue = null;
function renderSub(force) {
  const el = $('#subs');
  if (force) { el.style.fontSize = `calc(${subs.size} * clamp(15px, 3.6vmin, 34px))`; el.classList.toggle('bgOn', subs.bg); el.style.color = subs.color; }
  if (!subs.cues.length) { if (lastCue !== null || force) { el.innerHTML = ''; lastCue = null; } return; }
  const tm = v.currentTime - subs.delay;
  const active = subs.cues.filter((c) => tm >= c.s && tm <= c.e);
  const key = active.map((c) => c.s).join('|');
  if (key === lastCue && !force) return;
  lastCue = key;
  el.innerHTML = active.map((c) => `<span>${c.text}</span>`).join('<br>');
}

/* ---------------- Engine (FFmpeg) ---------------- */
const CORE_BASE = /^(localhost|127\.0\.0\.1)$/.test(location.hostname)
  ? new URL('core/', location.href).href
  : 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm/';
let ff = null, ffReady = null, logs = [], expectedDur = 0, cancelled = false;
function ensureEngine() {
  if (!ffReady) {
    ff = new FFmpeg();
    ff.on('log', ({ message }) => {
      logs.push(message); if (logs.length > 400) logs.shift();
      const m = /time=\s*(\d+):(\d+):(\d+(?:\.\d+)?)/.exec(message);
      if (m && expectedDur > 0) setBusyPct(((+m[1]) * 3600 + (+m[2]) * 60 + (+m[3])) / expectedDur);
    });
    ffReady = ff.load({ coreURL: CORE_BASE + 'ffmpeg-core.js', wasmURL: CORE_BASE + 'ffmpeg-core.wasm' })
      .catch((e) => { ffReady = null; ff = null; throw e; });
  }
  return ffReady;
}
function killEngine() { try { ff && ff.terminate(); } catch {} ff = null; ffReady = null; }
function busy(on, title, sub) {
  $('#busy').classList.toggle('hidden', !on);
  if (title) $('#busyTitle').textContent = title;
  $('#busySub').textContent = sub || t('keepOn');
  if (on) setBusyPct(null);
}
function setBusyPct(p) {
  const r = $('#ring');
  if (p == null) { r.classList.add('spin'); $('#pct').textContent = '…'; return; }
  p = clamp(p, 0, 0.99); r.classList.remove('spin'); r.style.setProperty('--p', Math.round(p * 100)); $('#pct').textContent = Math.round(p * 100) + '%';
}
$('#busyCancel').onclick = () => { cancelled = true; killEngine(); busy(false); };

let mounted = false;
async function mountInput() {
  const data = file instanceof Blob ? file : await (await fetch(file.url)).blob();
  const safe = new File([data], 'input.' + (extOf(file.name) || 'bin'), { type: file.type });
  try {
    try { await ff.createDir('/in'); } catch {}
    await ff.mount('WORKERFS', { files: [safe] }, '/in'); mounted = true;
    return '/in/' + safe.name;
  } catch {
    mounted = false;
    await ff.writeFile('/' + safe.name, new Uint8Array(await file.arrayBuffer()));
    return '/' + safe.name;
  }
}
async function unmountInput(path) {
  if (!ff) return;
  if (mounted) { try { await ff.unmount('/in'); } catch {} mounted = false; }
  else if (path) { try { await ff.deleteFile(path); } catch {} }
}
function parseProbe(text) {
  const o = { dur: NaN, streams: [] };
  const d = /Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)/.exec(text); if (d) o.dur = (+d[1]) * 3600 + (+d[2]) * 60 + (+d[3]);
  const re = /Stream #0:(\d+)(?:\[[^\]]*\])?(?:\(([a-z]{2,3})\))?(?:\[[^\]]*\])?:\s*(Video|Audio|Subtitle):\s*(\w+)([^\n]*)/g;
  let m;
  const counts = { Video: 0, Audio: 0, Subtitle: 0 };
  while ((m = re.exec(text))) {
    const type = m[3], rest = m[5];
    if (type === 'Video' && /attached pic|mjpeg|png/i.test(m[4] + rest)) continue;
    const s = { index: +m[1], lang: m[2] || '', type, codec: m[4].toLowerCase(), rel: counts[type]++, extra: rest.trim() };
    const wh = /\b(\d{2,5})x(\d{2,5})\b/.exec(rest); if (wh) { s.w = +wh[1]; s.h = +wh[2]; }
    const ch = /Hz,\s*([^,]+)/.exec(rest); if (ch) s.ch = ch[1].trim();
    s.def = /\(default\)/.test(rest);
    o.streams.push(s);
  }
  // titles from "title : xxx" lines following each stream
  const titleRe = /Stream #0:(\d+)[\s\S]*?(?=Stream #0:|$)/g;
  let tm;
  while ((tm = titleRe.exec(text))) {
    const tt = /title\s*:\s*([^\n]+)/i.exec(tm[0]); const s = o.streams.find((x) => x.index === +tm[1]);
    if (tt && s) s.title = tt[1].trim();
  }
  return o;
}
async function probe() {
  if (probeCache) return probeCache;
  await ensureEngine();
  const input = await mountInput();
  logs = [];
  try { await ff.exec(['-hide_banner', '-i', input]); } finally { await unmountInput(input); }
  probeCache = parseProbe(logs.join('\n'));
  return probeCache;
}
function canPlayVideoCodec(c) {
  if (['h264', 'vp8', 'vp9', 'av1'].includes(c)) return true;
  if (c === 'hevc') return !!(window.MediaSource?.isTypeSupported?.('video/mp4; codecs="hvc1.1.6.L93.B0"') || v.canPlayType('video/mp4; codecs="hvc1.1.6.L93.B0"'));
  return false;
}

async function autoConvert() { triedConvert = true; toast(t('unsupported'), 2500); convertForPlayback(0, false); }

/**
 * Make the current file playable. Copies streams when the browser can decode them
 * (fast, no quality loss), otherwise converts on the device.
 */
async function convertForPlayback(aIdx = 0, keepTime = true) {
  triedConvert = true; cancelled = false;
  const resumeAt = keepTime ? v.currentTime : store.get(posKey(file), 0);
  v.pause();
  busy(true, t('loadingEngine'));
  if (file.size > 1.8e9) toast(t('bigFile'), 5000);
  let input;
  try {
    try { await ensureEngine(); } catch { throw new Error(t('errEngine')); }
    if (cancelled) return;
    $('#busyTitle').textContent = t('checking');
    const info = await probe();
    if (cancelled) return;
    const vs = info.streams.find((s) => s.type === 'Video');
    const audios = info.streams.filter((s) => s.type === 'Audio');
    const as = audios[aIdx] || audios[0];
    const vOk = vs ? canPlayVideoCodec(vs.codec) : true;
    const aCopy = as && ['aac', 'mp3', 'opus', 'flac'].includes(as.codec);
    const args = [];
    input = await mountInput();
    args.push('-i', input);
    if (vs) args.push('-map', `0:v:${vs.rel}`);
    if (as) args.push('-map', `0:a:${as.rel}`);
    if (vs) {
      if (vOk) { args.push('-c:v', 'copy'); if (vs.codec === 'hevc') args.push('-tag:v', 'hvc1'); }
      else {
        // convert picture: keep it light so phones can keep up
        const W = vs.w || 1280, H = vs.h || 720, short = Math.min(W, H), k = short > 720 ? 720 / short : 1;
        const ew = Math.max(2, Math.round(W * k / 2) * 2), eh = Math.max(2, Math.round(H * k / 2) * 2);
        args.push('-vf', `scale=${ew}:${eh}`, '-c:v', 'libx264', '-preset', 'ultrafast', '-crf', '24', '-pix_fmt', 'yuv420p');
      }
    }
    if (as) { if (aCopy) args.push('-c:a', 'copy'); else args.push('-c:a', 'aac', '-b:a', '160k', '-ac', '2'); }
    args.push('-sn', '-dn', '-movflags', '+faststart', '-avoid_negative_ts', 'make_zero', '/play.mp4');
    expectedDur = isFinite(info.dur) ? info.dur : 0;
    $('#busyTitle').textContent = (!vs || vOk) ? (aIdx ? t('switching') : t('remuxing')) : t('converting');
    if (!vOk || !aCopy) setBusyPct(0);
    logs = [];
    const code = await ff.exec(args);
    await unmountInput(input); input = null;
    if (cancelled) return;
    if (code !== 0) throw new Error(t('errConv'));
    const data = await ff.readFile('/play.mp4');
    try { await ff.deleteFile('/play.mp4'); } catch {}
    if (srcURL) URL.revokeObjectURL(srcURL);
    srcURL = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    playingConverted = true; audioIdx = aIdx;
    resumeAsked = true;
    v.src = srcURL;
    v.addEventListener('loadedmetadata', function once() {
      v.removeEventListener('loadedmetadata', once);
      if (resumeAt) v.currentTime = Math.min(resumeAt, v.duration - 1);
      v.playbackRate = speed; v.play().catch(() => {}); applyView();
    });
  } catch (err) {
    if (!cancelled) toast(String(err?.message || err).slice(0, 140), 5000);
    if (input) await unmountInput(input);
  } finally {
    if (!cancelled) busy(false);
  }
}

async function extractSub(sub) {
  cancelled = false; busy(true, t('checking'));
  let input;
  try {
    await ensureEngine(); input = await mountInput();
    logs = []; expectedDur = 0;
    const code = await ff.exec(['-i', input, '-map', `0:s:${sub.rel}`, '-c:s', 'srt', '/sub.srt']);
    await unmountInput(input); input = null;
    if (code !== 0) throw 0;
    const data = await ff.readFile('/sub.srt'); try { await ff.deleteFile('/sub.srt'); } catch {}
    const cues = parseSRT(decodeText(data)); if (!cues.length) throw 0;
    setCues(cues); toast('💬 ' + t('subLoaded') + ` (${cues.length})`);
  } catch { if (!cancelled) toast(t('subErr')); if (input) await unmountInput(input); }
  finally { if (!cancelled) busy(false); }
}

/* ---------------- Bottom sheet menus ---------------- */
function openSheet(title, html, bind) {
  const s = $('#sheet');
  s.innerHTML = `<h3>${esc(title)}<button aria-label="close">✕</button></h3>${html}`;
  s.querySelector('h3 button').onclick = closeSheet;
  s.classList.remove('hidden'); $('#sheetBg').classList.remove('hidden');
  showUI(true);
  bind && bind(s);
}
function closeSheet() { $('#sheet').classList.add('hidden'); $('#sheetBg').classList.add('hidden'); scheduleHide(); }
$('#sheetBg').onclick = closeSheet;
const chips = (items, cur, attr) => `<div class="chips">${items.map(([val, label]) => `<button class="chip ${String(val) === String(cur) ? 'on' : ''}" data-${attr}="${esc(val)}">${esc(label)}</button>`).join('')}</div>`;
const langName = (l) => ({ hin: 'हिंदी', hi: 'हिंदी', eng: 'English', en: 'English', tam: 'தமிழ்', tel: 'తెలుగు', mal: 'മലയാളം', kan: 'ಕನ್ನಡ', ben: 'বাংলা', mar: 'मराठी', guj: 'ગુજરાતી', pan: 'ਪੰਜਾਬੀ', urd: 'اردو', jpn: '日本語', kor: '한국어', spa: 'Español', fra: 'Français' }[l] || (l ? l.toUpperCase() : ''));

$('#moreBtn').onclick = () => {
  const loopLabel = { off: t('loopOff'), one: t('loopOne'), all: t('loopAll') }[loopMode];
  const sleepLabel = sleepAt ? fmt((sleepAt - Date.now()) / 1000) : sleepEnd ? t('sleepEnd') : t('sleepOff');
  openSheet(t('more'), `
    <div class="sec">${esc(t('speed'))}</div>
    ${chips([0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 3, 4].map((x) => [x, x + 'x']), speed, 'speed')}
    <div class="sec">${esc(t('aspect'))}</div>
    ${chips([['fit', t('fit')], ['fill', t('fill')], ['stretch', t('stretch')], ['16:9', '16:9'], ['4:3', '4:3'], ['crop', t('crop')]], aspect, 'asp')}
    <div class="sec">&nbsp;</div>
    <div class="grid4">
      <button class="tile ${ab.a != null ? 'on' : ''}" data-act="ab"><span class="e">🔁</span>${esc(ab.a == null ? t('abA') : ab.b == null ? t('abB') : t('abClear'))}</button>
      <button class="tile" data-act="shot"><span class="e">📸</span>${esc(t('shot'))}</button>
      <button class="tile" data-act="pip"><span class="e">🗗</span>${esc(t('pip'))}</button>
      <button class="tile" data-act="rot"><span class="e">⟳</span>${esc(t('rotate'))}</button>
      <button class="tile ${loopMode !== 'off' ? 'on' : ''}" data-act="loop"><span class="e">🔂</span>${esc(loopLabel)}</button>
      <button class="tile ${sleepAt || sleepEnd ? 'on' : ''}" data-act="sleep"><span class="e">⏾</span>${esc(t('sleep'))}<small>${esc(sleepLabel)}</small></button>
      <button class="tile" data-act="eq"><span class="e">🎚</span>${esc(t('eq'))}</button>
      <button class="tile" data-act="info"><span class="e">ℹ</span>${esc(t('info'))}</button>
    </div>
    <button class="btn ghost" data-act="fix" style="margin-top:12px">🛠 ${esc(t('fixPlay'))}</button>`, (s) => {
    s.querySelectorAll('[data-speed]').forEach((b) => b.onclick = () => { setSpeed(+b.dataset.speed); $('#moreBtn').click(); });
    s.querySelectorAll('[data-asp]').forEach((b) => b.onclick = () => { aspect = b.dataset.asp; zoom = 1; applyView(); $('#moreBtn').click(); });
    s.querySelector('[data-act=ab]').onclick = () => { abStep(); $('#moreBtn').click(); };
    s.querySelector('[data-act=shot]').onclick = () => { closeSheet(); screenshot(); };
    s.querySelector('[data-act=pip]').onclick = () => { closeSheet(); pip(); };
    s.querySelector('[data-act=rot]').onclick = () => { rotate(); };
    s.querySelector('[data-act=loop]').onclick = () => { loopMode = { off: 'one', one: 'all', all: 'off' }[loopMode]; store.set('loop', loopMode); $('#moreBtn').click(); };
    s.querySelector('[data-act=sleep]').onclick = openSleep;
    s.querySelector('[data-act=eq]').onclick = openAudioFx;
    s.querySelector('[data-act=info]').onclick = openInfo;
    s.querySelector('[data-act=fix]').onclick = () => { closeSheet(); convertForPlayback(audioIdx, true); };
  });
};
function openSleep() {
  openSheet(t('sleep'), chips([['0', t('sleepOff')], ['15', '15 ' + t('min')], ['30', '30 ' + t('min')], ['45', '45 ' + t('min')], ['60', '60 ' + t('min')], ['90', '90 ' + t('min')], ['end', t('sleepEnd')]], sleepEnd ? 'end' : '', 'sl'), (s) => {
    s.querySelectorAll('[data-sl]').forEach((b) => b.onclick = () => {
      const x = b.dataset.sl; sleepAt = null; sleepEnd = false;
      if (x === 'end') sleepEnd = true; else if (+x) { sleepAt = Date.now() + (+x) * 60000; toast(`⏾ ${t('sleepSet')} ${x} ${t('min')}`); }
      closeSheet();
    });
  });
}
function openAudioFx() {
  const presetBtns = Object.keys(PRESETS).map((k) => [k, t(k)]);
  openSheet(t('eq'), `
    <div class="row2">🔊 ${esc(t('boost'))} <input type="range" id="boostR" min="0" max="200" value="${Math.round(volume * 100)}"><b id="boostV">${Math.round(volume * 100)}%</b></div>
    <div class="sec">${esc(t('presets'))}</div>${chips(presetBtns, '', 'pre')}
    <div class="eq">${EQ_FREQ.map((f, i) => `<label><input type="range" min="-12" max="12" step="1" value="${eqGains[i]}" data-band="${i}"><span>${f >= 1000 ? f / 1000 + 'k' : f}</span></label>`).join('')}</div>`, (s) => {
    const br = s.querySelector('#boostR');
    br.oninput = () => { setVolume(br.value / 100); s.querySelector('#boostV').textContent = br.value + '%'; };
    s.querySelectorAll('[data-band]').forEach((r) => r.oninput = () => setEq(+r.dataset.band, +r.value));
    s.querySelectorAll('[data-pre]').forEach((b) => b.onclick = () => {
      PRESETS[b.dataset.pre].forEach((g2, i) => setEq(i, g2));
      s.querySelectorAll('[data-band]').forEach((r) => { r.value = eqGains[+r.dataset.band]; });
    });
  });
}
function openInfo() {
  const rows = [[t('file'), file.name], [t('size'), fmtSize(file.size)], [t('duration'), fmt(v.duration)], [t('res'), v.videoWidth ? `${v.videoWidth}×${v.videoHeight}` : '–'], [t('mode'), playingConverted ? t('converted') : t('native')]];
  if (probeCache) for (const s of probeCache.streams) rows.push([s.type + ' ' + (s.rel + 1), [s.codec, s.w ? `${s.w}×${s.h}` : '', s.ch || '', langName(s.lang), s.title || ''].filter(Boolean).join(' · ')]);
  openSheet(t('info'), `<div class="info">${rows.map(([a, b]) => `<b>${esc(a)}:</b> ${esc(b)}`).join('<br>')}</div>`);
}

$('#ccBtn').onclick = () => {
  const embedded = probeCache ? probeCache.streams.filter((s) => s.type === 'Subtitle') : null;
  let embHtml = '';
  if (embedded) {
    embHtml = embedded.length
      ? `<div class="list">${embedded.map((s, i) => `<button class="li" data-sub="${i}"><span class="grow">💬 ${esc(langName(s.lang) || t('track') + ' ' + (i + 1))} ${s.title ? '· ' + esc(s.title) : ''}<small>${esc(s.codec)}</small></span></button>`).join('')}</div>`
      : `<p class="info">${esc(t('subNone'))}</p>`;
  }
  openSheet(t('subtitles'), `
    <div class="list">
      <button class="li ${subs.cues.length ? '' : 'on'}" data-act="off"><span class="grow">${esc(t('subOff'))}</span></button>
      <button class="li" data-act="load"><span class="grow">${esc(t('subLoad'))}<small>SRT · VTT · ASS</small></span></button>
      ${embedded ? '' : `<button class="li" data-act="scan"><span class="grow">${esc(t('subEmbedded'))}</span></button>`}
    </div>
    ${embHtml ? `<div class="sec">${esc(t('subEmbedded').replace('🔍 ', ''))}</div>${embHtml}` : ''}
    <div class="sec">${esc(t('subSize'))}</div>${chips([[0.8, 'S'], [1, 'M'], [1.3, 'L'], [1.7, 'XL']], subs.size, 'ssz')}
    <div class="sec">${esc(t('subColor'))}</div>${chips([['#ffffff', '⚪'], ['#ffe08c', '🟡'], ['#7ef0a8', '🟢'], ['#8fd3ff', '🔵']], subs.color, 'scol')}
    <div class="row2" style="margin-top:12px"><label style="display:flex;gap:8px;align-items:center"><input type="checkbox" id="sbg" ${subs.bg ? 'checked' : ''}> ${esc(t('subBg'))}</label></div>
    <div class="row2">${esc(t('subDelay'))} <button class="chip" data-dl="-0.5">−0.5s</button><b id="dlv">${subs.delay.toFixed(1)}s</b><button class="chip" data-dl="0.5">+0.5s</button></div>`, (s) => {
    s.querySelector('[data-act=off]').onclick = () => { setCues([]); closeSheet(); };
    s.querySelector('[data-act=load]').onclick = () => { closeSheet(); $('#subInput').click(); };
    s.querySelector('[data-act=scan]')?.addEventListener('click', async () => {
      closeSheet(); busy(true, t('loadingEngine'));
      try { await probe(); } catch { toast(t('errEngine')); } finally { busy(false); }
      $('#ccBtn').click();
    });
    s.querySelectorAll('[data-sub]').forEach((b) => b.onclick = () => {
      const st = embedded[+b.dataset.sub]; closeSheet();
      if (/pgs|dvd_sub|dvb_sub|hdmv/i.test(st.codec)) toast(t('imageSubs'), 4000); else extractSub(st);
    });
    s.querySelectorAll('[data-ssz]').forEach((b) => b.onclick = () => { subs.size = +b.dataset.ssz; store.set('subSize', subs.size); renderSub(true); $('#ccBtn').click(); });
    s.querySelectorAll('[data-scol]').forEach((b) => b.onclick = () => { subs.color = b.dataset.scol; store.set('subColor', subs.color); renderSub(true); $('#ccBtn').click(); });
    s.querySelector('#sbg').onchange = (e) => { subs.bg = e.target.checked; store.set('subBg', subs.bg); renderSub(true); };
    s.querySelectorAll('[data-dl]').forEach((b) => b.onclick = () => { subs.delay = +(subs.delay + +b.dataset.dl).toFixed(1); s.querySelector('#dlv').textContent = subs.delay.toFixed(1) + 's'; lastCue = null; });
  });
};

$('#audBtn').onclick = () => {
  const audios = probeCache ? probeCache.streams.filter((s) => s.type === 'Audio') : null;
  let html;
  if (!audios) html = `<div class="list"><button class="li" data-act="scan"><span class="grow">${esc(t('audioScan'))}</span></button></div>`;
  else if (audios.length <= 1) html = `<p class="info">${esc(t('audioOne'))}</p>`;
  else html = `<div class="list">${audios.map((a, i) => `<button class="li ${i === audioIdx ? 'on' : ''}" data-aud="${i}"><span class="grow">🎵 ${esc(langName(a.lang) || t('track') + ' ' + (i + 1))} ${a.title ? '· ' + esc(a.title) : ''}<small>${esc([a.codec, a.ch].filter(Boolean).join(' · '))}</small></span></button>`).join('')}</div>`;
  openSheet(t('audio'), html + `<button class="btn ghost" data-act="fx">🎚 ${esc(t('eq'))} · ${esc(t('boost'))}</button>`, (s) => {
    s.querySelector('[data-act=scan]')?.addEventListener('click', async () => {
      closeSheet(); busy(true, t('loadingEngine'));
      try { await probe(); } catch { toast(t('errEngine')); } finally { busy(false); }
      $('#audBtn').click();
    });
    s.querySelectorAll('[data-aud]').forEach((b) => b.onclick = () => { const i = +b.dataset.aud; closeSheet(); if (i !== audioIdx) convertForPlayback(i, true); });
    s.querySelector('[data-act=fx]').onclick = openAudioFx;
  });
};

$('#plBtn').onclick = () => {
  openSheet(`${t('playlist')} (${list.length})`, `<div class="list">${list.map((f, i) => {
    const p = store.get(posKey(f), 0);
    return `<button class="li ${i === idx ? 'on' : ''}" data-i="${i}"><span>${i === idx ? '▶' : i + 1}</span><span class="grow">${esc(f.name)}<small>${fmtSize(f.size)}${p ? ' · ⏱ ' + fmt(p) : ''}</small></span></button>`;
  }).join('')}</div>`, (s) => {
    s.querySelectorAll('[data-i]').forEach((b) => b.onclick = () => { closeSheet(); playIndex(+b.dataset.i); });
    s.querySelector('.li.on')?.scrollIntoView({ block: 'center' });
  });
};

/* ---------------- Library: phone / folder videos (MX style) ----------------
   Android app (APK): scans all phone videos automatically (MediaStore plugin).
   New Chrome / PC: folders the user links once are remembered and re-scanned.
   Older Chrome: folder picker for this visit only, plus an "update Chrome" hint. */
const NATIVE = !!window.Capacitor?.isNativePlatform?.();
const MediaScan = NATIVE ? (window.Capacitor.Plugins?.MediaScan || window.Capacitor.registerPlugin?.('MediaScan')) : null;
const APK_URL = 'https://github.com/Sandeep-1407/sp02-player/releases/latest';
const IS_ANDROID = /Android/i.test(navigator.userAgent);
const CHROME_V = +((/Chrome\/(\d+)/.exec(navigator.userAgent) || [])[1] || 0);
const VIDEO_EXT = /^(mp4|m4v|mkv|webm|mov|avi|wmv|asf|flv|3gp|3g2|ts|m2ts|mts|mpg|mpeg|vob|ogv|rm|rmvb|divx|f4v)$/;
const L = {
  en: { folders: 'Folders', all: 'All videos', recent: 'Recent', sortNew: 'Newest', sortName: 'Name', sortSize: 'Size', videos: 'videos',
    addFolder: '📁 Add folder', refresh: 'Refresh', scanning: 'Finding videos…', none: 'No videos found yet.',
    allowTitle: 'Show all videos on this phone', allowBtn: '✅ Allow video access', allowNote: 'SP02 only reads your videos to list and play them. Nothing is uploaded.',
    linked: 'folders linked. Tap Refresh to open them.', oldChrome: 'Your Chrome is old (v{v}), so folders cannot be remembered. Update Chrome from Play Store, or install the SP02 Android app which finds every video automatically.',
    noFolderApi: 'This browser cannot remember folders. The picked folder works only for this visit.', getApk: '📲 Get Android app (auto scan)',
    sessionNote: 'Shown for this visit only.', removeFolder: 'Remove', manage: 'Linked folders', back: '← Back', blocked: 'Android does not allow this folder. Pick a folder inside it (e.g. DCIM/Camera, Movies, WhatsApp Video).' },
  hi: { folders: 'फ़ोल्डर', all: 'सारी वीडियो', recent: 'हाल की', sortNew: 'नई पहले', sortName: 'नाम', sortSize: 'साइज़', videos: 'वीडियो',
    addFolder: '📁 फ़ोल्डर जोड़ें', refresh: 'रीफ़्रेश', scanning: 'वीडियो खोजी जा रही हैं…', none: 'अभी कोई वीडियो नहीं मिली।',
    allowTitle: 'इस फ़ोन की सारी वीडियो दिखाएँ', allowBtn: '✅ वीडियो देखने की अनुमति दें', allowNote: 'SP02 सिर्फ़ आपकी वीडियो की लिस्ट बनाने और चलाने के लिए पढ़ता है। कुछ भी अपलोड नहीं होता।',
    linked: 'फ़ोल्डर जुड़े हैं। खोलने के लिए रीफ़्रेश दबाएँ।', oldChrome: 'आपका Chrome पुराना है (v{v}), इसलिए फ़ोल्डर याद नहीं रह सकते। Play Store से Chrome अपडेट करें, या SP02 Android ऐप इंस्टॉल करें जो सारी वीडियो अपने आप ढूँढता है।',
    noFolderApi: 'यह ब्राउज़र फ़ोल्डर याद नहीं रख सकता। चुना फ़ोल्डर सिर्फ़ इस बार चलेगा।', getApk: '📲 Android ऐप लें (अपने आप स्कैन)',
    sessionNote: 'सिर्फ़ इस बार के लिए दिख रही हैं।', removeFolder: 'हटाएँ', manage: 'जुड़े फ़ोल्डर', back: '← वापस', blocked: 'Android यह फ़ोल्डर चुनने नहीं देता। इसके अंदर का फ़ोल्डर चुनें (जैसे DCIM/Camera, Movies, WhatsApp Video)।' },
};
const lt = (k) => L[lang]?.[k] ?? L.en[k];

// small IndexedDB store: linked folder handles + thumbnail/duration cache
const IDB = (() => {
  let p;
  const open = () => p || (p = new Promise((res, rej) => {
    const r = indexedDB.open('sp02', 1);
    r.onupgradeneeded = () => { r.result.createObjectStore('kv'); r.result.createObjectStore('meta'); };
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  }));
  const run = async (st, mode, fn) => { const d = await open(); return new Promise((res, rej) => { const tx = d.transaction(st, mode); const q = fn(tx.objectStore(st)); tx.oncomplete = () => res(q?.result); tx.onerror = () => rej(tx.error); }); };
  return { get: (st, k) => run(st, 'readonly', (s) => s.get(k)).catch(() => undefined), put: (st, k, v) => run(st, 'readwrite', (s) => s.put(v, k)).catch(() => {}) };
})();

let libItems = [];        // { name, size, type, lastModified, folder, duration, url?, file?, nid? }
let libSession = false;   // true when items come from a one-time folder pick
let libView = { tab: 'folders', folder: null, sort: store.get('libSort', 'new') };
let libBusy = false;
const metaKey = (it) => `${it.name}|${it.size}|${it.lastModified}`;
const thumbCache = new Map();

function setBanner(html) { const b = $('#banner'); b.innerHTML = html || ''; b.classList.toggle('hidden', !html); }
function libSet(items, session) {
  libItems = items; libSession = !!session;
  $('#home').classList.toggle('has-lib', items.length > 0);
  renderLib();
}

/* ---- Android app: MediaStore ---- */
async function nativeScan(ask) {
  try {
    let ok = (await MediaScan.checkAccess()).granted;
    if (!ok && ask) ok = (await MediaScan.requestAccess()).granted;
    if (!ok) {
      setBanner(`<b>${esc(lt('allowTitle'))}</b><p>${esc(lt('allowNote'))}</p><button class="btn primary" id="allowBtn">${esc(lt('allowBtn'))}</button>`);
      $('#allowBtn').onclick = () => nativeScan(true);
      return;
    }
    setBanner('');
    libBusy = true; renderLib();
    const { videos } = await MediaScan.listVideos();
    libBusy = false;
    libSet(videos.map((v) => ({
      name: v.name, size: v.size, type: v.mime || '', lastModified: v.date * 1000, duration: v.duration / 1000,
      folder: v.folder || lt('folders'), nid: String(v.id), url: window.Capacitor.convertFileSrc(v.path || v.uri),
    })), false);
  } catch (e) { libBusy = false; renderLib(); toast(String(e?.message || e).slice(0, 120), 4000); }
}

/* ---- Browser: linked folders ---- */
async function walkDir(dir, path, out, depth) {
  for await (const h of dir.values()) {
    if (h.name.startsWith('.')) continue;
    if (h.kind === 'directory') { if (depth < 6) await walkDir(h, path + '/' + h.name, out, depth + 1); }
    else if (VIDEO_EXT.test(extOf(h.name))) {
      try { const f = await h.getFile(); f.folder = path; out.push(f); } catch {}
    }
  }
}
async function scanRoots(ask) {
  const roots = (await IDB.get('kv', 'roots')) || [];
  if (!roots.length) { libSet([], false); return; }
  const out = []; let waiting = 0;
  libBusy = true; renderLib();
  for (const r of roots) {
    let perm = 'granted';
    try { perm = await r.queryPermission({ mode: 'read' }); if (perm !== 'granted' && ask) perm = await r.requestPermission({ mode: 'read' }); } catch { perm = 'denied'; }
    if (perm !== 'granted') { waiting++; continue; }
    try { await walkDir(r, r.name, out, 0); } catch {}
  }
  libBusy = false;
  if (waiting && !out.length) setBanner(`<p>📁 ${roots.length} ${esc(lt('linked'))}</p><button class="btn primary" id="permBtn">🔄 ${esc(lt('refresh'))}</button>`);
  else setBanner('');
  $('#permBtn')?.addEventListener('click', () => scanRoots(true));
  libSet(out, false);
}
async function addFolder() {
  if ('showDirectoryPicker' in window) {
    try {
      const dir = await window.showDirectoryPicker({ id: 'sp02-videos', mode: 'read' });
      const roots = (await IDB.get('kv', 'roots')) || [];
      let dup = false; for (const r of roots) { try { if (await r.isSameEntry(dir)) dup = true; } catch {} }
      if (!dup) { roots.push(dir); await IDB.put('kv', 'roots', roots); }
      await scanRoots(false);
    } catch (e) { if (e?.name === 'SecurityError' || e?.name === 'NotAllowedError') toast(lt('blocked'), 5000); }
  } else $('#dirInput').click();
}
$('#dirInput').onchange = (e) => {
  const fs = [...e.target.files].filter((f) => VIDEO_EXT.test(extOf(f.name)));
  e.target.value = '';
  fs.forEach((f) => { f.folder = (f.webkitRelativePath || f.name).split('/').slice(0, -1).join('/') || lt('folders'); });
  if (fs.length) libSet(libItems.filter((x) => !x.file && x instanceof File).concat(fs), true); else toast(lt('none'));
};
$('#folderBtn').classList.remove('hidden');
$('#folderBtn').onclick = () => (NATIVE ? nativeScan(true) : addFolder());

/* ---- Thumbnails (lazy) ---- */
const thumbQ = []; let thumbRunning = 0;
const thumbIO = new IntersectionObserver((ents) => {
  for (const e of ents) if (e.isIntersecting) { thumbIO.unobserve(e.target); thumbQ.push(e.target); pumpThumbs(); }
}, { rootMargin: '300px' });
function pumpThumbs() {
  while (thumbRunning < 2 && thumbQ.length) {
    const el = thumbQ.shift(); const it = libItems[+el.dataset.i]; if (!it) continue;
    thumbRunning++;
    getThumb(it).then((u) => {
      if (u) { el.style.backgroundImage = `url("${u}")`; el.classList.add('has'); }
      const d = el.querySelector('.d'); if (d && it.duration) d.textContent = fmt(it.duration);
      const pb = el.querySelector('.pb i'); if (pb && it.duration) pb.style.width = Math.min(100, store.get(posKey(it), 0) / it.duration * 100) + '%';
    }).finally(() => { thumbRunning--; pumpThumbs(); });
  }
}
async function getThumb(it) {
  const k = metaKey(it);
  if (thumbCache.has(k)) return thumbCache.get(k);
  let th = null;
  if (NATIVE && it.nid) { try { th = (await MediaScan.thumbnail({ id: it.nid })).data; } catch {} }
  else {
    const m = await IDB.get('meta', k);
    if (m) { th = m.th; if (!it.duration) it.duration = m.d; }
    else {
      const r = await captureThumb(it.file || it);
      th = r.th; it.duration = it.duration || r.d;
      IDB.put('meta', k, { th, d: it.duration });
    }
  }
  thumbCache.set(k, th);
  return th;
}
function captureThumb(blob) {
  return new Promise((resolve) => {
    const vid = document.createElement('video'); vid.muted = true; vid.preload = 'metadata'; vid.playsInline = true;
    const url = blob.url || URL.createObjectURL(blob); let done = false;
    const fin = (o) => { if (done) return; done = true; if (!blob.url) URL.revokeObjectURL(url); vid.removeAttribute('src'); vid.load(); resolve(o); };
    vid.onloadedmetadata = () => {
      const d = vid.duration;
      vid.onseeked = () => {
        try {
          const c = document.createElement('canvas'); c.width = 192; c.height = 108; const g = c.getContext('2d');
          const r = Math.max(c.width / (vid.videoWidth || 16), c.height / (vid.videoHeight || 9));
          const w = (vid.videoWidth || 16) * r, h = (vid.videoHeight || 9) * r;
          g.drawImage(vid, (c.width - w) / 2, (c.height - h) / 2, w, h);
          fin({ th: vid.videoWidth ? c.toDataURL('image/jpeg', 0.6) : null, d: isFinite(d) ? d : 0 });
        } catch { fin({ th: null, d: isFinite(d) ? d : 0 }); }
      };
      vid.currentTime = Math.min(2, (isFinite(d) ? d : 10) * 0.1);
      setTimeout(() => fin({ th: null, d: isFinite(d) ? d : 0 }), 5000);
    };
    vid.onerror = () => fin({ th: null, d: 0 });
    setTimeout(() => fin({ th: null, d: 0 }), 8000);
    vid.src = url;
  });
}

/* ---- Render ---- */
function sortItems(arr) {
  const s = arr.slice();
  if (libView.sort === 'name') s.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  else if (libView.sort === 'size') s.sort((a, b) => b.size - a.size);
  else s.sort((a, b) => b.lastModified - a.lastModified);
  return s;
}
const folderName = (f) => f.split('/').filter(Boolean).pop() || f;
function vRow(it) {
  const i = libItems.indexOf(it);
  const date = it.lastModified ? new Date(it.lastModified).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
  return `<div class="vrow" data-play="${i}"><div class="th" data-i="${i}"><span class="d">${it.duration ? fmt(it.duration) : ''}</span><span class="pb"><i></i></span></div>
    <div class="vt"><b>${esc(it.name)}</b><small>${esc(folderName(it.folder || ''))} · ${fmtSize(it.size)}${date ? ' · ' + date : ''}</small></div></div>`;
}
let libListCtx = [];
function renderLib() {
  const box = $('#lib'); if (!box) return;
  const has = libItems.length > 0;
  box.classList.toggle('hidden', !has && !libBusy);
  if (!has && !libBusy) return;
  const tabs = [['folders', lt('folders')], ['all', lt('all')], ['recent', lt('recent')]];
  $('#libTabs').innerHTML = tabs.map(([k, l]) => `<button class="chip ${libView.tab === k && !libView.folder ? 'on' : ''}" data-tab="${k}">${esc(l)}</button>`).join('');
  $('#libSort').innerHTML = [['new', lt('sortNew')], ['name', lt('sortName')], ['size', lt('sortSize')]].map(([v, l]) => `<option value="${v}" ${libView.sort === v ? 'selected' : ''}>${esc(l)}</option>`).join('');
  const list = $('#libList');
  if (libBusy) { list.innerHTML = `<p class="libnote">⏳ ${esc(lt('scanning'))}</p>`; return; }
  let html = libSession ? `<p class="libnote">${esc(lt('sessionNote'))}</p>` : '';
  if (libView.folder != null) {
    const items = sortItems(libItems.filter((x) => (x.folder || '') === libView.folder));
    libListCtx = items;
    html += `<div class="fhead"><button class="chip" id="libBack">${esc(lt('back'))}</button><b>📁 ${esc(folderName(libView.folder))}</b><small>${items.length} ${esc(lt('videos'))}</small></div>` + items.map(vRow).join('');
  } else if (libView.tab === 'folders') {
    const m = new Map();
    for (const it of libItems) { const k = it.folder || ''; if (!m.has(k)) m.set(k, []); m.get(k).push(it); }
    const folders = [...m.entries()].sort((a, b) => Math.max(...b[1].map((x) => x.lastModified)) - Math.max(...a[1].map((x) => x.lastModified)));
    html += folders.map(([k, arr]) => {
      const first = sortItems(arr)[0]; const i = libItems.indexOf(first);
      const size = arr.reduce((a, x) => a + x.size, 0);
      return `<div class="vrow" data-folder="${esc(k)}"><div class="th folder" data-i="${i}"><span class="fi">📁</span></div>
        <div class="vt"><b>${esc(folderName(k))}</b><small>${arr.length} ${esc(lt('videos'))} · ${fmtSize(size)}${k.includes('/') ? ' · ' + esc(k) : ''}</small></div></div>`;
    }).join('');
  } else {
    const items = libView.tab === 'recent' ? libItems.slice().sort((a, b) => b.lastModified - a.lastModified).slice(0, 60) : sortItems(libItems);
    libListCtx = items;
    html += items.map(vRow).join('');
  }
  list.innerHTML = html;
  list.querySelectorAll('.th[data-i]').forEach((el) => {
    const it = libItems[+el.dataset.i]; const c = it && thumbCache.get(metaKey(it));
    if (c) { el.style.backgroundImage = `url("${c}")`; el.classList.add('has'); }
    if (it) { const pb = el.querySelector('.pb i'); if (pb && it.duration) pb.style.width = Math.min(100, store.get(posKey(it), 0) / it.duration * 100) + '%'; }
    if (!c) thumbIO.observe(el);
  });
  $('#libBack')?.addEventListener('click', () => { libView.folder = null; renderLib(); });
}
$('#libTabs').onclick = (e) => { const b = e.target.closest('[data-tab]'); if (!b) return; libView.tab = b.dataset.tab; libView.folder = null; renderLib(); };
$('#libSort').onchange = (e) => { libView.sort = e.target.value; store.set('libSort', libView.sort); renderLib(); };
$('#libRefresh').onclick = () => (NATIVE ? nativeScan(true) : scanRoots(true));
$('#libList').onclick = (e) => {
  const f = e.target.closest('[data-folder]'); if (f) { libView.folder = f.dataset.folder; renderLib(); scrollTo(0, $('#lib').offsetTop - 70); return; }
  const r = e.target.closest('[data-play]'); if (!r) return;
  const it = libItems[+r.dataset.play];
  const ctx = libListCtx.length ? libListCtx : [it];
  openFiles(ctx.map((x) => x.file || x), Math.max(0, ctx.indexOf(it)), true);
};

/* ---- Start ---- */
(async () => {
  if (NATIVE) {
    $('#home').classList.add('native');
    nativeScan(false);
    return;
  }
  if (IS_ANDROID) $('#apkBtn').classList.remove('hidden');
  $('#apkBtn').href = APK_URL;
  if (!('showDirectoryPicker' in window)) {
    if (IS_ANDROID && CHROME_V && CHROME_V < 132) setBanner(`<p>⚠ ${esc(lt('oldChrome').replace('{v}', CHROME_V))}</p>`);
    else if (IS_ANDROID) setBanner(`<p>ℹ ${esc(lt('noFolderApi'))}</p>`);
  }
  await scanRoots(false);
})();

// read-only hook for automated tests
window.__sp02lib = { get state() { return { items: libItems.length, session: libSession, busy: libBusy, tab: libView.tab, folder: libView.folder }; } };


/* ---------------- Install + offline ---------------- */
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; $('#installBtn').classList.remove('hidden'); });
$('#installBtn').onclick = async () => { if (!deferredPrompt) return; deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; $('#installBtn').classList.add('hidden'); };
window.addEventListener('appinstalled', () => $('#installBtn').classList.add('hidden'));
if ('serviceWorker' in navigator && !(window.Capacitor?.isNativePlatform?.())) navigator.serviceWorker.register('./sw.js').catch(() => {});

applyI18n();

// Small read-only hook used by automated tests
window.__sp02 = { get state() { return { converted: playingConverted, idx, count: list.length, cues: subs.cues.length, audioIdx, w: v.videoWidth, t: v.currentTime, paused: v.paused, audioBytes: v.webkitAudioDecodedByteCount }; } };
