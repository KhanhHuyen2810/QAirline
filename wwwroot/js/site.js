// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function toggleContent() {
    const oneWayContent = document.getElementById('one-way-content');
    const roundTripContent = document.getElementById('round-trip-content');

    if (document.querySelector('input[name="trip-type"]:checked').value === 'one-way') {
        oneWayContent.classList.remove('hidden');
        roundTripContent.classList.add('hidden');
    } else {
        oneWayContent.classList.add('hidden');
        roundTripContent.classList.remove('hidden');
    }
}

const hotlineLink = document.getElementById("hotlineLink");
const hotlineBox = document.getElementById("hotlineBox"); 
const overlay_service = document.getElementById("overlay_service");
const closeButton = document.getElementById("closeButton");

hotlineLink.addEventListener("click", (e) => {
    e.preventDefault();
    hotlineBox.classList.remove("hidden");
    overlay_service.classList.remove("hidden");
    setTimeout(function () {
        hotlineBox.classList.add('show');
    }, 10);
});

closeButton.addEventListener("click", () => {
    hotlineBox.classList.add("hidden");
    overlay_service.classList.add("hidden");
    hotlineBox.classList.remove('show');
    setTimeout(function () {
        hotlineBox.classList.add('hidden');
    }, 500);
});

overlay_service.addEventListener("click", () => {
    hotlineBox.classList.add("hidden");
    overlay_service.classList.add("hidden");
    hotlineBox.classList.remove('show');
    setTimeout(function () {
        hotlineBox.classList.add('hidden');
    }, 500);
});

const dropdownMenuButton = document.getElementById("dropdownMenuButton");
const logoutBox = document.getElementById("logoutBox");
const overlay_logout = document.getElementById("overlay_logout");
const cancelButton = document.getElementById("cancelButton");

dropdownMenuButton.addEventListener("click", (e) => {
    e.preventDefault();
    logoutBox.classList.remove("hidden");
    overlay_logout.classList.remove("hidden");
    setTimeout(function () {
        logoutBox.classList.add('show');
    }, 10);
});

cancelButton.addEventListener("click", () => {
    logoutBox.classList.add("hidden");
    overlay_logout.classList.add("hidden");
    logoutBox.classList.remove('show');
    setTimeout(function () {
        logoutBox.classList.add('hidden');
    }, 500);
});

overlay_logout.addEventListener("click", () => {
    logoutBox.classList.add("hidden");
    overlay_logout.classList.add("hidden");
    logoutBox.classList.remove('show');
    setTimeout(function () {
        logoutBox.classList.add('hidden');
    }, 500);
});

document.addEventListener('click', function (event) {
    if (event.target.id === 'viewHomepageButton') {
        fetchCustomerData('https://localhost:7152', '#customer-body');
    } else if (event.target.id === 'viewBookingButton') {
        fetchCustomerData('/Home/BookingPage', '#customer-body');
    } else if (event.target.id === 'viewAirportsButton') {
        fetchCustomerData('/Home/AirportDetail', '#customer-body');
        fetchAirports();
    } else if (event.target.id === 'viewNewsButton') {
        fetchCustomerData('/Home/NewsPage', '#customer-body');
    }
    else if (event.target.id === 'viewTicketButton') {
        fetchCustomerData('/Home/BookedTicket', '#customer-body');
    }    
    else if (event.target.id === 'signUpButton' || event.target.id === 'signupButton') {
        fetchCustomerData('/Home/LogIn', '#customer-body');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const token = sessionStorage.getItem("token");
    if (token) {
        fetchHeader(token);
    }
});

async function fetchCustomerData(url, containerSelector) {
    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Fetch không thành công:", errorText);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const html = await response.text();

        document.querySelector(containerSelector).innerHTML = html;

        window.history.pushState({}, '', url);
    }
    catch (error) {
        alert("Error");
        console.log('Fetch error:', error)
    }
}

