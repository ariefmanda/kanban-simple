<template>
  <div class="card mb-3" :id="'border'+indexData" style="max-width: 30rem;">
  <div class="card-header" :id="indexData">{{indexData}}</div>
  <div class="card-body">
    <div class="card border-light mb-3" style="max-width: 20rem;" v-for="(index,i) in data" :key="index.title">
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
                    Status : {{indexData}}
                </div>
                <div class="modal-footer" v-if="token">
                    <button type="button" class="btn btn-primary" v-on:click="back(i,index)" v-if="indexBack">Back to {{indexBack}}</button>
                    <button type="button" class="btn btn-secondary" v-on:click="destroy(i)" >Delete</button>
                    <button type="button" class="btn btn-primary" v-on:click="next(i,index)" v-if="indexNext">To {{indexNext}}</button>
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
  props: ['data', 'indexData'],
  computed: {
    token: function () {
      let self = this
      return self.$store.state.token
    },
    indexBack: function () {
      let name = null
      if (this.indexData === 'todo') {
        name = 'backlog'
      } else if (this.indexData === 'doing') {
        name = 'todo'
      } else if (this.indexData === 'done') {
        name = 'doing'
      }
      return name
    },
    indexNext: function () {
      let name = null
      if (this.indexData === 'backlog') {
        name = 'todo'
      } else if (this.indexData === 'todo') {
        name = 'doing'
      } else if (this.indexData === 'doing') {
        name = 'done'
      }
      return name
    }
  },
  methods: {
    destroy (index) {
      kanban.child(this.indexData).child(index).set(null)
      $(`#modal${index}`).modal('hide')
    },
    next (index, data) {
      kanban.child(this.indexData).child(index).set(null)
      kanban.child(this.indexNext).push(data)
      $(`#modal${index}`).modal('hide')
    },
    back (index, data) {
      kanban.child(this.indexData).child(index).set(null)
      kanban.child(this.indexBack).push(data)
      $(`#modal${index}`).modal('hide')
    }
  }
}
</script>

<style>
#borderbacklog{
    border-color:#f30;
}
#backlog{
    background-color:#f30;
    color:white
}
#bordertodo{
    border-color:#f90;
}
#todo{
    background-color:#f90;
    color:white
}
#borderdoing{
    border-color:#008cba;
}
#doing{
    background-color:#008cba;
    color:white;
}
#borderdone{
    border-color:#0c6;
}
#done{
    background-color:#0c6;
    color:white
}

</style>
