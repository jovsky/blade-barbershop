import Service from "../service/Service";

const services: Service[] = [
  {
    id: 1,
    name: "Viking Cut",
    description:
      "Come get a Viking cut, with a blade to the skin and warrior style. Leave ready to face any battle with a look that commands respect.",
    price: 55,
    slots: 3,
    imageURL: "/services/haircut.jpg",
  },
  {
    id: 2,
    name: "Lumberjack Beard",
    description:
      "Come get your lumberjack beard treated, with precise trimming and true macho style. Leave with a beard that commands respect and makes even trees tremble.",
    price: 45,
    slots: 2,
    imageURL: "/services/beard-trim.jpg",
  },
  {
    id: 3,
    name: "Brutal Claws",
    description:
      "Come turn your bear paws into wolf claws. Our Men's Manicure & Pedicure service is as brutal as you are, but with a touch of class.",
    price: 40,
    slots: 2,
    imageURL: "/services/manicure-pedicure.jpg",
  },
  {
    id: 4,
    name: "Alpha Combo",
    description:
      "Our 'Alpha' combo includes a Viking haircut, a lumberjack beard trim, and gladiator manicure & pedicure. Leave ready to face any battle with style and sharp nails.",
    price: 95,
    slots: 2,
    imageURL: "/services/combo.jpg",
  },
  {
    id: 5,
    name: "Little Hunter",
    description:
      "Transform your little adventurer into a mini hunter, with a haircut full of attitude and style. Sharp hair like a guitar and cool like a Harley.",
    price: 60,
    slots: 2,
    imageURL: "/services/kids-haircut.jpg",
  },
  {
    id: 6,
    name: "Root Groom",
    description:
      "Prepare for the big day with a treatment worthy of a true road warrior. Sharp haircut, lumberjack beard trim, and biker manicure, all while you relax to the sound of heavy rock.",
    price: 189,
    slots: 2,
    imageURL: "/services/groom-day.jpg",
  },
];

export default services;
