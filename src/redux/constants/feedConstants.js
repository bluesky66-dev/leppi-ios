import FoodBeverage from "../../images/Food-Beverage.png";
import CleaningProduct from "../../images/Cleaning-Products.png";
import HygienePerfumery from "../../images/Hygiene-Perfumery.png";
import DocumentPrinting from "../../images/Document-Printing.png";
import IconRide from "../../images/Ride.png";
import IconSandwich from "../../images/sandwich.png";
import IconDog from "../../images/dog.png";
import ServiceProfessionals from "../../images/Service-Professionals.png";
import NegotiateThings from "../../images/Negotiate-Things.png";
import IconPancakes from "../../images/pancakes.png";
import IconRunning from "../../images/running.png";
import IconClassroom from "../../images/classroom.png";
import IconWashingMachine from "../../images/washing-machine.png";
import IconDrill from "../../images/drill.png";
import IconHeart from "../../images/heart.png";
import IconHospital from "../../images/hospital.png";

export const FeedCategories = [
    {
        key: 'tobacconist',
        name: 'Doces e Sobremesas',
        icon: IconPancakes
    },
    {
        key: 'mealsAndDesserts',
        name: 'Refeições e Comida Boa',
        icon: IconSandwich
    },
    {
        key: 'foodAndDrinks',
        name: 'Alimentos e Bebidas',
        icon: FoodBeverage
    },
    {
        key: 'negotiateThings',
        name: 'Negocie de Tudo',
        icon: ServiceProfessionals
    },
    {
        key: 'serviceAndProfessionals',
        name: 'Serviços e Profissionais',
        icon: NegotiateThings
    },
    {
        key: 'drill',
        name: 'Pedir emprestado/alugar qualquer coisa',
        icon: IconDrill
    },
    {
        key: 'documentAndPrinting',
        name: 'Impressão de Documentos',
        icon: DocumentPrinting
    },
    {
        key: 'cleaningProduct',
        name: 'Produtos de Limpeza',
        icon: CleaningProduct
    },
    {
        key: 'hygieneAndPerfumery',
        name: 'Higiene e Perfumaria',
        icon: HygienePerfumery
    },
    {
        key: 'animals',
        name: 'Pet Shop',
        icon: IconDog
    },
    {
        key: 'washing-machine',
        name: 'Lavar Roupa',
        icon: IconWashingMachine
    },
    {
        key: 'life-insurance',
        name: 'Vaga Garagem',
        icon: IconRide
    },
    {
        key: 'running',
        name: 'Praticar Esportes',
        icon: IconRunning
    },
    {
        key: 'heart',
        name: 'Causas Sociais e Filantropia',
        icon: IconHeart
    },
    {
        key: 'hospital',
        name: 'Saúde e Bem Estar',
        icon: IconHospital
    },
    {
        key: 'coursesLectures',
        name: 'Cursos e Palestras',
        icon: IconClassroom
    }
];

export const FeedTypes = {
    solicitation: 'SOLICITATION',
    sell: 'SELL',
};
