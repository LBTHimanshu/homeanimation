class ANIMATE {
    constructor() {
        this.container = document.querySelector(".image-container");
        this.wrapper = document.querySelectorAll(".image-wrapper");
        this.imageBlock = null;
        this.imageLength = 1;
        this.counter = 0;
        this.topVal = 4.8;
        this.Img = [];
        this.randomVal = 0;
        this.timeline;
        this.duration = 0.5;
        this.init()
    }

    init() {
        this.addImageToWrapper();
        this.startCounter();
    }

    insertImage() {
        let imageHtml = "";
        let imgArr = gsap.utils.shuffle(LOGO); 
        imgArr.forEach(element => {
            imageHtml += `<img src="${element.image}" loading="lazy" alt="${element.name}" sizes="(max-width: 479px) 13vw, (max-width: 767px) 15vw, (max-width: 991px) 16vw, 18vw" class="cust-image">`;
        });
        return imageHtml;
    }
    addImageToWrapper() {
        this.wrapper.forEach((block) => {
            this.Img = this.insertImage()
            block.innerHTML = this.Img;
        })
    }

    startCounter() {
        this.imageBlock = this.wrapper[0].querySelectorAll(".cust-image");
        setInterval(() => {
            if (this.counter > this.wrapper.length) {
                this.counter = 0;
                this.imageLength++;
                this.topVal = 4.8 * this.imageLength;
                this.duration = 0.5;
            }
            if (this.imageLength >= this.imageBlock.length) {
                this.counter = 0;
                this.topVal = 0;
                this.imageLength = 0;
                this.duration = 0;
            }
            this.randomVal = this.setRandomVal(this.imageBlock.length);
            this.startAnimation(this.randomVal, this.topVal, this.duration);
            this.counter++;
        },500);
    }

    setRandomVal(length){
        return(Math.floor((Math.random() * length) + 0));
    }

    startAnimation(count, val, dur) {
        let block = this.wrapper[count];
        this.timeline = gsap.timeline()
        this.timeline.to(block, { y: -(val) + "em", duration: dur});
    }

}

new ANIMATE;


// function scrollList(id) {
//     let el = document.querySelector(`[data-id=${id}]`);
//     el.scrollIntoView({ behavior: 'smooth',
//     block: 'nearest',
//     inline: 'start' });
//   }