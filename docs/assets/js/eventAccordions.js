document.addEventListener("DOMContentLoaded", function () {
    const toggles = document.querySelectorAll('.eventToggle');

    toggles.forEach(toggle => {
      toggle.addEventListener("click", function () {
        const targetId = this.getAttribute("data-bs-target");
        const targetEvent = document.querySelector(targetId);
        const isAlreadyShown = targetEvent.classList.contains("show");

        // Loop through all events
        document.querySelectorAll(".event").forEach(eventEl => {
          const eventLg = eventEl.querySelector(".event-lg");
          const eventSm = eventEl.querySelector(".event-sm");

          // If this is not the clicked one
          if (eventLg !== targetEvent) {
            // Hide the .event-lg
            new bootstrap.Collapse(eventLg, { toggle: false }).hide();

            // Show the corresponding .event-sm
            new bootstrap.Collapse(eventSm, { toggle: false }).show();
          }
        });

        // If the clicked one was not already open
        if (!isAlreadyShown) {
          // Show the .event-lg
          new bootstrap.Collapse(targetEvent, { toggle: false }).show();

          // Find its .event-sm and hide it
          const clickedEvent = targetEvent.closest(".event");
          const clickedEventSm = clickedEvent.querySelector(".event-sm");
          new bootstrap.Collapse(clickedEventSm, { toggle: false }).hide();
        }
      });
    });
  });