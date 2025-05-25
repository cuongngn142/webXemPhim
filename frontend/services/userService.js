const API_URL = "http://localhost:3000";

export async function fetchCheckLogin(data) {
  try {
    const response = await fetch(`${API_URL}/api/checklogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network đang chưa ổn định!");
    }
    const result = response.json();
    return result;
  } catch (error) {
    console.error("Thất bại khi fetch checklogin:", error);
    return [];
  }
}

export async function fetchRegisterUser(data) {
  try {
    const response = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error("Thất bại khi fetch checklogin:", error);
    return [];
  }
}
