import './style.css'
import { categories } from './tableau'

const app = document.querySelector("#app")

const titleApp = document.createElement("h1")
titleApp.innerText = "Calculez vos dépenses !"
app.appendChild(titleApp)

const titleSoeur = document.createElement("div")
titleSoeur.classList.add("titleSoeur")
app.appendChild(titleSoeur)

export const data = []
let totalDepense = 0

const divRevenu = document.createElement("div")
divRevenu.classList.add("divRevenu")

const labelEntre = document.createElement("label")
labelEntre.innerText = "Entrez vos revenus"
const inputEntre = document.createElement("input")
inputEntre.placeholder = "€"
const buttonEntreArgent = document.createElement("button")
buttonEntreArgent.innerText = "Valider"
app.appendChild(divRevenu)
divRevenu.appendChild(labelEntre)
divRevenu.appendChild(inputEntre)
divRevenu.appendChild(buttonEntreArgent)

buttonEntreArgent.addEventListener("click", () => {
  
  afficherRevenu()
  afficherAccueil()

})


function afficherRevenu() {
  const titleSoeur = document.createElement("div")
  titleSoeur.classList.add("titleSoeur")
  app.appendChild(titleSoeur)
  divRevenu.remove()
  const totalRevenu = document.createElement("span")
  totalRevenu.innerText = `Total des revenus ${inputEntre.value}€`
  titleSoeur.appendChild(totalRevenu)
  
  const divDepenseContainer = document.createElement("div") 
  divDepenseContainer.id = "divDepenseContainer"
  
  const totalDepense = parseFloat(data.reduce((acc, item) => acc + Number(item.price), 0))
  const affichageDepense = document.createElement("span")
  affichageDepense.innerText = `Total des dépenses ${totalDepense}€`

  const argentRestant = document.createElement("span")
  let argentRestantInt = parseFloat(inputEntre.value - totalDepense)
  argentRestant.innerText = `Solde ${inputEntre.value - totalDepense}€`
  if (argentRestantInt <= 0 ) {
    argentRestant.style.backgroundColor="rgba(255, 0, 0, 0.514)"
  }

  titleSoeur.appendChild(argentRestant)
  
  titleSoeur.appendChild(divDepenseContainer)
  divDepenseContainer.appendChild(affichageDepense)
}

function afficherDepense() {
  
  }

function afficherAccueil() {

const buttonAjout = document.createElement("button")
buttonAjout.innerText = "+"

afficherDepense()

app.appendChild(buttonAjout)


buttonAjout.addEventListener("click", () => {
  const camembert = document.querySelector("#myChart")
  camembert.style.display = "none"
  clean()
  nouvelAjout()
})
}

function nouvelAjout() {

  const divAjout = document.createElement("div")
  divAjout.classList.add("divAjout")

  const buttonBack = document.createElement("button")
  buttonBack.innerText = "Retour"
  buttonBack.id = "backBtn"
  divAjout.appendChild(buttonBack)

  buttonBack.addEventListener("click", () => {
    clean()
    afficherRevenu()
    afficherAccueil()
    afficherListe()
    afficherGraph()
  })

  const info = document.createElement("h3")
  info.innerText = "Ajoutez une nouvelle dépense"
  info.id = "info"
  divAjout.appendChild(info)

  const labelTitle = document.createElement("label")
  const inputTitle = document.createElement("input")
  labelTitle.innerText = "Titre"

  const labelDesc = document.createElement("label")
  const inputDesc = document.createElement("textarea")
  labelDesc.innerText = "Description"

  const labelCat = document.createElement("label")
  const selectCat = document.createElement("select")
  labelCat.innerText = "Catégorie"

  categories.forEach((category) => {
    const option = document.createElement("option")
    option.value = category.toLowerCase()
    option.innerText = category
    selectCat.appendChild(option)
  })

  const labelPrix = document.createElement("label")
  const inputPrix = document.createElement("input")
  inputPrix.type = "number"
  inputPrix.min = 0
  inputPrix.step = 0.01
  labelPrix.innerText = "Montant"

  const labelDate = document.createElement("label")
  const inputDate = document.createElement("input")
  inputDate.type = "date"
  labelDate.innerText = "Date"

  const buttonValidate = document.createElement("button")
  buttonValidate.innerText = "Valider"
  buttonValidate.id = "btnValidate"

  app.appendChild(divAjout)
  divAjout.appendChild(labelTitle)
  divAjout.appendChild(inputTitle)
  divAjout.appendChild(labelDesc)
  divAjout.appendChild(inputDesc)
  divAjout.appendChild(labelCat)
  divAjout.appendChild(selectCat)
  divAjout.appendChild(labelPrix)
  divAjout.appendChild(inputPrix)
  divAjout.appendChild(labelDate)
  divAjout.appendChild(inputDate)
  divAjout.appendChild(buttonValidate)

  buttonValidate.addEventListener("click", () => {
    const titleInputValue = inputTitle.value
    const descInputValue = inputDesc.value
    const catSelectValue = selectCat.value
    const prixInputValue = inputPrix.value
    const dateInputValue = inputDate.value

    if (!catSelectValue) {
      alert("Veuillez sélectionner une catégorie.")
      return
    }

    if (!prixInputValue || prixInputValue <= 0) {
      alert("Veuillez entrer un montant valide.")
      return
    }

    totalDepense += parseInt(prixInputValue)

    console.log(totalDepense)

    pushAjout(titleInputValue, descInputValue, catSelectValue,
      prixInputValue, dateInputValue)

})

}

