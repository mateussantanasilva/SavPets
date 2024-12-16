async function prepareDataForCharts() {
  const initialsOfMonths = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

  const adoptionMonth = await findAllRecords(initialsOfMonths, '/api/v1/adocao', 'adoptionDate')
  const animalsMonth = await findAllRecords(initialsOfMonths, '/api/v1/relatorio-animais', 'arrivalDate')

  const groupedAdoptionMonths = groupDataByMonth(adoptionMonth, initialsOfMonths)
  const groupedAnimalMonths = groupDataByMonth(animalsMonth, initialsOfMonths)

  return { initialsOfMonths, groupedAdoptionMonths, groupedAnimalMonths }
}

async function findAllRecords(initialsOfMonths, endpoint, dateProperty) {
  const monthsInNumber = await fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      return data.map(record => record[dateProperty].split('-')[1]).sort((previous, current) => previous - current)
    })
    .catch(error => new Error(`Erro ao obter os registros ${error.message}`))

  const responseWithInitials = monthsInNumber.map(monthNumber => initialsOfMonths[monthNumber - 1])

  return responseWithInitials
}

function groupDataByMonth(months, initialsOfMonths) {
  const dataGrouped = months.reduce((month, value) => {
    if (month[value])
      month[value] += 1
    else
      month[value] = 1

    return month
  }, {})

  const dataGroupedWithAllMonths = {};

  for (let i = 0; i < initialsOfMonths.length; i++) {
    const month = initialsOfMonths[i];
    dataGroupedWithAllMonths[month] = dataGrouped[month] || 0
  }

  return dataGroupedWithAllMonths
}

(async function generateCharts() {
  // Preparação de dados  
  const dataForCharts = await prepareDataForCharts()
  const initialsOfMonths = dataForCharts.initialsOfMonths

  const groupedAdoptionMonths = dataForCharts.groupedAdoptionMonths
  const maxValueForAdoptionChart = Math.max(...Object.values(groupedAdoptionMonths)) + 1
  const adoptionData = Object.values(groupedAdoptionMonths)

  const groupedAnimalMonths = dataForCharts.groupedAnimalMonths
  const maxValueForAnimalChart = Math.max(...Object.values(groupedAnimalMonths)) + 1
  const animalData = Object.values(groupedAnimalMonths)

  // Criação dos gráficos
  const optionsAdoptions = {
    series: [{
      name: "Valor",
      data: adoptionData
    }],
    title: {
      text: 'Adoções',
      style: {
        fontSize: '18px'
      }
    },
    chart: {
      fontFamily: 'Poppins, sans-serif',
      height: 350,
      type: 'bar',
    },
    colors: ['#1E4357', '#316F90', '#4090BC', '#509BC3', '#69A9CC'],
    plotOptions: {
      bar: {
        columnWidth: '46%',
        distributed: true,
      }
    },
    responsive: [
      {
        breakpoint: 1150,
        options: {
          title: {
            style: {
              fontSize: '16px'
            }
          },
          plotOptions: {
            bar: {
              horizontal: true,
            }
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '14px'
              }
            }
          },
          xaxis: {
            max: maxValueForAdoptionChart,
          }
        }
      }
    ],
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: initialsOfMonths,
      labels: {
        style: {
          fontSize: '14px'
        }
      }
    },
    yaxis: {
	labels: {
	  	formatter: function (val) {
          return val.toFixed(0)
        },
	  },
      max: maxValueForAdoptionChart,
    },
  }
  const optionsAnimalsReceived = {
    series: [{
      name: "Valor",
      data: animalData
    }],
    title: {
      text: 'Animais recebidos',
      style: {
        fontSize: '18px'
      }
    },
    chart: {
      fontFamily: 'Poppins, sans-serif',
      height: 350,
      type: 'bar',
    },
    colors: ['#1E4357', '#316F90', '#4090BC', '#509BC3', '#69A9CC'],
    plotOptions: {
      bar: {
        columnWidth: '46%',
        distributed: true,
      }
    },
    responsive: [
      {
        breakpoint: 1150,
        options: {
          title: {
            style: {
              fontSize: '16px'
            }
          },
          plotOptions: {
            bar: {
              horizontal: true,
            }
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '14px'
              }
            }
          },
          xaxis: {
            max: maxValueForAnimalChart,
          }
        }
      }
    ],
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: initialsOfMonths,
      labels: {
        style: {
          fontSize: '14px'
        }
      }
    },
    yaxis: {
	  labels: {
	  	formatter: function (val) {
          return parseInt(val) === val ? val : ''
        },
	  },
      max: maxValueForAnimalChart,
    },
  }
  const optionsComparison = {
    series: [
      {
        name: "Adoções",
        data: adoptionData
      },
      {
        name: "Recebidos",
        data: animalData
      }
    ],
    title: {
      text: 'Balanço Anual',
      style: {
        fontSize: '18px'
      }
    },
    chart: {
      fontFamily: 'Poppins, sans-serif',
      height: 350,
      type: 'line',
      toolbar: {
        show: true,
        tools: {
          download: true,
          pan: true,
          zoomin: true,
          zoomout: true,
          selection: false,
          zoom: false,
          reset: false,
        }
      }
    },
    colors: ['#1E4357', '#69A9CC'],
    responsive: [
      {
        breakpoint: 425,
        options: {
          title: {
            style: {
              fontSize: '16px'
            }
          },
          chart: {
            toolbar: {
              show: false,
            }
          }
        }
      }
    ],
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: 'smooth'
    },
    markers: {
      size: 1
    },
    xaxis: {
      categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      labels: {
        style: {
          fontSize: '14px'
        }
      },
      offsetY: 10
    },
    yaxis: {
      min: 0,
      max: maxValueForAnimalChart,
      labels: {
	  	formatter: function (val) {
          return parseInt(val) === val ? val : ''
        },
	  },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    }
  }
  

  const chartAdoptions = new ApexCharts(document.querySelector('#chart-adoptions'), optionsAdoptions)
  const chartAnimalsReceived = new ApexCharts(document.querySelector('#chart-animals_received'), optionsAnimalsReceived)
  const chartComparison = new ApexCharts(document.querySelector('#chart-comparison'), optionsComparison)

  chartAdoptions.render()
  chartAnimalsReceived.render()
  chartComparison.render()
})()

