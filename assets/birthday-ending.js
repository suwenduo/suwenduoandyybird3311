let birthdayEndingStarted=false,birthdayVoiceStarted=false,birthdayVoiceSource=null,birthdaySunStarted=false,birthdaySunSource=null;
const birthdaySunData=fetch('assets/track9.mp3').then(r=>{if(!r.ok)throw Error('太阳加载失败');return r.arrayBuffer();});
async function playBirthdaySun(){
 if(birthdaySunStarted)return;birthdaySunStarted=true;
 try{const context=await prepareMessageSound();if(!context)throw Error('声音不可用');const buffer=await context.decodeAudioData((await birthdaySunData).slice(0));birthdaySunSource=context.createBufferSource();birthdaySunSource.buffer=buffer;birthdaySunSource.connect(context.destination);birthdaySunSource.start();}catch{const song=new Audio('assets/track9.mp3');song.play().catch(()=>{});}
}
const birthdayVoiceData=fetch('assets/birthday-ending-voice.wav').then(r=>{if(!r.ok)throw Error('祝福音频加载失败');return r.arrayBuffer();});
async function startBirthdayVoice(){
 if(birthdayVoiceStarted)return;birthdayVoiceStarted=true;
 try{const context=await prepareMessageSound();if(!context)throw Error('声音不可用');const buffer=await context.decodeAudioData((await birthdayVoiceData).slice(0));birthdayVoiceSource=context.createBufferSource();birthdayVoiceSource.buffer=buffer;birthdayVoiceSource.connect(context.destination);birthdayVoiceSource.onended=playBirthdaySun;birthdayVoiceSource.start();}catch{const voice=new Audio('assets/birthday-ending-voice.wav');voice.preload='auto';voice.onended=playBirthdaySun;voice.play().catch(()=>{});}
}
function showFinalBirthdayFilm(overlay){
 const video=document.createElement('video');video.src='assets/birthday-ending-film.mp4';video.muted=true;video.defaultMuted=true;video.playsInline=true;video.setAttribute('webkit-playsinline','');video.setAttribute('aria-label','生日祝福结尾视频');video.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:black';overlay.append(video);video.onended=()=>{video.remove();playFinalThanks(overlay);};video.play().catch(()=>{video.controls=true;});
}

const endingTextPromise=fetch('assets/birthday-ending.json?v=28').then(r=>{if(!r.ok)throw Error('结尾文案加载失败');return r.json();});
async function playBirthdayEnding(){
 if(birthdayEndingStarted)return;birthdayEndingStarted=true;
 const overlay=document.createElement('section');overlay.id='birthdayEnding';overlay.setAttribute('aria-label','生日祝福结尾动画');overlay.innerHTML='<div class="ending-type-copy"></div>';phoneRoot.append(overlay);
 const style=document.createElement('style');style.textContent='#birthdayEnding{position:absolute;inset:0;z-index:1000;background:#000;color:#f1efeb;display:grid;place-items:center;padding:8%;animation:endingBlack .6s ease-out}.ending-type-copy{width:100%;max-height:90%;white-space:pre-wrap;overflow-wrap:anywhere;font-family:-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif;font-size:21px;line-height:1.85;font-weight:300;letter-spacing:.6px;opacity:1}.ending-type-copy.typing:after{content:"▏";opacity:.7;animation:endingCursor .6s steps(2) infinite}@keyframes endingBlack{from{opacity:0}to{opacity:1}}@keyframes endingCursor{50%{opacity:0}}';overlay.append(style);
 const copy=overlay.querySelector('.ending-type-copy');const wait=ms=>new Promise(r=>setTimeout(r,ms));
 const lines=await endingTextPromise;
 for(let i=0;i<lines.length;i++){
  const text=lines[i];copy.style.transition='none';copy.style.opacity='0';copy.textContent=text;let size=text.length>300?16:text.length>150?18:21;copy.style.fontSize=size+'px';while(copy.scrollHeight>overlay.clientHeight*.82&&size>11){copy.style.fontSize=(--size)+'px';}
  copy.textContent='';copy.style.opacity='1';copy.classList.add('typing');
  const chars=Array.from(text),step=i===0?60:Math.min(28,Math.max(9,4000/chars.length));
  for(const char of chars){copy.textContent+=char;await wait(step);}
  copy.classList.remove('typing');await wait(i===0?3000:2000);
  copy.style.transition='opacity '+(i===0?'1.1s':'.13s')+' linear';copy.style.opacity='0';await wait(i===0?1400:330);copy.textContent='';
  if(i===0)startBirthdayVoice();
 }
 showFinalBirthdayFilm(overlay);
}
window.addEventListener('message',e=>{const frame=document.getElementById('storyTogether');if(e.origin===location.origin&&e.source===frame?.contentWindow&&e.data?.type==='together-song-ended')playBirthdayEnding();});

const finalThanksPromise=fetch('assets/final-thanks.json?v=31').then(r=>{if(!r.ok)throw Error('致谢加载失败');return r.json();});
let finalThanksStarted=false;
async function playFinalThanks(overlay){
 if(finalThanksStarted)return;finalThanksStarted=true;
 const data=await finalThanksPromise,wait=ms=>new Promise(r=>setTimeout(r,ms));
 const copy=overlay.querySelector('.ending-type-copy');copy.textContent='';copy.style.transition='none';copy.style.opacity='1';copy.style.fontSize='18px';copy.style.lineHeight='1.9';
 const text=data.credit+'\n\n'+data.text;copy.textContent=text;let size=18;while(copy.scrollHeight>overlay.clientHeight*.82&&size>11)copy.style.fontSize=(--size)+'px';copy.textContent='';
 await wait(650);copy.classList.add('typing');for(const char of Array.from(text)){copy.textContent+=char;await wait(char==='\n'?160:38);}copy.classList.remove('typing');await wait(2000);copy.style.transition='opacity 1.2s ease';copy.style.opacity='0';await wait(1500);copy.textContent='';
 const end=document.createElement('div');end.textContent='全文完';end.setAttribute('aria-label','全文完');end.style.cssText='position:absolute;inset:0;display:grid;place-items:center;font-size:clamp(40px,12vw,66px);letter-spacing:.3em;text-indent:.3em;font-weight:300;color:#f1efeb;opacity:0;transition:opacity 2.8s ease';overlay.append(end);await wait(100);end.style.opacity='1';
}
