export function createServiceModal(service) {
  let imagePosition = 0;
  const modal = document.querySelector("#modal_services");
  modal.innerHTML = "";
  const title = document.createElement("h2");
  const divContainer = document.createElement("div");
  const divPhotoContainer = document.createElement("div");
  const spanArrowBack = document.createElement("span");
  const imgServices = document.createElement("img");
  const spanArrowFoward = document.createElement("span");
  const paragraph = document.createElement("p");
  const strongPrice = document.createElement("strong");
  const closeButton = document.createElement("button");
  const whatsButton = document.createElement("button");

  closeButton.innerText = "X";
  closeButton.classList.add("close_button");
  closeButton.addEventListener("click", function (event) {
    modal.close();
  });

  whatsButton.innerText = "Marque já!";
  whatsButton.classList.add("whatsButton");

  whatsButton.addEventListener("click", function (event) {
    window.open("https://api.whatsapp.com/send/?phone=55xxxxxxxxxx", "_blank");
  });

  divContainer.classList.add("modal_container");
  divPhotoContainer.classList.add("photo_container");
  spanArrowBack.classList.add("material-symbols-outlined", "arrows");
  spanArrowFoward.classList.add("material-symbols-outlined", "arrows");
  title.innerText = service.title;
  imgServices.src = service.allImages[imagePosition];
  spanArrowBack.innerText = "arrow_back_ios_new";
  spanArrowFoward.innerText = "arrow_forward_ios";

  paragraph.innerText = service.longDescription;

  const arredondado = Math.round(service.price * 100) / 100;

  const formatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(arredondado);
  strongPrice.innerText = formatado;

  spanArrowBack.addEventListener("click", function (event) {
    if (imagePosition != 0) {
      imagePosition--;
      imgServices.src = service.allImages[imagePosition];
    }
  });
  spanArrowFoward.addEventListener("click", function (event) {
    if (imagePosition < service.allImages.length - 1) {
      imagePosition++;
      imgServices.src = service.allImages[imagePosition];
    }
  });

  divPhotoContainer.append(spanArrowBack, imgServices, spanArrowFoward);
  divContainer.append(title, closeButton, divPhotoContainer, paragraph, strongPrice, whatsButton);
  modal.appendChild(divContainer);

  modal.showModal();

  modal.addEventListener("click", function (event) {
    const modalContainer = document.querySelector(".modal_container");
    if (!modalContainer.contains(event.target)) {
      modal.close();
    }
  });
}
