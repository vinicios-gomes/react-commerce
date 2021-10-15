export const getAllProducts = async () => {
  const data = await fetch(
    "https://5d6da1df777f670014036125.mockapi.io/api/v1/product"
  );
  return data.json();
};
