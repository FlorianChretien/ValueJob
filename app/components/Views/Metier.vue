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
                <FlexboxLayout width="300" :visibility="load.loaderVisibility" justify-content="center">
                    <ActivityIndicator :busy="load.isBusy" />
                </FlexboxLayout>

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
            onButtonTapSpecialite(specialite, args) {
                /*const btn = args.object;
                btn.backgroundColor = "#ff1228";*/
                this.salaireSelect.specialite = specialite;
            }
        },
        mounted() {
            console.log(this.shortcut);
            this.loadData();
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
    }
</style>
