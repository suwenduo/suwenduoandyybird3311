// Start this companion immediately after the first phone's ending.
for(const stage of Object.values(storyClockStages)){stage.minute=24*60+8;stage.ceiling=24*60+8;}
storyClockMinute=24*60+8;storyClockStage='initial';paintStoryClock();
companionPeer.name='🐶';
const arrivalVoice=pigHistory.at(-1);
if(!arrivalVoice?.voice||arrivalVoice.outgoing)throw new Error('The companion must end with the incoming voice message.');
arrivalVoice.stamp='11月8日 00:08';
let arrivalDelivered=false,arrivalRead=false,arrivalPendingChat=false;
function syncArrivalBadge(){
 const icon=document.querySelector('#dock .app[aria-label="微信"] .icon');if(!icon)return;
 icon.querySelector('.arrival-app-badge')?.remove();
 if(arrivalDelivered&&!arrivalRead){const badge=document.createElement('span');badge.className='arrival-app-badge';badge.textContent='1';badge.setAttribute('aria-label','1条未读微信');icon.append(badge);}
}
wcUnreadCount=c=>c===companionPeer&&arrivalDelivered&&!arrivalRead?1:0;
const beforeArrivalSort=wcSortedChats;
wcSortedChats=function(query=''){const list=beforeArrivalSort(query);return list.sort((a,b)=>Number(b===companionPeer)-Number(a===companionPeer));};
const beforeArrivalRows=wcRows;
wcRows=function(query=''){
 beforeArrivalRows(query);
 for(const row of document.querySelectorAll('#wcList .wc-row')){
  if(row.querySelector('.wc-name')?.textContent!=='🐶')continue;
  const time=document.createElement('time');time.className='arrival-row-time';time.textContent='00:08';row.append(time);
 }
};
const beforeArrivalChat=wcOpenChat;
wcOpenChat=function(c){
 if(c===companionPeer){arrivalRead=true;$('arrivalNotification')?.remove();syncArrivalBadge();}
 beforeArrivalChat(c);
};
const beforeArrivalUnlock=unlockToHome;
unlockToHome=async function(){await beforeArrivalUnlock();if(arrivalPendingChat){arrivalPendingChat=false;wcOpenChat(companionPeer);}};
setTimeout(()=>{
 arrivalDelivered=true;
 if(activeChat===companionPeer.name&&!$('wechat').classList.contains('hidden'))arrivalRead=true;
 wcRefreshList();syncArrivalBadge();
 if(arrivalRead)return;
 const notice=document.createElement('button');notice.id='arrivalNotification';notice.className='arrival-notification';notice.setAttribute('aria-label','微信，🐶发来一条语音，点击解锁查看');
 notice.innerHTML='<span class="arrival-icon">'+document.querySelector('#dock .app[aria-label="微信"] .icon').innerHTML.replace(/<span class="arrival-app-badge"[\s\S]*?<\/span>/,'')+'</span><span class="arrival-copy"><span class="arrival-top"><strong>微信</strong><small>现在</small></span><b>🐶</b><span>发来一条语音</span></span>';
 notice.addEventListener('pointerdown',e=>e.stopPropagation());notice.onclick=e=>{e.stopPropagation();arrivalPendingChat=true;revealPass();};
 $('lock').append(notice);playMessageSound();
},2000);
