export const getEmailFromToken = () => {
  const accessToken = localStorage.getItem("access_token");
  const payload = accessToken?.split(".")[1] as string;
  const decodedPayload = JSON.parse(atob(payload));

  return decodedPayload.email;
};