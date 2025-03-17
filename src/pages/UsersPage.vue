<template>
  <div class="q-pa-md">
    <q-table
      title="Usuarios"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :rows-per-page-options="[0]"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { api } from 'src/boot/axios';
import { onMounted, ref } from 'vue';

const columns = [
  {
    name: 'id',
    required: true,
    label: 'Id',
    align: 'left',
    field: 'id',
    //format: val => `${val}`,
    sortable: true,
  },
  { name: 'userName', align: 'center', label: 'Usuario', field: 'userName' },
  {
    name: 'passwords',
    label: 'Passwords',
    field: 'passwords',
    align: 'center',
    format: (val) => `${val.join(' | ')}`,
  },
  { name: 'addedDate', label: 'Fecha de adición', field: 'addedDate' },
];

interface UserDto {
  id: number;
  userName: string;
  passwords: Array<string>;
  addedDate: string;
}
const loading = ref(false);
const rows = ref<UserDto[]>();

const getAllUsers = async () => {
  try {
    loading.value = true;
    const resp = await api.get('User');
    rows.value = resp.data;
  } catch (err: unknown) {
    console.log("can't load users", err);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await getAllUsers();
});
</script>
