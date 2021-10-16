<script>
        import { onMount } from 'svelte';
        let clFormat = "";
        let books=[];
        onMount(async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const cl = urlParams.get('id');
            clFormat = cl.replace("sp", " szkoły podstawowej").replace("lic", " liceum");
            //TODO: Fetch books from API
            books = [
                {
                    "id": "1",
                    "title": "Test 1",
                    "subject": "Informatyka",
                    "publisher": "Admin"
                },
                {
                    "id": "2",
                    "title": "Test 2",
                    "subject": "Język angielski",
                    "publisher": "Admin"
                },
                {
                    "id": "3",
                    "title": "Test 3",
                    "subject": "Fizyka",
                    "publisher": "Admin"
                }
            ];
        });
</script>
<div class="container max-w-5xl mx-auto px-4">
    <div class="w-4/5 mx-auto">
        <h1 class="mt-32 text-white text-6xl font-bold">
            Klasa {clFormat}
        </h1>
    </div>
    <slot></slot>
    {#each books as item}
    <a href="/book?id={item.id}">
        <div class="max-w-md mx-auto bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
            <div class="md:flex">
                <div class="p-8">
                    <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{item.subject}</div>
                    <p class="block mt-1 text-lg leading-tight font-medium">{item.title}</p>
                    <p class="mt-2 text-gray-500">Wydawnictwo: {item.publisher}</p>
                </div>
            </div>
        </div>
    </a>
        {/each}
</div>
<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>