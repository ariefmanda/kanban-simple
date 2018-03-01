<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary" style="margin-bottom:10px">
  <a class="navbar-brand" href=""><b>KANBAN SIMPLE</b></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor01">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" data-toggle="modal" data-target="#create" v-if="token">Create</a>
      </li>
    </ul>
    <button class="btn btn-primary my-2 my-sm-0" @click="login" type="submit" v-if="!token">Login</button>
    <button class="btn btn-primary my-2 my-sm-0" @click="logout" type="submit" v-else>Logout</button>
  </div>
  <div class="modal" id="create">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-body">
            <form @submit.prevent="created">
              <fieldset>
                <div class="form-group">
                <label for="tiles">Title</label>
                <input type="text" class="form-control" v-model="create.title" placeholder="Enter title">
                </div>
                <div class="form-group">
                <label for="exampleInputPassword1">Description</label>
                <textarea class="form-control" v-model="create.description" placeholder="Description" rows="3"></textarea>
                </div>
                <div class="form-group">
                <label for="tile">Point</label>
                <input type="number" class="form-control" v-model="create.point">
                </div>
                <div class="form-group">
                <label for="tile">Assigned To</label>
                <input type="text" class="form-control" v-model="create.assignTo" placeholder="Assigned To">
                </div>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Submit</button>
              </fieldset>
            </form>
        </div>
      </div>
    </div>
  </div>
  <notifications/>
</nav>
</template>

<script>
import {kanban} from '../firebase'
window.fbAsyncInit = function () {
  FB.init({
    appId: '1239370809540745', // localhost : 1239370809540745 225274774708793
    cookie: true, // enable cookies to allow the server to access
    // the session
    xfbml: true, // parse social plugins on this page
    version: 'v2.8' // use graph api version 2.8
  })
  FB.getLoginStatus(function (response) {
    console.log(response)
  })
};
// Load the SDK asynchronously
(function (d, s, id) {
  let js = null
  let fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) return
  js = d.createElement(s)
  js.id = id
  js.src = 'https://connect.facebook.net/en_US/sdk.js'
  fjs.parentNode.insertBefore(js, fjs)
})(document, 'script', 'facebook-jssdk')

export default {
  data () {
    return {
      create: {
        title: '',
        description: '',
        point: 0,
        assignTo: ''
      }
    }
  },
  computed: {
    token: function () {
      let self = this
      return self.$store.state.token
    }
  },
  methods: {
    created () {
      kanban.child('backlog').push(this.create)
      this.create.title = ''
      this.create.description = ''
      this.create.point = 0
      this.create.assignTo = ''
      $('#create').modal('hide')
      this.$notify({
        type: 'success',
        text: 'task sudah ditambah'
      })
    },
    login () {
      let self = this
      FB.login(
        function (response) {
          if (response.authResponse) {
            sessionStorage.setItem('token',
              response.authResponse.accessToken)
            self.$store.dispatch('setToken', sessionStorage.getItem('token'))
          } else {
            console.log(response, 'belum connect')
          }
        },
        { scope: 'public_profile,email' }
      )
    },
    logout () {
      let self = this
      FB.logout(
        function (response) {
          sessionStorage.clear()
          self.$store.dispatch('setToken', null)
        }
      )
    }
  }
}
</script>

<style>

</style>
