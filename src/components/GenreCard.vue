<template>
    <ion-col size="6" size-md="4" size-lg="3">
        <ion-card :href="`/list/genre/${genre.mal_id}`">
            <ion-card-header>
                <ion-card-title>
                    {{ genre.name }}
                </ion-card-title>
            </ion-card-header>
        </ion-card>
    </ion-col>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'GenreCard',
    props: {
        genre: {}
    }
});
</script>

<style scoped>
ion-card {
    text-align: center;
}
</style>