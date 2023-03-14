// function to create a unique id's for objects saved to db.json
const randId = () => {
  const id = Math.floor(Math.random() * 9999);
  return id;
};

module.exports = randId;
