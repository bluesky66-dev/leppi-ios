import FoodBeverage from "../../images/Food-Beverage.png";
import CleaningProduct from "../../images/Cleaning-Products.png";
import HygienePerfumery from "../../images/Hygiene-Perfumery.png";
import DocumentPrinting from "../../images/Document-Printing.png";
import EventParty from "../../images/Event-Party.png";
import IconSandwich from "../../images/sandwich.png";
import IconDog from "../../images/dog.png";
import ServiceProfessionals from "../../images/Service-Professionals.png";
import IconPromotion from "../../images/promotion.png";
import NegotiateThings from "../../images/Negotiate-Things.png";
import IconRide from "../../images/Ride.png";
import IconPancakes from "../../images/pancakes.png";
import IconRunning from "../../images/running.png";
import IconLifeInsurance from "../../images/life-insurance.png";
import IconWashingMachine from "../../images/washing-machine.png";
import IconDrill from "../../images/drill.png";
import IconHeart from "../../images/heart.png";
import IconHospital from "../../images/hospital.png";

export const FeedCategories = [
    {
        key: 'foodAndDrinks',
        name: 'Alimentos e Bebidas',
        icon: FoodBeverage
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
        key: 'documentAndPrinting',
        name: 'Impressão de Documentos',
        icon: DocumentPrinting
    },
    {
        name: 'Festas e Eventos',
        icon: EventParty
    },
    {
        key: 'mealsAndDesserts',
        name: 'Refeições e Comida Boa',
        icon: IconSandwich
    },
    {
        key: 'animals',
        name: 'Pet Shop',
        icon: IconDog
    },
    {
        key: 'serviceAndProfessionals',
        name: 'Serviços e Profissionais',
        icon: NegotiateThings
    },
    {
        key: 'notices',
        name: 'Avisos',
        icon: IconPromotion
    },
    {
        key: 'negotiateThings',
        name: 'Negocie de Tudo',
        icon: ServiceProfessionals
    },
    {
        key: 'ride',
        name: 'Carona',
        icon: IconRide
    },
    {
        key: 'tobacconist',
        name: 'Doces e Sobremesas',
        icon: IconPancakes
    },
    {
        key: 'running',
        name: 'Praticar Esportes',
        icon: IconRunning
    },
    {
        key: 'life-insurance',
        name: 'Produtos de Bebê',
        icon: IconLifeInsurance
    },
    {
        key: 'washing-machine',
        name: 'Lavar Roupa',
        icon: IconWashingMachine
    },
    {
        key: 'drill',
        name: 'Pedir emprestado/alugar qualquer coisa',
        icon: IconDrill
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
];

export const FeedTypes = {
    solicitation: 'SOLICITATION',
    sell: 'SELL',
};
