const wbBirthdayComments=[{"name": "TF家族-陈浚铭chen", "text": "陈思罕，十五岁生日快乐！新的一岁要继续开心，继续做喜欢的事，想要的都慢慢实现。下次见面给你补上蛋糕，今天先隔空许个愿：希望你每天都快乐。🎂", "avatar": "assets/junming-profile/junming-avatar.jpg", "time": "11-08 11:18"}, {"name": "TF家族-杨博文YBW", "text": "思罕生日快乐！十五岁继续勇敢往前走，新的一岁开心多一点，烦恼少一点。下次见面再一起练舞！", "avatar": "assets/junming-profile/7510.jpg", "time": "11-08 11:20"}, {"name": "TF家族-王橹杰LJW", "text": "十五岁生日快乐！愿你想做的事都能慢慢实现，舞台上见，也期待下次一起玩！", "avatar": "assets/junming-profile/7511.jpg", "time": "11-08 11:21"}, {"name": "TF家族-张函瑞", "text": "生日快乐呀思罕！新的一岁继续唱喜欢的歌，做喜欢的事，每一天都开开心心！", "avatar": "assets/junming-profile/7512.jpg", "time": "11-08 11:22"}, {"name": "TF家族-左奇函", "text": "生日快乐兄弟！十五岁了，继续一起进步！下次见面篮球场见，今天先让寿星赢一局。", "avatar": "assets/junming-profile/7513.jpg", "time": "11-08 11:23"}, {"name": "TF家族-张桂源", "text": "思罕，生日快乐！！新的一岁吃好睡好，训练顺利，舞台越来越稳！等见面给你补上生日祝福！", "avatar": "assets/junming-profile/7514.jpg", "time": "11-08 11:24"}, {"name": "TF家族-陈奕恒Jonathan", "text": "Happy birthday 思罕！十五岁快乐！愿你一直有勇气追自己喜欢的东西，下次见面再一起聊天、一起玩！", "avatar": "assets/junming-profile/7515.jpg", "time": "11-08 11:25"}];

const birthdayBeforeOpen=openWeibo;
function birthdayCommentHTML(){return '<section class="birthday-comment-list"><div class="birthday-tabs"><strong>评论 4万</strong><span>按热度</span></div>'+wbBirthdayComments.map((r,i)=>'<article class="birthday-comment"><img src="'+r.avatar+'" alt="'+escapeChat(r.name)+'头像"><div><strong>'+escapeChat(r.name)+'</strong><p>'+escapeChat(r.text)+'</p><small>'+r.time+'　来自 iPhone客户端</small><button data-birthday-reply="'+i+'">回复</button></div><button class="birthday-like" aria-label="赞这条评论" aria-pressed="false">♡</button></article>').join('')+'</section>';}
openWeibo=function(page='home'){
 birthdayBeforeOpen(page);
 const body=wbScreen.querySelector('.wb-body');
 if(page==='me'){
  const avatar=body.querySelector('.wb-account img');if(avatar)avatar.src='assets/junming-profile/junming-avatar.jpg';
  const name=body.querySelector('.wb-account strong');if(name)name.textContent='TF家族-陈浚铭chen';
  const stats=body.querySelectorAll('.wb-stats b');['383','58','324.4万'].forEach((n,i)=>{if(stats[i])stats[i].textContent=n;});
 }
 if(page==='profile'){
  body.innerHTML='<div class="wbs-cover" style="background-image:url(assets/junming-profile/junming-cover.jpg);background-position:center 48%"><button id="jmProfileBack" aria-label="返回我的页面">‹</button><div><button>♡ 喜欢你</button><button>⌕</button><button>···</button></div></div><section class="wbs-profile"><img class="wbs-profile-avatar" src="assets/junming-profile/junming-avatar.jpg" alt="陈浚铭头像"><h1>TF家族-陈浚铭chen <small>♂</small><em>♛ SVIP8</em></h1><div class="wbs-stats"><span><b>324.4万</b> 粉丝</span><span><b>58</b> 关注</span><span><b>4.09亿</b> 转评赞</span></div><div class="wbs-tags"><span>演员影响力指数 3135万</span><span>娱乐明星领域 涨粉飙升</span></div><p>▤　北京时代峰峻旗下TF家族练习生 陈浚铭</p><button class="wbs-topic">◇ 超话 <small>204.1万粉丝</small></button></section><div class="wbs-profile-tabs"><span>动态</span><strong>微博</strong><span>视频</span><span>超话</span><span>音频</span><span>相册</span></div><div class="wbs-only">全部微博（383） <span>☷ 筛选</span></div><div class="jm-filters">原创 ▸　　热门音频 ▸　　近期热门 ▸</div><article class="wbs-post"><div class="wbs-author"><img class="jm-post-avatar" src="assets/junming-profile/junming-avatar.jpg" alt="陈浚铭头像"><div><strong class="wbs-author-name">TF家族-陈浚铭chen ♛</strong><small>10-4</small></div></div><div class="wbs-copy">走着走着遇到了好大的雨，差点都回不去了🌧️☔但雨停后就出现了一个特别大特别标准的彩虹桥，可惜没有拍到啊😢</div></article>';
  $('jmProfileBack').onclick=()=>openWeibo('me');
 }
 if(page==='story-detail'){
  const section=body.querySelector('.wbs-comments');if(section)section.outerHTML=birthdayCommentHTML();
  wbScreen.querySelectorAll('.birthday-like').forEach(b=>b.onclick=()=>{const on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',String(on));b.textContent=on?'♥':'♡';b.style.color=on?'#ff8200':'#aaa';});
  wbScreen.querySelectorAll('[data-birthday-reply]').forEach(b=>b.onclick=()=>{const r=wbBirthdayComments[Number(b.dataset.birthdayReply)];const note=document.createElement('div');note.className='wbs-sheet';note.innerHTML='<strong>回复 '+escapeChat(r.name)+'</strong><p>当前为浏览模式</p><button>取消</button>';note.querySelector('button').onclick=()=>note.remove();wbScreen.append(note);});
 }
};
