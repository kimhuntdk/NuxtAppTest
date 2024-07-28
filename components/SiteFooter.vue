<script setup>
const links = [
    { name: 'GitHub', href : 'https://gisthub.com', icon: 'github', color: '#333' },

]

</script>

<template>
    <footer class="bg-gray-100">
        <section class="mx-auto max-w7xl px-2 sm:px-4 lg:py-6 text-slate-950 flex flex-row">
            <p class="flex-1">&copy; WebAPP 2024. All Ringths Reserved</p>
            <div class="flex flex-row justify-between items-center space-x-4">
                <a v-for="link in links" :key="link.name" :href="link.href" >
                    <Icon :name="link.icon" class="text-2xl" :color="link.color" />
                </a>
            </div>
        </section>
    </footer>
</template>