<template>
    <StackLayout>
        <GridLayout columns="*" rows="*, auto" class="BottomMenu">
            <Label class="message" :text="msg" col="0" row="0"/>
            <BottomBar row="1"
                       v-on:tabSelected="tabSelected"
                       v-bind:labelVisibility="labelVisibility"
                       v-on:loaded="barLoaded">
                <BottomBarItem
                        icon="res://ic_metier"
                        badge="1"
                        title="Métier"
                >
                </BottomBarItem>
                <BottomBarItem
                        icon="res://ic_statistique"
                        badge="2"
                        title="Statistique"
                >
                </BottomBarItem>
                <BottomBarItem
                        icon="res://ic_job"
                        badge="3"
                        title="Job"
                >
                </BottomBarItem>
                <BottomBarItem
                        icon="res://ic_profil"
                        badge="4"
                        title="Profil"
                >
                </BottomBarItem>
            </BottomBar>
        </GridLayout>
    </StackLayout>
</template>

<script>
    export default {
        data () {
            return {
                labelVisibility: 0,
                msg: 'Lucas'
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
        color: #ffffff;
    }

    .BottomMenu{
        background-color: #1a354f;
    }
</style>
