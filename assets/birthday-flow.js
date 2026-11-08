let birthdayReleased=false,birthdayOpened=false,birthdayVisible=[],birthdayOwnSent=false;
const birthdayAll=[...wbBirthdayComments];
wbBirthdayComments.splice(0);
function birthdayNotice(title,text,onclick){
 document.getElementById('birthdayNotice')?.remove();const n=document.createElement('button');n.id='birthdayNotice';n.className='birthday-notice';n.innerHTML='<b>微博 · '+escapeChat(title)+'</b><span>'+escapeChat(text)+'</span>';n.onclick=()=>{n.remove();onclick();};phoneRoot.append(n);playMessageSound();
}
function releaseBirthdayWeibo(){
 if(birthdayReleased)return;birthdayReleased=true;
 birthdayNotice('TF家族-陈思罕_SH 发布了新微博',wbStory.text.replace(/\n/g,' ').slice(0,43)+'…',()=>{openWeibo('story-detail');});
}
function startBirthdayReplies(){
 if(birthdayOpened)return;birthdayOpened=true;let delay=0;
 birthdayAll.slice(1).forEach(r=>{delay+=10000+Math.floor(Math.random()*5001);setTimeout(()=>{birthdayVisible.push(r);wbBirthdayComments.push(r);if(wbPage==='story-detail'){const list=wbScreen.querySelector('.birthday-comment-list');if(list)list.outerHTML=birthdayCommentHTML();}birthdayNotice(r.name+' 评论了微博',r.text,()=>openWeibo('story-detail'));},delay);});
}
const birthdayFlowOpen=openWeibo;
openWeibo=function(page='home'){
 birthdayFlowOpen(page);

 if(!birthdayReleased){wbScreen.querySelectorAll('.wbs-post,.birthday-comment-list').forEach(n=>n.remove());const body=wbScreen.querySelector('.wb-body');body.insertAdjacentHTML('beforeend','<p class="birthday-empty">暂无微博</p>');return;}
 if(page==='story-detail'){
 startBirthdayReplies();const compose=document.createElement('button');compose.className='birthday-compose';compose.textContent=birthdayOwnSent?'已发送生日祝福':'写评论…';compose.onclick=openBirthdayKeyboard;wbScreen.append(compose);
 }
};
function openBirthdayKeyboard(){
 if(birthdayOwnSent||document.getElementById('birthdayKeyboard'))return;
 const box=document.createElement('section');box.id='birthdayKeyboard';box.className='birthday-keyboard';box.innerHTML='<div class="birthday-draft"></div><button class="birthday-send" disabled>发送</button><div class="birthday-keys"></div>';
 const keys=box.querySelector('.birthday-keys');for(const row of ['QWERTYUIOP','ASDFGHJKL','ZXCVBNM']){const line=document.createElement('div');for(const char of row){const b=document.createElement('button');b.textContent=char.toLowerCase();b.onclick=type;line.append(b);}keys.append(line);}
 let started=false;async function type(){if(started)return;started=true;const draft=box.querySelector('.birthday-draft');for(const char of Array.from(birthdayAll[0].text)){draft.textContent+=char;draft.scrollTop=draft.scrollHeight;const all=keys.querySelectorAll('button'),key=all[Math.floor(Math.random()*all.length)];key.classList.add('pressed');setTimeout(()=>key.classList.remove('pressed'),100);await new Promise(r=>setTimeout(r,75));}box.querySelector('.birthday-send').disabled=false;}
 box.querySelector('.birthday-draft').onclick=type;box.querySelector('.birthday-send').onclick=()=>{if(birthdayOwnSent)return;birthdayOwnSent=true;wbBirthdayComments.push({...birthdayAll[0],time:'刚刚'});box.remove();openWeibo('story-detail');const list=wbScreen.querySelector('.birthday-comment-list');list?.lastElementChild?.scrollIntoView({block:'center',behavior:'smooth'});};wbScreen.append(box);
}
