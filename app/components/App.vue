<template>
    <Page actionBarHidden="true">
        <GridLayout columns="*" rows="*, auto">
            <Frame id="rootFrame">
                <Page actionBarHidden="true">
                </Page>
            </Frame>
            <BottomBar></BottomBar>
        </GridLayout>
    </Page>
</template>

<script>
    import axios from 'axios'
    import HomeMetier from '@/components/Views/HomeMetier.vue'
    import BottomBar from '@/components/BottomBar.vue'

    export default {
        components: {
            HomeMetier,
            BottomBar
        },
        data () {
            return {
                pageTitle: void 0
            }
        },
        mounted() {
            setTimeout(() => {
                this.$navigateTo(HomeMetier, {
                    frame: "rootFrame"
                });
                //axios.get('https://vast-taiga-97693.herokuapp.com/metier?nom=BOULANGER').then((response) => { console.log(response) }).catch((e) => { console.log(e) })
            }, 400);
        }
    }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }
</style>
