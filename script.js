const steps = document.querySelectorAll(".step");
const formSteps = document.querySelectorAll(".form-step");
const progressBar = document.getElementById("progressBar");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentStep = 1;
const totalSteps = steps.length;

function updateProgress() {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
  progressBar.style.width = `${progress}%`;

  // update step indicators
  steps.forEach((step, index) => {
    const stepNum = index + 1;
    step.classList.remove("active", "completed");

    if (stepNum < currentStep) {
      step.classList.add("completed");
    } else if (stepNum === currentStep) {
      step.classList.add("active");
    }
  });

  // update form steps
  formSteps.forEach((step, index) => {
    step.classList.remove("active");
    if (currentStep === index + 1) {
      step.classList.add("active");
    }
  });

  prevBtn.disabled = currentStep === 1;
  nextBtn.textContent = currentStep === totalSteps ? "Submit" : "Next";
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    updateProgress();
  }
}


// MYCODE 

// function nextStep() {
//   if (currentStep < totalSteps) {
//     currentStep++;
//     updateProgress();
//   } else {
//     alert("Form submitted successfully! 🎉");
//     currentStep = 1;
//     updateProgress();
//   }
// }
// 1. New Validation Function



//AI//

function validateCurrentStep() {
  // Find the currently active step
  const currentFormStep = formSteps[currentStep - 1];
  // Select only the inputs inside this specific step
  const inputs = currentFormStep.querySelectorAll("input");
  let isValid = true;

  inputs.forEach(input => {
    if (input.value.trim() === "") {
      isValid = false;
      input.style.borderColor = "red"; // Visual error feedback
    } else {
      input.style.borderColor = "gray"; // Reset if valid
    }
  });

  return isValid;
}

// 2. Clear red borders when the user starts typing
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
      input.style.borderColor = "gray";
    }
  });
});

// 3. Updated Next Step Logic
function nextStep(e) {
  // Prevent default form submission behavior if triggered inside a form
  if (e) e.preventDefault(); 

  // Stop execution if validation fails
  if (!validateCurrentStep()) {
    alert("Incomplete data: Please fill out all required fields before proceeding.");
    return; 
  }

  if (currentStep < totalSteps) {
    currentStep++;
    updateProgress();
  } else {
    // Final Submit Logic
    alert("Form submitted successfully! 🎉");
    document.getElementById("multiForm").reset(); // Clear the form data
    currentStep = 1; // Reset to beginning
    updateProgress();
  }
}

prevBtn.addEventListener("click", prevStep);
nextBtn.addEventListener("click", nextStep);

