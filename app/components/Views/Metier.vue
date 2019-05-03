<template>
    <Page>
        <ActionBar :title="shortcut">
            <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="goBack" />
        </ActionBar>
        <ScrollView orientation="vertical">
            <FlexboxLayout flexDirection="column">
                <Label text="Salaire" />

                <Label text="Description" />
                <Label textWrap="true" class="p" text="description"/>
                <Label text="Compétences" />
                <Label textWrap="true" class="p" text="compétences"/>
                <Label text="Formation" />
                <Label textWrap="true" class="p" text="formation"/>
                <Label text="Responsabilités et évolution" />
                <Label textWrap="true" class="p" text="responsabilités et évolution"/>
            </FlexboxLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import axios from 'axios'
    import HomeMetier from '@/components/Views/HomeMetier.vue'

    export default {
        components: {
            HomeMetier
        },
        data() {
            return {
                listOfItems: {},
                metier: {
                    title: '',
                }
            }
        },
        props: {
            shortcut: String
        },
        methods: {
            goBack () {
                this.$navigateTo(HomeMetier, {
                    frame: "rootFrame"
                });
            },
            loadData () {
                console.log('loadData');
                axios
                    .get('@/fakemetier.json')
                    .then((response) => {
                        console.log(response)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        },
        mounted () {
            if (this.shortcut != null) {
                this.loadData()
            }
        }
    }
</script>
