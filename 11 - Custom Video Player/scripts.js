const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
let mousedown = false;

function togglePlay(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function updateButton(){
    toggle.textContent = video.paused ? '►' : '❚ ❚';
}

function handleSkip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleKeyDown({code}){
    if(code === 'Space') togglePlay();
    if(code === 'ArrowUp'){
        ranges[0].value = parseFloat(ranges[0].value) + 0.1;
        handleRangeUpdate.call({name: 'volume', value: ranges[0].value});
    }
    if(code === 'ArrowDown'){
        ranges[0].value = parseFloat(ranges[0].value) - 0.1;
        handleRangeUpdate.call({name: 'volume', value: ranges[0].value});
    }
}

function displayProgress(){
    const progress = video.currentTime * 100 / video.duration;
    progressBar.style.flexBasis = progress + '%';
}

function handleProgressClick(e){
    video.currentTime = e.layerX * video.duration / progress.offsetWidth;
}

function handleDblClick(){
    player.classList.contains('fullscreen')
        ? player.classList.remove('fullscreen')
        : player.classList.add('fullscreen');
}


video.addEventListener('click', togglePlay);
video.addEventListener('dblclick', handleDblClick);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', displayProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', handleSkip));
skipButtons.forEach(button => button.addEventListener('click', handleSkip));
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

window.addEventListener('keydown', handleKeyDown);

progress.addEventListener('click', handleProgressClick);
progress.addEventListener('mousemove', e => mousedown && handleProgressClick(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
