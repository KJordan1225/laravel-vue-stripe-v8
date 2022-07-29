<template>   
  <div id="app" class="font-sans antialiased text-black">
    <div id="nav" class="bg-purple-800">
      <div class="container flex items-center justify-between py-6">
        <div class="ml-10">
          <a href="/"><img src="./assets/logo.svg" alt="logo"></a>
        </div>
        <div>
          <router-link to="/" class="text-white hover:text-gray-400">Home</router-link> 
          <router-link to="/about" class="text-white hover:text-gray-400 px-6">About</router-link>
        </div>
      </div>
    </div>        
    <router-view/>
  </div>  
</template>


