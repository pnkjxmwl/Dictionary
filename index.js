
const inputEl= document.getElementById('input')
const infotextEl=document.getElementById('info-text')
const titleEl=document.getElementById('title');
const meaningEL=document.getElementById('meaning');
const audioEl=document.getElementById('audio');
const meaningContainerEl=document.getElementById('meaning-container')

async function fetchAPI(word){
    try {
    infotextEl.style.display="block";
    meaningContainerEl.style.display='none'
    infotextEl.innerText=`Searching the meaning of "${word}"`;
    const url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    const result= await fetch(url).then((res)=>res.json());

    if(result.title){
        meaningContainerEl.style.display='block'
        titleEl.innerText=word;
        meaningEL.innerText="N/A";
        audioEl.style.display='none';
        infotextEl.style.display="none";
    }
    else{
    infotextEl.style.display="none";
    meaningContainerEl.style.display='block'
    audioEl.style.display="inline-flex";
    titleEl.innerText=result[0].word;
    meaningEL.innerText=result[0].meanings[0].definitions[0].definition;
    if(result[0].phonetics[0].audio==="") {
            audioEl.style.display='none';
    }
    audioEl.src=result[0].phonetics[0].audio;
    
    }
    } catch (error) {
        infotextEl.innerText=`An Error Happened,try again later`;
    }
}
inputEl.addEventListener("keyup",(e)=>{
    if(e.target.value && e.key==="Enter"){
        fetchAPI(e.target.value)
    }
})

