<svelte:options accessors />

<script>
	export let map_config;
	export let address_arr;
	export let website_component_instance_id;
	export let map_height;
  
	import { onMount } from 'svelte';

	function toggleHighlight(markerView, property) {
		if (markerView.content.classList.contains('highlight')) {
			markerView.content.classList.remove('highlight');
			markerView.zIndex = null;
		} else {
			markerView.content.classList.add('highlight');
			markerView.zIndex = 1;
		}
	}

	function buildContent(property) {
		const content = document.createElement('div');

		// <i aria-hidden="true" class="fa-solid fa-location-dot fa-${property.type}" title="${property.type}"></i>
		// <div>
		// 	<i aria-hidden="true" class="fa fa-bed fa-lg bed" title="bedroom"></i>
		// 	<span class="fa-sr-only">bedroom</span>
		// 	<span>${property.bed}</span>
		// </div>

		content.classList.add('property');
		content.innerHTML = `
			<div class="icon">			
				
				<i aria-hidden="true" class="icon-location fa-solid fa-location-crosshairs" title="location"></i>
				<span class="fa-sr-only">location</span>
			</div>
			<div class="details">
				// <div class="heading">${property.address_heading}</div>
				// <div class="address">${property.address}</div>
				<div class="features">
								
				</div>
			</div>
			`;
		return content;
	}

	async function initialize_map_local() {
		const { Map, InfoWindow } = await google.maps.importLibrary('maps');
		const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary('marker');
		const { LatLng } = await google.maps.importLibrary('core');
		const center = new LatLng(
			map_config.center.split(',')[0].trim(),
			map_config.center.split(',')[1].trim()
		);
     
		const map_options = {
			zoom: map_config.zoom,
			mapId: '4d777f30a51d0ac6',
			center: center,
			// styles: {
			// 	disableMap: false,
			// 	backgroundColor: '#e08484',
			// 	saturation: '250'
			// },
			// styles: map_config.style,
			mapTypeControl: false,
			streetViewControl: false,
			scrollwheel: true,
			zoomControl: true, 
			gestureHandling: 'auto',
			fullscreenControl: false

		};

		console.log('map_options', map_options);

		const map = new Map(map_element_instance, map_options);

		console.log('map', map);
		window.map = map;

		let has_map_capabilities = false;
		map.addListener('mapcapabilities_changed', () => {
			const mapCapabilities = map.getMapCapabilities();

			console.log('isAdvancedMarkersAvailable');

			if (!mapCapabilities.isAdvancedMarkersAvailable) {
				console.log('Advanced markers are *not* available, add a fallback.');
			} else {	

				if(has_map_capabilities){
					return;
				}

				
				// console.log('Advanced markers are available');
				for (const property of address_arr.items) {
					
					// console.log('property', property.sensor_data);
					// console.log('position', property.location_coordinates);
					console.log(address_arr.items);

					const position = new google.maps.LatLng(
						parseFloat(property.location_coordinates.split(',')[0].trim()), 
						parseFloat(property.location_coordinates.split(',')[1].trim())
					);
					// const icon = document.createElement('span');
					let sensor_value = property.sensor_data.sensor_value;
					console.log(sensor_value);
					// icon.innerHTML = `${sensor_value}`;
					// icon.innerHTML = "2"
					
					const value = parseFloat(property.sensor_data.sensor_value);
    				// const quality = value;

					const icon = document.createElement('span');
					icon.innerHTML = `${value}`;

					// Set color based on quality
					
					const faPin = new PinElement({
						glyph: icon,
						glyphColor: '#ff8300',
						background: '#FFD514',
						borderColor: '#ff8300'
					});

					let marker = new AdvancedMarkerElement({
						position: position,
						map: map,
						content: faPin.element
					});

					
					// marker.content.classList.add("bounce");
			

				}
				function toggleMarkerClass(markerView, property) {
					if (markerView.content.classList.contains("bounce")) {
						markerView.content.classList.remove("bounce");
					} else {
						markerView.content.classList.add("bounce");
					}
				}
				has_map_capabilities = true;
			}
		});
	}

	let map_element_instance;

	onMount(() => {
		// handle on mount

		let callback_function_name = 'initializeMap__' + website_component_instance_id;
		window[callback_function_name] = initialize_map_local;

		let gmapScript = jQuery(document.createElement('script')); 
		gmapScript.attr({
			src:
				// 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDd1K-Ogq9F1iIvnfmOR5hQoE1S0Ht3iuM&callback=' +
				'https://maps.googleapis.com/maps/api/js?key=AIzaSyADR_U8zcOk5J8qI60WR5WnJAfTsyB4Lkw&v=weekly&libraries=marker&callback=' +
				callback_function_name
		});
		gmapScript.appendTo(jQuery(document.body));

		//@custom_script_code_on_mount_placeholder@
	});
