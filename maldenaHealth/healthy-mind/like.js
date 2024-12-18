const likeBtn = document.getElementById('likeBtn');
const likeImg = document.getElementById('likeImg');

let liked = false

function AnimLikeImg() {
    likeImg.style.animation = 'none';

    setTimeout(() => {
        likeImg.style.animation = 'like-animation 0.6s ease';

     likeImg.src = 'https://i.ibb.co/wpqbNmx/image.png'; 
 
            if (liked) { 
                likeImg.src = 'https://i.ibb.co/tMtHPp3/image.png';  
                liked = false; 
            } else {

                
                liked = true; 
            }
        }, { once: true });
    }, 10);
}

likeBtn.addEventListener("click", AnimLikeImg);
