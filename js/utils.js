export function generateID() {
  return Date.now();
}

export function validateEmail(email) {
  return email.includes("@");
}

export async function fetchClients() {
  try {
    const response = await fetch("https://randomuser.me/api/?results=5&nat=us");

    const data = await response.json();

    return data.results.map((user) => ({
      id: Date.now() + Math.random(),

      name: `${user.name.first} ${user.name.last}`,

      email: user.email,

      phone: user.phone,

      company: "Freelance Inc.",

      notes: "Trusted Client",
    }));
  } catch (error) {
    console.log(error);

    return [];
  }
}

export async function fetchQuote() {
  try {
    const response = await fetch("https://dummyjson.com/quotes");

    const data = await response.json();

    console.log("Fetched quotes:", data);

    const randomIndex = Math.floor(Math.random() * data.quotes.length);

    const randomQuote = data.quotes[randomIndex];

    const quoteData = {
      quote: randomQuote.quote,
      author: randomQuote.author,
    };

    localStorage.setItem("quote", JSON.stringify(quoteData));

    return quoteData;
  } catch (error) {
    console.log(error);

    return null;
  }
}
