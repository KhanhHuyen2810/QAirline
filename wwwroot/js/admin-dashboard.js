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
