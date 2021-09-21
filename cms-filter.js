class WORKFLOW {
    constructor() {
        this.container = document.getElementsByClassName("right-bottom-block")[0];
        this.wrapper = document.getElementsByClassName("right-workflow-container")[0];
        this.line = document.getElementsByClassName("horizontal-line")[0];
        this.headHtml;
        this.cardHtml;
        this.cardContainer;
        this.init();
    }

    init() {
        this.headHtml = this.loadHead(categoryData);
        this.cardHtml = this.loadCards(cardData);
        this.cardContainer = this.loadCardContainer(this.cardHtml);
        this.loadWrapper(this.headHtml, this.cardContainer);
    }

    // function to load heading of the card container.
    loadHead(data) {
        const HEADHTML = data.map((category) => {
            return `<div class="right-top-block"><h2 class="workflow-heading">${category.categoryTitle}</h2><p class="para-16">${category.categoryDesc}</p></div>`.toString().split(',').join('');
        });
        return HEADHTML;
    }

    // function to load cards.
    loadCards(data) {
        const CARDHTML = data.map((card) => {
            return `<div role="listitem" class="workflow-card w-dyn-item">
        <img src=${card.cardImgSrc} loading="lazy" alt="" class="workflow-card-img">
        <p class="para-16 workflow-card-head">${card.cardName}</p>
        <p class="para-16 workflow-card-para">${card.cardDetails}</p>
        </div>`.toString().split(',').join('');
        });
        return CARDHTML;
    }

    // function to add cards and heading into the container.
    loadCardContainer(cards) {
        this.container.innerHTML = "";
        cards.forEach(card => {
            this.container.innerHTML += card;
        });
        return this.container;
    }

    // function to add card container and head container into a wrapper:
    loadWrapper(headHtml, cardContainer) {
        this.wrapper.innerHTML = "";
        headHtml.forEach(head => {
            this.wrapper.innerHTML += head;
            this.wrapper.appendChild(cardContainer)
            this.wrapper.appendChild(this.line)
        })
    }

}

new WORKFLOW;