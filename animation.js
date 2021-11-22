class AnimateBlock {
    constructor(block, duration) {
      this.block = block;
      this.aniDuration = duration;
      this.imgChildren = this.block.childNodes;
      this.childImgLength = this.imgChildren.length;
      this.topVal = this.imgChildren[0].height;
      this.movedVal = 0;
      this.currImg = 1;
      this.allMoved = false;
      this.action = "moveup";
    }
    handleAni() {
      if (this.currImg < this.childImgLength && this.action === "moveup") {
        this.currImg++;
        this.movedVal += this.topVal;
        this.positionAni();
      } else if (
        this.currImg === this.childImgLength ||
        (this.currImg < this.childImgLength && this.currImg > 0)
      ) {
          this.currImg = 1;
          this.allMoved = true;
          this.movedVal = 0;
          // this.positionAni();
          this.allMoved = true;
        }
     else {
        this.action = "moveup";
        this.currImg = 1;
        this.movedVal = 0;
        this.handleAni();
      }
    }
    positionAni() {
      // if(!this.allMoved){
        // console.log("if")
        gsap.to(this.block, {
        y: -this.movedVal,
        duration: this.aniDuration,
        ease: "Power1.easeInOut",
      })
    // }
      // else{
      //   console.log("else")
      //   // gsap.to(".image-wrapper", {
      //   //   y: 0,
      //   //   duration: 0,
      //   //   ease: "Power1.easeInOut",
      //   // })
      //   this.allMoved = true;
      // }
    }
  }
  class ANIMATE {
    constructor(companyLogos, duration = 2) {
      this.wrapper = document.querySelectorAll(".image-wrapper");
      this.randomVal = 0;
      this.duration = duration;
      this.indexOfwrapper = 0;
      // this.checkRandom = [];
      this.oddNum = [];
      this.evenNum = [];
      this.evenFirst = true;
      this.sendWrapVal = 0;
      this.companyLogos = companyLogos;
      this.init();
    }
    init() {
      this.insertImage();
      this.loopAndInit = this.loopAndInit.bind(this)
      this.onImagesLoaded(this.loopAndInit);
    }
    loopAndInit() {
      this.aniFuncs = [...this.wrapper].map(
        (ele) => new AnimateBlock(ele, this.duration)
      );
      this.startCounter();
    }
    insertImage() {
      this.wrapper.forEach((wrp) => {
        wrp.innerHTML = "";
      });
      this.companyLogos.forEach((element) => {
        let imageHtml = document.createElement("img");
        imageHtml.classList.add("cust-img");
        imageHtml.src = element.image;
        imageHtml.alt = element.name;
        this.addImageToWrapper(imageHtml, this.indexOfwrapper);
        this.indexOfwrapper++;
      });
    }
    addImageToWrapper(img, index) {
      if (index < this.wrapper.length) {
        this.wrapper[index].appendChild(img);
      } else {
        this.indexOfwrapper = 0;
        this.wrapper[this.indexOfwrapper].appendChild(img);
      }
    }
    startCounter() {
      this.storeNumbers(this.wrapper.length);
      this.timerId = setInterval(() => {
        // this.checkIfNumRep();
        this.getNumber();
        if (Array.isArray(this.aniFuncs) && this.aniFuncs[this.randomVal]) {
          if(!this.checkIfMoved()){
            console.log("first time")
            this.aniFuncs[this.randomVal].handleAni();
          } 
          else{
            if(this.checkIfAllMoved()){
              console.log("reset")
              this.restart()
            }
            else{
              this.checkAndHandleAni();
            }
          }
        }
      }, 1000);
    }
    checkAndHandleAni(){
      if(!this.checkIfMoved()){
        this.getNumber();
        this.aniFuncs[this.randomVal].handleAni();
      }
      else{
        this.randomVal % 2 == 0 ? this.evenNum.splice(this.evenNum.indexOf(this.randomVal, 1)) : this.oddNum.splice(this.oddNum.indexOf(this.randomVal, 1));
        this.checkAndHandleAni();
      }
    }
    checkIfMoved(){
      return (this.aniFuncs[this.randomVal].allMoved)
    }
    checkIfAllMoved(){
      const aniFound = this.aniFuncs.find(obj => obj.allMoved === false);
      if(aniFound) {
        return false;
      }
      return true;
    }
    stopCounter(){
      this.timerId && clearInterval(this.timerId)
    }
    getNumber() {
      if(this.evenFirst){
        if (this.sendWrapVal != this.evenNum.length) {
          this.randomVal = this.evenNum[this.sendWrapVal];
          this.sendWrapVal++;
        }
        else{
          this.sendWrapVal = 0;
          this.evenFirst = false;
          this.getNumber();
        }
      }
      else{
        if (this.sendWrapVal != this.oddNum.length) {
          this.randomVal = this.oddNum[this.sendWrapVal];
          this.sendWrapVal++;
        }
        else{
          this.sendWrapVal = 0;
          this.evenFirst = true;
          this.getNumber();
        }
      }
      if (this.oddNum.length === 0 && this.evenNum.length === 0) {
        console.log()
        this.restart();
      }
    }
    restart(){
      this.stopCounter(this.timerId);
      this.aniFuncs.forEach(obj => {
        obj.allMoved = false
      })
        gsap.to(".image-wrapper", {
          y: 0,
          duration: 0,
          ease: "Power1.easeInOut",
        })
        this.startCounter();
    }
    storeNumbers(length){
      for (let num = 0; num < length; num++) {
        if ((num % 2) != 1) {
          this.evenNum.push(num);
      }
      else {
          this.oddNum.push(num);
      }
    }
  }
    // checkIfNumRep() {
    //   this.lastCalled = this.randomVal;
    //   this.randomVal = this.setRandomVal(this.wrapper.length);
    //   if (this.lastCalled && this.randomVal === this.lastCalled) {
    //     this.checkIfNumRep();
    //   }
    // }
    setRandomVal(length) {
      let num = Math.floor(Math.random() * length);
      if (!this.checkRandom.includes(num) && this.checkRandom.length <= length) {
        this.checkRandom.push(num);
        return num;
      } else {
        this.checkRandom.length = 0;
        return this.setRandomVal(this.wrapper.length);
      }
    }
    onImagesLoaded(event) {
      var images = document.getElementsByClassName("cust-img");
      var loaded = images.length;
      for (var i = 0; i < images.length; i++) {
        if (images[i].complete) {
          loaded--;
        } else {
          images[i].addEventListener("load", function () {
            loaded--;
            if (loaded == 0) {
              event();
            }
          });
        }
        if (loaded == 0) {
          event();
        }
      }
    }
  }
    if (typeof LOGO !== "undefined") {
      new ANIMATE(LOGO, 1);
    }