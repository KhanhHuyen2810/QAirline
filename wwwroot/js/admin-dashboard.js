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
        const token = localStorage.getItem('token');
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


