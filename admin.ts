class User {
  id: number;
  username: string;
  email: string;

  constructor(id: number, username: string, email: string) {
    this.id = id;
    this.username = username;
    this.email = email;
  }
}

class UserService {
  private formId: string;

  constructor(formId: string) {
    this.formId = formId;
  }

  private postUser = (user: User): Promise<void> => {
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
  }

  private deleteUser = (userId: number): Promise<void> => {
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
  }

  private updateUser = (user: User): Promise<void> => {
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
  }

  private getUsers = (): Promise<User[]> => {
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
  }

  private resetForm = (): void => {
    const userId = document.getElementById('number') as HTMLInputElement;
    const username = document.getElementById('user-username') as HTMLInputElement;
    const email = document.getElementById('user-email') as HTMLInputElement;

    if (!userId || !username || !email) {
      console.error('Form elements not found');
      return;
    }

    userId.value = '';
    username.value = '';
    email.value = '';
  }

  private displayUsers = (users: User[]): void => {
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
  }

  private handleSubmission = (event: Event): void => {
    event.preventDefault();

    const userIdInput = document.getElementById('number') as HTMLInputElement;
    const usernameInput = document.getElementById('user-username') as HTMLInputElement;
    const emailInput = document.getElementById('user-email') as HTMLInputElement;

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
  }

  private handleDelete = (event: Event): void => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('delete-btn')) {
      const userId = parseInt(target.getAttribute('data-id')!);
      this.deleteUser(userId)
      .then(() => this.getUsers())
      .then(users => this.displayUsers(users))
      .catch(error => console.error('Error deleting user:', error));
    }
  }

  private handleUpdate = (event: Event): void => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('update-btn')) {
      const userId = parseInt(target.getAttribute('data-id')!);
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
  }

  private addEventListeners = (): void => {
    const userList = document.getElementById('user-list');
    if (userList) {
      userList.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('delete-btn')) {
          this.handleDelete(event);
        } else if (target.classList.contains('update-btn')) {
          this.handleUpdate(event);
        }
      });
    }
  }

  public initialize = (): void => {
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
  }
}

const userManager = new UserService('form');
userManager.initialize();




class Tour {
  name: string;
  destination: string;
  price: number;

  constructor(name: string, destination: string, price: number) {
    this.name = name;
    this.destination = destination;
    this.price = price;
  }
}

class TourManager {
  private formId: string;

  constructor(formId: string) {
    this.formId = formId;
  }

  private postTour = (tour: Tour): Promise<void> => {
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
  }

  private resetForm = (): void => {
    const tourNameInput = document.getElementById('tour-name') as HTMLInputElement;
    const tourDestinationInput = document.getElementById('tour-destination') as HTMLInputElement;
    const tourPriceInput = document.getElementById('tour-price') as HTMLInputElement;

    if (!tourNameInput || !tourDestinationInput || !tourPriceInput) {
      console.error('Form elements not found');
      return;
    }

    tourNameInput.value = '';
    tourDestinationInput.value = '';
    tourPriceInput.value = '';
  }

  private handleSubmission = (event: Event): void => {
    event.preventDefault();

    const tourName = document.getElementById('tour-name') as HTMLInputElement;
    const tourDestination = document.getElementById('tour-destination') as HTMLInputElement;
    const tourPriceInput = document.getElementById('tour-price') as HTMLInputElement;

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
  }

  public initialize = (): void => {
    const form = document.getElementById(this.formId);
    if (!form) {
      console.error('Form element not found');
      return;
    }
    form.addEventListener('submit', this.handleSubmission);
  }
}

const tourManager = new TourManager('tour-form');
tourManager.initialize();








class Booking {
  hotelId: number;
  user: string;
  hotel: string;
  date: string;

  constructor(hotelId: number, user: string, hotel: string, date: string) {
    this.hotelId = hotelId;
    this.user = user;
    this.hotel = hotel;
    this.date = date;
  }
}

class BookingManager {
  private formId: string;

  constructor(formId: string) {
    this.formId = formId;
  }

  private postBooking = (booking: Booking): Promise<void> => {
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
  }

  private resetForm = (): void => {
    const hotelId = document.getElementById('hotel-id') as HTMLInputElement;
    const userInput = document.getElementById('user') as HTMLInputElement;
    const hotelInput = document.getElementById('hotel') as HTMLInputElement;
    const dateInput = document.getElementById('date') as HTMLInputElement;

    if (!hotelId || !userInput || !hotelInput || !dateInput) {
      console.error('Form elements not found');
      return;
    }

    hotelId.value = '';
    userInput.value = '';
    hotelInput.value = '';
    dateInput.value = '';
  }

  private handleSubmission = (event: Event): void => {
    event.preventDefault();

    const hotelIdInput = document.getElementById('hotel-id') as HTMLInputElement;
    const userInput = document.getElementById('user') as HTMLInputElement;
    const hotelInput = document.getElementById('hotel') as HTMLInputElement;
    const dateInput = document.getElementById('date') as HTMLInputElement;

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
  }

  public initialize = (): void => {
    const form = document.getElementById(this.formId);
    if (!form) {
      console.error('Form element not found');
      return;
    }
    form.addEventListener('submit', this.handleSubmission);
  }
}

const bookingManager = new BookingManager('booking-form');
bookingManager.initialize();
