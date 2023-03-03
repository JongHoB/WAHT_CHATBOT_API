// const request = require('supertest');

// const { createApp } = require('../app');
// const  appDataSource  = require('../models/dataSource');
// const userFixture = require('./fixtures/user-fixture');
// const discordUserFixture = require('./fixtures/discordUser-fixture');
// const discordNFTFixture = require('./fixtures/discordNFT-fixture');
// const eventFixture = require('./fixtures/event-fixture');
// const rsvpFixture = require('./fixtures/rsvp-fixture');
// const testUserData = require('./data/users');
// const testDiscordUserData = require('./data/discordUsers');
// const testDiscrdNFTData = require('./data/discordNFTs');
// const testEventData = require('./data/events');
// const testRsvpData = require('./data/rsvps');

// describe('EVENT TEST', () => {
//   let app;

//   beforeAll(async () => {
//     app = createApp();
//     await appDataSource.initialize();
//     await userFixture.createUsers(testUserData.users);
//     await discordUserFixture.createDiscordUsers(
//       testDiscordUserData.discordUsers
//     );
//     await discordNFTFixture.createProducts(testDiscrdNFTData.discordNFT);
//     await eventFixture.createRoomStyles(testEventData.events);
//     await rsvpFixture.createPosts(testRsvpData.rsvps);
//   });

//   afterAll(async () => {
//     await appDataSource.query(`TRUNCATE User`);
//     await appDataSource.query(`TRUNCATE Discord_User`);
//     await appDataSource.query(`TRUNCATE Discord_NFT`);
//     await appDataSource.query(`TRUNCATE Event`);
//     await appDataSource.query(`TRUNCATE RSVP`);

//     await appDataSource.destroy();
//   });

//   describe('GET: Retrieve a list of events that the user can participate in based on their NFT', () => {});

//   describe('GET: Event details', () => {});
// });
