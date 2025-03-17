<template>
  <div class="q-pa-md">
    <q-spinner v-if="loading" color="primary" size="3em" />
    <div v-if="!loading">
      <h4>Micas</h4>
      <table>
      <thead>
        <tr>
          <th>Telefono</th>
          <th>Modelo</th>
          <th>Cantidad Actual</th>
          <th>Nueva Cantidad</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="mica in micas" :key="mica.id">
          <td>{{ mica.phoneType }}</td>
          <td>{{ mica.model }}</td>
          <td>{{ mica.quantity }}</td>
          <td>
            <q-input 
              v-model="mica.newQuantity" 
              type="number" 
              outlined 
            />
          </td>
        </tr>
      </tbody>
    </table>
    <q-btn 
      label="Guardar" 
      color="primary" 
      icon="save"
      @click="handleSave" 
      class="q-mt-md"
    />
    </div>
  </div>
</template>

<style scoped>
table {
  /*width: 100%;*/
  border-collapse: collapse;
}

thead {
  background-color: #a19e9e;
  border-bottom: 1px solid black;
}

th, td {
  border: 1px solid black;
  padding: 5px;
  text-align: left;
}
</style>

<script setup lang="ts">
import { api } from 'src/boot/axios';
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();


interface Mica {
  model: string;
  quantity: number;
  phoneTypeId: number;
  phoneType: string;
  id: number;
  newQuantity: number;
}


const loading = ref(false);
const micas = ref<Mica[]>([]);


const getAll = async () => {
  try {
    loading.value = true; //use spinner
    const resp = await api.get('micas');
    //console.log(resp)
    micas.value = resp.data;
    //console.log(micas.value);
  } catch (err: unknown) {
    console.log("can't load micas", err);
  } finally {
    loading.value = false;
  }
};

const handleSave = async() => {
    // Extract only "name" and "price"
  const updateStock = [];
  
  if(micas.value) {
    for (const mica of micas.value) {
      //console.log(item);
      if(mica.newQuantity >= 0){
        updateStock.push({id: mica.id, newQuantity: mica.newQuantity});
      }
    }
  }
  
  //console.log(updateStock, micas.value);
  if(updateStock.length === 0) {
    alert('Debe llenar al menos la infomracion de un micao para guardar');
    return;
  }
  const resp = await api.post('micas', updateStock );
  $q.notify({
        type: 'positive',
        message: resp.data,
        position: 'top',
        timeout: 2000, // 2.5 seconds
      });
  await getAll();
};


onMounted(async () => {
  await getAll();
});
</script>

