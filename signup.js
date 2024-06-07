var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Signup {
    constructor(data) {
        this.data = data;
    }
    validatePassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        if (!password) {
            return 'The input fields cannot be empty';
        }
        if (password.length < minLength) {
            return `Password must be at least ${minLength} characters long.`;
        }
        if (!hasUpperCase) {
            return 'Password must contain at least one uppercase letter.';
        }
        if (!hasLowerCase) {
            return 'Password must contain at least one lowercase letter.';
        }
        if (!hasNumber) {
            return 'Password must contain at least one number.';
        }
        if (!hasSpecialChar) {
            return 'Password must contain at least one special character.';
        }
        return '';
    }
    validateInputs() {
        const passwordError = this.validatePassword(this.data.password);
        if (!this.data.username || !this.data.email || !this.data.password || !this.data.userType) {
            alert("All fields are required.");
            return false;
        }
        if (passwordError) {
            alert(passwordError);
            return false;
        }
        return true;
    }
    submitForm() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.validateInputs()) {
                try {
                    const url = this.data.userType === 'user' ? 'http://localhost:3000/users' : 'http://localhost:3000/admin';
                    const response = yield fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: this.data.username,
                            email: this.data.email,
                            password: this.data.password
                        })
                    });
                    if (response.ok) {
                        window.location.href = 'login.html';
                        alert("Signup successful!");
                    }
                    else {
                        alert("Signup failed!");
                    }
                }
                catch (error) {
                    console.error('Error:', error);
                    alert("An error occurred during signup.");
                }
            }
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('form');
    signupForm === null || signupForm === void 0 ? void 0 : signupForm.addEventListener('submit', (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const usernameInput = document.getElementById('username');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const userTypeSelect = document.getElementById('usertype');
        const signupData = {
            username: usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            userType: userTypeSelect.value
        };
        const signup = new Signup(signupData);
        yield signup.submitForm();
    }));
});