</script>

<svelte:head>
	<script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
	<script src="https://use.fontawesome.com/releases/v6.2.0/js/all.js"></script>
</svelte:head>

<div bind:this={map_element_instance} id="map_div" style="min-height: {map_height}vh;" />

<style>
	#map_div {
		max-height: 75vh;
		min-height: 55vh;
		width: 100%;
   		 min-width: 300px;
   		 min-height: 100vh;
		position: relative;
		background-color: #eaf5ff;
	}

	:global(section.mobile #map_div) {
		min-width: 100%;
	}

	:global(.property) {
		align-items: center;
		background-color: #ffa000;
		border-radius: 50%;
		color: #263238;
		display: flex;
		font-size: 14px;
		gap: 15px;
		height: 30px;
		justify-content: center;
		padding: 4px;
		position: relative;
		position: relative;
		transition: all 0.3s ease-out;
		width: 30px;
	}

	:global(.property::after) {
		border-left: 9px solid transparent;
		border-right: 9px solid transparent;
		border-top: 9px solid #ffa000;
		content: '';
		height: 0;
		left: 50%;
		position: absolute;
		top: 90%;
		transform: translate(-50%, 0);
		transition: all 0.3s ease-out;
		width: 0;
		z-index: 1;
	}

	:global(.property .icon) {
		align-items: center;
		display: flex;
		justify-content: center;
		color: #fff;
	}

	:global(.property .icon svg) {
		height: 20px;
		width: auto;
	}

	:global(.property .details) {
		display: none;
		flex-direction: column;
		flex: 1;
	}
	:global(.property .heading) {
		color: #212529;
		font-size: 13px;
		margin-bottom: 10px;
		margin-top: 5px;
	}

	:global(.property .address) {
		color: #212529;
		font-size: 10px;
		margin-bottom: 10px;
		margin-top: 5px;
	}

	:global(.property .features) {
		align-items: flex-end;
		display: flex;
		flex-direction: row;
		gap: 10px;
	}

	:global(.property .features > div) {
		align-items: center;
		background: #f5f5f5;
		border-radius: 5px;
		border: 1px solid #ccc;
		display: flex;
		font-size: 10px;
		gap: 5px;
		padding: 5px;
	}

	:global(.property.highlight) {
		background-color: #ffffff;
		border-radius: 8px;
		box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.2);
		height: auto;
		padding: 8px 15px;
		width: auto;
		max-width: 50vw;
	}

	:global(.property.highlight::after) {
		border-top: 9px solid #ffffff;
	}

	:global(.property.highlight .details) {
		display: flex;
	}

	:global(.property.highlight .icon svg) {
		width: 50px;
		height: 50px;
	}

	:global(.property .icon-location) {
		/* color: #fff; */
	}

	:global(.property.highlight:has(.icon-location) .icon) {
		color: red;
	}

	:global(.property:not(.highlight):has(.icon-location)) {
		background-color: red;
	}

	:global(.property:not(.highlight):has(.icon-location)::after) {
		border-top: 9px solid red;
	}

	:global(.bounce) {
    animation: bounce 2s infinite;
    -webkit-animation: bounce 2s infinite;
    -moz-animation: bounce 2s infinite;
    -o-animation: bounce 2s infinite;
}
 
@-webkit-keyframes bounce {
    0%, 20%, 50%, 80%, 100% {-webkit-transform: translateY(0);} 
    40% {-webkit-transform: translateY(-30px);}
    60% {-webkit-transform: translateY(-15px);}
}
 
@-moz-keyframes bounce {
    0%, 20%, 50%, 80%, 100% {-moz-transform: translateY(0);}
    40% {-moz-transform: translateY(-30px);}
    60% {-moz-transform: translateY(-15px);}
}
 
@-o-keyframes bounce {
    0%, 20%, 50%, 80%, 100% {-o-transform: translateY(0);}
    40% {-o-transform: translateY(-30px);}
    60% {-o-transform: translateY(-15px);}
}
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
    40% {transform: translateY(-30px);}
    60% {transform: translateY(-15px);}
}
</style>
