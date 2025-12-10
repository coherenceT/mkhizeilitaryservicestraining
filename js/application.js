// ============================================
// NATIONAL MILITARY TRAINING PROGRAMME
// Application Form JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize application form
    initApplicationForm();
});

function initApplicationForm() {
    // Form navigation
    initStepNavigation();

    // Form validation
    initFormValidation();

    // File uploads
    initFileUploads();

    // Dynamic form elements
    initDynamicFields();

    // Review functionality
    initReviewSection();
}

// ============================================
// STEP NAVIGATION
// ============================================
function initStepNavigation() {
    const stepCards = document.querySelectorAll('.step-card');
    const applicationSteps = document.querySelectorAll('.application-step');
    const progressFill = document.getElementById('progressFill');
    const currentStepText = document.getElementById('currentStep');
    const progressPercentage = document.getElementById('progressPercentage');

    let currentStep = 1;

    // Next step buttons
    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', function() {
            const nextStep = parseInt(this.dataset.next);
            if (validateCurrentStep(currentStep)) {
                navigateToStep(nextStep);
            }
        });
    });

    // Previous step buttons
    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', function() {
            const prevStep = parseInt(this.dataset.prev);
            navigateToStep(prevStep);
        });
    });

    // Step card clicks
    stepCards.forEach(card => {
        card.addEventListener('click', function() {
            const stepNumber = parseInt(this.dataset.step);
            if (canNavigateToStep(stepNumber)) {
                navigateToStep(stepNumber);
            }
        });
    });

    function navigateToStep(stepNumber) {
        // Update current step
        currentStep = stepNumber;

        // Update step cards
        stepCards.forEach(card => {
            const cardStep = parseInt(card.dataset.step);
            card.classList.toggle('active', cardStep === currentStep);
            card.classList.toggle('completed', cardStep < currentStep);
        });

        // Update application steps
        applicationSteps.forEach(step => {
            step.classList.toggle('active', step.id === `step${currentStep}`);
        });

        // Update progress bar
        const progress = (currentStep / 5) * 100;
        progressFill.style.width = progress + '%';
        currentStepText.textContent = `Step ${currentStep} of 5`;
        progressPercentage.textContent = Math.round(progress) + '% Complete';

        // Scroll to top of form
        document.querySelector('.application-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function canNavigateToStep(stepNumber) {
        // Can always go to previous steps
        if (stepNumber < currentStep) return true;

        // Can go to next step only if current step is valid
        if (stepNumber === currentStep + 1) {
            return validateCurrentStep(currentStep);
        }

        // Cannot skip steps
        return false;
    }

    function validateCurrentStep(stepNumber) {
        const currentForm = document.getElementById(`step${stepNumber}`).querySelector('form');
        if (currentForm) {
            return currentForm.checkValidity();
        }
        return true;
    }
}

// ============================================
// FORM VALIDATION
// ============================================
function initFormValidation() {
    // Real-time validation
    document.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });

        field.addEventListener('input', function() {
            // Clear errors on input
            clearFieldError(this);
        });
    });

    // Special validation for ID number
    document.getElementById('idNumber').addEventListener('blur', function() {
        validateSouthAfricanID(this);
    });

    // Age validation
    document.getElementById('dateOfBirth').addEventListener('blur', function() {
        validateAge(this);
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;

    // Clear previous errors
    clearFieldError(field);

    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, `${field.name || field.id} is required`);
        isValid = false;
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        }
    }

    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            showFieldError(field, 'Please enter a valid phone number');
            isValid = false;
        }
    }

    // Postal code validation
    if (field.id === 'postalCode' && value) {
        if (!/^\d{4}$/.test(value)) {
            showFieldError(field, 'Please enter a valid 4-digit postal code');
            isValid = false;
        }
    }

    // Height validation
    if (field.id === 'height' && value) {
        const height = parseInt(value);
        if (height < 140 || height > 220) {
            showFieldError(field, 'Height must be between 140cm and 220cm');
            isValid = false;
        }
    }

    // Weight validation
    if (field.id === 'weight' && value) {
        const weight = parseInt(value);
        if (weight < 40 || weight > 150) {
            showFieldError(field, 'Weight must be between 40kg and 150kg');
            isValid = false;
        }
    }

    // Update field styling
    field.classList.toggle('error', !isValid);

    return isValid;
}

