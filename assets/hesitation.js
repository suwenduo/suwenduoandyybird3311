// Junming's hesitant reply: typing is scripted; deleting and sending require a click.
const hesitationLines=['陈思罕？','？怎么是你？','你的手机找到了？','……你是不是','？'];
let hesitationPhase='idle',hesitationIndex=0,hesitationDraft='',hesitationToken=0;
function hesitationPaint(){
 if(activeChat!==companionPeer.name||!repairInput?.isConnected)return;
 repairInput.textContent=hesitationDraft;
 repairInput.setAttribute('contenteditable','false');
 repairInput.setAttribute('aria-busy',String(hesitationPhase==='typing'));
 const send=$('keyboardReturn');if(send){send.disabled=!(hesitationPhase==='send-dots'||hesitationPhase==='send-miss');send.setAttribute('aria-label','发送');}
}
function hesitationType(text,next){
 hesitationPhase='typing';hesitationDraft='';const token=++hesitationToken;let index=0;hesitationPaint();
 const step=()=>{if(token!==hesitationToken)return;hesitationDraft=Array.from(text).slice(0,++index).join('');hesitationPaint();if(index<Array.from(text).length)setTimeout(step,140);else{hesitationPhase=next;hesitationPaint();}};
 setTimeout(step,240);
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
 if(hesitationPhase==='idle')hesitationType(hesitationLines[0],'delete');else hesitationPaint();
};
openVirtualKeyboard=repairKeyboard;
const hesitationBeforeKey=classicKey;
classicKey=function(label){
 if(activeChat!==companionPeer.name||repairMusic)return hesitationBeforeKey(label);
 if(hesitationPhase==='typing'||hesitationPhase==='waiting')return;
 if(label==='⌫'&&hesitationPhase==='delete'){
  hesitationDraft='';hesitationPaint();hesitationIndex++;
  if(hesitationIndex<hesitationLines.length){hesitationType(hesitationLines[hesitationIndex],'delete');return;}
  hesitationPhase='waiting';hesitationPaint();
  hesitationAppend('你到底想输入些什么？',false);
  setTimeout(()=>{hesitationAppend('胆小鬼',false);setTimeout(()=>hesitationType('……','send-dots'),3000);},2000);
  return;
 }
 if(label==='回车'&&hesitationPhase==='send-dots'){
  hesitationAppend('……',true);hesitationDraft='';hesitationPaint();hesitationType('我想你了','send-miss');return;
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
