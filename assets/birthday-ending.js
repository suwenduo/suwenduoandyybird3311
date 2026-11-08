let birthdayEndingStarted=false;
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
 }
}
window.addEventListener('message',e=>{const frame=document.getElementById('storyTogether');if(e.origin===location.origin&&e.source===frame?.contentWindow&&e.data?.type==='together-song-ended')playBirthdayEnding();});
