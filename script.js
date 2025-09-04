const loadLessons=() =>{
    fetch("https://openapi.programming-hero.com/api/levels/all") //promise
    .then((res) => res.json()) //promise of json
    .then((json) => displayLessons(json.data));
};

const removeActive=() =>{
    const lessonButton=document.querySelectorAll(".lesson-btn")
    //console.log(lessonButton);

    lessonButton.forEach(btn => btn.classList.remove("active"));
}

const loadLevelWord=(id) =>{
    
    const url=`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActive();
       const bottonBtn=document.getElementById(`lessons-btn-${id}`);
       
      bottonBtn.classList.add("active");

        displaylevlWOrd(data.data);
    });
        
        
};

 const loaWordDetail= async(id)=>{
    const url=`https://openapi.programming-hero.com/api/word/${id}`;
    //console.log(url);
    const res= await fetch(url);
    const details=await res.json();
    displaywordDetails(details.data);

 };
 const displaywordDetails=(word) =>{
    console.log(word);
    const detailBox=document.getElementById("details-container");
    detailBox.innerHTML=`
    <div class="">
          <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
        </div>
        <div class="">
          <h2 class=" font-bold">Meaning</h2>
          <p>${word.meaning}</p>
        </div>
         <div class="">
          <h2 class=" font-bold">Examples</h2>
          <p>${word.sentence}</p>
        </div>
         <div class="">
          <h2 class=" font-bold">Synonym</h2>
          <span class="btn">syn1</span>
             <span class="btn">syn1</span>
                <span class="btn">syn1</span>
        </div> `;


    document.getElementById("my_modal_5").showModal();

 };

const displaylevlWOrd=(words) =>{
    const wordContainer=document.getElementById("word-container");
    wordContainer.innerHTML="";

    if(words.length===0){
         wordContainer.innerHTML=`
         <div class="text-center  col-span-full rounded-xl py-10 space-y-6">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">

              <p class="font-bangla text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
              <h2 class="text-4xl font-bold">নেক্সট Lesson এ যান</h2>
            </div>
         `;
        return;
    }

    words.forEach(word =>{
       // console.log(word);
        const cards=document.createElement("div");
        cards.innerHTML=`
        <div class="bg-white rounded-xl shadow-sm text-center py-20 px-5 space-y-4">
              <h2 class="text-2xl font-bold">${word.word ? word.word :"শব্দ  পাওয়া যায়নি"}</h2>
              <p class="font-semibold">Meaning /Pronounciation</p>
              

              <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning:"অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation:"Pronunciation পাওয়া যায়নি "}"</div>
              <div class="flex justify-between items-center">
                <button onclick="loaWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>

              </div>

            </div>
        `;
        wordContainer.append(cards);

    });

    

};
const displayLessons=(lessons)=>{
    // 1.get the container & empty
    const levelContainer=document.getElementById("level-container");
    levelContainer.innerHTML="";

    // 2.get evey element
    for(let lesson of lessons){


        // 3.crate a element
        const  btnDiv=document.createElement("div");
        btnDiv.innerHTML=`  
        
            <button id="lessons-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"> <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
          </button>
        `;
 

    // 4.append into container
    levelContainer.append(btnDiv)

    }
    


};

loadLessons();