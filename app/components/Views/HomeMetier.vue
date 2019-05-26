<template>
    <Page actionBarHidden="true">
        <ScrollView orientation="vertical">
            <StackLayout class="global-container">
                <FlexboxLayout flexDirection="column" class="container">
                    <Image alignSelf="center" src="~/assets/images/logo.png" class="logo"/>
                    <Label textWrap="true" class="h2" text="Découvrez votre véritable valeur sur le marché du travail"/>
                    <Label textWrap="true" class="p" text="Gratuit et communautaire, Value Job a pour objectif d'être un outil d'aide aux employés, chômeurs et étudiants qui recherchent un ou leur métier. Salaires, Définitions, Formations mise à jour régulèriement grâce à la communauté et à diverses API basées sur l'emploi en 2019."/>
                    <Button class="button" text="Chercher un métier" @tap="onButtonTap"/>
                </FlexboxLayout>
                <FlexboxLayout flexWrap="wrap" justifyContent="space-around" class="container_shortcut">
                    <Label textWrap="true" class="h3" text="Raccourci métier"/>
                    <FlexboxLayout flexDirection="column" width="50%" justifyContent="space-around" @tap="onMetierTap('BOULANGER')">
                        <Image src="~/assets/images/metiers/boulanger.png" class="img img-g"/>
                        <Label textWrap="true" class="baseline" text="Boulanger"/>
                    </FlexboxLayout>
                    <FlexboxLayout flexDirection="column" width="50%" justifyContent="space-around" @tap="onMetierTap('DEVELOPPEUR WEB')">
                        <Image src="~/assets/images/metiers/developpeur_web.png" class="img img-d"/>
                        <Label textWrap="true" class="baseline" text="Développeur Web"/>
                    </FlexboxLayout>
                    <FlexboxLayout flexDirection="column" width="50%" justifyContent="space-around" @tap="onMetierTap('MEDECIN')">
                        <Image src="~/assets/images/metiers/docteur.png" class="img img-g"/>
                        <Label textWrap="true" class="baseline" text="Médecin généraliste"/>
                    </FlexboxLayout>
                    <FlexboxLayout flexDirection="column" width="50%" justifyContent="space-around" @tap="onMetierTap('ELEVEUR')">
                        <Image src="~/assets/images/metiers/eleveur.png" class="img img-d"/>
                        <Label textWrap="true" class="baseline" text="Éleveur"/>
                    </FlexboxLayout>
                </FlexboxLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import SearchMetier from '@/components/Views/SearchMetier.vue';
    import Metiers from '@/components/Views/Metiers.vue';

    export default {
        components: {
            SearchMetier
        },
        methods: {
            onButtonTap () {
                this.$navigateTo(SearchMetier, {
                    frame: "rootFrame"
                });
            },
            onMetierTap (MetierTap) {
                console.log(MetierTap);
                this.$navigateTo(Metiers, {
                    frame: "rootFrame",
                    props: {
                        from: "HomeMetier",
                        shortcut: MetierTap
                    }
                });
            }
        }

    }
</script>

<style scoped lang="scss">
    .global-container {
        .container {
            background-color: #FF5C5C;
            padding: 16;

            .h2 {
                color: #ffffff;
                font-size: 24;
                text-align: center;
                margin: 30 0 10 0;
            }

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
            .button {
                background-color: #ffffff;
            }
        }

        .container_shortcut {
            margin-top: 20;
            margin-bottom: 20;

            .h3 {
                width: 100%;
                color: #4D4D4D;
                font-size: 20;
                text-align: center;
                margin: 0 0 20 0;
            }
            .img {
                height: 100;
                border-radius: 10px;
            }
            .img-g {
                margin: 5 5 5 0;
            }
            .img-d {
                margin: 5 0 5 5;
            }
            .baseline {
                text-align: center;
                font-size: 12;
            }
        }
    }

</style>
