document.addEventListener('DOMContentLoaded', async function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: async function(fetchInfo, successCallback, failureCallback) {
            try {
                const response = await fetch('/events');
                const events = await response.json();
                successCallback(events);
            } catch (error) {
                console.error('Error fetching events:', error);
                failureCallback(error);
            }
        },
        dateClick: function(info) {
            openEventModal(info.dateStr);
        },
        eventClick: function(info) {
            openEventModal(info.event.startStr, info.event);
        }
    });

    calendar.render();

    // Populate the year select dropdown
    var yearSelect = document.getElementById('year-select');
    var currentYear = new Date().getFullYear();
    for (var i = currentYear - 10; i <= currentYear + 10; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        if (i === currentYear) {
            option.selected = true;
        }
        yearSelect.appendChild(option);
    }

    // Update calendar view based on selected year and month
    function updateCalendarView() {
        var selectedYear = yearSelect.value;
        var selectedMonth = document.getElementById('month-select').value;
        calendar.gotoDate(new Date(selectedYear, selectedMonth));
    }

    // Event listeners for year and month selection
    yearSelect.addEventListener('change', updateCalendarView);
    document.getElementById('month-select').addEventListener('change', updateCalendarView);

    // Set initial calendar view to the current month and year
    updateCalendarView();

    // Modal related code
    var modal = document.getElementById("event-modal");
    var span = modal.getElementsByClassName("close")[0];
    var eventForm = document.getElementById('event-form');
    var eventDateInput = document.getElementById('event-date');
    var eventTitleInput = document.getElementById('event-title');
    var saveButton = document.getElementById('save-button');
    var deleteButton = document.getElementById('delete-button');
    var modalTitle = document.getElementById('modal-title');
    var currentEvent = null;

    function openEventModal(dateStr, event = null) {
        eventDateInput.value = dateStr;
        eventTitleInput.value = event ? event.title : "";
        modalTitle.textContent = event ? "Edit Event" : "Add Event";
        saveButton.textContent = event ? "Save Changes" : "Add Event";
        deleteButton.style.display = event ? "inline-block" : "none";
        currentEvent = event;
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    eventForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        var eventTitle = eventTitleInput.value;
        var eventDate = eventDateInput.value;

        if (eventTitle) {
            if (currentEvent) {
                // Update existing event
                try {
                    const response = await fetch(`/events/${currentEvent.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            title: eventTitle,
                            start: eventDate,
                        }),
                    });
                    if (response.ok) {
                        currentEvent.setProp('title', eventTitle);
                    } else {
                        console.error('Error updating event:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error updating event:', error);
                }
            } else {
                // Add new event
                try {
                    const response = await fetch('/events', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            title: eventTitle,
                            start: eventDate,
                            allDay: true,
                        }),
                    });
                    const newEvent = await response.json();
                    if (response.ok) {
                        calendar.addEvent(newEvent);
                    } else {
                        console.error('Error adding event:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error adding event:', error);
                }
            }
            modal.style.display = "none";
            eventForm.reset();
            currentEvent = null;
        } else {
            alert('Please enter an event title');
        }
    });

    deleteButton.addEventListener('click', async function() {
        if (currentEvent) {
            try {
                const response = await fetch(`/events/${currentEvent.id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    currentEvent.remove();
                } else {
                    console.error('Error deleting event:', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting event:', error);
            }
            modal.style.display = "none";
            eventForm.reset();
            currentEvent = null;
        }
    });
});
