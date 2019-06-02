<template>
    <Page actionBarHidden="true">
        <ScrollView orientation="vertical">
            <FlexboxLayout flexDirection="column" class="header-connection">
                <Image alignSelf="center" src="~/assets/images/logo.png" class="logo"/>
                <Label textWrap="true" class="p" text="Créer un compte pour aider la communauté ou postuler aux offres d'emplois"/>
                <StackLayout :visibility="load.loaderVisibility" justify-content="center">
                    <ActivityIndicator :busy="load.isBusy" />
                </StackLayout>
                <TextField v-model="user.email" hint="Email" keyboardType="email" />
                <TextField v-model="user.password" hint="Password" secure="true" />
                <Label text="Un problème est survenu, veuillez vérifier vos identifiants" class="message-error" :visibility="errorLogin"></Label>
                <Label text="Email au mauvais format" class="mail-error" :visibility="errorMail"></Label>
                <Button text="Valider" @tap="onValid" />
                <Button text="Annuler" @tap="onAnnuler" />
            </FlexboxLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import axios from 'axios';
    import Profil from "@/components/Views/Profil.vue";
    import Connexion from "@/components/Views/connexion.vue";

    export default {
        components: {
            Profil,
            Connexion
        },
        data () {
            return {
                user: {
                    email: "",
                    password: "",
                    editable: {
                        nom: "",
                        prenom: "",
                        naissance: "",
                        localisation: "",
                        metier: "",
                        salaireNet: "",
                        rechercheEmploi: false
                    }
                },
                errorLogin: "collapsed",
                errorMail: "collapsed",
                load: {
                    isBusy: false,
                    loaderVisibility: 'collapsed'
                }
            }
        },
        methods: {
            onValid() {
                this.load.isBusy = true;
                this.load.loaderVisibility = 'visible';
                const emailValide = this.validateEmail(this.user.email);
                if (emailValide === true) {
                    axios
                        .post('https://vast-taiga-97693.herokuapp.com/user', {
                            data: this.user
                        })
                        .then((response) => {
                            this.load.isBusy = false;
                            this.load.loaderVisibility = 'collapsed';
                            if (response.data.email.length != 0 && response.data.password.length != 0) {
                                this.$store.dispatch('storeUser', response.data);
                                this.$store.dispatch('updateIsConnected', true);
                                this.$navigateTo(Profil, {
                                    frame: "rootFrame"
                                });
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            this.errorLogin = "visible";
                            this.load.isBusy = false;
                            this.load.loaderVisibility = 'collapsed';
                        })
                } else if (emailValide === false) {
                    this.errorMail = "visible";
                    this.load.isBusy = false;
                    this.load.loaderVisibility = 'collapsed';
                }
            },
            onAnnuler () {
                this.$navigateTo(Connexion, {
                    frame: "rootFrame"
                });
            },
            validateEmail(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }
        }
    }
</script>

<style scoped lang="scss">
    .header-connection {
        background-color: #FF5C5C;
        padding: 16;
        height: 100%;

        .p {
            color: #ffffff;
            font-size: 15;
            margin: 10 0 20 0;
            text-align: center;
        }
        .logo {
            margin: 15;
            width: 100;
            height: 150;
        }
        Button {
            background-color: #ffffff;
        }

        TextField {
            color: white;
            placeholder-color: white;
            border-color: white;
            --android-line-color: white;
        }
    }
</style>