function validateSouthAfricanID(field) {
    const idNumber = field.value.trim();

    if (!idNumber) return true; // Let required validation handle empty field

    // Basic format validation
    if (idNumber.length !== 13 || !/^\d+$/.test(idNumber)) {
        showFieldError(field, 'South African ID must be 13 digits');
        return false;
    }

    // Luhn algorithm validation
    if (!isValidSouthAfricanID(idNumber)) {
        showFieldError(field, 'Invalid South African ID number');
        return false;
    }

    clearFieldError(field);
    return true;
}

function isValidSouthAfricanID(idNumber) {
    // Luhn algorithm check for South African ID
    let sum = 0;
    for (let i = 0; i < 13; i++) {
        let digit = parseInt(idNumber[i]);
        if (i % 2 === 0) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
    }
    return sum % 10 === 0;
}

function validateAge(field) {
    const birthDate = new Date(field.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18 || age > 22) {
        showFieldError(field, 'You must be between 18 and 22 years old');
        return false;
    }

    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    // Remove existing error
    clearFieldError(field);

    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = message;

    field.parentNode.appendChild(errorElement);
    field.classList.add('error');
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    field.classList.remove('error');
}

// ============================================
// FILE UPLOADS
// ============================================
function initFileUploads() {
    const fileInputs = document.querySelectorAll('input[type="file"]');

    fileInputs.forEach(input => {
        const fileButton = input.parentNode.querySelector('.btn');
        const statusElement = input.parentNode.parentNode.querySelector('.upload-status');

        // Trigger file input when button is clicked
        fileButton.addEventListener('click', function() {
            input.click();
        });

        // Handle file selection
        input.addEventListener('change', function() {
            handleFileUpload(this, statusElement);
        });

        // Drag and drop functionality
        const uploadArea = input.parentNode;
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });

        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
        });

        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                input.files = files;
                handleFileUpload(input, statusElement);
            }
        });
    });
}

function handleFileUpload(input, statusElement) {
    const file = input.files[0];

    if (!file) {
        statusElement.textContent = 'Not uploaded';
        statusElement.className = 'upload-status';
        return;
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
        statusElement.textContent = '❌ Invalid file type';
        statusElement.className = 'upload-status error';
        input.value = '';
        return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
        statusElement.textContent = '❌ File too large (max 5MB)';
        statusElement.className = 'upload-status error';
        input.value = '';
        return;
    }

    // Success
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    statusElement.textContent = `✅ ${file.name} (${fileSizeMB}MB)`;
    statusElement.className = 'upload-status success';

    // Update review section
    updateDocumentStatus(input.id, true);
}

// ============================================
// DYNAMIC FORM FIELDS
// ============================================
function initDynamicFields() {
    // Nationality selection
    document.getElementById('nationality').addEventListener('change', function() {
        const otherNationalityGroup = document.getElementById('otherNationalityGroup');
        if (this.value === 'other') {
            otherNationalityGroup.style.display = 'block';
            document.getElementById('otherNationality').required = true;
        } else {
            otherNationalityGroup.style.display = 'none';
            document.getElementById('otherNationality').required = false;
        }
    });

    // Medical conditions
    document.querySelectorAll('input[name="medicalConditions"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const conditionsDetails = document.getElementById('conditionsDetails');
            if (this.value === 'yes') {
                conditionsDetails.style.display = 'block';
            } else {
                conditionsDetails.style.display = 'none';
            }
        });
    });
}

