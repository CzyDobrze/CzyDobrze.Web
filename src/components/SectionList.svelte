<script lang="ts">
    import { onMount } from 'svelte';
    let currentBook = {
        "id":"",
        "title":"",
        "subject":"",
        "publisher":""
    };
    let sections = [];
    onMount(async () => {
        const urlParams:URLSearchParams = new URLSearchParams(window.location.search);
        const bookId:string = urlParams.get('id');
        fetch(`https://czydobrze.bazik.xyz/api/textbook/${bookId}`,{"headers": {"Authorization": `Bearer ${localStorage.token}`}}).then(d=>{d.json().then(book=>
        {
            currentBook=book
            document.title=`${currentBook.title} | Czy dobrze?`;
        })})
        fetch(`https://czydobrze.bazik.xyz/api/textbook/${bookId}/sections?page=0&amount=100`,{"headers": {"Authorization": `Bearer ${localStorage.token}`}}).then(d=>{d.json().then(sects=>
        {
            sections=sects
        })})
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
