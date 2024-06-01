import { ref, defineComponent } from "vue";
import enviarEmail from "../services/sendEmail.js";
export default defineComponent({
  props: {
    viewToMe: {
      type: Boolean,
      required: true,
      default: "",
    },
  },
  setup(props) {
    const item = ref("");
    const model = ref("");
   
    const name = ref("");
    const email = ref("");
    const cep = ref("");
    const wpp = ref("");
    const obs = ref("")

    const itemError = ref(false);
    const modelError = ref(false);
    const nameError = ref(false);
    const emailError = ref(false);
    const cepError = ref(false);
    const wppError = ref(false);

    async function onSubmit() {
        console.log(name.value)
        validate();
        const response = await enviarEmail({
          item: item.value,
          model: model.value,
          name: name.value,
          email: email.value,
          cep: cep.value,
          wpp: wpp.value,
          obs: obs.value,
        });
        if (response) {
          document.getElementById("tooltip-sucess-periferico").classList.add("show");
        } else {
          document.getElementById("tooltip-error-periferico").classList.add("show");
        }
    }

    function validate() {
        item.value.length === 0 || item.value === 'Qual item você deseja comprar'? (itemError.value = true) : (itemError.value = false);
        model.value.length === 0 ? (modelError.value = true) : (modelError.value = false);
        name.value.length === 0 ? (nameError.value = true) : (nameError.value = false);
        email.value.length === 0 ? (emailError.value = true) : (emailError.value = false);
        cep.value.length === 0 ? (cepError.value = true) : (cepError.value = false);
        wpp.value.length === 0 ? (wppError.value = true) : (wppError.value = false);
      }

    return {obs, item, itemError, model, modelError, name, nameError, email, emailError, cep, cepError, wpp, wppError, onSubmit};
  },
  template:
  /*html*/ `
  <div id="tooltip-error-periferico" class="toast align-items-center text-bg-danger border-0 tooltip" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">
        Erro no servidor, não conseguimos enviar nosso orçamento. Tente novamente mais tarde!
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
  <div id="tooltip-sucess-periferico" class="toast align-items-center text-bg-primary border-0 tooltip " role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">
        Orçamento enviado, logo entraremos em contato com você!
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>  
    <div :class="{collapse: !viewToMe}">
      <form @submit.prevent="onSubmit" novalidate>
        <div class="row"> 
          <div class="col-6">
          <select v-model="item" :class="['form-select', itemError? 'is-invalid':'']" aria-label="Default base sales">
            <option selected disabled value="">Qual item você deseja comprar</option>
            <option value="1">Fone de ouvido</option>
            <option value="2">Mouse</option>
            <option value="3">Teclado</option>
            <option value="4">Auditoria e cursos</option>
            <option value="5">Monitores</option>
            <option value="6">Impressoras</option>
            <option value="7">Outros</option>
          </select>
          <span class="form-text">*obrigatório</span>
          </div>
          <div class="col-6">
            <div class="mb-3">
              <input v-model="model" type="text" :class="['form-control', modelError? 'is-invalid':'']" id="inputModeloDeCompras" placeholder="Qual o modelo?">
              <span class="form-text">*obrigatório</span>
            </div>
          </div>
        </div>
        <div class="row"> 
          <div class="col-6">
            <div class="mb-3">
              <label for="inputNamePeriferico" class="form-label">Nome</label>
              <input v-model="name" type="text":class="['form-control', nameError? 'is-invalid':'']"id="inputNamePeriferico" placeholder="Nome Completo">
              <span class="form-text">*obrigatório</span>
            </div>
          </div>
            <div class="col-6">
              <div class="mb-3">
                <label for="inputEmailPerifericos" class="form-label">Email</label>
                <input v-model="email" type="email" :class="['form-control', emailError? 'is-invalid':'']" id="inputEmailPerifericos" placeholder="name@exemplo.com">
                <span class="form-text">*obrigatório</span>
              </div>
            </div>
        </div>
        <div class="row"> 
          <div class="col-6">
            <div class="mb-3">
              <label for="inputCepPerifericos" class="form-label">CEP</label>
              <input v-model="cep" type="text" :class="['form-control', cepError? 'is-invalid':'']" id="inputCepPerifericos" placeholder="12345-567">
              <span class="form-text">*obrigatório</span>
            </div>
          </div>
            <div class="col-6">
              <div class="mb-3">
                <label for="inputEmailDesktop" class="form-label">Telefone/Whatsapp</label>
                <input v-model="wpp" type="tel" :class="['form-control', wppError? 'is-invalid':'']" id="inputEmailDesktop" placeholder="(xx)xxxx-xxxx">
                <span class="form-text">*obrigatório</span>
              </div>
            </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-floating">
              <textarea v-model="obs" class="form-control" placeholder="Observações" id="TextAreaObs" style="height: 100px"></textarea>
              <label for="TextAreaObs">Observações</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 text-center">
            <button class="btn btn-primary btn-lg rounded-5" @click="onSubmit"> Enviar </button>
          </div>
        </div>
      </form>
    </div>
  `,
});