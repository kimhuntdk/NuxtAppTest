// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
 modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@nuxt/content', '@nuxt/image'],
 // plugins: [require("@tailwindcss/forms")],
 //compatibilityDate: '2024-07-28'
 content : {
   // Specify the base directory for content files
   highlight : {
     //theme : "light", // or 'light'
     preload: ['ts', 'js', 'vue', 'html', 'css', 'json', 'bash']
   }
 },

 compatibilityDate: '2024-07-28'
})