// ============================================
// REVIEW SECTION
// ============================================
function initReviewSection() {
    // Update review when navigating to step 5
    document.querySelectorAll('.next-step[data-next="5"]').forEach(button => {
        button.addEventListener('click', function() {
            updateReviewSection();
        });
    });

    // Declaration checkboxes
    const declarationCheckboxes = document.querySelectorAll('.declaration-section input[type="checkbox"]');
    const submitButton = document.getElementById('submitApplication');

    declarationCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            checkDeclarationCompletion();
        });
    });

    function checkDeclarationCompletion() {
        const allChecked = Array.from(declarationCheckboxes).every(cb => cb.checked);
        submitButton.disabled = !allChecked;
    }

    // Form submission
    document.getElementById('step5').addEventListener('submit', function(e) {
        e.preventDefault();
        submitApplication();
    });
}

function updateReviewSection() {
    // Personal Information
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    document.getElementById('reviewName').textContent = `${firstName} ${lastName}`;

    document.getElementById('reviewID').textContent = document.getElementById('idNumber').value;
    document.getElementById('reviewDOB').textContent = formatDate(document.getElementById('dateOfBirth').value);
    document.getElementById('reviewEmail').textContent = document.getElementById('email').value;

    // Educational Background
    const qualificationSelect = document.getElementById('highestQualification');
    document.getElementById('reviewQualification').textContent = qualificationSelect.options[qualificationSelect.selectedIndex].text;
    document.getElementById('reviewSchool').textContent = document.getElementById('schoolName').value;
    document.getElementById('reviewYear').textContent = document.getElementById('graduationYear').value;

    // Medical & Fitness
    document.getElementById('reviewHeight').textContent = document.getElementById('height').value + ' cm';
    document.getElementById('reviewWeight').textContent = document.getElementById('weight').value + ' kg';

    const fitnessSelect = document.getElementById('fitnessLevel');
    document.getElementById('reviewFitness').textContent = fitnessSelect.options[fitnessSelect.selectedIndex].text;
}

function updateDocumentStatus(documentId, isUploaded) {
    const statusElements = {
        'idDocument': 'statusID',
        'matricCertificate': 'statusMatric',
        'medicalCertificate': 'statusMedical',
        'transcript': 'statusTranscript'
    };

    const statusElement = document.getElementById(statusElements[documentId]);
    if (statusElement) {
        if (isUploaded) {
            statusElement.textContent = '✅ Uploaded';
            statusElement.className = 'status-value success';
        } else {
            statusElement.textContent = documentId === 'transcript' ? '⚠️ Optional' : '❌ Not uploaded';
            statusElement.className = 'status-value';
        }
    }
}

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA');
}

