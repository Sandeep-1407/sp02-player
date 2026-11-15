# SP02 – Video Player (Prototype)

Live: https://sandeep-1407.github.io/sp02-player/

Koi bhi video chalayein: MP4, MKV, AVI, WMV, FLV, MOV, TS, MPG, 3GP, HEVC aur aur bhi. Kuch upload nahi hota.

## Kaise chalta hai
- Jo format browser khud chala sakta hai (MP4, WebM, MKV H.264), wo **turant** chalta hai.
- Baaki formats (AVI, WMV, FLV, MPG, TS, HEVC, AC3/DTS aawaz) phone/PC ke andar hi FFmpeg se badal kar chalte hain.
  - Sirf dabba (container) badalna ho to kuch second lagte hain, quality same rehti hai.
  - Video ki coding badalni pade to lambi movie mein phone pe kai minute lag sakte hain. Picture 720p tak rakhi jati hai taaki phone saath de sake.
- Pehli baar engine (~31 MB) internet se aata hai, uske baad offline chalta hai.

## Features
| | |
|---|---|
| Gestures | Baayein ↕ roshni · Daayein ↕ aawaz (200% tak) · ↔ aage-peeche · Double-tap ±10s · Do ungli se zoom |
| Controls | Play/Pause, ±10s, Pichla/Agla, Seek bar, Lock, Fullscreen (video leti ho to screen apne aap landscape) |
| Speed | 0.25x se 4x |
| Screen size | Fit, Fill, Stretch, 16:9, 4:3, Crop, Rotate, Zoom |
| Subtitles | SRT/VTT/ASS file lagana, video ke andar wale subtitles, size, rang, background, delay |
| Audio | Audio track badalna (Hindi/English), boost 200%, 5-band equalizer + presets |
| Aur | A-B repeat, Screenshot, Pop-up (PiP), Loop (ek/sab), Sleep timer, Info, Resume (jahan chhoda wahin se) |
| Playlist | Kai videos ya poora folder (PC), apne aap agla video |
| PC keys | Space play/pause · ←/→ 10s (Shift = 60s) · ↑/↓ aawaz · F fullscreen · M mute · [ ] speed · N/P agla/pichla · S screenshot |
| Kholna | Mobile: Gallery → Share → SP02 · PC: Right-click → Open with → SP02 |

## Test (Chrome, 15 Nov 2026)
MP4 ✔ turant · MKV H.264 ✔ turant · MKV AC3 aawaz ✔ apne aap theek (3.5s) · AVI ✔ · WMV ✔ · FLV ✔ · MPG ✔ · TS ✔ · HEVC ✔ (sab 2–4s mein, chhoti test files)

## Abhi ki limits
- Image subtitles (PGS/DVD) abhi nahi chalte.
- Phone pe 1.8 GB se badi file ko badalna fail ho sakta hai (direct chalne wali files pe koi limit nahi).
- Background mein (screen band) video ki aawaz Android Chrome kabhi-kabhi rok deta hai. Native version mein ye theek hoga.
- Asli "sab kuch turant" ke liye agla kadam: native Android app + libVLC.

---
Created by - Sandeep Kumar from Sandeep Jan Seva Kendra, Mob no. 8299430081
