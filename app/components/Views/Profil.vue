<template>
    <Page actionBarHidden="true">
        <StackLayout>
            <FlexboxLayout flexDirection="column" class="header">
                <Image src="~/assets/images/profil/profil.png" class="img_profil"/>
                <Label :text="prenomNom" class="h2"/>
                <Label :text="user.editable.metier"/>
                <FlexboxLayout flexDirection="row" class="localisation" justifyContent="center">
                    <Image src="~/assets/images/profil/ico_loc.png" width="12" height="12" v-if="user.editable.localisation.length != 0" />
                    <Label :text="user.editable.localisation"/>
                </FlexboxLayout>
            </FlexboxLayout>
            <TabView>
                <TabViewItem title="éditer mon profil">
                    <ScrollView orientation="vertical">
                        <StackLayout>
                            <RadDataForm :source="user.editable" :metadata="md" @propertyCommitted="onPropertyCommitted"/>
                            <StackLayout :visibility="load.loaderVisibility" justify-content="center">
                                <ActivityIndicator :busy="load.isBusy" />
                            </StackLayout>
                            <Button text="Sauvegarder" @tap="onSauv" />
                            <Button text="Déconnexion" @tap="onDeco" />
                        </StackLayout>
                    </ScrollView>
                </TabViewItem>
                <TabViewItem title="éditer mon CV">
                    <StackLayout>
                        <Label text="Ici vous pourrez bientôt créer / éditer votre cv !" color="black"
                               textAlignment="center" marginTop="10"></Label>
                    </StackLayout>
                </TabViewItem>
            </TabView>
        </StackLayout>
    </Page>
</template>

<script>
    import axios from 'axios'
    import { mapGetters } from 'vuex';
    import Connexion from '@/components/Views/Connexion.vue';

    export default {
        data() {
            return {
                loginVisibility: "visible",
                profilVisibility: "collapsed",
                md: {
                    isReadOnly: false,
                    commitMode: "Immediate",
                    validationMode: "Immediate",
                    propertyAnnotations: [
                        {
                            name: "naissance",
                            displayName: "Naissance",
                            editor: "DatePicker"
                        },
                        {
                            name: "salaireNet",
                            displayName: "Salaire Net",
                            editor: "number"
                        },
                        {
                            name: "rechercheEmploi",
                            displayName: "Recherche emploi",
                            editor: "switch"
                        }
                    ]
                },
                load: {
                    isBusy: false,
                    loaderVisibility: 'collapsed'
                },
                userCommit: {}
            }
        },
        computed: {
            ...mapGetters({
                user: 'user'
            }),
            prenomNom () {
                return this.user.editable.prenom + ' ' + this.user.editable.nom;
            }
        },
        methods: {
            onPropertyCommitted (data) {
                this.userCommit.editable = JSON.parse(data.object.editedObject);
                //A FAIRE//console.log(this.userCommit.editable.rechercheEmploi)
            },
            onSauv() {
                this.load.isBusy = true;
                this.load.loaderVisibility = 'visible';
                axios
                    .put('https://vast-taiga-97693.herokuapp.com/user', {
                        data: this.userCommit
                    })
                    .then((response) => {
                        this.load.isBusy = false;
                        this.load.loaderVisibility = 'collapsed';
                        this.$store.dispatch('storeUser', response.data)
                    })
                    .catch((error) => {
                        this.load.isBusy = false;
                        this.load.loaderVisibility = 'collapsed';
                        console.log(error);
                    });
            },
            onDeco() {
                this.$store.dispatch('updateIsConnected', false);
                this.$navigateTo(Connexion, {
                    frame: "rootFrame"
                });
            }
        },
        mounted () {
            this.userCommit = {
                _id: this.user._id,
                email: this.user.email,
                password: this.user.password,
                editable: {},
                __v: this.user.__v
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
