<template>
    <Page>
        <ActionBar class="actionBar">
            <FlexboxLayout flexDirection="wrap">
                <Image src="~/assets/images/back_white.png" width="28" height="28" @tap="goBack" class="icon_back" />
                <Label :text="metier.nom" fontSize="24" color="#FFFFFF" class="title" width="80%"></Label>
            </FlexboxLayout>
        </ActionBar>
        <ScrollView orientation="vertical">
            <StackLayout flexDirection="column">
                <StackLayout :visibility="load.loaderVisibility" justify-content="center">
                    <ActivityIndicator :busy="load.isBusy" />
                </StackLayout>

                <FlexboxLayout class="global-container" flexDirection="column" :visibility="load.isVisible">
                    <Label class="h3" text="Salaire" />
                    <Label class="h4" textWrap="true" text="Spécialisations"/>
                    <FlexboxLayout flexDirection="wrap" flexWrap="wrap">
                        <Button v-for="specialite in metier.specialite" :text="specialite" @tap="onButtonTapSpecialite(specialite)" />
                    </FlexboxLayout>
                    <Label class="h4" textWrap="true" text="Villes"/>
                    <FlexboxLayout flexDirection="wrap" flexWrap="wrap">
                        <Button v-for="ville in metier.villes" :text="ville" @tap="salaireSelect.ville = ville" />
                    </FlexboxLayout>
                    <GridLayout rows="*" class="radchart">
                        <RadCartesianChart row="0" height="1000px">
                            <CategoricalAxis v-tkCartesianHorizontalAxis/>
                            <LinearAxis v-tkCartesianVerticalAxis :minimum="metier.salaire.minimum" :maximum="metier.salaire.maximum" />

                            <SplineAreaSeries v-tkCartesianSeries
                                        seriesName="haut"
                                        :items="metier.salaire[salaireSelect.specialite][salaireSelect.ville]"
                                        categoryProperty="experience"
                                        showLabels="true"
                                        valueProperty="val2">
                                <PointLabelStyle v-tkLineLabelStyle margin="10" fontStyle="Bold" fillColor="#4D4D4D" textSize="10" textColor="White"></PointLabelStyle>
                            </SplineAreaSeries>

                            <AreaSeries v-tkCartesianSeries
                                       seriesName="bas"
                                       :items="metier.salaire[salaireSelect.specialite][salaireSelect.ville]"
                                       categoryProperty="experience"
                                       showLabels="true"
                                       valueProperty="val1">
                                <PointLabelStyle v-tkLineLabelStyle margin="10" fontStyle="Bold" fillColor="#FF5C5C" textSize="10" textColor="White"></PointLabelStyle>
                            </AreaSeries>

                            <Palette v-tkCartesianPalette seriesName="bas">
                                <PaletteEntry v-tkCartesianPaletteEntry fillColor="#FFFFFF" strokeColor="#FF5C5C"></PaletteEntry>
                            </Palette>
                            <Palette v-tkCartesianPalette seriesName="haut">
                                <PaletteEntry v-tkCartesianPaletteEntry fillColor="#FF5C5C" strokeColor="#FF5C5C"></PaletteEntry>
                            </Palette>
                        </RadCartesianChart>
                    </GridLayout>
                    <Label class="h3" textWrap="true" text="Description"/>
                    <Label class="p" textWrap="true" :text="metier.description.text"/>
                    <Label class="h3" textWrap="true" text="Compétences"/>
                    <Label class="p" textWrap="true" :text="metier.competence.text"/>
                    <Label class="h3" textWrap="true" text="Formation"/>
                    <Label class="p" textWrap="true" :text="metier.formation.text"/>
                    <Label class="h3" textWrap="true" text="Responsabilités et évolution"/>
                    <Label class="p" textWrap="true" :text="metier.responsabilitesEvolution.text"/>
                    <Button text="Éditer ce métier" @tap="onEditeMetier" class="editer_metier"></Button>
                    <Button text="Partager votre salaire (anonyme)" @tap="tapShareSalaire"></Button>
                </FlexboxLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import { mapGetters } from 'vuex'
    import axios from "axios";
    import HomeMetier from '@/components/Views/HomeMetier.vue'
    import Statistiques from '@/components/Views/Statistiques.vue'
    import Profil from "@/components/Views/Profil.vue"
    import Connexion from '@/components/Views/Connexion.vue'
    import EditionMetier from '@/components/Views/EditionMetier.vue'
    import FicheStat1 from '@/components/Views/FicheStat1.vue'

    export default {
        components: {
            HomeMetier,
            Statistiques,
            Profil,
            Connexion,
            EditionMetier,
            FicheStat1
        },
        data() {
            return {
                load: {
                    isBusy: true,
                    isVisible: 'collapsed',
                    loaderVisibility: 'visible'
                },
                metier: {
                    id: 0,
                    nom: "Métier",
                    secteur: "",
                    specialite: [],
                    villes: [],
                    salaire: {"minimum": 15000, "maximum": 35000,"specialite": { "all": [{"experience": "toto", "val1": 30, "val2": 10}] }},
                    description: {},
                    competence: {},
                    formation: {},
                    responsabilitesEvolution: {}
                },
                salaireSelect: {
                    specialite: "specialite",
                    ville: "all"
                }
            }
        },
        props: {
            shortcut: String,
            from: String,
            message: String
        },
        computed: {
            ...mapGetters({
                isConnected: 'isConnected'
            })
        },
        methods: {
            goBack() {
                if (this.from === "Statistiques") {
                    this.$navigateTo(Statistiques, {
                        frame: "rootFrame"
                    });
                } else if (this.from === "HomeMetier") {
                    this.$navigateTo(HomeMetier, {
                        frame: "rootFrame"
                    });
                } else if (this.from === "FicheStat1") {
                    this.$navigateTo(FicheStat1, {
                        frame: "rootFrame"
                    });
                }
            },
            loadData() {
                axios
                    .get('https://vast-taiga-97693.herokuapp.com/metier', {
                        params: {
                            nom: this.shortcut
                        }
                    })
                    .then((response) => {
                        this.load.isBusy = false;
                        this.load.isVisible = 'visible';
                        this.load.loaderVisibility = 'collapsed';
                        for (let property in response.data) {
                            this.metier[property] = response.data[property];
                        }
                        this.salaireSelect.specialite = this.metier.specialite[0];
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            onButtonTapSpecialite(specialite) {
                //this.$refs.specialiteA.classList.add("isActive")
                this.salaireSelect.specialite = specialite;
            },
            onEditeMetier () {
                if (this.isConnected === true) {
                    this.$navigateTo(EditionMetier, {
                        frame: "rootFrame",
                        props: {
                            from: "Metiers",
                            shortcut: this.metier.nom
                        }
                    });
                } else if (this.isConnected === false) {
                    login("Veuillez vous connecter", "email", "mot de passe")
                        .then(result => {
                            axios
                                .get('https://vast-taiga-97693.herokuapp.com/user', {
                                    params: {
                                        email: result.userName,
                                        password: result.password
                                    }
                                })
                                .then((response) => {
                                    if (typeof response.data.email !== 'undefined' && typeof response.data.password !== 'undefined' && response.data.email.length != 0 && response.data.password.length != 0) {
                                        this.$store.dispatch('storeUser', response.data);
                                        this.$store.dispatch('updateIsConnected', true);
                                        this.$navigateTo(EditionMetier, {
                                            frame: "rootFrame",
                                            props: {
                                                from: "Metiers",
                                                shortcut: this.metier.nom
                                            }
                                        });
                                    } else {
                                        alert('Mauvais identifiants')
                                            .then(() => {
                                                console.log("metier connection - mauvais identifiants");
                                            });
                                    }
                                })
                                .catch((error) => {
                                    console.log(error)
                                })
                        });
                }
            },
            tapShareSalaire() {
                if (this.isConnected === true) {
                    this.$navigateTo(Profil, {
                        frame: "rootFrame"
                    });
                } else if (this.isConnected === false) {
                    this.$navigateTo(Connexion, {
                        frame: "rootFrame"
                    });
                }
            },
            confirmationEdition () {
                alert(this.message)
                    .then(() => {
                        console.log("Alert dialog closed.");
                    });
            }
        },
        mounted () {
            console.log(this.shortcut);
            this.loadData();
            if (typeof this.message !== 'undefined' && this.message.length != 0) {
                this.confirmationEdition()
            }
        }
    }
</script>

<style scoped lang="scss">
    .actionBar {
        background-color: #FF5C5C;
        .icon_back {
            text-align: left;
        }
        .title {
            text-align: center;
        }
    }
    .global-container {
        margin: 0 10 20 10;

        .h3 {
            font-size: 20;
            color: #222222;
            margin: 15 0 5 0;
            font-weight: bold;
        }

        .h4 {
            font-size: 14;
            color: #343434;
            margin: 8 0 8 0;
        }

        .p {
            font-size: 16;
        }

        .editer_metier{
            margin: 30 0 10 0;
        }
    }
</style>
