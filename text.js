
const faulttext={
    player:{},
    texts:[],
    init(){
        this.texts=[...document.getElementsByClassName(ctext)];
    },
    fault(){
        this.player=setInterval(()=>{
            this.texts.forEach((text)=>{
                text.style.transform=`translate(${Math.random()*60-30}%,${Math.random()*60-30}%)`;
            })
        },30)
    }
}