const Service = require('../models/Service');

const services = [
  {
    name: "Подготовка кузова",
    slug: "service-preparation",
  },
  {
    name: "Покраска кузова",
    slug: "service-painting",
  },
  {
    name: "Полировка кузова",
    slug: "service-polishing",
  },
  {
    name: "Вклейка и полировка стёкол",
    slug: "service-paste",
  },
  {
    name: "Ремонт пластика",
    slug: "service-plastic-repair",
  },
  {
    name: "Аэрозоли",
    slug: "service-aerosols",
  },
  {
    name: "Антикоррозионная защита",
    slug: "service-anti-corrosion-protection",
  },
  {
    name: "Шумоизоляция",
    slug: "service-noise-insulation",
  },
  {
    name: "Средства индивидуальной защиты",
    slug: "service-protect",
  },
  {
    name: "Автокосметика",
    slug: "service-cosmetics",
  }
  
];

async function seedService() {
  for (const service of services) {
    const [cat, created] = await Service.findOrCreate({
      where: { slug: service.slug },
      defaults: service
    });

    if (created) {
      console.log(`Категория "${service.name}" добавлена.`);
    } else {
      console.log(`Категория "${service.name}" уже существует.`);
    }
  }
}

module.exports = seedService;
