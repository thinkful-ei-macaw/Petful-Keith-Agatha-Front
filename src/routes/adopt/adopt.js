import React, { Component } from 'react';
import './adopt.css'
// import ApiService
import ApiService from '../../api-service';

export default class Adoption extends Component {
  state = {
    pets: {
      cat: null,
      dog: null
    },
    inQueue: [],
    people: [],
    user: sessionStorage.getItem('petful-user-name') || null,
    error: null
  };

  userStore = [
    'Mavise Escher',
    'Karo Hanahama',
    'Mara Kovich',
    'Clark Issac'
  ];

  componentDidMount() {
    this.getData();
    this.interval = setInterval(() => {
      // condition to see if user is at the top
      const { people, user } = this.state;
      if (!people.length || !user) return;

      if (people[0] === user && people.length < 5) {
        this.addUsers();}
        else if (people[0] !== user && people.length > 1) {
        this.adopt();}
    }, 5000);
  }

  adopt() {
    const { pets } = this.state;
    const animals = Object.entries(pets).filter(
      ([animal, pet]) => pet !== null
    );
    if (animals.length === 0) return;

    const randomIndex = Math.floor(Math.random() * animals.length);
    const petToAdopt = animals[randomIndex][0] + 's';
    this.handleAdopt(petToAdopt);
  }

  handleAdopt = (type) => {
    ApiService.adopt(type).then(() => {
      const { people, user } = this.state;
      if (people[0] === user) {
        // forget the user
        sessionStorage.removeItem('petful-user-name');
        alert('Pet Adopted!');
        this.setState({
          user: null,
        });
      }
      this.getData();
    });
  };

  addUsers() {
    const newPerson = this.userStore[this.state.people.length - 1];
    ApiService.addPerson(newPerson).then(() => {
      this.getData();
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getData() {
    ApiService.getPets()
      .then((pets) => {
        ApiService.getPeople().then((people) => {
          ApiService.getAllPets().then((allPets) => {
            this.setState({
              pets: pets,
              people: people,
              inQueue: [...allPets.cats.slice(1, 3), ...allPets.dogs.slice(1, 3)],
            });
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.user.value;
    ApiService.addPerson(name).then(() => {
      sessionStorage.setItem('petful-user-name', name);
      this.setState({
        user: name,
      });
      this.getData();
    });
  };

  render() {
    const { people, pets, user, inQueue } = this.state;
    const firstInLine = (!people.length && user) || people[0] === user;

    return (
      <div className='adoption-wrapper'>
        <div className='pets-container'>
          <div className='row-one'>
            {Object.entries(pets).map(([type, pet]) => {
              return pet ? (
                <div className='pet-block' key={pet.name}>
                  <img className='pet-pic' src={pet.imageURL} alt={pet.description} />
                  <div className='pet-details'>
                  <h3>{pet.name}</h3>
                  <p className='info'>
                    {pet.breed} | {pet.gender} | {pet.age} yr(s) old
                  </p>
                  <p className='story'>{pet.story}</p>
                  <button
                    onClick={() => this.handleAdopt(type + 's')}
                    disabled={!firstInLine}
                    className='button-primary'
                  >
                    Adopt me!
                  </button>
                  </div>
                </div>
              ) : (
                <div className='pet-block' key={type}>
                  <h3>No {type}s to adopt</h3>
                </div>
              );
            })}
          </div>

          <div className='queue-container'>
          <h3>Get in Line!</h3>
          <ul>
            {people.map((person) => (
              <li key={person} className={person === user ? 'user' : ''}>
                {person}
              </li>
            ))}
            {!user ? (
              <li>
                <form className='name-form' onSubmit={this.handleAddUser}>
                  <input
                    autoComplete='off'
                    name='user'
                    type='text'
                    placeholder='Your name here'
                  />
                  <button>Waitlist</button>
                </form>
              </li>
            ) : (
              ''
            )}
          </ul>
        </div>

          <div className='row-two'>
            {inQueue.map((pet) => {
              return (
                <div className='pet-adopted' key={pet.name}>
                  <img className='pet-pic' src={pet.imageURL} alt={pet.description} />
                  <h5>{pet.name}</h5>
                  <p className='info'>
                    {pet.breed} | {pet.gender} | {pet.age} yr
                    {pet.age !== 1 ? 's' : ''} old
                  </p>
                  <p className='story'>{pet.story}</p>
                </div>
              );
            })}
          </div>
        </div>

        
      </div>
    );
  }
}
