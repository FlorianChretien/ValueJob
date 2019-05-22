<template>
    <Page>
        <ActionBar :title="metier.nom">
            <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="goBack"/>
        </ActionBar>
        <ScrollView orientation="vertical">
            <StackLayout orientation="vertical">
                <ActivityIndicator :busy="load.isBusy" />
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
                            <CategoricalAxis v-tkCartesianHorizontalAxis/>
                            <LinearAxis v-tkCartesianVerticalAxis/>

                            <SplineAreaSeries v-tkCartesianSeries
                                        seriesName="haut"
                                        legendTitle="Vanished"
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
                    <StackLayout orientation="vertical" width="210" height="210" backgroundColor="lightgray" v-for="js in json">
                        <Label :text="js.title" width="70" height="50" backgroundColor="red" />
                    </StackLayout>
                </FlexboxLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import axios from "axios";
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
                },
                json: {}
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
                    .get('https://vast-taiga-97693.herokuapp.com/metier', {
                        params: {
                            nom: this.shortcut
                        }
                    })
                    .then((response) => {
                        this.load.isBusy = false;
                        this.load.isVisible = 'visible';
                        for (let property in response.data) {
                            this.metier[property] = response.data[property];
                        }
                        this.salaireSelect.specialite = this.metier.specialite[0];
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            onButtonTap() {
                console.log("Button was pressed");
            }
        },
        mounted() {
            console.log(this.shortcut);
            this.loadData();
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
