const ctx = document.getElementById('myChart').getContext('2d')
const dataFromPug = document.getElementById('data')
const preData = dataFromPug.classList.value.split("'")
const data = preData[1].split(',')

const myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Passengers','Alive', 'Dead'],
    datasets: [
      {
        label: 'All',
        data: data,
        backgroundColor: [
          'rgba(18, 144, 196, 1)',
          'rgba(26, 196, 18, 0.2)',
          'rgba(196, 18, 77, 0.2)',
        ],
        borderColor: [
          'rgba(18, 144, 196, 1)',
          'rgba(26, 196, 18, 1)',
          'rgba(196, 18, 77, 1)',
        ],
        borderWidth: 1,
      },
    ],
  },
})
