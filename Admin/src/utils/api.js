const BASE_URL = "http://localhost:5000/api";

export const postData = async (url, formData, token = null) => {
  try {
    const response = await fetch(BASE_URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};
