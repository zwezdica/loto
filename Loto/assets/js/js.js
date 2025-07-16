const brojevi = Array.from({ length: 39 }, (_, i) => i + 1);
const korisnickiBrojevi = [];
const maxBrojeva = 7;

const brojeviContainer = document.getElementById("brojevi-container");
const izabraniBrojeviSpan = document.getElementById("izabraniBrojevi");
const generisiBtn = document.getElementById("generisi");
const randomBrojeviSpan = document.getElementById("randomBrojevi");
const resetBtn = document.createElement("button");

resetBtn.textContent = "Pokreni ponovo igru";
resetBtn.classList.add("reset-dugme");
document.body.appendChild(resetBtn);

brojevi.forEach((broj) => {
  const brojElement = document.createElement("div");
  brojElement.classList.add("broj");

  const imgElement = document.createElement("img");
  imgElement.src = `./assets/img/${broj}.png`;
  imgElement.alt = `Broj ${broj}`;

  brojElement.appendChild(imgElement);
  brojElement.addEventListener("click", () => izaberiBroj(broj, brojElement));
  brojeviContainer.appendChild(brojElement);
});

function izaberiBroj(broj, element) {
  if (korisnickiBrojevi.includes(broj)) {
    korisnickiBrojevi.splice(korisnickiBrojevi.indexOf(broj), 1);
    element.classList.remove("izabran");
  } else if (korisnickiBrojevi.length < maxBrojeva) {
    korisnickiBrojevi.push(broj);
    element.classList.add("izabran");
  }

  izabraniBrojeviSpan.textContent = korisnickiBrojevi.join(", ");
  generisiBtn.disabled = korisnickiBrojevi.length !== maxBrojeva;
}

generisiBtn.addEventListener("click", () => {
  const kopijaBrojeva = [...brojevi];
  const randomBrojevi = [];

  while (randomBrojevi.length < maxBrojeva) {
    const indeks = Math.floor(Math.random() * kopijaBrojeva.length);
    randomBrojevi.push(kopijaBrojeva.splice(indeks, 1)[0]);
  }

  randomBrojeviSpan.textContent = randomBrojevi.join(", ");

  const pogodak = korisnickiBrojevi.filter((broj) =>
    randomBrojevi.includes(broj)
  );
  const rezultatP = document.createElement("p");
  rezultatP.textContent = `Broj pogodaka: ${pogodak.length}`;
  rezultatP.style.textAlign = "center";
  rezultatP.style.marginTop = "10px";
  document.body.appendChild(rezultatP);

  generisiBtn.disabled = true;
  brojeviContainer.style.pointerEvents = "none";
  resetBtn.style.display = "block";
});

resetBtn.addEventListener("click", () => {
  korisnickiBrojevi.length = 0;
  izabraniBrojeviSpan.textContent = "";
  randomBrojeviSpan.textContent = "";

  const brojElements = document.querySelectorAll(".broj");
  brojElements.forEach((element) => element.classList.remove("izabran"));

  brojeviContainer.style.pointerEvents = "auto";
  generisiBtn.disabled = true;
  resetBtn.style.display = "none";

  const rezultatP = document.querySelector("p:last-of-type");
  if (rezultatP) rezultatP.remove();
});
