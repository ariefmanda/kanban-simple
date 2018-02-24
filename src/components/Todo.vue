<template>
  <div class="card border-warning mb-3" style="max-width: 30rem;">
  <div class="card-header" style="background-color:#f90;color:white">{{name}}</div>
  <div class="card-body">
    <div class="card border-light mb-3" style="max-width: 20rem;" v-for="(index,i) in todo" :key="index.title">
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
                    <button type="button" class="btn btn-primary" v-on:click="back(i,index)" >Back to Back-Log</button>
                    <button type="button" class="btn btn-secondary" v-on:click="destroy(i)" >Delete</button>
                    <button type="button" class="btn btn-primary" v-on:click="next(i,index)">To Doing</button>
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
      name: 'Todo'
    }
  },
  props: ['todo'],
  computed: {
    token: function () {
      let self = this
      return self.$store.state.token
    }
  },
  methods: {
    destroy (index) {
      kanban.child('todo').child(index).set(null)
      document.getElementById(`modal${index}`).modal('hide')
    },
    next (index, data) {
      kanban.child('todo').child(index).set(null)
      kanban.child('doing').push(data)
      document.getElementById(`modal${index}`).modal('hide')
    },
    back (index, data) {
      kanban.child('todo').child(index).set(null)
      kanban.child('backlog').push(data)
      document.getElementById(`modal${index}`).modal('hide')
    }
  }
}
</script>

<style>

</style>
