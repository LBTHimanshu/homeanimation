class ANIMATE {
    constructor() {
        this.container = document.querySelector(".image-container");
        this.wrapper = document.querySelectorAll(".image-wrapper");
        this.imageBlock = null;
        this.imageLength = 1;
        this.counter = 0;
        this.topVal = this.wrapper[0].querySelector(".cust-image").height;
        this.randomVal = 0;
        this.timeline;
        this.duration = 0.7;
        this.indexOfwrapper = 0;
        this.checkRandom;
        this.init();
    }
    init() {
        this.insertImage();
        this.startCounter();
    }
    insertImage() {
        this.wrapper.forEach(wrp => {
            wrp.innerHTML = "";
        })

        LOGO.forEach((element) => {
            let imageHtml = document.createElement("img");
            imageHtml.classList.add("cust-image");
            imageHtml.src = element.image;
            imageHtml.alt = element.name;
            this.addImageToWrapper(imageHtml, this.indexOfwrapper);
            this.indexOfwrapper++;
        });
    }
    addImageToWrapper(img, index) {
        if (index < this.wrapper.length) {
            this.wrapper[index].appendChild(img);
        }
        else {
            this.indexOfwrapper = 0;
            this.wrapper[this.indexOfwrapper].appendChild(img);
        }
    }
    startCounter() {
        const heightToAdd = this.topVal;
        this.imageBlock = this.wrapper[0].querySelectorAll(".cust-image");
        setInterval(() => {
            if (this.counter > this.wrapper.length) {
                this.counter = 0;
                this.imageLength++;
                this.topVal = heightToAdd * this.imageLength;
                this.duration = 0.7;
            }
            if (this.imageLength >= this.imageBlock.length) {
                this.counter = 0;
                this.topVal = 0;
                this.imageLength = 0;
                this.duration = 0;
                console.log("image reset")
            }
            this.randomVal = this.setRandomVal(this.wrapper.length);
            this.startAnimation(this.randomVal, this.topVal, this.duration);
            this.counter++;
        }, 700);
    }
    setRandomVal(length) {
        let num = Math.floor(Math.random() * length);
        if (num != this.checkRandom) {
            this.checkRandom = num;
            return num;
        }
        else{
            return this.setRandomVal(this.wrapper.length);
        }
    }
    startAnimation(count, val, dur) {
        let block = this.wrapper[count];
        this.timeline = gsap.timeline();
        if (block.childElementCount > 1) {
            this.timeline.to(block, { y: -val, duration: dur });
        }
    }
}
new ANIMATE();