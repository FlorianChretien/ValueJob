<template>
    <Page actionBarHidden="true">
        <GridLayout columns="*" rows="*, auto">
            <StackLayout>
                <FlexboxLayout flexDirection="column">
                    <Image alignSelf="center" width="140" src="~/assets/images/logo.png" class="logo" stretch="none"/>
                    <Label text="Statistique.." />
                </FlexboxLayout>
            </StackLayout>
            <BottomBar></BottomBar>
        </GridLayout>
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
