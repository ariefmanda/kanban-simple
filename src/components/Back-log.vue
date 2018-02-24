<template>
  <div class="card border-danger mb-3" style="max-width: 30rem;">
  <div class="card-header" style="background-color:#f30;color:white">{{name}}</div>
  <div class="card-body">
    <div class="card border-light mb-3" style="max-width: 20rem;" v-for="(index,i) in backlog" :key="index.title">
        <div class="card-header">{{index.title}}</div>
        <div class="card-body">
        Point : {{index.point}}<br>
        Assign-to : {{index.assignTo}}<br>
        <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#modal'+i">
            See more
        </button>
        <div class="modal" :id="'modal'+i">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Detail Task, {{index.title}} for {{index.assignTo}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Task Description : {{index.description}}<br>
                    Point : {{index.point}}<br>
                    Status : {{name}}
                </div>
                <div class="modal-footer" v-if="token">
                    <button class="btn btn-secondary" v-on:click="destroy(i)">Delete</button>
                    <button class="btn btn-primary" v-on:click="next(i,index)">To Todo</button>
                </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import {kanban} from '../firebase'
export default {
  data () {
    return {
      name: 'Back-log'
    }
  },
  props: ['backlog'],
  computed: {
    token: function () {
      let self = this
      return self.$store.state.token
    }
  },
  methods: {
    destroy (index) {
      kanban.child('backlog').child(index).set(null)
      document.getElementById(`modal${index}`).modal('hide')
    },
    next (index, data) {
      kanban.child('backlog').child(index).set(null)
      kanban.child('todo').push(data)
      document.getElementById(`modal${index}`).modal('hide')
    }
  }
}
</script>

<style>

</style>
