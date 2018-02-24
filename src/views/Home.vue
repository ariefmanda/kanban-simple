<template>
<div>
  <div class="row" id="task">
    <div class="col-md-3">
      <Backlog :backlog="kanban.backlog"/>
    </div>
  <div class="col-md-3">
    <Todo :todo="kanban.todo"/>
  </div>
  <div class="col-md-3">
    <Doing :doing="kanban.doing"/>
  </div>
  <div class="col-md-3">
    <Done :done="kanban.done"/>
  </div>
</div>
<div class="row">
  <iframe width="50%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/6121905&amp;color=%23ff5500&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true&amp;visual=true"></iframe>
</div>
</div>
</template>

<script>
// @ is an alias to /src
import Backlog from '@/components/Back-log.vue'
import Todo from '@/components/Todo.vue'
import Doing from '@/components/Doing.vue'
import Done from '@/components/Done.vue'
import {kanban} from '../firebase'
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
    Backlog,
    Todo,
    Doing,
    Done
  },
  computed: {

  },
  created () {
    this.getKanban()
  },
  methods: {
    getKanban () {
      kanban.child('backlog').on('value', snapshot => {
        this.kanban.backlog = snapshot.val()
      })
      kanban.child('todo').on('value', snapshot => {
        this.kanban.todo = snapshot.val()
      })
      kanban.child('doing').on('value', snapshot => {
        this.kanban.doing = snapshot.val()
      })
      kanban.child('done').on('value', snapshot => {
        this.kanban.done = snapshot.val()
      })
    }
  }
}
</script>

<style>
#task {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
}
</style>
