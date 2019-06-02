<template>
    <Page actionBarHidden="true">
        <ScrollView orientation="vertical">
            <FlexboxLayout flexDirection="column" class="header-connection">
                <Image alignSelf="center" src="~/assets/images/logo.png" class="logo"/>
                <Label textWrap="true" class="p" text="Connectez vous pour aider la communauté ou postuler aux offres d'emplois"/>
                <StackLayout :visibility="load.loaderVisibility" justify-content="center">
                    <ActivityIndicator :busy="load.isBusy" />
                </StackLayout>
                <TextField v-model="user.email" hint="Email" keyboardType="email" />
                <TextField v-model="user.password" hint="Mot de passe" secure="true" />
                <Label text="Mauvais identifiants" class="message-error" :visibility="errorLogin"></Label>
                <Label text="Email au mauvais format" class="mail-error" :visibility="errorMail"></Label>
                <Button text="Connexion" @tap="onCon" />
                <Button text="Créer un compte" @tap="onCreate" />
                <Label text="Vous avez oublié votre mot de passe ?" class="forgot" @tap="onForgot" />
            </FlexboxLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import axios from 'axios';
    import Profil from "@/components/Views/Profil.vue";
    import CreateUser from "@/components/Views/CreateUser.vue";
    const dialogs = require('tns-core-modules/ui/dialogs');

    export default {
        components: {
            CreateUser
        },
        data () {
            return {
                user: {
                    email: "",
                    password: ""
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
            onCon() {
                this.load.isBusy = true;
                this.load.loaderVisibility = 'visible';
                const emailValide = this.validateEmail(this.user.email);
                if (emailValide === true) {
                    axios
                        .get('https://vast-taiga-97693.herokuapp.com/user', {
                            params: {
                                email: this.user.email,
                                password: this.user.password
                            }
                        })
                        .then((response) => {
                            if (response.data.email.length != 0 && response.data.password.length != 0) {
                                this.$store.dispatch('storeUser', response.data);
                                this.$store.dispatch('updateIsConnected', true);
                                this.$navigateTo(Profil, {
                                    frame: "rootFrame"
                                });
                            } else {
                                this.errorLogin = "visible";
                            }
                            this.load.isBusy = false;
                            this.load.loaderVisibility = 'collapsed';
                        })
                        .catch((error) => {
                            console.log(error)
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
            onCreate() {
                this.$navigateTo(CreateUser, {
                    frame: "rootFrame"
                })
            },
            onForgot() {
                prompt({
                    title: "Mot de passe oublié",
                    message: "Entrer votre adresse email :",
                    okButtonText: "Reset",
                    cancelButtonText: "Annuler",
                    defaultText: "",
                    inputType: dialogs.inputType.password
                }).then(result => {
                    console.log(`Dialog result: ${result.result}, text: ${result.text}`)
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
        .forgot{
            color:white;
            text-align: center;
        }

        .message-error {
            color: black;
            font-weight: bold;
        }

        TextField {
            color: white;
            placeholder-color: white;
            border-color: white;
            --android-line-color: white;
        }
    }
</style>
