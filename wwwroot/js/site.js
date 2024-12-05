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
function onPage(page) {
    window.open('/Home/Login', '_blank');
}

document.addEventListener('DOMContentLoaded', function () {
    const logInButton = document.querySelector('.logInButton');
    if (logInButton) {
        logInButton.addEventListener('click', function () {
            onPage();
        })
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
                <input class="display-ip" type="text" id="username1" placeholder="Tên đăng nhập" >
                <br>
                <span class="error" id="no_usrname"></span>
             </div>
             <label>Mật khẩu</label>
             <div>
              <input class="display-ip" type="password" id="password1" placeholder="Mật khẩu" >
              <br>
              <span class="error" id="no-pass1"></span>
            </div>
              <button class="bt-submit" type="button" onclick="LogInSubmit()">Đăng nhập</button>
          `;
        textND.textContent = "Bạn chưa có tài khoản?";
        toggleButton.textContent = "Đăng ký";
    } else {
        formTitle.textContent = "Đăng ký";
        form.innerHTML = `
               <label>Họ và tên</label>
                <div>
                    <input class="display-ip"
                           type="text"
                           id="name"
                           placeholder="Họ và tên" />
                    <br>
                    <span id="no_name" class="error"></span>
                </div>
                <label>Số điện thoại</label>
                <div>
                    <input class="display-ip"
                           type="text"
                           id="numberphone"
                           placeholder="Số điện thoại" />
                    <br>
                    <span id="no_numberphone" class="error"></span>
                </div>
                <label for="dob" class="label">Date of Birth</label>
                <div>
                    <input type="date" id="dateofbirth" class="display-ip">
                    <br>
                    <span id="no_date" class="error"></span>
                </div>
                <label>Tên đăng nhập</label>
                <div>
                    <input class="display-ip"
                           type="text"
                           id="username"
                           placeholder="Tên đăng nhập" />
                    <br>
                    <span id="no_username" class="error"></span>
                </div>
                <label>Mật khẩu</label>
                <div>
                    <input class="display-ip"
                           type="password"
                           id="password"
                           placeholder="Mật khẩu" />
                    <br>
                    <span id="no_pass" class="error"></span>
                </div>
                <label>Nhập lại mật khẩu</label>
                <div>
                    <input class="display-ip"
                           type="password"
                           id="re_pass"
                           placeholder="Nhập lại mật khẩu" />
                    <br>
                    <span id="no_cfpass" class="error"></span>
                </div>
                <button class="bt-submit" type="button" onclick="SubmitDone()">Hoàn tất</button>
          `;
        textND.textContent = "Bạn đã có tài khoản?";
        toggleButton.textContent = "Đăng nhập";
    }

    isRegister = !isRegister;
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

    if (p) document.getElementById("dynamic-form").submit();
}

function LogInSubmit() {
    var t = true;

    // Reset lỗi hiển thị
    document.getElementById("no_usrname").innerHTML = "";
    document.getElementById("no-pass1").innerHTML = "";

    if (document.getElementById("username1").value === "") {
        document.getElementById("no_usrname").innerHTML = "Chưa nhập tên đăng nhập";
        document.getElementById("username1").focus();
        t = false;
    }

    if (document.getElementById("password1").value === "") {
        document.getElementById("no-pass1").innerHTML = "Chưa nhập mật khẩu";
        document.getElementById("password1").focus();
        t = false;
    }

    if (t) document.getElementById("dynamic-form").submit();

}

