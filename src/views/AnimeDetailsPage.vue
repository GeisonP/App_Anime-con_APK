<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/home"></ion-back-button>
                </ion-buttons>
                <ion-title>{{ anime.title }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-loading :is-open="loading" message="Loading..." :duration="4000" spinner="circles"></ion-loading>
        <ion-content v-if="!loading">
            <ion-card class="small-card">
                <img :src="anime.images.jpg.large_image_url" :alt="anime.title" />
                <ion-card-header>
                    <ion-card-title>{{ anime.title }}</ion-card-title>
                    <ion-card-subtitle>{{ anime.synopsis }}</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    <ion-accordion-group>
                        <ion-accordion value="first" v-if="anime.type">
                            <ion-item slot="header" color="light">
                                <ion-label>Type</ion-label>
                            </ion-item>
                            <div class="ion-padding" slot="content">
                                <p> {{ anime.type }} </p>
                            </div>
                        </ion-accordion>
                        <ion-accordion value="second" v-if="anime.episodes">
                            <ion-item slot="header" color="light">
                                <ion-label>Episodes</ion-label>
                            </ion-item>
                            <div class="ion-padding" slot="content">
                                <p> {{ anime.episodes }}</p>
                            </div>
                        </ion-accordion>
                        <ion-accordion value="third" v-if="anime.status">
                            <ion-item slot="header" color="light">
                                <ion-label>Status</ion-label>
                            </ion-item>
                            <div class="ion-padding" slot="content">
                                <p> {{ anime.status }}</p>
                            </div>
                        </ion-accordion>
                        <ion-accordion value="four" v-if="anime.score">
                            <ion-item slot="header" color="light">
                                <ion-label>Score</ion-label>
                            </ion-item>
                            <div class="ion-padding" slot="content">
                                <p> {{ anime.score }}</p>
                            </div>
                        </ion-accordion>
                        <ion-accordion value="five" v-if="anime.aired.from">
                            <ion-item slot="header" color="light">
                                <ion-label>Start Date</ion-label>
                            </ion-item>
                            <div class="ion-padding" slot="content">
                                <p> {{ anime.aired.from }}</p>
                            </div>
                        </ion-accordion>
                        <ion-accordion value="six" v-if="anime.aired.to">
                            <ion-item slot="header" color="light">
                                <ion-label>End Date</ion-label>
                            </ion-item>
                            <div class="ion-padding" slot="content">
                                <p> {{ anime.aired.to }}</p>
                            </div>
                        </ion-accordion>
                    </ion-accordion-group>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { 
    IonPage,IonHeader, IonToolbar, IonTitle, IonContent, 
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, 
    IonCardContent, IonButtons, IonBackButton, IonLoading,
    IonAccordion, IonAccordionGroup, IonItem, IonLabel
    } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import AnimeService from '@/services/AnimeService';

export default defineComponent({
    name: 'AnimeDetailsPage',
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
        IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
        IonCardContent, IonButtons, IonBackButton, IonLoading,
        IonAccordion, IonAccordionGroup, IonItem, IonLabel
    },
    data() {
        return {
            anime: {},
            animeId: null,
            loading: true
        };
    },
    async created() {
        const route = useRoute();
        this.animeId = route.params.id;
        await this.loadAnimeDetails(this.animeId);
    },
    methods: {
        async loadAnimeDetails(animeId: number) {
            this.loading = true;
            try {
                const response = await AnimeService.getAnimeDetails(animeId);
                this.anime = response;
                this.loading = false;
            } catch (error) {
                console.error('Error fetching anime details:', error);
                this.loading = false;
            }
        }
    }
});
</script>

<style scoped>
ion-card.small-card {
    width: 80%;
    max-width: 400px;
    margin: 20px auto;
    text-align: center;
}

ion-card img {
    width: 100%;
    height: auto;
}

ion-title {
    margin-right: 70px;
    text-align: center;
}
</style>