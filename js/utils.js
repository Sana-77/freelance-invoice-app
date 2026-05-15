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
      company: "Freelance Inc.",
      notes: "",
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchQuote() {
  try {
    const response = await fetch("https://zenquotes.io/api/quotes");

    const data = await response.json();

    return data[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}
