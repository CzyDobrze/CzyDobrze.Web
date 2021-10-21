<script>
    import { onMount } from 'svelte';
    let sectionId=0;
    onMount(async () => {
        const urlParams = new URLSearchParams(window.location.search);
        sectionId=Number(urlParams.get('sectionId'));
        exerciseData.sectionId=sectionId;
    })
    let exerciseData={
        "inBookId": "",
        "description": "",
        "sectionId": sectionId,
        "answers": [
            {
                "content": ""
            }
        ]
    }
    function submit(){
        console.log(exerciseData)
        //TODO: submit exercise data
    }
</script>
<slot></slot>
<form class="w-full max-w-lg">
    <h4 class="mb-6">Szczegóły zadania</h4>
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" for="exercise-number">
                Numer zadania
            </label>
            <input id="exercise-number" bind:value={exerciseData.inBookId} placeholder="Numer zadania w książce" class="appearance-none block w-full bg-gray-200 text-gray-700 border {exerciseData.inBookId.length>0?'border-gray-200':'border-red-500'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
            <p class="text-red-500 text-xs italic {exerciseData.inBookId.length>0?'hidden':''}">To pole jest wymagane.</p>
        </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" for="exercise-description">
                Treść polecenia
            </label>
            <textarea id="section-description" bind:value={exerciseData.description} placeholder="Podaj pełną treść zadania" class="appearance-none block w-full bg-gray-200 text-gray-700 border {exerciseData.description.length>0?'border-gray-200':'border-red-500'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"></textarea>
            <p class="text-red-500 text-xs italic {exerciseData.description.length>0?'hidden':''}">To pole jest wymagane.</p>
        </div>
    </div>
    <h4 class="mb-6">Twoje rozwiązanie</h4>
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" for="exercise-answer">
                Treść
            </label>
            <textarea id="exercise-answer" bind:value={exerciseData.answers[0].content} placeholder="Podaj swoje rozwiązanie do tego zadania" class="appearance-none block w-full bg-gray-200 text-gray-700 border {exerciseData.answers[0].content.length>0?'border-gray-200':'border-red-500'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"></textarea>
            <p class="text-red-500 text-xs italic {exerciseData.answers[0].content.length>0?'hidden':''}">Jako niezweryfikowany użytkownik musisz podać swoje rozwiązanie przed dodaniem zadania.</p>
        </div>
    </div>
    <div class="md:flex md:items-center mt-8">
        <div class="w-full">
            <button on:click={submit} class="w-full shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                Dodaj zadanie
            </button>
        </div>
    </div>
</form>
<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>