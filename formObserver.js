const Forms = {
  "form-1": ".from-block",
  "form-2": "[data='form-two']",
  "form-3": "#form-3",
}
const formParents = [];

Object.values(Forms).forEach(function(formId){
  let FormEle = document.querySelector(formId);
  formParents.push(FormEle.parentElement);
  FormEle.addEventListener("formSub", (e) => {
    console.log("triggered", e.detail);
    e.detail()
  });
})

function observeBehaviour(){
  console.log("observing")
}

const formSubEvt = new CustomEvent("formSub", {
  detail: observeBehaviour,
});

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

const callback = function (mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (
      mutation.type === "attributes" &&
      mutation.target.classList.contains("w-form-done")
    ) {
      const $form = mutation.target.parentElement.querySelector("form");
      const formData = new FormData($form);

      formSubEvt.formData = formData;
      $form.dispatchEvent(formSubEvt);
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
formParents.forEach(function (form) {
  observer.observe(form, config);
});