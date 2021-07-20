<template>
  <div class="content container">
    <br />
    <h1>Total Bonos</h1>
    <div class="frm">
    <div class="field">
      <label class="label">Desde:</label>
      <div class="control">
        <input class="input" type="date" v-model="filtro.fechad" />
      </div>
    </div>

    <div class="field">
      <label class="label">Hasta:</label>
      <div class="control">
        <input class="input" type="date" v-model="filtro.fechah" />
      </div>
    </div>
    </div>
    <button
      class="button is-link is-rounded is-normal"
      @click.prevent="filtrar"
    >
      Filtrar
    </button>
    <button
      class="btnr button is-danger is-rounded is-normal"
      @click.prevent="regresar"
    >
      Regresar
    </button>
    <br /><br />
    <div class="tbl container">
      <table class="table table-hover table-secondary">
        <thead class="has-background-link-dark">
          <tr>
            <th class="has-text-white-ter" scope="col">
              Total Bonos Entregados
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{{filtro.totalbono}}</th>
          </tr>
          <!--tr v-for="item in fjobs" v-bind:key="item.id">
            <th scope="row" class="text-secondary">{{ item.id }}</th>
            
          </tr-->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useLoadBonos } from "@/firebase";
import { reactive } from "vue";
import moment from "moment";

export default {
  setup() {
    const filtro = reactive({
      fechad: "",
      fechah: "",
      totalbono: 0,
    });

    const bonos = useLoadBonos();

    const filtrar = () => {
      console.log(bonos);
      bonos.value.forEach((x) => {
        if (
          moment(filtro.fechad).isSameOrBefore(x.fecha) &&
          moment(filtro.fechah).isSameOrAfter(x.fecha, "day")
        ) {
          console.log(x.bono);
          filtro.totalbono += parseInt(x.bono);
        }
      });
    };

    return { filtro, filtrar };
  },
  methods:{
      regresar(){
          this.$router.push({ name: "Bonos" });
      }
  }
};
</script>

<style scoped>
.content{
    padding: 2rem 5rem 0rem 3rem;
}
.frm{
    padding-top: 2rem;
    padding-bottom: 2rem;
}
.btnr{
    margin-left: 1rem;
}
.tbl{
    padding-top: 5rem;
    padding-bottom: 8rem;
    padding-right: 28rem;
    padding-left: 8rem;
}
</style>