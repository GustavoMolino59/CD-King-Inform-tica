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
    //variaveis
    const item = ref("");
    const model = ref("");
    const defeito = ref("");
    const name = ref("");
    const email = ref("");
    const cep = ref("");
    const wpp = ref("");
    const obs = ref("");
    const file = ref(null);

    const itemError = ref(false);
    const modelError = ref(false);
    const defeitoError = ref(false);
    const nameError = ref(false);
    const emailError = ref(false);
    const cepError = ref(false);
    const wppError = ref(false);
    async function onSubmit() {
      const validated = validate();
      if (validated) {
        const response = await enviarEmail({
          tipoOrcamento: "Assistencia tecnica",
          item: item.value,
          model: model.value,
          defeito: defeito.value,
          name: name.value,
          email: email.value,
          cep: cep.value,
          wpp: wpp.value,
          obs: obs.value,
          file: file.value,
        });
        if (response) {
          document.getElementById("tooltip-sucess").classList.add("show");
        } else {
          document.getElementById("tooltip-error").classList.add("show");
        }
      }
    }

    function onFileChange(event) {
      const files = event.target.files; // Obtém a lista de arquivos selecionados
      if (files.length > 0) {
        file.value = files[0]; // Seleciona apenas o primeiro arquivo (pode ser ajustado conforme necessário)
      }
    }

    function validate() {
      let error = false; // Inicialize error como false antes das verificações

      item.value.length === 0
        ? ((itemError.value = true), (error = true))
        : (itemError.value = false);

      model.value.length === 0
        ? ((modelError.value = true), (error = true))
        : (modelError.value = false);

      defeito.value.length === 0
        ? ((defeitoError.value = true), (error = true))
        : (defeitoError.value = false);

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
      onFileChange,
      obs,
      file,
      item,
      itemError,
      model,
      modelError,
      defeito,
      defeitoError,
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
    <div :class="{collapse: !viewToMe}">
      <div id="tooltip-error" class="toast align-items-center text-bg-danger border-0 tooltip" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            Erro no servidor, não conseguimos enviar nosso orçamento. Tente novamente mais tarde!
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
      <div id="tooltip-sucess" class="toast align-items-center text-bg-primary border-0 tooltip " role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            Orçamento enviado, logo entraremos em contato com você!
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
      <form class=" needs-validation" novalidate @submit.prevent="onSubmit">
        <div class="row"> 
          <div class="col-6">
          <select v-model="item" id="select-item-repair" :class="['form-select', itemError? 'is-invalid': '']" aria-label="Default select example" required>
            <option selected disabled value="">Qual item você precisa de assistência</option>
            <option value="Notebook">Notebook</option>
            <option value="Desktop">Desktop</option>
          </select>
          <div class="invalid-feedback ">
            Selecione um item
          </div>
          <span class="form-text">*obrigatório</span>
          </div>
          <div class="col-6">
            <div class="mb-3">
              <input v-model="model" type="text" :class="['form-control', modelError? 'is-invalid':'']" id="inputPCModel" placeholder="Qual o modelo?">
              <div class="invalid-feedback ">
                Escreva o nome do Modelo
              </div>
              <span class="form-text">*obrigatório</span>
            </div>
          </div>
        </div>
        <div class="row"> 
          <div class="col"> 
            <div class="form-floating">
              <textarea v-model="defeito" :class="['form-control', defeitoError? 'is-invalid':'']" placeholder="Descreva o problema" id="textAreaInfosPC" style="height: 100px"></textarea>
              <label for="textAreaInfosPC">Descreva o problema</label>
              <span class="form-text">*obrigatório</span>
            </div>
          </div>
        </div>
        <div class="row my-4">
          <div class="col d-flex">
            <div class="w-25">
              <p class="fw-bold">Envie uma foto do seu notebook ou computador para avaliarmos</p>
            </div>
            <div class="mb-3">
              <label for="formFile" class="form-label">Envie uma foto</label>
              <input @change="onFileChange" class="form-control" type="file" id="formFile">
            </div>
          </div>
        </div>
        <div class="row"> 
          <div class="col-6">
            <div class="mb-3">
              <label for="inputNameDesktop"  class="form-label">Nome</label>
              <input v-model="name"  type="text" :class="['form-control', nameError? 'is-invalid':'']" id="inputNameDesktop" placeholder="Nome Completo">
              <span class="form-text">*obrigatório</span>
            </div>
          </div>
            <div class="col-6">
              <div class="mb-3">
                <label  for="inputEmailDesktop"  class="form-label">Email</label>
                <input v-model="email" type="email" :class="['form-control', emailError? 'is-invalid':'']" id="inputEmailDesktop" placeholder="name@exemplo.com">
                <span class="form-text">*obrigatório</span>
              </div>
            </div>
        </div>
        <div class="row"> 
          <div class="col-6">
            <div class="mb-3">
              <label  for="inputCepRepair"  class="form-label">CEP</label>
              <input v-model="cep" type="text" :class="['form-control', cepError? 'is-invalid':'']" id="inputCepRepair" placeholder="12345-567">
              <span class="form-text">*obrigatório</span>
            </div>
          </div>
            <div class="col-6">
              <div class="mb-3">
                <label for="inputWppDesktopRepair"  class="form-label">Telefone/Whatsapp</label>
                <input v-model="wpp" type="tel" :class="['form-control', wppError? 'is-invalid':'']" id="inputWppDesktopRepair" placeholder="(xx)xxxx-xxxx">
                <span class="form-text">*obrigatório</span>
              </div>
            </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-floating">
              <textarea v-model="obs" class="form-control" placeholder="Observações" id="floatingTextarea2" style="height: 100px"></textarea>
              <label for="floatingTextarea2">Observações</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 text-center">
            <button class="btn btn-secondary btn-lg rounded-5 " type="submit"> Enviar </button>
          </div>
        </div>
      </form>
    </div>
  `,
});
