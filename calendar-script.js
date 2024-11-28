const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper"),
  addEventCloseBtn = document.querySelector(".close"),
  addEventTitle = document.querySelector(".event-name"),
  addEventFrom = document.querySelector(".event-time-from"),
  addEventTo = document.querySelector(".event-time-to"),
  addEventSubmit = document.querySelector(".add-event-btn");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

// List of months
const months = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

// Load events from localStorage
function getEvents() {
  return JSON.parse(localStorage.getItem("events")) || [];
}

// Save events to localStorage
function saveEvents(events) {
  localStorage.setItem("events", JSON.stringify(events));
}

// Initialize calendar
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = `${months[month]} ${year}`;
  let days = "";

  // Days from previous month
  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  // Current month's days
  for (let i = 1; i <= lastDate; i++) {
    let event = false;
    getEvents().forEach((eventObj) => {
      if (eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year) {
        event = true;
      }
    });
    if (i === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      days += `<div class="day today active ${event ? 'event' : ''}">${i}</div>`;
    } else {
      days += `<div class="day ${event ? 'event' : ''}">${i}</div>`;
    }
  }

  // Days from next month
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addEventListeners();
}

// Navigate to previous month
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

// Navigate to next month
function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

// Get active day name and date
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = `${date} ${months[month]} ${year}`;
}

// Update events when a day is active
function updateEvents(date) {
  let events = "";
  getEvents().forEach((event) => {
    if (date === event.day && month + 1 === event.month && year === event.year) {
      event.events.forEach((eventItem) => {
        events += `
          <div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${eventItem.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${eventItem.time}</span>
            </div>
          </div>`;
      });
    }
  });
  if (!events) {
    events = `<div class="no-event"><h3>No Events</h3></div>`;
  }
  eventsContainer.innerHTML = events;
}

// Add event button to open modal
addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

// Close modal
addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

// Add event listener to day elements
function addEventListeners() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      days.forEach((day) => {
        day.classList.remove("active");
      });
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

// Add event to calendar
addEventSubmit.addEventListener("click", () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;
  if (!eventTitle || !eventTimeFrom || !eventTimeTo) {
    alert("Please fill all fields.");
    return;
  }

  const newEvent = {
    title: eventTitle,
    time: `${eventTimeFrom} - ${eventTimeTo}`,
  };

  let events = getEvents();
  let eventAdded = false;

  events.forEach((event) => {
    if (event.day === activeDay && event.month === month + 1 && event.year === year) {
      event.events.push(newEvent);
      eventAdded = true;
    }
  });

  if (!eventAdded) {
    events.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
  }

  saveEvents(events);
  addEventWrapper.classList.remove("active");
  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";
  updateEvents(activeDay);
  initCalendar();
});

// Load the initial calendar view
initCalendar();
