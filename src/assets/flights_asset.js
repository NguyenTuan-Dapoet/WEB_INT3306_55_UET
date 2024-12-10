// fake data của các chuyến bay
export const flights = [
    {
        _id: "flight_001",
        flightNumber: "VN123",
        originAirportId: {
            _id: "airport_001",
            name: "Tan Son Nhat International Airport",
            code: "SGN",
            location: "Ho Chi Minh City, Vietnam",
        },
        destinationAirportId: {
            _id: "airport_002",
            name: "Noi Bai International Airport",
            code: "HAN",
            location: "Hanoi, Vietnam",
        },
        departureDateTime: "2024-12-05T10:00:00Z",
        destinationArrivalDateTime: "2024-12-05T12:00:00Z",
        price: {
            economy: { base: 100 },
            business: { base: 300 },
            firstClass: { base: 500 },
        },
        seats: [
            { class: "economy", availability: true },
            { class: "economy", availability: true },
            { class: "business", availability: true },
            { class: "firstClass", availability: false },
        ],
        stopovers: [
            {
                airlineId: {
                    _id: "airline_001",
                    name: "Vietnam Airlines",
                },
                airplaneId: {
                    _id: "airplane_001",
                    model: "Airbus A321",
                },
            },
        ],
        reviews: [
            { rating: 4, comment: "Good service!" },
            { rating: 5, comment: "Very comfortable seats." },
        ],
        totalReviews: 2,
        rating: "4.5",
        ratingScale: "Excellent",
        flightClass: "economy",
        liked: false,
        timezone: "UTC",
    },

    {
        _id: "flight_002",
        flightNumber: "VN456",
        originAirportId: {
            _id: "airport_003",
            name: "Da Nang International Airport",
            code: "DAD",
            location: "Da Nang, Vietnam",
        },
        destinationAirportId: {
            _id: "airport_004",
            name: "Changi Airport",
            code: "SIN",
            location: "Singapore",
        },
        departureDateTime: "2024-12-06T15:00:00Z",
        destinationArrivalDateTime: "2024-12-06T18:00:00Z",
        price: {
            economy: { base: 120 },
            business: { base: 350 },
            firstClass: { base: 600 },
        },
        seats: [
            { class: "economy", availability: true },
            { class: "economy", availability: false },
            { class: "business", availability: true },
            { class: "firstClass", availability: true },
        ],
        stopovers: [
            {
                airlineId: {
                    _id: "airline_002",
                    name: "Singapore Airlines",
                },
                airplaneId: {
                    _id: "airplane_002",
                    model: "Boeing 787",
                },
            },
        ],
        reviews: [
            { rating: 5, comment: "Exceptional service!" },
            { rating: 4, comment: "Food could be better." },
            { rating: 5, comment: "Highly recommended." },
        ],
        totalReviews: 3,
        rating: "4.7",
        ratingScale: "Excellent",
        flightClass: "business",
        liked: true,
        timezone: "UTC",
    },

    {
        _id: "flight_003",
        flightNumber: "VN789",
        originAirportId: {
            _id: "airport_005",
            name: "Los Angeles International Airport",
            code: "LAX",
            location: "Los Angeles, USA",
        },
        destinationAirportId: {
            _id: "airport_006",
            name: "Tokyo Narita Airport",
            code: "NRT",
            location: "Tokyo, Japan",
        },
        departureDateTime: "2024-12-07T08:00:00Z",
        destinationArrivalDateTime: "2024-12-07T20:00:00Z",
        price: {
            economy: { base: 700 },
            business: { base: 1200 },
            firstClass: { base: 2500 },
        },
        seats: [
            { class: "economy", availability: true },
            { class: "economy", availability: true },
            { class: "business", availability: false },
            { class: "firstClass", availability: true },
        ],
        stopovers: [
            {
                airlineId: {
                    _id: "airline_003",
                    name: "ANA All Nippon Airways",
                },
                airplaneId: {
                    _id: "airplane_003",
                    model: "Boeing 777",
                },
            },
        ],
        reviews: [
            { rating: 5, comment: "Top-notch experience!" },
            { rating: 4, comment: "Great legroom." },
            { rating: 5, comment: "Perfect for long flights." },
        ],
        totalReviews: 3,
        rating: "4.8",
        ratingScale: "Outstanding",
        flightClass: "firstClass",
        liked: false,
        timezone: "UTC",
    },


    {
        _id: "flight_004",
        flightNumber: "VN123",
        originAirportId: {
            _id: "airport_001",
            name: "Tan Son Nhat International Airport",
            code: "SGN",
            location: "Ho Chi Minh City, Vietnam",
        },
        destinationAirportId: {
            _id: "airport_002",
            name: "Noi Bai International Airport",
            code: "HAN",
            location: "Hanoi, Vietnam",
        },
        departureDateTime: "2024-12-05T10:00:00Z",
        destinationArrivalDateTime: "2024-12-05T12:00:00Z",
        price: {
            economy: { base: 100 },
            business: { base: 300 },
            firstClass: { base: 500 },
        },
        seats: [
            { class: "economy", availability: true },
            { class: "economy", availability: true },
            { class: "business", availability: true },
            { class: "firstClass", availability: false },
        ],
        stopovers: [
            {
                airlineId: {
                    _id: "airline_001",
                    name: "Vietnam Airlines",
                },
                airplaneId: {
                    _id: "airplane_001",
                    model: "Airbus A321",
                },
            },
        ],
        reviews: [
            { rating: 4, comment: "Good service!" },
            { rating: 5, comment: "Very comfortable seats." },
        ],
        totalReviews: 2,
        rating: "4.5",
        ratingScale: "Excellent",
        flightClass: "economy",
        liked: false,
        timezone: "UTC",
    },


    {
        _id: "flight_005",
        flightNumber: "VN123",
        originAirportId: {
            _id: "airport_001",
            name: "Tan Son Nhat International Airport",
            code: "SGN",
            location: "Ho Chi Minh City, Vietnam",
        },
        destinationAirportId: {
            _id: "airport_002",
            name: "Noi Bai International Airport",
            code: "HAN",
            location: "Hanoi, Vietnam",
        },
        departureDateTime: "2024-12-05T10:00:00Z",
        destinationArrivalDateTime: "2024-12-05T12:00:00Z",
        price: {
            economy: { base: 100 },
            business: { base: 300 },
            firstClass: { base: 500 },
        },
        seats: [
            { class: "economy", availability: true },
            { class: "economy", availability: true },
            { class: "business", availability: true },
            { class: "firstClass", availability: false },
        ],
        stopovers: [
            {
                airlineId: {
                    _id: "airline_001",
                    name: "Vietnam Airlines",
                },
                airplaneId: {
                    _id: "airplane_001",
                    model: "Airbus A321",
                },
            },
        ],
        reviews: [
            { rating: 4, comment: "Good service!" },
            { rating: 5, comment: "Very comfortable seats." },
        ],
        totalReviews: 2,
        rating: "4.5",
        ratingScale: "Excellent",
        flightClass: "economy",
        liked: false,
        timezone: "UTC",
    },

    {
        _id: "flight_004",
        flightNumber: "VN123",
        originAirportId: {
            _id: "airport_001",
            name: "Tan Son Nhat International Airport",
            code: "SGN",
            location: "Ho Chi Minh City, Vietnam",
        },
        destinationAirportId: {
            _id: "airport_002",
            name: "Noi Bai International Airport",
            code: "HAN",
            location: "Hanoi, Vietnam",
        },
        departureDateTime: "2024-12-05T10:00:00Z",
        destinationArrivalDateTime: "2024-12-05T12:00:00Z",
        price: {
            economy: { base: 100 },
            business: { base: 300 },
            firstClass: { base: 500 },
        },
        seats: [
            { class: "economy", availability: true },
            { class: "economy", availability: true },
            { class: "business", availability: true },
            { class: "firstClass", availability: false },
        ],
        stopovers: [
            {
                airlineId: {
                    _id: "airline_001",
                    name: "Vietnam Airlines",
                },
                airplaneId: {
                    _id: "airplane_001",
                    model: "Airbus A321",
                },
            },
        ],
        reviews: [
            { rating: 4, comment: "Good service!" },
            { rating: 5, comment: "Very comfortable seats." },
        ],
        totalReviews: 2,
        rating: "4.5",
        ratingScale: "Excellent",
        flightClass: "economy",
        liked: false,
        timezone: "UTC",
    },


    {
        _id: "flight_004",
        flightNumber: "VN123",
        originAirportId: {
            _id: "airport_001",
            name: "Tan Son Nhat International Airport",
            code: "SGN",
            location: "Ho Chi Minh City, Vietnam",
        },
        destinationAirportId: {
            _id: "airport_002",
            name: "Noi Bai International Airport",
            code: "HAN",
            location: "Hanoi, Vietnam",
        },
        departureDateTime: "2024-12-05T10:00:00Z",
        destinationArrivalDateTime: "2024-12-05T12:00:00Z",
        price: {
            economy: { base: 100 },
            business: { base: 300 },
            firstClass: { base: 500 },
        },
        seats: [
            { class: "economy", availability: true },
            { class: "economy", availability: true },
            { class: "business", availability: true },
            { class: "firstClass", availability: false },
        ],
        stopovers: [
            {
                airlineId: {
                    _id: "airline_001",
                    name: "Vietnam Airlines",
                },
                airplaneId: {
                    _id: "airplane_001",
                    model: "Airbus A321",
                },
            },
        ],
        reviews: [
            { rating: 4, comment: "Good service!" },
            { rating: 5, comment: "Very comfortable seats." },
        ],
        totalReviews: 2,
        rating: "4.5",
        ratingScale: "Excellent",
        flightClass: "economy",
        liked: false,
        timezone: "UTC",
    },
];