<template>
  <q-page class="row items-center justify-evenly">
    <div class="row">
      <q-btn 
      label="Repporte" 
      color="positive" 
      icon="report"
      @click="hanldeReport" 
      class="q-mt-md"
    />

    </div>
  </q-page>
</template>

<script setup lang="ts">
/*
import { useQuasar } from 'quasar';

import { ref } from 'vue';
*/
import { api, baseURL } from 'src/boot/axios';

const getCurrentDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = now.getFullYear();
    return `${day}${month}${year}`;
};

const hanldeReport = async() => {
  try {
    const response = await fetch(`${baseURL}/pdf/generate`, { method: "GET"});
    
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    //console.log(response);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `reporte_${getCurrentDate()}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);

    //console.log(`Downloaded ${'xx'} successfully!`);
    
  } catch (error) {
    console.error('Error downloading PDF:', error);
  }
}

</script>
