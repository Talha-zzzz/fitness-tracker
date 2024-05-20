document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('nutritionChart').getContext('2d');
    const nutritionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: 'Calories Consumed',
                data: [2200, 1800, 1900, 2000, 2100, 2050, 2300],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 2500
                }
            }
        }
    });

    const nutritionForm = document.getElementById('nutrition-form');
    const foodItemInput = document.getElementById('food-item');
    const caloriesInput = document.getElementById('calories');
    const notesTextarea = document.getElementById('notes');
    const nutritionList = document.getElementById('nutrition-list');

    function saveNutritionEntry(entry) {
        let entries = JSON.parse(localStorage.getItem('nutrition')) || [];
        entries.push(entry);
        localStorage.setItem('nutrition', JSON.stringify(entries));
    }

    function displayNutritionEntries() {
        let entries = JSON.parse(localStorage.getItem('nutrition')) || [];
        nutritionList.innerHTML = '';
        entries.forEach((entry) => {
            const li = document.createElement('li');
            li.className = 'nutrition-item';
            li.innerHTML = `
                <div class="nutrition-details">
                    <h4>${entry.foodItem}</h4>
                    <p>Calories: ${entry.calories}</p>
                    <p>Notes: ${entry.notes}</p>
                </div>
            `;
            nutritionList.appendChild(li);
        });
    }

    nutritionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const entryData = {
            foodItem: foodItemInput.value,
            calories: caloriesInput.value,
            notes: notesTextarea.value,
        };
        saveNutritionEntry(entryData);
        displayNutritionEntries();
        nutritionForm.reset();
    });

    displayNutritionEntries();
});
