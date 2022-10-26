// ITERATION 1

function updateSubtotal(product) {

  // console.log('Calculating subtotal, yey!');
  // console.log(product);

  const price = product.querySelector('.price span') // seleção de uma classe do price e a tag span
  const quantity = product.querySelector('.quantity input');
  const subtotal = product.querySelector('.subtotal span');

  // console.log(price.innerText);
  // console.log(quantity.value);

  const subtotalValue = (+price.innerText * +quantity.value);

  subtotal.innerText = subtotalValue;

  return subtotalValue;

}

function calculateAll() {
  // code in the following two lines is added just for testing purposes.
  // it runs when only iteration 1 is completed. at later point, it can be removed.
  // essa linha captura uma linha inteira e depois chama a updatesubtotal

  // const singleProduct = document.querySelector('.product');
  // updateSubtotal(singleProduct);

  // end of test
  // o tr inteiro da tabela é o produto

  // ITERATION 2
  const rowsProduct = document.getElementsByClassName('product');

  let totalValue = 0;
  for (const row of rowsProduct) {

    const subtotal = updateSubtotal(row);
    totalValue += subtotal;
    //totalValue += updateSubtotal(row);
    
  }

  // ITERATION 3

  const spanTotalValue = document.querySelector('#total-value span')
  spanTotalValue.innerText = totalValue.toFixed(2);

}

// ITERATION 4

function removeProduct(event) {

  const target = event.currentTarget;

  // console.log('The target in remove is:', target);

  // const td = target.parentNode;

  // const tr = td.parentNode;

  // const table = tr.parentNode;

  // table.removeChild(tr);


  target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);

  calculateAll();

}

// ITERATION 5

function createProduct(event) {

  //Obter os elementos dos inputs
  const inputs = document.querySelectorAll('.create-product input');

  const inputName = inputs[0];
  const inputPrice = inputs[1];


  //criar o elemento da linha (tr)
  const trProduct = document.createElement('tr');
  trProduct.setAttribute('class', 'product');

  // const tdName = document.createElement('td');
  // tdName.setAttribute('class', 'name');
  // trProduct.appendChild(tdName);

  // const tdPrice = document.createElement('td');
  // tdPrice.setAttribute('class', 'price');
  // tdPrice.innerHTML = '$<span>25.00</span>';
  // trProduct.appendChild(tdPrice);


  trProduct.innerHTML = `
  <td class="name">
    <span></span>
  </td>
  <td class="price">$<span></span></td>
  <td class="quantity">
    <input type="number" value="0" min="0" placeholder="Quantity" />
  </td>
  <td class="subtotal">$<span>0</span></td>
  <td class="action">
    <button class="btn btn-remove">Remove</button>
  </td>
  `;

  //obter os elementos que estão dentro da nova linha
  const spanName = trProduct.querySelector('.name span');
  const spanPrice = trProduct.querySelector('.price span');
  const btnRemove = trProduct.querySelector('.btn.btn-remove');
  

  //colocar os valores dos inputs nos elementos da nova linha
  spanName.innerText = inputName.value;
  spanPrice.innerText = (+inputPrice.value).toFixed(2);
  
  //limpar os inputs da linha do create
  inputName.value = '';
  inputPrice.value = 0;


  //adicionar o event listener no click do botão remove da nova linha
  btnRemove.addEventListener('click', removeProduct);


  //obter o elemento tbody da tabela de produtos
  const tBody = document.querySelector('#cart tbody');

  //adicionar a nova linha no final das linhas existentes
  tBody.appendChild(trProduct);
  
}

window.addEventListener('load', () => {

  //esse é o botão calculateprice.  Tem um eventlistener nele, para cada vez que for clicado
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);


  // Obter uma lista de todos os botões remove
  const btnsRemove = document.getElementsByClassName('btn btn-remove');

  // fazer um loop nos botões

  for (const btn of btnsRemove) {
    // para cada botão adicionar um event listener para o evento click, passando a função removeproduct como callback
    btn.addEventListener('click', removeProduct);

  }


  //configurando o evento do click no botão create product

  const createBtn = document.getElementById('create');

  createBtn.addEventListener('click', createProduct);

});
