import { json } from "@sveltejs/kit";
export async function POST({ request }) {
      let fav_id = await request.json();
      let fav_data 
      console.log(fav_id);
      try{
        let  result = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-axqssfl/endpoint/get_fav_sensor', {
            method: 'POST',
            body: JSON.stringify(fav_id),
            headers: {
                'Content-Type': 'application/json'
            }
        });
         result = await result.json()
        fav_data = result.data;
         console.log(fav_data);  
       
     
    }catch(e){
        console.log(e); 
    }
    let data_to_insert
    let  result = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-axqssfl/endpoint/insert_fav_device', {
        method: 'POST',
        body: JSON.stringify(
            fav_data
         ),
        headers: {
            'Content-Type': 'application/json' 
        }
    });
    data_to_insert = await result.json()


return json({status: 200, data_to_insert: data_to_insert});
}


