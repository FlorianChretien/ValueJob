<template>
    <Page>
        <ActionBar :title="metier.nom">
            <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="goBack"/>
        </ActionBar>
        <ScrollView orientation="vertical">
            <StackLayout orientation="vertical">
                <ActivityIndicator :busy="load.isBusy"/>
                <FlexboxLayout class="global-container" flexDirection="column" :visibility="load.isVisible">
                    <Label class="h3" text="Salaire"/>
                    <Label class="h4" textWrap="true" text="Spécialisations"/>
                    <FlexboxLayout flexDirection="wrap" flexWrap="wrap">
                        <Button v-for="specialite in metier.specialite" :text="specialite" @tap="salaireSelect.specialite = specialite"/>
                    </FlexboxLayout>
                    <Label class="h4" textWrap="true" text="Villes"/>
                    <FlexboxLayout flexDirection="wrap" flexWrap="wrap">
                        <Button v-for="ville in metier.villes" :text="ville" @tap="salaireSelect.ville = ville" textWrap="false" />
                    </FlexboxLayout>
                    <GridLayout rows="*" class="radchart">
                        <RadCartesianChart row="0" height="1000px">
                            <BarSeries v-tkCartesianSeries :items="metier.salaire[salaireSelect.specialite][salaireSelect.ville]" categoryProperty="experience"
                                       valueProperty="val1"/>
                            <CategoricalAxis v-tkCartesianHorizontalAxis/>
                            <LinearAxis v-tkCartesianVerticalAxis/>
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
                </FlexboxLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import HomeMetier from '@/components/Views/HomeMetier.vue'

    export default {
        components: {
            HomeMetier
        },
        data() {
            return {
                load: {
                    isBusy: true,
                    isVisible: 'collapsed'
                },
                metier: {
                    id: 0,
                    nom: "Métier",
                    secteur: "",
                    specialite: [],
                    villes: [],
                    salaire: {"specialite": { "all": [{"experience": "toto", "val1": 30, "val2": 10}] }},
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
            shortcut: String
        },
        methods: {
            goBack() {
                this.$navigateTo(HomeMetier, {
                    frame: "rootFrame"
                });
            },
            loadData() {
                this.axios
                    .get('https://gist.githubusercontent.com/FlorianChretien/5042d45caf13404b4e9090c640c8798b/raw/c19292dd1fd0cf76d68320476bb86dcf60b5d0e9/metiers.json')
                    .then((response) => {
                        setTimeout(() => {
                            this.load.isBusy = false;
                            this.load.isVisible = 'visible';
                            for (var key in response.data) {
                                for (var property in response.data[key]) {
                                    if (property === 'nom') {
                                        if (response.data[key][property] === this.shortcut) {
                                            for (var property in response.data[key]) {
                                                this.metier[property] = response.data[key][property];
                                            }
                                        }
                                    }
                                }
                            }
                            this.salaireSelect.specialite = this.metier.specialite[0];
                            this.salaireSelect.ville = "all";
                        }, 200)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            onButtonTap() {
                console.log("Button was pressed");
            }
        },
        mounted() {
            console.log(this.shortcut);
            this.loadData()
        }
    }
</script>

<style scoped lang="scss">
    .global-container {
        margin: 5;

        .h3 {
            font-size: 20;
            color: #222222;
            margin: 15 0 10 0;
        }

        .h4 {
            font-size: 18;
            color: #343434;
            margin: 8 0 8 0;
        }

        .p {
            font-size: 16;
        }
    }
</style>
