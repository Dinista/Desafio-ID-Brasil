
const baseURL = 'https://jsonplaceholder.typicode.com';


// Verifica Response
// response -> response.json OR ERROR

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro na resposta: ${response.status} ${response.statusText} - ${errorText}`);
  }
  
  return response.json();
};

// Get lista de Users
// () -> response.json OR ERROR

export const getUsers = async () => {
  try {
    const response = await fetch(`${baseURL}/users`);
    return await handleResponse(response);
  } catch (error) {
    throw new Error('Erro ao buscar usuários: ' + error.message);
  }
};

// Cria novo registro
// user -> response.json OR ERROR

export const createUser = async (NewUser) => {
  try {
    const response = await fetch(`${baseURL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json, charset=UTF-8'
      },
      body: JSON.stringify(NewUser)
    });
    return response;
  } catch (error) {
    throw new Error('Erro ao criar usuário: ' + error.message);
  }
};

// Atualiza registro
// user, id -> response.json OR ERROR

export const updateUser = async (id, NewUser) => {
  try {
    const response = await fetch(`${baseURL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json, charset=UTF-8'
      },
      body: JSON.stringify(NewUser)
    });
    return await handleResponse(response);
  } catch (error) {
    throw new Error('Erro ao atualizar usuário: ' + error.message);
  }
};

// Deleta registro
// id -> response.json OR ERROR

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${baseURL}/users/${id}`, {
      method: 'DELETE'
    });
    await handleResponse(response);
  } catch (error) {
    throw new Error('Erro ao excluir usuário: ' + error.message);
  }
};
