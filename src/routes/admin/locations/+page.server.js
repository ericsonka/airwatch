

export async function load({  }) {
    let get_all_devices = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-axqssfl/endpoint/get_all_devices')
    let result = await get_all_devices.json(); 
    // console.log(result);
    let devices = result.data;
    // console.log(devices);
    

    let get_sensor_data = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-axqssfl/endpoint/get_all_sensors')
    let incoming_sensor_data = await get_sensor_data.json(); 
    // console.log(incoming_sensor_data);
  
    let sensor_data = incoming_sensor_data.data;
    // console.log(sensor_data);
    

    return {
        devices,
        sensor_data
                                          
    }
}  