async function fetchAirports() {
    try {
        const response = await fetch('https://localhost:7152/api/Airport');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const airports = await response.json();
        displayAirports(airports);
    } catch (error) {
        console.error('Failed to fetch airports:', error);
        alert('Có lỗi xảy ra khi lấy danh sách sân bay.');
    }
}
function displayAirports(airports) {
    const airportTableBody = document.getElementById('airportTable').getElementsByTagName('tbody')[0];

    airportTableBody.innerHTML = '';

    airports.forEach(airport => {
        const row = airportTableBody.insertRow();
        row.insertCell(0).textContent = airport.Name;
        row.insertCell(1).textContent = airport.Location;
        row.insertCell(2).textContent = airport.IATACode;
        row.insertCell(3).textContent = airport.ICAOCode;
        row.insertCell(4).textContent = airport.Type;
    });
}
function SubmitDone() {
    var p = true;

    document.getElementById("no_name").innerHTML = "";
    document.getElementById("no_numberphone").innerHTML = "";
    document.getElementById("no_username").innerHTML = "";
    document.getElementById("no_pass").innerHTML = "";
    document.getElementById("no_cfpass").innerHTML = "";

    if (document.getElementById("name").value == "") {
        document.getElementById("no_name").innerHTML = "Nhập họ tên của bạn";
        document.getElementById("name").focus();
        p = false;
    }

    if (document.getElementById("numberphone").value == "") {
        document.getElementById("no_numberphone").innerHTML = "Nhập số điện thoại";
        document.getElementById("numberphone").focus();
        p = false;
    }

    if (document.getElementById("dateofbirth").value == "") {
        document.getElementById("no_date").innerHTML = "Vui lòng chọn ngày sinh";
        document.getElementById("dateofbirth").focus();
        p = false;
    }

    if (document.getElementById("username").value == "") {
        document.getElementById("no_username").innerHTML = "Nhập tên đăng nhập";
        document.getElementById("username").focus();
        p = false;
    }

    if (document.getElementById("password").value == "") {
        document.getElementById("no_pass").innerHTML = "Nhập mật khẩu";
        document.getElementById("password").focus();
        p = false;
    }

    if (document.getElementById("re_pass").value == "") {
        document.getElementById("no_cfpass").innerHTML = "Nhập lại mật khẩu";
        document.getElementById("re_pass").focus();
        p = false;
    } else if (document.getElementById("re_pass").value !== document.getElementById("password").value) {
        document.getElementById("no_cfpass").innerHTML = "Mật khẩu chưa trùng khớp";
        document.getElementById("re_pass").focus();
        p = false;
    }

    return p;
}
//Open_close pop -up
function ModalSignin(element) {
    this.element = element;
    this.blocks = this.element.getElementsByClassName('js-signin-modal-block');
    this.switchers = this.element.getElementsByClassName('js-signin-modal-switcher')[0].getElementsByTagName('a');
    this.triggers = document.getElementsByClassName('js-signin-modal-trigger');
    this.hidePassword = this.element.getElementsByClassName('js-hide-password');
    this.init();
};

ModalSignin.prototype.init = function () {
    var self = this;
    //open modal/switch form
    for (var i = 0; i < this.triggers.length; i++) {
        (function (i) {
            self.triggers[i].addEventListener('click', function (event) {
                if (event.target.hasAttribute('data-signin')) {
                    event.preventDefault();
                    self.showSigninForm(event.target.getAttribute('data-signin'));
                }
            });
        })(i);
    }

    //close modal
    this.element.addEventListener('click', function (event) {
        if (hasClass(event.target, 'js-signin-modal') || hasClass(event.target, 'js-close')) {
            event.preventDefault();
            removeClass(self.element, 'cd-signin-modal--is-visible');
        }
    });
    //close modal when clicking the esc keyboard button
    document.addEventListener('keydown', function (event) {
        (event.which == '27') && removeClass(self.element, 'cd-signin-modal--is-visible');
    });

    // hide/show password
    for (var i = 0; i < this.hidePassword.length; i++) {
        (function (i) {
            self.hidePassword[i].addEventListener('click', function (event) {
                self.togglePassword(self.hidePassword[i]);
            });
        })(i);
    }

    var inputs = this.element.querySelectorAll('input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('focus', function (event) {
            self.toggleError(event.target, false); // remove error class
        });
    }

    //IMPORTANT - REMOVE THIS - it's just to show/hide error messages in the demo
    this.blocks[0].getElementsByTagName('form')[0].addEventListener('submit', function (event) {
        event.preventDefault();
        self.toggleError(document.getElementById('signin-email'), true);
    });
    this.blocks[0].getElementsByTagName('form')[0].addEventListener('submit', function (event) {
        event.preventDefault();
        self.toggleError(document.getElementById('signin-password'), true);
    });
};

