<script>
    // import Header from '$lib/user_header.svelte';
    import { onMount } from "svelte";
    import UserNavigation from "$lib/user_navigation.svelte";
    export let data;
    let sensor_data = data.combinedData;
    // console.log(sensor_data);
let loading_screen = true;

    function getQuality(value) {
        // console.log(value);

        if (value <= 80) return "Good";
        if (value >= 50 && value <= 90) return "moderate";
        if (value >= 100 && value <= 140)
            return "unhealthy for sensitive groups";
        if (value >= 140 && value <= 200) return "Unhealthy";
        if (value >= 200) return "very unhealthy";
        // return "healthy";
        // console.log(getQuality(28));
    }
    function got_view_page(sensor_object_id) {
        if (sensor_object_id) {
            location.href = "sensor_details/" + sensor_object_id;
        }
    }

    async function get_favourite(fav_data) {
        fav_data.is_liked = !fav_data.is_liked;
        sensor_data = sensor_data;
        let insert_object = {
            device_id: fav_data.device_id,
            device_name: fav_data.device_name,
            location_name: fav_data.location_name,
            device_profile_id: fav_data.device_profile_id,
        };

        insert_object.liked_user_id = localStorage.getItem("logged_in_user_id");
        // console.log(insert_object);
        let response = await fetch("/api/users/device_favourite", {
            method: "POST",
            body: JSON.stringify(insert_object),
            headers: {
                "Content-Type": "application/json",
            },
        });
        // console.log(response);
    }
    let background_image = {
        url: "/users/2148098554.jpg",
    };
    let air_logo = {
        url: "/air_quallity_logo/logo.png",
    };
    onMount(() => {
        setTimeout(() => {
        
            loading_screen = false;
        },5000)
    })
    // let latestReading = sensor_data[0].readings[sensor_data[0].readings.length-1];
    // console.log(latestReading);
</script>

