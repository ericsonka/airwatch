<script>
   

    function handle_goto_page(route_name){
        location.href = '/user/'+route_name
    }
</script>

<div class="header_container">
    <div class="greetings_with_username">
        <p>Air Monitoring</p>
        <div class="user_icon" on:click={()=>{handle_goto_page('login')}}>
            <i class="fa fa-sign-out"></i>
        </div>
    </div>
</div>

<style>
    .header_container{
        padding-top: 15px;
    }
    .greetings_with_username{
        display: flex;
        justify-content: space-between;
        padding-right: 15px;
        align-items: center;
    }
    .greetings_with_username p{
    width: 99%;
    text-align: left;
    font-family: 'Poppins', sans-serif;
    font-size: 20px;
    font-weight: 700;
    padding-left: 20px;
    }
    .user_icon{
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    }
    .user_icon i{
        color: #7878bd;
    }
</style>