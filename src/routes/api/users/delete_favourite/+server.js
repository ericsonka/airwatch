import { json } from "@sveltejs/kit";
export async function POST({ request }) {
      let delete_favourite_data = await request.json();
      console.log(delete_favourite_data); 
 
    let data_to_delete
    let  result = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-axqssfl/endpoint/delete_fav_device', {
        method: 'POST',
        body: JSON.stringify(
            {delete_favourite_data}
         ),
        headers: {
            'Content-Type': 'application/json' 
        }
    }); 
    data_to_delete = await result.json() 
    console.log(data_to_delete);

return json({status: 200, data_to_delete: data_to_delete});
} 


