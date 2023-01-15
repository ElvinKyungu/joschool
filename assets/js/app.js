let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu-btn').onclick = () =>{
    
    let iconNavBar = document.querySelector('.fi-rr-menu-burger');

    iconNavBar.classList.toggle('fi-ss-cross')

    navbar.classList.toggle('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
}
let textContentCategory = document.querySelectorAll(".category-card");
let ContentCategory = document.querySelector('.content-category span')

const textCategory = {
    independance: "Rejoindre Joboy School, c’est faire le choix d’une grande école indépendante, associative et labélisée EESPIG (uniquement 64 établissements en France). La qualification EESPIG nous distingue des autres établissements privés... Pas de dividendes versés à des investisseurs ; le seul profit recherché est celui de nos étudiants pour la construction de leur avenir professionnel.",
    historique: "Fondée en 1936, Joboy School n’a eu de cesse d'évoluer au fil des avancées technologiques... Elle est devenue l’école référente dans le numérique et compte plus de 14 500 Alumni.",
    renommee : "Chaque année, Joboy School figure parmi les meilleures écoles du numérique : 1ère école privée d’ingénieurs en informatique (palmarès Le Figaro Étudiant 2022). En tant qu’école composante du grand établissement Panthéon-Assas Université, nos diplômes sont reconnus en France et à l’international.",
    numerique: "Joboy School s’engage à former des futurs ingénieurs et experts du numérique grâce à de solides bases technologiques associées à de fortes compétences linguistiques, en communication et soft skills. Cet équilibre entre savoir-faire et savoir-être permet à nos étudiants de se démarquer, de s’adapter aux besoins des entreprises et de s’épanouir dans un contexte international.",
    unique: "Notre méthode pédagogique basée sur les projets, nos 65 associations et clubs, la combinaison de Soft Skills et technique et notre programme professionnalisant de Learning Expérience rendent unique l’expérience Joboy School. De plus tous nos étudiants sont suivis par un référent réussite étudiante pour les accompagner dans l’accomplissement de leurs projets et les mettre sur le chemin du succès."
}

ContentCategory.innerText = textCategory.independance;
textContentCategory.forEach(acco =>{
    acco.onclick = () =>{
        
        if(acco.id === "independance"){
            ContentCategory.innerText = textCategory.independance;
        }else if(acco.id === "historique"){
            ContentCategory.innerText = textCategory.historique;
        }else if(acco.id === "renommee"){
            ContentCategory.innerText = textCategory.renommee;
        }else if(acco.id === "numerique"){
            ContentCategory.innerText = textCategory.numerique;
        }else if(acco.id === "unique"){
            ContentCategory.innerText = textCategory.unique;
        }
    };
});