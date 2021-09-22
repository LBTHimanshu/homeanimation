class WORKFLOW {
    constructor() {
        // this.container = document.getElementsByClassName("right-bottom-block")[0];
        this.wrapper = document.getElementsByClassName("right-workflow-container")[0];
        this.line = document.getElementsByClassName("horizontal-line")[0];
        this.catBlock = document.querySelectorAll(".categories-block.flexbox");
        this.catwrapper = document.querySelectorAll(".left-cat-container")[0];
        this.headHtml;
        this.cardHtml;
        this.cardContainer;
        this.appData = {
            categoryData: window.categoryData,
            cardData: window.cardData,
        };
        this.init();
    }

    init() {
        this.wrapper.innerHTML = ""
        this.renderFiltered();
        this.listenToEvent();
    }

    // 
    renderFiltered() {
        this.appData.categoryData.forEach((category) => {
            const cardsHtml = this.loadCards(this.appData.cardData, category.categorySlug)
            const headHtml = this.loadHead(category);
            const cardContainerHtml = this.loadCardContainer(cardsHtml);
            this.loadWrapper(headHtml, cardContainerHtml);
        })


    }

    // function to listen to events.
    listenToEvent() {
        this.catwrapper.addEventListener("click", (e) => {
            if (e.target.dataset.active != "false") {

                this.catBlock.forEach(cat => {
                    if (cat.classList.contains("active-left-border")) {
                        cat.classList.remove("active-left-border");
                    }
                })
                let box = e.target.closest(".flexbox");
                if (!box) {
                    return
                }
                box.classList.add("active-left-border")
            }
        })
    }
    // function to load heading of the card container.
    loadHead(category) {
            return `<div class ="right-top-block"><h2 class="workflow-heading">${category.categoryTitle}</h2><p class="para-16">${category.categoryDesc}</p></div>`;
    }

    // function to load cards.
    loadCards(data, categoryName) {
        const CARDHTML = data.filter((card) => card.showOn === categoryName).map((card) => {
            return `<div role="listitem" class="workflow-card">
        <img src=${card.cardImgSrc} loading="lazy" alt="" class="workflow-card-img">
        <p class="para-16 workflow-card-head">${card.cardName}</p>
        <p class="para-16 workflow-card-para">${card.cardDetails}</p>
        <a href="#" class="know-more-link card-link">KNOW MORE</a>
        </div>`.toString().split(',').join('');
        });
        return CARDHTML;
    }

    // function to add cards and heading into the container.
    loadCardContainer(cards) {
        let container = document.createElement('div');
        container.className = "right-bottom-block";
        cards.forEach(card => {
            container.innerHTML += card;
        });
        return container;
    }

    // function to add card container and head container into a wrapper:
    loadWrapper(headHtml, cardContainer) {
        this.wrapper.innerHTML += headHtml;
        this.wrapper.appendChild(cardContainer)
        this.wrapper.appendChild(this.line)
    }

}

new WORKFLOW;