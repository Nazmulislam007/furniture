import { faker } from '@faker-js/faker';
import moment from 'moment';

faker.seed(20);

function imgGenerate() {
  return `${faker.image.food()}?random=${Math.round(Math.random() * 1000)}`;
}

function descriptionGenerate() {
  return faker.commerce.productDescription();
}

function specificationGenerate() {
  return {
    Waterproof: 'Yes',
    Thickness: `${Math.round(faker.datatype.float({ max: 30 }))} inches`,
    Underlayment: 'No',
    Feature1: 'Yes',
    Feature2: 'Yes',
    Feature3: '24x12-feet'
  };
}

const tiles = [...Array(20)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.product(),
  catagory: faker.commerce.department(),
  color: faker.color.human(),
  img: `${faker.image.food()}?random=${Math.round(Math.random() * 1000)}`,
  relatedImg: [...Array(3)].map(imgGenerate),
  description: [...Array(5)].map(descriptionGenerate),
  specification: specificationGenerate(),
  vendor: faker.name.firstName(),
  location: faker.address.cityName(),
  createdAt: Math.round(faker.datatype.float({ max: 1000 })),
  price: faker.datatype.float({ max: 100 }),
  'sqft/case': 24,
  'Scratch resistance': ['Heavy', 'Medium', 'Low'][Math.floor(Math.random() * 2)],
  'Color Family': ['Red', 'Blue', 'Brown'][Math.floor(Math.random() * 2)],
  'Gloss level': ['High', 'Medium', 'Low'][Math.floor(Math.random() * 2)],
  'Installation method': ['Click lock', 'rounded'][Math.floor(Math.random() * 1)]
}));

const flooring = [...Array(20)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.product(),
  catagory: faker.commerce.department(),
  color: faker.color.human(),
  img: `${faker.image.food()}?random=${Math.round(Math.random() * 1000)}`,
  relatedImg: [...Array(3)].map(imgGenerate),
  description: [...Array(5)].map(descriptionGenerate),
  specification: specificationGenerate(),
  vendor: faker.name.firstName(),
  createdAt: Math.round(faker.datatype.float({ max: 1000 })),
  location: faker.address.cityName(),
  price: faker.datatype.float({ max: 100 }),
  'sqft/case': 24,
  'Cartridge Valve Type': ['Heavy', 'Medium', 'Low'][Math.floor(Math.random() * 2)],
  'Color Family': ['Red', 'Blue', 'Brown'][Math.floor(Math.random() * 2)],
  'Faucet Finish': ['High', 'Medium', 'Low'][Math.floor(Math.random() * 2)],
  'Number of Handles': Math.round(faker.datatype.float({ max: 5 }))
}));

