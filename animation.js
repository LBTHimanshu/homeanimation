class ANIMATE {
    constructor() {
        this.container = document.querySelector(".image-container");
        this.wrapper = document.querySelectorAll(".image-wrapper");
        this.imageBlock = null;
        this.imageLength = 0;
        this.counter = 0;
        this.topVal = 0;
        this.init()
    }

    init() {
        this.Img = this.insertImage(LOGO);
        this.addImageToWrapper(this.Img);
        this.startCounter();
    }

    insertImage(img) {
        let imageHtml = "";
        img.forEach(element => {
            imageHtml += `<img src="${element.image}" loading="lazy" alt="${element.name}" sizes="(max-width: 479px) 13vw, (max-width: 767px) 15vw, (max-width: 991px) 16vw, 18vw" class="cust-image">`;
        });
        return imageHtml;
    }

    addImageToWrapper(img) {
        this.wrapper.forEach(block => {
            block.innerHTML = img;
        })
    }

    startCounter() {
        this.imageBlock = this.wrapper[0].querySelectorAll(".cust-image");
        setInterval(() => {
            if (this.counter == this.wrapper.length) {
                this.counter = 0;
                this.topVal -= 120;
                this.imageLength++
                console.log(this.imageLength);
                this.startAnimation(this.counter, this.topVal)
            }
            if (this.imageLength == this.imageBlock.length - 1) {
                this.counter = 0;
                this.topVal = 0;
                this.imageLength = 0;
                this.startAnimation(this.counter, this.topVal)
            }
            this.startAnimation(this.counter, this.topVal);
            this.counter++;

        }, 2000)
    }

    startAnimation(count, val) {
        let block = this.wrapper[count];
        gsap.fromTo(block, { y: val + "%" }, { y: (val - 120) + "%", duration: 2 });
    }

}

new ANIMATE;
