<script>
    import Header from "$lib/Header.svelte";
    import Navigation from "$lib/Navigation.svelte";
    export let data;
    let devices_data_list = data.devices;
    // console.log(devices_data_list);
    async function insert_devices() {
        let response = await fetch("/api/admin/insert_devices", {
            method: "POST",
            body: JSON.stringify({ new_device: new_device }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        // console.log(response);
    }


 //  ....................................... Google Map Place Search ..................................................

 let location = ["", "", ""];
    let place_id = "";
    let googleMapsLink = ["", "", ""];
    let current_input_element = [];
    let index = 0;
    let coordinate;
    async function initAutocomplete() {
        // let input = document.getElementById(`location-input${index}`);
        let input = current_input_element[index];
        // console.log(input);
        const options = {
            fields: ["formatted_address", "geometry", "name", "place_id"],
            strictBounds: false,
        };
        let autocomplete = new google.maps.places.Autocomplete(input, options);
        // console.log(autocomplete);

       autocomplete.addListener("place_changed", function () {
            let place = autocomplete.getPlace();
            place_id = place.place_id;
            googleMapsLink[index] =`https://www.google.com/maps/place/?q=place_id:${place_id}`;
            let latitude = place.geometry.location.lat();
            let longitude = place.geometry.location.lng();
            // console.log( latitude,longitude); 

            coordinate = `${latitude},${longitude}`;
            // location[index] = googleMapsLink[index];
            // console.log(googleMapsLink[index]); 
        });
    }
    console.log(coordinate);
  



 
    let show_hide = false;
    function show_adding_device_popup() {
        show_hide = !show_hide;
        console.log("added",new_device);
    }
    let new_device = {
        device_id: "",
        device_name: "",
        location_coordinates:coordinate,
        device_status: "",
        location_name: "",
    };

    async function add_device(e) {
        e.preventDefault();
        new_device.location_coordinates = coordinate
        
        if (!new_device.device_id) {
            alert("Please provide a device ID");
            return;
        }
        if (!new_device.device_name) {
            alert("Please provide a device name");
            return;
        }
       
        if (!new_device.location_name) {
            alert("Please provide a location name");
            return;
        }
       
        if (!new_device.device_status) {
            alert("Please provide a device status");
            return;
        }

        devices_data_list = [...devices_data_list, new_device];
        show_hide = !show_hide;
        await insert_devices();
        new_device = {
            device_id: "",
            device_name: "",
            location_coordinates:coordinate,
            device_status: "",
            location_name: "",
        };
        
    }
    async function handle_delete_bus_profile(device_id) {
        let response = await fetch("/api/admin/device_delete", {
            method: "POST",
            body: JSON.stringify({ device_id: device_id }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        let result = await response.json();
        console.log(result);
        let return_new_device = result.data.return_values;
        devices_data_list = return_new_device;
        console.log(devices_data_list);
    }
   
   console.log(devices_data_list);
</script>

<section>
    <Header />
    <div class="main_section">
        <div class="add_device_section">
            <div class="adding_section" on:click={show_adding_device_popup}>
                <div class="adding_section_i">
                    <i class="fa-solid fa-plus"></i>
                </div>
                <p>Add Devices</p>
            </div>
        </div>
        
        {#each devices_data_list as device}
            <div class="added_device_list">
                <p>Device Id :{device.device_id}</p>
                <h1>Device Name : <span>{device.device_name}</span></h1>
                <h2>Device Location : <span>{device.location_name}</span></h2>
                <h4>
                    Device Status : <span
                        class:is_online={device.device_status != "offline"}
                        >{device.device_status}</span
                    >
                </h4>
                {#if device.device_profile_id !== "DRV_eUWtpCw59" && device.device_profile_id !== 'DRV_@skt4oOMb'}
                
                <i
                    on:click={() =>
                        handle_delete_bus_profile(device.device_profile_id)}
                    class="fa-solid fa-trash delete"
                ></i>
                {/if}
                <!-- <pre>{device._id}</pre> -->
            </div>
        {/each}

        {#if show_hide}
            <div class="adding_page_container">
                <i class="fa-solid fa-xmark" on:click={show_adding_device_popup}
                ></i>

                <div class="ading_page_details">
                    <h1>Add Device</h1>
                    <div class="input-container">
                        <form action="">
                            <input
                                placeholder="Enter Device Id"
                                bind:value={new_device.device_id}
                                class="input-field"
                                type="number"
                            />
                            <label for="input-field" class="input-label"
                                >Enter Device Id</label
                            >
                            <input placeholder="Search Your Place" id="location-input{index}" bind:this={current_input_element[0]}    bind:value={location[index]} on:input={initAutocomplete} class="input-field" type="text" />
                            <label for="input-field" class="input-label" >Device Location</label   >
                            <input
                                placeholder="Device Name"
                                bind:value={new_device.device_name}
                                class="input-field"
                                type="text"
                            />
                            <!-- <label for="input-field" class="input-label"></label> -->
                            <input
                                placeholder="Location Name"
                                bind:value={new_device.location_name}
                                class="input-field"
                                type="text"
                            />

                           
                            
                            <p>Device Status</p>
                            <select
                                name="status"
                                id="status"
                                bind:value={new_device.device_status}
                                class="status-select"
                            >
                                <option value="online">Online</option>
                                <option value="offline">Offline</option>
                            </select>

                            <!-- <label for="input-field" class="input-label">Device Name</label> -->
                            <button class="cta" on:click={add_device}>
                                <span class="hover-underline-animation">
                                    Add device
                                </span>
                                <svg
                                    id="arrow-horizontal"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="10"
                                    viewBox="0 0 46 16"
                                >
                                    <path
                                        id="Path_10"
                                        data-name="Path 10"
                                        d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                                        transform="translate(30)"
                                    ></path>
                                </svg>
                            </button>
                        </form>
                        <div class="add_device_image">
                            <img src="/admin/devices/device.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </div>
    <Navigation />
</section>

<style>
    .main_section {
        padding: 10px;
        position: relative;
        z-index: 1;
        height: 100%;
        /* overflow-y: scroll; */
        padding-bottom: 100px;
    }
    .add_device_section {
        min-height: 150px;
        background-color: rgb(172 162 162 / 37%);
        border: 1px solid white;
        border-radius: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .adding_section {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .adding_section_i {
        width: 50px;
        height: 50px;
        background-color: white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 25px;
    }
    .adding_section_i i:hover {
        transform: rotate(50deg);
        transition: all 100ms linear;
        transition-delay: 50ms;
    }
    .adding_section p {
        font-size: 25px;
        text-transform: capitalize;
    }
    .added_device_list {
        border-top: 1px solid rgb(22, 22, 22);
        margin-top: 25px;
        position: relative;
    }
    .added_device_list h1 {
        margin-bottom: 0;
        font-size: 18px;
        text-transform: capitalize;
        margin-top: 4px;
        font-weight: 200;
        font-family: monospace;
    }
    .added_device_list h2 {
        margin-bottom: 0;
        font-size: 18px;
        text-transform: capitalize;
        margin-top: 4px;
        font-weight: 200;
        font-family: monospace;
    }
    .added_device_list h1 span {
        font-weight: 400;
        font-family: monospace;
    }
    .added_device_list p {
        font-size: 10px;
        text-transform: capitalize;
        margin-top: 6px;
        margin-bottom: 0;
        margin-top: 4px;
        font-family: monospace;
    }
    .added_device_list h4 {
        margin-top: 5px;
        font-family: monospace;
        margin-bottom: 0px;
    }
    .added_device_list h4 span {
        color: red;
        letter-spacing: 1px;
        font-family: monospace;
    }
    .added_device_list span.is_online {
        color: rgb(37 133 37);
        letter-spacing: 1px;
    }
    .added_device_list i {
        position: absolute;
        right: 10px;
        cursor: pointer;
        color: red;
        top: 10px;
    }
    .adding_page_container {
        width: auto;
        min-height: 100%;
        background-color: rgb(223 223 223);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin-inline: 10px;
        border-radius: 20px;
        z-index: 3;
    }
    .adding_page_container i {
        position: absolute;
        top: 8px;
        right: 8px;
        margin: 10px;
        color: white;
    }
    /* Input container */
    .input-container {
        position: relative;
        margin: 20px;
        /* overflow: hidden; */
    }

    /* Input field */
    .input-field {
        display: block;
        padding: 10px;
        font-size: 16px;
        border: none;
        border-bottom: 2px solid #979191;
        outline: none;
        background-color: transparent;
        width: 95%;
        padding-top: 40px;
    }
    .input-label {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 16px;
        color: rgba(204, 204, 204, 0);
        pointer-events: none;
        transition: all 0.3s ease;
    }
    .input-field:focus + .input-label {
        top: -20px;
        font-size: 12px;
        color: #000000;
    }
    .ading_page_details h1 {
        text-align: center;
        font-family: monospace;
    }
    .cta {
        border: none;
        background: none;
        cursor: pointer;
        padding-top: 20px;
        margin: 0 auto;
        width: 100%;
    }

    .cta span {
        padding-bottom: 7px;
        letter-spacing: 4px;
        font-size: 14px;
        padding-right: 9px;
        text-transform: capitalize;
    }

    .cta svg {
        transform: translateX(-8px);
        transition: all 0.3s ease;
    }

    .cta:hover svg {
        transform: translateX(0);
    }

    .cta:active svg {
        transform: scale(0.9);
    }

    .hover-underline-animation {
        position: relative;
        color: black;
        padding-bottom: 20px;
    }

    .hover-underline-animation:after {
        content: "";
        position: absolute;
        width: 150px;
        transform: scaleX(0);
        height: 2px;
        bottom: 0;
        left: 0px;
        background-color: #000000;
        transform-origin: bottom right;
        transition: transform 0.25s ease-out;
    }

    .cta:hover .hover-underline-animation:after {
        transform: scaleX(1);
        transform-origin: bottom left;
    }
    .add_device_image {
        width: 100%;
        height: 350px;
        margin: 0 auto;
        /* background-color: #000000; */
        margin-top: 30px;
    }

    .add_device_image img {
        object-fit: cover;
        width: 100%;
    }

    .status-select {
        width: 100%;
        padding: 10px;
        margin-top: 0px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 5px;
        outline: none;
        transition: border-color 0.3s;
    }

    .status-select:focus {
        border-color: #007bff; /* change to your desired focus color */
    }
</style>
