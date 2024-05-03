
export async function load({  }) {

  
    let get_all_favourite_sensors = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-axqssfl/endpoint/get_all_favourite_sensor_data')
    let result = await get_all_favourite_sensors.json(); 
    // console.log(result);
    let favourite_sensor_data = result.data;
    // let liked_user_id = localStorage.getItem("logged_in_user_id");
    // console.log(liked_user_id);
    console.log(favourite_sensor_data);  
    
    const get_all_sensors = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-axqssfl/endpoint/get_all_sensors');
    const sensor_result = await get_all_sensors.json();
    const sensor_data = sensor_result.data;
    console.log(sensor_data);


    const combinedData = favourite_sensor_data.map(device => { 
        const deviceSensorData = sensor_data.filter(data => data.unique_id_device === device.device_profile_id);
        deviceSensorData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        deviceSensorData.reverse();
        const newestSensorData = deviceSensorData.length > 0 ? deviceSensorData[0] : null;
        return {
            ...device,
            sensor_data: newestSensorData
        };
    });
    
    console.log(combinedData);




    return {
        combinedData
    }
}    