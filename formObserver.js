class FORMOBSERVER {
  constructor(formObj) {
    this.form = formObj;
    this.formParents = [];
    this.init();
  }
  init() {
    this.addListener(this.form, this.formParents);
    this.createObserver();
  }

  addListener(form, parentElement) {
    Object.keys(form).forEach(function (formId) {
      let FormEle = document.querySelector(formId);
      if (FormEle !== null) {
        parentElement.push(FormEle.parentElement);
        FormEle.addEventListener("formSub", (e) => {
          if (e.detail.success == true) {
            Forms[formId]();
          }
        });
      }
    })
  }

  createObserver() {

    const callback = function (mutationsList, observer) {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.target.classList.contains("w-form-done")
        ) {
          const formSubEvt = new CustomEvent("formSub", { detail: { success: true } });
          const $form = mutation.target.parentElement.querySelector("form");
          const formData = new FormData($form);
          formSubEvt.formData = formData;
          $form.dispatchEvent(formSubEvt);
        }
      }
    };

    // Create an observer instance linked to the callback function
    this.observer = new MutationObserver(callback);
    this.callObserver(this.formParents, this.observer);
  }

  callObserver(formParents, observer) {
    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    // Start observing the target node for configured mutations
    formParents.forEach(function (form) {
      observer.observe(form, config);
    });
  }

}

function observeBehaviour() {
  console.log("working")
}
const Forms = {
  ".from-block": observeBehaviour,
  "[data='form-two']": observeBehaviour,
  "#form-3": observeBehaviour,
}

new FORMOBSERVER(Forms);