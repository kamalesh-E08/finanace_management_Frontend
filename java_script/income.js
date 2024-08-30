document.addEventListener('DOMContentLoaded', function() {
    const incomeForm = document.getElementById('income-form');

    incomeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get values from input fields
        const monthlyIncome = parseFloat(document.getElementById('monthly-income').value) || 0;
        const otherIncome = parseFloat(document.getElementById('other-income').value) || 0;

        // Example: Print income details to console (you can replace with your logic)
        console.log(`Monthly Income: $${monthlyIncome.toFixed(2)}`);
        console.log(`Other Income: $${otherIncome.toFixed(2)}`);

        // Clear input fields (optional)
        document.getElementById('monthly-income').value = '';
        document.getElementById('other-income').value = '';

        // Optionally, you can process this data further (e.g., send to server, store in localStorage, etc.)
    });
});

document.getElementById('income-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const monthlyIncome = document.getElementById('monthly-income').value;
    const otherIncome = document.getElementById('other-income').value;

    try {
        const response = await fetch('/income', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ monthlyIncome, otherIncome })
        });

        const result = await response.json();
        if (result.success) {
            alert('Income data saved successfully');
            // Optionally, reset the form or redirect the user
            document.getElementById('income-form').reset();
        } else {
            alert('Failed to save income data: ' + result.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error saving income data');
    }
});

