<template>
    <Page actionBarHidden="true">
        <ScrollView orientation="vertical">
            <StackLayout class="container-global">
                <StackLayout class="header">
                    <Label text="Offres d'emplois" class="h1"/>
                </StackLayout>
                <StackLayout>
                    <SearchBar hint="Search hint" :text="searchPhrase" @submit="onSearchSubmit" ref="searchBar" />
                </StackLayout>
                <StackLayout :visibility="load.loaderVisibility" justify-content="center">
                    <ActivityIndicator :busy="load.isBusy" />
                </StackLayout>
                <FlexboxLayout flexDirection="column" visibility="isVisible" v-for="(job, index) in jobs" :key="index">
                    <FlexboxLayout flexDirection="column" class="card">
                        <StackLayout :class="fondSection[index]" class="fond-img">
                            <FlexboxLayout flexDirection="row" justifyContent="space-between">
                                <Label :text="job.type" class="p"></Label>
                                <Label :text="job.duree" class="p"></Label>
                            </FlexboxLayout>
                            <Label :text="job.poste" class="p poste"></Label>
                            <FlexboxLayout flexDirection="row">
                                <Image src="~/assets/images/profil/ico_loc.png" width="12" height="12" v-if="job.lieu.length != 0" />
                                <Label :text="job.lieu" class="p"></Label>
                            </FlexboxLayout>
                            <Label :text="salaireFormatter[index]" class="p"></Label>
                        </StackLayout>
                        <StackLayout class="description">
                            <Label :text="descriptionLimit[index]" textWrap="true" class="p"></Label>
                            <Button text="Lire la suite" />
                        </StackLayout>
                    </FlexboxLayout>
                </FlexboxLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                searchPhrase: "",
                jobs: {},
                load: {
                    isBusy: false,
                    isVisible: 'collapsed',
                    loaderVisibility: 'collapsed'
                },
            }
        },
        computed: {
            descriptionLimit () {
                return this.jobs.map(function(job) {
                    if (job.description.length >= 200) {
                        return job.description.substring(0, 200)+'...';
                    } else {
                        return job.description;
                    }

                });
            },
            salaireFormatter () {
                return this.jobs.map(function(job) {
                    return "Entre "+job.salaireMin+" - "+job.salaireMax+" €";
                });
            },
            fondSection () {
                return this.jobs.map(function(job) {
                    return "fond-img-"+job._id;
                });
            }
        },
        methods: {
            getJobs () {
                this.load.isBusy = true;
                this.load.loaderVisibility = 'visible';
                axios
                    .get('https://vast-taiga-97693.herokuapp.com/job')
                    .then((response) => {
                        this.jobs = response.data;
                        this.load.isBusy = false;
                        this.load.isVisible = 'visible';
                        this.load.loaderVisibility = 'collapsed';
                    })
                    .catch((e) => {
                        console.log(e);
                        this.load.isBusy = false;
                        this.load.loaderVisibility = 'collapsed';
                    })
            },
            onSearchSubmit(args) {
                let searchBar = args.object;
                console.log("You are searching for " + searchBar.text);
            },
        },
        mounted() {
            this.getJobs();
            setTimeout(() => {
                this.$refs.searchBar.nativeView.dismissSoftInput();
            }, 100)
        }
    }
</script>

<style lang="scss" scoped>
    .container-global {
        .header {
            background-color: #FF5C5C;

            .h1 {
                color: #ffffff;
                font-size: 24;
                text-align: center;
                margin: 10 0 10 0;
                font-weight: bold;
            }
        }

        .card {
            margin: 16;
            border-radius: 10px;

            .p {
                color: #ffffff;
            }

            .description {
                background-color: white;

                .p {
                    color: #222222;
                }
            }

            .fond-img {
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
                filter: brightness(20%);
                opacity: .9;
                height: 120;
                padding: 5;
                border-radius: 10px;
            }
            .fond-img-5cf90071480c4891719530cf { background-image: url('~/assets/images/job/fond-dev.jpg'); }
            .fond-img-5cf900f0480c4891719530d0 { background-image: url('~/assets/images/job/fond-boulanger.jpg'); }
            .fond-img-5cf920c8a0a8570004d4c2c9 { background-image: url('~/assets/images/job/fond-architecte.jpg'); }

            .poste {
                font-size: 20;
                font-weight: bold;
            }
        }
    }
</style>
