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
 const ctx=messageSoundContext;if(!ctx)return()=>{};
 prepareMessageSound();
 const tones=[];let ended=false;
 async function chime(){if(ended)return;await prepareMessageSound();if(ended||ctx.state!=='running')return;const now=ctx.currentTime;[660,880,660,880].forEach((hz,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=hz;g.gain.setValueAtTime(0,now+i*.22);g.gain.linearRampToValueAtTime(.07,now+i*.22+.02);g.gain.exponentialRampToValueAtTime(.0001,now+i*.22+.18);o.connect(g);g.connect(ctx.destination);o.start(now+i*.22);o.stop(now+i*.22+.2);tones.push(o);o.onended=()=>{o.disconnect();g.disconnect();};});}
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
 const steps=[[2000, true, "？"], [1000, false, "？"], [2000, true, "不是，等下，我没准备好"], [2000, false, "准备什么"], [3000, true, "我心脏跳得太快了"], [1500, false, "。。。"], [3000, true, "不行，我还有点气没消"], [1500, false, "？你气啥"], [2000, true, "你真不知道？"], [1500, false, "知道什么"], [3000, true, "你有没有觉得你这个人特别矛盾"], [2000, false, "哪里矛盾了"], [2000, true, "你明明什么都肯跟我说"], [1500, true, "但就是说不到我想听的那个意思"], [3000, false, "……"], [2000, true, "其实你知道我在说什么吧"], [1500, true, "你一直都知道"], [10000, false, "我没有故意躲你"], [2000, true, "那你为什么每次都这样"], [2000, false, "我不知道怎么说"], [2000, false, "就是觉得"], [3000, false, "海南那段时间挺特别的"], [1500, true, "然后呢"], [5000, false, "我们那时候天天待在一起"], [3000, false, "可能很多感觉都被放大了吧"], [2000, false, "我以为回来之后慢慢就好了"], [1500, true, "什么叫慢慢就好了？"], [5000, false, "……"], [3000, true, "陈思罕"], [2000, true, "你是觉得那些感觉不应该有吗"], [5000, false, "我只是想把我们的关系停在最美好的时候"], [4000, false, "让你以后即便是想起我"], [4000, false, "也只记得我们笑的最开心的样子"], [2000, true, "陈思罕你真的很过分。你有问过我么？你擅自划清我们的界限，你有问过我真正想留住的是什么吗？"], [2000, true, "不是那些什么回忆，我只想留住你，你本人，陈思罕。"], [8000, false, "可是"], [3000, true, "别可是了"], [3000, true, "你难道不是这么想的吗？不然你为什么要回我哼～"], [5000, false, "……"]];
 for(const [delay,outgoing,text] of steps){await callStoryWait(delay);if(outgoing)await callStoryType(text);else hesitationAppend(text,false);}
 hesitationPhase='complete';hesitationPaint();showStoryCallOption();
}
async function showStoryCallOption(){
 const bar=document.querySelector('#wechat .repair-compose');if(!bar)return;
 const plus=document.createElement('button');plus.className='story-plus';plus.textContent='＋';plus.setAttribute('aria-label','更多功能');bar.prepend(plus);
 const menu=document.createElement('div');menu.className='story-call-menu';menu.hidden=true;
 menu.innerHTML='<button><span>☎</span>语音通话</button>';
 const open=()=>{document.getElementById('virtualKeyboard')?.remove();menu.hidden=false;};plus.onclick=open;
 menu.querySelector('button').onclick=()=>{menu.hidden=true;startOutgoingStoryCall();};$('wechat').append(menu);
 await callStoryWait(500);plus.classList.add('system-pressed');await callStoryWait(180);open();await callStoryWait(150);plus.classList.remove('system-pressed');
}
function startOutgoingStoryCall(){
 if(document.querySelector('.story-outgoing-call'))return;
 const page=document.createElement('section');page.className='story-outgoing-call';page.setAttribute('aria-label','与🐶语音通话');
 page.innerHTML='<div class="story-call-backdrop"></div><header><button aria-label="最小化">▢</button><span>＋</span></header><div class="story-outgoing-person"><img alt="陈思罕头像"><h2>🐶</h2><p class="story-call-status">正在等待对方接受邀请</p><div class="story-dots"><i></i><i></i><i></i></div></div><footer><button class="story-mic"><span>♩</span><small>麦克风已开</small></button><button class="story-hang"><span><svg viewBox="0 0 32 32"><path d="M5 20v-5c5-6 17-6 22 0v5l-6-1v-4c-3-1-7-1-10 0v4z"/></svg></span><small>取消</small></button><button class="story-speaker"><span>♬</span><small>扬声器已关</small></button></footer>';
 page.querySelector('img').src=companionPeer.avatar;page.querySelector('.story-call-backdrop').style.backgroundImage='url("'+companionPeer.avatar+'")';$('wechat').append(page);
 const stop=callStoryRing();let connected=false,seconds=0;let clock;
 const voice=new Audio('assets/voice-call.wav');voice.preload='auto';voice.load();let finished=false;
 voice.onended=()=>page.querySelector('.story-hang').click();
 const connect=setTimeout(()=>{stop();connected=true;voice.play().catch(()=>{page.querySelector('.story-call-status').textContent='点击屏幕播放通话';page.addEventListener('click',()=>voice.play(),{once:true});});page.querySelector('.story-dots').hidden=true;page.querySelector('.story-call-status').textContent='00:00';page.querySelector('.story-hang small').textContent='挂断';clock=setInterval(()=>{seconds++;page.querySelector('.story-call-status').textContent=String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');},1000);},3000);
 page.querySelector('.story-hang').onclick=()=>{if(finished)return;finished=true;voice.onended=null;voice.pause();stop();clearTimeout(connect);clearInterval(clock);page.remove();if(connected)setTimeout(openStoryTogether,3000);hesitationAppend(connected?'通话时长 '+String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0'):'已取消',true);};
 page.querySelector('.story-mic').onclick=e=>{const b=e.currentTarget;const muted=b.classList.toggle('muted');b.querySelector('small').textContent=muted?'麦克风已关':'麦克风已开';};
 page.querySelector('.story-speaker').onclick=e=>{const b=e.currentTarget;const on=b.classList.toggle('enabled');b.querySelector('small').textContent=on?'扬声器已开':'扬声器已关';};
 page.querySelector('header button').onclick=()=>{page.classList.toggle('minimized');};
}

function openStoryTogether(){
 if(document.getElementById('storyTogether'))return;
 const frame=document.createElement('iframe');frame.id='storyTogether';frame.src='listen/index.html?v=17';frame.title='网易云一起听';frame.allow='autoplay';frame.style.cssText='position:absolute;inset:0;width:100%;height:100%;border:0;z-index:500;background:black';$('wechat').append(frame);
}
