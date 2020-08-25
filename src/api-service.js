import config from "./config";

const { API } = config;

function getPets() {
  return fetch(`${API}/pets`).then((res) => {
    if (res.status !== 200) {
      throw new Error("No animals");
    }
    return res.json();
  });
}

function getAllPets() {
  return fetch(`${API}/pets/all`).then((res) => {
    if (res.status !== 200) {
      throw new Error("No Animals");
    }
    return res.json();
  });
}

function adopt(animal) {
  const data = {
    type: animal,
  };

  return fetch(`${API}/pets`, {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });
}

function getPeople() {
  return fetch(`${API}/people`)
    .then((res) => {
      if (res.status !== 200) {
        throw new Error("No Customers");
      }
      return res.json();
    })
    .then((data) => data.people);
}

function addPerson(newName) {
  const newPerson = {
    name: newName,
  };

  return fetch(`${API}/people`, {
    method: "POST",
    body: JSON.stringify(newPerson),
    headers: {
      "content-type": "application/json",
    },
  }).then((res) => {
    if (res.status !== 201) {
      throw new Error(
        "invalid"
      );
    }
  });
}

export default {
  addPerson,
  getPeople,
  adopt,
  getPets,
  getAllPets,
};
