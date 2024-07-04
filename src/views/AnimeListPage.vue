<template>
    <ion-page>
        <ion-content>
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-back-button default-href="/home"></ion-back-button>
                    </ion-buttons>
                    <ion-title>
                        {{ title }}
                    </ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-loading :is-open="loading" message="Loading..." :duration="1000" spinner="circles"></ion-loading>
            <div v-if="!loading">
                <ion-grid>
                    <ion-row>
                        <anime-card v-for="anime in animes" :key="anime.mal_id" :anime="anime" />
                    </ion-row>
                </ion-grid>
                <div class="pagination">
                    <ion-button @click="previousPage" :disabled="page === 1"> < </ion-button>
                    <div><span>Page {{ page }}</span></div>
                    <ion-button @click="nextPage"> > </ion-button>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonButtons, IonButton, IonBackButton, IonLoading } from '@ionic/vue';
import AnimeCard from '@/components/AnimeCard.vue';
import AnimeService from '@/services/AnimeService';
import { useRoute } from 'vue-router';

export default {
    name: 'AnimeListPage',
    components: {
        IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonButtons, IonButton, AnimeCard, IonBackButton, IonLoading
    },
    data() {
        return {
            title: 'ANIME lIST',
            animes: [],
            genreId: null,
            page: 1,
            loading: true
        };
    },
    async created() {
        const route = useRoute();
        this.genreId = route.params.genreId;
        await this.fetchAnimes();
    },
    methods: {
        async fetchAnimes() {
            this.loading = true;
            this.animes = await AnimeService.getAnimesByGenre(this.genreId, this.page);
            this.loading = false;
        },
        async nextPage() {
            this.page++;
            await this.fetchAnimes();
        },
        async previousPage() {
            if (this.page > 1) {
                this.page--;
                await this.fetchAnimes();
            }
        }
    }
};

</script>

<style scoped>
ion-title {
    margin-right: 70px;
    text-align: center;
}

ion-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    gap: 30px;
}
</style>