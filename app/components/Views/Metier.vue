<template>
    <Page>

        <RadCartesianChart>
            <LinearAxis v-tkCartesianVerticalAxis horizontalLocation="Right"/>
            <CategoricalAxis v-tkCartesianHorizontalAxis/>

            <BarSeries v-tkCartesianSeries selectionMode="Series"
                       :items="categoricalSource" categoryProperty="Country" valueProperty="Impact">
            </BarSeries>
        </RadCartesianChart>

        <!-- <ActionBar :title="metier.nom">
             <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="goBack"/>
         </ActionBar>
         <ScrollView orientation="vertical">
             &lt;!&ndash;<FlexboxLayout flexDirection="column">
                 <Label text="Salaire"/>
                 <Label textWrap="true" class="h3" text="description"/>
                 <Label textWrap="true" :text="metier.description.text"/>
                 <Label textWrap="true" class="h3" text="compétences"/>
                 <Label textWrap="true" :text="metier.competence.text"/>
                 <Label textWrap="true" class="h3" text="formation"/>
                 <Label textWrap="true" :text="metier.formation.text"/>
                 <Label textWrap="true" class="h3" text="responsabilités et évolution"/>
                 <Label textWrap="true" :text="metier.responsabilitesEvolution.text"/>
             </FlexboxLayout>&ndash;&gt;

         </ScrollView>-->
    </Page>
</template>

<script>
    import axios from 'axios'
    import HomeMetier from '@/components/Views/HomeMetier.vue'

    export default {
        components: {
            HomeMetier
        },
        data() {
            return {
                categoricalSource: [
                    {Country: "Germany", Amount: 15, SecondVal: 14, ThirdVal: 24},
                    {Country: "France", Amount: 13, SecondVal: 23, ThirdVal: 25},
                    {Country: "Bulgaria", Amount: 24, SecondVal: 17, ThirdVal: 23},
                    {Country: "Spain", Amount: 11, SecondVal: 19, ThirdVal: 24},
                    {Country: "USA", Amount: 18, SecondVal: 8, ThirdVal: 21}
                ],
                metier: {
                    id: 0,
                    nom: "Erreur",
                    secteur: "",
                    salaire: {},
                    description: {},
                    competence: {},
                    formation: {},
                    responsabilitesEvolution: {}
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
                axios
                    .get('https://gist.githubusercontent.com/FlorianChretien/5042d45caf13404b4e9090c640c8798b/raw/2684e13058b544ba356e5da5f08b7b5d83a88f27/metiers.json')
                    .then((response) => {
                        for (var key in response.data) {
                            for (var property in response.data[key]) {
                                if (property === 'nom') {
                                    if (response.data[key][property] === this.shortcut) {
                                        for (var property in response.data[key]) {
                                            if (property === 'id') {
                                                this.metier.id = response.data[key][property];
                                            }
                                            if (property === 'nom') {
                                                this.metier.nom = response.data[key][property];
                                            }
                                            if (property === 'secteur') {
                                                this.metier.secteur = response.data[key][property];
                                            }
                                            if (property === 'salaire') {
                                                this.metier.salaire = response.data[key][property];
                                            }
                                            if (property === 'description') {
                                                this.metier.description = response.data[key][property];
                                            }
                                            if (property === 'competence') {
                                                this.metier.competence = response.data[key][property];
                                            }
                                            if (property === 'formation') {
                                                this.metier.formation = response.data[key][property];
                                            }
                                            if (property === 'responsabilitesEvolution') {
                                                this.metier.responsabilitesEvolution = response.data[key][property];
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        },
        mounted() {
            console.log(this.shortcut);
            this.loadData()
        }
    }
</script>
