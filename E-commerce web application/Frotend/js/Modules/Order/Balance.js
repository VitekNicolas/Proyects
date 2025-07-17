import { showBalance } from "../../service/fetchService.js";
import { appendContainersToDivMain, createContainer } from "../../component/DivHandler.js";

var divBalance;
var liBalance = document.getElementById("liBalance");

const createDivOperationBalance = () =>
    `<div id="divOperationBalance">
          <h3 class="text-primary">Balance de operaciones</h3>
          <label class="font-weight-bold text-secondary" for="fechaInicio">Fecha inicial</label>
          <input type="text" id="inpStartDate" />
          <label class="text-secondary" for="fechaFin">Fecha final</label>
          <input type="text" id="inpEndDate" />
          <button class="btn btn-primary" id="btnBalance" type="button" onClick="renderBalance()">Ver balance</button>
          <table class="table" id="taBalanceTable">
            <thead>
              <tr class="bg-primary" id="trBalanceTitle" hidden>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Producto</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio</th>
                <th scope="col">Sub-total</th>
              </tr>
            </thead>
          </table>
    </div>`

export const createBalanceRow = (
    index,
    firstName,
    lastName,
    productName,
    productPrice,
    amount,
    subTotal
) => `
    <tr class="bg-success">
        <th scope="row">${index}</th>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${productName}</td>
        <td>${amount}</td>
        <td>$${productPrice}</td>
        <td>$${subTotal}</td>
    `;
export const displayTotal = (total) => `
    <tr class="bg-primary">
        <th scope="row">Total</th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td><b>$${total}</b></td>
`;

export const appendRowToBalanceTable = (listOfOrders) => {
    let total;
    let rowNumber = 1;
    let orderCounter = 0;
    let orderAmount = listOfOrders.length;
    let divOperationBalance = document.getElementById("divOperationBalance");
    let taBalanceTable = document.getElementById("taBalanceTable");
    while (orderCounter < orderAmount) {
        let firstNameClient = listOfOrders[orderCounter].firstNameClient
        let lastName = listOfOrders[orderCounter].lastNameClient
        total = listOfOrders[orderCounter].total
        let subTotal = listOfOrders[orderCounter].subTotal
        let productName = listOfOrders[orderCounter].productName
        let amount = listOfOrders[orderCounter].productAmount
        let productPrice = listOfOrders[orderCounter].productPrice
        taBalanceTable.innerHTML += createBalanceRow(rowNumber, firstNameClient, lastName, productName, productPrice, amount, subTotal)
        orderCounter++;
        rowNumber++;
    }
    taBalanceTable.innerHTML += displayTotal(total)
    divOperationBalance.appendChild(taBalanceTable);
}

export const renderBalance = async () => {
    const startDate = document.getElementById("inpStartDate")
    const endDate = document.getElementById("inpEndDate")
    document.getElementById("trBalanceTitle").removeAttribute("hidden")
    await showBalance(startDate.value, endDate.value, appendRowToBalanceTable)
}

window.renderBalance = renderBalance;

const showOperationBalanceDiv = () => {
    divBalance = createContainer('divBalance');
    divBalance.innerHTML += createDivOperationBalance();
    appendContainersToDivMain(divBalance);
}

export const initializeBalanceDiv = () => {
    liBalance.addEventListener("click", showOperationBalanceDiv)
}