ModalSignin.prototype.showSigninForm = function (type) {
    // show modal if not visible
    !hasClass(this.element, 'cd-signin-modal--is-visible') && addClass(this.element, 'cd-signin-modal--is-visible');
    // show selected form
    for (var i = 0; i < this.blocks.length; i++) {
        this.blocks[i].getAttribute('data-type') == type ? addClass(this.blocks[i], 'cd-signin-modal__block--is-selected') : removeClass(this.blocks[i], 'cd-signin-modal__block--is-selected');
    }
    //update switcher appearance
    var switcherType = (type == 'signup') ? 'signup' : 'login';
    for (var i = 0; i < this.switchers.length; i++) {
        this.switchers[i].getAttribute('data-type') == switcherType ? addClass(this.switchers[i], 'cd-selected') : removeClass(this.switchers[i], 'cd-selected');
    }
};

document.addEventListener('DOMContentLoaded', function () {
    // Lấy các input và span lỗi
    const emailInput = document.getElementById('signin-email');
    const passwordInput = document.getElementById('signin-password');
    const emailError = emailInput.nextElementSibling; // span thông báo lỗi của email
    const passwordError = passwordInput.nextElementSibling; // span thông báo lỗi của password

    // Hàm ẩn dòng cảnh báo
    function hideError(input, errorElement) {
        if (input.value.trim() !== '') {
            errorElement.classList.remove('cd-signin-modal__error--is-visible');
            input.classList.remove('cd-signin-modal__input--has-error');
        }
    }

    // Thêm sự kiện 'input' cho ô Tên đăng nhập
    emailInput.addEventListener('input', function () {
        hideError(emailInput, emailError);
    });

    // Thêm sự kiện 'input' cho ô Mật khẩu
    passwordInput.addEventListener('input', function () {
        hideError(passwordInput, passwordError);
    });

    // Xử lý khi nhấn nút "Đăng nhập"
    document.getElementById('loginForm').addEventListener('submit', function (e) {
        let valid = true;

        // Kiểm tra ô Tên đăng nhập
        if (emailInput.value.trim() === '') {
            emailError.classList.add('cd-signin-modal__error--is-visible');
            emailInput.classList.add('cd-signin-modal__input--has-error');
            valid = false;
        }

        // Kiểm tra ô Mật khẩu
        if (passwordInput.value.trim() === '') {
            passwordError.classList.add('cd-signin-modal__error--is-visible');
            passwordInput.classList.add('cd-signin-modal__input--has-error');
            valid = false;
        }

        // Ngăn form submit nếu có lỗi
        if (!valid) {
            e.preventDefault();
        }
    });
});


var signinModal = document.getElementsByClassName("js-signin-modal")[0];
if (signinModal) {
    new ModalSignin(signinModal);
}

// toggle main navigation on mobile
var mainNav = document.getElementsByClassName('js-main-nav')[0];
if (mainNav) {
    mainNav.addEventListener('click', function (event) {
        if (hasClass(event.target, 'js-main-nav')) {
            var navList = mainNav.getElementsByTagName('ul')[0];
            toggleClass(navList, 'cd-main-nav__list--is-visible', !hasClass(navList, 'cd-main-nav__list--is-visible'));
        }
    });
}

//class manipulations - needed if classList is not supported
function hasClass(el, className) {
    if (el.classList) return el.classList.contains(className);
    else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}
