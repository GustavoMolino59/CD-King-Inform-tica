import { ref, defineComponent, computed } from "vue";
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
    //validacao dos itens
    const item = ref("");
    const use = ref("");
    const file = ref(null);
    const model = ref("");
    const valueTotal = ref("");
    const name = ref("");
    const email = ref("");
    const cep = ref("");
    const wpp = ref("");
    const obs = ref("");

    const itemError = ref(false);
    const useError = ref(false);

    const valueTotalError = ref("");
    const modelError = ref(false);
    const nameError = ref(false);
    const emailError = ref(false);
    const cepError = ref(false);
    const wppError = ref(false);
    const selecteds = ref([]);
    const itens = ref([
      "Placa de video",
      "Placa mãe",
      "Memória SSD",
      "Memória HD",
      "Fonte",
      "Cooler",
      "Water cooler",
      "Periféricos",
    ]);
    function toogleItem(name) {
      if (selecteds.value.includes(name)) {
        console.log(name);
        selecteds.value = selecteds.value.filter((item) => item !== name);
      } else {
        selecteds.value.push(name);
      }
      console.log(selecteds.value);
    }

    function toggleAll() {
      if (selecteds.value.length === 8) {
        selecteds.value = [];
      } else {
        selecteds.value = itens.value;
      }
    }
    function isChecked(name) {
      return selecteds.value.includes(name);
    }

    function onFileChange(event) {
      const files = event.target.files; // Obtém a lista de arquivos selecionados
      if (files.length > 0) {
        file.value = files[0]; // Seleciona apenas o primeiro arquivo (pode ser ajustado conforme necessário)
      }
    }

    async function onSubmit() {
      const validated = validate();
      if (validated) {
        console.log('passou por aqui')
        const response = await enviarEmail({
          tipoOrcamento: "Compra de Computadores",
          item: item.value,
          model: model.value,
          name: name.value,
          email: email.value,
          cep: cep.value,
          wpp: wpp.value,
          file: file.value,
          valueTotal: valueTotal.value,
          selectedItens: selecteds.value,
          obs: obs.value,
        });
        if (response) {
          document.getElementById("tooltip-sucess-sales").classList.add("show");
        } else {
          document.getElementById("tooltip-error-sales").classList.add("show");
        }
      }
    }

    function validate() {
      let error = false;
      item.value.length === 0
        ? ((itemError.value = true), (error = true))
        : (itemError.value = false);
      use.value.length === 0
        ? ((useError.value = true), (error = true))
        : (useError.value = false);
      model.value.length === 0
        ? ((modelError.value = true), (error = true))
        : (modelError.value = false);
      valueTotal.value.length === 0
        ? ((valueTotalError.value = true), (error = true))
        : (valueTotalError.value = false);
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
      toogleItem,
      itens,
      selecteds,
      toggleAll,
      isChecked,
      obs,
      use,
      model,
      modelError,
      useError,
      item,
      itemError,
      valueTotal,
      valueTotalError,
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
  <div id="tooltip-error-sales" class="toast align-items-center text-bg-danger border-0 tooltip" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">
        Erro no servidor, não conseguimos enviar nosso orçamento. Tente novamente mais tarde!
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
  <div id="tooltip-sucess-sales" class="toast align-items-center text-bg-primary border-0 tooltip " role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">
        Orçamento enviado, logo entraremos em contato com você!
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
    <div :class="{collapse: !viewToMe}">
      <form class="p-2"  @submit.prevent="onSubmit" novalidate>
        <div class="row"> 
          <div class="col-6">
            <select v-model="item" :class="['form-select', itemError? 'is-invalid':'']" aria-label="form-select">
                <option selected disabled value="">Qual Tipo de computador  você deseja comprar?</option>
                <option value="Notebook">Notebook</option>
                <option value="Desktop">Desktop</option>
            </select>
            <span class="form-text">*obrigatório</span>
          </div>
          <div class="col-6">
            <select v-model="use" :class="['form-select', useError? 'is-invalid':'']" aria-label="form-select">
                <option selected disabled value="">Para o que você irá usar o computador</option>
                <option value="Trabalho, escola ou coisas leves">Trabalho, escola ou coisas leves</option>
                <option value="Trabalhos pesados (Autcad, simulações, etc)">Trabalhos pesados (Autcad, simulações, etc)</option>
                <option value="Jogos Pesados">Jogos Pesados</option>
            </select>
            <span class="form-text">*obrigatório</span>
          </div>
        </div>
        <div class="row my-4">
            <div class="col-4 align-content-center">
                <div class="form-check form-switch">
                    <input  data-bs-toggle="collapse"  data-bs-target="#container-troca-computador" class="form-check-input" type="checkbox" role="switch" id="SwitchRevendaPC">
                    <label class="form-check-label" for="SwitchRevendaPC">Desejo revender meu computador para comprar um novo</label>
                </div>
            </div>
            <div id="container-troca-computador" class="col-8 collapse">
            <div  class="d-flex flex-column">
                <div>
                    <label for="inputNameSalePC" class="form-label"></label>
                    <input v-model="model"  type="text" :class="['form-control', modelError? 'is-invalid':'']"  id="inputNameSalePC" placeholder="Qual computador você tem para revender?">
                    <span class="form-text">*obrigatório</span>
                </div>
                <div>
                    <div class="mb-3">
                        <label for="formFile" class="form-label">Envie uma foto do seu PC Antigo</label>
                        <input @change="onFileChange" class="form-control" type="file" id="formFile">
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div class="row">
            <div class="col-12 border border-black mx-auto d-flex justify-content-between"> 
                <span> Qual é o seu orçamento?</span>
                
                <div class="form-check form-check-inline">
                    <input v-model="valueTotal" :class="['form-check-input', valueTotalError? 'is-invalid':'']" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1000 a 3000 R$">
                    <label class="form-check-label" for="inlineRadio1">1000 a 3000 R$</label>
                </div>
                <div class="form-check form-check-inline">
                    <input v-model="valueTotal" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="3000 a 5000 R$">
                    <label class="form-check-label" for="inlineRadio2">3000 a 5000 R$</label>
                </div>
                <div class="form-check form-check-inline">
                    <input v-model="valueTotal" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="5000 a 10.000 R$">
                    <label class="form-check-label" for="inlineRadio3">5000 a 10.000 R$</label>
                </div>
                <div class="form-check form-check-inline">
                    <input v-model="valueTotal" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="+10.000 R$">
                    <label class="form-check-label" for="inlineRadio3">+10.000 R$</label>
                </div>
            </div>
        </div>
        <div class="row my-4">
            <div class="col-12">
                <span> Selecione todos os itens que você está buscando</span>
                <div class="row row-cols-3">
                    <div class="col"> 
                        <div class="form-check">
                            <label class="form-check-label" for="flexCheck1">
                                Todas as peças do Computador
                            </label>
                            <input @click="toggleAll" class="form-check-input" type="checkbox" value="Todas as peças do Computador" id="flexCheck1" :checked="selecteds.length === 8" >
                        </div>
                    </div>
                    <div class="col" v-for=" (item, index) in itens"> 
                        <div class="form-check">
                            <label class="form-check-label" :for="'flexCheck' + (index)" :key="index">
                                {{item}}
                            </label>
                            <input @click="toogleItem(item)" class="form-check-input" type="checkbox" value="Todas as peças do Computador" :id="'flexCheck' + (index)" :checked="isChecked(item)">
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="row"> 
          <div class="col-6">
            <div class="mb-3">
              <label for="inputNamePcSales" class="form-label">Nome</label>
              <input v-model="name" type="text" :class="['form-control', nameError? 'is-invalid':'']" id="inputNamePcSales" placeholder="Nome Completo">
              <span class="form-text">*obrigatório</span>
            </div>
          </div>
            <div class="col-6">
              <div class="mb-3">
                <label for="inputEmailPCSale" class="form-label">Email</label>
                <input v-model="email" type="email" :class="['form-control', emailError? 'is-invalid':'']" id="inputEmailPCSale" placeholder="name@exemplo.com">
                <span class="form-text">*obrigatório</span>
              </div>
            </div>
        </div>
        <div class="row"> 
          <div class="col-6">
            <div class="mb-3">
              <label for="inputNamePCSale" class="form-label">CEP</label>
              <input v-model="cep" type="text" :class="['form-control', cepError? 'is-invalid':'']" id="inputNamePCSale" placeholder="12345-567">
              <span class="form-text">*obrigatório</span>
            </div>
          </div>
            <div class="col-6">
              <div class="mb-3">
                <label for="inputEmailPCSale" class="form-label">Telefone/Whatsapp</label>
                <input v-model="wpp" type="tel" :class="['form-control', wppError? 'is-invalid':'']" id="inputEmailPCSale" placeholder="(xx)xxxx-xxxx">
                <span class="form-text">*obrigatório</span>
              </div>
            </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-floating">
              <textarea v-model="obs" class="form-control" placeholder="Observações" id="TextAreaObs" style="height: 100px"></textarea>
              <label  for="TextAreaObs">Observações</label>
              <span class="form-text">*obrigatório</span>
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