<section>
    {#if loading_screen}
         <div class="loading" style="width: 100vw; height:100vh; background-color: white"> <img src="/air_quallity_logo/logo.png" alt=""></div>
    {/if}
    <div
    class="main_container"
    style="background-image: url({background_image.url});"
    >
        <div class="inner_con">
            {#each sensor_data as data_sensor}
                <div class="card">
                    <div class="section_heading">
                        <img src={air_logo.url} alt="" /><span
                            class="heading_word">Air Quality</span
                        >
                    </div>
                    <div class="inner-card">
                        <div class="card-header">
                            <span>{data_sensor.location_name} </span>

                            <i
                                class="fa-regular fa-heart favourate"
                                class:fav_selected={data_sensor.is_liked}
                                on:click={() => get_favourite(data_sensor)}
                            ></i>
                            <!-- <pre>{data_sensor.sensor_data.unique_id_device}</pre> -->
                        </div>

                        {#if data_sensor.sensor_data}
                            <div class="value">
                                <span
                                    >{data_sensor.sensor_data
                                        .sensor_value}</span
                                >
                            </div>
                        {/if}
                        <div class="air_quality_messaure">
                            <span class="temp">US AQI</span>
                        </div>
                    </div>
                    <div
                        class="temp-scale {getQuality(
                            data_sensor.sensor_data.sensor_value,
                        )}"
                    >
                        <span
                            on:click={() =>
                                got_view_page(
                                    data_sensor.sensor_data.unique_id_device,
                                )}
                            >{getQuality(
                                data_sensor.sensor_data.sensor_value,
                            )}</span
                        >
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <UserNavigation />
</section>

<style>
    .loading{
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 666;
    }
    .loading img{
        width: 200px;
    }
    .card-header .fav_selected {
        color: red;
    }
    section {
        overflow: hidden;
    }

    .main_container {
        padding-top: 3px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        /* padding-bottom: 60px;
        margin-bottom: 50px; */
        height: auto;
        overflow-y: scroll;
        min-height: 100vh;
        /* position: fixed; */
        width: 100vw;
        background-position: top;
    }

    .inner_con {
        padding-top: 3px;
       
        margin-bottom: 50px;
    }
    .card {
        border: 1px solid #ccc;
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 5px;
    }
    .inner-card {
        display: flex;
        flex-direction: column;
        /* align-items: center; */
    }
    .card-header {
        font-weight: bold;
        position: relative;
    }
    .favourate {
        cursor: pointer;
        position: absolute;
        font-size: 20px;
        right: 0;
        bottom: 0;
        top: 0;
    }
    .favourate.selected {
        color: red;
    }
    .card-header span {
        display: flex;
        justify-content: space-between;
    }
    .temp-scale {
        margin-top: 10px;
    }
    .card {
        min-height: 160px;
        position: relative;
        padding: 15px;
        background: radial-gradient(
                178.94% 106.41% at 26.42% 106.41%,
                #d3d3d1 0%,
                rgba(255, 255, 255, 0) 71.88%
            ),
            #e7e7e7a2;
        box-shadow:
            0px 155px 62px rgba(0, 0, 0, 0.01),
            0px 87px 52px rgba(0, 0, 0, 0.05),
            0px 39px 39px rgba(0, 0, 0, 0.09),
            0px 10px 21px rgba(0, 0, 0, 0.1),
            0px 0px 0px rgba(0, 0, 0, 0.1);
        border-radius: 23px;
        transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
        cursor: pointer;
        margin: 0 auto;
        margin-top: 44px;
        margin-inline: 20px;
        height: auto;
        margin-bottom: 90px;
    }

    .card:hover {
        transform: scale(1.05);
    }

    @keyframes sunshines {
        0% {
            transform: scale(1);
            opacity: 0.6;
        }

        100% {
            transform: scale(1.4);
            opacity: 0;
        }
    }

    @keyframes clouds {
        0% {
            transform: translateX(15px);
        }

        50% {
            transform: translateX(0px);
        }

        100% {
            transform: translateX(15px);
        }
    }

    .card-header {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .card-header span:first-child {
        word-break: break-all;
        font-weight: 200;
        font-size: 26px;
        padding-top: 10px;
        padding-left: 20px;
        text-transform: capitalize;
        color: rgba(0, 0, 0, 0.66);
        letter-spacing: 2px;
    }

    .value {
        word-break: break-all;
        font-weight: 800;
        font-size: 30px;
        padding-top: 20px;
        padding-left: 20px;
        text-transform: capitalize;
        color: rgba(0, 0, 0, 0.66);
        letter-spacing: 2px;
    }
    .temp-scale {
        width: 150px;
        height: 36px;
        position: absolute;
        right: 25px;
        bottom: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.06);
        border-radius: 9px;
    }

    .temp-scale span {
    }
    .card img {
        width: 65px;
        height: 65px;
        object-fit: contain;
        padding-right: 5px;
    }
    .section_heading {
        display: flex;
        /* justify-content: center; */
        align-items: center;
        margin-top: 0;
        font-size: 20px;
    }

    .heading_word::after {
        content: "";
        display: block;
        border-bottom: 2px dotted rgb(0, 0, 0);
        margin-top: 5px;
    }
    .air_quality_messaure span {
        word-break: break-all;
        font-weight: 200;
        font-size: 17px;
        padding-top: 20px;
        padding-left: 20px;
        text-transform: capitalize;
        color: rgba(0, 0, 0, 0.66);
        letter-spacing: 0px;
    }
    .Good {
        background-color: rgb(34, 255, 34);
        color: white;
        font-weight: 700;
        font-size: 18px;
        text-transform: capitalize;
    }
    .moderate {
        background-color: rgb(236, 216, 37);
        color: white;
        font-weight: 700;
        font-size: 18px;
        text-transform: capitalize;
    }
    .unhealthy {
        background-color: rgb(255, 102, 0);
        color: white;
        font-size: 15px;
        font-weight: 200;
        text-align: center;
        letter-spacing: 1px;
        text-transform: capitalize;
    }
    .Unhealthy {
        background-color: rgb(255, 5, 5);
        color: white;
        font-size: 15px;
        font-weight: 200;
        text-align: center;
        letter-spacing: 1px;
        text-transform: capitalize;
    }
    .risky {
        background-color: red;
        color: white;
        font-weight: 700;
        font-size: 18px;
        text-transform: capitalize;
    }

    .very {
        background-color: rgb(136, 78, 228);
        color: white;
        font-weight: 700;
        font-size: 18px;
        text-transform: capitalize;
    }
</style>
