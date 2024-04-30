
import { json } from "@sveltejs/kit";
import shortid from 'shortid';
shortid.characters(
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
  );

export async function POST({ request }) {
    const unique_id = shortid.generate();
    let data;
    let incoming_json_data = await request.json(); 
    incoming_json_data.user_profile_id = `APM_${unique_id}`;
    console.log(incoming_json_data);
    try{
        let  result = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-axqssfl/endpoint/user_registration', {
            method: 'POST',
            body: JSON.stringify(incoming_json_data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        data = await result.json()
        console.log(data) 
    }catch(e){
        console.log(e);
    }

    return json({status: 200, data: data});
}