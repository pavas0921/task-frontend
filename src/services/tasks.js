const API_BASE_URL = 'http://localhost:4001'

export const getTaksByUserID = async (userId) => {
  try {
    const url = `${API_BASE_URL}/task/user/${userId}`
    const req = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await req.json()
    return Promise.resolve(data)
  } catch (error) {
    return Promise.resolve(error)
  }
}

export const taskRegisterAPI = async (body) => {
  try {
    const url = `${API_BASE_URL}/task/create`
    const req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await req.json()
    return Promise.resolve(data)
  } catch (error) {
    return Promise.resolve(error)
  }
}

export const updateTaksAPI = async (body) => {
  try {
    const url = `${API_BASE_URL}/task/${body._id}`
    const req = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await req.json()
    return Promise.resolve(data)
  } catch (error) {
    return Promise.resolve(error)
  }
}


