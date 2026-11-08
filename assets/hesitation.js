// Tap a key once to begin; typing and erasing are automatic. Only the final sends require a click.
const hesitationLines=['陈思罕？','？怎么是你？','你的手机找到了？','……你是不是','？'];
let hesitationPhase='idle',hesitationIndex=0,hesitationDraft='',hesitationToken=0;
function hesitationPaint(){
 if(activeChat!==companionPeer.name||!repairInput?.isConnected)return;
 repairInput.textContent=hesitationDraft;
 repairInput.setAttribute('contenteditable','false');
 repairInput.setAttribute('aria-busy',String(['typing','erasing'].includes(hesitationPhase)));
 const send=$('keyboardReturn');if(send){send.disabled=!(hesitationPhase==='send-dots'||hesitationPhase==='send-miss');send.setAttribute('aria-label','发送');}
}
function hesitationKeyEffect(deleting=false){
 if(activeChat!==companionPeer.name||repairMusic)return;
 const letters=[...document.querySelectorAll('#virtualKeyboard [data-key]')];
 const key=deleting?document.querySelector('#virtualKeyboard [aria-label="⌫"]'):letters[Math.floor(Math.random()*letters.length)];
 if(key){key.classList.remove('pressed');void key.offsetWidth;key.classList.add('pressed');setTimeout(()=>key.classList.remove('pressed'),115);}
 const context=messageSoundContext;
 if(context&&context.state==='running'){
  const tone=context.createOscillator(),gain=context.createGain(),at=context.currentTime;
  tone.type='triangle';tone.frequency.setValueAtTime(deleting?570:950,at);
  gain.gain.setValueAtTime(.022,at);gain.gain.exponentialRampToValueAtTime(.0001,at+.027);
  tone.connect(gain);gain.connect(context.destination);tone.onended=()=>{tone.disconnect();gain.disconnect();};tone.start(at);tone.stop(at+.03);
 }
}
function hesitationType(text,next){
 hesitationPhase='typing';hesitationDraft='';const token=++hesitationToken;let index=0;hesitationPaint();
 const chars=Array.from(text);
 const step=()=>{
  if(token!==hesitationToken)return;
  hesitationKeyEffect();hesitationDraft=chars.slice(0,++index).join('');hesitationPaint();
  if(index<chars.length)setTimeout(step,210+Math.random()*150);
  else if(next==='erase'){
   hesitationPhase='holding';hesitationPaint();setTimeout(()=>hesitationErase(token),hesitationIndex===3?2100:1400);
  }else{hesitationPhase=next;hesitationPaint();}
 };
 setTimeout(step,350);
}
function hesitationErase(token){
 if(token!==hesitationToken)return;
 hesitationPhase='erasing';hesitationPaint();let removed=0;
 const step=()=>{
  if(token!==hesitationToken)return;
  hesitationKeyEffect(true);hesitationDraft=Array.from(hesitationDraft).slice(0,-1).join('');removed++;hesitationPaint();
  if(hesitationDraft){setTimeout(step,removed%3===0?390:130+Math.random()*80);return;}
  hesitationIndex++;hesitationPhase='waiting';hesitationPaint();
  if(hesitationIndex<hesitationLines.length){setTimeout(()=>hesitationType(hesitationLines[hesitationIndex],'erase'),800);return;}
  setTimeout(()=>{
   hesitationAppend('你到底想输入些什么？',false);
   setTimeout(()=>{hesitationAppend('胆小鬼',false);setTimeout(()=>hesitationType('……','send-dots'),3000);},2000);
  },650);
 };
 step();
}
function hesitationAppend(text,outgoing){
 pigHistory.push({text,outgoing});
 if(activeChat===companionPeer.name&&!$('wechat').classList.contains('hidden'))renderChatMessages(companionPeer);
 wcRefreshList();if(!outgoing)playMessageSound();
}
const hesitationBeforeKeyboard=repairKeyboard;
repairKeyboard=function(){
 hesitationBeforeKeyboard();
 if(activeChat!==companionPeer.name||repairMusic)return;
 hesitationPaint();
};
openVirtualKeyboard=repairKeyboard;
const hesitationBeforeKey=classicKey;
classicKey=function(label){
 if(activeChat!==companionPeer.name||repairMusic)return hesitationBeforeKey(label);
 if(hesitationPhase==='idle'){
  prepareMessageSound();hesitationType(hesitationLines[0],'erase');return;
 }
 if(!['send-dots','send-miss'].includes(hesitationPhase))return;
 if(label==='回车'&&hesitationPhase==='send-dots'){
  hesitationAppend('……',true);hesitationDraft='';hesitationPhase='waiting';hesitationPaint();setTimeout(()=>hesitationType('我想你了','send-miss'),650);return;
 }
 if(label==='回车'&&hesitationPhase==='send-miss'){
  hesitationAppend('我想你了',true);hesitationDraft='';hesitationPhase='complete';hesitationPaint();return;
 }
 // Keep the scripted conversation intact after its two manual sends.
};
const hesitationBeforeChat=wcOpenChat;
wcOpenChat=function(c){hesitationBeforeChat(c);if(c===companionPeer&&hesitationPhase!=='idle'){
 const input=$('wechat').querySelector('.repair-compose .script-input');if(input){repairInput=input;repairBody=$('wechat').querySelector('.wc-chatbody');repairMusic=false;hesitationPaint();}
}};
