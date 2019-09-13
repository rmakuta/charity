document.addEventListener("DOMContentLoaded", function() {

  /**
   * Form Select
   */
  class FormSelect {
    constructor($el) {
      this.$el = $el;
      this.options = [...$el.children];
      this.init();
    }

    init() {
      this.createElements();
      this.addEvents();
      this.$el.parentElement.removeChild(this.$el);
    }

    createElements() {
      // Input for value
      this.valueInput = document.createElement("input");
      this.valueInput.type = "text";
      this.valueInput.name = this.$el.name;

      // Dropdown container
      this.dropdown = document.createElement("div");
      this.dropdown.classList.add("dropdown");

      // List container
      this.ul = document.createElement("ul");

      // All list options
      this.options.forEach((el, i) => {
        const li = document.createElement("li");
      li.dataset.value = el.value;
      li.innerText = el.innerText;

      if (i === 0) {
        // First clickable option
        this.current = document.createElement("div");
        this.current.innerText = el.innerText;
        this.dropdown.appendChild(this.current);
        this.valueInput.value = el.value;
        li.classList.add("selected");
      }

      this.ul.appendChild(li);
    });

      this.dropdown.appendChild(this.ul);
      this.dropdown.appendChild(this.valueInput);
      this.$el.parentElement.appendChild(this.dropdown);
    }

    addEvents() {
      this.dropdown.addEventListener("click", e => {
        const target = e.target;
      this.dropdown.classList.toggle("selecting");

      // Save new value only when clicked on li
      if (target.tagName === "LI") {
        this.valueInput.value = target.dataset.value;
        this.current.innerText = target.innerText;
      }
    });
    }
  }
  document.querySelectorAll(".form-group--dropdown select").forEach(el => {
    new FormSelect(el);
});

  /**
   * Hide elements when clicked on document
   */
  document.addEventListener("click", function(e) {
    const target = e.target;
    const tagName = target.tagName;

    if (target.classList.contains("dropdown")) return false;

    if (tagName === "LI" && target.parentElement.parentElement.classList.contains("dropdown")) {
      return false;
    }

    if (tagName === "DIV" && target.parentElement.classList.contains("dropdown")) {
      return false;
    }

    document.querySelectorAll(".form-group--dropdown .dropdown").forEach(el => {
      el.classList.remove("selecting");
  });
  });

  /**
   * Switching between form steps
   */
  class FormSteps {
    constructor(form) {
      this.$form = form;
      this.$next = form.querySelectorAll(".next-step");
      this.$prev = form.querySelectorAll(".prev-step");
      this.$step = form.querySelector(".form--steps-counter span");
      this.currentStep = 1;

      this.$stepInstructions = form.querySelectorAll(".form--steps-instructions p");
      const $stepForms = form.querySelectorAll("form > div");
      this.slides = [...this.$stepInstructions, ...$stepForms];

      this.init();
    }

    /**
     * Init all methods
     */
    init() {
      this.events();
      this.updateForm();
    }

    /**
     * All events that are happening in form
     */
    events() {
      // Next step
      this.$next.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
      this.currentStep++;
      this.updateForm();
    });
    });

      // Previous step
      this.$prev.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
      this.currentStep--;
      this.updateForm();
    });
    });

      // Form submit
      this.$form.querySelector("form").addEventListener("submit", e => this.submit(e));
    }

    /**
     * Update form front-end
     * Show next or previous section etc.
     */
    updateForm() {
      this.$step.innerText = this.currentStep;

      // TODO: Validation

      this.slides.forEach(slide => {
        slide.classList.remove("active");

      if (slide.dataset.step == this.currentStep) {
        slide.classList.add("active");
      }
    });

      this.$stepInstructions[0].parentElement.parentElement.hidden = this.currentStep >= 5;
      this.$step.parentElement.hidden = this.currentStep >= 5;

      // TODO: get data from inputs and show them in summary

//kategorie
        var categories = document.querySelectorAll(".ch")
        var checkedCategories = []
        categories.forEach(function (elem) {
            if(elem.checked){
                checkedCategories.push(elem.nextElementSibling.nextElementSibling.innerHTML)
            }
        })
// worki
      var bags = document.querySelector("#bags");
      if(bags.value == 1){
          document.getElementById("quantityBags").innerHTML = bags.value + " worek o zawartości: " + checkedCategories.join(", ");
      }else if(bags.value > 1 && bags.value < 5){
          document.getElementById("quantityBags").innerHTML = bags.value + " worki o zawartości: " + checkedCategories.join(", ");
      }else {
          document.getElementById("quantityBags").innerHTML = bags.value + " worków o zawartości: " + checkedCategories.join(", ");
      }

//instytucje
      var institutions = document.querySelectorAll("#b");
      var institution = ""
      institutions.forEach(function (elem) {
        if(elem.checked){
          institution = elem.nextElementSibling.nextElementSibling.firstElementChild.innerHTML
        }
      })

      document.getElementById("checkInstitution").innerText = "Dla " + institution;

//adres
      var street = document.querySelector("#streetIn");
      document.querySelector("#streetOut").innerHTML = street.value

      var city = document.querySelector("#cityIn");
      document.querySelector("#cityOut").innerHTML = city.value

      var zipCode = document.querySelector("#zipCodeIn");
      document.querySelector("#zipCodeOut").innerHTML = zipCode.value

      var phoneNumber = document.querySelector("#phoneNumberIn");
      document.querySelector("#phoneNumberOut").innerHTML = phoneNumber.value

      var pickUpDate = document.querySelector("#pickUpDateIn");
      document.querySelector("#pickUpDateOut").innerHTML = pickUpDate.value

      var pickUpTime = document.querySelector("#pickUpTimeIn");
      document.querySelector("#pickUpTimeOut").innerHTML = pickUpTime.value

      var pickUpComment = document.querySelector("#pickUpCommentIn");
      document.querySelector("#pickUpCommentOut").innerHTML = pickUpComment.value

    }
  }
  const form = document.querySelector(".form--steps");
  if (form !== null) {
    new FormSteps(form);
  }
});
