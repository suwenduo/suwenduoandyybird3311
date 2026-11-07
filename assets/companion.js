// Companion phone: an observer reads the original conversation from Junming's side.
const companionPeer=wcContacts.find(c=>c.name==='🐷');
companionPeer.name='陈思罕';
companionPeer.avatar='assets/2a4f7eace0f0ba755a666dd6da0819e97e3ea6f4.jpg';
for(const message of pigHistory)if(!message.notice)message.outgoing=!message.outgoing;
pigMessageDelivered=false;pigMessageRead=true;pigConversation.length=0;
wcContacts.splice(wcContacts.indexOf(wcFamilyGroup),1);
wcHainanGroup.members=[companionPeer,wcContacts.find(c=>c.name==='STF')];
wcHainanGroup.avatarMembers=[{name:'我',avatar:wcSelfPhoto},...wcHainanGroup.members];
wcHistorySources.clear();wcHistorySources.set(wcHainanGroup,wcHainanMessages);
wcChatActivity.clear();wcBirthdayReceived.clear();
for(const c of wcContacts)c.preview='';
// Disable the found-phone dialogue, automated replies, and its subsequent story.
deliverPigMessage=()=>{};
syncScriptInput=()=>{};syncPigTitle=()=>{};
openVirtualKeyboard=()=>{};beginScriptTyping=()=>{};sendScriptReply=()=>{};
startBirthdayNotifications=()=>{};startAfterBirthdayStory=()=>{};
scheduleEmergencySongNotification=()=>{};maybeShowEndingLetter=()=>{};
wcUnreadCount=()=>0;
wcLatestPreview=function(c){
 const m=c===companionPeer?pigHistory.at(-1):c===wcHainanGroup?wcHainanMessages.at(-1):null;
 if(!m)return '';
 return (c.isGroup?(m.speaker==='🐷'?'陈浚铭':m.speaker)+'：':'')+(m.image?'[图片]':m.text);
};
wcSortedChats=function(query=''){return wcContacts.filter(c=>c.name.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>Number(!!b.pinned)-Number(!!a.pinned));};
function companionBubble(m){return m.image?'<img class="'+(m.photo?'wc-chat-photo':'wc-chat-sticker')+'" src="'+escapeChat(m.image)+'" alt="'+escapeChat(m.text)+'">':'<div class="wc-bubble">'+renderPigChatText(m.text)+'</div>';}
renderChatMessages=function(c){
 const body=$('wechat').querySelector('.wc-chatbody');if(!body)return;
 const messages=c===companionPeer?pigHistory:c===wcHainanGroup?wcHainanMessages:[];
 body.innerHTML=messages.map(m=>{
  const stamp=m.stamp?'<div class="wc-group-stamp">'+escapeChat(m.stamp)+'</div>':'';
  if(m.notice)return stamp+'<div class="wc-group-notice">'+escapeChat(m.text)+'</div>';
  const own=c===companionPeer?m.outgoing:m.speaker==='🐷'||m.speaker==='陈浚铭';
  const peer=c===wcHainanGroup?(m.speaker==='陈思罕'?companionPeer:wcContacts.find(p=>p.name===m.speaker)):c;
  const bubble=companionBubble(m);
  return stamp+(own?'<div class="wc-message outgoing">'+bubble+wcSelfAvatar()+'</div>':'<div class="wc-message">'+wcAvatar(peer||companionPeer)+(c.isGroup?'<div class="wc-group-copy"><span class="wc-group-sender">'+escapeChat(m.speaker)+'</span>'+bubble+'</div>':bubble)+'</div>');
 }).join('');body.scrollTop=body.scrollHeight;
};
const companionOpenChat=wcOpenChat;
wcOpenChat=function(c){companionOpenChat(c);$('wechat').querySelector('.wc-compose')?.remove();};
// Reverse every music message, including invitations and song cards; preserve listeners.
const companionOpenMusicChat=openXixiChat;
openXixiChat=function(){
 companionOpenMusicChat();
 const scroll=$('content').querySelector('.nm-dm-scroll');
 for(const row of scroll.querySelectorAll(':scope > .nm-dm-incoming, :scope > .nm-dm-outgoing')){
  const wasOwn=row.classList.contains('nm-dm-outgoing');
  row.classList.toggle('nm-dm-outgoing',!wasOwn);row.classList.toggle('nm-dm-incoming',wasOwn);
  row.querySelector(':scope > .nm-dm-small-avatar, :scope > .nm-dm-own-avatar')?.remove();
  const avatar=document.createElement('img');avatar.src=wasOwn?companionPeer.avatar:'assets/f49300888a04b9a6ac1f22a2c829a910344f1e4a.png';
  avatar.alt=wasOwn?'陈思罕的头像':'陈浚铭的头像';avatar.className=wasOwn?'nm-dm-small-avatar':'nm-dm-own-avatar';
  if(wasOwn)row.prepend(avatar);else row.append(avatar);
  const bubble=row.querySelector(':scope > .nm-dm-blue, :scope > .nm-dm-gray');
  if(bubble){bubble.classList.toggle('nm-dm-blue',!wasOwn);bubble.classList.toggle('nm-dm-gray',wasOwn);}
 }
 $('content').querySelector('.nm-dm-compose')?.remove();
};
$('cancel').onclick=()=>{pin='';dots();show('lock');};
show('pass');
