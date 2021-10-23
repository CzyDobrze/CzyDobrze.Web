<script lang="ts">
    import { onMount } from 'svelte';
    const classesSP=["1", "2", "3", "4", "5", "6", "7", "8"];
    const classesLIC=["1", "2", "3", "4"];
    let cl:number;
    onMount(async () => {
        const urlParams:URLSearchParams = new URLSearchParams(window.location.search);
        cl=Number(urlParams.get('class'));
        bookData.classYear=cl;
    })
    let bookData={
        "title": "",
        "subject": "",
        "publisher": "",
        "classYear": cl
    }
    function submit(){
        console.log(bookData)
        //TODO: submit book data
    }
</script>
<slot></slot>
<form class="w-full max-w-lg">
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" for="book-title">
                Tytuł
            </label>
            <input id="book-title" bind:value={bookData.title} placeholder="Podaj pełny tytuł swojego podręcznika" class="appearance-none block w-full bg-gray-200 text-gray-700 border {bookData.title.length>0?'border-gray-200':'border-red-500'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
            <p class="text-red-500 text-xs italic {bookData.title.length>0?'hidden':''}">To pole jest wymagane.</p>
        </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" for="book-subject">
                Przedmiot
            </label>
            <input id="book-subject" bind:value={bookData.subject} placeholder="Np. Matematyka, Fizyka" class="appearance-none block w-full bg-gray-200 text-gray-700 border {bookData.subject.length>0?'border-gray-200':'border-red-500'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
            <p class="text-red-500 text-xs italic {bookData.subject.length>0?'hidden':''}">To pole jest wymagane.</p>
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" for="book-publisher">
                Wydawnictwo
            </label>
            <input id="book-publisher" bind:value={bookData.publisher} placeholder="Wydawca lub autor książki" class="appearance-none block w-full bg-gray-200 text-gray-700 border {bookData.publisher.length>0?'border-gray-200':'border-red-500'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
            <p class="text-red-500 text-xs italic {bookData.publisher.length>0?'hidden':''}">To pole jest wymagane.</p>
        </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" for="book-class">
                Klasa
            </label>
            <div class="relative">
                <select bind:value={bookData.classYear} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                    {#each classesSP as c, i}
                        <option value="{i}">{c}. szkoły podstawowej</option>
                    {/each}
                    {#each classesLIC as c, i}
                        <option value="{i+classesSP.length}">{c}. liceum</option>
                    {/each}
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
        </div>
    </div>
    <div class="md:flex md:items-center mt-8">
        <div class="w-full">
            <button on:click={submit} class="w-full shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                Dodaj książkę
            </button>
        </div>
    </div>
</form>
