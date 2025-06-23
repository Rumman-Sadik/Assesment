document.addEventListener('DOMContentLoaded', function() {
//footer n modal functionality 

//basic elements 
const subscribeButton=document.getElementById('subscribeButton');
const subscribeEmail=document.getElementById('subscribeEmail');
const authModal=document.getElementById('authModal');
const closeModal=document.getElementById('closeModal');
  const authForm=document.getElementById('authForm');

//modal form parts
const modalEmail=document.getElementById('modalEmail');
const username=document.getElementById('username');
const password=document.getElementById('password');
const togglePassword=document.getElementById('togglePassword');
const submitBtn=document.getElementById('submitBtn');

//password strength indicators
  const lengthIndicator=document.getElementById('lengthIndicator');
 const upperIndicator=document.getElementById('upperIndicator');
 const lowerIndicator=document.getElementById('lowerIndicator');
 const numberIndicator=document.getElementById('numberIndicator');
 const specialIndicator=document.getElementById('specialIndicator');

 const lengthText=document.getElementById('lengthText');
 const upperText=document.getElementById('upperText');
 const lowerText=document.getElementById('lowerText');
const numberText=document.getElementById('numberText');
const specialText=document.getElementById('specialText');

//open n close modal funcs
function openModal() {
    authModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    modalEmail.focus(); 
}

function closeModalFunc() {
    authModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    resetForm();
}

function resetForm() {
    authForm.reset();
    resetPasswordValidation();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Create Account'; 
}

//events thatopens modal
subscribeEmail.addEventListener('click', openModal);
subscribeButton.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalFunc);

//close modal when clicked outside
authModal.addEventListener('click', function(e) {
    if (e.target === authModal) {
        closeModalFunc();
    }
});

//password show/hide toggle
togglePassword.addEventListener('click', function() {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    if (type === 'password') {
        togglePassword.classList.remove('fa-eye-slash');
        togglePassword.classList.add('fa-eye');
    } else {
        togglePassword.classList.remove('fa-eye');
        togglePassword.classList.add('fa-eye-slash');
    }
});

//password validation checks 
function validatePassword(pwd) {
    return {
        length: pwd.length >= 8,
        upper: /[A-Z]/.test(pwd),
        lower: /[a-z]/.test(pwd),
        number: /\d/.test(pwd),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    };
}

function updatePasswordIndicator(indicator, text, isValid) {
    if (isValid) { indicator.classList.remove('fa-circle');
    indicator.classList.add('fa-check-circle', 'indicator-valid');
        text.classList.add('password-valid');
        text.classList.remove('password-invalid');
    } else {indicator.classList.remove('fa-check-circle', 'indicator-valid');
        indicator.classList.add('fa-circle');
        text.classList.remove('password-valid');
        text.classList.add('password-invalid');
    }
}

//reset indicators
function resetPasswordValidation() {
 const indicators=[lengthIndicator, upperIndicator, lowerIndicator, numberIndicator, specialIndicator];
    const texts=[lengthText, upperText, lowerText, numberText, specialText];

indicators.forEach(indicator => {
 indicator.classList.remove('fa-check-circle', 'indicator-valid');
    indicator.classList.add('fa-circle');
    });

texts.forEach(text => {
 text.classList.remove('password-valid', 'password-invalid');
    });
}

//when typing password..show validation progress
password.addEventListener('input', function() {
    const pwd = this.value;
    const validations = validatePassword(pwd);
 updatePasswordIndicator(lengthIndicator, lengthText, validations.length);
updatePasswordIndicator(upperIndicator, upperText, validations.upper);
 updatePasswordIndicator(lowerIndicator, lowerText, validations.lower);
 updatePasswordIndicator(numberIndicator, numberText, validations.number);
      updatePasswordIndicator(specialIndicator, specialText, validations.special);
});

//username check
username.addEventListener('input', function() {
    const usernameValue = this.value.trim();
 const usernameError = document.getElementById('usernameError');

 if (usernameValue && usernameValue.length < 3) {
     usernameError.classList.remove('hidden');
     this.classList.add('border-red-500');
    } else {
 usernameError.classList.add('hidden');
 this.classList.remove('border-red-500');
    }
});

//form submit
authForm.addEventListener('submit', function(e) {
    e.preventDefault();
     submitBtn.disabled = true; 
});

}); 