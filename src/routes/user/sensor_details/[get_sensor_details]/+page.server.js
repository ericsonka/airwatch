export async function load({ params }) {
    // console.log(params);

    let sensor_id = params.get_sensor_details
   
    let get_all_sensors = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-axqssfl/endpoint/get_all_sensors')
    let result = await get_all_sensors.json(); 
    // console.log(result.data[0]);
   let filter_data = result.data.filter((sensor) => sensor._id == sensor_id)
   console.log(filter_data);
    return {
        filter_data
    }
}      