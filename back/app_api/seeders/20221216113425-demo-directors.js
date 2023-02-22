'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('directors',
    [
      {id:1, first_name:"Darko", last_name:"Bajic", image: "https://nova.rs/wp-content/uploads/2021/09/13/1631529721-liffe-festival-Foto-nemanja-jovanovic-nova-rs-6-750x500.jpg",createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:2, first_name:"Christopher", last_name:"Nolan", image: "https://variety.com/wp-content/uploads/2020/12/christopher-Nolan-2.jpg?w=1000",createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:3, first_name:"Mathieu", last_name:"Kassovitz", image:"https://ichef.bbci.co.uk/images/ic/1200x675/p017xzp6.jpg", createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:4, first_name:"David", last_name:"Fincher", image:"https://images.mubicdn.net/images/cast_member/1469/cache-103636-1599486038/image-w856.jpg?size=800x", createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},

    ])
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete('Director', null, {});
    
  }
};
