<template>
    <BottomBar row="1"
               v-on:tabSelected="tabSelected"
               v-bind:labelVisibility="labelVisibility"
               v-on:loaded="barLoaded">
        <BottomBarItem
                icon="~/assets/images/icones/ic_metier@3x.png"
                title="Métiers"
        >
        </BottomBarItem>
        <BottomBarItem
                icon="~/assets/images/icones/ic_statistique@3x.png"
                title="Statistiques"
        >
        </BottomBarItem>
        <BottomBarItem
                icon="~/assets/images/icones/ic_job@3x.png"
                badge="2"
                title="Offres d'emplois"
        >
        </BottomBarItem>
        <BottomBarItem
                icon="~/assets/images/icones/ic_profil@3x.png"
                title="Profil"
        >
        </BottomBarItem>
    </BottomBar>
</template>

<script>
    import { mapGetters } from 'vuex'
    import HomeMetier from "@/components/Views/HomeMetier.vue";
    import Statistiques from "@/components/Views/Statistiques.vue";
    import Jobs from "@/components/Views/Jobs.vue";
    import Profil from "@/components/Views/Profil.vue";
    import Connexion from '@/components/Views/Connexion.vue';

    export default {
        components: {
            HomeMetier,
            Statistiques,
            Jobs,
            Profil,
            Connexion
        },
        data () {
            return {
                labelVisibility: 0
            }
        },
        computed: {
            ...mapGetters({
                isConnected: 'isConnected'
            })
        },
        methods: {
            tabSelected: function(event) {
                switch (event.newIndex) {
                    case 0:
                        this.$navigateTo(HomeMetier, {
                            frame: "rootFrame"
                        });
                        break;
                    case 1:
                        this.$navigateTo(Statistiques, {
                            frame: "rootFrame"
                        });
                        break;
                    case 2:
                        this.$navigateTo(Jobs, {
                            frame: "rootFrame"
                        });
                        break;
                    case 3:
                        if (this.isConnected === true) {
                            this.$navigateTo(Profil, {
                                frame: "rootFrame"
                            });
                        } else if (this.isConnected === false) {
                            this.$navigateTo(Connexion, {
                                frame: "rootFrame"
                            });
                        }
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
        inactive-tint-color: #E0E0E0;
        active-tint-color: #FFFFFF;
        bar-background-color: #4D4D4D;
        badge-background-color: #222222;
    }
</style>
