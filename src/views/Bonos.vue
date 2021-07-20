<template>
  <div class="content">
    <div class="btnemp">
      <button
        class="button is-link is-outlined is-rounded"
        @click="viewEmpleados">
        Empleados
      </button>
      <button
        class="btnfiltro button is-link is-outlined is-rounded" @click="viewFiltro"
        >
        Filtrar Bonos
      </button>
    </div>
    <h4 class="conh4 container title is-4 has-text-grey">Bonos Entregados</h4>
    <div class="contbl container">
      <table class="table table-hover table-secondary is-fullwidth">
        <thead class="has-background-info">
          <tr>
            <th class="has-text-white-ter" scope="col">ID</th>
            <th class="has-text-white-ter" scope="col">Usuario</th>
            <th class="has-text-white-ter" scope="col">Departamento</th>
            <th class="has-text-white-ter" scope="col">Fecha</th>
            <th class="has-text-white-ter" scope="col">Bono</th>
            <th class="has-text-white-ter" scope="col">Motivo</th>
            <th class="has-text-white-ter" scope="col">Editar</th>
            <th class="has-text-white-ter" scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in bonos" :key='item.id'>
            <th scope="row" class="text-secondary">{{item.id}}</th>
            <td>{{item.usuario}}</td>
            <td>{{item.departamento}}</td>
            <td>{{item.fecha}}</td>
            <td>{{item.bono}}</td>
            <td>{{item.motivo}}</td>
            <td><button class="button is-link is-rounded is-small is-light 
            is-fullwidth" @click="loadData(item.id)">Editar</button></td>
            <td><button class="button is-danger is-rounded is-small 
            is-light is-fullwidth" @click="deleteBono(item.id)">Eliminar</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <br /><br /><br />
    <form @submit.prevent="onSubmit">
      <div class="conform container">
        <div class="field">
          <label class="label">Usuario</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select
                id="inputEncargado"
                class="control"
                v-model="form.usuario"
                @change="inptDept(form.usuario)"
              >
                <option selected>Choose...</option>
                <option v-for="{ id, usuario } in users" :key="id">
                  {{ usuario }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Departamento</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select
                id="inputDpt"
                class="control"
                v-model="form.departamento"
              >
                <option selected>Choose...</option>
                <option v-for="{ id, departamento } in users" :key="id">
                  {{ departamento }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Fecha</label>
          <div class="control">
            <input class="input" type="date" v-model="form.fecha" />
          </div>
        </div>
        <div class="field">
          <label class="label">Bonos</label>
          <div class="control">
            <input
              class="input"
              type="number"
              v-model="form.bono"
              placeholder="Ej. 200"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Motivo</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="form.motivo"
              placeholder="Ej. excelencia"
            />
          </div>
        </div>
        <br />
        <button v-if="condicion.updt==1" type="submit" class="button is-link mr-4">Crear</button>
      </div>
    </form>
    <div class="btnupdate container">
      <button v-if="condicion.updt==2" @click="update" class="button is-link mr-4">Actualizar</button>
    </div>
  </div>
</template>

<script>
import { createBono, useLoadUsers, deleteBono, useLoadBonos, getBono, updateBono } from "@/firebase";
import { reactive } from "vue";

export default {
  setup() {
    const condicion = reactive({
      updt: 1,
    });

    const form = reactive({
      usuario: "",
      departamento: "",
      fecha: "",
      bono: "",
      motivo: "",
    });

    const onSubmit = async () => {
      await createBono({ ...form });
      form.usuario = "";
      form.departamento = "";
      form.fecha = "";
      form.bono = "";
      form.motivo = "";
    };

    let idBono = ""
    const loadData = async (bonoId) => {
      idBono = bonoId
      const bono = await getBono(bonoId)
      form.usuario = bono.usuario
      form.departamento = bono.departamento
      form.fecha = bono.fecha
      form.bono = bono.bono
      form.motivo = bono.motivo
      condicion.updt = 2
      console.log(condicion.updt)
    }

    const update = async () => {
      await updateBono(idBono, {...form})
      form.usuario = "";
      form.departamento = "";
      form.fecha = "";
      form.bono = "";
      form.motivo = "";
      condicion.updt = 1
    }

    const users = useLoadUsers();
    const bonos = useLoadBonos();

    return { form, condicion, onSubmit, users, bonos, deleteBono, loadData, update };
  },
  methods: {
    viewEmpleados() {
      this.$router.push({ name: "Empleados" });
    },
    viewFiltro() {
      this.$router.push({ name: "FiltroBonos" });
    },
    inptDept(nombre){
        this.users.forEach(x => {
            if(x.usuario==nombre){
                this.form.departamento = x.departamento
            }
        });
    },
  },
};
</script>

<style scoped>
.conbtn {
  padding: 3rem 0 0 16rem;
}
.btnemp {
  position: absolute;
  padding: 9rem 0 0 69%;
}
.conh4 {
  padding: 7rem 0 0 8rem;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 2rem;
}
.contbl {
  padding: 4rem 1rem 0 4rem;
}
.conform{
    width: 66rem;
    padding-top: 4rem;
    padding-left: 3rem;
}
.btnfiltro{
  margin-left: 1.4rem;
}
.btnupdate{
  padding-left: 12rem;
}
.content{
  padding-bottom: 7rem;
}
</style>

