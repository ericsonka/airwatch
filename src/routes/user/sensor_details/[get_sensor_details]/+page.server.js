export async function load({ params }) {
    let sensor_id = params.get_sensor_details;
    console.log(sensor_id); 

    let get_all_sensors = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-axqssfl/endpoint/get_all_sensors_air');
    let result = await get_all_sensors.json(); 
    let filter_data = result.data.filter((sensor) => sensor.unique_id_device == sensor_id);
    console.log(filter_data); 

    const get_all_devices = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-axqssfl/endpoint/get_all_devices_air');
    const device_result = await get_all_devices.json();
    const devices = device_result.data;
    // console.log(devices);

    const combinedData = devices
        .filter(device => device.device_profile_id === sensor_id) 
        .map(device => {
            const deviceSensorData = filter_data.filter(data => data.unique_id_device === device.device_profile_id);
            return {
                ...device,
                sensor_data: deviceSensorData
            };
        });

    console.log(combinedData);

    return {
        combinedData
    };
}