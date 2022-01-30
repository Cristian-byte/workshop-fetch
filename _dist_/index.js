/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = "https://platzi-avo.vercel.app";

const appNode = document.querySelector("#app")

const formatPrice = (price) => {

    const newPrice = new window.Intl.NumberFormat("en-EN", {
        style: "currency",
        currency: "USD"
    }).format(price)

    return newPrice;
};

//web API
//Conectamos al servidor
window
    .fetch(`${baseUrl}/api/avo`)
    //Procesar la respuesta y convertirla en JSON
    .then((Response) => Response.json())
    //JSON 
    .then((responseJSON) => {
        const todosItems = []
        responseJSON.data.forEach((item) => {
            //Crear Imagen
            const imagen = document.createElement("img");
            imagen.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";
            //URL de la imagen
            imagen.src = `${baseUrl}${item.image}`;
            //Crear Titulo
            const title = document.createElement("h2");
            title.className = "text-lg"
            title.textContent = item.name;
            //Crear precio
            const price = document.createElement("div");
            price.className = "text-gray-600";
            price.textContent = formatPrice(item.price);

            const priceTitle = document.createElement("div");
            priceTitle.className = "text-center md:text-left";
            priceTitle.appendChild(title);
            priceTitle.appendChild(price);

            const card = document.createElement("div");
            card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
            card.appendChild(imagen);
            card.appendChild(priceTitle);

            todosItems.push(card)
        });

        appNode.append(...todosItems);
        appNode.className = "mt-10 grid grid-cols2 gap-2";
    });