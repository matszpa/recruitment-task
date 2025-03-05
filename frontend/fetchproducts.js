document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("product-container");
  const selectElement = document.querySelector(".custom-select select");
  let limit = parseInt(selectElement.value, 10);
  let page = 1;
  let loading = false;

  async function fetchProducts() {
    if (loading) return;
    loading = true;

    try {
      const response = await fetch(
        `https://brandstestowy.smallhost.pl/api/random?pageNumber=${page}&pageSize=${limit}`
      );
      const responseData = await response.json();
      console.log(responseData);
      responseData.data.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.style.backgroundImage = `url(${product.image})`;
        productDiv.addEventListener("click", () => openPopup(product));
        productContainer.appendChild(productDiv);
      });

      page++;
    } catch (error) {
      console.error("Błąd pobierania produktów:", error);
    } finally {
      loading = false;
    }
  }

  const popup = document.querySelector("#popup");
  let overlay = document.querySelector(".popup-overlay");
  function openPopup(product) {
    overlay.style.display = "block";

    popup.classList.add("popup");
    popup.innerHTML = `
        <div class="popup-content">
          <h2>ID: ${product.id}</h2>
          <h2>Nazwa: ${product.text}</h2>
          <button class="close-popup">X</button>
        </div>
      `;

    document.body.appendChild(popup);

    document.querySelector(".close-popup").addEventListener("click", () => {
      popup.remove();
      overlay.style.display = "none";
    });
  }
  document.querySelector(".popup-overlay").addEventListener("click", () => {
    popup.remove();
    overlay.style.display = "none";
  });

  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 50
    ) {
      fetchProducts();
    }
  });

  selectElement.addEventListener("change", (e) => {
    limit = parseInt(e.target.value, 10);
    page = 1;
    productContainer.innerHTML = "";
    fetchProducts();
  });

  fetchProducts();
});
