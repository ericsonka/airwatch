<script>
    import Navigation from "$lib/user_navigation.svelte";
    import Map from "$lib/Map.svelte";

    export let data;
    console.log(data); 
    console.log(data.devices);
    let devices = data.devices
    let sensor_array = data.sensor_data
   
    let single_one;
    let get_single_loc
    // for (get_single_loc of devices) {
    //     console.log(get_single_loc);
    // //  single_one = get_single_loc.location_coordinates;
    // } 
    
    // console.log(single_one);
    let address_arr = {
        items:devices,
        sensors:sensor_array
    };
    console.log(address_arr);
    let  geoLocation_center = '9.983862080840547, 76.27444477610588';

    let map_instances = [];
    let map_zoom = 5;
        

    let map_config = {
		center: geoLocation_center,
		zoom: map_zoom,
	};


</script>

<section> 
    <Navigation />
    <Map bind:this={map_instances[address_arr]}
    {address_arr}
    {map_config} />
</section>
