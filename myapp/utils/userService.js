// userService.js

export async function registerUser(userData) {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Registration failed');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Registration failed: ' + error.message);
    }
  }
  