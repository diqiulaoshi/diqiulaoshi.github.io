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
const blkPH=document.getElementById('blkPH');
const ltr_str=document.getElementById('ltr_str');
const pro_fill=document.getElementById('pro_fill');
const blk_grid=document.getElementById('blk_gird');
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
        setTimeout(() => BlkPh(), 400);
        return;
    }
    if(pro<1){
        requestAnimationFrame(aniltr);
    }
}
function BlkPh(){
    launchPH.classList.add('hid');
    blkPH.style.display='flex';
    const tot=36;
    for(let i=0;i<tot;i++){
        const blk=document.createElement('div');
        blk.className='blk';
        blk.style.opacity='0';
        blk.style.transform = 'translateX(200px) rotateY(30deg) scale(0.6)';
        blk_grid.appendChild(blk);
    }
    const blks=document.querySelectorAll('.blk');
    blks.forEach((blk,idx)=>{
        const delay=idx*45;
        setTimeout(()=>{
            blk.style.transition = 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease';
            blk.style.transform = 'translateX(0px) rotateY(0deg) scale(1)';
            blk.style.opacity = '1';
        },delay)
    });
    const Delay=36*60+600;
    setTimeout(()=>{
        Ftxt.classList.remove('hid');
        Card.classList.remove('hid');
    },Delay+400);
}

requestAnimationFrame(aniltr);