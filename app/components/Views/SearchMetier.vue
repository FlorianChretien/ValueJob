<template>
    <Page>
        <ActionBar title="Rechercher Métier">
            <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="goBack" />
        </ActionBar>
        <StackLayout>
            <SearchBar hint="Lancez vous dans la recherche d'un métier !" :text="searchPhrase" dismissSoftInput="false" @submit="onSearchSubmit"/>
        </StackLayout>
    </Page>
</template>

<script>
    import HomeMetier from "@/components/Views/HomeMetier.vue";

    export default {
        data() {
            return {
                searchPhrase: ''
            }
        },
        methods: {
            onSearchSubmit(args) {
                let searchBar = args.object;
                console.log("You are searching for " + searchBar.text);
            },
            goBack () {
                this.$navigateTo(HomeMetier, {
                    frame: "rootFrame"
                });
            }
        }
    }
</script>
