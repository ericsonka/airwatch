<script>

    function go_to_login(){
        window.location.href = '/user/login'

    }
  
    let error_message = "";
    let users = {
        user_name: '',
        password: '',
        email: '',
    }


    // function handle_registration(e){
    //     // e.preventDefault()
    //     // if(user_name == '' || password == ''){
    //     //     alert('Please enter all fields')
    //     //     return
    //     // }window.location.href = '/user/login'
    // }
     
    async function handle_registration(){
        
        let response = await fetch('/api/users/user_registration', {
            method: "POST", 
            body: JSON.stringify(
                users
            ),
            headers: {
                "Content-Type": "application/json",
            },

        })
        // console.log(response);
        let result = await response.json()
        console.log(result)

        if(result.data.success===true){
            window.location.href = '/user/login'
        }
        else{
            error_message = result.data.message;
            console.log(error_message);
            return
        }
    }
    let background_image = {
        url:'/admin/login/login_background.jpg',
    }
</script>

<section>
    <div class="form-container" style="background-image: url({background_image.url});">
        <p class="title">Create account</p>
        <!-- <p class="sub-title">Let's get statred with your 30 days free trial</p> -->
        <form class="form">
            <input type="text" class="input" placeholder="Name" bind:value={users.user_name} />
            <input type="password" class="input" placeholder="Password" bind:value={users.password} />
             <input type="email" class="input" placeholder="Email" bind:value={users.email} />
            <button class="form-btn" on:click={handle_registration}>Create account</button>
        </form>
        <p class="sign-up-label">
            Already have an account?<span class="sign-up-link" on:click={go_to_login}>Log in</span>
        </p>
    </div>
</section>

<style>
    .form-container {
        width: auto;
        height: 100vh;
        background-color: #fff;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        /* border-radius: 10px; */
        box-sizing: border-box;
        padding: 20px 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-size: cover;
    }

    .title {
        text-align: center;
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
            "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
        margin: 10px 0 30px 0;
        font-size: 28px;
        font-weight: 800;
    }

    .sub-title {
        margin: 0;
        margin-bottom: 5px;
        font-size: 9px;
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
            "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    }

    .form {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 18px;
        margin-bottom: 15px;
    }

    .input {
        border-radius: 20px;
        border: 1px solid #c0c0c0;
        outline: 0 !important;
        box-sizing: border-box;
        padding: 12px 15px;
    }

    .form-btn {
        padding: 10px 15px;
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
            "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
        border-radius: 20px;
        border: 0 !important;
        outline: 0 !important;
        background: teal;
        color: white;
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }

    .form-btn:active {
        box-shadow: none;
    }

    .sign-up-label {
        margin: 0;
        font-size: 10px;
        color: #ffffff;
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
            "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    }

    .sign-up-link {
        margin-left: 20px;
        font-size: 11px;
        text-decoration: underline;
        text-decoration-color: teal;
        color: rgb(255, 255, 255);
        cursor: pointer;
        font-weight: 800;
    }

    .buttons-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-top: 20px;
        gap: 15px;
    }

    .apple-login-button,
    .google-login-button {
        border-radius: 20px;
        box-sizing: border-box;
        padding: 10px 15px;
        box-shadow:
            rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
            rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
            "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
        font-size: 11px;
        gap: 5px;
    }

    .apple-login-button {
        background-color: #000;
        color: #fff;
        border: 2px solid #000;
    }

    .google-login-button {
        border: 2px solid #747474;
    }

    .apple-icon,
    .google-icon {
        font-size: 18px;
        margin-bottom: 1px;
    }
</style>
