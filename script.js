document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  const formSteps = document.querySelectorAll(".form-step");
  const progressBar = document.getElementById("progressBar");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const multiForm = document.getElementById("multiForm");
  const cardHeader = document.getElementById("cardHeader");
  const progressContainer = document.getElementById("progressContainer");
  
  const successState = document.getElementById("successState");
  const restartBtn = document.getElementById("restartBtn");

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const fullnameInput = document.getElementById("fullname");
  const phoneInput = document.getElementById("phone");
  const cardnumberInput = document.getElementById("cardnumber");
  const expiryInput = document.getElementById("expiry");

  const summaryEmail = document.getElementById("summary-email");
  const summaryFullname = document.getElementById("summary-fullname");
  const summaryPhone = document.getElementById("summary-phone");
  const summaryPayment = document.getElementById("summary-payment");

  let currentStep = 1;
  const totalSteps = steps.length;

  // format phone number
  phoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 10) {
      value = value.substring(0, 10);
    }
    e.target.value = value;
    clearError(phoneInput);
  });

  // format card number
  cardnumberInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) {
      value = value.substring(0, 16);
    }
    const matches = value.match(/.{1,4}/g);
    e.target.value = matches ? matches.join(" ") : value;
    clearError(cardnumberInput);
  });

  // format expiry date
  expiryInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) {
      value = value.substring(0, 4);
    }
    if (value.length > 2) {
      e.target.value = value.substring(0, 2) + "/" + value.substring(2);
    } else {
      e.target.value = value;
    }
    clearError(expiryInput);
  });

  [emailInput, passwordInput, fullnameInput].forEach(input => {
    input.addEventListener("input", () => clearError(input));
  });

  function showError(input, message) {
    input.classList.add("is-invalid");
    const errorEl = document.getElementById(`${input.id}-error`);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add("active");
    }
  }

  function clearError(input) {
    input.classList.remove("is-invalid");
    const errorEl = document.getElementById(`${input.id}-error`);
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.remove("active");
    }
  }

  function validateStep(step) {
    let isValid = true;

    if (step === 1) {
      const email = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email === "") {
        showError(emailInput, "Email is required");
        isValid = false;
      } else if (!emailRegex.test(email)) {
        showError(emailInput, "Valid email is required");
        isValid = false;
      }

      const password = passwordInput.value;
      if (password === "") {
        showError(passwordInput, "Password is required");
        isValid = false;
      } else if (password.length < 8) {
        showError(passwordInput, "Password must be at least 8 chars");
        isValid = false;
      }
    } else if (step === 2) {
      const fullname = fullnameInput.value.trim();
      if (fullname === "") {
        showError(fullnameInput, "Name is required");
        isValid = false;
      } else if (fullname.length < 3) {
        showError(fullnameInput, "Name must be at least 3 chars");
        isValid = false;
      }

      const phone = phoneInput.value.trim();
      if (phone === "" || phone.length < 10) {
        showError(phoneInput, "10-digit phone is required");
        isValid = false;
      }
    } else if (step === 3) {
      const cardRaw = cardnumberInput.value.replace(/\s/g, "");
      if (cardRaw === "" || cardRaw.length < 16) {
        showError(cardnumberInput, "16-digit card number is required");
        isValid = false;
      }

      const expiry = expiryInput.value.trim();
      const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
      if (expiry === "" || !expiryRegex.test(expiry)) {
        showError(expiryInput, "Valid expiry (MM/YY) is required");
        isValid = false;
      } else {
        const [month, year] = expiry.split("/").map(Number);
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;
        
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
          showError(expiryInput, "Card expired");
          isValid = false;
        }
      }
    }

    return isValid;
  }

  function updateProgress() {
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    steps.forEach((step, index) => {
      const stepNum = index + 1;
      step.classList.remove("active", "completed");

      if (stepNum < currentStep) {
        step.classList.add("completed");
      } else if (stepNum === currentStep) {
        step.classList.add("active");
      }
    });

    formSteps.forEach((stepPanel, index) => {
      stepPanel.classList.remove("active");
      if (currentStep === index + 1) {
        stepPanel.classList.add("active");
      }
    });

    prevBtn.disabled = currentStep === 1;
    
    if (currentStep === totalSteps) {
      nextBtn.innerHTML = `Submit`;
      populateReviewDetails();
    } else {
      nextBtn.innerHTML = `Next`;
    }
  }

  function populateReviewDetails() {
    summaryEmail.textContent = emailInput.value.trim();
    summaryFullname.textContent = fullnameInput.value.trim();
    
    const p = phoneInput.value.trim();
    summaryPhone.textContent = `(${p.substring(0, 3)}) ${p.substring(3, 6)}-${p.substring(6)}`;

    const c = cardnumberInput.value.replace(/\s/g, "");
    summaryPayment.textContent = `Card ending in ${c.substring(12)}`;
  }

  function handleNext() {
    if (!validateStep(currentStep)) return;

    if (currentStep < totalSteps) {
      currentStep++;
      updateProgress();
    } else {
      submitForm();
    }
  }

  function handlePrev() {
    if (currentStep > 1) {
      currentStep--;
      updateProgress();
    }
  }

  function submitForm() {
    multiForm.style.display = "none";
    progressContainer.style.display = "none";
    cardHeader.style.display = "none";
    successState.style.display = "flex";
  }

  function handleRestart() {
    multiForm.reset();
    
    document.querySelectorAll("input").forEach(input => {
      clearError(input);
    });

    currentStep = 1;
    updateProgress();

    successState.style.display = "none";
    cardHeader.style.display = "block";
    progressContainer.style.display = "block";
    multiForm.style.display = "flex";
  }

  nextBtn.addEventListener("click", handleNext);
  prevBtn.addEventListener("click", handlePrev);
  restartBtn.addEventListener("click", handleRestart);

  updateProgress();
});
