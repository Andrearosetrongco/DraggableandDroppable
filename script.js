document.addEventListener("DOMContentLoaded", function() {
    let score = 0;

    const images = document.querySelectorAll(".draggable");
    const descriptions = document.querySelectorAll(".droppable");
    const scoreBoard = document.getElementById("score");
    const remarks = document.getElementById("remarks");

    // Add dragstart event to the images
    images.forEach(image => {
        image.addEventListener("dragstart", function(e) {
            // Set the data to the dragged image's ID
            e.dataTransfer.setData("text", image.id);
        });
    });

    // Allow dropping by preventing the default behavior
    descriptions.forEach(description => {
        description.addEventListener("dragover", function(e) {
            e.preventDefault();
        });

        description.addEventListener("drop", function(e) {
            e.preventDefault();

            // Get the dragged image's ID
            const draggedId = e.dataTransfer.getData("text");
            const draggedImage = document.getElementById(draggedId);

            // Check if the description matches the image description
            if (draggedImage.getAttribute("data-description") === description.getAttribute("data-description")) {
                // Append the image to the description
                description.appendChild(draggedImage);
                draggedImage.setAttribute("draggable", "false"); // Disable further dragging
                draggedImage.style.cursor = "default"; // Optional: change cursor

                // Update the score
                score += 1;
                scoreBoard.textContent = score;

                // Update the remarks if all images are matched
                if (score === images.length) {
                    remarks.textContent = "Congratulations! You matched all the images correctly!";
                }
            } else {
                remarks.textContent = "Oops! Try again!";
            }
        });
    });
});
