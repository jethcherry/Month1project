class User {
    constructor(id, username, email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }
}
class UserService {
    constructor(formId) {
        this.postUser = (user) => {
            return fetch('http://localhost:3000/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
                .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add user to the database');
                }
                console.log('User added successfully');
            })
                .catch(error => {
                console.error('Error adding user:', error);
                throw error;
            });
        };
        this.deleteUser = (userId) => {
            return fetch(`http://localhost:3000/user/${userId}`, {
                method: 'DELETE'
            })
                .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete user');
                }
                console.log('User deleted successfully');
            })
                .catch(error => {
                console.error('Error deleting user:', error);
                throw error;
            });
        };
        this.updateUser = (user) => {
            return fetch(`http://localhost:3000/user/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
                .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update user');
                }
                console.log('User updated successfully');
            })
                .catch(error => {
                console.error('Error updating user:', error);
                throw error;
            });
        };
        this.getUsers = () => {
            return fetch('http://localhost:3000/users')
                .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch users from the database');
                }
                return response.json();
            })
                .catch(error => {
                console.error('Error fetching users from the database:', error);
                throw error;
            });
        };
        this.resetForm = () => {
            const userId = document.getElementById('number');
            const username = document.getElementById('user-username');
            const email = document.getElementById('user-email');
            if (!userId || !username || !email) {
                console.error('Form elements not found');
                return;
            }
            userId.value = '';
            username.value = '';
            email.value = '';
        };
        this.displayUsers = (users) => {
            const userList = document.getElementById('user-list');
            if (!userList) {
                console.error('User list element not found');
                return;
            }
            userList.innerHTML = '';
            users.forEach(user => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
        ID: ${user.id}, Username: ${user.username}, Email: ${user.email}
        <button class="delete-btn" data-id="${user.id}">Delete</button>
        <button class="update-btn" data-id="${user.id}">Update</button>
      `;
                userList.appendChild(listItem);
            });
            this.addEventListeners();
        };
        this.handleSubmission = (event) => {
            event.preventDefault();
            const userIdInput = document.getElementById('number');
            const usernameInput = document.getElementById('user-username');
            const emailInput = document.getElementById('user-email');
            const userId = parseInt(userIdInput.value);
            const username = usernameInput.value.trim();
            const email = emailInput.value.trim();
            if (!userId || !username || !email) {
                alert('Please fill in all fields');
                return;
            }
            const newUser = new User(userId, username, email);
            this.postUser(newUser)
                .then(() => {
                this.resetForm();
                return this.getUsers();
            })
                .then(users => {
                this.displayUsers(users);
            })
                .catch(error => {
                console.error('Error adding user to the database:', error);
            });
        };
        this.handleDelete = (event) => {
            const target = event.target;
            if (target.classList.contains('delete-btn')) {
                const userId = parseInt(target.getAttribute('data-id'));
                this.deleteUser(userId)
                    .then(() => this.getUsers())
                    .then(users => this.displayUsers(users))
                    .catch(error => console.error('Error deleting user:', error));
            }
        };
        this.handleUpdate = (event) => {
            const target = event.target;
            if (target.classList.contains('update-btn')) {
                const userId = parseInt(target.getAttribute('data-id'));
                const username = prompt('Enter new username:');
                const email = prompt('Enter new email:');
                if (username && email) {
                    const updatedUser = new User(userId, username, email);
                    this.updateUser(updatedUser)
                        .then(() => this.getUsers())
                        .then(users => this.displayUsers(users))
                        .catch(error => console.error('Error updating user:', error));
                }
            }
        };
        this.addEventListeners = () => {
            const userList = document.getElementById('user-list');
            if (userList) {
                userList.addEventListener('click', (event) => {
                    const target = event.target;
                    if (target.classList.contains('delete-btn')) {
                        this.handleDelete(event);
                    }
                    else if (target.classList.contains('update-btn')) {
                        this.handleUpdate(event);
                    }
                });
            }
        };
        this.initialize = () => {
            const form = document.getElementById(this.formId);
            if (!form) {
                console.error('Form element not found');
                return;
            }
            form.addEventListener('submit', this.handleSubmission);
            this.getUsers()
                .then(users => {
                this.displayUsers(users);
            })
                .catch(error => {
                console.error('Error fetching users:', error);
            });
        };
        this.formId = formId;
    }
}
const userManager = new UserService('form');
userManager.initialize();
class Tour {
    constructor(name, destination, price) {
        this.name = name;
        this.destination = destination;
        this.price = price;
    }
}
class TourManager {
    constructor(formId) {
        this.postTour = (tour) => {
            return fetch('http://localhost:3000/tours', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tour)
            })
                .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add tour to the database');
                }
                console.log('Tour added successfully to the database');
            })
                .catch(error => {
                console.error('Error adding tour to the database:', error);
                throw error;
            });
        };
        this.resetForm = () => {
            const tourNameInput = document.getElementById('tour-name');
            const tourDestinationInput = document.getElementById('tour-destination');
            const tourPriceInput = document.getElementById('tour-price');
            if (!tourNameInput || !tourDestinationInput || !tourPriceInput) {
                console.error('Form elements not found');
                return;
            }
            tourNameInput.value = '';
            tourDestinationInput.value = '';
            tourPriceInput.value = '';
        };
        this.handleSubmission = (event) => {
            event.preventDefault();
            const tourName = document.getElementById('tour-name');
            const tourDestination = document.getElementById('tour-destination');
            const tourPriceInput = document.getElementById('tour-price');
            const name = tourName.value.trim();
            const destination = tourDestination.value.trim();
            const price = parseFloat(tourPriceInput.value);
            if (!name || !destination || !price) {
                alert('Please fill in all fields');
                return;
            }
            const newTour = new Tour(name, destination, price);
            this.postTour(newTour)
                .then(() => {
                this.resetForm();
                location.reload();
            })
                .catch(error => {
                console.error('Error adding tour to the database:', error);
            });
        };
        this.initialize = () => {
            const form = document.getElementById(this.formId);
            if (!form) {
                console.error('Form element not found');
                return;
            }
            form.addEventListener('submit', this.handleSubmission);
        };
        this.formId = formId;
    }
}
const tourManager = new TourManager('tour-form');
tourManager.initialize();
class Booking {
    constructor(hotelId, user, hotel, date) {
        this.hotelId = hotelId;
        this.user = user;
        this.hotel = hotel;
        this.date = date;
    }
}
class BookingManager {
    constructor(formId) {
        this.postBooking = (booking) => {
            console.log('Posting booking:', booking);
            return fetch('http://localhost:3000/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(booking)
            })
                .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add booking to the database');
                }
                console.log('Booking added successfully to the database');
            })
                .catch(error => {
                console.error('Error adding booking to the database:', error);
                throw error;
            });
        };
        this.resetForm = () => {
            const hotelId = document.getElementById('hotel-id');
            const userInput = document.getElementById('user');
            const hotelInput = document.getElementById('hotel');
            const dateInput = document.getElementById('date');
            if (!hotelId || !userInput || !hotelInput || !dateInput) {
                console.error('Form elements not found');
                return;
            }
            hotelId.value = '';
            userInput.value = '';
            hotelInput.value = '';
            dateInput.value = '';
        };
        this.handleSubmission = (event) => {
            event.preventDefault();
            const hotelIdInput = document.getElementById('hotel-id');
            const userInput = document.getElementById('user');
            const hotelInput = document.getElementById('hotel');
            const dateInput = document.getElementById('date');
            console.log('Form values:', {
                hotelId: hotelIdInput.value,
                user: userInput.value,
                hotel: hotelInput.value,
                date: dateInput.value
            });
            const hotelId = parseInt(hotelIdInput.value);
            const user = userInput.value.trim();
            const hotel = hotelInput.value.trim();
            const date = dateInput.value;
            if (!hotelId || !user || !hotel || !date) {
                alert('Please fill in all fields');
                return;
            }
            const newBooking = new Booking(hotelId, user, hotel, date);
            this.postBooking(newBooking)
                .then(() => {
                this.resetForm();
                window.location.reload();
            })
                .catch(error => {
                console.error('Error adding booking to the database:', error);
            });
        };
        this.initialize = () => {
            const form = document.getElementById(this.formId);
            if (!form) {
                console.error('Form element not found');
                return;
            }
            form.addEventListener('submit', this.handleSubmission);
        };
        this.formId = formId;
    }
}
const bookingManager = new BookingManager('booking-form');
bookingManager.initialize();
