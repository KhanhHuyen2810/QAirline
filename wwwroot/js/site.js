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
function redirectToAirportDetail() {
    window.location.href = '/Home/AirportDetail';
}

function onPage(page) {
    window.open('/Home/LogIn', '_blank');
}

document.addEventListener('DOMContentLoaded', function () {
    const viewAirportsButton = document.getElementById('viewAirportsButton');
    if (viewAirportsButton) {
        viewAirportsButton.addEventListener('click', function () {
            redirectToAirportDetail();
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
        row.insertCell(0).textContent = airport.AirportName;
        row.insertCell(1).textContent = airport.AirportLocation;
        row.insertCell(2).textContent = airport.iataCode;
        row.insertCell(3).textContent = airport.icaoCode;
        row.insertCell(4).textContent = airport.AirportType;
    });
}

// Gọi hàm fetchAirports khi trang được tải
document.addEventListener('DOMContentLoaded', function () {
    const airportTable = document.getElementById('airportTable');
    if (airportTable) {
        fetchAirports();
    }
});

//Chuyển trang Đăng nhập/Đăng kí
let isRegister = true;

function toggleLogIn() {
    const formTitle = document.getElementById("form-title");
    const form = document.getElementById("dynamic-form");
    const toggleButton = document.getElementById("toggle-button");
    const textND = document.getElementById("text-nd");

    if (isRegister) {
        formTitle.textContent = "Đăng nhập";
        form.innerHTML = `
              <label>Tên đăng nhập</label>
              <div>
                <input class="display-ip" type="text" placeholder="Tên đăng nhập" required>
             </div>
             <label>Mật khẩu</label>
             <div>
              <input class="display-ip" type="password" placeholder="Mật khẩu" required>
            </div>
              <button id="bt-submit" type="submit">Đăng nhập</button>
          `;
        textND.textContent = "Bạn chưa có tài khoản?";
        toggleButton.textContent = "Đăng ký";
    } else {
        formTitle.textContent = "Đăng ký";
        form.innerHTML = `
              <label>Họ và tên</label>
                <div>
                    <input class="display-ip" type="text" placeholder="Họ và tên" required />
                </div>
                <label>Số điện thoại</label>
                <div>
                    <input class="display-ip" type="text" placeholder="Số điện thoại" required />
                </div>
                <label>Tên đăng nhập</label>
                <div>
                    <input class="display-ip" type="text" placeholder="Tên đăng nhập" required />
                </div>
                <label>Mật khẩu</label>
                <div>
                    <input class="display-ip" type="password" placeholder="Mật khẩu" required />
                </div>
                <label>Nhập lại mật khẩu</label>
                <div>
                    <input class="display-ip" type="password" placeholder="Nhập lại mật khẩu" required />
                </div>
                <button id="bt-submit" type="submit">Hoàn tất</button>
          `;
        textND.textContent = "Bạn đã có tài khoản?";
        toggleButton.textContent = "Đăng nhập";
    }

    isRegister = !isRegister;
}

