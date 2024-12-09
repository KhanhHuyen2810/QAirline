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
document.addEventListener("DOMContentLoaded", () => {
    const hotlineLink = document.getElementById("hotlineLink");
    const hotlineBox = document.getElementById("hotlineBox");
    const overlay = document.getElementById("overlay");
    const closeButton = document.getElementById("closeButton");

    hotlineLink.addEventListener("click", (e) => {
        e.preventDefault();
        hotlineBox.classList.remove("hidden");
        overlay.classList.remove("hidden");
    });

    closeButton.addEventListener("click", () => {
        hotlineBox.classList.add("hidden");
        overlay.classList.add("hidden");
    });

    overlay.addEventListener("click", () => {
        hotlineBox.classList.add("hidden");
        overlay.classList.add("hidden");
    });
});

function redirectToAirportDetail() {
    window.location.href = '/Home/AirportDetail';
}

function redirectToHomepage() {
    window.location.href = "https://localhost:7152/";
}

function redirectToNewsPage() {
    window.location.href = '/Home/NewsPage';
}

document.addEventListener('DOMContentLoaded', function () {
    const viewHomepageButton = document.getElementById('viewHomepageButton');
    if (viewHomepageButton) {
        viewHomepageButton.addEventListener('click', function () {
            redirectToHomepage();
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const viewAirportsButton = document.getElementById('viewAirportsButton');
    if (viewAirportsButton) {
        viewAirportsButton.addEventListener('click', function () {
            redirectToAirportDetail();
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const viewNewsButton = document.getElementById('viewNewsButton');
    if (viewNewsButton) {
        viewNewsButton.addEventListener('click', function () {
            redirectToNewsPage();
        });
    }
});

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


// Gọi hàm fetchAirports khi trang được tải
document.addEventListener('DOMContentLoaded', function () {
    const airportTable = document.getElementById('airportTable');
    if (airportTable) {
        fetchAirports();
    }
});

function redirectToSignupPage() {
    window.location.href = '/Home/LogIn';
}
document.addEventListener('DOMContentLoaded', function () {
    const signUpButton = document.getElementById('signUpButton');
    if (signUpButton) {
        signUpButton.addEventListener('click', function () {
            redirectToSignupPage();
        });
    }
});
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

document.addEventListener('DOMContentLoaded', function () {
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
            console.log(formData);

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
});




