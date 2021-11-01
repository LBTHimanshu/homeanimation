function observeBehaviour(){
  console.log("working")
}
const Forms = {
  ".from-block": observeBehaviour,
  "[data='form-two']": observeBehaviour,
  "#form-3": observeBehaviour,
}
const formParents = [];

Object.keys(Forms).forEach(function (formId) {
  let FormEle = document.querySelector(formId);
  if (FormEle !== null) {
    formParents.push(FormEle.parentElement);
    FormEle.addEventListener("formSub", (e) => {
      if (e.success == true) {
        Forms[formId]();
      }
    });
  }
})


const formSubEvt = new CustomEvent("formSub", { detail: true });

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
      formSubEvt.success = true;
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