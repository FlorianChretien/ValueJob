<template>
    <Page actionBarHidden="true">
        <FlexboxLayout flexDirection="column" class="header-connection" :visibility="loginVisibility">
            <Image alignSelf="center" src="~/assets/images/logo.png" class="logo"/>
            <Label textWrap="true" class="p" text="Créer un compte pour aider la communauté ou postuler aux offres d'emplois"/>
            <TextField v-model="user.email" />
            <TextField v-model="user.password" secure="true" />
            <Button text="Valider" @tap="onValid" />
        </FlexboxLayout>
    </Page>
</template>

<script>
    import axios from 'axios';
    import Profil from "@/components/Views/Profil.vue";

    export default {
        data () {
            return {
                user: {
                    email: "",
                    password: ""
                }
            }
        },
        methods: {
            onValid() {
                axios
                    .post('https://vast-taiga-97693.herokuapp.com/user', {
                        params: {
                            user: this.user,
                            password: this.password
                        }
                    })
                    .then((response) => {
                        if (response.data.email.length != 0 && response.data.password.length != 0) {
                            this.$navigateTo(Profil, {
                                frame: "rootFrame"
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
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
    }
</style>
