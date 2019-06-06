<template>
    <Page>
        <ActionBar class="actionBar">
            <FlexboxLayout flexDirection="wrap">
                <Image src="~/assets/images/back_white.png" width="28" height="28" @tap="goBack" class="icon_back" />
                <Label text="Top 10 des métiers les mieux rémunérés en France" fontSize="24" color="#FFFFFF" class="title" width="80%"></Label>
            </FlexboxLayout>
        </ActionBar>
        <ScrollView orientation="vertical">
            <FlexboxLayout flexDirection="column" class="container">
                <Label textWrap="true" text="D'après notre base de données, voici les métiers les mieux rémunérés (toutes expériences confondues) : " class="h1"></Label>
                <StackLayout :visibility="load.loaderVisibility" justify-content="center">
                    <ActivityIndicator :busy="load.isBusy" />
                </StackLayout>
                <FlexboxLayout flexDirection="column" v-for="(metier, index) in metiers" :key="index">
                    <Label textWrap="true" :text="metierAvecSalaire[index]" class="p" @tap="onTapMetier(metier.nom)"></Label>
                </FlexboxLayout>
            </FlexboxLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import axios from 'axios';
    import Statistiques from "@/components/Views/Statistiques.vue";
    import Metiers from '@/components/Views/Metiers.vue';

    export default {
        data () {
            return {
                load: {
                    isBusy: false,
                    loaderVisibility: 'collapsed'
                },
                metiers: {}
            }
        },
        computed: {
            metierAvecSalaire () {
                return this.metiers.map(function(metier) {
                    return "• "+metier.nom+" ("+metier.salaire.maximum+" par an)"
                });
            }
        },
        methods: {
            getMetiers () {
                this.load.isBusy = true;
                this.load.loaderVisibility = 'visible';
                axios
                    .get('https://vast-taiga-97693.herokuapp.com/stats/top10remunere')
                    .then((response) => {
                        this.load.isBusy = false;
                        this.load.loaderVisibility = 'collapsed';
                        this.metiers = response.data
                    })
                    .catch((error) => {
                        this.load.isBusy = false;
                        this.load.loaderVisibility = 'collapsed';
                        console.log(error)
                    })
            },
            goBack () {
                this.$navigateTo(Statistiques, {
                    frame: "rootFrame",
                });
            },
            onTapMetier (metier) {
                this.$navigateTo(Metiers, {
                    frame: "rootFrame",
                    props: {
                        shortcut: metier,
                        from: "FicheStat1"
                    }
                });
            }
        },
        mounted () {
            this.getMetiers()
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
        padding: 16;
        .h1 {
            font-size: 20;
            color: #222222;
            margin: 15 0 15 0;
            font-weight: bold;
        }
        .p {
            font-size: 16;
        }
    }
</style>
