
const searchTrem = document.getElementById("searchTerm");
searchTrem.addEventListener("input", ()=>{
  

const searchBtn = document.getElementById("searchBtn")
  if (searchTrem.value.trim().length>0) {
    searchBtn.style.display= "block";
  }else{
    searchBtn.style.display= "none";
  }
})

// API Handle Using the GOOGLE GEMINI API
const dataChat = [];
const fetchResult= async()=>{
    let chat = document.getElementById("searchTerm").value;
    document.getElementById("intro-text").style.display = "none";
    console.log(chat)
    
    document.getElementById("searchTerm").value = "";


    AddChat("user",chat)

    // Adding loading until get result 
    const loading = document.createElement("div")
    loading.className = `message AI`
    loading.id = `loading`;
    loading.innerHTML =  `<img src="Loading.png" width= "200"/>`;
    document.getElementById("chat-AI").appendChild(loading);

        document.getElementById("loading").scrollIntoView({behavior:"smooth", block: "center"})


    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-goog-api-key': 'AIzaSyCH2o07TaQlnq5H6sKNCQxGy6agmQH2O-s'
    
  },
  // body: '{\n    "contents": [\n      {\n        "parts": [\n          {\n            "text": "Explain how AI works in a few words"\n          }\n        ]\n      }\n    ]\n  }',
  body: JSON.stringify({
    'contents': [
      {
        'parts': [
          {
            'text': chat
          }
        ]
      }
    ]
  })
});
let result = await response.json();
let finalResponse = result.candidates[0].content.parts[0].text;
dataChat.push({
    user: chat,
    AIResponse: finalResponse
})



console.log(finalResponse); 
console.log(dataChat)
document.getElementById("loading")?.remove();    // Removing loading after geting result 
AddChat("ai",marked.parse(finalResponse));
searchhistorymanger()

}



//ADDING CHGAT on the  Messagebox
const AddChat=(sender, chat)=>{
     const msgElement = document.createElement("div");
     msgElement.className =`${sender}`;
     msgElement.innerHTML = `<p>${chat} </p>`;
     console.log(msgElement)
     document.getElementById("chat-AI").appendChild(msgElement);
}


// In NavBar  adding search history
const searchhistorymanger=()=>{
    const container = document.getElementById("searchHstory");
    container.innerHTML = "";
    for(let i=0; i<= dataChat.length;i++){
        if(dataChat[i].user){
            const history = document.createElement("div");
            history.className = "history";
            history.innerText = dataChat[i].user
            container.appendChild(history)
        }
    }
}




// New chat 

const newchat=()=>{
  const IsConform =  confirm("When you start a new chat, your current one won't be saved. Sign in to save your future chats.")

  if(IsConform){
    const dataChat = [];
    document.getElementById("chat-AI").innerHTML = "";
    document.getElementById("searchHstory").innerHTML = "";
    document.getElementById("intro-text").style.display= "block";
  }
  else{

  }
}


// Microphone Things

const micBtn= document.getElementById("voice-inpute");
const InputeField =  document.getElementById("searchTerm");


const SpeechRecord = window.SpeechRecognition || window.webkitSpeechRecognition;


if (SpeechRecord) {
  console.log("ok")
    const recognation = new SpeechRecord();
    recognation.lang = "en-US";
    recognation.continous = false;
    recognation.interimResult = false;


    micBtn.addEventListener("click", ()=>{
      recognation.start();
      micBtn.style.color= "red";
      micBtn.style. background= "#f7f6f6";
    })

    recognation.onresult = (event)=>{
      const transcript = event.results[0][0].transcript;
      InputeField.value = transcript;
      micBtn.style.color= "black";

    }

    recognation.onerror = (event)=>{
      console.error(event.error);
       micBtn.style.color= "black";
    }

    recognation.onend = ()=>{
         micBtn.style.color= "black";
    }
}else{
  alert("Your browser doesn't support voice recognition.")
}