import { json } from '@sveltejs/kit'
export async function POST({ request }) {

    const data = await request.json();

    console.log(data); 
    let response = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-axqssfl/endpoint/user_validation', {
        method: "POST",
        body: JSON.stringify(
           data
        ),
        headers: {
            "Content-Type": "application/json", 
        },
        
    })
    
    let result  = await response.json() 
    console.log(result);
    return json({data_1:result}) 
}
 