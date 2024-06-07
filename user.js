var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class UserBooking {
    constructor(formId) {
        this.postBooking = (booking) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('http://localhost:3000/user-bookings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(booking)
                });
                if (!response.ok) {
                    throw new Error('Failed to add booking to the database');
                }
                console.log('Booking added successfully to the database');
            }
            catch (error) {
                console.error('Error adding booking to the database:', error);
                throw error;
            }
        });
        this.resetForm = () => {
            const form = document.getElementById(this.formId);
            form.reset();
        };
        this.handleButtonClick = () => {
            const form = document.getElementById(this.formId);
            const bookingData = {
                bookingType: form.querySelector('input[name="booking-type"]:checked').value,
                hotelName: form.querySelector('#hotel-name').value,
                tourName: form.querySelector('#tour-name').value,
                checkIn: form.querySelector('#check-in').value,
                checkOut: form.querySelector('#check-out').value,
                roomType: form.querySelector('#room-type').value,
                guests: parseInt(form.querySelector('#guests').value, 10)
            };
            this.postBooking(bookingData)
                .then(() => {
                this.resetForm();
                console.log('Booking submitted successfully!');
            })
                .catch(error => {
                console.error('Error submitting booking:', error);
            });
        };
        this.initialize = () => {
            const button = document.getElementById('submit-button');
            if (!button) {
                console.error('Button element not found');
                return;
            }
            button.addEventListener('click', this.handleButtonClick);
        };
        this.formId = formId;
    }
}
const userBookingManager = new UserBooking('booking-form');
userBookingManager.initialize();
class TourBooking {
    constructor(toursContainerId) {
        this.calculateAmount = (tourName) => {
            // Assuming each tour has a fixed price for simplicity
            const tourPrices = {
                "Adventure Trek in the Himalayas": 500,
                "Safari Adventure in Serengeti": 700,
                "Island Hopping in Greece": 600,
                "Cultural Tour in Japan": 800,
                "Road Trip Across Route 66": 1000,
                "Wildlife Photography Safari in Africa": 900
            };
            // Retrieve the price based on the tour name
            return tourPrices[tourName] || 0;
        };
        this.handleBookNowClick = (tourName) => {
            const amount = this.calculateAmount(tourName);
            const message = `You need to pay $${amount} for the tour "${tourName}".`;
            console.log(message);
            // Display the message wherever appropriate in your UI
        };
        this.initialize = () => {
            const tourButtons = document.querySelectorAll(`#${this.toursContainerId} .tour button`);
            tourButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const tourElement = button.parentElement;
                    if (tourElement) {
                        const tourNameElement = tourElement.querySelector('h3');
                        const tourName = tourNameElement === null || tourNameElement === void 0 ? void 0 : tourNameElement.textContent;
                        if (tourName) {
                            this.handleBookNowClick(tourName);
                        }
                    }
                });
            });
        };
        this.toursContainerId = toursContainerId;
    }
}
const tourBookingManager = new TourBooking('tours');
tourBookingManager.initialize();
