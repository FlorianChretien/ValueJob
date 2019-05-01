<template>
    <Page actionBarHidden="true">
        <ActionBar title="Statistique"/>
        <StackLayout>
            <Label text="Statistique.." />
        </StackLayout>
    </Page>
</template>

<script>
    import BottomBar from '@/components/BottomBar.vue'

    export default {
        data() {
            return {
                toto: ''
            }
        },
        components: {
            BottomBar
        }
    }
</script>
