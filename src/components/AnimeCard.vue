<template>
    <ion-col size="12" size-md="6" size-lg="3">
        <ion-card :href="`/anime/details/${anime.mal_id}`">
            <img :src="anime.images.jpg.image_url" :alt="anime.title" />
            <ion-card-header>
                <ion-card-title>{{ anime.title }}</ion-card-title>
            </ion-card-header>
        </ion-card>
    </ion-col>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AnimeCard',
    props: {
        anime: {}
        }
    });
</script>

<style scoped>
ion-card {
    text-align: center;
}

ion-card img {
    width: 100%;
    height: auto;
}
</style>