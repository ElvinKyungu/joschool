//sélectionner tous les éléments requis
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// si le bouton startQuiz est cliqué
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

// si le bouton exitQuiz est cliqué
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //masquer la boîte d'informations
}

// si le bouton ContinueQuiz est cliqué
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //masquer la boîte d'informations
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuestions(0); //Appeler la fonction showQestions
    queCounter(1); //passer 1 paramètre à queCounter
    startTimer(15); //appeler la fonction startTimer
    startTimerLine(0); //Appeler la fonction startTimerLine
}

let timeValue =  20;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 20; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count); //Appeler la fonction showQestions
    queCounter(que_numb); //On passe la valeur que_numb à queCounter
    clearInterval(counter); //On efface le counter
    clearInterval(counterLine); //On efface counterLine
    startTimer(timeValue); //On appelle la fonction startTimer
    startTimerLine(widthValue); //On appelle la fonction startTimerLine 
    timeText.textContent = "Time Left"; //changer le texte de timeText en temps restant
    next_btn.classList.remove("show"); //On masque le button suivant
}

// si le bouton quitterQuiz a été cliqué
quit_quiz.onclick = ()=>{
    window.location.reload(); //recharger la fenêtre en cours
}

const next_btn = document.querySelector("div.footer .next_btn");
const bottom_ques_counter = document.querySelector("div.footer .total_que");

// si le bouton Next Que a été cliqué
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //si le nombre de questions est inférieur à la longueur totale de la question
        que_count++; //incrémenter la valeur que_count
        que_numb++; //incrémenter la valeur que_numb
        showQuestions(que_count); //appeler la fonction showQestions
        queCounter(que_numb); //Passer la valeur de que_numb à queCounter
        clearInterval(counter); //Effacer counter
        clearInterval(counterLine); //Effacer counterLine
        startTimer(timeValue); //Appeler la fonction startTimer 
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //Effacer counter
        clearInterval(counterLine); //Effacer counterLine
        showResult(); //Appeler la fonction showResult 
    }
}

// obtenir des questions et des options à partir du tableau
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");

    // Créer une nouvelle balise span et div pour la question et l'option et passer la valeur en utilisant l'index du tableau
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    que_text.innerHTML = que_tag; // Ajouter une nouvelle balise span à l'intérieur du tag que_tag
    option_list.innerHTML = option_tag; // Ajouter une nouvelle balise div à l'intérieur du tag option_tag

    const option = option_list.querySelectorAll(".option");

    // Définir l'attribut «onclick» pour toutes les options disponibles
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// créer les nouvelles balises div qui pour les icônes
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';
 // Si l'utilisateur a cliqué sur une option
 function optionSelected(answer){
    clearInterval(counter); // effacer le compteur
    clearInterval(counterLine); // effacer counterLine
    let userAns = answer.textContent; // récupération de l'option sélectionnée par l'utilisateur
    let correcAns = questions[que_count].answer; // récupération de la réponse correcte à partir du tableau
    const allOptions = option_list.children.length; // récupération de tous les éléments d'option

    if(userAns == correcAns){ // si l'option sélectionnée par l'utilisateur est égale à la réponse correcte du tableau
        userScore += 1; // amélioration de la valeur du score de 1
        answer.classList.add("correct"); // ajout de la couleur verte à l'option sélectionnée correctement
        answer.insertAdjacentHTML("beforeend", tickIconTag); // ajout de l'icône de coche à l'option sélectionnée correctement
        console.log("Réponse correcte");
        console.log("Vos réponses correctes = " + userScore);
    }else{
        answer.classList.add("incorrect"); // ajout de la couleur rouge à l'option sélectionnée incorrectement
        answer.insertAdjacentHTML("beforeend", crossIconTag); // ajout de l'icône de croix à l'option sélectionnée incorrectement
        console.log("Réponse fausse");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ // si il y a une option qui correspond à une réponse du tableau
                option_list.children[i].setAttribute("class", "option correct"); // ajout de la couleur verte à l'option correspondante
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // ajout de l'icône de coche à l'option correspondante
                console.log("Sélection automatique de la réponse correcte.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); // une fois que l'utilisateur sélectionne une option, toutes les options sont désactivées
    }
    next_btn.classList.add("show"); // affiche le bouton suivant si l'utilisateur a sélectionné une option
}

function showResult(){
    info_box.classList.remove("activeInfo"); //Masquer la boîte d'informations
    quiz_box.classList.remove("activeQuiz"); //Masquer la boîte de quiz
    result_box.classList.add("activeResult"); //Montrer la boîte de résultat
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ //Si l'utilisateur a marqué plus de 3
        //Créer un nouveau tag span et passer le nombre de points de l'utilisateur et le nombre total de questions
        let scoreTag = '<span>et félicitations!, Vous avez eu <p>'+ userScore +'</p> sur <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag; //Ajouter le nouveau tag span à l'intérieur de score_Text
    }
    else if(userScore > 1){ //Si l'utilisateur a marqué plus de 1
        let scoreTag = '<span>et bien, Vous avez eu <p>'+ userScore +'</p> sur <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ //si l'utilisateur a marqué moins de 1
        let scoreTag = "<span>et désolé, Vous n'avez eu que <p>"+ userScore +"</p> sur <p>"+ questions.length +"</p></span>";
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changer la valeur de timeCount avec la valeur de temps
        time--; //décrémenter la valeur du temps
        if(time < 9){ //si la minuterie est inférieure à 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //ajouter un 0 avant la valeur de l'heure
        }
        if(time < 0){ //si la minuterie est inférieure à 0
            clearInterval(counter); //Effacer counter
            timeText.textContent = "Temps fini"; //changer le texte de l'heure en temps libre
            const allOptions = option_list.children.length; //obtenir tous les éléments d'option
            let correcAns = questions[que_count].answer; //obtenir la bonne réponse du tableau
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //s'il y a une option qui correspond à une réponse de tableau
                    option_list.children[i].setAttribute("class", "option correct"); //ajouter la couleur verte à l'option correspondante
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //ajouter une icône de coche à l'option correspondante
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //une fois que l'utilisateur a sélectionné une option, il a désactivé toutes les options
            }
            next_btn.classList.add("show"); //afficher le bouton suivant si l'utilisateur a sélectionné une option
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //mise à jour de la valeur de temps avec 1
        time_line.style.width = time + "px"; //augmentation de la largeur de time_line avec px par valeur de temps
        if(time > 549){ //si la valeur de temps est supérieure à 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounter(index){
    //créer une nouvelle balise span et transmettre le numéro de la question et la question totale
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //ajout d'une nouvelle balise span dans bottom_ques_counter
}