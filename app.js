const playerLivesCount = document.querySelector(".playerLivesCount");
const section = document.querySelector("section");

let playerLives = 6;

playerLivesCount.textContent = playerLives;

// Generate data
const getData = () => [
    { imgSrc: "./images/img1.jpg", id: 1, name: "img1"},
    { imgSrc: "./images/img2.jpg", id: 2, name: "img2"},
    { imgSrc: "./images/img3.jpg", id: 3, name: "img3"},
    { imgSrc: "./images/img4.jpg", id: 4, name: "img4"},
    { imgSrc: "./images/img5.jpg", id: 5, name: "img5"},
    { imgSrc: "./images/img6.jpg", id: 6, name: "img6"},
    { imgSrc: "./images/img1.jpg", id: 7, name: "img1"},
    { imgSrc: "./images/img2.jpg", id: 8, name: "img2"},
    { imgSrc: "./images/img3.jpg", id: 9, name: "img3"},
    { imgSrc: "./images/img4.jpg", id: 10, name: "img4"},
    { imgSrc: "./images/img5.jpg", id: 11, name: "img5"},
    { imgSrc: "./images/img6.jpg", id: 12, name: "img6"},
]

const randomize = () => {
    const cardData = getData();
    return cardData.sort(() => Math.random() - 0.5);
}

const cardGenerator = () => {
    const cardData = randomize();


    //Generate HTML
    cardData.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList = "card";
    
        card.setAttribute("id", item.id);
        card.setAttribute("name", item.name);
    
        const face = document.createElement("img");
        face.classList = "face";
        face.src = item.imgSrc;
    
        card.setAttribute('name', item.name)

        const back = document.createElement("div");
        back.classList = "back";
    
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        
        card.classList.add("toggleCard");
            //Randomize
            setTimeout(() => {
                card.classList.remove("toggleCard");
            }, 1000)
 

        card.addEventListener("click", (e) => {
            
            //Run our flip animation
            face.classList.toggle("toggleCard");
            card.classList.toggle("toggleCard");
            checkCards(e)
          });
    })
}

const checkCards = (e) => {
    console.log(e);
    const clickedCard = e.target;
    clickedCard.classList.add("flipped")
    const flippedCards = document.querySelectorAll(".flipped")
    console.log(flippedCards);
    //Logic
    if (flippedCards.length === 2) {
        if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
            console.log("they are the same!!")
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            });
        } else {
            console.log("wrong");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggleCard"), 1000);
            });
            playerLives --;
            playerLivesCount.textContent = playerLives;
            if (playerLives === 0) {
                restart();
            }
        }
    }

};

// Restart
const restart = () => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none";


    cardData.forEach((item, index) => {
        cards[index].classList.add("toggleCard");

        //Randomize
        setTimeout(() => {
            cards[index].style.pointerEvents = "all";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute("name", item.name);
            section.style.pointerEvents = "all";
            cards[index].classList.remove("toggleCard");
        }, 1000)
    });

            
    playerLives = 6;
    playerLivesCount.textContent = playerLives;
}

cardGenerator()
