const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

const path = require('path')
app.use('/static', express.static(path.join(__dirname,'public')))


let groceries = [
  {
    id: 1,
    name: "Apple",
    price: 1.2,
    description:
      "I have a pen I have an apple ah applepen. Applepen Pineapple pen ahhhh Pen pineapple applepen",
    category: "Fruits",
    image: "/static/images/Apple.jpg",

  },
  {
    id: 2,
    name: "Banana",
    price: 0.5,
    description: "Цей фрукт був в таких місцях про які не згадують.....",
    category: "Fruits",
    image: "/static/images/Banana.jpg",
  },
  {
    id: 3,
    name: "Carrot",
    price: 0.8,
    description: "Це в якомусь смислі брат банана",
    category: "Vegetables",
    image: "/static/images/Carrot.jpg",
  },
  {
    id: 4,
    name: "Broccoli",
    price: 1.5,
    description: "О боже хто його взагалі придумав",
    category: "Vegetables",
    image: "/static/images/Broccoli.jpg",
  },
  {
    id: 5,
    name: "Milk",
    price: 1.3,
    description:
      "Завдяки жертві одного з коментаторів ми дізналися що неможна пити молоко і їсти огірок одночасно",
    category: "Dairy",
    image: "/static/images/Milk.jpg",
  },
  {
    id: 6,
    name: "Cheese",
    price: 2.5,
    description:
      "Одного разу cир сказав:'Сенс життя — це питання, яке турбує людей із давніх-давен. Кожен намагається знайти свою відповідь, яка могла б задовольнити серце і розум. Для деяких сенс життя полягає в досягненні успіху та матеріального добробуту, для інших — у взаємних стосунках і допомозі іншим. Є й ті, хто вважає, що справжній сенс полягає у внутрішньому розвитку та духовному пошуку.Але чи існує універсальна відповідь? Мабуть, ні. Сенс життя може змінюватися залежно від особистих переконань, досвіду та ситуацій. Можливо, він полягає в самому процесі пошуку, у здатності жити тут і зараз, відчуваючи кожну мить, насолоджуючись дрібницями, що роблять наш день яскравим.Важливо не забувати, що сенс життя — це не лише досягнення чогось великого, але й здатність бути вдячним за кожен момент, за людей навколо, за можливість змінювати себе та світ на краще. І іноді відповідь на це питання може бути зовсім простою: сенс життя — це жити і бути живим, любити і бути улюбленим, шукати і знаходити, ставити питання і знаходити відповіді, навіть якщо вони змінюються з часом.'",
    category: "Dairy",
    image: "/static/images/Cheese.jpg",
  },
  {
    id: 7,
    name: "Pineapple",
    price: 2.5,
    description:
      "I have a pen I have pineapple ahhhh pineapple pen. Applepen Pineapple pen ahhhh Pen pineapple applepen",
    category: "Fruits",
    image: "/static/images/Pineapple.jpg",
  },
  {
    id: 8,
    name: "КОКОСИ",
    price: 300,
    description:
      "Одного разу, ці чудові кокоси були вирощені на фермі, а пізніше продані в рабство Назару. Наскільки нам відомо двох кокосів він вже з'їв, а один все ще лежить в нього в рабстві і ніхто не знає чи він мертвий чи все ще очікує своєї смерті. Очевидці говорили що по ночам чути як цей кокос катається по гуртожитку і благає з'їсти його, але ше нікому не вдалося сфотографувати його, тому ми просимо якісь THREE HUNDRED BUCKS на спонсорство порятунку кокоса з лап цього злодія. Запам'ятайте на все життя, його ім'я Назарій Скібицький",
    category: "COCONUTS",
    image: "/static/images/КОКОСИ.jpg",
  },
  {
    id: 9,
    name: "КУКУРУДЗА",
    price: 2,
    description:"Ця банка кукурузи була названа в честь нашого Гетьмана і ікони цього сайту, що означає любий хто з'їсть її отримає силу яку неможливо отримати власними силами. Ходять плітки що плітки почали ходити бо з'їли кукурудзи, а також, в неї є брат якого звати горошок. Їх обох назвали в честь найкращих людей нашого століття ",
    category: "Fruits",
    image: "/static/images/кукурудза.jpg",
  }
]

app.get('/api/groceries', (req, res) => {
  const { search, sort, category } = req.query;

  let filteredGroceries = groceries;

  // Apply search filter
  if (search) {
    const searchLower = search.trim().toLowerCase();
    filteredGroceries = filteredGroceries.filter(item =>
      item.name.toLowerCase().includes(searchLower)
    );
  }

  // Apply category filter
  if (category) {
    filteredGroceries = filteredGroceries.filter(item =>
      item.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (sort === 'asc') {
    filteredGroceries.sort((a, b) => a.price - b.price);
  } else if (sort === 'desc') {
    filteredGroceries.sort((a, b) => b.price - a.price);
  }

  res.json(filteredGroceries);
});

app.get('/api/groceries/:id', (req, res) => {
  const { id } = req.params;
  const grocery = groceries.find(p => p.id === parseInt(id));

  if (!grocery) {
    return res.status(404).json({ message: 'Item not found' });
  }

  res.json(grocery);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});