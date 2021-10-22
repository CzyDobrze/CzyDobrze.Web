<script>
let classesSP=["1", "2", "3", "4", "5", "6", "7", "8"];
let classesLIC=["1", "2", "3", "4"];
</script>
<article>
    <p class="text-sm mb-5">Szkoła podstawowa<p>
    <div class="grid grid-cols-2 gap-4">
    {#each classesSP as c, i}
        <a href="/class?id={i}" class="border-solid border-white border-4 h-12 rounded-md flex items-center justify-center text-white text-2xl font-extrabold">{c}</a>
        {/each}

      </div>
    <p class="text-sm mb-5 mt-3">Liceum<p>
        <div class="grid grid-cols-2 gap-4">
    {#each classesLIC as c, i}
        <a href="/class?id={i+classesSP.length}" class="border-solid border-white border-4 h-12 rounded-md flex items-center justify-center text-white text-2xl font-extrabold">{c}</a>
    {/each}

          </div>
</article>
