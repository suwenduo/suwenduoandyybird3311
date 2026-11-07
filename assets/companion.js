// Companion phone: an observer reads the original conversation from Junming's side.
const companionPeer=wcContacts.find(c=>c.name==='🐷');
companionPeer.name='陈思罕';
wcSister.avatar=wcCrewAvatar('哥','#617586');
companionPeer.avatar='assets/2a4f7eace0f0ba755a666dd6da0819e97e3ea6f4.jpg';
for(const message of pigHistory)if(!message.notice)message.outgoing=!message.outgoing;
pigMessageDelivered=false;pigMessageRead=true;pigConversation.length=0;
wcContacts.splice(wcContacts.indexOf(wcFamilyGroup),1);
wcHainanGroup.members=[companionPeer,wcContacts.find(c=>c.name==='STF')];
wcHainanGroup.avatarMembers=[{name:'我',avatar:wcSelfPhoto},...wcHainanGroup.members];
wcHistorySources.clear();wcHistorySources.set(wcHainanGroup,wcHainanMessages);wcHistorySources.set(wcCrewGroup,[...wcCrewSchedule,...wcWrapMessages]);
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
 const m=c===companionPeer?pigHistory.at(-1):wcHistorySources.get(c)?.at(-1);
 if(!m)return '';
 return (c.isGroup?(m.speaker==='🐷'?'陈浚铭':m.speaker)+'：':'')+(m.voice?'[语音]':m.image?'[图片]':m.text);
};
wcSortedChats=function(query=''){return wcContacts.filter(c=>c.name.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>Number(!!b.pinned)-Number(!!a.pinned));};
function companionBubble(m){return m.voice?'<button class="wc-bubble wc-voice-bubble" data-ending-voice aria-label="播放陈思罕的语音，4秒"><span>◖)))</span><span>4″</span></button>':m.image?'<img class="'+(m.photo?'wc-chat-photo':'wc-chat-sticker')+'" src="'+escapeChat(m.image)+'" alt="'+escapeChat(m.text)+'">':'<div class="wc-bubble">'+renderPigChatText(m.text)+'</div>';}
renderChatMessages=function(c){
 const body=$('wechat').querySelector('.wc-chatbody');if(!body)return;
 const messages=c===companionPeer?pigHistory:c===wcHainanGroup?wcHainanMessages:c===wcCrewGroup?[...wcCrewSchedule.map(m=>({...m,speaker:m.speaker||'常务'})),...wcWrapMessages]:[];
 body.innerHTML=messages.map(m=>{
  const stamp=m.stamp?'<div class="wc-group-stamp">'+escapeChat(m.stamp)+'</div>':'';
  if(m.notice)return stamp+'<div class="wc-group-notice">'+escapeChat(m.text)+'</div>';
  const own=c===companionPeer?m.outgoing:m.speaker==='🐷'||m.speaker==='陈浚铭';
  const peer=c.isGroup?(m.speaker==='陈思罕'?companionPeer:[...wcContacts,...wcCrewRoles].find(p=>(p.originalName||p.name)===m.speaker)):c;
  const bubble=companionBubble(m);
  return stamp+(own?'<div class="wc-message outgoing">'+bubble+wcSelfAvatar()+'</div>':'<div class="wc-message">'+wcAvatar(peer||companionPeer)+(c.isGroup?'<div class="wc-group-copy"><span class="wc-group-sender">'+escapeChat(companionAliases[m.speaker]||m.speaker)+'</span>'+bubble+'</div>':bubble)+'</div>');
 }).join('');body.querySelectorAll('[data-ending-voice]').forEach(b=>b.onclick=()=>playEndingVoice(b));body.scrollTop=body.scrollHeight;
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

unlockToHome=async function(){show('home');motionBusy=false;busy=false;};
deliverOwnerSMS=()=>{};

const companionAliases={'龙哥':'🐲','肘纳森':'Jonathan','博文':'little sheep','lulu杰':'神','妈咪':'妈妈','呆地':'爸爸','⬅️77':'左少'};
for(const c of wcContacts){c.originalName=c.name;if(companionAliases[c.name])c.name=companionAliases[c.name];}
wcCrewGroup.members=[...wcCrewGroup.members.filter(c=>c!==companionPeer),companionPeer];
wcCrewGroup.avatarMembers=[{name:'我',avatar:wcSelfPhoto},...wcCrewGroup.members];
pigHistory.push({text:finalPigLetter,outgoing:true,stamp:'11月8日 00:04'});
for(const text of ['十四岁和十五岁没有什么不一样','习惯有陈浚铭在的日子了','所以现在很不习惯，因为没有你','我也想，回到海南','你一直 很傻'])pigHistory.push({text,outgoing:false});
for(const text of ['陈思罕才傻','你看到了记得删掉这些','谢谢你回答我','但是我不想让他看见'])pigHistory.push({text,outgoing:true});
pigHistory.push({text:'为什么？',outgoing:false},{text:'怕他觉得我傻',outgoing:true},{text:'[语音]',outgoing:false,voice:'assets/owner-final-voice.wav'});
