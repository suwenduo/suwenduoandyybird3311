// Local continuation: starts only after the player's “我想你了” send.
let callStoryStarted=false;
const callStoryWait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function callStoryType(text){
 hesitationPhase='typing';hesitationDraft='';hesitationPaint();
 for(const char of Array.from(text)){hesitationKeyEffect();hesitationDraft+=char;hesitationPaint();await callStoryWait(75);}
 await callStoryWait(350);
 const send=$('keyboardReturn');send?.classList.add('pressed');
 hesitationAppend(text,true);hesitationDraft='';hesitationPhase='waiting';hesitationPaint();
 await callStoryWait(130);send?.classList.remove('pressed');
}
function callStoryRing(){
 prepareMessageSound();const ctx=messageSoundContext;if(!ctx)return()=>{};
 const tones=[];let ended=false;
 function chime(){if(ended)return;const now=ctx.currentTime;[660,880,660,880].forEach((hz,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=hz;g.gain.setValueAtTime(0,now+i*.22);g.gain.linearRampToValueAtTime(.07,now+i*.22+.02);g.gain.exponentialRampToValueAtTime(.0001,now+i*.22+.18);o.connect(g);g.connect(ctx.destination);o.start(now+i*.22);o.stop(now+i*.22+.2);tones.push(o);o.onended=()=>{o.disconnect();g.disconnect();};});}
 chime();const timer=setInterval(chime,1600);return()=>{ended=true;clearInterval(timer);tones.forEach(o=>{try{o.stop();}catch{}});};
}
async function startCallStory(){
 if(callStoryStarted)return;callStoryStarted=true;
 await callStoryWait(5000);
 const panel=document.createElement('div');panel.className='story-call';panel.setAttribute('role','dialog');panel.setAttribute('aria-label','🐶邀请你语音通话');
 panel.innerHTML='<div class="story-call-person"><img alt="陈思罕头像"><div><strong>🐶</strong><p>邀请你语音通话</p></div></div><div class="story-call-actions"><button class="story-call-hide" disabled>♩ 隐藏</button><button class="story-call-no" aria-label="拒绝语音通话"><svg viewBox="0 0 32 32"><path d="M5 20v-5c5-6 17-6 22 0v5l-6-1v-4c-3-1-7-1-10 0v4z"/></svg></button><button class="story-call-yes" disabled aria-label="接听"><svg viewBox="0 0 32 32"><path d="M8 4 4 8c-1 9 11 21 20 20l4-4-7-6-3 3c-4-2-6-4-8-8l3-3z"/></svg></button></div>';
 panel.querySelector('img').src=companionPeer.avatar;
 ($('wechat')||document.body).append(panel);const stop=callStoryRing();
 // The six-second ring and refusal are controlled by the story.
 panel.querySelector('.story-call-no').disabled=true;
 await callStoryWait(6000);panel.querySelector('.story-call-no').classList.add('system-pressed');stop();
 await callStoryWait(280);panel.classList.add('story-call-leave');await callStoryWait(240);panel.remove();
 hesitationAppend('语音通话已拒绝',false);
 const steps=[
 [0,true,'？'],[1000,false,'？'],[2000,true,'不是，等下，我没准备好'],[3000,false,'准备什么'],[2000,true,'我心脏跳得太快了'],[3000,false,'。。。'],[2000,true,'不行我还有点气没消'],[2000,false,'？你气啥'],[2000,true,'气你总是一言不合玩消失又出现的戏码'],[2000,true,'这次你打算什么时候消失？'],[8000,false,'我不是故意的'],[3000,false,'我只是以为切断了所有'],[2000,false,'就可以慢慢淡出你的世界'],[2000,true,'？'],[2000,true,'我有要求你淡出么？'],[2000,true,'我真服了'],[4000,false,'我只是想把我们的关系停在最美好的时候'],[2000,false,'让你以后即便是想起我'],[2000,false,'也只记得我们笑的最开心的样子']];
 for(const [delay,outgoing,text] of steps){await callStoryWait(delay);if(outgoing)await callStoryType(text);else hesitationAppend(text,false);}
 hesitationPhase='complete';hesitationPaint();
}
