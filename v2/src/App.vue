<template>

    <div id="app" class="container" style="height:100%">
      <div class="row"  style="height:200px">

      </div>
      <div class="row"  style="height:100%">
        <div class="col-2">
          
        </div>
        <div class="col-8 well">
          <div class="card">
            <div class="card-body">
              <form class="row g-3">
                <div class="col-auto">
                  <label for="staticEmail2" class="visually-hidden">Email</label>
                  <input type="text" class="form-control" id="phone" value="" placeholder="phone number">
                </div>
                <div class="col-auto">
                  <button type="submit" class="btn btn-primary">Call</button>
                </div>
                <div class="col-auto">
                  <!-- Button trigger modal -->
                  <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Settings
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-2">
          
        </div>
      </div>


      <!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Settings</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save</button>
      </div>
    </div>
  </div>
</div>
    </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

