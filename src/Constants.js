class Constants {
    static TOTAL_QUESTIONS = 675;
    static TOATL_SAMPLE = 900;
    static QUESTIONS_NEED_TO_BE_ANSWERED = [
        "Q21r1",
        "SEXE",
        "AGE",
    ];

    // extra questions
    static ADDITIONAL_QUESTIONS = [
        { id: 'Autre1', question: 'Êtes-vous un nouveau entrepreneur ?', reponseText: ["non", "oui"], reponseValue: [0, 1] },
        { id: 'Autre2', question: "Avez vous fait une étude de cas d'entreprise ?", reponseText: ["non", "oui"], reponseValue: [0, 1] },
        { id: 'Autre3', question: "Avec vous un plan d'affaire ?", reponseText: ["non", "oui"], reponseValue: [0, 1] },
        { id: 'Autre4', question: "Avez vous fait une analyse sur le retour d'investissement ?", reponseText: ["non", "oui"], reponseValue: [0, 1] },
        { id: 'Q21r1', question: 'Quels sont les obstacles les plus importants que vous pensez avoir à surmonter pour lancer votre entreprise ? - Obtenir du financement', reponseText: ["non", "oui"], reponseValue: [0, 1] },
        { id: 'SEXE', question: 'Quel est votre sexe à la naissance ?', reponseText: ['Masculin', 'Féminin'], reponseVariable: [1, 2] },
        { id: 'AGE', question: 'Quel âge avez-vous ?', reponseText: ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"], reponseVariable: [1, 2, 3, 4, 5, 6] },
    ];

    static ALL_QUESTION = null;
}

export { Constants };