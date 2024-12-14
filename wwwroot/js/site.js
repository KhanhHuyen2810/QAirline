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
        setTimeout(function () {
            hotlineBox.classList.add('show');
        }, 10);
    });

    closeButton.addEventListener("click", () => {
        hotlineBox.classList.add("hidden");
        overlay.classList.add("hidden");
        hotlineBox.classList.remove('show');
        setTimeout(function () {
            hotlineBox.classList.add('hidden');
        }, 500);
    });

    overlay.addEventListener("click", () => {
        hotlineBox.classList.add("hidden");
        overlay.classList.add("hidden");
        hotlineBox.classList.remove('show');
        setTimeout(function () {
            hotlineBox.classList.add('hidden');
        }, 500);
    });
});

function redirectToAirportDetail() {
    window.location.href = '/Home/AirportDetail';
}

function redirectToHomepage() {
    window.location.href = "/Home/Homepage";
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
document.addEventListener('DOMContentLoaded', function () {
    const signupButton = document.getElementById('signupButton');
    if (signupButton) {
        signupButton.addEventListener('click', function () {
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

//Open_close pop -up
(function () {
    //Login/Signup modal window - by CodyHouse.co
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

    ModalSignin.prototype.toggleError = function (input, bool) {
        // used to show error messages in the form
        toggleClass(input, 'cd-signin-modal__input--has-error', bool);
        toggleClass(input.nextElementSibling, 'cd-signin-modal__error--is-visible', bool);
    }

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

    //credits http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
    function putCursorAtEnd(el) {
        if (el.setSelectionRange) {
            var len = el.value.length * 2;
            el.focus();
            el.setSelectionRange(len, len);
        } else {
            el.value = el.value;
        }
    };
})(); 
// login.js - Gửi thông tin đăng nhập và nhận JWT token từ backend
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
        console.log(token);

        if (role === "Admin") {
            window.location.href = "/Admin/Dashboard";
        } else {
            fetch('/Home/Homepage', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            });   
        }      
    } catch (error) {
        console.error("Error during login:", error);
        alert("Lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại.");
    }
});



