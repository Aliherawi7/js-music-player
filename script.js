
//  music files

let musicfiles=[];
for(let x =0; x < 8; x++){
    musicfiles.push(new Audio(`music/${x+1}.mp3`));
}
let playingAudio = musicfiles[0];


const next = document.getElementById('next');
const prev = document.getElementById('prev'); 
const musicList = document.querySelector('.music-list');
const playListWidth = document.getElementsByClassName('music');
let musicItems = document.getElementsByClassName('music');

let allWidth = 0;
for(let x =0; x < playListWidth.length; x++){
    allWidth += 150;
}
let transitionWidth = 0;
next.addEventListener('click', () =>{
    if( transitionWidth +(4*150) > allWidth){
        return;
    }
    transitionWidth += 150;
    musicList.style.transform = `translateX(-${transitionWidth}px)`;
},false);

prev.addEventListener('click', () =>{
    if( transitionWidth ==0){
        return;
    }
    transitionWidth -= 150;
    musicList.style.transform = `translateX(-${transitionWidth}px)`;
},false);

// playing actions

const playbtn = document.getElementById('playbtn');
playbtn.addEventListener('click',() =>{
    if(playbtn.firstElementChild.classList.contains('bi-play-fill')){
        playbtn.firstElementChild.classList.replace('bi-play-fill','bi-pause-fill');
        playanimation();
        playingAudio.play();
        playingAudio.volume = volumeSize.value/100;
        
    }else{
        playbtn.firstElementChild.classList.replace('bi-pause-fill','bi-play-fill');
        stopAnimation();
        playingAudio.pause();
    }
    
    

})


// clock on play view
let clock  = document.querySelector('.clock-info');
(function (){
    window.setInterval(getTime,1000);
}());

function getTime(){
    let date = new Date();
    let datname;
    switch(date.getDay()){
        case 0 : datname = 'Sun';
                break;
        case 1 : datname = 'Mon';
                break;
        case 2 : datname = 'Tue';
                break;
        case 3 : datname = 'Wed';
                break;
        case 4 : datname = 'Thu';
                break;
        case 5 : datname = 'Fri';
                break;
        case 6 : datname = 'Sat';
                break;   
    }
    let dateStr = (datname) + ". "+(date.getHours())+":"+date.getMinutes() +":"+date.getSeconds();
    clock.innerHTML = dateStr;
}

initializeFirst();

// first initialize
function initializeFirst(){
    playbtn.style.backgroundImage = `url(\'image/${1}.jpg\')`;
    for(let x = 0; x < musicItems.length; x++){
        musicItems[x].style.backgroundImage = `url(\'image/${x+1}.jpg\')`;
    }
}

for(let x=0; x < musicItems.length; x++){
    musicItems[x].addEventListener('click',() => {
        playanimation();
        playbtn.click();
        playingAudio.load();
        playingAudio = musicfiles[x];
        playbtn.click();
        playingAudio.loop = true;
        playbtn.style.backgroundImage = musicItems[x].style.backgroundImage;
    });
}



// playing animation
let animate = document.querySelectorAll('.lines li');
function playanimation(){
    for(var x =0; x < animate.length; x++){
        animate[x].style.animationName = `animate2`;
    }
    
}
function stopAnimation(){
    for(var x =0; x < animate.length; x++){
        animate[x].style.animationName = `animateuyt2`;
    }
}


//  volume change
let volumeSize = document.querySelector('.sounds input');
volumeSize.addEventListener('change', volumeChange, false);


function volumeChange(){
    document.querySelector('.sounds input').addEventListener('change',function(){
        playingAudio.volume = volumeSize.value/100;
    });

}





// setting 
document.querySelector('.btnsetting').addEventListener('click',() =>{
    document.querySelector('.setting').style.transform = 'scaleX(1)';
});

document.querySelector('#back-setting').addEventListener('click',() => {
    document.querySelector('.setting').style.transform = 'scaleX(0)';
})

let selectOp = document.querySelector('select');
selectOp.addEventListener('change', () => {
    let color = (selectOp[selectOp.selectedIndex].innerHTML);
    console.log(selectOp[selectOp.selectedIndex].innerHTML);
    var el = document.querySelectorAll('i');
    for(var x = 0; x < el.length; x++){
        el[x].style.color = `${color}`;

    }
    var el = document.querySelectorAll('h4');
    for(var x = 0; x < el.length; x++){
        el[x].style.color = `${color}`;
    }
    document.querySelector('input').background =  `${color}`;

    
});