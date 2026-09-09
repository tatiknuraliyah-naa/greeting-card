/* =========================================================
   GREETING CARD
   JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const pages = document.querySelectorAll(".page");

const openCardButton =
    document.getElementById("openCardButton");

const makeWishButton =
    document.getElementById("makeWishButton");

const closeWishButton =
    document.getElementById("closeWishButton");

const wishPopup =
    document.getElementById("wishPopup");

const music =
    document.getElementById("birthdayMusic");

const musicButton =
    document.getElementById("musicButton");

const confettiContainer =
    document.getElementById("confettiContainer");


/* =========================================================
   STATE
========================================================= */

let currentPage = 0;

let musicPlaying = false;


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function showPage(pageIndex) {

    if (
        pageIndex < 0 ||
        pageIndex >= pages.length
    ) {
        return;
    }


    pages.forEach((page, index) => {

        page.classList.toggle(
            "active",
            index === pageIndex
        );

    });


    currentPage = pageIndex;


    /*
       Kalau halaman terakhir dibuka,
       kita tidak perlu melakukan apa-apa
       terhadap musik.
    */
}


/* =========================================================
   NEXT PAGE
========================================================= */

function nextPage() {

    if (
        currentPage <
        pages.length - 1
    ) {

        showPage(
            currentPage + 1
        );

    }

}


/* =========================================================
   PREVIOUS PAGE
========================================================= */

function previousPage() {

    if (currentPage > 0) {

        showPage(
            currentPage - 1
        );

    }

}


/* =========================================================
   OPEN CARD
========================================================= */

openCardButton.addEventListener(
    "click",
    async () => {

        /*
           Mulai musik setelah user
           melakukan interaksi.
        */

        await startMusic();


        /*
           Confetti kecil saat card dibuka.
        */

        createConfetti(22);


        /*
           Pindah dari envelope
           ke halaman birthday.
        */

        setTimeout(() => {

            showPage(1);

        }, 250);

    }
);


/* =========================================================
   ALL NEXT BUTTONS
========================================================= */

const nextButtons =
    document.querySelectorAll(
        "[data-next-page]"
    );


nextButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            nextPage();

        }
    );

});


/* =========================================================
   MUSIC
========================================================= */

async function startMusic() {

    try {

        music.volume = 0.65;

        await music.play();

        musicPlaying = true;

        updateMusicButton();

    } catch (error) {

        /*
           Browser mungkin memblokir autoplay.

           Musik akan dicoba lagi ketika
           user melakukan interaksi.
        */

        musicPlaying = false;

        updateMusicButton();

        console.log(
            "Autoplay belum diizinkan browser."
        );

    }

}


/* =========================================================
   STOP MUSIC
========================================================= */

function stopMusic() {

    music.pause();

    /*
       Balik ke awal lagu ketika
       card dibuka lagi.
    */

    music.currentTime = 0;

    musicPlaying = false;

    updateMusicButton();

}


/* =========================================================
   TOGGLE MUSIC
========================================================= */

async function toggleMusic() {

    if (music.paused) {

        try {

            await music.play();

            musicPlaying = true;

        } catch (error) {

            console.log(
                "Musik tidak dapat diputar."
            );

        }

    } else {

        music.pause();

        musicPlaying = false;

    }


    updateMusicButton();

}


/* =========================================================
   MUSIC BUTTON ICON
========================================================= */

function updateMusicButton() {

    if (music.paused) {

        musicButton.textContent = "🔇";

        musicButton.setAttribute(
            "aria-label",
            "Putar musik"
        );

    } else {

        musicButton.textContent = "🎵";

        musicButton.setAttribute(
            "aria-label",
            "Matikan musik"
        );

    }

}


/* =========================================================
   MUSIC CONTROL
========================================================= */

musicButton.addEventListener(
    "click",
    toggleMusic
);


/* =========================================================
   TRY AUTOPLAY
========================================================= */

window.addEventListener(
    "load",
    () => {

        /*
           Coba langsung memainkan musik
           saat halaman dibuka.

           Kalau browser mengizinkan,
           musik langsung berjalan.

           Kalau ditolak,
           musik akan dimulai ketika
           Open Card ditekan.
        */

        startMusic();

    }
);


/* =========================================================
   MAKE A WISH
========================================================= */

makeWishButton.addEventListener(
    "click",
    () => {

        /*
           Confetti lebih banyak
           ketika membuat wish.
        */

        createConfetti(65);


        /*
           Tampilkan popup.
        */

        openWishPopup();

    }
);


/* =========================================================
   OPEN POPUP
========================================================= */

function openWishPopup() {

    wishPopup.classList.add("show");

    wishPopup.setAttribute(
        "aria-hidden",
        "false"
    );

}


/* =========================================================
   CLOSE POPUP
========================================================= */

function closeWishPopup() {

    wishPopup.classList.remove("show");

    wishPopup.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =========================================================
   OKAY, THANK YOU
========================================================= */

closeWishButton.addEventListener(
    "click",
    () => {

        /*
           Tutup popup terlebih dahulu.
        */

        closeWishPopup();


        /*
           Musik berhenti.
        */

        stopMusic();


        /*
           Tunggu sedikit supaya
           animasi popup selesai.
        */

        setTimeout(() => {

            /*
               Kembali ke halaman pertama.
            */

            showPage(0);

        }, 300);

    }
);


/* =========================================================
   CLICK OUTSIDE POPUP
========================================================= */

wishPopup.addEventListener(
    "click",
    (event) => {

        /*
           Kalau user klik area gelap
           di luar kotak popup,
           popup ditutup.

           Musik TIDAK dihentikan.
        */

        if (
            event.target === wishPopup
        ) {

            closeWishPopup();

        }

    }
);


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            wishPopup.classList.contains("show")
        ) {

            closeWishPopup();

        }

    }
);


/* =========================================================
   CONFETTI
========================================================= */

function createConfetti(amount = 30) {

    const symbols = [
        "✦",
        "✧",
        "♡",
        "♥",
        "•"
    ];


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const confetti =
            document.createElement("div");


        confetti.className =
            "confetti";


        /*
           Random symbol.
        */

        confetti.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        /*
           Posisi horizontal.
        */

        confetti.style.left =
            Math.random() * 100 + "%";


        /*
           Ukuran.
        */

        const size =
            Math.random() * 14 + 8;

        confetti.style.fontSize =
            size + "px";


        /*
           Durasi jatuh.
        */

        const duration =
            Math.random() * 2.5 + 2.5;

        confetti.style.animationDuration =
            duration + "s";


        /*
           Delay sedikit supaya
           confetti tidak jatuh bersamaan.
        */

        const delay =
            Math.random() * 0.8;

        confetti.style.animationDelay =
            delay + "s";


        /*
           Rotasi awal.
        */

        confetti.style.transform =
            `rotate(${Math.random() * 360}deg)`;


        /*
           Tambahkan ke container.
        */

        confettiContainer.appendChild(
            confetti
        );


        /*
           Hapus setelah animasi selesai.
        */

        setTimeout(
            () => {

                confetti.remove();

            },
            (duration + delay) * 1000 + 500
        );

    }

}


/* =========================================================
   ENVELOPE KEYBOARD ACCESS
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        /*
           Enter / Space saat masih
           di halaman pertama.
        */

        if (
            currentPage === 0 &&
            (
                event.key === "Enter" ||
                event.key === " "
            )
        ) {

            event.preventDefault();

            openCardButton.click();

        }

    }
);


/* =========================================================
   INITIAL PAGE
========================================================= */

showPage(0);


/* =========================================================
   INITIAL MUSIC STATE
========================================================= */

updateMusicButton();