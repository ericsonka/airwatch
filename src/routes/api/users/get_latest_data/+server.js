import { json } from '@sveltejs/kit'
// export async function POST({ request }) {

//     const data = await request.json(); 
//     let response = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-axqssfl/endpoint/get_all_sensors_air')
//     let result = await response.json()
//     console.log(result)
//     return json(result) 
// }
 

export async function POST({ request }) {
    try {
        const get_all_sensors = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-axqssfl/endpoint/get_all_sensors_air');
        const sensor_result = await get_all_sensors.json();
        const sensor_data = sensor_result.data;
        console.log(sensor_data);

        const get_all_devices = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-axqssfl/endpoint/get_all_devices_air');
        const device_result = await get_all_devices.json();
        const devices = device_result.data;
        console.log(devices);
 
      
        const combinedData = devices.map(device => { 
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
        
        return json(combinedData)
    } catch (error) {
        console.error("Error:", error); 
        return json({
            error: "Failed to fetch data"
        })
    }
}
