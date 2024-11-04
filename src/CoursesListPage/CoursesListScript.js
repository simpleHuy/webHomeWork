//window.Courses = courses;

let coursesPerPage = 9;
let currentPage = 1;
const totalPages = Math.ceil(courses.length / coursesPerPage);

function updatePageFromUrl() {
    const params = new URLSearchParams(window.location.search);
    currentPage = parseInt(params.get("page")) || 1;
    renderCourses();
}

function renderCourses() {
    if (window.innerWidth < 768) {
        coursesPerPage = 6;
    }

    if (window.innerWidth < 1024) {
        coursesPerPage = 8;
    }

    const courseContainer = document.getElementById("course-container");
    courseContainer.innerHTML = "";

    const start = (currentPage - 1) * coursesPerPage;
    const end = start + coursesPerPage;
    const currentCourses = courses.slice(start, end);

    currentCourses.forEach((course) => {
        const courseCard = `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <img src="${course.img}" alt="${course.title}" class="w-full h-72 object-cover">
          <div class="p-6">
            <div class="flex items-center text-sm text-gray-500 mb-2">
                    <div class="mr-2 border border-slate-300 rounded-md inline-block py-0.5 px-2">${course.duration}</div> | <span class="ml-2 border border-slate-300 rounded-md inline-block py-0.5 px-2">${course.level}</span>
            </div>
            <h3 class="text-xl font-semibold">${course.title}</h3>
            <p class="text-gray-400 text-sm mt-2">${course.description}</p>
            <div class="grid grid-cols-2 gap-2 mt-4">
                <button class="mt-4 w-full bg-gray-100 text-black py-2 rounded-md">Get it Now</button>
                <button id="seeMore-btn" class="mt-4 w-full bg-gray-100 text-black py-2 rounded-md" onclick="SeeDetailCourse(${course.Id})">See detail</button>
            </div>
          </div>
        </div>
      `;
        courseContainer.insertAdjacentHTML("beforeend", courseCard);
    });

    document.getElementById(
        "page-info"
    ).textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById("prev-btn").disabled = currentPage === 1;
    document.getElementById("next-btn").disabled = currentPage === totalPages;
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        updateUrlAndRender();
    }
}
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updateUrlAndRender();
    }
}

function updateUrlAndRender() {
    history.pushState({ page: currentPage }, "", `?page=${currentPage}`);
    renderCourses();
    window.scrollTo(0, 0);
}

window.addEventListener("popstate", (event) => {
    currentPage = event.state ? event.state.page : 1;
    renderCourses();
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);
});

function SeeDetailCourse(courseId) {
    window.location.href = `./../CourseDetailPage/CourseDetailPage.html?courseId=${courseId}`;
}

updatePageFromUrl();
