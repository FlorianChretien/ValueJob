<template>
    <BottomBar row="1"
               v-on:tabSelected="tabSelected"
               v-bind:labelVisibility="labelVisibility"
               v-on:loaded="barLoaded">
        <BottomBarItem
                icon="~/assets/images/icones/ic_metier.png"
                title="Métier"
        >
        </BottomBarItem>
        <BottomBarItem
                icon="~/assets/images/icones/ic_statistique.png"
                title="Statistique"
        >
        </BottomBarItem>
        <BottomBarItem
                icon="~/assets/images/icones/ic_job.png"
                badge="3"
                title="Job"
        >
        </BottomBarItem>
        <BottomBarItem
                icon="~/assets/images/icones/ic_profil.png"
                title="Profil"
        >
        </BottomBarItem>
    </BottomBar>
</template>

<script>
    import HomeMetier from "@/components/Views/HomeMetier.vue";
    import Statistique from "@/components/Views/Statistique.vue";
    import Job from "@/components/Views/Job.vue";
    import Profil from "@/components/Views/Profil.vue";

    export default {
        components: {
            HomeMetier,
            Statistique,
            Job,
            Profil
        },
        data () {
            return {
                labelVisibility: 0
            }
        },
        methods: {
            tabSelected: function(event) {
                switch (event.newIndex) {
                    case 0:
                        this.$navigateTo(HomeMetier, {
                            frame: "rootFrame"
                        })
                        break;
                    case 1:
                        this.$navigateTo(Statistique, {
                            frame: "rootFrame"
                        })
                        break;
                    case 2:
                        this.$navigateTo(Job, {
                            frame: "rootFrame"
                        })
                        break;
                    case 3:
                        this.$navigateTo(Profil, {
                            frame: "rootFrame"
                        })
                        break;
                }
            },
            barLoaded: function(event) {
                console.dir(event);
            }
        }
    }
</script>

<style scoped>
    BottomBar {
        inactive-tint-color: #6082c3;
        active-tint-color: #FFFFFF;
        bar-background-color: #475a9f;
        badge-background-color: #222222;
    }
</style>
