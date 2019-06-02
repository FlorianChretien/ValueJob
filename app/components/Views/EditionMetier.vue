<template>
    <Page>
        <ActionBar class="actionBar">
            <FlexboxLayout flexDirection="wrap">
                <Image src="~/assets/images/back_white.png" width="28" height="28" @tap="goBack" class="icon_back"/>
                <Label text="Edition du métier" fontSize="24" color="#FFFFFF" class="title" width="80%"></Label>
            </FlexboxLayout>
        </ActionBar>
        <ScrollView orientation="vertical">
            <FlexboxLayout flexDirection="column">
                <Label class="h3" textWrap="true" text="Description"/>
                <TextView v-model="metier.description.text"/>
                <Label class="h3" textWrap="true" text="Compétences"/>
                <TextView v-model="metier.competence.text"/>
                <Label class="h3" textWrap="true" text="Formation"/>
                <TextView v-model="metier.formation.text"/>
                <Label class="h3" textWrap="true" text="Responsabilités et évolution"/>
                <TextView v-model="metier.responsabilitesEvolution.text"/>
                <StackLayout :visibility="load.loaderVisibility" justify-content="center">
                    <ActivityIndicator :busy="load.isBusy"/>
                </StackLayout>
                <Button text="Valider" @tap="onSubmit"/>
            </FlexboxLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import axios from 'axios';
    import Metiers from '@/components/Views/Metiers.vue'

    export default {
        data() {
            return {
                metier: {
                    id: 0,
                    nom: "Métier",
                    secteur: "",
                    specialite: [],
                    villes: [],
                    salaire: {
                        "minimum": 15000,
                        "maximum": 35000,
                        "specialite": {"all": [{"experience": "toto", "val1": 30, "val2": 10}]}
                    },
                    description: {},
                    competence: {},
                    formation: {},
                    responsabilitesEvolution: {}
                },
                load: {
                    isBusy: false,
                    loaderVisibility: 'collapsed'
                }
            }
        },
        props: {
            shortcut: String,
            from: String
        },
        methods: {
            onButtonTap() {
                console.log("Button was pressed");
            },
            loadData() {
                axios
                    .get('https://vast-taiga-97693.herokuapp.com/metier', {
                        params: {
                            nom: this.shortcut
                        }
                    })
                    .then((response) => {
                        for (let property in response.data) {
                            this.metier[property] = response.data[property];
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            goBack() {
                this.$navigateTo(Metiers, {
                    frame: "rootFrame",
                    props: {
                        from: "HomeMetier",
                        shortcut: this.shortcut
                    }
                });
            },
            onSubmit() {
                confirm({
                    title: "Confirmer",
                    message: "Attention, en modifiant cette fiche métier vous vous engagez personnelement sur le contenu que vous avez écrit. Nous ne sommes pas responsable. Plus plus d'informations merci de lire les mentions légal.",
                    okButtonText: "Oui",
                    cancelButtonText: "Non"
                }).then(result => {
                    this.load.isBusy = true;
                    this.load.loaderVisibility = 'visible';
                    axios
                        .put('https://vast-taiga-97693.herokuapp.com/metier', {
                            data: this.metier
                        })
                        .then((response) => {
                            this.load.isBusy = false;
                            this.load.loaderVisibility = 'collapsed';
                            if (response.data._id.length != 0) {
                                this.$navigateTo(Metiers, {
                                    frame: "rootFrame",
                                    props: {
                                        from: "HomeMetier",
                                        shortcut: this.shortcut,
                                        message: "Merci pour votre modification a bien été prise en compte."
                                    }
                                });
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            this.load.isBusy = false;
                            this.load.loaderVisibility = 'collapsed';
                            alert('erreur')
                                .then(() => {
                                    console.log("edition metier - erreur");
                                });
                        })
                });
            }
        },
        mounted() {
            console.log(this.shortcut);
            this.loadData();
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

    .h3 {
        font-size: 20;
        color: #222222;
        margin: 15 0 5 0;
        font-weight: bold;
    }

    button {
        margin: 10 0;
    }
</style>
