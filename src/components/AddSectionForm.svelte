<script lang="ts">
    import { onMount } from 'svelte';
    let bookId:string;
    onMount(async () => {
        const urlParams:URLSearchParams = new URLSearchParams(window.location.search);
        bookId=urlParams.get('bookId');
        sectionData.textbookId=bookId;
    })
    let sectionData={
        "title": "",
        "description": "",
        "textbookId": bookId
    }
    function submit(){
        console.log(sectionData)
        fetch("https://czydobrze.bazik.xyz/api/section",
            {
                "method":"POST",
                "body":JSON.stringify(sectionData),
                "headers": {"content-type":"application/json", "Authorization": `Bearer ${localStorage.token}`}
            }
        ).then(d=>{d.json().then(data=>
        {
            if(d.ok)
                location.href=`/section?id=${data["id"]}`
        })})
    }
</script>
<slot></slot>
<form class="w-full max-w-lg">
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" for="section-title">
                Tytuł
            </label>
            <input id="section-title" bind:value={sectionData.title} placeholder="Podaj tytuł rozdziału" class="appearance-none block w-full bg-gray-200 text-gray-700 border {sectionData.title.length>0?'border-gray-200':'border-red-500'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
            <p class="text-red-500 text-xs italic {sectionData.title.length>0?'hidden':''}">To pole jest wymagane.</p>
        </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" for="section-description">
                Opis
            </label>
            <textarea id="section-description" bind:value={sectionData.description} placeholder="Podaj krótki opis rozdziału" class="appearance-none block w-full bg-gray-200 text-gray-700 border {sectionData.description.length>0?'border-gray-200':'border-red-500'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"></textarea>
            <p class="text-red-500 text-xs italic {sectionData.description.length>0?'hidden':''}">To pole jest wymagane.</p>
        </div>
    </div>
    <div class="md:flex md:items-center mt-8">
        <div class="w-full">
            <button on:click={submit} class="w-full shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                Dodaj sekcję
            </button>
        </div>
    </div>
</form>
