import { json } from '@sveltejs/kit'
export async function POST({ request }) {

    const data = await request.json();
    console.log(data); 
    let response = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-axqssfl/endpoint/validate_admin', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
        
    })
    
    let result  = await response.json() 
    return json({data:result}) 
}


// exports = async function({ query, headers, body}, response) {
//     let data = JSON.parse(body.text())
//     let admin_data = (await context.services.get("mongodb-atlas").db("bus_buddy").collection("admin_credentials").find({}).toArray())[0]; //.sort({"created_at":1}).limit(1);
    
//     console.log('admin_data', admin_data, JSON.stringify(admin_data[0]), Object.keys(admin_data));
    
//     console.log('1', data.user_id, admin_data.user_id, data.user_id == admin_data.user_id)
//     console.log('2', data.password, admin_data.password, data.password == admin_data.password)
    
//     if(data.user_id == admin_data.user_id && data.password == admin_data.password){
//       return {success:true,message:"Login Successful"}
//     }
//     else{
//       return {success:false,message:"Invalid Credentials",data:admin_data,req:data}
//     }
//     
//  };
