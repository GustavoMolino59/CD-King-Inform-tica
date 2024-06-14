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
    const obs = ref("");

    const itemError = ref(false);
    const modelError = ref(false);
    const nameError = ref(false);
    const emailError = ref(false);
    const cepError = ref(false);
    const wppError = ref(false);

    async function onSubmit() {
      console.log(name.value);
      const validated = validate();
      if (validated) {
        const response = await enviarEmail({
          tipoOrcamento: "Compra de Perifericos",
          item: item.value,
          model: model.value,
          name: name.value,
          email: email.value,
          cep: cep.value,
          wpp: wpp.value,
          obs: obs.value,
        });
        if (response) {
          document
            .getElementById("tooltip-sucess-periferico")
            .classList.add("show");
        } else {
          document
            .getElementById("tooltip-error-periferico")
            .classList.add("show");
        }
      }
    }

    function validate() {
      let error = false;
      item.value.length === 0
        ? ((itemError.value = true), (error = true))
        : (itemError.value = false);
      model.value.length === 0
        ? ((modelError.value = true), (error = true))
        : (modelError.value = false);
      name.value.length === 0
        ? ((nameError.value = true), (error = true))
        : (nameError.value = false);
      email.value.length === 0
        ? ((emailError.value = true), (error = true))
        : (emailError.value = false);
      cep.value.length === 0
        ? ((cepError.value = true), (error = true))
        : (cepError.value = false);
      wpp.value.length === 0
        ? ((wppError.value = true), (error = true))
        : (wppError.value = false);
      if (error) {
        return false;
      }
      return true;
    }

    return {
      obs,
      item,
      itemError,
      model,
      modelError,
      name,
      nameError,
      email,
      emailError,
      cep,
      cepError,
      wpp,
      wppError,
      onSubmit,
    };
  },
  template: /*html*/ `
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
            <option value="Fone de ouvido">Fone de ouvido</option>
            <option value="Mouse">Mouse</option>
            <option value="Teclado">Teclado</option>
            <option value="Monitores">Monitores</option>
            <option value="Impressoras">Impressoras</option>
            <option value="Outros">Outros</option>
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
            <button class="btn btn-primary btn-lg rounded-5" type="submit"> Enviar </button>
          </div>
        </div>
      </form>
    </div>
  `,
});
