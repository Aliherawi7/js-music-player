// general button
const playbtn = document.getElementById('playbtn');
const currentTimeSlider = document.getElementById('current_time_slider');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const musicList = document.querySelector('.music-list');
const innerMusicList = document.querySelector('.inner-list');
const playListWidth = document.getElementsByClassName('music');
let musicItems = document.getElementsByClassName('music');
const totalTime = document.getElementById('total_time');
const currentTime = document.getElementById('current_time');




//  music files

let musicfiles = [];
for (let x = 0; x < 8; x++) {
    musicfiles.push(new Audio(`music/${x + 1}.mp3`));
}
let playingAudio = musicfiles[0];


//  <div class="music" id="music1">
// <h4>Music 1</h4>
// <div class="add-to-fav">
//     <i class="bi bi-heart"></i>
// </div>
// </div>


const initializeMusicList = (size) => {
    let musicListMain = document.getElementById("music_list");
    // console.log(musicFiles.size)
    for (let i = 0; i < size; i++) {
        let div = document.createElement("div")
        div.classList.add("music")
        div.id = "music_" + (i + 1)

        let h4 = document.createElement("h4")
        h4.textContent = "Music " + (i + 1);

        let nestedDiv = document.createElement("div")
        nestedDiv.classList.add("add-to-fav")
        let icon = document.createElement("i")
        icon.classList.add("bi", "bi-heart")

        icon.setAttribute("data", (i))

        nestedDiv.appendChild(icon);

        div.appendChild(h4)
        div.appendChild(nestedDiv)

        musicListMain.appendChild(div)
    }
    for (let x = 0; x < musicItems.length; x++) {
        musicItems[x].addEventListener('click', () => {
            playanimation();
            playbtn.click();
            playingAudio.load();
            playingAudio = musicfiles[x];
            playbtn.click();
            playingAudio.loop = true;
            playbtn.style.backgroundImage = musicItems[x].style.backgroundImage;
        });
    }

    initializeBackgroundFirst();
}


// first initialize
function initializeBackgroundFirst() {
    playbtn.style.backgroundImage = `url(\'image/${1}.jpg\')`;
    for (let x = 0; x < musicItems.length; x++) {
        musicItems[x].style.backgroundImage = `url(\'image/${x + 1}.jpg\')`;
    }
}



// initilize the music list
initializeMusicList(musicfiles.length);






// music list slider 

let transitionWidth = 0;
next.addEventListener('click', () => {
    innerMusicList.scrollLeft += 160
    console.log(innerMusicList.scrollLeft)
}, false);

prev.addEventListener('click', () => {
    innerMusicList.scrollLeft -= 160
}, false);

// playing actions
const play = (second) => {
    if (playbtn.firstElementChild.classList.contains('bi-play-fill')) {
        playbtn.firstElementChild.classList.replace('bi-play-fill', 'bi-pause-fill');
        playanimation();
        playingAudio.currentTime = second;
        playingAudio.play();
        playingAudio.volume = volumeSize.value / 100;
        console.log(playingAudio.currentTime)
        console.log(playingAudio.duration)
        totalTime.textContent = convertSecondsToMinutes(playingAudio.duration)
        setInterval(() => {
            const value = getPrecent(playingAudio.currentTime, playingAudio.duration)
            currentTimeSlider.value = value;
            currentTime.textContent = convertSecondsToMinutes(playingAudio.currentTime)
        }, 500)


    } else {
        playbtn.firstElementChild.classList.replace('bi-pause-fill', 'bi-play-fill');
        stopAnimation();
        playingAudio.pause();
    }
}


playbtn.addEventListener('click', () => play(0))

// play the specific time
currentTimeSlider.onchange = (e) => {
    const precent = e.target.value;
    playingAudio.currentTime = precent;
    console.log(playingAudio.currentTime)
}

/********************************* time util functions **************************/

// calculate the time and get the precent
function getPrecent(currentSecond, seconds) {
    return (100 * currentSecond) / seconds
}

// calculate the time and get the precent
function getSecond(precent, seconds) {
    return (precent * seconds) / 100
}

// convert second to minutes

function convertSecondsToMinutes(seconds) {
    const minutes = Number.parseInt(seconds / 60);
    const remainedSeconds = Number.parseInt(seconds % 60);
    return `${minutes}:${remainedSeconds}`
}


// clock on play view
let clock = document.querySelector('.clock-info');
(function () {
    window.setInterval(getTime, 1000);
}());

function getTime() {
    let date = new Date();
    let datname;
    switch (date.getDay()) {
        case 0: datname = 'Sun';
            break;
        case 1: datname = 'Mon';
            break;
        case 2: datname = 'Tue';
            break;
        case 3: datname = 'Wed';
            break;
        case 4: datname = 'Thu';
            break;
        case 5: datname = 'Fri';
            break;
        case 6: datname = 'Sat';
            break;
    }
    let dateStr = (datname) + ". " + (date.getHours()) + ":" + date.getMinutes() + ":" + date.getSeconds();
    clock.innerHTML = dateStr;
}



// playing animation
let animate = document.querySelectorAll('.lines li');
function playanimation() {
    animate.forEach((value) => {
        value.style.animationName = `animate2`;
    })

}
function stopAnimation() {
    animate.forEach((value) => {
        value.style.animationName = `animateuyt2`;
    })
}


//  volume change
let volumeSize = document.querySelector('.sounds input');
volumeSize.addEventListener('change', volumeChange, false);

console.dir(document.querySelector('.sounds input'))
function volumeChange() {
    document.querySelector('.sounds input').addEventListener('pointermove', function () {
        playingAudio.volume = volumeSize.value / 100;
    });

}





// setting 
document.querySelector('.btnsetting').addEventListener('click', () => {
    document.querySelector('.setting').style.transform = 'scaleX(1)';
});

document.querySelector('#back-setting').addEventListener('click', () => {
    document.querySelector('.setting').style.transform = 'scaleX(0)';
})

let selectOp = document.querySelector('select');
selectOp.addEventListener('change', () => {
    let color = (selectOp[selectOp.selectedIndex].innerHTML);
    document.body.style.color = color;


    //  document.querySelector('input').background =  `${color}`;


});

// playelist button
let playListBtn = document.getElementById("play_list");
playListBtn.addEventListener('click', () => {
    playListBtn.classList.toggle("btn-active")

})




let fovriteMusic = new Set();

// add to favorite list
let favIcons = document.querySelectorAll(".add-to-fav i");
favIcons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
        e.stopPropagation()
        icon.classList.toggle("bi-heart");
        icon.classList.toggle("bi-heart-fill");
        const index = icon.getAttribute("data");

        fovriteMusic.add(musicfiles[index])
        console.log(fovriteMusic)
        // adding music to favorite list

    })
})

// fovrite list music show up

let fovriteButton = document.getElementById("fovrite_button");

fovriteButton.onclick = () => {
    clearList();
    console.log(fovriteMusic)
    initializeMusicList(fovriteMusic.size);
}


// list music show up


let playListButton = document.getElementById("play_list");

playListButton.onclick = () => {
    clearList();
    initializeMusicList(musicfiles.length);
}





// make the list empty

function clearList() {
    let innerList = document.getElementsByClassName("inner-list")[0];
    let musicList = document.getElementById("music_list");
    if (musicList) {
        innerList.removeChild(musicList);
        musicList = document.createElement("div")
        musicList.id = "music_list";
        musicList.classList.add("music-list")
        innerList.appendChild(musicList);
    }


}














