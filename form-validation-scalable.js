class FROMVALIDATION {
    constructor(form) {
        this.form = form;
        this.elements = this.form.querySelectorAll("[custom-validate='true']");
        this.button =this.form.querySelector(".submit-button");
        this.errorMessageObj = {

        }
        this.init();
    }

    init() {
        this.elementToValidate();
        this.formSubmitEvent(this.form);
    }

    // function send elements to validate.
    elementToValidate() {
        this.elements.forEach(element => {
            this.setUniqueAttribute(element);
            this.addEventListener(element);
        })


    }

    // function to set unique attributes into the form elements.
    setUniqueAttribute(element) {
        element.setAttribute("identifier", Math.floor(1 + (20 - 1) * Math.random()));
        return element;
    }

    // fuction to add eventlistener.
    addEventListener(element) {
        element.addEventListener("input", (evt) => {
            this.handleValidation(element);
            // reset the autofill style.
            let autoFillData = evt.currentTarget.value;
            setTimeout(() => {
                let style = window.getComputedStyle(evt.target, null).getPropertyValue('appearance')
                if (style == "menulist-button") {
                    evt.target.value = autoFillData
                }
            }, 300)
        });
    }

    // function to handle validation.
    handleValidation(element) {
        const inpType = element.dataset;
        const validator = element.getAttribute("validateby");
        const required = element.getAttribute("isrequired");
        const value = element.value;
        switch (inpType.name) {
            case "Name":
                this.errorMessageObj[inpType.name] = {
                    errorMsg: this.validateName(value, validator, required),
                    element: element,
                }
                this.showErrorMessage(inpType.name);
                break;
            case "Email":
                this.errorMessageObj[inpType.name] = {
                    errorMsg: this.validateEmail(value, validator, required),
                    element: element,
                }
                this.showErrorMessage(inpType.name);
                break;
            case "Number":
                this.errorMessageObj[inpType.name] = {
                    errorMsg: this.validateNumber(value, validator, required),
                    element: element,
                }
                this.showErrorMessage(inpType.name);
                break;
            case "Message":
                this.errorMessageObj[inpType.name] = {
                    errorMsg: this.validateMessage(value, validator, required),
                    element: element,
                }
                this.showErrorMessage(inpType.name);
                break;

            default:
                break;
        }
        
    }

    // function to handle name validation.
    validateName(value, validator, required) {
        if (required == "true") {
            let range = validator.split("-");
            if (value.length > parseInt(range[0]) && value.length < parseInt(range[1])) {
                return false;
            }
            else{
                return true;
            }
        }
    }
    
    // function to handle email validation.
    validateEmail(value, validator, required) {
        if (required == "true") {
            let range = validator;
            if (value != "" && value != null && value.length > 3 && value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/)) {
                return false;
            }
            else{
                return true;
            }
        }
    }

    // function to handle number validation.
    validateNumber(value, validator, required) {
        if (required == "true") {
            let range = validator;
            if (value != "" && value != null && value.length > 10 && value.match(/^\+91 +[0-9]{10}$/)) {
                return false;
            }
            else{
                return true;
            }
        }
    }

    // function to handle number validation.
    validateMessage(value, validator, required) {
        if (required == "true") {
            let range = validator.split("-");
            if (value.length > parseInt(range[0]) && value.length < parseInt(range[1])) {
                return false;
            }
            else{
                return true;
            }
        }
    }


    // function to show error message.
    showErrorMessage(inpType){
        const error = this.errorMessageObj[inpType].errorMsg;
        const element =  this.errorMessageObj[inpType].element;

        if (!error) {
            if (!element.classList.contains("valid")) {
                element.classList.remove("invalid");
                element.classList.add("valid");
            }
            else{
                element.classList.remove("invalid");
                element.classList.add("valid");
            }
        }
        else{
            if (!element.classList.contains("invalid")) {
                element.classList.remove("valid");
                element.classList.add("invalid");
            }
            else{
                element.classList.remove("valid");
                element.classList.add("invalid");
            }
        }
    }

    // form submit event.
    formSubmitEvent(form){
        form.addEventListener("submit", (evt) => {
            for(let errors in this.errorMessageObj){
                if(this.errorMessageObj[errors].errorMsg){
                    this.button.classList.remove("success");
                    this.button.classList.add("failed");
                    this.button.value = "Something went wrong!";
                    evt.preventDefault();
                }
                this.button.classList.remove("failed");
                this.button.classList.add("success");
                this.button.value = "Message sent.";
            }
        })
    }
}

const FORM = document.querySelectorAll("[data-form]");
FORM.forEach(form => {
    new FROMVALIDATION(form);
})

