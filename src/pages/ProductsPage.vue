<template>
  <div class="q-pa-md">
    <q-spinner v-if="loading" color="primary" size="3em" />
    <div v-if="!loading">
      <h4>Productos</h4>
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
            <q-input 
              v-model="product.newQuantity" 
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


interface Product {
  name: string;
  quantity: number;
  categoryId: number;
  category: string;
  id: number;
  newQuantity: number;
}

interface UpdateStockItemDto {
  id: number;
  newQuantity: number;
}

const loading = ref(false);
const products = ref<Product[]>([]);
const numberValue = ref(null);


const getAll = async () => {
  try {
    loading.value = true; //use spinner
    const resp = await api.get('products');
    //console.log(resp)
    products.value = { ...resp.data };
    console.log(products.value);
  } catch (err: unknown) {
    console.log("can't load products", err);
  } finally {
    loading.value = false;
  }
};

const handleSave = () => {
    // Extract only "name" and "price"
  const updateStock = [];
  
  // if(products.value) {
  //   for (const product of products.value) {
  //     //console.log(item);
  //     if(product.newQuantity >= 0){
  //       updateStock.push({id: product.id, newQuantity: product.newQuantity});
  //     }
  //   }
  // }
  const ids = products.value.map(p => p.id);
  console.log(ids,updateStock, products.value);
  if(updateStock.length === 0) {
    alert('Debe llenar al menos la infomracion de un producto para guardar');
    return;
  }
 
};


onMounted(async () => {
  await getAll();
});
</script>
