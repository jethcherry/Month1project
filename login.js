var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Login {
    constructor(data) {
        this.username = data.username;
        this.password = data.password;
        this.userType = data.userType;
    }
    validateInputs() {
        if (!this.username || !this.password || !this.userType) {
            alert("All fields are required.");
            return false;
        }
        return true;
    }
    submitForm() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.validateInputs()) {
                try {
                    const url = this.userType === 'user' ? 'http://localhost:3000/users' : 'http://localhost:3000/admin';
                    const response = yield fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: this.username,
                            password: this.password
                        })
                    });
                    if (response.ok) {
                        const userData = yield response.json();
                        const foundUser = userData.find((user) => user.username === this.username && user.password === this.password);
                        if (foundUser) {
                            alert("Login successful!");
                            if (this.userType === "admin") {
                                window.location.href = "/admin.html";
                            }
                            else {
                                window.location.href = "/user.html";
                            }
                        }
                        else {
                            alert("Invalid username or password.");
                        }
                    }
                    else {
                        alert("Login failed!");
                    }
                }
                catch (error) {
                    console.error('Error:', error);
                    alert("An error occurred during login.");
                }
            }
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    loginForm === null || loginForm === void 0 ? void 0 : loginForm.addEventListener('submit', (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const userTypeInput = document.querySelector('input[name="usertype"]:checked');
        const loginData = {
            username: usernameInput.value,
            password: passwordInput.value,
            userType: (userTypeInput === null || userTypeInput === void 0 ? void 0 : userTypeInput.value) || ""
        };
        const login = new Login(loginData);
        yield login.submitForm();
    }));
});
