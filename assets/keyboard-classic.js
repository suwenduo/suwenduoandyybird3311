function drawClassicKeyboard(){
 if($('virtualKeyboard'))return;
 const keyboard=document.createElement('div');keyboard.id='virtualKeyboard';keyboard.className='virtual-keyboard';keyboard.setAttribute('aria-label','虚拟键盘');
 keyboard.innerHTML='<div class="keyboard-suggestions" aria-hidden="true"></div>';
 const rows=[['Q','W','E','R','T','Y','U','I','O','P'],['A','S','D','F','G','H','J','K','L'],['⇧','Z','X','C','V','B','N','M','⌫'],['123','☺','空格','回车']];
 rows.forEach(keys=>{const row=document.createElement('div');row.className='keyboard-row';keys.forEach(label=>{const key=document.createElement('button');key.type='button';key.className='virtual-key'+(label==='回车'?' return':label==='空格'?' space':label.length>1||['⇧','⌫','🌐'].includes(label)?' utility':'');key.textContent=/^[A-Z]$/.test(label)?label.toLowerCase():label==='空格'?'':label;const keyPaths={'⇧':'<path d="M3 12 12 3l9 9h-6v9H9v-9z"/>','⌫':'<path d="M9 5h12v14H9l-7-7z"/><path d="m12 9 6 6m0-6-6 6"/>','回车':'<path d="M12 22V3m-8 8 8-8 8 8"/>'};if(keyPaths[label])key.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+keyPaths[label]+'</svg>';key.setAttribute('aria-label',label==='回车'?'回车发送':label);if(label==='123')key.classList.add('number-toggle');if(/^[A-Z]$/.test(label))key.dataset.key=label.toLowerCase();if(label==='回车')key.id='keyboardReturn';key.onpointerdown=e=>e.preventDefault();key.onclick=()=>{key.classList.add('pressed');setTimeout(()=>key.classList.remove('pressed'),130);classicKey(label);};row.append(key);});keyboard.append(row);});
 const foot=document.createElement('div');foot.className='keyboard-foot';foot.innerHTML='<button class="keyboard-hide" aria-label="收起键盘"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="16" cy="16" r="13"/><ellipse cx="16" cy="16" rx="6" ry="13"/><path d="M3 16h26M6 8h20M6 24h20"/></svg><span>⌄</span></button><span aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="11" y="2" width="10" height="20" rx="5"/><path d="M7 15v3a9 9 0 0 0 18 0v-3M16 27v4m-6 0h12"/></svg></span>';foot.querySelector('button').onclick=closeVirtualKeyboard;keyboard.append(foot);(repairMusic?$('content'):$('wechat')).append(keyboard);repairInput?.classList.add('editing');
}
let classicUpper=false;
function classicKey(label){
 if(!repairInput)return;
 if(label==='123'){repairNumbers=true;classicNumericKeyboard();return;}
 if(label==='ABC'){repairNumbers=false;repairKeyboard();return;}
 if(label==='⇧'){classicUpper=!classicUpper;document.querySelectorAll('#virtualKeyboard [data-key]').forEach(b=>{b.textContent=classicUpper?b.dataset.key.toUpperCase():b.dataset.key.toLowerCase();b.setAttribute('data-key',b.textContent);});return;}
 if(label==='⌫'){repairInput.textContent=Array.from(repairInput.textContent).slice(0,-1).join('');return;}
 if(label==='回车'){
  const text=repairInput.textContent.trim();if(!text)return;
  const bubble=document.createElement('div');bubble.className=repairMusic?'nm-dm-outgoing':'wc-message outgoing';bubble.innerHTML='<div class="'+(repairMusic?'nm-dm-blue':'wc-bubble')+'"></div>';bubble.firstChild.textContent=text;repairBody.append(bubble);repairBody.scrollTop=repairBody.scrollHeight;repairInput.textContent='';return;
 }
 repairInput.textContent+=label==='空格'?' ':label==='☺'?'🙂':classicUpper?label:label.toLowerCase();
}
function classicNumericKeyboard(){
 repairKeyboard();
 const rows=document.querySelectorAll('#virtualKeyboard .keyboard-row');
 const numbers=[['1','2','3','4','5','6','7','8','9','0'],['-','/',':',';','(',')','¥','&','@','"'],['。','，','？','！','⌫']];
 rows.forEach((row,i)=>{if(i>=3)return;row.replaceChildren();numbers[i].forEach(label=>{const b=document.createElement('button');b.className='virtual-key'+(label==='⌫'?' utility':'');b.textContent=label;b.setAttribute('aria-label',label);b.onpointerdown=e=>e.preventDefault();b.onclick=()=>classicKey(label);row.append(b);});});
 const toggle=document.querySelector('#virtualKeyboard .number-toggle');toggle.textContent='ABC';toggle.setAttribute('aria-label','切换字母键盘');toggle.onclick=()=>classicKey('ABC');
}
repairKeyboard=function(){closeVirtualKeyboard();if(!repairInput)return;drawClassicKeyboard();};
openVirtualKeyboard=repairKeyboard;
