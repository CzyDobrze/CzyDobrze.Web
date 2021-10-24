<script lang="ts">
        import { onMount } from 'svelte';
        let cl:number;
        let clFormat:string="";
        let books=[];
        let currentPage:number = 0;
        let newBatch=[];
        $: books = [
            ...books,
            ...newBatch
        ];
        function fetchData(){
            fetch(`https://czydobrze.bazik.xyz/api/textbook?page=${currentPage++}&amount=100`,{"headers": {"Authorization": `Bearer ${localStorage.token}`}}).then(d=>{d.json().then(fetchedBooks=>
            {
                newBatch=fetchedBooks.filter(obj => {
                    return obj.classYear === cl
                })
            })})
        }
        onMount(async () => {
            const urlParams:URLSearchParams = new URLSearchParams(window.location.search);
            cl = Number(urlParams.get('id'));
            clFormat = `${cl<9?cl:cl-8} ${cl>8?"liceum":"szkoły podstawowej"}`;
            document.title=`Klasa ${clFormat} | Czy dobrze?`;
            fetchData();
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
    <a href="/addBook?class={cl}">
        <div class="max-w-md mx-auto bg-gray-900 rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
            <div class="md:flex">
                <div class="p-8">
                    <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Nie widzisz swojej książki?</div>
                    <p class="block mt-1 text-lg leading-tight font-medium">Dodaj ją!</p>
                </div>
            </div>
        </div>
    </a>
</div>
