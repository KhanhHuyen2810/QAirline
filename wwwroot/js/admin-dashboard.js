document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (event) {
            if (event.target.id === 'dashboardButton') {
                fetchAdminData('/Admin/Dashboard'); 
            }
            if (event.target.id === 'newsButton') {
                fetchAdminData('/Admin/News');
                fetchAdminNews();
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
        console.log(token);

        if (!token) {
            console.error('No token found in sessionStorage.');
            window.location.replace("/Home/Homepage");
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

        console.log('Response data:', html);

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

// Lưu tin tức mới hoặc cập nhật tin tức
function saveNews() {
    const news = {
        NewsID: $("#newsID").val(),
        NewsTitle: $("#newsTitle").val(),
        NewsContent: $("#newsContent").val(),
        ImageUrl: $("#newsImageUrl").val()
    };

    if (news.NewsID) {
        $.ajax({
            url: `/api/News/edit/${news.NewsID}`,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(news),
            success: function () {
                alert("Cập nhật thành công!");
                fetchAdminNews();
                $("#newsForm").closeModal();
            }
        });
    } else {
        $.post("/api/News/create", news, function () {
            alert("Thêm thành công!");
            fetchAdminNews();
            $("#newsForm").closeModal();
        });
    }
}

// Xóa tin tức
function deleteNews(id) {
    if (confirm("Bạn có chắc muốn xóa tin tức này?")) {
        $.ajax({
            url: `/api/News/delete/${id}`,
            type: "DELETE",
            success: function () {
                alert("Xóa thành công!");
                fetchAdminNews();
            }
        });
    }
}

// Chỉnh sửa tin tức
function editNews(id) {
    $.get(`/api/News/details/${id}`, function (data) {
        $("#formTitle").text("Sửa Tin Tức");
        $("#newsID").val(data.newsID);
        $("#newsTitle").val(data.newsTitle);
        $("#newsContent").val(data.newsContent);
        $("#newsImageUrl").val(data.imageUrl);
        $("#newsForm").openModal();
    });
}

// Xem chi tiết tin tức
function viewDetails(id) {
    $.get(`/api/News/details/${id}`, function (data) {
        alert(`Title: ${data.newsTitle}\nContent: ${data.newsContent}\nImage: ${data.imageUrl}`);
    });
}

// Mở modal
function openModal() {
    document.getElementById("newsModal").style.display = "flex";
    document.getElementById("newsForm").reset();
    document.getElementById("formTitle").innerText = "Thêm Tin Tức";
    editIndex = null;
}

// Đóng modal
function closeModal() {
    document.getElementById("newsModal").style.display = "none";
}
