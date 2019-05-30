<template>
    <Page actionBarHidden="true">
        <ScrollView orientation="vertical">
            <StackLayout class="container-global">
                <StackLayout class="header">
                    <Label text="Offres d'emplois" class="h1"/>
                </StackLayout>
                <StackLayout>
                    <SearchBar hint="Search hint" :text="searchPhrase" @submit="onSearchSubmit" ref="searchBar" />
                </StackLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    export default {
        data() {
            return {
                searchPhrase: "",
                job: {
                    poste: '',
                    description: '',
                    type: '',
                    salaire: '',
                    competence: '',
                    formation: ''
                }
            }
        },
        methods: {
            onSearchSubmit(args) {
                let searchBar = args.object;
                console.log("You are searching for " + searchBar.text);
            },
        },
        mounted() {
            setTimeout(() => {
                this.$refs.searchBar.nativeView.dismissSoftInput();
            }, 100)
        }
    }
</script>

<style lang="scss" scoped>
    .container-global {
        .header {
            background-color: #FF5C5C;

            .h1 {
                color: #ffffff;
                font-size: 24;
                text-align: center;
                margin: 10 0 10 0;
                font-weight: bold;
            }

            .p {
                color: #ffffff;
                font-size: 15;
                text-align: center;
                margin: 5 0 20 0;
                padding: 0 16;
            }
        }
    }
</style>
