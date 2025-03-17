<template>
  <div class="q-pa-md">
    <q-spinner v-if="loading" color="primary" size="3em" />
    <div v-if="!loading">
      <p>Covers</p>
      <table>
      <thead>
        <tr>
          <th>Telefono</th>
          <th>Modelo</th>
          <!-- 3 columns-->
          <th>Tipo Cover</th>
          <th>Cantidad</th>
          <th>Nueva Cantidad</th>
        </tr>
      </thead>
      <tbody>
        <tr :style="{ backgroundColor: getRandomHexColor(index) }" v-for="(coverStock,index) in coverStocks" :key="coverStock.id">
          <td>{{ coverStock.phoneType }}</td>
          <td>{{ coverStock.model }}</td>
          <td>{{ coverStock.coverType }}</td>
          <td>{{ coverStock.quantity }}</td>
          <td>
            <input 
              v-model="coverStock.newQuantity" 
              type="number" 
            />
          </td>
          <v-if></v-if>
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
  padding: 1px 5px 1px 5px ;
  text-align: left;
}
</style>

<script setup lang="ts">
import { api } from 'src/boot/axios';
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();


interface CoverStock {
  model: string;
  phoneTypeId: number;
  phoneType: string;
  id: number;
  quantity: number;
  newQuantity: number;
  coverType: string;
}


const loading = ref(false);
const coverStocks = ref<CoverStock[]>([]);
//const string

const getAll = async () => {
  try {
    loading.value = true; //use spinner
    const resp = await api.get('CoverStocks');
    //console.log(resp)
    coverStocks.value = resp.data;
    //console.log(covers.value);
  } catch (err: unknown) {
    console.log("can't load CoverStocks", err);
  } finally {
    loading.value = false;
  }
};

const handleSave = async() => {
    // Extract only "name" and "price"
  const updateStock = [];
  
  if(coverStocks.value) {
    for (const coverStock of coverStocks.value) {
      //console.log(item);
      if(coverStock.newQuantity >= 0){
        updateStock.push({id: coverStock.id, newQuantity: coverStock.newQuantity});
      }
    }
  }
  
  //console.log(updateStock, covers.value);
  if(updateStock.length === 0) {
    alert('Debe llenar al menos la infomracion de un coverstock para guardar');
    return;
  }
  const resp = await api.post('CoverStocks', updateStock );
  $q.notify({
        type: 'positive',
        message: resp.data,
        position: 'top',
        timeout: 2000, // 2.5 seconds
      });
  await getAll();
};

const c1 = '#84baed';
const c2 = '#b4bcb1';
let currColor = c1;
function getRandomHexColor(index: number) : string{
  
  if(index %3 ===0 ) {
    
    if(currColor === c1) {
      currColor = c2;
    } else {
      currColor = c1;
    }
  }
  return currColor;
}


onMounted(async () => {
  await getAll();
});
</script>

