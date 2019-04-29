<template>
    <Page actionBarHidden="true">
        <ScrollView orientation="vertical">
            <StackLayout class="global-container">
                <FlexboxLayout flexDirection="column">
                    <Image alignSelf="center" width="140" src="~/assets/images/logo.png" class="logo" stretch="none"/>
                    <Label textWrap="true" class="h2" text="Découvrez votre véritable valeur sur le marché du travail" />
                    <!--<SearchBar hint="Coiffeur, Docteur, Carrossier ..." :text="searchPhrase" @submit="onSearchSubmit"/>-->
                    <Label textWrap="true" class="p" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec velit libero. Nulla porta purus id neque ultrices, at rhoncus augue convallis. Nulla blandit eu dui sit amet feugiat. Sed varius ligula risus, vel consequat nibh semper quis. " />
                </FlexboxLayout>
                <FlexboxLayout flexWrap="wrap" justifyContent="space-around" class="container_shortcut">
                    <Image width="45%" src="~/assets/images/metier/boulanger.jpg" class="img-g" stretch="none"/>
                    <Image width="45%" src="~/assets/images/metier/developpeur_web.jpg" class="img-d" stretch="none"/>
                    <Image width="45%" src="~/assets/images/metier/docteur.jpg" class="img-g" stretch="none"/>
                    <Image width="45%" src="~/assets/images/metier/eleveur.jpg" class="img-d" stretch="none"/>
                </FlexboxLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    export default {
        data() {
            return {
                searchPhrase: ''
            }
        },
        methods: {
            onSearchSubmit(args) {
                let searchBar = args.object;
                console.log("You are searching for " + searchBar.text);
            }
        }
    }
</script>

<style scoped lang="scss">
    .global-container{
        padding: 16;
        .h2{
            color: #222222;
            font-size: 24;
            text-align: center;
            margin: 20 0 20 0;
        }
        .p{
            color: #222222;
            font-size: 15;
            margin: 20 0 20 0;
        }
        .logo{
            margin: 15;
        }
        .img-g{
            margin: 5 5 5 0;
        }
        .img-d{
            margin: 5 0 5 5;
        }
        .container_shortcut{
            margin-bottom: 20;
        }
    }
</style>
