class RATING {
    constructor() {
        this.stars = document.querySelectorAll(".star-item");
        this.btn = document.querySelectorAll(".use-workflow-btn");
        this.rating = 0;
        this.init();
    }

    init() {
        this.eventListener();
        this.btnClick();
    }

    btnClick() {
        this.btn.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                let btnVal = e.currentTarget.dataset.btn;
                if (btnVal === "first") {
                    setTimeout(() => {
                        let formTop = document.getElementsByClassName("section-anim-form")[0];
                        let elDistanceToTop = window.pageYOffset + formTop.getBoundingClientRect().top;
                        window.scrollTo({
                            top: elDistanceToTop - 110,
                            behavior: 'smooth'
                        });
                    }, 500);
                }
                else if (btnVal === "second") {
                    setTimeout(() => {
                        let formTop = document.getElementsByClassName("section-anim-form-bottom")[0];
                        let elDistanceToTop = window.pageYOffset + formTop.getBoundingClientRect().top;
                        window.scrollTo({
                            top: elDistanceToTop - 110,
                            behavior: 'smooth'
                        });
                    }, 500);
                }
            })
        })
    }

    eventListener() {
        this.stars.forEach(star => {
            star.addEventListener("click", (eve) => {
                let img = eve.currentTarget.firstChild;
                let prevSibEle = star.previousElementSibling;
                let nextSibEle = star.nextElementSibling;
                if (prevSibEle) {
                    while (prevSibEle) {
                        let prevChild = prevSibEle.firstChild
                        if (!prevSibEle.firstElementChild.classList.contains("fill-star")) {
                            prevChild.classList.add("fill-star");
                            this.rating += 1;
                        }
                        prevSibEle = prevSibEle.previousElementSibling
                    }
                }
                if (nextSibEle && nextSibEle.firstElementChild.classList.contains("fill-star")) {
                    while (nextSibEle) {
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
                else {
                    this.rating -= 1;
                    img.classList.remove("fill-star");
                }
            })
        })
    }
}

new RATING;