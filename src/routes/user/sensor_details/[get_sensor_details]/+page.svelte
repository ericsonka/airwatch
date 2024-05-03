<script>
  import { onMount } from "svelte";
  // import Header from '$lib/user_header.svelte';
  import Navigation from "$lib/user_navigation.svelte";
  export let data;

  let filtered_data = data.combinedData
  
  console.log(filtered_data); 
 
  onMount(() => {
    let chart_labels = [];
  let chart_values = [];

let totalValue = 0;
for (let i = 0; i < filtered_data.length; i++) {
  let single_data = filtered_data[i];
  for (let j = 0; j < single_data.sensor_data.length; j++) {
    let sensor_entry = single_data.sensor_data[j];
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]
    let currentDate = new Date(sensor_entry.currentDate);
    let formattedDate = currentDate.getDate() + " " + monthNames[currentDate.getMonth()]; // Assuming monthNames is defined
    chart_labels.push(formattedDate);
    chart_values.push(sensor_entry.sensor_value);

    // Summing up the values
    totalValue += sensor_entry.sensor_value;
  }
}

// Calculating the average value
let averageValue = totalValue / chart_values.length;

// Log the average value
console.log("Average Value:", averageValue);

let instance = new Chartist.Line(
  ".ct-chart",
  {
    labels: chart_labels,
    series: [chart_values],
  },
  {
    fullWidth: true,
    chartPadding: {
      right: 40,
    },
  }
);
console.log(instance);

  });
</script>

<section>
  <!-- <Header/> -->
  <div class="chart_container">
    <div class="ct-chart"></div>
  </div>

  <table>
    <thead>
        <tr>
            <th>Location Name</th>
            <th>Sensor Values</th>
            <th>Date</th>
        </tr>
    </thead>
    <tbody>
        {#each filtered_data as item}
        <tr>
            <td>{item.location_name}</td>
            <td>
              {#if  item.sensor_data.length}
                <ul>
                  {#each item.sensor_data as sensor_data }
                     <li>{sensor_data.sensor_value}</li>
                  {/each}
              </ul>
              {/if}
                
            </td>
            <td>{item.sensor_data[0].currentDate}</td> <!-- Assuming you want to display the date of the first sensor data entry -->
        </tr>
        {/each}
    </tbody>
</table>

  <Navigation />
</section>

<style>
  section {
    overflow-y: scroll;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  th,
  td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  th {
    background-color: #f2f2f2;
  }
  .chart_container {
    display: flex;
    justify-content: center;
    /* height: 50vh; */
    align-items: center;
    justify-content: center;
  }
  .ct-chart {
    width: 600px;
    height: 600px;
  }
</style>
