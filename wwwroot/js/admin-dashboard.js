document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (event) {
            if (event.target.id === 'dashboardButton') {
                window.location.href = "/Admin/Dashboard"; 
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
        console.log(token);

        if (!token) {
            console.error('No token found in localStorage.');
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
        console.log('Response data:', html);

        document.getElementById('admin-body').innerHTML = html; 

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

$(document).ready(function () {
    loadNews();
});

// Load danh sách tin tức
function loadNews() {
    try {
        $.get("/api/News", function (data) {
            let rows = "";
            data.forEach(function (item) {
                rows += `<tr>
                    <td>${item.newsID}</td>
                    <td>${item.newsTitle}</td>
                    <td>${item.newsContent}</td>
                    <td>${item.imageUrl}</td>
                    <td>
                        <button onclick="editNews(${item.newsID})">Sửa</button>
                        <button onclick="deleteNews(${item.newsID})">Xóa</button>
                        <button onclick="viewDetails(${item.newsID})">Chi Tiết</button>
                    </td>
                </tr>`;
            });
            $("#newsTable tbody").html(rows);
        });
    }
    catch {
        console.log("Error");
    }
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
                loadNews();
                $("#newsForm").hide();
            }
        });
    } else {
        $.post("/api/News/create", news, function () {
            alert("Thêm thành công!");
            loadNews();
            $("#newsForm").hide();
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
                loadNews();
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
        $("#newsForm").show();
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