const vanities = [
  {
    id: faker.datatype.uuid(),
    img: 'https://source.unsplash.com/2dcYhvbHV-M',
    name: 'Venice',
    catagory: 'MSI Countertop',
    relatedImg: [
      'https://source.unsplash.com/2dcYhvbHV-M',
      'https://source.unsplash.com/dbH_vy7vICE',
      'https://source.unsplash.com/nWidMEQsnAQ'
    ],
    createdAt: Math.round(faker.datatype.float({ max: 1000 })),
    color: faker.color.human(),
    vendor: faker.name.firstName(),
    location: faker.address.cityName(),
    description: [
      '100% waterproof - backed by exclusive FloodWarranty',
      'Classic herringbone pattern with easy installation in on-trendcolours and authentic EIR textures',
      'Commercial Finish resists high traffic wear, and features built-in antimicrobial protection',
      'Easy to maintain - a perfect floor for high-use rooms likebedrooms, kitchens, family and living room',
      'Classic herringbone pattern with easy installation in on-trendcolours and authentic EIR textures',
      'Commercial Finish resists high traffic wear, and features built-in antimicrobial protection'
    ],
    price: faker.datatype.float({ max: 100 }),
    'Cartridge Valve Type': ['Heavy', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Color Family': ['Red', 'Blue', 'Brown'][Math.floor(Math.random() * 3)],
    'Faucet Finish': ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Number of Handles': ['Click lock', 'rounded'][Math.floor(Math.random() * 2)],
    specification: {
      Waterproof: 'Yes',
      Thickness: `${Math.round(faker.datatype.float({ max: 30 }))} inches`,
      Underlayment: 'No',
      Feature1: 'Yes',
      Feature2: 'Yes',
      Feature3: 'No'
    }
  },
  {
    id: faker.datatype.uuid(),
    img: 'https://source.unsplash.com/lsdA8QpWN_A',
    name: 'Commoner',
    catagory: 'MSI Countertop',
    relatedImg: [
      'https://source.unsplash.com/lsdA8QpWN_A',
      'https://source.unsplash.com/fZuleEfeA1Q',
      'https://source.unsplash.com/_HqHX3LBN18'
    ],
    createdAt: Math.round(faker.datatype.float({ max: 1000 })),
    color: faker.color.human(),
    vendor: faker.name.firstName(),
    location: faker.address.cityName(),
    description: Array(5).fill(faker.commerce.productDescription()),
    price: faker.datatype.float({ max: 100 }),
    'Cartridge Valve Type': ['Heavy', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Color Family': ['Red', 'Blue', 'Brown'][Math.floor(Math.random() * 3)],
    'Faucet Finish': ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Number of Handles': ['Click lock', 'rounded'][Math.floor(Math.random() * 2)],
    specification: {
      Waterproof: 'Yes',
      Thickness: `${Math.round(faker.datatype.float({ max: 30 }))} inches`,
      Underlayment: 'No',
      Feature1: 'Yes',
      Feature2: 'Yes',
      Feature3: 'No'
    }
  },
  {
    id: faker.datatype.uuid(),
    img: 'https://source.unsplash.com/fZuleEfeA1Q',
    name: 'Alura',
    catagory: 'Counter Center',
    relatedImg: [
      'https://source.unsplash.com/fZuleEfeA1Q',
      'https://source.unsplash.com/dbH_vy7vICE',
      'https://source.unsplash.com/nWidMEQsnAQ'
    ],
    createdAt: Math.round(faker.datatype.float({ max: 1000 })),
    color: faker.color.human(),
    vendor: faker.name.firstName(),
    location: faker.address.cityName(),
    description: Array(5).fill(faker.commerce.productDescription()),
    price: faker.datatype.float({ max: 100 }),
    'Cartridge Valve Type': ['Heavy', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Color Family': ['Red', 'Blue', 'Brown'][Math.floor(Math.random() * 3)],
    'Faucet Finish': ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Number of Handles': ['Click lock', 'rounded'][Math.floor(Math.random() * 2)],
    specification: {
      Waterproof: 'Yes',
      Thickness: `${Math.round(faker.datatype.float({ max: 30 }))} inches`,
      Underlayment: 'No',
      Feature1: 'Yes',
      Feature2: 'Yes',
      Feature3: 'No'
    }
  },
  {
    id: faker.datatype.uuid(),
    img: 'https://source.unsplash.com/_HqHX3LBN18',
    name: 'Venice',
    catagory: 'Floor Brand',
    relatedImg: [
      'https://source.unsplash.com/_HqHX3LBN18',
      'https://source.unsplash.com/FBXuXp57eM0'
    ],
    createdAt: Math.round(faker.datatype.float({ max: 1000 })),
    color: faker.color.human(),
    vendor: faker.name.firstName(),
    location: faker.address.cityName(),
    description: Array(5).fill(faker.commerce.productDescription()),
    price: faker.datatype.float({ max: 100 }),
    'Cartridge Valve Type': ['Heavy', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Color Family': ['Red', 'Blue', 'Brown'][Math.floor(Math.random() * 3)],
    'Faucet Finish': ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Number of Handles': ['Click lock', 'rounded'][Math.floor(Math.random() * 2)],
    specification: {
      Waterproof: 'Yes',
      Thickness: `${Math.round(faker.datatype.float({ max: 30 }))} inches`,
      Underlayment: 'No',
      Feature1: 'Yes',
      Feature2: 'Yes',
      Feature3: 'No'
    }
  },
  {
    id: faker.datatype.uuid(),
    img: 'https://source.unsplash.com/FBXuXp57eM0',
    name: 'Commoner',
    catagory: 'CounterX',
    relatedImg: [
      'https://source.unsplash.com/FBXuXp57eM0',
      'https://source.unsplash.com/NvqYkDPE0Rw'
    ],
    createdAt: Math.round(faker.datatype.float({ max: 1000 })),
    color: faker.color.human(),
    vendor: faker.name.firstName(),
    location: faker.address.cityName(),
    description: Array(5).fill(faker.commerce.productDescription()),
    price: faker.datatype.float({ max: 100 }),
    'Cartridge Valve Type': ['Heavy', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Color Family': ['Red', 'Blue', 'Brown'][Math.floor(Math.random() * 3)],
    'Faucet Finish': ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Number of Handles': ['Click lock', 'rounded'][Math.floor(Math.random() * 2)],
    specification: {
      Waterproof: 'Yes',
      Thickness: `${Math.round(faker.datatype.float({ max: 30 }))} inches`,
      Underlayment: 'No',
      Feature1: 'Yes',
      Feature2: 'Yes',
      Feature3: 'No'
    }
  },
  {
    id: faker.datatype.uuid(),
    img: 'https://source.unsplash.com/FV3GConVSss',
    name: 'Venice',
    catagory: 'FloorDeco',
    relatedImg: [
      'https://source.unsplash.com/FV3GConVSss',
      'https://source.unsplash.com/NvqYkDPE0Rw'
    ],
    createdAt: Math.round(faker.datatype.float({ max: 1000 })),
    color: faker.color.human(),
    vendor: faker.name.firstName(),
    location: faker.address.cityName(),
    description: Array(5).fill(faker.commerce.productDescription()),
    price: faker.datatype.float({ max: 100 }),
    'Cartridge Valve Type': ['Heavy', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Color Family': ['Red', 'Blue', 'Brown'][Math.floor(Math.random() * 3)],
    'Faucet Finish': ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Number of Handles': ['Click lock', 'rounded'][Math.floor(Math.random() * 2)],
    specification: {
      Waterproof: 'Yes',
      Thickness: `${Math.round(faker.datatype.float({ max: 30 }))} inches`,
      Underlayment: 'No',
      Feature1: 'Yes',
      Feature2: 'Yes',
      Feature3: 'No'
    }
  },
  {
    id: faker.datatype.uuid(),
    img: 'https://source.unsplash.com/lsdA8QpWN_A',
    name: 'Commoner',
    catagory: 'MSI Countertop',
    relatedImg: [
      'https://source.unsplash.com/lsdA8QpWN_A',
      'https://source.unsplash.com/dbH_vy7vICE',
      'https://source.unsplash.com/nWidMEQsnAQ'
    ],
    createdAt: Math.round(faker.datatype.float({ max: 1000 })),
    color: faker.color.human(),
    vendor: faker.name.firstName(),
    location: faker.address.cityName(),
    description: Array(5).fill(faker.commerce.productDescription()),
    price: faker.datatype.float({ max: 100 }),
    'Cartridge Valve Type': ['Heavy', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Color Family': ['Red', 'Blue', 'Brown'][Math.floor(Math.random() * 3)],
    'Faucet Finish': ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Number of Handles': ['Click lock', 'rounded'][Math.floor(Math.random() * 2)],
    specification: {
      Waterproof: 'Yes',
      Thickness: `${Math.round(faker.datatype.float({ max: 30 }))} inches`,
      Underlayment: 'No',
      Feature1: 'Yes',
      Feature2: 'Yes',
      Feature3: 'No'
    }
  },
  {
    id: faker.datatype.uuid(),
    img: 'https://source.unsplash.com/fZuleEfeA1Q',
    name: 'Alura',
    catagory: 'Floor Brand',
    relatedImg: [
      'https://source.unsplash.com/fZuleEfeA1Q',
      'https://source.unsplash.com/dbH_vy7vICE',
      'https://source.unsplash.com/nWidMEQsnAQ'
    ],
    createdAt: Math.round(faker.datatype.float({ max: 1000 })),
    color: faker.color.human(),
    vendor: faker.name.firstName(),
    location: faker.address.cityName(),
    description: Array(5).fill(faker.commerce.productDescription()),
    price: faker.datatype.float({ max: 100 }),
    'Cartridge Valve Type': ['Heavy', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Color Family': ['Red', 'Blue', 'Brown'][Math.floor(Math.random() * 3)],
    'Faucet Finish': ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Number of Handles': ['Click lock', 'rounded'][Math.floor(Math.random() * 2)],
    specification: {
      Waterproof: 'Yes',
      Thickness: `${Math.round(faker.datatype.float({ max: 30 }))} inches`,
      Underlayment: 'No',
      Feature1: 'Yes',
      Feature2: 'Yes',
      Feature3: 'No'
    }
  },
  {
    id: faker.datatype.uuid(),
    img: 'https://source.unsplash.com/_HqHX3LBN18',
    name: 'Venice',
    relatedImg: [
      'https://source.unsplash.com/_HqHX3LBN18',
      'https://source.unsplash.com/fZuleEfeA1Q',
      'https://source.unsplash.com/FBXuXp57eM0'
    ],
    catagory: 'CounterX',
    createdAt: Math.round(faker.datatype.float({ max: 1000 })),
    color: faker.color.human(),
    vendor: faker.name.firstName(),
    location: faker.address.cityName(),
    description: Array(5).fill(faker.commerce.productDescription()),
    price: faker.datatype.float({ max: 100 }),
    'Cartridge Valve Type': ['Heavy', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Color Family': ['Red', 'Blue', 'Brown'][Math.floor(Math.random() * 3)],
    'Faucet Finish': ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Number of Handles': ['Click lock', 'rounded'][Math.floor(Math.random() * 2)],
    specification: {
      Waterproof: 'Yes',
      Thickness: `${Math.round(faker.datatype.float({ max: 30 }))} inches`,
      Underlayment: 'No',
      Feature1: 'Yes',
      Feature2: 'Yes',
      Feature3: 'No'
    }
  },
  {
    id: faker.datatype.uuid(),
    img: 'https://source.unsplash.com/2dcYhvbHV-M',
    name: 'Venice',
    catagory: 'MSI Countertop',
    relatedImg: [
      'https://source.unsplash.com/2dcYhvbHV-M',
      'https://source.unsplash.com/dbH_vy7vICE',
      'https://source.unsplash.com/nWidMEQsnAQ'
    ],
    createdAt: Math.round(faker.datatype.float({ max: 1000 })),
    color: faker.color.human(),
    vendor: faker.name.firstName(),
    location: faker.address.cityName(),
    description: Array(5).fill(faker.commerce.productDescription()),
    price: faker.datatype.float({ max: 100 }),
    'Cartridge Valve Type': ['Heavy', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Color Family': ['Red', 'Blue', 'Brown'][Math.floor(Math.random() * 3)],
    'Faucet Finish': ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Number of Handles': ['Click lock', 'rounded'][Math.floor(Math.random() * 2)],
    specification: {
      Waterproof: 'Yes',
      Thickness: `${Math.round(faker.datatype.float({ max: 30 }))} inches`,
      Underlayment: 'No',
      Feature1: 'Yes',
      Feature2: 'Yes',
      Feature3: 'No'
    }
  },
  {
    id: faker.datatype.uuid(),
    img: 'https://source.unsplash.com/FV3GConVSss',
    name: 'Venice',
    catagory: 'CounterX',
    relatedImg: [
      'https://source.unsplash.com/FV3GConVSss',
      'https://source.unsplash.com/NvqYkDPE0Rw'
    ],
    createdAt: Math.round(faker.datatype.float({ max: 1000 })),
    color: faker.color.human(),
    vendor: faker.name.firstName(),
    location: faker.address.cityName(),
    description: Array(5).fill(faker.commerce.productDescription()),
    price: faker.datatype.float({ max: 100 }),
    'Cartridge Valve Type': ['Heavy', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Color Family': ['Red', 'Blue', 'Brown'][Math.floor(Math.random() * 3)],
    'Faucet Finish': ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Number of Handles': ['Click lock', 'rounded'][Math.floor(Math.random() * 2)],
    specification: {
      Waterproof: 'Yes',
      Thickness: `${Math.round(faker.datatype.float({ max: 30 }))} inches`,
      Underlayment: 'No',
      Feature1: 'Yes',
      Feature2: 'Yes',
      Feature3: 'No'
    }
  },
  {
    id: faker.datatype.uuid(),
    img: 'https://source.unsplash.com/2dcYhvbHV-M',
    name: 'Venice',
    catagory: 'MSI Countertop',
    relatedImg: [
      'https://source.unsplash.com/2dcYhvbHV-M',
      'https://source.unsplash.com/dbH_vy7vICE',
      'https://source.unsplash.com/nWidMEQsnAQ'
    ],
    createdAt: Math.round(faker.datatype.float({ max: 1000 })),
    color: faker.color.human(),
    vendor: faker.name.firstName(),
    location: faker.address.cityName(),
    description: Array(5).fill(faker.commerce.productDescription()),
    price: faker.datatype.float({ max: 100 }),
    'Cartridge Valve Type': ['Heavy', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Color Family': ['Red', 'Blue', 'Brown'][Math.floor(Math.random() * 3)],
    'Faucet Finish': ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Number of Handles': ['Click lock', 'rounded'][Math.floor(Math.random() * 2)],
    specification: {
      Waterproof: 'Yes',
      Thickness: `${Math.round(faker.datatype.float({ max: 30 }))} inches`,
      Underlayment: 'No',
      Feature1: 'Yes',
      Feature2: 'Yes',
      Feature3: 'No'
    }
  },
  {
    id: faker.datatype.uuid(),
    img: 'https://source.unsplash.com/fZuleEfeA1Q',
    name: 'Alura',
    catagory: 'CounterX',
    relatedImg: [
      'https://source.unsplash.com/fZuleEfeA1Q',
      'https://source.unsplash.com/FBXuXp57eM0'
    ],
    createdAt: Math.round(faker.datatype.float({ max: 1000 })),
    color: faker.color.human(),
    vendor: faker.name.firstName(),
    location: faker.address.cityName(),
    description: Array(5).fill(faker.commerce.productDescription()),
    price: faker.datatype.float({ max: 100 }),
    'Cartridge Valve Type': ['Heavy', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Color Family': ['Red', 'Blue', 'Brown'][Math.floor(Math.random() * 3)],
    'Faucet Finish': ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Number of Handles': ['Click lock', 'rounded'][Math.floor(Math.random() * 2)],
    specification: {
      Waterproof: 'Yes',
      Thickness: `${Math.round(faker.datatype.float({ max: 30 }))} inches`,
      Underlayment: 'No',
      Feature1: 'Yes',
      Feature2: 'Yes',
      Feature3: 'No'
    }
  },
  {
    id: faker.datatype.uuid(),
    img: 'https://source.unsplash.com/FBXuXp57eM0',
    name: 'Commoner',
    catagory: 'MSI Countertop',
    relatedImg: [
      'https://source.unsplash.com/FBXuXp57eM0',
      'https://source.unsplash.com/dbH_vy7vICE',
      'https://source.unsplash.com/nWidMEQsnAQ'
    ],
    createdAt: Math.round(faker.datatype.float({ max: 1000 })),
    color: faker.color.human(),
    vendor: faker.name.firstName(),
    location: faker.address.cityName(),
    description: Array(5).fill(faker.commerce.productDescription()),
    price: faker.datatype.float({ max: 100 }),
    'Cartridge Valve Type': ['Heavy', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Color Family': ['Red', 'Blue', 'Brown'][Math.floor(Math.random() * 3)],
    'Faucet Finish': ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Number of Handles': ['Click lock', 'rounded'][Math.floor(Math.random() * 2)],
    specification: {
      Waterproof: 'Yes',
      Thickness: `${Math.round(faker.datatype.float({ max: 30 }))} inches`,
      Underlayment: 'No',
      Feature1: 'Yes',
      Feature2: 'Yes',
      Feature3: 'No'
    }
  },
  {
    id: faker.datatype.uuid(),
    img: 'https://source.unsplash.com/FV3GConVSss',
    name: 'Venice',
    catagory: 'MSI Countertop',
    relatedImg: [
      'https://source.unsplash.com/FV3GConVSss',
      'https://source.unsplash.com/dbH_vy7vICE',
      'https://source.unsplash.com/nWidMEQsnAQ'
    ],
    createdAt: Math.round(faker.datatype.float({ max: 1000 })),
    color: faker.color.human(),
    vendor: faker.name.firstName(),
    location: faker.address.cityName(),
    description: Array(5).fill(faker.commerce.productDescription()),
    price: faker.datatype.float({ max: 100 }),
    'Cartridge Valve Type': ['Heavy', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Color Family': ['Red', 'Blue', 'Brown'][Math.floor(Math.random() * 3)],
    'Faucet Finish': ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Number of Handles': ['Click lock', 'rounded'][Math.floor(Math.random() * 2)],
    specification: {
      Waterproof: 'Yes',
      Thickness: `${Math.round(faker.datatype.float({ max: 30 }))} inches`,
      Underlayment: 'No',
      Feature1: 'Yes',
      Feature2: 'Yes',
      Feature3: 'No'
    }
  },
  {
    id: faker.datatype.uuid(),
    img: 'https://source.unsplash.com/lsdA8QpWN_A',
    name: 'Commoner',
    catagory: 'CounterX',
    relatedImg: [
      'https://source.unsplash.com/lsdA8QpWN_A',
      'https://source.unsplash.com/dbH_vy7vICE',
      'https://source.unsplash.com/nWidMEQsnAQ'
    ],
    createdAt: Math.round(faker.datatype.float({ max: 1000 })),
    color: faker.color.human(),
    vendor: faker.name.firstName(),
    location: faker.address.cityName(),
    description: Array(5).fill(faker.commerce.productDescription()),
    price: faker.datatype.float({ max: 100 }),
    'Cartridge Valve Type': ['Heavy', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Color Family': ['Red', 'Blue', 'Brown'][Math.floor(Math.random() * 3)],
    'Faucet Finish': ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Number of Handles': ['Click lock', 'rounded'][Math.floor(Math.random() * 2)],
    specification: {
      Waterproof: 'Yes',
      Thickness: `${Math.round(faker.datatype.float({ max: 30 }))} inches`,
      Underlayment: 'No',
      Feature1: 'Yes',
      Feature2: 'Yes',
      Feature3: 'No'
    }
  },
  {
    id: faker.datatype.uuid(),
    img: 'https://source.unsplash.com/fZuleEfeA1Q',
    name: 'Alura',
    catagory: 'Floor Brand',
    relatedImg: [
      'https://source.unsplash.com/fZuleEfeA1Q',
      'https://source.unsplash.com/FBXuXp57eM0'
    ],
    createdAt: Math.round(faker.datatype.float({ max: 1000 })),
    color: faker.color.human(),
    vendor: faker.name.firstName(),
    location: faker.address.cityName(),
    description: Array(5).fill(faker.commerce.productDescription()),
    price: faker.datatype.float({ max: 100 }),
    'Cartridge Valve Type': ['Heavy', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Color Family': ['Red', 'Blue', 'Brown'][Math.floor(Math.random() * 3)],
    'Faucet Finish': ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    'Number of Handles': ['Click lock', 'rounded'][Math.floor(Math.random() * 2)],
    specification: {
      Waterproof: 'Yes',
      Thickness: `${Math.round(faker.datatype.float({ max: 30 }))} inches`,
      Underlayment: 'No',
      Feature1: 'Yes',
      Feature2: 'Yes',
      Feature3: 'No'
    }
  }
];

const countertop = [...Array(20)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.product(),
  catagory: faker.commerce.department(),
  color: faker.color.human(),
  img: `${faker.image.food()}?random=${Math.round(Math.random() * 1000)}`,
  relatedImg: [...Array(3)].map(imgGenerate),
  description: [...Array(5)].map(descriptionGenerate),
  specification: specificationGenerate(),
  vendor: faker.name.firstName(),
  location: faker.address.cityName(),
  createdAt: Math.round(faker.datatype.float({ max: 1000 })),
  price: faker.datatype.float({ max: 100 }),
  'sqft/case': 24,
  Thickness: ['Heavy', 'Medium', 'Low'][Math.floor(Math.random() * 2)],
  'Stain resistant': ['Heavy', 'Medium', 'Low'][Math.floor(Math.random() * 2)],
  'Heat resistant': ['High', 'Medium', 'Low'][Math.floor(Math.random() * 2)],
  'Installation method': ['Click lock', 'rounded'][Math.floor(Math.random() * 2)],
  'Color Family': ['Red', 'Blue', 'Brown'][Math.floor(Math.random() * 2)],
  Warranty: ['Click lock', 'rounded'][Math.floor(Math.random() * 2)]
}));

const kitchenFaucets = [...Array(20)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.product(),
  catagory: faker.commerce.department(),
  color: faker.color.human(),
  img: `${faker.image.food()}?random=${Math.round(Math.random() * 1000)}`,
  relatedImg: [...Array(3)].map(imgGenerate),
  description: [...Array(5)].map(descriptionGenerate),
  specification: specificationGenerate(),
  vendor: faker.name.firstName(),
  createdAt: Math.round(faker.datatype.float({ max: 1000 })),
  location: faker.address.cityName(),
  price: faker.datatype.float({ max: 100 }),
  'Cartridge Valve Type': ['Heavy', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
  'Color Family': ['Red', 'Blue', 'Brown'][Math.floor(Math.random() * 3)],
  'Faucet Finish': ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
  'Installation Holes': [1, 2, 3, 4][Math.floor(Math.random() * 4)],
  'Number of Handles': [1, 2, 3, 4][Math.floor(Math.random() * 4)],
  'Faucet Handle Type': ['rounded', 'horizontal'][Math.floor(Math.random() * 2)],
  'Finish Family': ['none']
}));

const bathroomFaucets = [...Array(20)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.product(),
  catagory: faker.commerce.department(),
  color: faker.color.human(),
  img: `${faker.image.food()}?random=${Math.round(Math.random() * 1000)}`,
  relatedImg: [...Array(3)].map(imgGenerate),
  description: [...Array(5)].map(descriptionGenerate),
  specification: specificationGenerate(),
  vendor: faker.name.firstName(),
  createdAt: Math.round(faker.datatype.float({ max: 1000 })),
  location: faker.address.cityName(),
  price: faker.datatype.float({ max: 100 }),
  'Cartridge Valve Type': ['Heavy', 'Medium', 'Low'][Math.floor(Math.random() * 2)],
  'Color Family': ['Red', 'Blue', 'Brown'][Math.floor(Math.random() * 2)],
  'Faucet Finish': ['High', 'Medium', 'Low'][Math.floor(Math.random() * 2)],
  'Number of Handles': Math.round(faker.datatype.float({ max: 5 }))
}));

const cabinets = [...Array(20)].map(() => ({
  id: faker.datatype.uuid(),
  active: true,
  myPrice: 0,
  name: faker.commerce.product(),
  catagory: faker.commerce.department(),
  color: faker.color.human(),
  img: `${faker.image.food()}?random=${Math.round(Math.random() * 1000)}`,
  relatedImg: [...Array(3)].map(imgGenerate),
  description: [...Array(5)].map(descriptionGenerate),
  specification: specificationGenerate(),
  vendor: faker.name.firstName(),
  createdAt: moment().format('DD MMM YYYY'),
  location: faker.address.cityName(),
  price: faker.datatype.float({ max: 100 }),
  drawer: {
    id: faker.datatype.uuid(),
    name: faker.commerce.product(),
    img: `${faker.image.food()}?random=${Math.round(Math.random() * 1000)}`,
    price: faker.datatype.float({ max: 100 }),
    color: faker.color.human()
  },
  corner: {
    id: faker.datatype.uuid(),
    name: faker.commerce.product(),
    img: `${faker.image.food()}?random=${Math.round(Math.random() * 1000)}`,
    price: faker.datatype.float({ max: 100 }),
    color: faker.color.human()
  },
  'Cartridge Valve Type': ['Heavy', 'Medium', 'Low'][Math.floor(Math.random() * 2)],
  'Color Family': ['Red', 'Blue', 'Brown'][Math.floor(Math.random() * 2)],
  'Faucet Finish': ['High', 'Medium', 'Low'][Math.floor(Math.random() * 2)],
  'Number of Handles': Math.round(faker.datatype.float({ max: 5 }))
}));

const productApi = {
  vanities,
  tiles,
  flooring,
  countertop,
  kitchenFaucets,
  bathroomFaucets,
  cabinets
};

export default productApi;

// doorhandle is the sub related product of cabinets;
export const doorhandles = [...Array(10)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.product(),
  catagory: faker.commerce.department(),
  'Color Family': ['Red', 'Blue', 'Brown'][Math.floor(Math.random() * 2)],
  img: `${faker.image.food()}?random=${Math.round(Math.random() * 1000)}`,
  vendor: faker.name.firstName(),
  location: faker.address.cityName(),
  price: faker.datatype.float({ max: 100 })
}));

// 0ZL_cpr0vN4, 1by_GbwEMwc , x8cuokd5YiA
// WUDiBr2dpfE, c0lcmyi3zOA, M66lRZPX-hU
// WTOLeDB_kus, P52GA0TUf-8

// HPcto6bSQGg, ruw__7S1SPI, _Ht9Gs3MZck , LEKDxXseeys, ppmnSi4Hz3Y
