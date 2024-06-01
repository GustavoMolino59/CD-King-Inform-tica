export default async function enviarEmail({
    tipoOrcamento,
    item,
    model,
    defeito,
    name,
    email,
    cep,
    wpp,
    obs,
    file,
    valueTotal,
    selectedItens
  }) {
    try {
      const emailParams = {
        Host: "smtp.elasticemail.com",
        Username: "guga.molino@gmail.com",
        Password: "4D101FD44F73D869867F45F82A54102FDAE5",
        To: "guga.molino@gmail.com",
        From: "guga.molino@gmail.com",
        Subject: `Orçamento de ${name} sobre ${tipoOrcamento}`,
      };
      emailParams.Body = makeEmailBody({
        tipoOrcamento,
        item,
        model,
        defeito,
        name,
        email,
        cep,
        wpp,
        obs,
        file,
        valueTotal,
        selectedItens
      })
  
      // Adicionar anexos se houver
      if (file) {
        const base64File = await readFileAsBase64(file);
        emailParams.Attachments = [
          {
            name: file.name,
            data: base64File,
          },
        ];
      }
  
      // Enviar email
      const response = await Email.send(emailParams);
      console.log(response)
      if(response == 'Failure sending mail.'){
        return false
      } else{
          return true;
      }
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        return false;

    }
  }
  
  // Função para converter arquivo em base64
  function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  function makeEmailBody({
    tipoOrcamento,
    item,
    model,
    defeito,
    name,
    email,
    cep,
    wpp,
    obs,
    file,
    valueTotal,
    selectedItens,
  }) {
    let body = '';
    
    if (tipoOrcamento === 'Consultoria em Informática e Serviços') {
      body = `
        <p>Chegou um novo orçamento de <strong>${name}</strong> sobre <strong>${tipoOrcamento}</strong></p>
        <p>O cliente busca um orçamento sobre <strong>${item}</strong> e deseja que: <strong>${model}</strong></p>
        <p><strong>Dados do cliente:</strong></p>
        <p>Nome: ${name}<br>
        E-mail: ${email}<br>
        CEP: ${cep}<br>
        Whatsapp: ${wpp}</p>
        <p><strong>Observações:</strong><br>
        ${obs}</p>
      `;
    } else if (tipoOrcamento === 'Assistencia tecnica') {
      body = `
        <p>Chegou um novo pedido do cliente <strong>${name}</strong> sobre <strong>${tipoOrcamento}</strong></p>
        <p>O cliente busca um orçamento sobre <strong>${item}</strong> para o computador de modelo: <strong>${model}</strong></p>
        <p><strong>O defeito especificado pelo cliente é:</strong></p>
        <p>${defeito}</p>
        <p><strong>Dados do cliente:</strong></p>
        <p>Nome: ${name}<br>
        E-mail: ${email}<br>
        CEP: ${cep}<br>
        Whatsapp: ${wpp}</p>
        <p><strong>Observações:</strong><br>
        ${obs}</p>
        <p>Segue a foto do defeito em anexo</p>
      `;
    } else if (tipoOrcamento === 'Compra de Computadores') {
      body = `
        <p>Chegou um novo pedido do cliente <strong>${name}</strong> sobre <strong>${tipoOrcamento}</strong></p>
        <p>O cliente busca um orçamento de compra de <strong>${item}</strong> e quer usar o computador para <strong>${model}</strong></p>
        <p><strong>Orçamento total do cliente é:</strong> ${valueTotal}</p>
        <p>Ele busca as seguintes peças para o computador: <strong>${selectedItens}</strong></p>
        <p><strong>Dados do cliente:</strong></p>
        <p>Nome: ${name}<br>
        E-mail: ${email}<br>
        CEP: ${cep}<br>
        Whatsapp: ${wpp}</p>
        <p><strong>Observações:</strong><br>
        ${obs}</p>
        <p>Se o cliente possuir um computador para revender, foto dele seguirá em anexo</p>
      `;
    } else if (tipoOrcamento === 'Compra de Perifericos') {
      body = `
        <p>Chegou um novo pedido do cliente <strong>${name}</strong> sobre <strong>${tipoOrcamento}</strong></p>
        <p>O cliente busca um orçamento de compra de <strong>${item}</strong> e o modelo especificado é <strong>${model}</strong></p>
        <p><strong>Dados do cliente:</strong></p>
        <p>Nome: ${name}<br>
        E-mail: ${email}<br>
        CEP: ${cep}<br>
        Whatsapp: ${wpp}</p>
        <p><strong>Observações:</strong><br>
        ${obs}</p>
      `;
    }
  
    return body;
  }