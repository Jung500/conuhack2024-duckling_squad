import React, { useEffect, useState } from 'react'

import './App.css';
import { Constants } from './Constants';

import MainScreen from './screens/MainScreen';

function App() {

  const [dataVariable, setDataVariable] = useState([])
  const [dataSampleForm, setDataSampleForm] = useState([])

  const afterFilter = [];

  // useEffect(() => {
  //   Promise.all([
  //     fetch(`https://donnees.montreal.ca/api/3/action/datastore_search?resource_id=9eecc8e6-b16f-4e9e-9625-6de825c0fe5f&limit=${Constants.TOTAL_QUESTIONS}`),
  //     fetch(`https://donnees.montreal.ca/api/3/action/datastore_search?resource_id=7a84331f-8b5d-41dd-8e53-0bf92ab675e7&limit=${Constants.TOATL_SAMPLE}`)
  //   ])
  //     .then(async ([res1, res2]) => {
  //       const data1 = await res1.json();
  //       const data2 = await res2.json();

  //       setDataVariable(data1.result.records);
  //       setDataSampleForm(data2.result.records);
  //       console.log("fetch successful");
  //     })
  //     .catch(error => console.log('Error fetching data', error));
  // }, []);

  useEffect(() => {
    fetch(`https://donnees.montreal.ca/api/3/action/datastore_search?resource_id=9eecc8e6-b16f-4e9e-9625-6de825c0fe5f&limit=${Constants.TOTAL_QUESTIONS}`)
      .then(async (res) => {
        const data = await res.json();

        setDataVariable(data.result.records);
        console.log("fetch successful 1");
      })
      .catch(error => console.log('Error fetching data', error));
  }, []);

  useEffect(() => {
    fetch(`https://donnees.montreal.ca/api/3/action/datastore_search?resource_id=7a84331f-8b5d-41dd-8e53-0bf92ab675e7&limit=${Constants.TOATL_SAMPLE}`)
      .then(async (res) => {
        const data = await res.json();

        setDataSampleForm(data.result.records);
        console.log("fetch successful 2");
      })
      .catch(error => console.log('Error fetching data', error));
  }, []);

  var userAge = 2; // just for testing

  console.log(dataSampleForm)
  if (dataSampleForm.length > 0) {
    const statAge = dataSampleForm.filter(record => (record.AGE <= userAge + 1 && record.AGE >= userAge - 1 && record.Q21r1 === 0));
    const range = dataSampleForm.filter(record => (record.AGE <= userAge + 1 && record.AGE >= userAge - 1));
    console.log(range.length)
    console.log(`${((statAge.length / range.length) * 100).toFixed(0)}%`)

    Constants.QUESTIONS_NEED_TO_BE_ANSWERED.forEach(champ => {

    });
  }

  Constants.QUESTIONS_NEED_TO_BE_ANSWERED.forEach(champ => {
    afterFilter.push(dataVariable.filter(record => record.champ === champ));
  });

  const formObject = [];
  if (afterFilter.length > 0) {

    Constants.ADDITIONAL_QUESTIONS.forEach(question => {
      formObject.push(question);
    });

    afterFilter.forEach(element => {

      const reponseText = [];
      const reponseVariable = [];
      const obj = {};
      var once = true;

      element.forEach(question => {
        if (once) {
          obj.id = question.champ;
          obj.question = question.description_question;
          once = false;
        }

        reponseText.push(question.description_reponse);
        reponseVariable.push(question.variable_reponse);
      });

      obj.reponseText = reponseText;
      obj.reponseVariable = reponseVariable;

      //formObject.push(obj);

    });
    Constants.ALL_QUESTION = formObject;
    console.log(formObject);

  } else {
    console.log('Data is not yet available');
  }

  return (
    <div className="App">
      <MainScreen />
    </div>
  );
}

export default App;