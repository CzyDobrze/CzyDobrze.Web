<script lang="ts">
    import { onMount } from 'svelte';
    import createAuth0Client from "@auth0/auth0-spa-js";
    let auth0 = null;
    let token = null;
    let loggedIn = false;
    const configureClient = async () => {
        auth0 = await createAuth0Client({
            audience: "https://czydobrze.bazik.xyz",
            domain: "dev-wop8zm8z.eu.auth0.com",
            client_id: "RrQ1o5oRo4BElvxuHJSwDn7UMnatEW9d"
        });
    };
    onMount(async () => {
        if ('serviceWorker' in navigator) {
            await navigator.serviceWorker.register('/sw.js');
        }
        await configureClient();
        await updateUI();
        //console.log(token)
        localStorage.token=token;
    })
    const updateUI = async () => {
        const isAuthenticated = await auth0.isAuthenticated();
        if(isAuthenticated){
            loggedIn=true;
            console.log("LoggedIn")
        }
        else{
            loggedIn=false
            if(window.location.href.includes("recipe/submit")){
                await login()
            }
            console.log("LoggedOut")
        }
        const query = window.location.search;
        if (query.includes("code=") && query.includes("state=")) {
            await auth0.handleRedirectCallback();

            updateUI();
            window.history.replaceState({}, document.title, "/");
        }
        token = await auth0.getTokenSilently();
    };
    const login = async () => {
        await auth0.loginWithRedirect({
            redirect_uri: window.location.href
        });
    };
    const logout = () => {
        auth0.logout({
            returnTo: window.location.origin
        });
    };
    let mobileMenuOpen:boolean = false;
</script>
<nav class="bg-gray-600 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button type="button" on:click={()=>(mobileMenuOpen=!mobileMenuOpen)} class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="{mobileMenuOpen?'hidden':'block'} h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <svg class="{mobileMenuOpen?'block':'hidden'} h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <a href="/">
                    <div class="flex-shrink-0 flex items-center">
                        <img class="block lg:hidden h-8 w-auto" src="/assets/logo.png" alt="CzyDobrze">
                        <img class="hidden lg:block h-8 w-auto" src="/assets/logo.png" alt="CzyDobrze">
                    </div>
                </a>
                <div class="hidden sm:block sm:ml-6">
                    <div class="flex space-x-4">
                        <a href="/" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Wszystkie</a>

                        <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Ulubione</a>

                        <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Szczęśliwy Traf</a>
                    </div>
                </div>
            </div>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div class="ml-3 relative">
                        <button type="button" on:click={login} class="{loggedIn?'hidden':''} bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                            <span class="sr-only">Login</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    <button type="button" on:click={logout} class="{loggedIn?'':'hidden'} bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                        <span class="sr-only">Logout</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="sm:hidden {mobileMenuOpen?'':'hidden'}" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1">
            <a href="/" class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Wszystkie</a>

            <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Ulubione</a>

            <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Szczęśliwy Traf</a>
        </div>
    </div>
</nav>
<slot></slot>
