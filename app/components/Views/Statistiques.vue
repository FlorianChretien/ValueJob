<template>
    <Page actionBarHidden="true">
        <ScrollView orientation="vertical">
            <StackLayout class="container-global">
                <StackLayout class="header">
                    <Label text="Statistiques Globales" class="h1" />
                    <Label text="Retrouvez ici l'ensemble de nos statistiques générées grâce aux données anonymes" class="p" textWrap="true" />
                </StackLayout>
                <StackLayout class="apercu" >
                    <Label @tap="onMetierTap('DEVELOPPEUR WEB')" textWrap="true" class="h4">
                        <FormattedString>
                            <Span text="•" />
                            <Span text=" Développeur Web " style="font-weight: bold"/>
                            <Span text="est le métier le plus populaire."/>
                        </FormattedString>
                    </Label>
                    <Label @tap="onMetierTap('ARCHITECTE')" textWrap="true" class="h4">
                        <FormattedString>
                            <Span text="•" />
                            <Span text=" Architecte " style="font-weight: bold"/>
                            <Span text="est le métier le plus recherché des employeurs."/>
                        </FormattedString>
                    </Label>
                    <Label @tap="onMetierTap('MECANICIEN REPARATEUR')" textWrap="true" class="h4">
                        <FormattedString>
                            <Span text="• Le métier avec le plus de réponses (salaire) sur ValueJob est "/>
                            <Span text="Mécanicien réparateur." style="font-weight: bold"/>
                        </FormattedString>
                    </Label>
                </StackLayout>
                <StackLayout class="article">
                    <FlexboxLayout flexDirection="column">
                        <FlexboxLayout class="imgBg art-1" width="100%" height="150">
                            <Label class="p" textWrap="true" text="Top 10 des métiers les mieux rémunérés en France" />
                        </FlexboxLayout>
                        <FlexboxLayout class="imgBg art-2" width="100%" height="150">
                            <Label class="p" textWrap="true" text="Les métiers les plus recherchés par Région / Département" />
                        </FlexboxLayout>
                        <FlexboxLayout class="imgBg art-3" width="100%" height="150">
                            <Label class="p" textWrap="true" text="Les métiers avec le plus d'inégalité salariale H/F" />
                        </FlexboxLayout>
                        <FlexboxLayout class="imgBg art-4" width="100%" height="150">
                            <Label class="p" textWrap="true" text="Top 10 des départements qui recherche de médecin" />
                        </FlexboxLayout>
                        <FlexboxLayout class="imgBg art-5" width="100%" height="150">
                            <Label class="p" textWrap="true" text="Villes qui rémunère le mieux en fonction du coût de la vie" />
                        </FlexboxLayout>
                        <FlexboxLayout class="imgBg art-6" width="100%" height="150">
                            <Label class="p" textWrap="true" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
                        </FlexboxLayout>
                        <FlexboxLayout class="imgBg art-7" width="100%" height="150">
                            <Label class="p" textWrap="true" text="Suspendisse lectus tortor, dignissim sit amet" />
                        </FlexboxLayout>
                        <FlexboxLayout class="imgBg art-8" width="100%" height="150">
                            <Label class="p" textWrap="true" text="Maecenas adipiscing ante non diam sodales hendrerit" />
                        </FlexboxLayout>
                        <FlexboxLayout class="imgBg art-9" width="100%" height="150">
                            <Label class="p" textWrap="true" text="Metus purus iaculis lectus" />
                        </FlexboxLayout>
                        <FlexboxLayout class="imgBg art-10" width="100%" height="150">
                            <Label class="p" textWrap="true" text="Aenean suscipit nulla in justo" />
                        </FlexboxLayout>
                    </FlexboxLayout>
                </StackLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import Metiers from '@/components/Views/Metiers.vue';
    import BottomBar from '@/components/BottomBar.vue'

    export default {
        components: {
            BottomBar
        },
        data() {
            return {
                toto: ''
            }
        },
        methods: {
            onMetierTap(MetierTap) {
                console.log(MetierTap);
                this.$navigateTo(Metiers, {
                    frame: "rootFrame",
                    props: {
                        from: "Statistiques",
                        shortcut: MetierTap
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container-global {
        .header{
            background-color: #FF5C5C;

            .h1 {
                color: #ffffff;
                font-size: 24;
                text-align: center;
                margin: 15 0 5 0;
                font-weight: bold;
            }
            .p {
                color: #ffffff;
                font-size: 15;
                text-align: center;
                margin: 5 0 20 0;
                padding: 0 16;
            }
        }

        .apercu {
            padding: 20;

            .h2 {
                color: #222222;
                font-size: 22;
                text-align: left;
                margin-top: 0;
            }

            .h4 {
                color: #222222;
                font-size: 18;
                margin: 10 0 20 0;
                text-align: left;
            }
        }

        .article {
            margin: 0 0 20 0;

            .h2 {
                color: #4D4D4D;
                font-size: 22;
                text-align: left;
                margin-top: 0;
            }
            .imgBg {
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
            }
            .p {
                font-size: 20;
                color: white;
                font-weight: bold;
                padding: 20;
            }
            .art-1 { background-image: url('~/assets/images/statistique/img1.jpg'); }
            .art-2 { background-image: url('~/assets/images/statistique/img2.jpg'); }
            .art-3 { background-image: url('~/assets/images/statistique/img3.jpg'); }
            .art-4 { background-image: url('~/assets/images/statistique/img4.jpg'); }
            .art-5 { background-image: url('~/assets/images/statistique/img5.jpg'); }
            .art-6 { background-image: url('~/assets/images/statistique/img6.jpg'); }
            .art-7 { background-image: url('~/assets/images/statistique/img7.jpg'); }
            .art-8 { background-image: url('~/assets/images/statistique/img8.jpg'); }
            .art-9 { background-image: url('~/assets/images/statistique/img9.jpg'); }
        }
    }
</style>
