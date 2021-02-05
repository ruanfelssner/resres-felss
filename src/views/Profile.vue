<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-4">
                    <form class="form-signin">
                    <img src="avatar" alt="">
                      <label for="inputEmail" class="sr-only">E-mail</label>
                      <input type="email" id="inputEmail" class="form-control" v-model="email" placeholder="E-mail" required autofocus>
                      <label for="first_name" class="sr-only">First Name</label>
                      <input type="text" id="first_name" class="form-control" v-model="first_name" placeholder="First name" required>
                      <label for="last_name" class="sr-only">Last Name</label>
                      <input type="text" id="last_name" class="form-control" v-model="last_name" placeholder="Last name" required>
                      <button class="btn btn-lg btn-primary btn-block" @click="salvar">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
