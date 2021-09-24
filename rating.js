class RATING{
    constructor() {
        this.stars = document.querySelectorAll(".star-item");
        this.rating = 0;
        this.init();
    }
    
    init() {
        this.eventListener();
    }
    
    eventListener() {
        this.stars.forEach(star => {
            star.addEventListener("click" , (eve) => {
                let img = eve.currentTarget.firstChild;
                let prevSibEle = star.previousElementSibling;
                let nextSibEle = star.nextElementSibling;
                if (prevSibEle) {
                    while(prevSibEle){
                        let prevChild = prevSibEle.firstChild
                        if (!prevSibEle.firstElementChild.classList.contains("fill-star")) {
                            prevChild.classList.add("fill-star"); 
                            this.rating += 1;
                        }
                        prevSibEle = prevSibEle.previousElementSibling
                    }
                }
                if (nextSibEle && nextSibEle.firstElementChild.classList.contains("fill-star")) {
                    while(nextSibEle){
                        let nextChild = nextSibEle.firstChild
                        if (nextSibEle.firstElementChild.classList.contains("fill-star")) {
                            nextChild.classList.remove("fill-star");
                            this.rating -= 1;
                        }
                        nextSibEle = nextSibEle.nextElementSibling;
                    }
                }
                
                if (!img.classList.contains("fill-star")) {
                    img.classList.add("fill-star");
                    this.rating += 1;
                }
                else{
                    this.rating -= 1;
                    img.classList.remove("fill-star");
                }
            })
        })
    }
}

new RATING;