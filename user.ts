class UserBooking {
    private formId: string;

    constructor(formId: string) {
        this.formId = formId;
    }

    private postBooking = async (booking: any): Promise<void> => {
        try {
            const response = await fetch('http://localhost:3000/user-bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(booking)
            });

            if (!response.ok) {
                throw new Error('Failed to add booking to the database');
            }

            console.log('Booking added successfully to the database');
        } catch (error) {
            console.error('Error adding booking to the database:', error);
            throw error;
        }
    }

    private resetForm = (): void => {
        const form = document.getElementById(this.formId) as HTMLFormElement;
        form.reset();
    }

    private handleButtonClick = (): void => {
        const form = document.getElementById(this.formId) as HTMLFormElement;

        const bookingData = {
            bookingType: (form.querySelector('input[name="booking-type"]:checked') as HTMLInputElement).value,
            hotelName: (form.querySelector('#hotel-name') as HTMLInputElement).value,
            tourName: (form.querySelector('#tour-name') as HTMLInputElement).value,
            checkIn: (form.querySelector('#check-in') as HTMLInputElement).value,
            checkOut: (form.querySelector('#check-out') as HTMLInputElement).value,
            roomType: (form.querySelector('#room-type') as HTMLSelectElement).value,
            guests: parseInt((form.querySelector('#guests') as HTMLInputElement).value, 10)
        };

        this.postBooking(bookingData)
            .then(() => {
                this.resetForm();
                console.log('Booking submitted successfully!');
            })
            .catch(error => {
                console.error('Error submitting booking:', error);
            });
    }

    public initialize = (): void => {
        const button = document.getElementById('submit-button');
        if (!button) {
            console.error('Button element not found');
            return;
        }
        button.addEventListener('click', this.handleButtonClick);
    }
}

const userBookingManager = new UserBooking('booking-form');
userBookingManager.initialize();


class TourBooking {
    private toursContainerId: string;

    constructor(toursContainerId: string) {
        this.toursContainerId = toursContainerId;
    }

    private calculateAmount = (tourName: string): number => {
        // Assuming each tour has a fixed price for simplicity
        const tourPrices: { [key: string]: number } = {
            "Adventure Trek in the Himalayas": 500,
            "Safari Adventure in Serengeti": 700,
            "Island Hopping in Greece": 600,
            "Cultural Tour in Japan": 800,
            "Road Trip Across Route 66": 1000,
            "Wildlife Photography Safari in Africa": 900
        };

        // Retrieve the price based on the tour name
        return tourPrices[tourName] || 0;
    }

    private handleBookNowClick = (tourName: string): void => {
        const amount = this.calculateAmount(tourName);
        const message = `You need to pay $${amount} for the tour "${tourName}".`;
        console.log(message);
        // Display the message wherever appropriate in your UI
    }

    public initialize = (): void => {
        const tourButtons = document.querySelectorAll(`#${this.toursContainerId} .tour button`);
        tourButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tourElement = button.parentElement;
                if (tourElement) {
                    const tourNameElement = tourElement.querySelector('h3');
                    const tourName = tourNameElement?.textContent;
                    if (tourName) {
                        this.handleBookNowClick(tourName);
                    }
                }
            });
        });
    }
}

const tourBookingManager = new TourBooking('tours');
tourBookingManager.initialize();
