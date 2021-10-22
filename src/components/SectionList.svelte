<script>
    import { onMount } from 'svelte';
    let currentBook = {
        "id":0
    };
    let sections = [];
    onMount(async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const bookId = urlParams.get('id');
        //TODO: Fetch current book from API
        currentBook={
            "id":bookId,
            "title": "Test "+bookId,
            "subject": "Matematyka",
            "publisher": "Admin"
        }
        //TODO: Fetch sections from API
        sections = [
            {
                "id":"1",
                "title": "Sekcja 1",
                "description": "Tabliczka mnożenia"
            },
            {
                "id":"2",
                "title": "Sekcja 2",
                "description": "Układy równań"
            },
            {
                "id":"3",
                "title": "Sekcja 3",
                "description": "Macierze"
            }
        ];
    });
</script>
<div class="container max-w-5xl mx-auto px-4">
    <div class="w-4/5 mx-auto">
        <h1 class="mt-32 text-white text-6xl font-bold">
            {currentBook.title}
        </h1>
        <p class="text-white">
            {currentBook.subject}, wydawnictwo {currentBook.publisher}
        </p>
    </div>
    <slot></slot>
    {#each sections as item}
        <a href="/section?id={item.id}">
            <div class="max-w-md mx-auto bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
                <div class="md:flex">
                    <div class="p-8">
                        <p class="block mt-1 text-lg leading-tight font-medium">{item.title}</p>
                        <p class="mt-2 text-gray-500">{item.description}</p>
                    </div>
                </div>
            </div>
        </a>
    {/each}
    <a href="/addSection?bookId={currentBook.id}">
        <div class="max-w-md mx-auto bg-gray-900 rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
            <div class="md:flex">
                <div class="p-8">
                    <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Czegoś tu brakuje?</div>
                    <p class="block mt-1 text-lg leading-tight font-medium">Dodaj sekcję!</p>
                </div>
            </div>
        </div>
    </a>
</div>
