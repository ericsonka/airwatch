export async function load({ }) {
    let get_all_sensors = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-axqssfl/endpoint/get_all_sensors')
    let result = await get_all_sensors.json(); 

    let sensor_data = result.data
        console.log(' Ranking sensor_data',sensor_data);




    return {
        sensor_data
    }
}      