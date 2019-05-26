<template>
    <Page>
        <ActionBar class="actionBar">
            <FlexboxLayout flexDirection="wrap">
                <Image src="~/assets/images/back_white.png" width="28" height="28" @tap="goBack" class="icon_back" />
                <Label text="Recherche Métier" fontSize="24" color="#FFFFFF" class="title" width="80%"></Label>
            </FlexboxLayout>
        </ActionBar>
        <ScrollView orientation="vertical">
            <StackLayout>
                <SearchBar hint="Lancez vous dans la recherche d'un métier !" :text="searchMetier" dismissSoftInput="false" @textChange="onSearchSubmit"/>
                <StackLayout :visibility="load.loaderVisibility" justify-content="center">
                    <ActivityIndicator :busy="load.isBusy" />
                </StackLayout>
                <FlexboxLayout
                        flexDirection="column"
                        v-for="(metier, index) in listeMetiers"
                        :key="index"
                        @tap="onTapMetier(metier.nom)"
                        class="container"
                >
                    <Label :text="metier.nom" textWrap="true" class="h3" />
                    <Label :text="metier.secteur" class="h4" />
                </FlexboxLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import axios from 'axios';
    import HomeMetier from "@/components/Views/HomeMetier.vue";
    import Metiers from '@/components/Views/Metiers.vue';

    export default {
        data() {
            return {
                searchMetier: '',
                listeMetiers: {},
                load: {
                    isBusy: false,
                    loaderVisibility: 'collapsed'
                }
            }
        },
        methods: {
            onSearchSubmit(args) {
                let search = args.object.text;
                if (search.length >= 2) {
                    this.load.isBusy = true;
                    this.load.loaderVisibility = 'visible';
                    axios
                        .get('https://vast-taiga-97693.herokuapp.com/metiersearch', {
                            params: {
                                nom: search.toUpperCase()
                            }
                        })
                        .then((response) => {
                            if (response.data.length === 0) {
                                this.listeMetiers = [{nom:'Pas de résultats'}];
                            } else {
                                this.listeMetiers = response.data;
                            }
                            this.load.isBusy = false;
                            this.load.loaderVisibility = 'collapsed';
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                } else {
                    this.listeMetiers = {}
                }
            },
            goBack () {
                this.$navigateTo(HomeMetier, {
                    frame: "rootFrame"
                });
            },
            onTapMetier (metier) {
                this.$navigateTo(Metier, {
                    frame: "rootFrame",
                    props: {
                        shortcut: metier
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .actionBar {
        background-color: #FF5C5C;
        .icon_back {
            text-align: left;
        }
        .title {
            text-align: center;
        }
    }
    .container {
        padding: 10 20 10 20;
        border-bottom-color: #c3c3c3;
        border-bottom-width: 1px;

        .h3 {
            font-size: 20;
            color: #222222;
            font-weight: bold;
        }

        .h4 {
            font-size: 14;
            color: #343434;
        }
    }
</style>
