class ANIMATE {
    constructor() {
        this.container = document.querySelector(".image-container");
        this.wrapper = document.querySelectorAll(".image-wrapper");
        this.imageBlock = null;
        this.imageLength = 0;
        this.counter = 0;
        this.topVal = 0;
        this.Img = [];
        this.init()
    }

    init() {
        // this.Img = this.insertImage();
        this.addImageToWrapper();
        this.startCounter();
    }

    insertImage() {
        let imageHtml = "";
        let ImgArr = gsap.utils.shuffle(LOGO);
        ImgArr.forEach(element => {
            imageHtml += `<img src="${element.image}" loading="lazy" alt="${element.name}" sizes="(max-width: 479px) 13vw, (max-width: 767px) 15vw, (max-width: 991px) 16vw, 18vw" class="cust-image">`;
        });
        return imageHtml;
    }
    // insertImage(img) {
    //     const imageHtml = img.map(element => {
    //         let imgHtml = document.createElement("img");
    //         imgHtml.classList.add("cust-image");
    //         imgHtml.src = element.image;
    //         imgHtml.alt = element.name;
    //         return imgHtml;
    //     });
    //     return imageHtml;
    // }

    // addImageToWrapper(img) {
    //     let imgArr;
    //     for (let i = 0; i < this.wrapper.length; i++) {
    //         imgArr = gsap.utils.shuffle(img);
    //         this.wrapper[i].appendChild(imgArr[i]);
            
    //     }
    // }
    addImageToWrapper() {
        this.wrapper.forEach((block) => {
            this.Img = this.insertImage()
            block.innerHTML = this.Img;
        })
    }

    startCounter() {
        this.imageBlock = this.wrapper[0].querySelectorAll(".cust-image");
        setInterval(() => {
            if (this.counter == this.wrapper.length) {
                this.counter = 0;
                this.topVal -= 120;
                this.imageLength++
                this.startAnimation(this.counter, this.topVal)
            }
            if (this.imageLength == this.imageBlock.length) {
                this.counter = 0;
                this.topVal = 120;
                this.imageLength = 0;
                this.startAnimation(this.counter, this.topVal)
            }
                this.startAnimation(this.counter, this.topVal);
                this.counter++;
        }, 2000)
    }

    startAnimation(count, val) {
        let block = this.wrapper[count];
        let timeline = gsap.timeline()
        if (this.imageLength != 0) {
            timeline.to(block, { y: (val - 120) + "%", duration: 1 });
        }
        timeline.restart();

    }

}

new ANIMATE;