function addClass(el, className) {
    var classList = className.split(' ');
    if (el.classList) el.classList.add(classList[0]);
    else if (!hasClass(el, classList[0])) el.className += " " + classList[0];
    if (classList.length > 1) addClass(el, classList.slice(1).join(' '));
}
function removeClass(el, className) {
    var classList = className.split(' ');
    if (el.classList) el.classList.remove(classList[0]);
    else if (hasClass(el, classList[0])) {
        var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
    if (classList.length > 1) removeClass(el, classList.slice(1).join(' '));
}
function toggleClass(el, className, bool) {
    if (bool) addClass(el, className);
    else removeClass(el, className);
}
function putCursorAtEnd(el) {
    if (el.setSelectionRange) {
        var len = el.value.length * 2;
        el.focus();
        el.setSelectionRange(len, len);
    } else {
        el.value = el.value;
    }
}; 

// Gửi thông tin đăng nhập và nhận JWT token từ backend
document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const username = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;

    try {
        const response = await fetch('/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            if (response.status === 401) {
                alert("Tên đăng nhập hoặc mật khẩu không đúng.");
            } else {
                alert("Đăng nhập không thành công. Mã lỗi: " + response.status);
            }
            return;
        }

        const data = await response.json();
        const token = data.token;
        const role = data.role;

        sessionStorage.setItem("token", token);

        if (role === "Admin") {
            window.location.href = "/Admin/Dashboard";
        } else {
            fetchHeader(token);
            const loginPopup = document.getElementById('login-popup');
            loginPopup.style.display = 'none';
        }      
    } catch (error) {
        console.error("Error during login:", error);
        alert("Lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại.");
    }
});
function fetchHeader(token) {
    fetch('https://localhost:7152/Home/GetCustomerName', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        // Kiểm tra xem dữ liệu trả về có chứa customerName không
        if (data.customerName) {
            // Cập nhật nội dung HTML với customerName
            document.getElementById('dropdownMenuButton').innerText = `Xin chào, ${data.customerName}`;
            document.getElementById('dropdownMenuButton').title += `Xin chào, ${data.customerName}`;
            document.getElementById('login-signup').style.display = 'none';
            document.getElementById('dropdownMenuButton').style.display = 'flex';
        } else {
            document.getElementById('login-signup').style.display = 'flex';
            document.getElementById('dropdownMenuButton').style.display = 'none';
        }
    })
    .catch(error => {
        console.error('Error fetching customer name:', error);
    });
}

const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", () => {    
    sessionStorage.removeItem("token");
    logoutBox.classList.add("hidden");
    overlay_logout.classList.add("hidden");
    logoutBox.classList.remove('show');
    window.location.href = "https://localhost:7152";
});

function getFlight() {
    loadDepartures();
    loadDestinations();
}

async function loadDepartures() {
    const response = await fetch("/api/FlightSelection/departures");
    const departures = await response.json();

    const departureSelect = document.getElementById("flight-departure");
    departures.forEach(departure => {
        const option = document.createElement("option");
        option.value = departure;
        option.textContent = departure;
        departureSelect.appendChild(option);
    });
}

async function loadDestinations() {
    const response = await fetch("/api/FlightSelection/destinations");
    const destinations = await response.json();

    const destinationSelect = document.getElementById("flight-destination");
    destinations.forEach(destination => {
        const option = document.createElement("option");
        option.value = destination;
        option.textContent = destination;
        destinationSelect.appendChild(option);
    });
}

async function searchFlights() {
    const departure = document.getElementById("flight-departure").value;
    const destination = document.getElementById("flight-destination").value;
    const date = document.getElementById("flight-date").value;

    const response = await fetch(`/api/FlightSelection/search?departure=${departure}&destination=${destination}&date=${date}`);
    const flights = await response.json();
    console.log(flights);

    displayFlights(flights);
}

