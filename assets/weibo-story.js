const wbStory={author:'TF家族-陈思罕_SH',avatar:'assets/weibo-post/7503.jpg',cover:'assets/weibo-post/7504.jpg',photos:Array.from({length:15},(_,i)=>'assets/weibo-post/'+(7488+i)+'.jpg'),text:'好久不见！再见已经是十五岁的我了～\n这一年里，不停蹿高的个子、悄悄到来的变声，是我最明显的变化。就像一只幼鸟，正在告别细软的绒毛，慢慢长出能乘风飞翔的羽翼，一点点适应全新的自己。我依然有想要奔赴的热爱，但不再一味只追求结果。我慢慢接受自己的不完美，接受成长里所有忽上忽下、摇摆不定的时刻。我想15岁的我，不再只憧憬长大，而是试着扛起属于自己的目标。会受挫、会犹豫，但不想轻易停下脚步。\n在这里，祝自己十五岁生日快乐！愿未来，迎着风，自在飞翔！'};
let wbStoryLike=true,wbStoryStar=false,wbStoryPhoto=0;
const wbStoryBeforeOpen=openWeibo;
function wbStoryAuthor(){return '<div class="wbs-author"><button data-story-profile aria-label="查看陈思罕主页"><img src="'+wbStory.avatar+'" alt="陈思罕头像"></button><div><button class="wbs-author-name" data-story-profile>'+wbStory.author+' <span>♛</span></button><small>26-11-8 11:16　发布于 重庆</small></div><button class="wbs-star" id="wbsStar" aria-label="收藏微博" aria-pressed="'+wbStoryStar+'">'+(wbStoryStar?'★':'☆')+'</button></div>';}
function wbStoryCard(detail=false){return '<article class="wbs-post">'+wbStoryAuthor()+'<div class="wbs-copy '+(detail?'':'wbs-clamped')+'">'+escapeChat(wbStory.text)+'</div>'+(!detail?'<button class="wbs-full" data-story-detail>全文</button>':'')+'<div class="wbs-grid">'+wbStory.photos.map((src,i)=>'<button data-story-image="'+i+'" aria-label="查看微博第'+(i+1)+'张图片"><img src="'+src+'" loading="lazy" alt="微博配图 '+(i+1)+'"></button>').join('')+'</div><div class="wbs-card-actions"><button data-story-action="转发">'+wbIcons.discover+'<span>37.2万</span></button><button data-story-detail>'+wbIcons.messages+'<span>4万</span></button><button id="wbsLike" aria-label="点赞微博" aria-pressed="'+wbStoryLike+'" class="'+(wbStoryLike?'liked':'')+'">♡ <span>'+(wbStoryLike?'10万':'赞')+'</span></button></div></article>';}
function wbBindStory(){
 wbScreen.querySelectorAll('[data-story-profile]').forEach(b=>b.onclick=()=>openWeibo('sihan-profile'));
 wbScreen.querySelectorAll('[data-story-detail]').forEach(b=>b.onclick=()=>openWeibo('story-detail'));
 wbScreen.querySelectorAll('[data-story-image]').forEach(b=>b.onclick=()=>wbOpenStoryImage(Number(b.dataset.storyImage)));
 if($('wbsLike'))$('wbsLike').onclick=()=>{wbStoryLike=!wbStoryLike;const b=$('wbsLike');b.classList.toggle('liked',wbStoryLike);b.setAttribute('aria-pressed',String(wbStoryLike));b.querySelector('span').textContent=wbStoryLike?'10万':'赞';};
 if($('wbsStar'))$('wbsStar').onclick=()=>{wbStoryStar=!wbStoryStar;$('wbsStar').textContent=wbStoryStar?'★':'☆';$('wbsStar').setAttribute('aria-pressed',String(wbStoryStar));};
 wbScreen.querySelectorAll('[data-story-action]').forEach(b=>b.onclick=()=>{const old=$('wbsActionSheet');old?.remove();const sheet=document.createElement('div');sheet.className='wbs-sheet';sheet.id='wbsActionSheet';sheet.innerHTML='<strong>'+escapeChat(b.dataset.storyAction)+'</strong><p>当前为浏览模式</p><button>取消</button>';sheet.querySelector('button').onclick=()=>sheet.remove();wbScreen.append(sheet);});
}
openWeibo=function(page='home'){
 if(page!=='sihan-profile'&&page!=='story-detail')wbStoryBeforeOpen(page);else{show('weibo');wbPage=page;wbScreen.innerHTML='<div class="wb-body"></div>';}
 const body=wbScreen.querySelector('.wb-body');
 if(page==='home'){body.querySelector('.wb-empty')?.remove();body.insertAdjacentHTML('beforeend',wbStoryCard());}
 if(page==='profile'){
  body.querySelector('.wb-empty')?.remove();body.insertAdjacentHTML('beforeend','<div class="wbs-only">全部微博（1）</div>'+wbStoryCard());
 }
 if(page==='sihan-profile'){
  body.innerHTML='<div class="wbs-cover" style="background-image:url('+wbStory.cover+')"><button id="wbsBack" aria-label="返回微博首页">‹</button><div><button data-story-action="喜欢你">♡ 喜欢你</button><button data-story-action="搜索">⌕</button><button data-story-action="更多">···</button></div></div><section class="wbs-profile"><img class="wbs-profile-avatar" src="'+wbStory.avatar+'" alt="陈思罕头像"><h1>'+wbStory.author+' <small>♂</small><em>♛ SVIP6</em></h1><div class="wbs-stats"><span><b>139.4万</b> 粉丝</span><span><b>57</b> 关注</span><span><b>9989.1万</b> 转评赞</span></div><div class="wbs-tags"><span>演员影响力指数 3171万</span><span>本月互动人数10万</span></div><p>▤　北京时代峰峻旗下TF家族练习生 陈思罕</p><p>他有 <i>19</i> 个好友，你已经关注他334天了</p><p>我关注的人也关注了他</p><button class="wbs-topic" data-story-action="超话">◇ 超话 <small>72.5万Honey</small></button></section><div class="wbs-profile-tabs"><span>动态</span><strong>微博</strong><span>视频</span><span>超话</span><span>音频</span><span>相册</span></div><div class="wbs-only">全部微博（1） <span>☷ 筛选</span></div>'+wbStoryCard()+'<div class="wbs-followbar"><button data-story-action="祝他生日快乐">♧ 祝他生日快乐</button><button data-story-action="留言">留言</button><button data-story-action="通知">通知</button><button data-story-action="已关注">✓ 已关注</button></div>';
  $('wbsBack').onclick=()=>openWeibo('home');
 }
 if(page==='story-detail'){
  body.innerHTML='<header class="wbs-detail-head"><button id="wbsDetailBack" aria-label="返回微博首页">‹</button><strong>微博正文</strong><button data-story-action="更多">···</button></header>'+wbStoryCard(true)+'<section class="wbs-comments"><strong>转发 37.2万　评论 4万　赞 10万</strong><p>暂无评论内容</p></section>';
  $('wbsDetailBack').onclick=()=>openWeibo('home');
 }
 if(page==='me'){const stat=body.querySelector('.wb-stats b');if(stat)stat.textContent='1';}
 wbBindStory();
};
function wbOpenStoryImage(index){
 wbScreen.querySelector('.wbs-viewer')?.remove();wbStoryPhoto=index;
 const viewer=document.createElement('section');viewer.className='wbs-viewer';viewer.setAttribute('role','dialog');viewer.setAttribute('aria-label','微博图片查看器');
 viewer.innerHTML='<header><button id="wbsImageClose" aria-label="关闭大图">‹</button><span id="wbsImageCount"></span><button id="wbsImageGrid" aria-label="查看所有图片">▦</button></header><div class="wbs-image-scroll"><img id="wbsImageFull" alt=""></div><footer><button id="wbsImagePrev" aria-label="上一张">‹</button><span>原图</span><button id="wbsImageNext" aria-label="下一张">›</button></footer>';
 wbScreen.append(viewer);
 const paint=()=>{const img=$('wbsImageFull');img.src=wbStory.photos[wbStoryPhoto];img.alt='微博配图 '+(wbStoryPhoto+1);$('wbsImageCount').textContent=(wbStoryPhoto+1)+' / '+wbStory.photos.length;$('wbsImagePrev').disabled=wbStoryPhoto===0;$('wbsImageNext').disabled=wbStoryPhoto===wbStory.photos.length-1;viewer.querySelector('.wbs-image-scroll').scrollTop=0;};
 const move=d=>{wbStoryPhoto=Math.max(0,Math.min(wbStory.photos.length-1,wbStoryPhoto+d));paint();};
 $('wbsImageClose').onclick=$('wbsImageGrid').onclick=()=>viewer.remove();$('wbsImagePrev').onclick=()=>move(-1);$('wbsImageNext').onclick=()=>move(1);
 let touch;viewer.addEventListener('touchstart',e=>{touch={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});viewer.addEventListener('touchend',e=>{if(!touch)return;const dx=e.changedTouches[0].clientX-touch.x,dy=e.changedTouches[0].clientY-touch.y;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.4)move(dx<0?1:-1);touch=null;},{passive:true});
 viewer.onkeydown=e=>{if(e.key==='ArrowRight')move(1);if(e.key==='ArrowLeft')move(-1);if(e.key==='Escape')viewer.remove();};viewer.tabIndex=-1;viewer.focus();paint();
}
