document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (event) {
            if (event.target.id === 'dashboardButton') {
                fetchAdminData('/Admin/Dashboard'); 
            }
            if (event.target.id === 'newsButton') {
                fetchAdminData('/Admin/News');   
            }
            if (event.target.id === 'flightButton') {
                fetchAdminData('/Admin/Flights');
            }
            if (event.target.id === 'ticketButton') {
                fetchAdminData('/Admin/Tickets');
            }
        });
});

async function fetchAdminData(url) {
    try {
        const token = sessionStorage.getItem('token');

        if (!token) {
            console.error('No token found in sessionStorage.');
            //window.location.replace("/Home/Homepage");
            return;
        }
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Fetch không thành công:", errorText);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const html = await response.text();        

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const bodyContent = tempDiv.querySelector('#admin-body')?.innerHTML;
        if (bodyContent) {
            document.getElementById('admin-body').innerHTML = bodyContent;
        } else {
            document.getElementById('admin-body').innerHTML = html;
        } 

        window.history.pushState({}, '', url);
    }
    catch (error) {
        alert("Error");
        console.log('Fetch error:', error)
    }
}

const sidebar = document.querySelector(".sidebar")
const sidebarToggle = document.querySelector(".sidebar-toggler");
const menuToggle = document.querySelector(".menu-toggler");

const collapsedSidebarHeight = "56px";
const fullSidebarHeight = "calc(100vh - 32px)";

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
});

// Load danh sách tin tức
async function fetchAdminNews() {
    try {
        const response = await fetch('/api/News/get');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const news = await response.json();
        displayNews(news);
    } catch (error) {
        console.error('Failed to fetch news:', error);
        alert('Có lỗi xảy ra khi lấy danh sách tin tức.');
    }
}
function displayNews(news) {
    const newsTableBody = document.getElementById('newsTable').getElementsByTagName('tbody')[0];
    if (!newsTable) {
        console.error('Không tìm thấy bảng newsTable.');
        return;
    }
    newsTableBody.innerHTML = '';

    news.forEach(_news => {
        const row = newsTableBody.insertRow();
        row.insertCell(0).textContent = _news.NewsID;
        row.insertCell(1).textContent = _news.NewsTitle;
        row.insertCell(2).textContent = _news.NewsContent;
        row.insertCell(3).textContent = _news.ImageUrl;
        row.insertCell(4).innerHTML = `
            <button class="btn btn-edit" onclick="editNews(${_news.NewsID})">Sửa</button>
            <button class="btn btn-delete" onclick="deleteNews(${_news.NewsID})">Xóa</button>
        `;
    });
}

let newsID = null;
let isEdit = false;


async function addNews() {
    isEdit = false;
    openModal();
}

// Thêm/Sửa tin tức
async function saveNews() {
    const id = document.getElementById('newsID').value;
    const title = document.getElementById('newsTitle').value;
    const content = document.getElementById('newsContent').value;
    const imageUrl = document.getElementById('newsImageUrl').value;
    
    if (!isEdit) {
        newsData = {
            NewsTitle: title,
            NewsContent: content,
            ImageUrl: imageUrl
        };
    } else {
        newsData = {
            NewsID: parseInt(id),
            NewsTitle: title,
            NewsContent: content,
            ImageUrl: imageUrl
        };
    }
    try {
        let response;
        if (!isEdit) {
            response = await fetch('/api/News/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newsData)
            });
        } else {
            response = await fetch(`/api/News/edit/${newsID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newsData)
            });
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Fetch không thành công:", errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        alert(isEdit ? "Sửa tin tức thành công" : "Thêm tin tức thành công");
        closeModal(); // Đóng modal
        fetchAdminNews();
    } catch (error) {
        console.error("Error when saving news:", error);
        alert("Lỗi khi lưu tin tức");
    }

}

// Xóa tin tức
async function deleteNews(id) {
    try {
        if (confirm("Bạn có chắc chắn muốn xóa tin tức này?")) {
            const response = await fetch(`/api/News/delete/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Fetch không thành công:", errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            alert("Xóa tin tức thành công");
            fetchAdminNews();
        }
    }
    catch (error) {
        console.error('Error when deleting news:', error);
        alert("Lỗi khi xóa tin tức");
    }
}

