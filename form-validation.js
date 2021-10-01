class FROMVALIDATION {
    constructor() {
        this.forms = document.querySelectorAll("[data-form]");
        this.name = null;
        this.email = null;
        this.number = null;
        this.message = null;
        this.button = null;
        this.init();
    }

    init() {
        this.eventListener();
    }

    eventListener() {
        this.forms.forEach(form => {
            this.nameValidator(form.elements["name"]);
            this.emailValidator(form.elements["Email"]);
            this.numberValidator(form.elements["Number"]);
            this.messageValidator(form.elements["field"]);
            form.addEventListener('submit', (evt) => {
                evt.preventDefault()
                this.button = evt.target.querySelector(".submit-button");
                if ((this.name && this.email && this.number && this.message) != null) {
                    if (!this.button.classList.contains("success")) {
                        this.button.classList.add("success");
                        this.button.value = "Message sent";
                    }
                    if (this.button.classList.contains("failed")) {
                        this.button.classList.remove("failed");
                    }
                }
                else {
                    this.button.classList.add("failed");
                    this.button.value = "Something went wrong!";
                }
            })
        })
    }

    nameValidator(name) {
        name.addEventListener("blur", (evt) => {
            let isTrue = false;
            if (name.value != "" && name.value != null && name.value.length > 3 && !name.value.match(/\d+/g)) {
                this.name = name.value;
                isTrue = true;
                evt.target.classList.add("valid");
                this.showIcon(evt, isTrue)
            }
            else {
                evt.target.classList.remove("valid");
                evt.target.classList.add("invalid");
                this.showIcon(evt, isTrue)
            }
        })
    }

    emailValidator(email) {
        email.addEventListener("blur", (evt) => {
            let isTrue = false;
            if (email.value != "" && email.value != null && email.value.length > 3 && email.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/)) {
                this.email = email.value;
                isTrue = true;
                evt.target.classList.add("valid");
                this.showIcon(evt, isTrue)

            }
            else {
                evt.target.classList.remove("valid");
                evt.target.classList.add("invalid");
                this.showIcon(evt, isTrue)
            }
        })
    }

    numberValidator(number) {
        number.addEventListener("blur", (evt) => {
            let isTrue = false;
            if (number.value != "" && number.value != null && number.value.length > 3 && number.value.match(/^\+91 +[0-9]{10}$/)) {
                this.number = number.value;
                isTrue = true;
                evt.target.classList.add("valid");
                this.showIcon(evt, isTrue)
            }
            else {
                evt.target.classList.remove("valid");
                evt.target.classList.add("invalid");
                this.showIcon(evt, isTrue)
            }
        })
    }

    messageValidator(message) {
        message.addEventListener("blur", (evt) => {
            let isTrue = false;
            if (message.value != "" && message.value != null && message.value.length > 10) {
                this.message = message.value;                
                isTrue = true;
                evt.target.classList.add("valid");
                this.showIcon(evt, isTrue)

            }
            else {
                evt.target.classList.remove("valid");
                evt.target.classList.add("invalid");
                this.showIcon(evt, isTrue)
            }
        })
    }

    showIcon(eve, isTrue) {
        let img = eve.target.parentElement.querySelectorAll("img");
        img.forEach(img => {
            if (isTrue) {
                if (img.classList.contains("correct-img") && !img.classList.contains("active")) {
                    img.classList.add("active");
                }
                if (img.classList.contains("wrong-img") && img.classList.contains("active")) {
                    img.classList.remove("active");
                }
            }
            else{
                if (img.classList.contains("correct-img") && img.classList.contains("active")) {
                    img.classList.remove("active");
                }
                if (img.classList.contains("wrong-img") && !img.classList.contains("active")) {
                    img.classList.add("active");
                }
            }
        })
    }
}

new FROMVALIDATION;