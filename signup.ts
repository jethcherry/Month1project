interface SignupData {
    username: string;
    email: string;
    password: string;
    userType: string;
}

class Signup {
    private data: SignupData;

    constructor(data: SignupData) {
        this.data = data;
    }

    private validatePassword(password: string): string {
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

    public validateInputs(): boolean {
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

    public async submitForm(): Promise<void> {
        if (this.validateInputs()) {
            try {
                const url = this.data.userType === 'user' ? 'http://localhost:3000/users' : 'http://localhost:3000/admin';

                const response = await fetch(url, {
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
                    
                } else {
                    alert("Signup failed!");
                }
            } catch (error) {
                console.error('Error:', error);
                alert("An error occurred during signup.");
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('form');
    signupForm?.addEventListener('submit', async (event) => {
        event.preventDefault();

        const usernameInput = document.getElementById('username') as HTMLInputElement;
        const emailInput = document.getElementById('email') as HTMLInputElement;
        const passwordInput = document.getElementById('password') as HTMLInputElement;
        const userTypeSelect = document.getElementById('usertype') as HTMLSelectElement;

        const signupData: SignupData = {
            username: usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            userType: userTypeSelect.value
        };

        const signup = new Signup(signupData);
        await signup.submitForm();
    });
});
