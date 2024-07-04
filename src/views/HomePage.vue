<template>
  <ion-page>
    <ion-content>
      <ion-header>
        <ion-toolbar>
          <ion-title>{{ title }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-loading :is-open="loading" message="Loading..." :duration="1000" spinner="circles"></ion-loading>
      <ion-grid v-if="!loading">
        <ion-row>
          <genre-card v-for="genre in genres" :key="genre.mal_id" :genre="genre"/>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonTitle, IonHeader, IonToolbar, IonLoading, IonGrid, IonRow } from '@ionic/vue';
import GenreCard from '@/components/GenreCard.vue';
import AnimeService from '@/services/AnimeService';

export default {
  name: 'HomePage',
  components: {
    IonContent, IonPage, IonTitle, IonHeader, IonToolbar, IonLoading, IonGrid, IonRow, GenreCard
  },
  data() {
    return {
      title: 'GENRE lIST',
      genres: [],
      loading: true
    };
  },
  async created() {
    await this.loadGenres();
  },
  methods: {
    async loadGenres() {
      this.loading = true;
      this.genres = await AnimeService.getGenres();
      this.loading = false;
    }
  }
};
</script>

<style scoped>
ion-title {
  text-align: center;
}

ion-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
