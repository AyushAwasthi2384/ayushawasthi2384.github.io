console.log("welcome to Spotify clone");
// initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/DeafKev.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gifBar = document.getElementById("gifBar");
let masterSongName = document.getElementById("masterSongName");
let songBannerSongName = document.getElementById("songBannerSongName");
let songBannerImg = document.getElementById("songBannerImg");
let songItems= Array.from(document.getElementsByClassName('songItem'));

let songs=
[
    {songName : 'Kaabil Hoon', filePath: "songs/1.mp3", coverPath: "covers/DeafKev.jpg", singer: "NCS"},
    {songName : 'Bedardi Se Pyaar Ka', filePath: "songs/2.mp3", coverPath: "covers/BedardiSePyaarKa.jpg", singer: "Jubin Nautiyal"},
    {songName : 'Bewafa Tera Masoom', filePath: "songs/3.mp3", coverPath: "covers/BewafaTeraMasum.jpg", singer: "Jubin Nautiyal"},
    {songName : 'Dil Chahte Ho', filePath: "songs/4.mp3", coverPath: "covers/DilChahteHo.jpg", singer: "Jubin Nautiyal"},
    {songName : 'Dil Galti', filePath: "songs/5.mp3", coverPath: "covers/DilGalti.jpg", singer: "Jubin Nautiyal"},
    {songName : 'Kitna Chahne Lage', filePath: "songs/6.mp3", coverPath: "covers/KitnaChahneLage.jpg", singer: "Jubin Nautiyal"},
    {songName : 'Lut Gaye', filePath: "songs/7.mp3", coverPath: "covers/LutGaye.jpg", singer: "Jubin Nautiyal"},
    {songName : 'Tum Hi Aana', filePath: "songs/8.mp3", coverPath: "covers/TumHiAana.jpg", singer: "Jubin Nautiyal"},
    {songName : 'Wafa Na Raas Ayee', filePath: "songs/9.mp3", coverPath: "covers/WafaNaRaasAayee.jpg", singer: "Jubin Nautiyal"}
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    // we can chage the left half of the .container as well here (for later)
})

// audioElement.play();

// handle play pause clicks
masterPlay.addEventListener("click", ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play(); 
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gifBar.style.opacity = 1;
    }
    else{
        audioElement.pause(); 
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gifBar.style.opacity = 0;
    }
})

//listen to events
audioElement.addEventListener("timeupdate", ()=>{
    // Update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener("change", ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener("click", (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex-1].songName +" - "+(songs[songIndex-1].singer);
        songBannerSongName.innerText = songs[songIndex-1].songName;
        songBannerImg.src = songs[songIndex-1].coverPath;
        gifBar.style.opacity = 1;
        audioElement.currentTime = 0;
        audioElement.play();
    })
})

document.getElementById("next").addEventListener("click", ()=>{
    if(songIndex>=9){
        songIndex = 0;
    }

    else{
        songIndex+=1;
    }
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    gifBar.style.opacity = 1;
    audioElement.currentTime = 0;
    audioElement.play();
})
document.getElementById("previous").addEventListener("click", ()=>{
    if(songIndex<=1){
        songIndex = 9;
    }
    else{
        songIndex-=1;
    }
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    gifBar.style.opacity = 1;
    audioElement.currentTime = 0;
    audioElement.play();
})