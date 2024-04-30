<script>
    // import Header from '$lib/user_header.svelte';
    import Navigation from "$lib/user_navigation.svelte";
    export let data;

    let filtered_data = data.filter_data;
    console.log(filtered_data);

</script>

<section>
    <!-- <Header/> -->
  <table>
        <thead>
          <tr>
            <th>Location</th>
            <th>AQI</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {#each filtered_data as item}
            <tr>
              <td>{item.new_device_location}</td>
              <td>{item.value}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>
            </tr>
          {/each}
        </tbody>
      </table>
      
    <Navigation />
</section>
<style>
    table {
      border-collapse: collapse;
      width: 100%;
    }
    th, td {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>
  
