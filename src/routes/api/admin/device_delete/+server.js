
import { json } from "@sveltejs/kit";
export async function POST({ request }) {
    let data
    let response = await request.json();
    // console.log(response);


 
    try{
        let  result = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-axqssfl/endpoint/delete_device', {
            method: 'POST',
            body: JSON.stringify(response),
            headers: {
                'Content-Type': 'application/json'
            }
        }); 
        data = await result.json() 
        // console.log(result);
        // console.log(data)  
         
    }catch(e){ 
        console.log(e);
    }
    return json({status: 200, data: data});
}       