const likeBtn = document.getElementById('likeBtn');
const likeImg = document.getElementById('likeImg');

let liked = false

function AnimLikeImg() {
    likeImg.style.animation = 'none';

    setTimeout(() => {
        likeImg.style.animation = 'like-animation 0.6s ease';

        likeImg.addEventListener('animationend', () => {
                likeImg.src = 'https://i.ibb.co/tMtHPp3/image.png';  
            if (liked) { 
                liked = false; 
            } else {

                likeImg.src = 'https://i.ibb.co/wpqbNmx/image.png'; 
                liked = true; 
            }
        }, { once: true });
    }, 10);
}

likeBtn.addEventListener("click", AnimLikeImg);
