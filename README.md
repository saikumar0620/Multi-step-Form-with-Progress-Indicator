# Multi-step Form with Progress Indicator

A responsive, multi-step form that guides users through Account, Details, Payment, and Review steps, showing real-time progress and inline validation.

## Demo
•⁠  ⁠Live demo: https://saikumar0620.github.io/Multi-step-Form-with-Progress-Indicator/

## Features
•⁠  ⁠🚦 Progress bar with active/completed step states
•⁠  ⁠✅ Client-side validation per step (blocks next until filled)
•⁠  ⁠🖱️ Next/Previous navigation with CTA state changes
•⁠  ⁠📱 Responsive layout (mobile-friendly)
•⁠  ⁠🎨 Font Awesome icons + modern Inter typography

## Tech Stack
•⁠  ⁠HTML5
•⁠  ⁠CSS3
•⁠  ⁠JavaScript (vanilla)
•⁠  ⁠Font Awesome CDN
•⁠  ⁠Google Fonts (Inter)

## Quick Start
⁠ bash
# Clone
git clone https://github.com/saikumar0620/Multi-step-Form-with-Progress-Indicator.git
cd Multi-step-Form-with-Progress-Indicator

# Run (no build needed)
# Option 1: open index.html in your browser
# Option 2: serve locally for CORS-free testing
npx serve .
# or
python -m http.server 8000
 ⁠

## Project Structure

├── index.html      # Markup for steps, progress UI, form fields
├── style.css       # Styling, layout, step states, responsive tweaks
└── script.js       # Progress logic, navigation, validation, reset


## How It Works
1.⁠ ⁠Progress bar width updates from ⁠ currentStep ⁠ / ⁠ totalSteps ⁠.
2.⁠ ⁠Step indicators toggle ⁠ active ⁠ / ⁠ completed ⁠ classes for visuals.
3.⁠ ⁠⁠ validateCurrentStep() ⁠ ensures required inputs on the current panel are filled before advancing.
4.⁠ ⁠Final step triggers a success alert and resets the form.

## Customization Tips
•⁠  ⁠Steps: add/remove ⁠ .step ⁠ blocks and matching ⁠ .form-step ⁠ panels in ⁠ index.html ⁠.
•⁠  ⁠Colors: adjust primary button (⁠ .btn-primary ⁠) and progress bar colors in ⁠ style.css ⁠.
•⁠  ⁠Validation: extend ⁠ validateCurrentStep() ⁠ in ⁠ script.js ⁠ for stricter rules (regex, length, etc.).
•⁠  ⁠Icons: swap Font Awesome classes in ⁠ .step-circle ⁠ for different visuals.

## Accessibility
•⁠  ⁠Uses semantic headings and labels.
•⁠  ⁠Focus states can be enhanced by adding ⁠ :focus ⁠ styles in ⁠ style.css ⁠.
•⁠  ⁠Ensure meaningful ⁠ aria-label ⁠ attributes for inputs if you change placeholders.

## Browser Support
Tested on modern Chromium-based browsers and Firefox. Add vendor prefixes if you need older support.

## Contributing
Issues and PRs are welcome! Please:
1.⁠ ⁠Fork the repo
2.⁠ ⁠Create a feature branch
3.⁠ ⁠Commit with clear messages
4.⁠ ⁠Open a PR describing changes and testing steps

## License
MIT License — see [LICENSE](LICENSE) if present, or add one to clarify usage.
