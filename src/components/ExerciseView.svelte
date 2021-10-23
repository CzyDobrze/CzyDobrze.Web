<script lang="ts">
    import { onMount } from 'svelte';
    let currentExercise = {};
    let ownAnswer = {
        "content":"",
        "excerciseId":""
    }
    function submitOwnAnswer(){
        console.log(ownAnswer)
        //TODO: submit answer data
    }
    onMount(async () => {
        const urlParams = new URLSearchParams(window.location.search);
        ownAnswer.excerciseId = urlParams.get('id');
        //TODO: Fetch current exercise from API
        currentExercise=
            {
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "created": "2021-10-19T20:30:20.913Z",
                "updated": "2021-10-19T20:30:20.913Z",
                "inBookId": "Nr zadania",
                "description": "Opis zadania",
                "answers": [
                    {
                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        "created": "2021-10-19T20:30:20.913Z",
                        "updated": "2021-10-19T20:30:20.913Z",
                        "author": {
                            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "created": "2021-10-19T20:30:20.913Z",
                            "updated": "2021-10-19T20:30:20.913Z",
                            "displayName": "Nazwa użytkownika",
                            "points": 0
                        },
                        "content": "Treść odpowiedzi",
                        "accepted": true,
                        "votes": [
                            {
                                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "created": "2021-10-19T20:30:20.913Z",
                                "updated": "2021-10-19T20:30:20.913Z",
                                "voter": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "value": 0
                            }
                        ]
                    }
                ],
                "comments": [
                    {
                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        "created": "2021-10-19T20:30:20.913Z",
                        "updated": "2021-10-19T20:30:20.913Z",
                        "author": {
                            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            "created": "2021-10-19T20:30:20.913Z",
                            "updated": "2021-10-19T20:30:20.913Z",
                            "displayName": "string",
                            "points": 0
                        },
                        "content": "string",
                        "votes": [
                            {
                                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "created": "2021-10-19T20:30:20.913Z",
                                "updated": "2021-10-19T20:30:20.913Z",
                                "voter": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "value": 0
                            }
                        ]
                    }
                ]
            }
        document.title=`${currentExercise.description} | Czy dobrze?`;
    });
    function like(){
        // TODO: send like
        currentExercise.answers[0].votes.push({
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa7",
            "created": "2021-10-19T20:30:20.913Z",
            "updated": "2021-10-19T20:30:20.913Z",
            "voter": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "value": 1
        })
        currentExercise.answers[0].votes=currentExercise.answers[0].votes
    }
    function dislike(){
        // TODO: send dislike
        currentExercise.answers[0].votes.push({
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa7",
            "created": "2021-10-19T20:30:20.913Z",
            "updated": "2021-10-19T20:30:20.913Z",
            "voter": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "value": -1
        })
        currentExercise.answers[0].votes=currentExercise.answers[0].votes
    }
</script>
<div class="container max-w-5xl mx-auto px-4">
    <div class="w-4/5 mx-auto">
        <h1 class="mt-32 text-white text-6xl font-bold">
            {currentExercise.inBookId||""}
        </h1>
        <p class="text-white">
            {currentExercise.description||""}
        </p>
    </div>
    <slot></slot>
    <div class="max-w-md mx-auto bg-gray-900 rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
        <div class="md:flex">
            <div class="p-8 w-full">
                <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Dodaj swoje rozwiązanie</div>
                <div class="flex flex-wrap -mx-3 mb-6 mt-3">
                    <div class="w-full px-3">
                        <textarea id="exercise-answer" bind:value={ownAnswer.content} placeholder="Podaj swoje rozwiązanie do tego zadania" class="appearance-none block w-full bg-gray-200 text-gray-700 border {ownAnswer.content.length>0?'border-gray-200':'border-red-500'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"></textarea>
                    </div>
                </div>
                <button on:click={submitOwnAnswer} class="w-full shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                    Prześlij
                </button>
            </div>
        </div>
    </div>
    {#each currentExercise.answers||[] as item}
            <div class="max-w-md mx-auto bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
                <div class="md:flex">
                    <div class="p-8">
                        <p class="block mt-1 text-lg leading-tight font-medium">{item.content}</p>
                        <p class="mt-2 text-gray-500">{item.author.displayName}</p>
                    </div>
                </div>
                <div>
                    <div class="px-8 py-4">
                        <p class="block">
                        <a href="/comments?answerId={item.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                        </a>
                            &nbsp;
                            <a on:click={like} class="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                            </a>
                            <b>{item.votes.reduce((a, b) => +a + +b.value, 0)}</b>
                            <a on:click={dislike} class="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                                </svg>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
    {/each}
</div>
