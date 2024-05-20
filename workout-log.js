document.addEventListener('DOMContentLoaded', function() {
    // Initialize the chart
    const ctx = document.getElementById('workoutChart').getContext('2d');
    const workoutChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Chest', 'Back', 'Arms', 'Legs', 'Shoulders', 'Cardio'],
            datasets: [{
                label: 'Reps',
                data: [12, 10, 8, 15, 12, 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const workoutForm = document.getElementById('workout-form');
    const workoutNameInput = document.getElementById('workout-name');
    const workoutDateInput = document.getElementById('date');
    const workoutDescriptionTextarea = document.getElementById('description');
    const workoutList = document.getElementById('workout-list');

    function saveWorkout(workoutData) {
        let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
        workouts.push(workoutData);
        localStorage.setItem('workouts', JSON.stringify(workouts));
    }

    function displayWorkouts() {
        let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
        workoutList.innerHTML = '';
        workouts.forEach((workout) => {
            const li = document.createElement('li');
            li.className = 'workout-item';
            li.innerHTML = `
                <div class="workout-details">
                    <h4>${workout.name}</h4>
                    <p>Date: ${workout.date}</p>
                    <p>Description: ${workout.description}</p>
                </div>
            `;
            workoutList.appendChild(li);
        });
    }

    workoutForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const workoutData = {
            name: workoutNameInput.value,
            date: workoutDateInput.value,
            description: workoutDescriptionTextarea.value,
        };
        saveWorkout(workoutData);
        displayWorkouts(); 
        workoutForm.reset();
    });

    displayWorkouts();
});
