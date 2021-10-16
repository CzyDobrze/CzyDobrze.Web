<script>
    import { onMount } from 'svelte';
    let currentSection = {};
    let exercises = [];
    onMount(async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const sectionId = urlParams.get('id');
        //TODO: Fetch current section from API
        currentSection={
            "id":sectionId,
            "title": "Sekcja "+sectionId,
            "description": "Tabliczka mnożenia"
        }
        //TODO: Fetch exercises from API
        exercises = [
            {
                "id":"1",
                "inBookId": "1",
                "description": "Ile dni upłynęło od dnia urodzin Karola Wojtyły, czyli od 18 maja 1920 roku do dnia jego chrztu 20 czerwca 1920 roku?"
            },
            {
                "id":"2",
                "inBookId": "2",
                "description": "Przyjmijmy, że spód jednej kremówki ma kształt kwadratu o boku 8 cm. Jaki\n" +
                    "jest obwód prostokątnej tacy, na której równo jedna obok drugiej ułożono dokładnie 54 kremówki.\n" +
                    "Kremówki zajęły całą powierzchnię tacy. Każdy bok tej tacy jest dłuższy niż 40 cm. Zapisz\n" +
                    "obliczenia i podaj odpowiedź z jednostką."
            },
            {
                "id":"3",
                "inBookId": "3",
                "description": "We wrześniu 1930, po zdaniu egzaminów wstępnych, Karol Wojtyła rozpoczął\n" +
                    "naukę w 8-letnim Państwowym Gimnazjum Męskim im. Marcina Wadowity. Wynik, którego\n" +
                    "z podanych działań jest równy 1930?"
            }
        ];
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
</div>