<template>
  <div class="q-pa-md">
    <q-spinner v-if="loading" color="primary" size="3em" />
    <div v-if="!loading">
      <p>Productos</p>
      <table>
      <thead>
        <tr>
          <th>Categoria</th>
          <th>Nombre</th>
          <th>Cantidad Actual</th>
          <th>Nueva Cantidad</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.category }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.quantity }}</td>
          <td>
            <input 
              v-model="product.newQuantity" 
              type="number" 
             
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
  padding: 1px 5px 1px 5px ;
  text-align: left;
}
</style>

<script setup lang="ts">
import { api } from 'src/boot/axios';
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();


interface Product {
  name: string;
  quantity: number;
  categoryId: number;
  category: string;
  id: number;
  newQuantity: number;
}


const loading = ref(false);
const products = ref<Product[]>([]);


const getAll = async () => {
  try {
    loading.value = true; //use spinner
    const resp = await api.get('products');
    //console.log(resp)
    products.value = resp.data;
    //console.log(products.value);
  } catch (err: unknown) {
    console.log("can't load products", err);
  } finally {
    loading.value = false;
  }
};

const handleSave = async() => {
    // Extract only "name" and "price"
  const updateStock = [];
  
  if(products.value) {
    for (const product of products.value) {
      //console.log(item);
      if(product.newQuantity >= 0){
        updateStock.push({id: product.id, newQuantity: product.newQuantity});
      }
    }
  }
  
  //console.log(updateStock, products.value);
  if(updateStock.length === 0) {
    alert('Debe llenar al menos la infomracion de un producto para guardar');
    return;
  }
  const resp = await api.post('products', updateStock );
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