function displayFlights(flights) {
    const flightsResult = document.getElementById("flightsResult").getElementsByTagName('tbody')[0];
    flightsResult.innerHTML = "";

    if (!flights || flights.length === 0) {
        const row = flightsResult.insertRow();
        const cell = row.insertCell(0);
        cell.textContent = "Không tìm thấy chuyến bay.";
        cell.colSpan = 7; // merge all cells into 1
        return;
    }

    flights.forEach(flight => {
        const row = flightsResult.insertRow();
        row.insertCell(0).textContent = flight.flightID;
        row.insertCell(1).textContent = flight.date;
        row.insertCell(2).textContent = flight.duration;
        row.insertCell(3).textContent = flight.departure;
        row.insertCell(4).textContent = flight.destination;
        row.insertCell(5).textContent = flight.basePrice;
        // Tạo cell cho button
        const actionCell = row.insertCell(6);

        // Tạo button element
        const bookButton = document.createElement('button');
        bookButton.type = 'button';
        bookButton.className = 'btn btn-bookings';
        bookButton.textContent = 'Đặt vé';
        bookButton.onclick = () => {
            sessionStorage.setItem('selectedFlightID', flight.flightID);
            sessionStorage.setItem('selectedDate', flight.date);
            sessionStorage.setItem('selectedDeparture', flight.departure);
            sessionStorage.setItem('selectedDestination', flight.destination);
            fetchCustomerData('/Home/PassengerInfor', '#customer-body');
        };

        // Thêm button vào cell
        actionCell.appendChild(bookButton);
    });
}

document.getElementById('dynamic-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    if (event.target.submitted) return;
    event.target.submitted = true;

    if (SubmitDone()) {
        const formData = {
            Username: document.getElementById('username').value,
            CustomerName: document.getElementById('name').value,
            DoB: document.getElementById('dateofbirth').value,
            PhoneNumber: document.getElementById('numberphone').value,
            Password: document.getElementById('password').value,
        };

        try {
            const response = await fetch('https://localhost:7152/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Đăng ký thành công!');
            } else {
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    const error = await response.json();
                    alert(`Lỗi: ${error.message}`);
                } else {
                    alert(`Lỗi: ${response.statusText}`);
                }
            }
        } catch (err) {
            console.error(err);
            alert('Có lỗi xảy ra!');
        }
    }
    event.target.submitted = false;
});

function getTicket() {
    const token = sessionStorage.getItem("token");
    fetch('https://localhost:7152/Home/GetCustomerUsername', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        fetchTickets(data.customerUsername);
    })
    .catch(error => {
        console.error('Error fetching customer name:', error);
    });
}
function formatDate(dateString) {
    const date = new Date(dateString); 
    const datePart = date.toISOString().split('T')[0]; 
    const timePart = date.toTimeString().split(' ')[0]; 

    return `${datePart} <br> ${timePart}`; 
}

async function fetchTickets(username) {
    const response = await fetch(`/api/Booking/${username}`); 
    const tickets = await response.json(); 
    if (tickets && tickets.length > 0) {
        const totalTickets = tickets.length;
        document.getElementById('totalTickets').textContent = totalTickets;
    } else {
        alert('Không có vé!');
    }

    const ticketsContainer = document.getElementById('tickets-container');
    ticketsContainer.innerHTML = ''; 

    tickets.forEach(ticket => {        
        const ticketDiv = document.createElement('div');
        ticketDiv.classList.add('item');

        const itemRightDiv = document.createElement('div');
        itemRightDiv.classList.add('item-right');

        const flight_date = ticket.flightDate;
        itemRightDiv.innerHTML = `
            <p class="num">${formatDate(flight_date)}</p>
            <span class="up-border"></span>
            <span class="down-border"></span>
        `;

        const itemLeftDiv = document.createElement('div');
        itemLeftDiv.classList.add('item-left');

        itemLeftDiv.innerHTML = `
            <p class="event">Flight</p>
            <h2 class="title">${ticket.departure} to ${ticket.destination}</h2>

            <div class="sce">
                <div class="icon">
                    <i class="fa-solid fa-money-check-dollar"></i>
                </div>
                <p>Price: ${ticket.price} <br /> Seat: ${ticket.seatNumber}</p>
            </div>
            <div class="loc">
                <p>Passenger: ${ticket.passengerName} (Passport: ${ticket.passportNumber})</p>
            </div>
            <div class="fix"></div>
        `;

        ticketDiv.appendChild(itemRightDiv);
        ticketDiv.appendChild(itemLeftDiv);

        ticketsContainer.appendChild(ticketDiv);
    });
}

