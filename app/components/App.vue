<template>
    <Page>
        <ActionBar title="Welcome to NativeScript-Vue!"/>
        <GridLayout columns="*" rows="*, auto" class="BottomMenu">
            <Label class="message" :text="msg" col="0" row="0"/>
            <BottomBar row="1"
                       v-on:tabSelected="tabSelected"
                       v-bind:labelVisibility="labelVisibility"
                       v-on:loaded="barLoaded">
                <BottomBarItem
                        icon="res://ic_metier"
                        badge="1"
                        title="Home 1"
                >
                </BottomBarItem>
                <BottomBarItem
                        icon="res://ic_metier"
                        badge="2"
                        title="Home 2"
                >
                </BottomBarItem>
                <BottomBarItem
                        icon="res://ic_metier"
                        badge="3"
                        title="Home 3"
                >
                </BottomBarItem>
            </BottomBar>
        </GridLayout>
    </Page>
</template>

<script>
    export default {
        data () {
            return {
                labelVisibility: 0,
                msg: 'toto'
            }
        },
        methods: {
            tabSelected: function(event) {
                console.dir(event);
            },
            barLoaded: function(event) {
                console.dir(event);
            }
        }
    }
</script>

<style scoped>
    BottomBar {
        inactive-tint-color: #C34491;
        active-tint-color: #FFFFFF;
        bar-background-color: #9F489B;
        badge-background-color: #222222;
    }

    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }

    .BottomMenu{
        background-color: #1a354f;
    }
</style>
