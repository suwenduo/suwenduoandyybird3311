// The companion begins after the first phone's complete story.
if(!nmUpdatedStory.some(m=>m.kind==='jm6' || m.title==='紧急联络人'))nmUpdatedStory.push({date:'11月7日 23:57',type:'song',speaker:'🐷',title:'紧急联络人',text:nmEmergencyCaption,kind:nmExtraKind('紧急联络人')});
if(!nmUpdatedStory.some(m=>m.kind==='endingName'))nmUpdatedStory.push({date:'11月8日 00:03',type:'song',speaker:'🐷',title:'刻在我心底的名字',text:'',kind:'endingName'});
finalSongDelivered=true;finalSongRead=true;finalSongEntered=true;
// Remove inherited gallery contents; keep all camera controls and new captures.
galleryPhotos.length=0;savedCameraCount=0;junmingStorage.removeItem('phone-camera-photo-count');
const repairCamera=openSimCamera;openSimCamera=function(){repairCamera();const image=cameraScreen.querySelector('.sim-thumbnail img');if(image&&!galleryPhotos.length)image.removeAttribute('src');};
const smsReplacement=[
['10086','00:08','【中国移动】您的套餐剩余国内通用流量12.6GB，祝您生活愉快。'],
['1069 XXXX 2306','昨天','【顺丰速运】您的快件已放至服务站，取件码3-6-204，请及时领取。'],
['1068 XXXX 4021','昨天','【瑞幸咖啡】您的订单已制作完成，取餐号B026，请到柜台领取。'],
['1069 XXXX 7832','星期五','【哔哩哔哩】验证码582931，5分钟内有效。如非本人操作，请忽略。'],
['1065 XXXX 6610','星期五','【美团】您的订单已完成，感谢您的使用，期待下次再见。'],
['1069 XXXX 1185','星期四','【铁路12306】温馨提示：出行前请确认乘车日期，携带有效身份证件。'],
['可能是：Apple','星期四','您的iCloud储存空间已更新，照片与备忘录将自动同步。'],
['1068 XXXX 7094','星期三','【淘宝】您购买的商品已发货，请在订单页面查看物流进度。'],
['1065 XXXX 9227','星期三','【麦当劳】您有一张早餐优惠券待使用，有效期至本周日。'],
['1069 XXXX 3716','星期二','【菜鸟】包裹已签收。如有疑问，请联系配送员。']
];
smsThreads.splice(0,smsThreads.length,...smsReplacement.map(([number,time,text],i)=>({number,time,text,read:i!==0&&i!==2})));syncSMSUnreadBadge();
// A local simulated keyboard, independent of the old automatic dialogue.
let repairInput=null,repairBody=null,repairMusic=false,repairNumbers=false;
function repairKeyboard(){
 closeVirtualKeyboard();if(!repairInput)return;
 const k=document.createElement('div');k.id='virtualKeyboard';k.className='virtual-keyboard';k.setAttribute('aria-label','模拟键盘');
 const rows=repairNumbers?[['1','2','3','4','5','6','7','8','9','0'],['-','/',':',';','(',')','¥','&','@','"'],['。','，','？','！','⌫'],['ABC','空格','发送']]:[['q','w','e','r','t','y','u','i','o','p'],['a','s','d','f','g','h','j','k','l'],['⇧','z','x','c','v','b','n','m','⌫'],['123','空格','发送']];
 for(const keys of rows){const row=document.createElement('div');row.className='keyboard-row';for(const label of keys){const b=document.createElement('button');b.className='virtual-key'+(label==='空格'?' space':label==='发送'?' return':label.length>1?' utility':'');b.textContent=label;b.setAttribute('aria-label',label);b.onpointerdown=e=>e.preventDefault();b.onclick=()=>{if(label==='123'||label==='ABC'){repairNumbers=!repairNumbers;repairKeyboard();return;}if(label==='⇧')return;if(label==='⌫')repairInput.textContent=repairInput.textContent.slice(0,-1);else if(label==='发送'){const text=repairInput.textContent.trim();if(!text)return;const bubble=document.createElement('div');bubble.className=repairMusic?'nm-dm-outgoing':'wc-message outgoing';bubble.innerHTML='<div class="'+(repairMusic?'nm-dm-blue':'wc-bubble')+'"></div>';bubble.firstChild.textContent=text;repairBody.append(bubble);repairBody.scrollTop=repairBody.scrollHeight;repairInput.textContent='';}else repairInput.textContent+=label==='空格'?' ':label;};row.append(b);}k.append(row);}
 const hide=document.createElement('button');hide.className='keyboard-hide';hide.textContent='⌄';hide.setAttribute('aria-label','收起键盘');hide.onclick=closeVirtualKeyboard;k.append(hide);
 (repairMusic?$('content'):$('wechat')).append(k);
}
openVirtualKeyboard=repairKeyboard;
function installRepairInput(root,body,music=false){
 root.querySelector('.repair-compose')?.remove();const bar=document.createElement('div');bar.className='repair-compose';bar.innerHTML='<span>⊙</span><div class="script-input" contenteditable="true" role="textbox" aria-label="消息输入框" inputmode="none"></div><span>☺</span><span>＋</span>';
 const input=bar.querySelector('[contenteditable]');input.onclick=()=>{repairInput=input;repairBody=body;repairMusic=music;repairKeyboard();};root.append(bar);
}
const repairChat=wcOpenChat;wcOpenChat=function(c){repairChat(c);installRepairInput($('wechat'),$('wechat').querySelector('.wc-chatbody'));};
const repairCloud=openXixiChat;openXixiChat=function(){repairCloud();installRepairInput($('content'),$('content').querySelector('.nm-dm-scroll'),true);};
// Start at the lock screen; retain the original upward swipe to the keypad.
show('lock');
const officialWeiboIcon=wbApp.querySelector('.icon');officialWeiboIcon.innerHTML='<img src="assets/weibo-official.jpg?v=6" alt="微博" style="width:100%;height:100%;object-fit:cover">';