async function loadFlightInfo() {
    document.getElementById("ticketbooking").classList.remove('hidden'); 
    const date = sessionStorage.getItem("selectedDate");
    const departure = sessionStorage.getItem("selectedDeparture");
    const destination = sessionStorage.getItem("selectedDestination");
    const flightID = sessionStorage.getItem("selectedFlightID");
    if (departure && destination && date && flightID) {
        // Hiển thị thông tin vào các thẻ span
        document.getElementById("form-departure").textContent = departure;
        document.getElementById("form-destination").textContent = destination;
        document.getElementById("form-date").textContent = new Date(date).toLocaleDateString();
        document.getElementById("form-flightid").textContent = flightID;
    }
}
function generateForms() {
    // Lấy số lượng vé từ input
    var ticketCount = document.getElementById('ticket-count').value;
    var formsContainer = document.getElementById('forms-container');

    // Xóa các form hiện tại
    formsContainer.innerHTML = '';

    // Tạo các form cho từng vé
    for (var i = 1; i <= ticketCount; i++) {
        var form = document.createElement('div');
        form.classList.add('form-item');
        form.innerHTML = `
                <h3>Vé ${i}</h3>
                <label for="name-${i}">Họ và Tên:</label>
                <input type="text" id="name-${i}" name="name-${i}" required /><br>

                <label for="dob-${i}">Ngày sinh:</label>
                <input type="date" id="dob-${i}" name="dob-${i}" required /><br>

                <label for="passport-${i}">Số hộ chiếu:</label>
                <input type="text" id="passport-${i}" name="passport-${i}" required /><br>

                <label for="seatnumber-${i}">Số ghế:</label>
                <input type="text" id="seatnumber-${i}" name="seatnumber-${i}" placeholder="001-300" required /><br>
            `;
        formsContainer.appendChild(form);
    }
}
async function postPassengerInfor() {
    const token = sessionStorage.getItem("token");

    let customerUsername = '';

    // Lấy customerUsername từ API
    try {
        const response = await fetch('https://localhost:7152/Home/GetCustomerUsername', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        customerUsername = data.customerUsername;
    } catch (error) {
        console.error('Error fetching customer name:', error);
        alert('Could not fetch customer information.');
        return; // Nếu có lỗi, dừng việc gửi dữ liệu
    }

    const selectedFlightID = sessionStorage.getItem('selectedFlightID');

    // Lấy thông tin hành khách từ form
    const passengers = [];
    const passengerCount = document.querySelectorAll('.form-item').length;

    for (let i = 1; i <= passengerCount; i++) {
        const passengerName = document.getElementById(`name-${i}`).value;
        const dob = document.getElementById(`dob-${i}`).value;
        const passportNumber = document.getElementById(`passport-${i}`).value;
        const seatNumber = document.getElementById(`seatnumber-${i}`).value;

        const passenger = {
            PassengerName: passengerName,
            DateOfBirth: dob,
            PassportNumber: passportNumber,
            SeatNumber: seatNumber
        };

        passengers.push(passenger);
    }

    // Tạo đối tượng bookingRequest
    const bookingRequest = {
        customerUsername: customerUsername,
        passengers: passengers,
        flightID: selectedFlightID 
    };

    // Gọi API tạo booking
    try {
        const response = await fetch(`/api/Booking/${selectedFlightID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingRequest) 
        });

        // Kiểm tra phản hồi từ API
        if (response.ok) {
            const result = await response.json();
            alert('Đặt vé thành công! Có thể xem lại vé đã đặt trong mục "Vé của tôi".');
        } else {
            const error = await response.text();
            alert(`Không đặt được vé: ${error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong.');
    }
}

