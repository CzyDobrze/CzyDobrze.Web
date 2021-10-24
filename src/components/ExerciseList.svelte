<script lang="ts">
    import { onMount } from 'svelte';
    let currentSection = {
        "id":"",
        "title":"",
        "description":""
    };
    let exercises = [];
    let sectionId:string;
    onMount(async () => {
        const urlParams:URLSearchParams = new URLSearchParams(window.location.search);
        sectionId = urlParams.get('id');
        fetch(`https://czydobrze.bazik.xyz/api/section/${sectionId}`,{"headers": {"Authorization": `Bearer ${localStorage.token}`}}).then(d=>{d.json().then(section=>
        {
            currentSection=section
            document.title=`${currentSection.title} | Czy dobrze?`;
        })})
        fetch(`https://czydobrze.bazik.xyz/api/section/${sectionId}/exercises?page=0&amount=100`,{"headers": {"Authorization": `Bearer ${localStorage.token}`}}).then(d=>{d.json().then(exs=>
        {
            exercises=exs
        })})
    });
</script>
<div class="container max-w-5xl mx-auto px-4">
    <div class="w-4/5 mx-auto">
        <h1 class="mt-32 text-white text-6xl font-bold">
            {currentSection.title}
        </h1>
        <p class="text-white">
            {currentSection.description}
        </p>
    </div>
    <slot></slot>
    {#each exercises as item}
        <a href="/exercise?id={item.id}">
            <div class="max-w-md mx-auto bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
                <div class="md:flex">
                    <div class="p-8">
                        <p class="block mt-1 text-lg leading-tight font-medium">{item.inBookId}</p>
                        <p class="mt-2 text-gray-500">{item.description}</p>
                    </div>
                </div>
            </div>
        </a>
    {/each}
    <a href="/addExercise?sectionId={sectionId}">
        <div class="max-w-md mx-auto bg-gray-900 rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
            <div class="md:flex">
                <div class="p-8">
                    <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Czy w tej sekcji brakuje Twojego zadania?</div>
                    <p class="block mt-1 text-lg leading-tight font-medium">Dodaj je!</p>
                </div>
            </div>
        </div>
    </a>
</div>
