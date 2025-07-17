const urlProduct = "https://localhost:7062/api/Product"
const urlProductCart = "https://localhost:7062/api/ProductCart"
const urlOrden = "https://localhost:7062/api/Order"
const urlClient = "https://localhost:7062/api/Client"

import { ProductCart } from "../component/ProductCart.js"

export const createClient = async (dni, name, lastName, address, phoneNumber) => {
    try {
        const response = await fetch(urlClient, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                dni: dni,
                firstName: name,
                lastName: lastName,
                address: address,
                phoneNumber: phoneNumber
            }),
        });
        if (!response.ok) {
            if (response.status === 400) {
                throw new Error("El cliente ya fue agregado");
            } else {
                throw new Error(`Error: ${response.statusText}`);
            }
        }
        else {
            console.log("Cliente creado")
        }
        return await response.json();
    } catch (error) {
        console.error("Error al crear el cliente:", error);
    }
};

export const getProduct = async (id) => {
    try {
        const response = await fetch(`${urlProduct}/${id}`);
        if (!response.ok) {
            throw new Error(`Error fetching product with id ${id}: ${response.statusText}`);
        }
        const productData = await response.json();
        return productData;
    } catch (error) {
        console.error(error);
        return null;
    }
};
export const getProductCart = async (productId, amount) => {
    try {
        const response = await fetch(`${urlProduct}/${productId}`);
        if (!response.ok) {
            throw new Error("Error en la respuesta del servidor");
        }
        const data = await response.json();
        return { amount, ...data };
    } catch (error) {
        console.error("Error al obtener el producto del carrito:", error);
        return null;
    }
};


export const createProductCart = async (clientId, productId, amount) => {
    await fetch(urlProductCart, {
        headers: { "Content-Type": "application/json", },
        method: "POST",
        body: JSON.stringify({
            clientid: clientId,
            productid: productId,
            amount: amount
        })
    }).then((httpResponse) => {
        if (httpResponse.ok) {
            return httpResponse.json()
        }
    })
        .then(body => {
            localStorage.setItem(body.productId, JSON.stringify(new ProductCart(clientId, body.productId, body.amount)))
            console.log("Producto agregado")
        })
}

window.createProductCart = createProductCart

export const deleteProductCart = async (clientId, productId) => {
    await fetch(`${urlProductCart}/${clientId}/${productId}`, {
        headers: { "Content-Type": "application/json", },
        method: "DELETE",
    })
        .then((httpResponse) => {
            if (httpResponse.ok) {
                return httpResponse.json()
            }
        })
        .then(body => {
            localStorage.removeItem(body.productId)
            console.log("Producto eliminado")
        })
}
export const updateProductCart = async (clientId, productId, amount) => {
    await fetch(urlProductCart, {
        headers: { "Content-Type": "application/json", },
        method: "PATCH",
        body: JSON.stringify({
            clientid: clientId,
            productid: productId,
            amount: amount
        })

    }).then((httpResponse) => {
        if (httpResponse.ok) {
            return httpResponse.json()
        }
    })
        .then(body => {
            localStorage.removeItem(body.productId)
            localStorage.setItem(body.productId, JSON.stringify(new ProductCart(clientId, body.productId, body.amount)))
            console.log("Producto actualizado")
        })
}

window.updateProductCart = updateProductCart

export const searchProduct = async (callback) => {
    const nombreProducto = document.getElementById("Buscador").value;
    const orden = document.getElementById("orden").value;
    const isAscendingOrder = orden !== "Mayor a menor";
    try {
        const response = await fetch(urlProduct + "?" + new URLSearchParams({
            name: nombreProducto,
            sort: isAscendingOrder,
        }));
        if (!response.ok) {
            throw new Error("Error en la respuesta del servidor");
        }
        const data = await response.json();
        callback(data.$values);
    } catch (error) {
        console.error("Error al buscar productos:", error);
    }
};

export const showBalance = async (startDate, endDate, callback) => {
    await fetch(urlOrden + "?" + new URLSearchParams({
        from: startDate,
        to: endDate,
    }))
        .then((httpResponse) => {
            if (httpResponse.ok) {
                return httpResponse.json()
            }
        })
        .then(body => {
            callback(body.$values);
        })
}
export const showOrder = async (callback) => {
    await fetch(`${urlOrden}/${1}`, {
        headers: { "Content-Type": "application/json", },
        method: "GET",
    })
        .then((httpResponse) => {
            if (httpResponse.ok) {
                return httpResponse.json()
            }

        })
        .then(body => {
            callback(body);
        })
}