// const express = require("express");

const textElement = document.querySelector("#text");
const authorElement = document.querySelector("#author");

// textElement.textContent = randomQuote.content;
// authorElement.textContent = randomQuote.author;


async function displayQuote() {
// const radnIndex = Math.floor(Math.random() * quotes.length);
//   const quote = quotes[radnIndex];

  // const quote = {
  //   content: "More than introversion or logic, though, coding selects for people who can handle endless frustration.",
  //   author: "Clive Thompson"
  // };
  try{
    const response = await fetch(`http://localhost:3000/quotes/random`);
    if(response.ok){
      const data = await response.json();
    

      addQuoteToPage(data);
    }else{
      throw new Error("Something went wrong.")
    }
  }catch(err){
    console.log(err); 
  }
     
    }
  // const response = await fetch(`http://localhost:3000/quotes/random`);
  // const data = await response.json();
  // const randomQuote = data.quote;
  // const AllQuotes = data.allQuotes;

  function addQuoteToPage({quote}) {
    const textElement = document.querySelector("#text");
    const authorElement = document.querySelector("#author");
    
    if (textElement && authorElement) {
      //console.log(quote.text);
      textElement.textContent = quote.text;
      authorElement.textContent = quote.author;
    } else {
      console.error("Text or author element not found.");
    }
  }



async function createNewQuote(e) {
  e.preventDefault();
  const data = {
      text: e.target.name.value,
      author: e.target.author.value 
  }
  const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  }
  const response = await fetch(`http://localhost:3000/quotes`, options);
  if (response.status == 201) {
    console.log(e.target.name.value)
    e.target.name.value = ''

    e.target.author.value = ''
    alert("Quote added.")
  }else{
    alert("Something went wrong.")
  }
}



const form = document.querySelector("#create-form");
form.addEventListener("submit", createNewQuote);

const randomiseButton = document.querySelector("#btn-randomise");
randomiseButton.addEventListener('click', displayQuote);