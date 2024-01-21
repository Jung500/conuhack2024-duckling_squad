const API = {
    GetChatbotResponse: async message => {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {

          if (message === "Question 1") {
            resolve({
                type: 'question',
                text: "What's your favorite color?",
                options: ['Red', 'Blue', 'Green']
              });
          } else if (["Red", "Blue", "Green"].includes(message)) {
            resolve({ type: 'answer', text: `Great choice! I like ${message} too.` });
          } else {
            resolve({ type: 'echo', text: "echo : " + message });
          }

        }, 2000);
      });
    }
  };
  
  export default API;
  