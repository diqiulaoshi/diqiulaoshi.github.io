const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const target='LS';
let pairs=[];
for(let i=0;i<60;i++){
    const a=letters[Math.floor(Math.random()*26)];
    const b=letters[Math.floor(Math.random()*26)];
    pairs.push(a+b);
}
pairs.push(target);  
const launchPH=document.getElementById('launchPH');
const ltr_str=document.getElementById('ltr_str');
const pro_fill=document.getElementById('pro_fill');
const Ftxt=document.getElementById('Ftxt');
const Card=document.getElementById('Card');
const hint=document.getElementById('hint');
let startT=null;
let anivis=false;
let targetIDX=60;
let len=pairs.length;
function buildstr(){
    //for(let r=0;r<=1;r++){
    for(let i=0;i<len;i++){
        const div=document.createElement('div');
        div.className='ltr-itm';
        div.textContent=pairs[i];
        ltr_str.appendChild(div);
    }
    //}
}
buildstr();

function aniltr(timestamp){
    if(startT===null){
        startT=timestamp;
    }
    const elap=timestamp-startT;
    const pro=Math.min(elap/6000,1);
    const eased=1-Math.pow(1-pro,2.2);
    const idx=Math.floor(eased*len);
    ltr_str.style.transform=`translateY(-${idx*140}px)`;
    pro_fill.style.width=(pro*100)+'%';
    const txt=ltr_str.children[idx].textContent;
    if (idx >= len-1 && !anivis) {
        anivis = true;
        ltr_str.style.transform = `translateY(-${idx * 140}px)`;
        pro_fill.style.width = '100%';
        setTimeout(() => BlkPH(), 400);
        return;
    }
    if(pro<1){
        requestAnimationFrame(aniltr);
    }
}
function BlkPH(){
    launchPH.classList.add('hid');
    blkPH.style.display = 'flex';
    blkPH.style.flexDirection = 'column';
    blkPH.style.alignItems = 'center';
    blkPH.style.justifyContent = 'center';
    const logo=document.getElementById(`logo`);
    if (logo) {
        logo.classList.remove('logo-vis');
        // 强制回流
        void logo.offsetWidth;
        logo.classList.add('logo-vis');
    }
    const fadeDuration = 1800 + 300;
    setTimeout(() => {
        Ftxt.classList.remove('hid');
        Ftxt.classList.add('show');
    }, fadeDuration);
    setTimeout(() => {
        Card.classList.remove('hid');
        Card.classList.add('show');
    }, fadeDuration + 400);
}
requestAnimationFrame(aniltr);