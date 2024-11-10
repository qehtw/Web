import React, { createContext, useState } from "react";

export const allGrocieries = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Apple",
      price: 1.2,
      description:
        "I have a pen I have an apple ah applepen. Applepen Pineapple pen ahhhh Pen pineapple applepen",
      category: "Fruits",
      image: require("../images/Apple.jpg"),
    },
    {
      id: 2,
      name: "Banana",
      price: 0.5,
      description: "Цей фрукт був в таких місцях про які не згадують.....",
      category: "Fruits",
      image: require("../images/Banana.jpg"),
    },
    {
      id: 3,
      name: "Carrot",
      price: 0.8,
      description: "Це в якомусь смислі брат банана",
      category: "Vegetables",
      image: require("../images/Carrot.jpg"),
    },
    {
      id: 4,
      name: "Broccoli",
      price: 1.5,
      description: "О боже хто його взагалі придумав",
      category: "Vegetables",
      image: require("../images/Broccoli.jpg"),
    },
    {
      id: 5,
      name: "Milk",
      price: 1.3,
      description:
        "Завдяки жертві одного з коментаторів ми дізналися що неможна пити молоко і їсти огірок одночасно",
      category: "Dairy",
      image: require("../images/Milk.jpg"),
    },
    {
      id: 6,
      name: "Cheese",
      price: 2.5,
      description:
        "Одного разу cир сказав:'Сенс життя — це питання, яке турбує людей із давніх-давен. Кожен намагається знайти свою відповідь, яка могла б задовольнити серце і розум. Для деяких сенс життя полягає в досягненні успіху та матеріального добробуту, для інших — у взаємних стосунках і допомозі іншим. Є й ті, хто вважає, що справжній сенс полягає у внутрішньому розвитку та духовному пошуку.Але чи існує універсальна відповідь? Мабуть, ні. Сенс життя може змінюватися залежно від особистих переконань, досвіду та ситуацій. Можливо, він полягає в самому процесі пошуку, у здатності жити тут і зараз, відчуваючи кожну мить, насолоджуючись дрібницями, що роблять наш день яскравим.Важливо не забувати, що сенс життя — це не лише досягнення чогось великого, але й здатність бути вдячним за кожен момент, за людей навколо, за можливість змінювати себе та світ на краще. І іноді відповідь на це питання може бути зовсім простою: сенс життя — це жити і бути живим, любити і бути улюбленим, шукати і знаходити, ставити питання і знаходити відповіді, навіть якщо вони змінюються з часом.'",
      category: "Dairy",
      image: require("../images/Cheese.jpg"),
    },
    {
      id: 7,
      name: "Pineapple",
      price: 2.5,
      description:
        "I have a pen I have pineapple ahhhh pineapple pen. Applepen Pineapple pen ahhhh Pen pineapple applepen",
      category: "Fruits",
      image: require("../images/Pineapple.jpg"),
    },
    {
      id: 8,
      name: "КОКОСИ",
      price: 300,
      description:
        "Одного разу, ці чудові кокоси були вирощені на фермі, а пізніше продані в рабство Назару. Наскільки нам відомо двох кокосів він вже з'їв, а один все ще лежить в нього в рабстві і ніхто не знає чи він мертвий чи все ще очікує своєї смерті. Очевидці говорили що по ночам чути як цей кокос катається по гуртожитку і благає з'їсти його, але ше нікому не вдалося сфотографувати його, тому ми просимо якісь THREE HUNDRED BUCKS на спонсорство порятунку кокоса з лап цього злодія. Запам'ятайте на все життя, його ім'я Назарій Скібицький",
      category: "COCONUTS",
      image: require("../images/КОКОСИ.jpg"),
    },
    {
      id: 9,
      name: "КУКУРУДЗА",
      price: 2,
      description:"Ця банка кукурузи була названа в честь нашого Гетьмана і ікони цього сайту, що означає любий хто з'їсть її отримає силу яку неможливо отримати власними силами. Ходять плітки що плітки почали ходити бо з'їли кукурудзи, а також, в неї є брат якого звати горошок. Їх обох назвали в честь найкращих людей нашого століття ",
      category: "Fruits",
      image: require("../images/кукурудза.jpg"),
    },
  ]);

  return (
    <allGrocieries.Provider value={{ items, setItems }}>
      {children}
    </allGrocieries.Provider>
  );
};
