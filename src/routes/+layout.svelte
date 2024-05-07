<script>
  import {onMount} from "svelte";

  export let meta_title = 'Air Pollution Monitoring - Real-time Air Quality Data';
  export let meta_description = 'Track air pollution levels in your area with real-time air quality data. Stay informed about air quality conditions and take necessary precautions to protect your health and the environment.';

  onMount(() => {
      // Any initialization code if needed
  });
</script>
<slot></slot>
<svelte:head>
  <meta name="bigdate:platform_meta_tags_start">
  <title>{meta_title}</title>

  <meta name="title" content="{meta_title}">
  <meta name="description" content="{meta_description}">

  <meta property="og:title" content="{meta_title}">
  <meta property="og:description" content="{meta_description}">

  <!-- Adjust the og:image to an appropriate image related to air pollution monitoring -->
  <meta property="og:image:url" content="/favicon.png">
  <meta property="og:image" itemprop="image" content="/favicon.png">
  <meta property="og:image:width" content="512">
  <meta property="og:image:height" content="512">

  <meta property="og:locale" content="en_IN">
  <meta property="og:type" content="website">
</svelte:head>