function pushAjout(titre, desc, cat, prix, date) {
  data.push({
    title: titre,
    description: desc,
    category: cat,
    price: prix,
    date: date
  })
  clean()
  afficherRevenu()
  afficherAccueil()
  afficherListe()
  afficherGraph()
  
  const camembert = document.querySelector("#myChart")
  camembert.style.display = "block"
}

function afficherListe() {
  const divAfficher = document.createElement("div")
  divAfficher.classList.add("divAfficher")

  app.appendChild(divAfficher)

  if (data.length > 0) {
    for (let i = 0; i < data.length; i ++) {
      const divCard = document.createElement("div")
      divCard.classList.add("divCard")
      divAfficher.appendChild(divCard)

      const buttonSupprimer = document.createElement("button")
      buttonSupprimer.innerText = "X"
      divCard.appendChild(buttonSupprimer)
      buttonSupprimer.id = "buttonSupprimer"

      const titleCard = document.createElement("h2")
      titleCard.innerText = data[i].title
      divCard.appendChild(titleCard)
      
      const descCard = document.createElement("p")
      descCard.innerText = data[i].description
      divCard.appendChild(descCard)

      const catCard = document.createElement("p")
      catCard.innerText = data[i].category
      divCard.appendChild(catCard)

      const prixCard = document.createElement("p")
      prixCard.innerText = data[i].price
      divCard.appendChild(prixCard)

      const dateCard = document.createElement("p")
      dateCard.innerText = data[i].date
      divCard.appendChild(dateCard)

      buttonSupprimer.addEventListener("click", () => {
        
        data.splice(i, 1)
        divCard.remove()
        clean()
        afficherRevenu()
        afficherAccueil()
        afficherListe()
        afficherGraph()

      })
    }
  }
}

function clean() {
  while(titleApp.nextSibling) {
    titleApp.nextSibling.remove()
  }
}

function getCategoryExpenses(data) {
  const categoryExpenses = {};

  data.forEach(item => {
    if (categoryExpenses[item.category]) {
      categoryExpenses[item.category] += Number(item.price);
    } else {
      categoryExpenses[item.category] = Number(item.price);
    }
  });

  return categoryExpenses;
}

function afficherGraph() {


const categoryExpenses = getCategoryExpenses(data);


const categ = Object.keys(categoryExpenses);
const expenses = Object.values(categoryExpenses);


const camembertData = [{
  labels: categ, 
  values: expenses, 
  type: 'pie'
}];



var layout = {
  height: 400,
  width: 500,
  paper_bgcolor: 'rgba(0,0,0,0)', // Fond du graphique
  plot_bgcolor: 'rgba(0,0,0,0)', // Fond du plot
  font: {
      color: 'white'
}}

Plotly.newPlot('myChart', camembertData, layout);

}