// Sửa tin tức
function editNews(id) {
    openModal(); // Mở modal
    newsID = id;
    isEdit = true;
    document.getElementById("formTitle").innerText = "Sửa Tin Tức";
    // Tìm tin tức theo ID và điền vào form
    fetch(`/api/News/details/${id}`)
        .then(response => {
            if (!response.ok) {
                const errorText = response.text();
                console.error("Fetch không thành công:", errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(news => {
            document.getElementById('newsID').value = news.newsID;
            document.getElementById('newsTitle').value = news.newsTitle;
            document.getElementById('newsContent').value = news.newsContent;
            document.getElementById('newsImageUrl').value = news.imageUrl;
        })
        .catch(error => {
            console.error('Error when fetching news details:', error);
            alert("Lỗi khi lấy chi tiết tin tức");
        });
    fetchAdminNews();
}

// Mở modal news
function openModal() {
    document.getElementById("newsModal").style.display = "flex";
    document.getElementById("newsForm").reset();
    document.getElementById("formTitle").innerText = "Thêm Tin Tức";
    editIndex = null;
}

// Đóng modal news
function closeModal() {
    document.getElementById("newsModal").style.display = "none";
}

// Load danh sách flight
async function fetchFlights() {
    try {
        const response = await fetch('/api/Flight/get');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const flights = await response.json();
        displayFlights(flights);
    } catch (error) {
        console.error('Failed to fetch flights:', error);
        alert('Có lỗi xảy ra khi lấy danh sách chuyến bay.');
    }
}
function displayFlights(flights) {
    const flightsTableBody = document.getElementById('flightTable').getElementsByTagName('tbody')[0];

    flightsTableBody.innerHTML = '';

    flights.forEach(flight => {
        const row = flightsTableBody.insertRow();
        row.insertCell(0).textContent = flight.FlightID;
        row.insertCell(1).textContent = flight.Date;
        row.insertCell(2).textContent = flight.Duration;
        row.insertCell(3).textContent = flight.Departure;
        row.insertCell(4).textContent = flight.Destination;
        row.insertCell(5).textContent = flight.BasePrice;
        row.insertCell(6).innerHTML = `
            <button class="btn btn-edit" onclick="editFlights(${flight.FlightID})">Sửa</button>
            <button class="btn btn-delete" onclick="deleteFlights(${flight.FlightID})">Xóa</button>
        `;
    });
}

let flightID = null;
let isFlightEdit = false;

async function addFlights() {
    isFlightEdit = false;
    openModalFlight();
}

// Thêm/Sửa chuyến bay
async function saveFlights() {
    const id = document.getElementById('flightID').value;
    const date = document.getElementById('date').value;
    const duration = document.getElementById('duration').value;
    const departure = document.getElementById('departure').value;
    const destination = document.getElementById('destination').value;
    const basePrice = document.getElementById('price').value;
    if (!isFlightEdit) {
        flightData = {
            Date: date,
            Duration: duration,
            Departure: departure,
            Destination: destination,
            BasePrice: basePrice
        };
    } else {
        flightData = {
            FlightID: parseInt(id),
            Date: date,
            Duration: parseInt(duration),
            Departure: departure,
            Destination: destination,
            BasePrice: basePrice
        };
    }
    try {
        let response;
        if (!isFlightEdit) {
            response = await fetch('/api/Flight/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(flightData)
            });
        } else {
            response = await fetch(`/api/Flight/edit/${flightID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(flightData)
            });
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Fetch không thành công:", errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        alert(isFlightEdit ? "Sửa chuyến bay thành công" : "Thêm chuyến bay thành công");
        closeModalFlight(); // Đóng modal
        fetchFlights();
    } catch (error) {
        console.error("Error when saving flights:", error);
        alert("Lỗi khi lưu chuyến bay");
    }

}

// Xóa chuyến bay
async function deleteFlights(id) {
    try {
        if (confirm("Bạn có chắc chắn muốn xóa chuyến bay này?")) {
            const response = await fetch(`/api/Flight/delete/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Fetch không thành công:", errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            alert("Xóa chuyến bay thành công");
            fetchFlights();
        }
    }
    catch (error) {
        console.error('Error when deleting flights:', error);
        alert("Lỗi khi xóa chuyến bay");
    }
}

// Sửa chuyến bay
function editFlights(id) {
    openModalFlight(); // Mở modal
    flightID = id;
    isFlightEdit = true;
    document.getElementById("modalTitle").innerText = "Sửa Chuyến Bay";
    // Tìm chuyến bay theo ID và điền vào form
    fetch(`/api/Flight/details/${id}`)
        .then(response => {
            if (!response.ok) {
                const errorText = response.text();
                console.error("Fetch không thành công:", errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(flight => {
            document.getElementById('flightID').value = flight.flightID;
            document.getElementById('date').value = flight.date;
            document.getElementById('duration').value = flight.duration;
            document.getElementById('departure').value = flight.departure;
            document.getElementById('destination').value = flight.destination;
            document.getElementById('price').value = flight.basePrice;
        })
        .catch(error => {
            console.error('Error when fetching flight details:', error);
            alert("Lỗi khi lấy chi tiết chuyến bay");
        });
    fetchFlights();
}

// Mở modal flight
function openModalFlight() {
    document.getElementById("flightModal").style.display = "flex";
    document.getElementById("flightForm").reset();
    document.getElementById("modalTitle").innerText = "Thêm Chuyến Bay";
    editIndex = null;
}

// Đóng modal flight
function closeModalFlight() {
    document.getElementById("flightModal").style.display = "none";
}

flatpickr("#date", {
    enableTime: true,
    enableSeconds: true,
    dateFormat: "Y-m-d H:i:S",
    time_24hr: true,
});

//Lấy dữ liệu đặt vé
async function fetchTickets() {
    try {
        const response = await fetch('https://localhost:7152/api/Ticket');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const tickets = await response.json();
        displayTickets(tickets);
    } catch (error) {
        console.error('Failed to fetch tickets:', error);
        alert('Có lỗi xảy ra khi lấy danh sách đặt vé.');
    }
}

function displayTickets(tickets) {
    // Kiểm tra xem ticketTable và tbody có tồn tại không
    const ticketsTableBody = document.querySelector('#ticketTable tbody');

    if (!ticketsTableBody) {
        console.error('Cannot find table body element');
        return; // Nếu không tìm thấy phần tử tbody, dừng việc hiển thị
    }

    ticketsTableBody.innerHTML = ''; // Xóa nội dung cũ trước khi hiển thị mới

    tickets.forEach((ticket) => {
        ticketsTableBody.innerHTML += `
            <tr>
                <td>${ticket.flightID}</td>
                <td>${ticket.departure}</td>
                <td>${ticket.destination}</td>
                <td>${ticket.flightDate}</td>
                <td>${ticket.ticketsQuantity}</td>
            </tr>
        `;
    });
}