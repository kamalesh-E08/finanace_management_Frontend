// document.addEventListener('DOMContentLoaded', function() {
//     // Function to load and update the chart based on selected month and year
//     function updateChart() {
//         const monthSelect = document.getElementById('month-select');
//         const yearSelect = document.getElementById('year-select');
//         const selectedMonth = monthSelect.value;
//         const selectedYear = yearSelect.value;

//         // Retrieve stored data for the selected month and year
//         const expensesKey = `expenses_${selectedYear}_${selectedMonth}`;
//         const incomeKey = `income_${selectedYear}_${selectedMonth}`;
//         const expensesData = JSON.parse(localStorage.getItem(expensesKey)) || {};
//         console.log(expensesData)
//         const incomeData = JSON.parse(localStorage.getItem(incomeKey)) || {};

//         // Process the data for the chart
//         const dataLabels = Object.keys(expensesData);
//         const dataValues = Object.values(expensesData);

//         // Add income to chart data
//         if (incomeData.monthlyIncome || incomeData.otherIncome) {
//             dataLabels.push('Income');
//             dataValues.push((incomeData.monthlyIncome || 0) + (incomeData.otherIncome || 0));
//         }

//         // Create or update the chart
//         const ctx = document.getElementById('myChart').getContext('2d');
//         if (window.myPieChart) {
//             window.myPieChart.data.labels = dataLabels;
//             window.myPieChart.data.datasets[0].data = dataV
//             alues;
//             window.myPieChart.update();
//         } else {
//             window.myPieChart = new Chart(ctx, {
//                 type: 'pie',
//                 data: {
//                     labels: dataLabels,
//                     datasets: [{
//                         data: dataValues,
//                         backgroundColor: [
//                             'rgba(255, 99, 132, 0.2)',
//                             'rgba(54, 162, 235, 0.2)',
//                             'rgba(255, 206, 86, 0.2)',
//                             'rgba(75, 192, 192, 0.2)',
//                             'rgba(153, 102, 255, 0.2)',
//                             'rgba(255, 159, 64, 0.2)',
//                             'rgba(99, 255, 132, 0.2)'
//                         ],
//                         borderColor: [
//                             'rgba(255, 99, 132, 1)',
//                             'rgba(54, 162, 235, 1)',
//                             'rgba(255, 206, 86, 1)',
//                             'rgba(75, 192, 192, 1)',
//                             'rgba(153, 102, 255, 1)',
//                             'rgba(255, 159, 64, 1)',
//                             'rgba(99, 255, 132, 1)'
//                         ],
//                         borderWidth: 1
//                     }]
//                 },
//                 options: {
//                     responsive: true,
//                     plugins: {
//                         legend: {
//                             position: 'top',
//                         },
//                         tooltip: {
//                             callbacks: {
//                                 label: function(tooltipItem) {

//                                     return `${tooltipItem.label}: $${tooltipItem.raw}`;
//                                 }
//                             }
//                         }
//                     }
//                 }
//             });
//         }
//     }

//     // Populate year and month selectors
//     const yearSelect = document.getElementById('year-select');
//     const monthSelect = document.getElementById('month-select');

//     const currentYear = new Date().getFullYear();
//     for (let year = currentYear - 10; year <= currentYear + 10; year++) {
//         const option = document.createElement('option');
//         option.value = year;
//         option.text = year;
//         yearSelect.add(option);
//     }

//     yearSelect.value = currentYear;

//     // Set initial month to the current month
//     monthSelect.value = new Date().getMonth();

//     // Update the chart initially
//     updateChart();

//     // Event listener for updating the chart when month or year changes
//     monthSelect.addEventListener('change', updateChart);
//     yearSelect.addEventListener('change', updateChart);
// });





document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('myChart').getContext('2d');

    const data = {
        "expenses": [
            { "category": "Rent", "amount": 1000 },
            { "category": "Groceries", "amount": 300 },
            { "category": "Transportation", "amount": 150 },
            { "category": "Entertainment", "amount": 100 },
            { "category": "Utilities", "amount": 200 },
            { "category": "Dining Out", "amount": 120 },
            { "category": "Healthcare", "amount": 80 },
            { "category": "Miscellaneous", "amount": 50 }
        ]
    };

    const labels = data.expenses.map(expense => expense.category);
    const amounts = data.expenses.map(expense => expense.amount);

    const expensesChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: amounts,
                backgroundColor: [
                    '#ff6384',
                    '#36a2eb',
                    '#cc65fe',
                    '#ffce56',
                    '#36eb9d',
                    '#eb36d5',
                    '#ebd236',
                    '#8e5ea2'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Personal Expenses Breakdown'
                }
            }
        }
    });
});