import { createApp, ref } from 'vue';
import CounterComponent from './components/FormDesktop.js';
import FormPerifericos from './components/FormPerifericos.js';
import FormPCSales from './components/FormPCSales.js';
import FormServices from './components/FormServices.js';
 const App = {
    components: {
        CounterComponent,
        FormPerifericos,
        FormPCSales,
        FormServices
      },

    setup() {
        const selectedOption = ref('tes')

        return{selectedOption}
    },
    template:/*html*/ `
        
    <header>
        <nav class="container-fluid navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <div class="container d-flex">
              <a class="navbar-brand" href="/">
                <img src="../assets/header/Imagem3-1.webp" alt="Logo CD King Informática" width="70" />
              </a>
              <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
            </div>
    
            <div class="collapse navbar-collapse container-fluid align-items-end justify-content-end" id="navbarNav">
              <ul class="navbar-nav gap-5">
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="/">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/about">Sobre nós</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/orcamento">Orçamento</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/produto">Produto</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    </header>
    <main>
        <div class="container d-flex align-items-center justify-content-center mt-4">
            <div class="border-bottom border-2 border-black">
                <h1 class="fw-bold text-black">Faça um orçamento <br> <span class="color-red">Sem compromisso </span></h1>
            </div>
        </div>
        <div class="container"> 
            <div class="row"> 
                <div class="bg-form mt-4 p-2 col-md-6 ">
                <label>Selecione um item para orçar </label>
                    <select v-model="selectedOption" class="form-select" aria-label="Select para opção de orçamentos">
                        <option selected>Selecione um item</option>
                        <option value="1">Assistência técnica</option>
                        <option value="2">Compra de Periféricos, suprimentos e peças</option>
                        <option value="3">Compra de Computadores</option>
                        <option value="4">Consultoria em Informática & Serviços</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="container"> 
          <div class="bg-form my-4 p-2 "> 
            <div class="row">
                <div class="col-12">
                    <CounterComponent :viewToMe="selectedOption === '1' ? true : false"/>
                    <FormPerifericos :viewToMe="selectedOption === '2' ? true : false"/>
                    <FormPCSales  :viewToMe="selectedOption === '3' ? true : false"/>
                    <FormServices :viewToMe="selectedOption === '4' ? true : false"/>
                </div>
            </div>
          </div>
        </div>
    </main>
    
            `,
 };

 createApp(App).mount('#app');
