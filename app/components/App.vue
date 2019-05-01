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
