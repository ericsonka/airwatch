
import { json } from "@sveltejs/kit";
import shortid from 'shortid';
shortid.characters(
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
  );
  

export async function POST({ request }) {
    const unique_id = shortid.generate();
    let data;
    let incoming_json_data = await request.json(); 
   let unique_id_device = incoming_json_data.new_device.device_profile_id = `DRV_${unique_id}`;
    console.log(incoming_json_data.new_device);
    let new_device_location = incoming_json_data.new_device.location_name;
    console.log(new_device_location);
    console.log(unique_id_device);
    try{
        let  result = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-axqssfl/endpoint/insert_devices', {
            method: 'POST',
            body: JSON.stringify(incoming_json_data.new_device),
            headers: {
                'Content-Type': 'application/json' 
            }
        });
        data = await result.json() 
        console.log(data) 
    }catch(e){
        console.log(e);
    } 
    let data_1
    let min = 1;
    let max = 100;
    let randomNumber = null;

    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    console.log(randomNumber); 

    let currentDate = new Date().toUTCString(); 
    console.log(currentDate);
        let  result = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-axqssfl/endpoint/insert_device_id_sensor_data', {
            method: 'POST',
            body: JSON.stringify({
                unique_id_device:unique_id_device,
                currentDate:currentDate,
                sensor_value:randomNumber
            } ),
            headers: {
                'Content-Type': 'application/json' 
            }
        });
        data_1 = await result.json()
  
  
    return json({status: 200, data_1: data_1});
}