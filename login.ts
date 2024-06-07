interface LoginData {
    username: string;
    password: string;
    userType: string;
}

class Login {
    private username: string;
    private password: string;
    private userType: string;

    constructor(data: LoginData) {
        this.username = data.username;
        this.password = data.password;
        this.userType = data.userType;
    }

    public validateInputs(): boolean {
        if (!this.username || !this.password || !this.userType) {
            alert("All fields are required.");
            return false;
        }
        return true;
    }

    public async submitForm(): Promise<void> {
        if (this.validateInputs()) {
            try {
                const url = this.userType === 'user' ? 'http://localhost:3000/users' : 'http://localhost:3000/admin';
                const response = await fetch(url, {
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
                    const userData = await response.json();
                    const foundUser = userData.find((user: any) => user.username === this.username && user.password === this.password);
                    if (foundUser) {
                        alert("Login successful!");
                        if (this.userType === "admin") {
                            window.location.href = "/admin.html";
                        } else {
                            window.location.href = "/user.html"; 
                        }
                    } else {
                        alert("Invalid username or password.");
                    }
                } else {
                    alert("Login failed!");
                }
            } catch (error) {
                console.error('Error:', error);
                alert("An error occurred during login.");
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    loginForm?.addEventListener('submit', async (event) => {
        event.preventDefault();

        const usernameInput = document.getElementById('username') as HTMLInputElement;
        const passwordInput = document.getElementById('password') as HTMLInputElement;
        const userTypeInput = document.querySelector('input[name="usertype"]:checked') as HTMLInputElement;

        const loginData: LoginData = {
            username: usernameInput.value,
            password: passwordInput.value,
            userType: userTypeInput?.value || ""
        };

        const login = new Login(loginData);
        await login.submitForm();
    });
});
