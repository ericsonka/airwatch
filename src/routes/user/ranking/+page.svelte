<script>
    // import Header from '$lib/user_header.svelte';
    import UserNavigation from '$lib/user_navigation.svelte';
    import { onMount } from 'svelte';

export let data ;
// console.log(data);
let sensor_data = data.combinedData
// console.log(sensor_data);
function getQuality(value) {
        if (value <= 80) return "Good";
        if (value >= 50 && value <= 90) return "moderate";
        if (value >= 100 && value <= 140) return "unhealthy for sensitive groups";
        if (value >= 140 && value <= 200) return "Unhealthy";
        if(value >= 200) return "very unhealthy";
        // return "healthy";
    }
    // let latestReading = sensor_data[0].readings[sensor_data[0].readings.length-1];
    // onMount(() => {
    //     for(let n of sensor_data){
    //     // n.readings = n.readings.reverse();
    //     n.latest_value = n.readings.reverse()[0].sensor_data.sensor_value;
    // }
    // sensor_data = sensor_data
    // })

</script>


<section>
    <!-- <Header/> -->
    <div class="ranking_heading">
        <h1>Ranking</h1>
    </div>
    <div class="rank_container_T">
        <div class="rank_number_T">#</div>
        <div class="rank_name_T">MAJOR CITIES</div>
        <div class="rank_value_T">US AQI</div>
    </div>
    {#each sensor_data as data_sensor,index}
        <div class="rank_container">
            <div class="rank_number">{index+1}</div>
            <div class="rank_name">{data_sensor.location_name}</div>
            <div class="rank_value {getQuality(data_sensor.sensor_data.sensor_value)}"><span>{getQuality(data_sensor.sensor_data.sensor_value)}</span></div>
        </div>
    {/each}

    <UserNavigation/>
</section>

<style>
.ranking_heading{
    background-color: aliceblue;
    text-align: center;
}
.ranking_heading h1 {
    font-size: 18px;
    font-family: monospace;
    font-weight: 200;
}
.rank_container_T{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.rank_container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.rank_number_T{
    padding-inline: 20px;
}
.rank_number{
    padding-inline: 20px;
}
.rank_value_T{
    padding: 5px;
    margin-right: 10px;
}
.rank_value{
    padding: 5px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 20px;
    border-radius: 20px;
}
.rank_value span{
    padding-inline: 17px;
    height: 20px;
}
.rank_name{
    text-transform: capitalize;
}
.Good {
        background-color: rgb(34, 255, 34);
        color: white;
        font-weight: 700;
        font-size: 18px;
        text-transform: capitalize;
    }
    .moderate{
        background-color: rgb(236, 216, 37);
        color: white;   
        font-weight: 700;
        font-size: 18px;
        text-transform: capitalize;
    }
    .unhealthy {
        background-color: rgb(255, 102, 0);
        color: white;
        font-size: 15px;
        font-weight: 200;
        text-align: center;
        letter-spacing: 1px;
        text-transform: capitalize;
    }
    .Unhealthy {
        background-color: rgb(255, 5, 5);
        color: white;
        font-size: 15px;
        font-weight: 200;
        text-align: center;
        letter-spacing: 1px;
        text-transform: capitalize;
    }
    .risky {
        background-color: red;
        color: white;   
        font-weight: 700;
        font-size: 18px;
        text-transform: capitalize;
    }
  
    .very{
        background-color: rgb(136, 78, 228);
        color: white; 
        font-weight: 700;
        font-size: 18px;
        text-transform: capitalize;  
    }
    
</style>