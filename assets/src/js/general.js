jQuery(function($) {
    
    $(document).ready(function() {

        $('.js-page-nav li a').click(function (e) {
            e.preventDefault();
            let index = $(this).attr('data-page-nav-index');
    
            // Check if the preference to not show popup is set in localStorage
            if (localStorage.getItem('noShowPopup') === 'true') {
                return; // Exit the function if the preference is set
            }
    
            // Remove --active class from all popups
            $('.js-page-nav-inner').removeClass('--active');
    
            // Now add --active class only to the clicked popup
            $('.js-page-nav-popup').addClass('--active');
            $('.js-page-nav-popup .js-page-nav-inner[data-page-nav-index="' + index + '"]').addClass('--active');
        });
    
        // Handler for closing the popup normally
        $('.js-page-nav-popup .js-close').click(function (){
            $('.js-page-nav-popup, .js-page-nav-inner').removeClass('--active');
        });
    
        // Handler for the hard close button
        $('.js-page-nav-popup .js-close-hard').click(function (){
            $('.js-page-nav-popup, .js-page-nav-inner').removeClass('--active');
            localStorage.setItem('noShowPopup', 'true'); // Save preference in localStorage
        });
    
        $('.js-page-nav li a').click(function (e) {
            e.preventDefault();
            let index = $(this).attr('data-page-nav-index');
            if(!localStorage.getItem('noShowPopup')){
                $('.js-page-nav-inner').removeClass('--active');
                $('.js-page-nav-popup').addClass('--active');
                $('.js-page-nav-popup .js-page-nav-inner[data-page-nav-index="' + index + '"]').addClass('--active');
            }else{
                window.location = this.href
            }
        });
        
        $('.js-page-nav-popup .js-close').click(function (){
            $('.js-page-nav-popup, .js-page-nav-inner').removeClass('--active');
        });


        $('.js-nav-open').click(function() {
            $(this).toggleClass('active');
            $('.js-header-nav').toggleClass('active');
        });

        $('.js-principles-popup-opener').click(function() {
            let index = $(this).attr('data-index');
            $('.js-principles-popup').addClass('--active');
            $('.js-principles-popup-nav button, .js-principles-popup-container').removeClass('--active');
            $('.js-principles-popup-nav button[data-index="' + index + '"]').addClass('--active');
            $('.js-principles-popup-container[data-index="' + index + '"]').addClass('--active');
        });

        $('.js-principles-popup-nav button').click(function() {
            let index = $(this).attr('data-index');
            $('.js-principles-popup-nav button, .js-principles-popup-container').removeClass('--active');
            $('.js-principles-popup-nav button[data-index="' + index + '"]').addClass('--active');
            $('.js-principles-popup-container[data-index="' + index + '"]').addClass('--active');
        });

        $('.js-principles-popup-close').click(function() {
            $('.js-principles-popup').removeClass('--active');
        });



    });
});

const sliderImages = new Swiper('.slider__images .swiper-container', { // ищем слайдер превью по селектору
    // задаем параметры
    direction: 'vertical', // вертикальная прокрутка
    slidesPerView: 1, // показывать по 1 изображению
    spaceBetween: 0, // расстояние между слайдами
    grabCursor: true, // менять иконку курсора
    breakpoints: { // условия для разных размеров окна браузера
        0: { // при 0px и выше
            direction: 'horizontal', // горизонтальная прокрутка
        },
        768: { // при 768px и выше
            direction: 'vertical', // вертикальная прокрутка
        }
    },
    mousewheel: {
        releaseOnEdges: true // change this to 'true' to enable default scrolling when edge is reached
    },
    on: {
        reachEnd: function() {
            document.body.style.overflowY = 'auto'; 
            document.body.style.overflowX = 'hidden';
        },
        reachBeginning: function() {
            document.body.style.overflowY = 'auto'; 
            document.body.style.overflowX = 'hidden';
        },
    }
});

// Function to handle mouse wheel event
function handleMouseWheel(e) {
    const swiper = sliderImages;

    // Determine the direction of the scroll
    const isScrollingUp = e.originalEvent.deltaY < 0;
    console.log(isScrollingUp)
    // Prevent window scroll if Swiper can still scroll
    if ((isScrollingUp && !swiper.isBeginning) || (!isScrollingUp && !swiper.isEnd)) {
        e.preventDefault();
    }
}

// Attach the mouse wheel event listener to the Swiper container
$(document).on('wheel', '.slider__images .swiper-container', handleMouseWheel);


const subtitlesElement = document.getElementById("subtitles");
const playButton = $('.academy-audio__player-button');


const subtitles = [{
        text: "Рождаясь, каждый из нас обладает уникальным потенциалом и мощнейшим запасом здоровья.",
        time: 6
    },
    {
        text: "В твоём распоряжении совершенный биологический механизм, который выковывался миллионами лет эволюции.",
        time: 6
    },
    {
        text: `Его сердце бьётся с первой секунды,
        Лёгкие раскачивают воздух, словно кузнечные меха, `,
        time: 7
    },
    {
        text: `Мозг ежесекундно генерирует электрический заряд,
        А мышцы сокращаются волей разума.`,
        time: 6
    },
    {
        text: "Все твоё тело — это единая, цельная живая материя.",
        time: 6
    },
    {
        text: `Изучи его законы, оберегай его, управляй им —
        И ты получишь инструмент, которому нет равных.`,
        time: 6
    },
    // добавьте другие реплики и их тайминги здесь
];

let currentReplicaIndex = 0;
let currentWordIndex = 0;
let isPaused = true;

async function subtitlesBegin() {
    while (currentReplicaIndex < subtitles.length && !isPaused) {
        const {
            text,
            time
        } = subtitles[currentReplicaIndex];
        const html = text
            .split(" ")
            .map((word) => `<span class="subtitle-word">${word}</span>`)
            .join(" ");
        subtitlesElement.innerHTML = html;
        const wordElements = document.querySelectorAll(".subtitle-word");
        for (let i = 0; i < currentWordIndex; i++) {
            wordElements[i].classList.add("active");
        }
        const delayBetweenWords = time / wordElements.length;
        while (currentWordIndex < wordElements.length && !isPaused) {
            wordElements[currentWordIndex].classList.add("active");
            await sleep(delayBetweenWords * 1000);
            currentWordIndex++;
        }
        if (!isPaused) {
            currentReplicaIndex++;
            currentWordIndex = 0;
        }
    }
}

async function sleep(timeout) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}


subtitlesElement.innerHTML = subtitles[0].text
    .split(" ")
    .map((word) => `<span class="subtitle-word">${word}</span>`)
    .join(" ");

const audioContainer = document.getElementById("myAudio");
playButton.on("click", () => {
    isPaused = !isPaused;
    console.log('clock',isPaused);
    if (!isPaused) {
        playButton.addClass('playing');
        audioContainer.play()
        setTimeout(()=>{
            subtitlesBegin();
        },3000)
    } else{
        playButton.removeClass('playing');
        audioContainer.pause()
    }
    console.log(isPaused ? "UNPAUSED" : "PAUSED");
});



$(document).ready(function() {
    $('#toggle-principles').click(function() {
        $('.academy-principles__row:nth-child(2)').toggle();
    });
});