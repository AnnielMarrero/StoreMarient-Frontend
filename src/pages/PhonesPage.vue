<template>
  <div class="q-pa-md">
    <q-spinner v-if="loading" color="primary" size="3em" />
    <div v-if="!loading">
      <h4>Celulares</h4>
      <table>
      <thead>
        <tr>
          <th>Pieza</th>
          <th>Modelo</th>
          <th>Cantidad</th>
          <th>Nueva Cantidad</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="phone in phones" :key="phone.id">
          <td>{{ phone.piece }}</td>
          <td>{{ phone.model }}</td>
          <td>{{ phone.quantity }}</td>
          <td>
            <q-input 
              v-model="phone.newQuantity" 
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


interface Phone {
  model: string;
  quantity: number;
  pieceId: number;
  piece: string;
  id: number;
  newQuantity: number;
}


const loading = ref(false);
const phones = ref<Phone[]>([]);


const getAll = async () => {
  try {
    loading.value = true; //use spinner
    const resp = await api.get('phones');
    //console.log(resp)
    phones.value = resp.data;
    //console.log(phones.value);
  } catch (err: unknown) {
    console.log("can't load phones", err);
  } finally {
    loading.value = false;
  }
};

const handleSave = async() => {
    // Extract only "name" and "price"
  const updateStock = [];
  
  if(phones.value) {
    for (const phone of phones.value) {
      //console.log(item);
      if(phone.newQuantity >= 0){
        updateStock.push({id: phone.id, newQuantity: phone.newQuantity});
      }
    }
  }
  
  //console.log(updateStock, phones.value);
  if(updateStock.length === 0) {
    alert('Debe llenar al menos la infomracion de un celular para guardar');
    return;
  }
  const resp = await api.post('phones', updateStock );
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