// ============================================
// FORM SUBMISSION
// ============================================
function submitApplication() {
    // Show loading state
    const submitButton = document.getElementById('submitApplication');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting Application...';
    submitButton.disabled = true;

    // Collect form data
    const formData = new FormData();

    // Personal Information
    formData.append('firstName', document.getElementById('firstName').value);
    formData.append('lastName', document.getElementById('lastName').value);
    formData.append('idNumber', document.getElementById('idNumber').value);
    formData.append('dateOfBirth', document.getElementById('dateOfBirth').value);
    formData.append('gender', document.getElementById('gender').value);
    formData.append('nationality', document.getElementById('nationality').value);
    if (document.getElementById('otherNationality').value) {
        formData.append('otherNationality', document.getElementById('otherNationality').value);
    }
    formData.append('email', document.getElementById('email').value);
    formData.append('phone', document.getElementById('phone').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('city', document.getElementById('city').value);
    formData.append('province', document.getElementById('province').value);
    formData.append('postalCode', document.getElementById('postalCode').value);
    formData.append('emergencyContact', document.getElementById('emergencyContact').value);
    formData.append('emergencyPhone', document.getElementById('emergencyPhone').value);

    // Educational Background
    formData.append('highestQualification', document.getElementById('highestQualification').value);
    formData.append('schoolName', document.getElementById('schoolName').value);
    formData.append('graduationYear', document.getElementById('graduationYear').value);
    formData.append('mathsGrade', document.getElementById('mathsGrade').value);
    formData.append('englishGrade', document.getElementById('englishGrade').value);
    formData.append('achievements', document.getElementById('achievements').value);
    formData.append('careerGoals', document.getElementById('careerGoals').value);
    formData.append('leadershipExperience', document.getElementById('leadershipExperience').value);

    // Medical & Fitness
    const medicalConditions = document.querySelector('input[name="medicalConditions"]:checked');
    formData.append('medicalConditions', medicalConditions ? medicalConditions.value : '');
    formData.append('conditionsList', document.getElementById('conditionsList').value);
    formData.append('height', document.getElementById('height').value);
    formData.append('weight', document.getElementById('weight').value);
    formData.append('fitnessLevel', document.getElementById('fitnessLevel').value);
    formData.append('exerciseFrequency', document.getElementById('exerciseFrequency').value);
    formData.append('sportsExperience', document.getElementById('sportsExperience').value);
    const medicalClearance = document.querySelector('input[name="medicalClearance"]:checked');
    formData.append('medicalClearance', medicalClearance ? medicalClearance.value : '');

    // Documents
    const idDocument = document.getElementById('idDocument').files[0];
    if (idDocument) formData.append('idDocument', idDocument);

    const matricCertificate = document.getElementById('matricCertificate').files[0];
    if (matricCertificate) formData.append('matricCertificate', matricCertificate);

    const medicalCertificate = document.getElementById('medicalCertificate').files[0];
    if (medicalCertificate) formData.append('medicalCertificate', medicalCertificate);

    const transcript = document.getElementById('transcript').files[0];
    if (transcript) formData.append('transcript', transcript);

    // Declarations
    formData.append('accuracyDeclaration', document.getElementById('accuracyDeclaration').checked);
    formData.append('medicalConsent', document.getElementById('medicalConsent').checked);
    formData.append('backgroundCheck', document.getElementById('backgroundCheck').checked);
    formData.append('termsAcceptance', document.getElementById('termsAcceptance').checked);

    // Simulate form submission (replace with actual API call)
    setTimeout(function() {
        showSubmissionSuccess();
    }, 2000);
}

function showSubmissionSuccess() {
    // Hide form and show success message
    document.querySelector('.application-container').innerHTML = `
        <div class="submission-success">
            <div class="success-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/>
                </svg>
            </div>
            <h2>Application Submitted Successfully!</h2>
            <p>Your application for the National Military Training Programme has been received and is being processed.</p>

            <div class="success-details">
                <div class="detail-item">
                    <h4>Application Reference</h4>
                    <p class="reference-number">NMTP-${Date.now()}</p>
                </div>
                <div class="detail-item">
                    <h4>What Happens Next?</h4>
                    <ul>
                        <li>Application review (2-4 weeks)</li>
                        <li>Fitness assessment invitation</li>
                        <li>Interview scheduling</li>
                        <li>Final acceptance notification</li>
                    </ul>
                </div>
                <div class="detail-item">
                    <h4>Important Information</h4>
                    <ul>
                        <li>Check your email regularly for updates</li>
                        <li>Keep your contact details current</li>
                        <li>Prepare for fitness assessment</li>
                        <li>Application processing may take up to 8 weeks</li>
                    </ul>
                </div>
            </div>

            <div class="success-actions">
                <a href="../index.html" class="btn btn-primary">Return to Home</a>
                <a href="dashboard.html" class="btn btn-outline">Track Application Status</a>
            </div>
        </div>
    `;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Auto-save form data to localStorage
function autoSaveForm() {
    const forms = document.querySelectorAll('.application-form');

    forms.forEach(form => {
        form.addEventListener('input', function() {
            const formData = new FormData(form);
            const data = {};

            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }

            localStorage.setItem(`application_${form.id}`, JSON.stringify(data));
        });
    });
}

// Load saved form data
function loadSavedForm() {
    const forms = document.querySelectorAll('.application-form');

    forms.forEach(form => {
        const savedData = localStorage.getItem(`application_${form.id}`);

        if (savedData) {
            const data = JSON.parse(savedData);

            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field) {
                    if (field.type === 'checkbox' || field.type === 'radio') {
                        field.checked = data[key] === 'on';
                    } else {
                        field.value = data[key];
                    }
                }
            });
        }
    });
}

// Initialize auto-save
autoSaveForm();
loadSavedForm();
