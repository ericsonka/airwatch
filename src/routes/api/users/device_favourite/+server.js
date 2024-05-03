import { json } from "@sveltejs/kit";
export async function POST({ request }) {
      let favourite_data = await request.json();
      console.log(favourite_data); 
 
    let data_to_insert
    let  result = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-axqssfl/endpoint/insert_fav_device', {
        method: 'POST',
        body: JSON.stringify(
            {favourite_data}
         ),
        headers: {
            'Content-Type': 'application/json' 
        }
    });
    data_to_insert = await result.json()
    console.log(data_to_insert);

return json({status: 200, data_to_insert: data_to_insert});
}


