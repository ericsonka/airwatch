<script>
    import { onMount } from "svelte";
    import UserNavigation from "$lib/user_navigation.svelte";
    export let data;
    let sensor_data = data.combinedData;

    // Function to check sensor data and add locations with good air quality to the list
    let notifications = [];
    let liked_user_id = "";

    onMount(() => {
        liked_user_id = localStorage.getItem("logged_in_user_id");
        console.log(liked_user_id);
        checkSensorData();
    });

    function checkSensorData() {
        sensor_data.forEach((entry) => {
            if (
                entry.sensor_data.sensor_value < 80 &&
                entry.liked_user_id === liked_user_id
            ) {
                notifications.push(
                    `Air quality is good at ${entry.location_name}`,
                );
            }
            if (
                entry.sensor_data.sensor_value >= 80 &&
                entry.sensor_data.sensor_value <= 100 &&
                entry.liked_user_id === liked_user_id
            ) {
                notifications.push(
                    `Air quality is moderate at ${entry.location_name}`,
                );
            }
            if (
                entry.sensor_data.sensor_value > 100 &&
                entry.liked_user_id === liked_user_id
            ) {
                notifications.push(
                    `Air quality is unhealthy at ${entry.location_name}`,
                );
            }
            notifications = [...notifications]; // trigger reactivity
        });
    }
</script>

<section>
    <div class="main_container">
        {#if notifications.length > 0}
            {#each notifications as notification}
                <div class="card">
                    <div class="header">
                        <span class="icon">
                            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clip-rule="evenodd"
                                    d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                                    fill-rule="evenodd"></path>
                            </svg>
                        </span>
                        <p class="alert">New message!</p>
                    </div>
                    <p class="message">
                        {notification}
                    </p>
                </div>
            {/each}
        {/if}
        <UserNavigation />
    </div>
</section>

<style>
    .main_container {
        padding-top: 3px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        padding-bottom: 60px;
        height: auto;
        overflow-y: scroll;
        min-height: 100vh;
    }

    .card {
        min-width: 299px;
        border-width: 1px;
        border-color: rgba(219, 234, 254, 1);
        border-radius: 1rem;
        background-color: rgba(255, 255, 255, 1);
        padding: 1rem;
        max-height: 100px;
    }

    .header {
        display: flex;
        align-items: center;
        grid-gap: 1rem;
        gap: 1rem;
    }

    .icon {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 9999px;
        background-color: rgba(96, 165, 250, 1);
        padding: 0.5rem;
        color: rgba(255, 255, 255, 1);
    }

    .icon svg {
        height: 1rem;
        width: 1rem;
    }

    .alert {
        font-weight: 600;
        color: rgba(107, 114, 128, 1);
    }

    .message {
        margin-top: 1rem;
        color: rgba(107, 114, 128, 1);
    }
</style>
