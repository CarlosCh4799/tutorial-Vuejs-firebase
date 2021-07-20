<template>
  <div class="container">
    <br /><br /><br /><br />
    <form @submit.prevent="onSubmit">

      <div class="field">
        <label class="label">Usuario</label>
        <div class="control">
          <input class="input" type="text" 
          v-model="form.usuario" placeholder="Ej. Alex Smith" />
        </div>
      </div>

      <div class="field">
        <label class="label">Departamento</label>
        <div class="control">
          <input
            class="input"
            type="text"
            v-model="form.departamento"
            placeholder="Ej. Gerencia"
          />
        </div>
      </div>
      <br />
      <button v-if="condicion.updt==1" type="submit" class="btncrear button is-link mr-4">Crear</button>
    </form>
    <button v-if="condicion.updt==2" @click="update" class="btnupdate button is-link mr-4">Actualizar</button>
    <button class="btnregre button is-danger" @click.prevent="Regresar">Regresar</button>
    <div class="contbl container">
      <table class="table table-hover table-secondary is-fullwidth">
        <thead class="has-background-link-dark">
          <tr>
            <th class="has-text-white-ter" scope="col">ID</th>
            <th class="has-text-white-ter" scope="col">Usuarios</th>
            <th class="has-text-white-ter" scope="col">Departamentos</th>
            <th class="has-text-white-ter" scope="col">Editar</th>
            <th class="has-text-white-ter" scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="{id,usuario,departamento} in users" :key="id">
            <th scope="row" class="text-secondary">{{id}}</th>
            <td>{{usuario}}</td>
            <td>{{departamento}}</td>
            <td><button class="button is-link is-rounded is-small is-light is-fullwidth"
            @click="loadData(id)">Editar</button></td>
            <td><button class="button is-danger is-rounded is-small 
            is-light is-fullwidth" @click="deleteUser(id)">Eliminar</button></td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import { createUser,useLoadUsers,deleteUser,getUser,updateUser } from "@/firebase";
import { reactive } from "vue";

export default {
  setup() {
    const condicion = reactive({
      updt: 1,
    });

    const form = reactive({ usuario: "", departamento: "" });

    let idBono = ""
    const loadData = async (bonoId) => {
      idBono = bonoId
      const bono = await getUser(bonoId)
      form.usuario = bono.usuario
      form.departamento = bono.departamento
      condicion.updt = 2
    }

    const update = async () => {
      await updateUser(idBono, {...form})
      form.usuario = "";
      form.departamento = "";
      condicion.updt = 1
    }

    const onSubmit = async () => {
      await createUser({ ...form });
      form.usuario = "";
      form.departamento = "";
    };

    const users = useLoadUsers()

    return { form, onSubmit, users, deleteUser, condicion, loadData, update };
  },

  methods: {
    Regresar() {
      this.$router.push({ name: "Bonos" });
    },
  },
};
</script>

<style scoped>
.contbl{
    padding: 4rem 10rem 0 4rem;
}
.btncrear{
  position: absolute;
  margin-left: 1rem;
}
.btnupdate{
  position: absolute;
}
.btnregre{
  margin-left: 7rem;
}
</style>