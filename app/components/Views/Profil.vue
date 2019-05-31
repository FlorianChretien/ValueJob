<template>
    <Page actionBarHidden="true">
        <StackLayout>
            <FlexboxLayout flexDirection="column" class="header">
                <Image src="~/assets/images/profil/profil.png" class="img_profil"/>
                <Label text="Florian Chrétien" class="h2"/>
                <Label text="Développeur Web"/>
                <FlexboxLayout flexDirection="row" class="localisation" justifyContent="center">
                    <Image src="~/assets/images/profil/ico_loc.png" width="12" height="12"/>
                    <Label text="Bordeaux, France"/>
                </FlexboxLayout>
            </FlexboxLayout>
            <TabView>
                <TabViewItem title="éditer mon profil">
                    <ScrollView orientation="vertical">
                        <StackLayout>
                            <RadDataForm :source="profil" :metadata="md"/>
                            <Button text="Sauvegarder" @tap="onSauv" />
                            <Button text="Déconnexion" @tap="onDeco" />
                        </StackLayout>
                    </ScrollView>
                </TabViewItem>
                <TabViewItem title="éditer mon CV">
                    <StackLayout>
                        <Label text="Ici vous pourrez bientôt créer/éditer votre cv !" color="black"
                               textAlignment="center" marginTop="10"></Label>
                    </StackLayout>
                </TabViewItem>
            </TabView>
        </StackLayout>
    </Page>
</template>

<script>
    export default {
        data() {
            return {
                loginVisibility: "visible",
                profilVisibility: "collapsed",
                profil: {
                    nom: "Chrétien",
                    prenom: "Florian",
                    naissance: "23-04-1996",
                    metier: "Développeur Web",
                    salaireNet: "2837",
                    rechecheEmploi: true
                },
                md: {
                    isReadOnly: false,
                    commitMode: "Immediate",
                    validationMode: "Immediate",
                    propertyAnnotations: [{
                        name: "naissance",
                        displayName: "Naissance",
                        editor: "DatePicker"
                    }]
                }
            }
        },
        methods: {
            onSauv() {
                console.log("Button was pressed");
            },
            onDeco() {
                console.log("Button was pressed");
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header {
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        background-image: url('~/assets/images/profil/fond.jpg');

        color: white;
        text-align: center;

        .fond {
            width: 100;
            height: 100;
        }
        .h2 {
            font-weight: bold;
        }
        .img_profil {
            margin: 10 0 5 0;
            width: 130;
            height: 130;
        }
        .localisation {
            margin: 0 0 10 0;
        }
    }

    TabView {
        android-selected-tab-highlight-color: #FF5C5C;
    }
</style>
