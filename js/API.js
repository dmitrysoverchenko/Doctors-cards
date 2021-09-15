const request = "https://ajax.test-danit.com/api/v2";

const authorization = async (email, password) => {
  const response = await fetch(`${request}/cards/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password }),
  });
  if (response.status !== 200) {
    alert("Something went wrong, please try again");
  } else {
    const token = await response.text();
    localStorage.setItem("token", token);
    return token;
  }
};

const getCards = async () => {
  const response = await fetch(`${request}/cards`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const cards = await response.json();
  return cards;
};

const createVisit = async (formData) => {
  const response = await fetch(`${request}/cards`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ ...formData }),
  });

  return response;
};

const editCard = async (id, formData) => {
  const response = await fetch(`${request}/cards/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ ...formData }),
  });

  return response;
};

const deleteCard = async (id) => {
  const response = await fetch(`${request}/cards/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response;
};

export { authorization, createVisit, getCards, deleteCard, editCard };
