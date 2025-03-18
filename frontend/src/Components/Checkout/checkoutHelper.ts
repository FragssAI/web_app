

export const getClientSecret = async (lookupKey: string, token: string) => {

    const response = await fetch("https://peaceful-enabling-snipe.ngrok-free.app/api/subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ lookupKey }),
    })
  
    const data = await response.json()
    return data
  }