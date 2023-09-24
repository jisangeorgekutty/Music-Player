const music = new Audio('/audio/1.mp3');
// music.play();

const songs = [{
    id: '1',
    songName: `On my way <div class="subtitle">Alan Walker</div>`,
    image: "/images/1.jpg"
},
{
    id: '2',
    songName: `Alone<div class="subtitle">Alan Walker</div>`,
    image: "/images/2.jpg"
},
{
    id: "3",
    songName: `Blinding Ligths<div class="subtitle">The Weekend</div>`,
    image: "/images/3.jpg",
}
    // {
    //     id: "4",
    //     songName: `Hukum<div class="subtitle">Anirudh</div>`,
    //     image: "img/4.jpg",
    // },
    // {
    //     id: "5",
    //     songName: `What makes you beautiful<div class="subtitle">One Direction</div>`,
    //     image: "img/1.jpg",
    // },
    // {
    //     id: "6",
    //     songName: `After Hours<div class="subtitle">The Weekend</div>`,
    //     image: "img/2.jpg",
    // },
    // {
    //     id: "7",
    //     songName: `<h5>Chekuthan<div class="subtitle">Ribin Richard</div>`,
    //     image: "img/3.jpg",
    // }
]

let search_results = document.getElementsByClassName('search-results')[0];

songs.forEach(element => {
    const { id, songName, image } = element;
    console.log(id)
    let card = document.createElement('a');
    card.classList.add('card');
    card.href = "#" + id;

    card.innerHTML = `<div class="img"><img src="${image}" alt=""></div>
    <div class="content">
        ${songName}
    </div>
    `;
    search_results.appendChild(card)
});

let input = document.getElementsByTagName('input')[0];

input.addEventListener('keyup', () => {
    let input_value = input.value.toUpperCase();
    let items = search_results.getElementsByTagName('a');
    for (let index = 0; index < items.length; index++) {
        let whole_text = items[index].getElementsByClassName('content')[0];
        let text_value = whole_text.textContent || whole_text.innerHTML;

        if (text_value.toUpperCase().indexOf(input_value) > -1) {
            items[index].style.display = 'flex';
        } else {
            items[index].style.display = "none";
        }

        if (input.value == 0) {
            search_results.style.display = "none";
        } else {
            search_results.style.display = "";
        }

    }
});



// function playClick() {
//     $.ajax({
//         url: '/play-song',
//         method: 'get',
//         success: (response) => {
//             if (response.codStatus) {
//                 location.href = '/play-click';

//             }
//         }
//     })
// }

Array.from(document.getElementsByClassName('songItem')).forEach((e, i) => {
    e.getElementsByTagName('img')[0].src = songs[i].image;
    e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;

});


const makePlays = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((el) => {
        el.classList.add('bi-play-circle-fill')
        el.classList.remove('bi-pause-circle-fill')
    })

}

let masterPlay = document.getElementById('music-play');
let wave = document.getElementById('wave');

masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        wave.classList.add('active1');
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
    } else {
        music.pause();
        wave.classList.remove('active1');
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
    }
});

let index = 0;
let title = document.getElementById('play-title');
let playImage = document.getElementById('play-img');
Array.from(document.getElementsByClassName('playListPlay')).forEach((e) => {
    e.addEventListener('click', (el) => {
        index = el.target.id;
        music.src = `/audio/${index}.mp3`;
        playImage.src = `/images/${index}.jpg`;
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');

        let songTitle = songs.filter((els) => {
            return els.id == index;
        });
        songTitle.forEach(elss => {
            let { songName } = elss;
            title.innerHTML = songName;
        })

        makePlays();
        el.target.classList.add('bi-pause-circle-fill');
        el.target.classList.remove('bi-play-circle-fill');
        wave.classList.add('active1');
    })
})

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');

let seek = document.getElementById('seek');
let playBar2 = document.getElementById('play-bar2');
let playDot = document.getElementById('play-dot');

music.addEventListener('timeupdate', () => {
    let musicCurrent = music.currentTime;
    let musicDuration = music.duration;

    let endMinute = Math.floor(musicDuration / 60);
    let endSecond = Math.floor(musicDuration % 60);
    if (endSecond < 10) {
        endSecond = `0${endSecond}`
    }
    currentEnd.innerText = `${endMinute}:${endSecond}`;


    let startMinute = Math.floor(musicCurrent / 60);
    let startSecond = Math.floor(musicCurrent % 60);
    if (startSecond < 10) {
        startSecond = `0${startSecond}`
    }
    currentStart.innerText = `${startMinute}:${startSecond}`;


    let progressBar = parseInt((musicCurrent / musicDuration) * 100);
    seek.value = progressBar;
    // console.log(seek.value)
    let seekBar = seek.value;

    playBar2.style.width = `${seekBar}%`;
    playDot.style.left = `${seekBar}%`
})

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration / 100;
})


let back = document.getElementById('back');
let next = document.getElementById('next');


back.addEventListener('click', () => {
    index--;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItems')).length;
    }
    music.src = `/audio/${index}.mp3`;
    playImage.src = `/images/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

    let songTitle = songs.filter((els) => {
        return els.id == index;
    });
    songTitle.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
    })

    makePlays();
    el.target.classList.add('bi-pause-circle-fill');
    el.target.classList.remove('bi-play-circle-fill');
    wave.classList.add('active1');

})

next.addEventListener('click', () => {
    index++;
    if (index > Array.from(document.getElementsByClassName('songItems')).length) {
        index = 1;
    }
    music.src = `/audio/${index}.mp3`;
    playImage.src = `/images/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

    let songTitle = songs.filter((els) => {
        return els.id == index;
    });
    songTitle.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
    })

    makePlays();
    el.target.classList.add('bi-pause-circle-fill');
    el.target.classList.remove('bi-play-circle-fill');
    wave.classList.add('active1');
})

music.addEventListener('ended', () => {
    if (index == songs.length) {
        index = 1;
    } else {
        index++;
    }
    music.src = `/audio/${index}.mp3`;
    playImage.src = `/images/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    let songTitle = songs.filter((els) => {
        return els.id == index;
    });
    songTitle.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
    })

    makePlays();
    el.target.classList.add('bi-pause-circle-fill');
    el.target.classList.remove('bi-play-circle-fill');
    wave.classList.add('active1');
})

let repeat = document.getElementById('repeat');

repeat.addEventListener('click', () => {
    index;
    music.src = `/audio/${index}.mp3`;
    playImage.src = `/images/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

    let songTitle = songs.filter((els) => {
        return els.id == index;
    });
    songTitle.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
    })

    makePlays();
    el.target.classList.add('bi-pause-circle-fill');
    el.target.classList.remove('bi-play-circle-fill');
    wave.classList.add('active1');
})


