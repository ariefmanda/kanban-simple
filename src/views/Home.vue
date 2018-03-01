<template>
<div>
  <div class="row" id="task">
  <div class="col-md-3" v-for="(broad,i) of kanban" :key="i">
    <Broad :data="broad" :indexData="i"></Broad>
  </div>
</div>
<div class="row">
  <iframe width="50%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/6121905&amp;color=%23ff5500&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true&amp;visual=true">
  </iframe>
</div>
</div>
</template>

<script>
import Broad from '@/components/Broad.vue'
import { kanban } from '../firebase'
export default {
  name: 'home',
  data () {
    return {
      kanban: {
        backlog: [],
        todo: [],
        doing: [],
        done: []
      }
    }
  },
  components: {
    Broad
  },
  computed: {},
  created () {
    this.getKanban()
  },
  methods: {
    getKanban () {
      kanban.on('value', snapshot => {
        this.kanban.backlog = snapshot.val().backlog
          ? snapshot.val().backlog
          : {}
        this.kanban.todo = snapshot.val().todo ? snapshot.val().todo : {}
        this.kanban.doing = snapshot.val().doing ? snapshot.val().doing : {}
        this.kanban.done = snapshot.val().done ? snapshot.val().done : {}
      })
    }
  }
}
</script>

<style>
#task {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
}
</style>
